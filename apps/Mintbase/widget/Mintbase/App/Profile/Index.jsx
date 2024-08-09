const accountId = props.accountId ?? context.accountId;

const isConnected = context.accountId === accountId;
const { MbModal, LinkTree } = VM.require(
  "${config_account}/widget/Mintbase.components"
) || {
  MbModal: () => <></>,
  LinkTree: () => <></>,
};
const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
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
};

const onStoreNameChange = useCallback((e) => {
  setStoreName(e.target.value);
}, []);

const handleDeploy = () => {
  sdk.deployStore(storeName, storeSymbol);
};

const Card = styled.div`
  width: 100%;
  border-radius: 0;
  background-color: #f9fafb;
  color: black;

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
  &.light {
    button {
      color: #000 !important;
    }
  }
  .contents {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin: 0;
    button {
      background: transparent;
      border: 1px solid #ba5c60;
      :hover {
        background: #ba5c60;
        color: #fff !important;
      }
    }

    .content {
      margin: 0;
      display: flex;
      gap: 20px;

      p {
        margin: 0;
      }
    }
  }
  .followContainer {
    display: flex;
    align-items: center;
    gap: 15px;
    .followers {
      display: flex;
      align-items: flex-end;
      gap: 5px;
      span {
        padding-bottom: 2px;
        font-size: 14px;
      }
      p {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
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
  .connected-tab {
    text-decoration: none;
    text-align: left;
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    text-decoration: none;
    gap: 0.2rem;
    border-radius: 0.25rem; /* Assuming default border radius */
    color: ${isDarkModeOn ? "#9FED8F" : "#0A7D6C"}; /* Ternary for text color */
    background-color: ${isDarkModeOn
      ? "#9FED8F33"
      : "#0A7D6C1A"}; /* Ternary for background color */
    padding: 6px; /* Assuming Tailwind CSS default spacing unit */
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Assuming Tailwind CSS default timing function and duration */
    white-space: nowrap;
    @media (max-width: 768px) {
      padding: 5px;
      font-size: 10px;
      line-height: 14px;
    }
  }
`;
const createStoreHandler = () => {
  // console.log("createStoreHandler");
  setOpen(true);
};

function followUser(user, isFollowing) {
  const dataToSend = {
    graph: { follow: { [user]: isFollowing ? null : "" } },
    index: {
      graph: JSON.stringify({
        key: "follow",
        value: {
          type,
          accountId: user,
        },
      }),
      notify: JSON.stringify({
        key: user,
        value: {
          type,
        },
      }),
    },
  };
  Social.set(dataToSend, {
    force: true,
  });
}

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

// useEffect(() => {
//   asyncFetch(
//     `https://www.mintbase.xyz/_next/data/4MrYzAhE2iuTzTuGt7Lsw/human/${accountId}/owned/0.json`,
//     {
//       mode: "no-cors",
//     }
//   )
//     .then((response) => response.body)
//     .then((data) => {
//       if (data) {
//         console.log({ "user data": data });
//         // setProfile(parseData);
//       }
//     });
// }, []);

const [data, setData] = useState(null);

const accountFollowsYouData = Social.keys(
  `${context.accountId}/graph/follow/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const accountFollowsYou = Object.keys(accountFollowsYouData || {}).length > 0;

const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numFollowing = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : null;
const numFollowers = followers ? Object.keys(followers || {}).length : null;

const fetchMyStores = (id) => {
  const data = asyncFetch("https://graph.mintbase.xyz", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query GET_USER_META @cached {
        tokensCountPerHuman: mb_views_nft_tokens_aggregate(where: {owner: {_eq: $ownerId}}) {
          aggregate {
            count
          }
        }
        transactionsCountPerHuman: nft_activities_aggregate(where: {action_sender: {_eq: "nate.near"}}) {
          aggregate {
            count
          }
        }
        salesInNearPerHuman: nft_earnings_aggregate(
          where: {receiver_id: {_eq: "nate.near"}, currency: {_eq: "near"}}
        ) {
          aggregate {
            sum {
              amount
            }
          }
        }
      }
  `,
    }),
  });
  return data;
};

useEffect(() => {
  fetchMyStores(props.accountId || "nate.near").then((data) => {
    setData(data);
  });
}, []);
const stores = data?.body?.data?.stores;

const details = [
  // { name: "Tokens", value: "1075" },
  // { name: "Listed Tokens", value: "109" },
  // { name: "Bought", value: "161.18N" },
  // { name: "Sales", value: "189.41N" },
  // { name: "Transactions", value: "1776" },
];

const PageContent = () => {
  switch (selectedTab) {
    case "owned":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.Tokens.Owned`}
          props={{
            isDarkModeOn,
            ownerId: accountId,
            isConnected,
            accountId,
            showFilters: showOwnedFilters,
            onCreateStore,
          }}
        />
      );
    case "minted":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.Tokens.Minted`}
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
        <Widget
          src={`${config_account}/widget/Mintbase.App.Profile.About`}
          props={{ isDarkModeOn, accountId }}
        />
      );
    case "activity":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.Profile.Activity`}
          props={{ isDarkModeOn, accountId }}
        />
      );
    case "contracts":
      return (
        <>
          <Widget
            src={`${config_account}/widget/Mintbase.App.Store.Cards`}
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
                src={`${config_account}/widget/Mintbase.App.Profile`}
                props={{
                  accountId,
                  isDarkModeOn,
                }}
              />
            </div>
            <div className="user-settings__item">
              <h3>Notifications</h3>
              <Widget
                src={`${config_account}/widget/Mintbase.App.Notifications`}
                props={{
                  accountId,
                  isDarkModeOn,
                }}
              />
            </div>
            <div className="user-settings__item">
              <h3>Security</h3>
              <Widget
                src={`${config_account}/widget/Mintbase.App.Security`}
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

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreib2cfbayerbbnoya6z4qcywnizqrbkzt5lbqe32whm2lubw3sywr4";

const background = profile.backgroundImage
  ? profile.headerImage ??
    `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
  : "https://ipfs.near.social/ipfs/bafkreiajgp5bmkidwesy2d6tsbdkhyfzjtom2wse2sjcwii227lt5audvq";

return (
  <Card className={isDarkModeOn ? "dark" : ""}>
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
        <TopContent className={isDarkModeOn ? "dark" : "light"}>
          <h1>{profile.displayName || profile.name}</h1>
          <div className="contents">
            <div className="content">
              <p>Address</p>
              <Widget
                src={`${config_account}/widget/Mintbase.MbActionText`}
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
            <div>
              <button onClick={() => followUser(accountId, accountFollowsYou)}>
                {accountFollowsYou ? "Following" : "Follow"}
              </button>
            </div>
          </div>
          <div className="followContainer">
            <div className="followers">
              <p className="">{numFollowers !== null ? numFollowers : "0"}</p>
              <span>Follower{numFollowers !== 1 && "s"}</span>
            </div>
            <div className="followers">
              <p className="">{numFollowing !== null ? numFollowing : "0"}</p>
              <span>Following</span>
            </div>
          </div>
        </TopContent>
        {/* <Details>
          {details.map((data, key) => (
            <div className="detail" key={key}>
              <span>{data.name}</span>
              <p>{data.value}</p>
            </div>
          ))}
        </Details> */}
        <Profiles>
          <LinkTree links={profile.linktree} isDarkModeOn={isDarkModeOn} />
          <div className="bos_share">
            <a
              href={`https://${accountId}.social`}
              target="_blank"
              className="profile"
            >
              <Widget
                src="${config_account}/widget/Mintbase.MbIcon"
                props={{
                  name: "near",
                  color: isDarkModeOn ? "mb-white" : "mb-black",
                  size: "16px",
                }}
              />
              <span>BOS</span>
            </a>
            {/* <div key={index} className="profile">
              <i className="bi bi-box-arrow-up"></i>
              <span>Share</span>
            </div> */}
          </div>
          {isConnected && <div className="connected-tab">CONNECTED</div>}
        </Profiles>
      </div>
    </AboutOwner>
    <Widget
      src={`${config_account}/widget/Mintbase.MbTabs`}
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
        src={`${config_account}/widget/Mintbase.App.Store.CreateForm`}
        props={{
          isDarkModeOn,
          onCancel: () => setModalIsOpen(false),
          setModalOpen: setModalIsOpen,
          connectedDao: props?.connectedDao,
        }}
      />
    </MbModal>
  </Card>
);
