const { isDarkModeOn, accountId } = props;
const metadataId =
  props.metadataId || "nft.herewallet.near:d96acabbdb8bc6ad1317385be84030ed";
const extractedContactId = metadataId.split(":")[0];
const contractId =
  props.contractId || extractedContactId || "nft.herewallet.near";
console.log({ contractId });
const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${isDarkModeOn ? "#282a3a" : "#f6f5f4"};
  height: 50px;
  width: 100%;
  .container {
    display: flex;
    flex-direction: row;
    justify-content: end;
    flex-wrap: wrap;
    margin-right: 20px;
    gap: 10px;
  }
  .button {
    background: none;
    border: 1px solid #5b5d6b;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
    outline: none;
    padding: 5px 20px;
    border-radius: 5px;
    min-width: 100px;
  }
  .cus {
    color: red;
  }
  @media screen and (max-width: 768px) {
    display: none;
    height: 10px;
  }
`;
const Modal = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  z-index: 999;
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;
const ModalBg = styled.div`
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw !important;
  height: 100%;
  background-color: #000000;
  opacity: 0.75;
  z-index: 999;
`;
const [SDK, setSDK] = useState(null);
const [modalState, setModalState] = useState("");
const fetchStoreFrontData = (nftId) => {
  const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query getTokenByMetadataId {
            mb_views_nft_tokens(
                where: {metadata_id: {_eq: "${nftId}"}}
                ) {
                media
                minter
                token_id
                metadata_id
                splits
                royalties_percent
                royalties
                title
                nft_contract_id
                owner
                base_uri
                description
                listings_aggregate {
                    aggregate {
                    count
                    }
                }
                }
            mb_views_nft_activities_rollup(
                where: {metadata_id: {_eq: "${nftId}"}}
                order_by: {timestamp: desc}
            ) {
                action_receiver
                action_sender
                count
                description
                kind
                media
                metadata_id
                nft_contract_id
                receipt_id
                reference
                timestamp
                title
                tx_sender
                token_ids
                price
            }
        }
        `,
    }),
  });
  //return response2.body.data;
  State.update({
    infoNFT: response2.body.data.mb_views_nft_tokens[0],
    NftCount:
      response2.body.data.mb_views_nft_tokens[0].listings_aggregate.aggregate
        .count,
    dataTransaction: response2.body.data.mb_views_nft_activities_rollup,
  });
};
const fetchNFTData = (contractId) => {
  const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
            mb_views_active_listings(
                where: {nft_contract_id: {_eq: "${contractId}"}}
                limit: 4
            ) {
                media
                title
                kind
                nft_contract_id
                listed_by
                token {
                    metadata_id
                }
            }
        }
        `,
    }),
  });
  //return response2.body.data;
  State.update({
    dataNFT: response2.body.data.mb_views_active_listings,
  });
};
fetchNFTData(contractId);
fetchStoreFrontData(metadataId);
const isMintedContract = ["mintbase1.near", "mintspace2.testnet"].some(
  (substring) => contractId?.includes(substring)
);
return (
  <>
    {state.infoNFT.owner == context.accountId && (
      <Navbar>
        <div className="container">
          {isMintedContract ? (
            <>
              <button
                className="button cus"
                onClick={() => setModalState("BURN")}
              >
                Burn
              </button>
              <button
                className="button"
                onClick={() => setModalState("MULTIPLY")}
              >
                Multiply
              </button>
            </>
          ) : (
            <></>
          )}
          <button className="button" onClick={() => setModalState("TRANSFER")}>
            Transfer
          </button>
          <button className="button" onClick={() => setModalState("SELL")}>
            Sell
          </button>
        </div>
      </Navbar>
    )}
    {modalState !== "" && (
      <div>
        <ModalBg />
        <Modal>
          {modalState === "SELL" && (
            <Widget
              src="/*__@appAccount__*//widget/Mintbase.NFT.MBSellOption"
              props={{
                data: state.infoNFT,
                isDarkModeOn,
                onClose: () => setModalState(""),
              }}
            />
          )}
          {modalState === "TRANSFER" && (
            <Widget
              src="/*__@appAccount__*//widget/Mintbase.NFT.TransferOption"
              props={{
                data: state.infoNFT,
                isDarkModeOn,
                onClose: () => setModalState(""),
              }}
            />
          )}
          {modalState === "BURN" && (
            <Widget
              src="/*__@appAccount__*//widget/Mintbase.NFT.Burn"
              props={{
                data: state.infoNFT,
                type: "BURN",
                isDarkModeOn,
                onClose: () => setModalState(""),
              }}
            />
          )}
          {modalState === "MULTIPLY" && (
            <Widget
              src="/*__@appAccount__*//widget/Mintbase.NFT.Burn"
              props={{
                data: state.infoNFT,
                type: "MULTIPLY",
                isDarkModeOn,
                onClose: () => setModalState(""),
              }}
            />
          )}
        </Modal>
      </div>
    )}
    <Widget
      src={"bos.genadrop.near/widget/Mintbase.App.NFTDetails.NFTShow"}
      props={{
        isDarkModeOn,
        data: state.infoNFT,
        NftCount: state.NftCount,
      }}
    />
    <Widget
      src={"bos.genadrop.near/widget/Mintbase.App.NFTDetails.NFTTable"}
      props={{
        isDarkModeOn,
        dataTransaction: state.dataTransaction,
      }}
    />
    <Widget
      src={"bos.genadrop.near/widget/Mintbase.App.NFTDetails.NFTMore"}
      props={{
        isDarkModeOn,
        dataNFT: state.dataNFT,
      }}
    />
    <Widget
      src="bos.genadrop.near/widget/Mintbase.SDK"
      props={{
        mainnet: false,
        contractName: "mintspace2.testnet",
        loaded: SDK,
        onLoad: (SDK) => setSDK(SDK),
        onRefresh: (SDK) => setSDK(SDK),
      }}
    />
  </>
);
