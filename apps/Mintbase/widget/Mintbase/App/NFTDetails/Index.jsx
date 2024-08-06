const { isDarkModeOn, accountId, connectedDao } = props;
const metadataId =
  props.metadataId || "nft.herewallet.near:d96acabbdb8bc6ad1317385be84030ed";
const extractedContactId = metadataId.split(":")[0];
const contractId =
  props.contractId || extractedContactId || "nft.herewallet.near";

const buySvg = (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 639 639"
    width="40"
    height="40"
    class="fill-current text-black dark:text-black"
  >
    <path d="m457.61,144c-13,0-25.07,6.74-31.88,17.82l-73.37,108.93c-2.39,3.59-1.42,8.43,2.17,10.82,2.91,1.94,6.76,1.7,9.41-.58l72.22-62.64c1.2-1.08,3.05-.97,4.13.23.49.55.75,1.26.75,1.99v196.12c0,1.62-1.31,2.92-2.93,2.92-.87,0-1.69-.38-2.24-1.05L217.56,157.24c-7.11-8.39-17.55-13.23-28.54-13.24h-7.63c-20.65,0-37.39,16.74-37.39,37.39v276.22c0,20.65,16.74,37.39,37.39,37.39,13,0,25.07-6.74,31.88-17.82l73.37-108.93c2.39-3.59,1.42-8.43-2.17-10.82-2.91-1.94-6.76-1.7-9.41.58l-72.22,62.64c-1.2,1.08-3.05.97-4.13-.23-.49-.55-.75-1.26-.74-1.99v-196.17c0-1.62,1.31-2.92,2.93-2.92.86,0,1.69.38,2.24,1.05l218.28,261.37c7.11,8.39,17.55,13.23,28.54,13.24h7.63c20.65.01,37.4-16.72,37.42-37.37V181.39c0-20.65-16.74-37.39-37.39-37.39Z"></path>
  </svg>
);

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${isDarkModeOn ? "#282a3a" : "#f6f5f4"};
  height: 50px;
  width: 100%;
  .buy {
    background: none;
    border: 1px solid #5b5d6b;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
    outline: none;
    margin-top: 30px;
    padding: 5px 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    min-width: 200px;
    margin-right: 30px;
    cursor: pointer;
    svg {
      width: 30px;
    }
  }
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
        listingsCount: mb_views_active_listings_aggregate(
            where: {
              metadata_id: { _eq: "${nftId}" }
              token: { burned_timestamp: { _is_null: true } }
            }
            distinct_on: token_id
          ) {
            aggregate {
              count
            }
          }
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
                reference
                title
                nft_contract_id
                owner
                base_uri
                listings(
               where: {unlisted_at: {_is_null: true}, accepted_at: {_is_null: true}, invalidated_at: {_is_null: true}}
            ) {
                  price
                  kind
                  currency
                  invalidated_at
                }
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
    listingCount: response2?.body?.data?.listingsCount?.aggregate?.count,
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
              src={`${config_account}/widget/Mintbase.NFT.MBSellOption`}
              props={{
                data: state.infoNFT,
                isDarkModeOn,
                connectedDao: connectedDao,
                onClose: () => setModalState(""),
              }}
            />
          )}
          {modalState === "TRANSFER" && (
            <Widget
              src={`${config_account}/widget/Mintbase.NFT.TransferOption`}
              props={{
                data: state.infoNFT,
                isDarkModeOn,
                onClose: () => setModalState(""),
              }}
            />
          )}
          {modalState === "BURN" && (
            <Widget
              src={`${config_account}/widget/Mintbase.NFT.Burn`}
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
              src={`${config_account}/widget/Mintbase.NFT.Burn`}
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
      src={"${config_account}/widget/Mintbase.App.NFTDetails.NFTShow"}
      props={{
        isDarkModeOn,
        data: state.infoNFT,
        NftCount: state.NftCount,
        listingCount: state.listingCount,
        connectedDao: connectedDao,
      }}
    />
    <Widget
      src={"${config_account}/widget/Mintbase.App.NFTDetails.NFTTable"}
      props={{
        isDarkModeOn,
        dataTransaction: state.dataTransaction,
      }}
    />
    <Widget
      src={"${config_account}/widget/Mintbase.App.NFTDetails.NFTMore"}
      props={{
        isDarkModeOn,
        dataNFT: state.dataNFT,
      }}
    />
  </>
);
