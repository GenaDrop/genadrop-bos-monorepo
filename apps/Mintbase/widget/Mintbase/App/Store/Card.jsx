const accountId = props.accountId ?? context.accountId;

const { href } = VM.require("${alias_builddao}/widget/lib.url") || {
  href: () => {},
};

const { contract, isDarkModeOn } = props;

const isConnected = contract.owner_id === accountId;

const [storeProfileImage, setStoreProfileImage] = useState("");
const [storeHeaderImage, setStoreHeaderImage] = useState("");

const StoreCard = styled.div`
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.05);
  gap: 2em;
  margin: 10px auto;
  width: 100%;
  background: var(--gray-50, #f9f9f9);
  color: #000;
  &.dark-store-card {
    background: #1e2030;
    color: var(--gray-50, #f9f9f9);
    :hover {
      background: var(--gray-800, #282a3a);
    }
  }
  max-width: 800px;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.02);
    background: var(--gray-50, #f9f9f9);
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
    border-color: var(--gray-50, #f9f9f9);
    display: flex;
    overflow: hidden;
    position: absolute;
    margin-top: -50px;
    background: var(--error-300, #c74c4c);
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    &.dark-icon_area {
      border-color: var(--gray-850, #1e2030);
    }

    /* on tablets and mobile */
    @media screen and (max-width: 768px) {    
      width: 67px;
      height: 67px;
      margin-top: -15px;
    }
   }

  .contract_owner {
    margin-top: 10px;
    h3 {
      font-weight: bold;
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      white-space: nowrap;
      @media (max-width: 628px) {
        font-size: 16px;
      }
    }
    p {
      font-size: 12px;
      margin: 0;
      font-weight: 400;
      color: var(--gray-700, #404252);
      &.dark_role {
        color: var(--gray-300, #b3b5bd);
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

        /* tablets and phones */
        @media screen and (max-width: 768px) {
          margin-left: 78px;
        }
      }
    }
  }

  .top {
    height: 145px;
    background: var(--error-300, #c74c4c);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* on tablets and mobile */
    @media screen and (max-width: 768px) {
      height: 83px;
    }
  }
  .bottom {
    padding: 34px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* tablets and phones */
    @media screen and (max-width: 768px) {
      padding: 12px;
    }
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
      border-radius: 0.25rem;
      color: var(${isDarkModeOn ? "--blue-100,#C5D0FF" : "--blue-300,#4F58A3"});
      padding: 8px 12px;
      font-size: 14px;
      line-height: 16px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      white-space: nowrap;

      &:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
        box-shadow: 0 0 0 2px
          var(
            ${isDarkModeOn
              ? "--mb-tab-hover-dark,#3b82f67f"
              : "--mb-tab-hover-light,#4299e17f"}
          );
        background-color: var(
          ${isDarkModeOn
            ? "--mb-tab-bg-dark, #3b82f659"
            : "--mb-tab-bg-light, #4299e126"}
        );
      }

      &:hover {
        background-color: var(
          ${isDarkModeOn
            ? "--mb-tab-bg-dark, #3b82f659"
            : "--mb-tab-bg-light, #4299e126"}
        );
      }

      cursor: pointer;
      @media (max-width: 768px) {
        padding: 12px;
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
  @media (max-width: 568px){
    max-width: 70%;
    margin: 0;
  }
`;

const role = contract.owner_id === accountId ? "Owner" : "Minter";

return (
  <StoreCard className={isDarkModeOn ? "dark-store-card" : ""}>
    <Link
      key={"storeFront"}
      className="route"
      to={href({
        widgetSrc: "${config_account}/widget/Mintbase.App.Index",
        params: {
          page: "contract",
          tab: `nfts&accountId=${contract.nft_contract_id}`,
        },
      })}
      style={{ textDecoration: "none", color: "inherit" }}
    >
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
              {(contract.nft_contract_id.length > 19
                ? `${contract?.nft_contract_id.substring(0, 15)}...`
                : contract?.nft_contract_id) || "contract Name"}{" "}
            </h3>
            <p className={isDarkModeOn ? "dark_role" : ""}>Role: {role}</p>
          </div>
        </div>
      </div>
      <div className={`bottom ${isDarkModeOn ? "dark" : ""}`}>
        <div className="d-flex lhs gap-2 w-75">
          <div className="manage-settings">
            <Link
              key={"storeFront"}
              className="route tab"
              to={href({
                widgetSrc: "${config_account}/widget/Mintbase.App.Index",
                params: {
                  page: "contract",
                  tab: `nfts&accountId=${contract.nft_contract_id}`,
                },
              })}
            >
              Manage NFTs
            </Link>
            {/* {isConnected && (
              <Link
                key={"settings"}
                className="route tab"
                to={href({
                  widgetSrc: "${config_account}/widget/Mintbase.App.Index",
                  params: {
                    page: "contract",
                    tab: `contract-settings&accountId=${contract.nft_contract_id}`,
                  },
                })}
              >
                Settings
              </Link>
            )} */}
          </div>
        </div>
        <div>
          <Link
            key={"Mint"}
            className="route"
            to={href({
              widgetSrc: "${config_account}/widget/Mintbase.App.Index",
              params: {
                page: "contract",
                tab: `mint-nft&accountId=${contract.nft_contract_id}`,
              },
            })}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Widget
              src={`${config_account}/widget/Mintbase.MbButton`}
              props={{
                label: "Mint NFT",
                btnType: "primary",
                size: "medium",
                isDarkModeOn,
              }}
            />
          </Link>
        </div>
      </div>
    </Link>
  </StoreCard>
);
