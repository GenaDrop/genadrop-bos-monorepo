const accountId = props.accountId ?? context.accountId;

const { contract, isDarkModeOn } = props;

const isOwner = contract.nftContract.owner === accountId;

const StoreCard = styled.div`
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.05);
  gap: 2em;
  margin: 10px auto;
  width: 100%;
  background: #fff;
  color: #000;
  &.dark-store-card {
    background: #1e2030;
    color: #fff;
  }
  max-width: 600px;
  border-radius: 4px;

  * {
    font-family: "AUTHENTIC Sans 90", sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .icon_area {
    width: 110px;
    border-radius: 4px;
    height: 110px;
    border-width: 3px;
    border-style: solid;
    border-color: #fff;
    display: flex;
    overflow: hidden;
    position: absolute;
    margin-top: -50px;
    background: #C74C4C;
    img {
      object-fit: cover;
    }
    &.dark-icon_area {
      border-color: #1e2030;
    }
  }

  .contract_owner {
    margin-top: 10px;
    h3 {
      font-weight: bold;
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }
    p {
      font-size: 12px;
      margin: 0;
      font-weight: 400;
      color: #404252;
      &.dark_role {
        color: #b3b5bd;
      }
    }
  }

  .middle {
    padding: 0px 24px;
    position: relative;
    .content {
      position: relative;
      display: flex;
      gap: 20px;
      .contract_owner {
        margin-left: 128px;
      }
    }
  }

  .top {
    height: 100px;
    background: #C74C4C;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .bottom {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    &.dark {
      background: #1e2030;
    }
  }
`;

// const fetchStoreFrontData = (owner, contractId) => {
//   const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
//     method: "POST",
//     headers: {
//       "mb-api-key": "anon",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: `query MyQuery {
//   mb_views_nft_metadata_unburned_aggregate(
//     where: {nft_contract: {id: {_eq: "${contractId}"}, owner_id: {_eq: "${owner}"}}}
//   ) {
//     aggregate {
//       count
//     }
//   }
// }
// `,
//     }),
//   });

//   State.update({
//     storeContracts: response2.body.data.mb_views_nft_metadata_unburned,
//     storeNftsCount:
//       response2.body.data.mb_views_nft_metadata_unburned_aggregate.aggregate
//         .count,
//   });
//   console.log("running2", state.storeContracts);
// };

// fetchStoreFrontData(
//   contract.nftContract.owner || "nate.near",
//   contract.id || "nate.mintbase1.near"
// );

return (
  <StoreCard className={isDarkModeOn ? "dark-store-card" : ""}>
    <a href={`#`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="top">
        <img
          src={
            "https://ipfs.near.social/ipfs/bafkreiajgp5bmkidwesy2d6tsbdkhyfzjtom2wse2sjcwii227lt5audvq"
          }
          className="chain_banner"
          alt={contract.nft_contract.name + " banner"}
        />
      </div>
      <div className="middle">
        <div className="content">
          <div className={`icon_area ${isDarkModeOn ? "dark-icon_area" : ""}`}>
            <img
              src={
                contract.nft_contract.icon ??
                "https://ipfs.near.social/ipfs/bafkreiajgp5bmkidwesy2d6tsbdkhyfzjtom2wse2sjcwii227lt5audvq"
              }
              className="chain_icon"
              alt={contract.nft_contract.name + " icon"}
            />
          </div>
          <div className="contract_owner">
            <h3>
              {(contract && contract?.nft_contract.name.toUpperCase()) ||
                "contract Name"}
            </h3>
            <p className={isDarkModeOn ? "dark_role" : ""}>Role: Owner</p>
          </div>
        </div>
      </div>
    </a>
    <div className={`bottom ${isDarkModeOn ? "dark" : ""}`}>
      <div className="d-flex lhs gap-2 w-75">
        <Widget
          src={`/*__@appAccount__*//widget/Mintbase.MbButton`}
          props={{
            label: "Manage NFTs",
            btnType: "primary",
            size: "medium",
            onClick: () => null,
            isDarkModeOn,
          }}
        />
        {isOwner && (
          <div>
            <Widget
              src={`/*__@appAccount__*//widget/Mintbase.MbButton`}
              props={{
                label: "Settings",
                btnType: "primary",
                size: "medium",
                onClick: () => null,
                isDarkModeOn,
              }}
            />
          </div>
        )}
      </div>
      <div>
        <Widget
          src={`/*__@appAccount__*//widget/Mintbase.MbButton`}
          props={{
            label: "Mint NFT",
            btnType: "primary",
            size: "medium",
            onClick: () => null,
            isDarkModeOn,
          }}
        />
      </div>
    </div>
  </StoreCard>
);
