const accountId = props.accountId ?? context.accountId;
const { contract, isDarkModeOn } = props;
const isConnected = contract.owner_id === accountId;
const [storeProfileImage, setStoreProfileImage] = useState("");
const [storeHeaderImage, setStoreHeaderImage] = useState("");
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
    :hover {
      background: #282a3a;
    }
  }
  max-width: 800px;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.02);
    background: #f9f9f9;
    cursor: pointer;
  }
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
    background: #c74c4c;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
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
      /*  don't wrap the text*/
      white-space: nowrap;
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
    height: 145px;
    background: #c74c4c;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .bottom {
    padding: 34px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .manage-settings {
    display: flex;
    gap: 10px;
    margin-left: -12px;
    .tab {
      display: flex;
      align-items: baseline;
      justify-content: flex-end;
      text-decoration: none;
      gap: 0.2rem;
      border-radius: 0.25rem; /* Assuming default border radius */
      color: ${isDarkModeOn
        ? "#C5D0FF"
        : "#4F58A3"}; /* Ternary for text color */
      padding: 8px 12px; /* Assuming Tailwind CSS default spacing unit */
      font-size: 14px;
      line-height: 16px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Assuming Tailwind CSS default timing function and duration */
      white-space: nowrap;
      &:focus {
        outline: 2px solid transparent; /* Assuming Tailwind CSS default focus outline */
        outline-offset: 2px; /* Assuming Tailwind CSS default focus outline offset */
        box-shadow: 0 0 0 2px
          ${isDarkModeOn
            ? "rgba(59, 130, 246, 0.5)"
            : "rgba(66, 153, 225, 0.5)"}; /* Ternary for box-shadow */
        background-color: ${isDarkModeOn
          ? "rgba(59, 130, 246, 0.35)"
          : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
      }
      &:hover {
        background-color: ${isDarkModeOn
          ? "rgba(59, 130, 246, 0.15)"
          : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
      }
      cursor: pointer;
      @media (max-width: 768px) {
        padding: 12px;
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
`;
const role = contract.owner_id === accountId ? "Owner" : "Minter";
console.log({ owner: contract.owner_id, accountId });
const verifiedBatch = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="18px"
    viewBox="0 0 24 24"
    width="18px"
    fill={isDarkModeOn ? "#fff" : "#000000"}
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
          loading="lazy"
          decoding="async"
          data-nimg="fill"
          src={
            storeHeaderImage ||
            "https://ipfs.near.social/ipfs/bafkreiajgp5bmkidwesy2d6tsbdkhyfzjtom2wse2sjcwii227lt5audvq"
          }
          className="chain_banner"
          alt={
            contract.nft_contract_id.endsWith(".testnet")
              ? contract.nft_contract_id.replace(".testnet", "") + " banner"
              : contract.nft_contract_id.slice(
                  0,
                  contract.nft_contract_id.length - 5
                ) + " banner"
          }
        />
      </div>
      <div className="middle">
        <div className="content">
          <div className={`icon_area ${isDarkModeOn ? "dark-icon_area" : ""}`}>
            <img
              src={
                storeProfileImage ||
                "https://ipfs.near.social/ipfs/bafkreiajgp5bmkidwesy2d6tsbdkhyfzjtom2wse2sjcwii227lt5audvq"
              }
              className="chain_icon"
              alt={
                contract.nft_contract_id.endsWith(".testnet")
                  ? contract.nft_contract_id.replace(".testnet", "") + " banner"
                  : contract.nft_contract_id.slice(
                      0,
                      contract.nft_contract_id.length - 5
                    ) + " icon"
              }
            />
          </div>
          <div className="contract_owner">
            <h3>
              {(contract.nft_contract_id.length > 22
                ? `${contract?.nft_contract_id.substring(0, 20)}...`
                : contract?.nft_contract_id) || "contract Name"}{" "}
              {verifiedBatch}
            </h3>
            <p className={isDarkModeOn ? "dark_role" : ""}>Role: {role}</p>
          </div>
        </div>
      </div>
    </a>
    <div className={`bottom ${isDarkModeOn ? "dark" : ""}`}>
      <div className="d-flex lhs gap-2 w-75">
        <div className="manage-settings">
          <a href="#" className="tab">
            Manage NFTs
          </a>
          {isConnected && (
            <a href="#" className="tab">
              Settings
            </a>
          )}
        </div>
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
