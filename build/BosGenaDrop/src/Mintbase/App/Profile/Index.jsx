const accountId = props.accountId ?? context.accountId;

const isConnected = context.accountId === accountId;
const { MbModal, LinkTree } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
) || {
  MbModal: () => <></>,
  LinkTree: () => <></>,
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
  width: 100%;
  img {
    width: 126px;
    height: 126px;
    border-radius: 50%;
    position: absolute;
    bottom: -24px;
    border: 4px solid ${isDarkModeOn ? "#1e2030" : "#fff"};
    left: 48px;
    background: #aa4747;
    z-index: 1;
    margin: 0 auto;
    @media (max-width: 768px) {
      width: 80px;
      height: 80px;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (max-width: 1024px) {
    margin-top: calc(var(--body-top-padding) * -1) -12px 0;
  }
  @media (max-width: 768px) {
    height: 125px;
  }
`;

const TopContent = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
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
    border-radius: 4px;
    padding: 10px;
    background: ${isDarkModeOn ? "#282A3A" : "#f9f9f9"};
    span {
      font-size: 12px;
      font-weight: 500;
      color: ${isDarkModeOn ? "#B3B5BD" : "#404252"};
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
  .bos_share {
    display: flex;
    gap: 10px;
    .profile {
      display: flex;
      text-decoration: none;
      color: black;
      align-items: center;
      width: max-content;
      cursor: pointer;
      font-size: 12px;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid #b0b0b0;
      i {
        color: ${isDarkModeOn ? "#fff" : "#000"} !important;
      }
      span {
        color: ${isDarkModeOn ? "#fff" : "#000"};
      }
    }
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`;

const queryInOwnedToggleHandler = () => {
  setShowOwnedFilters((prev) => !prev);
};

const AboutOwner = styled.div`
  background: ${isDarkModeOn ? "#1E2030" : "#FFF"};
  overflow: hidden;
  .owner-details-main {
    margin-left: 48px;
    margin-bottom: 24px;
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



// query GET_TOKENS_COUNT_PER_HUMAN {
//   tokensCount: mb_views_nft_tokens_aggregate(where: {owner: {_eq: $ownerId}}) {
//     aggregate {
//       count
//     }
//   }
// }


// query GetTransactionsCountPerHuman {
//   count: nft_activities_aggregate(where: {action_sender: {_eq: "nate.near"}}) {
//     aggregate {
//       count
//     }
//   }
// }

// query GetSalesInNEARPerHuman {
//   nft_earnings_aggregate(
//     where: {receiver_id: {_eq: "nate.near"}, currency: {_eq: "near"}}
//   ) {
//     aggregate {
//       sum {
//         amount
//       }
//     }
//   }
// }

const details = [
  { name: "Tokens", value: "1075" },
  { name: "Listed Tokens", value: "109" },
  { name: "Bought", value: "161.18N" },
  { name: "Sales", value: "189.41N" },
  { name: "Transactions", value: "1776" },
  { name: "Last Activity", value: "3 hours ago" },
];

console.log("profile", profile.linktree);

const PageContent = () => {
  switch (selectedTab) {
    case "owned":
      return (
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.App.Tokens.Owned`}
          props={{
            isDarkModeOn,
            ownerId: accountId,
            isConnected,
            showFilters: showOwnedFilters,
            onCreateStore,
          }}
        />
      );
    case "minted":
      return (
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.App.Tokens.Minted`}
          props={{
            isDarkModeOn,
            minterId: accountId,
            isConnected,
            showFilters: showOwnedFilters,
            onCreateStore,
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
          src={`bos.genadrop.near/widget/Mintbase.App.Profile.Activity`}
          props={{ isDarkModeOn, accountId }}
        />
      );
    case "contracts":
      return (
        <>
          <Widget
            src={`bos.genadrop.near/widget/Mintbase.App.Store.Cards`}
            props={{
              isDarkModeOn,
              accountId,
            }}
          />
        </>
      );
    case "user-settings":
      return (
        <div>
          <h2>User Settings</h2>
          <div className="user-settings">
            <div className="user-settings__item">
              <h3>Profile</h3>
              <Widget
                src={`bos.genadrop.near/widget/Mintbase.App.Profile`}
                props={{
                  accountId,
                  isDarkModeOn,
                }}
              />
            </div>
            <div className="user-settings__item">
              <h3>Notifications</h3>
              <Widget
                src={`bos.genadrop.near/widget/Mintbase.App.Notifications`}
                props={{
                  accountId,
                  isDarkModeOn,
                }}
              />
            </div>
            <div className="user-settings__item">
              <h3>Security</h3>
              <Widget
                src={`bos.genadrop.near/widget/Mintbase.App.Security`}
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

const [count, setCount] = useState(0);

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

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreib2cfbayerbbnoya6z4qcywnizqrbkzt5lbqe32whm2lubw3sywr4";

const background = profile.backgroundImage
  ? profile.headerImage ??
    `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
  : "https://ipfs.near.social/ipfs/bafkreiajgp5bmkidwesy2d6tsbdkhyfzjtom2wse2sjcwii227lt5audvq";

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
          loading="lazy"
          decoding="async"
          data-nimg="fill"
          src={
            profile.image
              ? profile.profileImage ??
                `https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`
              : "https://ipfs.near.social/ipfs/bafkreiajgp5bmkidwesy2d6tsbdkhyfzjtom2wse2sjcwii227lt5audvq"
          }
          alt={`${profile.displayName || profile.name} profile image`}
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
                src={`bos.genadrop.near/widget/Mintbase.MbActionText`}
                props={{
                  text: accountId,
                  size: "medium",
                  copyText: accountId,
                  link: `https://nearblocks.io/address/${accountId}`,
                  iconTab: false,
                  showCopyIcon: true,
                  isDarkModeOn: isDarkModeOn,
                }}
              />
            </div>
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
          <LinkTree links={profile.linktree} isDarkModeOn={isDarkModeOn} />
          <div className="bos_share">
            <a
              href={`https://${accountId}.social`}
              target="_blank"
              className="profile"
            >
              <Widget
                src="bos.genadrop.near/widget/Mintbase.MbIcon"
                props={{
                  name: "near",
                  color: isDarkModeOn ? "mb-white" : "mb-black",
                  size: "16px",
                }}
              />
              <span>BOS</span>
            </a>
            <div key={index} className="profile">
              <i className="bi bi-box-arrow-up"></i>
              <span>Share</span>
            </div>
          </div>
        </Profiles>
      </div>
    </AboutOwner>
    <Widget
      src={`bos.genadrop.near/widget/Mintbase.MbTabs`}
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
      open={modalIsOpen}
      setOpen={setModalIsOpen}
      topElement={
        <h4 style={{ marginRight: "8px" }}>Let's Create Your Store</h4>
      }
      isDarkModeOn={isDarkModeOn}
      onClose={null}
      topElementFirst={true}
    >
      <Widget
        src={`bos.genadrop.near/widget/Mintbase.App.Store.CreateForm`}
        props={{
          isDarkModeOn,
          onCancel: () => setModalIsOpen(false),
          setModalOpen: setModalIsOpen,
        }}
      />
    </MbModal>
  </Card>
);
