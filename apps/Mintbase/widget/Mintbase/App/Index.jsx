const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const DaoSDK = VM.require("megha19.near/widget/daoSDK") || {
  DaoSDK: () => <></>,
};

const currentMode = Storage.get("mode");
const LOCALSTORAGE_KEY = "connectedDao";

const localStorageData = Storage.get("connectedDao");

const setLocalStorageData = (data) => {
  try {
    Storage.set(LOCALSTORAGE_KEY, data);
    console.log("successfully written to BOS local storage", data);
  } catch (error) {
    console.error("Error writing to Storage:", error);
  }
};

const [mode, setMode] = useState(currentMode || "light");
const [connectAsDao, setConnectAsDao] = useState(localStorageData);
const [daoError, setDaoError] = useState("");
const [daoAddress, setDaoAddress] = useState(localStorageData.address || "");
const [sdk, setSdk] = useState(null);
const [inputActive, setInputActive] = useState(!!!connectAsDao.address ?? true);
const isDarkModeOn = mode === "dark";

const data = fetch(`https://httpbin.org/headers`);
const gatewayURL = data?.body?.headers?.Origin ?? "";

useEffect(() => {
  setConnectAsDao(localStorageData);
}, [localStorageData]);

const Container =
  gatewayURL.includes("near.social") ||
  gatewayURL.includes("mintbos.vercel.app")
    ? styled.div`
        position: fixed;
        inset: var(--body-top-padding, 0) 0px 0px;
        width: 100%;
        overflow-y: scroll;
      `
    : styled.div`
        width: 100%;
      `;

const App = styled.div`
  .floating-btns {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    flex-flow: column nowrap;
    justify-content: flex-end;
    align-items: flex-end;
    z-index: 100000;
  }
  .input {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;
    .input-field {
      width: 100%;
    }
  }
  .connected_as {
    font-size: 12px;
    margin-bottom: 0rem;
  }
  .status_indicator {
    width: 10px;
    height: 10px;
    border-radius: 50px;
    margin: 0px;
  }
  .green {
    background: green;
  }
  .red {
    background: red;
  }
  .error {
    color: red;
    font-size: 12px;
  }
`;

const Root = styled.div`
  // you can override classnames here
`;

const switchChangeHandler = () => {
  if (!isDarkModeOn) {
    setMode("dark");
    Storage.set("mode", "dark");
  } else {
    setMode("light");
    Storage.set("mode", "light");
  }
};

const Toggle = styled.div`
  padding: 0.5rem;
  background-color: ${!isDarkModeOn ? "#1f2937" : "#D2D4DA"};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
`;
const DAOToggle = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &.dark-dao {
    background-color: #1f2937;
  }
  .ctab {
    background-color: var(--gray-100, #f3f4f8);
    color: var(--gray-800, #282a3a);
    width: 100%;
    font-size: 12px;
    &.user-dark {
      background-color: #282a3a;
      color: #fff;
      svg {
        path {
          stroke: #fff;
        }
      }
    }
  }
`;
const config = {
  layout: {
    src: "${config_account}/widget/Mintbase.App.Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: (props) => (
      // customize your header
      <Widget
        src="${config_account}/widget/Mintbase.App.Navbar.Index"
        props={{
          routes: config.router.routes,
          isDarkModeOn,
          isHome: props.isHome,
          ...props,
        }}
      />
    ),
    Footer: () => (
      <Widget
        src="${config_account}/widget/Mintbase.App.Footer.Index"
        props={{ isDarkModeOn, setMode }}
      />
    ),
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "${config_account}/widget/Mintbase.App.Home.Index",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
        display: false,
        hidden: true,
      },
      search: {
        path: "${config_account}/widget/Mintbase.App.Search.Index",
        blockHeight: "final",
        init: {
          name: "Search",
        },
        display: false,
        hidden: true,
      },
      nftDetails: {
        path: "${config_account}/widget/Mintbase.App.NFTDetails.Index",
        blockHeight: "final",
        init: {
          name: "NFT Page",
        },
        display: false,
        hidden: true,
      },
      markets: {
        path: "${config_account}/widget/Mintbase.App.Explore.Index",
        blockHeight: "final",
        init: {
          name: "Markets",
          left: [
            { name: "Featured Contracts", tab: "Featured" },
            { name: "New Listings", tab: "newListing" },
          ],
          right: {
            one: [
              { name: "AI", tab: "AI" },
              { name: "Gaming", tab: "Gaming" },
              { name: "Philanthropy", tab: "Philanthropy" },
            ],
            two: [
              { name: "Arts", tab: "Art" },
              { name: "Music", tab: "Music" },
              { name: "Photography", tab: "Photography" },
            ],
            three: [
              { name: "DAOs", tab: "DAOs" },
              { name: "PFPs", tab: "PFPs" },
              { name: "Utilities", tab: "Utility" },
            ],
          },
        },
      },
      human: {
        path: "${config_account}/widget/Mintbase.App.Profile.Index",
        blockHeight: "final",
        init: {
          name: "Human",
          right: {
            one: [
              { name: "Owned", tab: "owned" },
              { name: "minted", tab: "minted" },
              { name: "About", tab: "about" },
            ],
            two: [
              { name: "Activity", tab: "activity" },
              { name: "Contracts", tab: "contracts" },
              { name: "User Settings", tab: "user-settings" },
            ],
          },
        },
        display: false,
        hidden: true,
      },
      contract: {
        path: "${config_account}/widget/Mintbase.App.ContractProfilePage.Index",
        blockHeight: "final",
        init: {
          name: "StoreFront",
          right: {
            one: [
              { name: "NFTs", tab: "nfts" },
              { name: "mint NFT", tab: "mint-nft" },
              { name: "About", tab: "about" },
            ],
            two: [
              { name: "Activity", tab: "activity" },
              { name: "Contracts", tab: "contracts" },
              { name: "User Settings", tab: "user-settings" },
            ],
          },
        },
        display: false,
        hidden: true,
      },
      manage: {
        path: "${config_account}/widget/Mintbase.App.LaunchPad.Index",
        blockHeight: "final",
        init: {
          name: "Manage",
          left: [
            {
              name: "My Contracts",
              tab: "my-contracts",
              external: true,
            },
            { name: "Earned", tab: "earned" },
            { name: "Stripe Connect", tab: "stripe-connection" },
            { name: "Offered To Me", tab: "offered-to-me" },
            { name: "My Offers", tab: "my-offers" },
          ],
          right: [
            {
              label: "Deploy Contracts",
              ipfsHash:
                "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
            },
            {
              label: "Creator Docs",
              ipfsHash:
                "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
              route: "https://docs.mintbase.xyz/creator/creating-nfts",
            },
          ],
        },
      },
      developers: {
        init: {
          name: "Developers",
          left: [
            { name: "Templates", link: "https://templates.mintbase.xyz/" },
            { name: "Github", link: "https://github.com/mintbase" },
            { name: "Indexer", tab: "developers" },

            { name: "Affiliate Direct", tab: "affiliate" },
            {
              name: "Mintbase Grants",
              link: "https://github.com/mintbase/Grants-Program",
            },
            { name: "Developer API", tab: "DeveloperAPI" },
          ],
          right: [
            {
              label: "Deploy Selfie Minter",
              ipfsHash:
                "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
              route:
                "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Fminsta",
            },
            {
              label: "Developer Docs",
              ipfsHash:
                "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
              route: "https://docs.mintbase.xyz/dev/getting-started",
            },
          ],
        },
      },
      explorer: {
        path: "${config_account}/widget/Mintbase.App.Activity.index",
        blockHeight: "final",
        init: {
          name: "Explorer",
          left: [
            { name: "Activity", tab: "Activity" },
            {
              name: "Analytics",
              link: "https://www.mintbase.xyz/stats/charts",
            },
            { name: "Top Affiliate", tab: "TopAffiliates" },
          ],
        },
      },
      solutions: {
        path: "${config_account}/widget/Mintbase.App.Solutions.Index",
        blockHeight: "final",
        init: {
          name: "Solutions",
          left: [
            { name: "Enterprise", tab: "Enterprise" },
            { name: "Use Case", tab: "UseCases" },
            { name: "Affiliate Direct", tab: "TopAffiliates" },
            { name: "Mintbase Grants", tab: "MintbaseGrants" },
          ],
          right: [
            {
              label: "Mintbase AI",
              ipfsHash:
                "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
              route: "https://ai.mintbase.xyz/",
            },
            {
              label: "Mintbase Wallet",
              ipfsHash:
                "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
              route: "https://wallet.mintbase.xyz/",
            },
          ],
        },
      },
      DAOs: {
        path: "${config_account}/widget/Mintbase.App.DAOs.Index",
        blockHeight: "final",
        init: {
          name: "DAOs",
          left: [{ name: "Search DAOs", tab: "all-daos" }],
        },
      },
      resources: {
        path: "${config_account}/widget/Mintbase.App.Resources.Index",
        blockHeight: "final",
        init: {
          name: "Resources",
          left: [
            { name: "Guide", tab: "guide" },
            { name: "Getting Started", tab: "gettingStarted" },
            { name: "Deploying Widgets", tab: "deploying_widget" },
            { name: "Mintbase SDK", tab: "sdk_guide" },
          ],
        },
      },
    },
  },
};

const validateDAOaddress = (id) => {
  const newSdk = DaoSDK(id);
  setSdk(newSdk);
  const policy = newSdk && newSdk.getPolicy();
  const hasPermision =
    newSdk &&
    newSdk.hasPermission({
      accountId: accountId,
      kindName: "FunctionCall",
      actionType: "AddProposal",
    });

  console.log("policy", policy);

  if (!policy) {
    setDaoError("Invalid DAO address");
    console.error("Invalid dao address", id);
    return false;
  } else {
    setDaoError(null);
    setLocalStorageData({
      ...connectAsDao,
      address: id,
      permission: hasPermision,
    });
    setConnectAsDao({
      ...connectAsDao,
      address: id,
      permission: hasPermision,
    });
    setInputActive(false);
    return true;
  }
};

return (
  <Container>
    <App>
      <Widget
        src="${config_account}/widget/Mintbase.App.View"
        props={{
          config,
          ...props,
          isDarkModeOn,
          gatewayURL,
          connectedDao: connectAsDao,
        }}
      />
      <div className="floating-btns">
        <DAOToggle title="DAO stuff" className={isDarkModeOn ? "dark-dao" : ""}>
          {inputActive ? (
            <div>
              <div className="input d-flex nowrap">
                <MbInputField
                  id="connectasdao"
                  placeholder="dao address"
                  type="text"
                  // label="Connect as DAO"
                  error={daoError}
                  className="input-field"
                  value={daoAddress}
                  isDarkModeOn={isDarkModeOn}
                  onChange={(e) => setDaoAddress(e.target.value)}
                />
                <Widget
                  src={`${config_account}/widget/Mintbase.MbButton`}
                  props={{
                    label: "Connect",
                    btnType: "primary",
                    size: "medium",
                    state: "active",
                    onClick: (e) => {
                      e.stopPropagation();
                      validateDAOaddress(daoAddress);
                    },
                    isDarkModeOn,
                  }}
                />
              </div>
              {daoError && <p className="error">{daoError}</p>}
            </div>
          ) : (
            <div
              className="input d-flex align-items-center nowrap"
              style={{ justifyContent: "unset" }}
            >
              <div>
                <p className="connected_as">
                  Connected as:{" "}
                  {connectAsDao.permission ? "member" : "non-member"}
                </p>
                <p
                  className="d-flex align-items-center ctab"
                  style={{
                    cursor: "unset",
                  }}
                >
                  <p
                    className={`status_indicator ${
                      connectAsDao.permission
                        ? `green`
                        : `red 
                    `
                    }`}
                  ></p>
                  {connectAsDao.address}
                </p>
              </div>
              <i
                className="bi bi-pencil-fill py-2 px-3 rounded-2"
                style={{
                  color: isDarkModeOn ? "#000" : "#fff",
                  backgroundColor: isDarkModeOn ? "#fff" : "#000",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setInputActive(true);
                }}
              ></i>
            </div>
          )}
        </DAOToggle>
        <Toggle onClick={switchChangeHandler} title="Toggle Theme">
          <Widget
            src={"${config_account}/widget/Mintbase.MbIcon"}
            props={{
              name: !isDarkModeOn ? "moon" : "sun",
              size: "22px",
              isDarkModeOn,
              color: !isDarkModeOn ? "mb-white" : "mb-black",
            }}
          />
        </Toggle>
      </div>
    </App>
  </Container>
);
