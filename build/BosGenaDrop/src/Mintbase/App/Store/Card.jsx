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


const verifiedBatch = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="18px"
    viewBox="0 0 24 24"
    width="18px"
    fill="#000000"
    class="fill-current text-blue-300 dark:text-blue-100"
  >
    <g>
      <rect fill="none" height="24" width="24"></rect>
    </g>
    <g>
      <path d="M23,12l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,12l2.44,2.79l-0.34,3.7 l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,12z M10.09,16.72l-3.8-3.81l1.48-1.48l2.32,2.33 l5.85-5.87l1.48,1.48L10.09,16.72z"></path>
    </g>
  </svg>
);
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
          src={`bos.genadrop.near/widget/Mintbase.MbButton`}
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
              src={`bos.genadrop.near/widget/Mintbase.MbButton`}
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
          src={`bos.genadrop.near/widget/Mintbase.MbButton`}
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
