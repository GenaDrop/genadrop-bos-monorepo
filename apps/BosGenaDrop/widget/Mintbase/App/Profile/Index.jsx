const accountId = props.accountId ?? context.accountId;

const isConnected = context.accountId === accountId;
const { MbModal } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
) || {
  MbModal: () => <></>,
};
const { MbInputField } = VM.require(
  "bos.genadrop.near/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const actualTabs = {
  tabLabels: [
    { id: 0, title: "Owned" },
    { id: 1, title: "Minted" },
    { id: 2, title: "_About", hidden: !isConnected },
    { id: 3, title: "Activity" },
    { id: 4, title: "Contracts" },
    { id: 5, title: "_User Settings", hidden: !isConnected },
  ],
};

const hiddenTabs = actualTabs.tabLabels
  .filter((tab) => !tab.hidden)
  .map((tab) => tab.title);
const tabProps = { tabLabels: hiddenTabs };

console.log("tabProps", tabProps);

const [selectedTab, setSelectedTab] = useState(props.tab ?? "owned");
const [open, setOpen] = useState(false);
const [sdk, setSDK] = useState(false);
const [storeName, setStoreName] = useState("");
const [storeSymbol, setStoreSymbol] = useState("");
const [showOwnedFilters, setShowOwnedFilters] = useState(true);
const [profile, setProfile] = useState(null);
const isDarkModeOn = props.isDarkModeOn ?? false;

const handleTabClick = (index) => {
  setSelectedTab(index);
  // console.log("selectedTab from Mine: ", selectedTab);
};

const onStoreNameChange = useCallback((e) => {
  console.log("onStoreNameChange", e.target.value);
  setStoreName(e.target.value);
}, []);

const handleDeploy = () => {
  console.log("handleDeploy", storeName, storeSymbol);
  // console.log("sdk", sdk);
  sdk.deployStore(storeName, storeSymbol);
};

// console.log("tabProps", tabProps);

const Card = styled.div`
  width: 100%;
  border-radius: 0;
  background-color: #f9fafb;
  color: black;
  margin: 0;
  padding: 0;
  &.dark {
    color: white;
  }
  .content_main {
    padding: 24px 48px;
  }
`;

const CreateStore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .bottom-buttons {
    display: flex;
    position: absolute;
    bottom: 48px;
    right: 24px;
    width: calc(100% - 48px);
    justify-content: space-between;
    align-items: center;
  }
`;

const ImageSection = styled.div`
  height: 254px;
  background: #eceef0;
  position: relative;
  z-index: 1;
  img {
    width: 126px;
    height: 126px;
    border-radius: 50%;
    position: absolute;
    bottom: -24px;
    border: 3px solid #1e2030;
    left: 48px;
    background: #aa4747;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    margin: calc(var(--body-top-padding) * -1) -12px 0;
    border-radius: 0;
  }

  @media (max-width: 1024px) {
    height: 100px;
  }
`;

const TopContent = styled.div`
  margin-top: 40px;
  h1 {
    font-size: 20px;
  }
  .contents {
    display: flex;
    flex-direction: column;
    margin: 0;
    .content {
      margin: 0;
      display: flex;
      gap: 20px;
      p {
        margin: 0;
      }
    }
  }
`;

const Details = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;
  flex-wrap: wrap;
  .detail {
    display: flex;
    flex-direction: column;
    width: 112px;
    height: 56px;
    align-items: flex-start;
    padding: 10px;
    background: #f9f8f8;
    span {
      font-size: 12px;
      font-weight: 500;
    }
    p {
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

const Profiles = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  .profile {
    display: flex;
    text-decoration: none;
    color: black;
    align-items: center;
    width: max-content;
    cursor: pointer;
    font-size: 12px;
    padding: 5px 7px;
    border-radius: 4px;
    border: 1px solid #b0b0b0;
    img {
      width: 15px;
    }
  }
`;

const queryInOwnedToggleHandler = () => {
  setShowOwnedFilters((prev) => !prev);
};

const AboutOwner = styled.div`
  background: ${isDarkModeOn ? "#1E2030" : "#FFF"};
  .owner-details-main {
    margin-left: 48px;
  }
`;
const createStoreHandler = () => {
  // console.log("createStoreHandler");
  setOpen(true);
};

useEffect(() => {
  asyncFetch(`https://api.mintbase.xyz/accounts/${accountId}`, {
    method: "GET",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
  }).then((data) => {
    if (data.body) {
      const parseData = data.body;
      setProfile(parseData);
    }
  });
}, []);

console.log("profile", profile);

const details = [
  { name: "Tokens", value: "1075" },
  { name: "Listed Tokens", value: "109" },
  { name: "Bought", value: "161.18N" },
  { name: "Sales", value: "189.41N" },
  { name: "Transactions", value: "1776" },
  { name: "Last Activity", value: "3 hours ago" },
];

const profiles = [
  { icon: "twitter", link: "https://twitter.com/sharddog" },
  { icon: "web", name: "Share.dog", link: "https://twitter.com/sharddog" },
  {
    icon: "simple_share",
    name: "Simple Share",
    link: "https://www.mintbase.xyz/contract/mint.sharddog.near/nfts/all/0?orderBy=price+desc+nulls+last#",
  },
  {
    icon: "Claim Ownership",
    name: "Claim Ownership",
    link: "https://docs.google.com/forms/d/1w9QK9GXqmlRGLdS5Dm-yUoRdsd5klky89TwDEck35-M/viewform?edit_requested=true",
  },
  {
    icon: "near",
    name: "BOS",
    link: "https://near.org/mintbase.near/widget/nft-marketplace?contracts=mint.sharddog.near",
  },
];

// if (profile === null) {
//   return "Loading";
// }

const PageContent = () => {
  switch (selectedTab) {
    case "owned":
      return (
        <Widget
          src={`/*__@appAccount__*//widget/Mintbase.App.Tokens.Owned`}
          props={{
            isDarkModeOn,
            ownerId: accountId,
            isConnected,
            showFilters: showOwnedFilters,
          }}
        />
      );
    case "minted":
      return (
        <Widget
          src={`/*__@appAccount__*//widget/Mintbase.App.Tokens.Minted`}
          props={{
            isDarkModeOn,
            MinterId: accountId,
            isConnected,
            showFilters: showOwnedFilters,
          }}
        />
      );
    case "about":
      return (
        <div>
          <h2>About User</h2> <p>Nothing to show yet</p>
        </div>
      );
    case "activity":
      return (
        <Widget
          src={`/*__@appAccount__*//widget/Mintbase.App.Profile.Activity`}
          props={{ isDarkModeOn }}
        />
      );
    case "contracts":
      return (
        <div>
          <Widget
            src={`/*__@appAccount__*//widget/Mintbase.App.Store.Cards`}
            props={{
              isDarkModeOn,
            }}
          />
        </div>
      );
    case "user-settings":
      return (
        <div>
          <h2>User Settings</h2>
          <div className="user-settings">
            <div className="user-settings__item">
              <h3>Profile</h3>
              <Widget
                src={`/*__@appAccount__*//widget/Mintbase.App.Profile`}
                props={{
                  accountId,
                  isDarkModeOn,
                }}
              />
            </div>
            <div className="user-settings__item">
              <h3>Notifications</h3>
              <Widget
                src={`/*__@appAccount__*//widget/Mintbase.App.Notifications`}
                props={{
                  accountId,
                  isDarkModeOn,
                }}
              />
            </div>
            <div className="user-settings__item">
              <h3>Security</h3>
              <Widget
                src={`/*__@appAccount__*//widget/Mintbase.App.Security`}
                props={{
                  accountId,
                  isDarkModeOn,
                }}
              />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const modalContent = (
  <>
    <Widget
      src={`/*__@appAccount__*//widget/Mintbase.App.Store.CreateForm`}
      props={{
        storeName,
        storeSymbol,
        onStoreNameChange,
        onStoreSymbolChange: (e) => setStoreSymbol(e.target.value),
        handleDeploy,
        isDarkModeOn,
      }}
    />
  </>
);

const [count, setCount] = useState(0);

const background = profile.backgroundImage
  ? profile.headerImage ??
    `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
  : "https://ipfs.near.social/ipfs/bafkreigtgmfmdoq66fuu6oepaddggslos3m7xyngja47zy2kuyicp3chay";

return (
  <Card className={isDarkModeOn ? "dark" : ""}>
    <Widget
      src="bos.genadrop.near/widget/Mintbase.SDK"
      props={{
        mainnet: false,
        contractName: "mintspace2.testnet",
        loaded: sdk,
        onLoad: (sdk) => setSDK(sdk),
        onRefresh: (sdk) => setSDK(sdk),
      }}
    />
    <AboutOwner>
      <ImageSection
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={
            profile.image
              ? profile.profileImage ??
                `https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`
              : "https://ipfs.near.social/ipfs/bafkreiajgp5bmkidwesy2d6tsbdkhyfzjtom2wse2sjcwii227lt5audvq"
          }
        />
      </ImageSection>
      <div className="owner-details-main">
        <TopContent>
          <h1>
            {profile.displayName || profile.name} {verifiedBatch}
          </h1>
          <div className="contents">
            <div className="content">
              <p>Address</p>
              <Widget
                src={`/*__@appAccount__*//widget/Mintbase.MbActionText`}
                props={{
                  text: accountId,
                  size: "medium",
                  copyText: "mint.sharddog.near",
                  link: "https://nearblocks.io/address/mint.sharddog.near",
                  iconTab: false,
                  iconCopy: false,
                  mode: mode,
                }}
              />
            </div>
            {/* <div className="content">
            <p>Created by</p>
            <a>sharedog.near</a>
          </div>
          <div className="content">
            <p>Category</p>
            <a>Utility</a>
          </div>
          <div className="desc">The main ShardDog series based contract</div> */}
          </div>
        </TopContent>
        <Details>
          {details.map((data, key) => (
            <div className="detail" key={key}>
              <span>{data.name}</span>
              <p>{data.value}</p>
            </div>
          ))}
        </Details>
        <Profiles>
          {profiles.map((data, index) => (
            <a href={data.link} target="_blank" key={index} className="profile">
              <Widget
                src="/*__@appAccount__*//widget/Mintbase.MbIcon"
                props={{
                  name: data.icon,
                }}
              />
              <span>{data.name}</span>
            </a>
          ))}
        </Profiles>
      </div>
    </AboutOwner>
    <Widget
      src={`/*__@appAccount__*//widget/Mintbase.MbTabs`}
      props={{
        ...tabProps,
        activeTab: selectedTab,
        onTabChange: handleTabClick,
        isDarkModeOn,
        hasQueryToggle: selectedTab === "owned" || selectedTab === "minted",
        onQueryToggle: queryInOwnedToggleHandler,
      }}
    />
    <div
      className="d-flex flex-column align-items-center content_main"
      style={{
        backgroundColor: `${isDarkModeOn ? "#101223" : "#F9F9F9"}`,
      }}
    >
      <PageContent />
    </div>

    <MbModal
      open={open}
      setOpen={setOpen}
      topElement={
        <h4 style={{ marginRight: "8px" }}>Let's Create Your Store</h4>
      }
      isDarkModeOn={isDarkModeOn}
      onClose={null}
      topElementFirst={true}
    >
      {modalContent}
    </MbModal>
  </Card>
);
