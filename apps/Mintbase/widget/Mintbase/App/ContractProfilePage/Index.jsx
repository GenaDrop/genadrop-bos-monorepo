const accountId = props.accountId ?? "secondjiku.mintspace2.testnet";
const connectedDao = props.connectedDao;

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
const { getCombinedStoreData, checkStoreOwner, fetchStoreMinters } = VM.require(
  "${config_account}/widget/Mintbase.utils.sdk"
) || {
  getCombinedStoreData: () => {},
  checkStoreOwner: () => {},
  fetchStoreMinters: () => {},
};

const { href } = VM.require("${alias_builddao}/widget/lib.url") || {
  href: () => {},
};

const [isStoreOwner, setIsStoreOwner] = useState(false);
const [isMinter, setIsMinter] = useState(false);

const tabs = {
  labels: [
    { id: 0, title: "NFTs" },
    { id: 1, title: "_About", hidden: !connectedUserIsMinter },
    {title: "_Mint NFT", hidden: !isMinter},
    { id: 3, title: "Discussions" },
    // { id: 3, title: "_User Settings", hidden: !connectedUserIsMinter },
    { id: 4, title: "Activity" },
    { id: 5, title: "Analytics" },
    {title: "_Contract Settings", hidden: !isStoreOwner && !context.accountId}
  ],
};

// if (isStoreOwner && context.accountId) {
//   tabs.labels.splice(2, 0, { id: 7, title: "Contract Settings" });
// }
// if (isMinter) {
//   tabs.labels.splice(1, 0, { id: 2, title: "Mint NFT" });
// }
const hiddenTabs = tabs.labels
  .filter((tab) => !tab.hidden)
  .map((tab) => tab.title);
const tabProps = { tabLabels: hiddenTabs };

const [selectedTab, setSelectedTab] = useState(props.tab ?? "nfts");
const [open, setOpen] = useState(false);
const [showListedFilters, setShowListedFilters] = useState(true);
const [storeData, setStoreData] = useState(null);
const [profile, setProfile] = useState({});
const isDarkModeOn = props.isDarkModeOn ?? false;

const nearSocialProfile = Social.getr(`${accountId}/profile`);

const handleTabClick = (index) => {
  setSelectedTab(index);
};

const Card = styled.div`
  width: 100%;
  border-radius: 0;
  background-color: var(--gray-50, #f9f9f9);
  color: var(--mb-black, #000);

  &.dark {
    color: var(--mb-white, #fff);
  }
  .content_main {
    padding: 24px 48px;
    @media (max-width: 500px) {
      padding: 2px;
    }
  }
`;

const ImageSection = styled.div`
  height: 254px;
  background: var(--gray-150, #e8eaf0);
  position: relative;
  width: 100%;
  img {
    width: 126px;
    height: 126px;
    position: absolute;
    bottom: -24px;
    border: 4px solid var(${isDarkModeOn ? "--gray-850, #1e2030" : "--mb-white, #fff"});
    left: 48px;
    background: var(--error-300, #c74c4c);
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
      align-items: center;
      gap: 20px;
      button {
        background: transparent;
        color: var(${props.isDarkModeOn ? "--mb-whitee, #fff" : "--mb-black, #000"});
        border: 1px solid var(--error-300, #c74c4c);
        :hover {
          background: var(--error-300, #c74c4c);
          color: var(--mb-white,#fff);
        }
      }
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
    background: var(${isDarkModeOn ? "--gray-800, #282A3A" : "--gay-50, #f9f9f9"});
    span {
      font-size: 12px;
      font-weight: 500;
      color: var(${isDarkModeOn ? "--gray-300, #B3B5BD" : "--gray-700, #404252"});
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
      border: 1px solid var(--gray-300, #b3b5bd);
      i {
        color: var(${isDarkModeOn ? "--mb-white, #fff" : "--mb-black, #000"}) !important;
      }
      span {
        color: var(${isDarkModeOn ? "--mb-white, #fff" : "--mb-black, #000"});
      }
    }
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const queryInListedToggleHandler = () => {
  setShowListedFilters((prev) => !prev);
};

const AboutOwner = styled.div`
  background: var(${isDarkModeOn ? "--gray-900, #1E2030" : "--mb-white, #FFF"});
  overflow: hidden;
  .owner-details-main {
    margin-left: 48px;
    margin-bottom: 24px;
    @media (max-width: 500px) {
      margin-left: 5px;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .connected-tab {
    text-decoration: none;
    text-align: left;
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    text-decoration: none;
    text-transform: uppercase;
    gap: 0.2rem;
    border-radius: 0.25rem; /* Assuming default border radius */
    color: var(
      ${isDarkModeOn ? "--success-100, #9FED8F" : "--success-300, #0A7D6C"}
    ); /* Ternary for text color */
    background-color: var(
      ${isDarkModeOn
        ? "--mb-green-shade-dark, #9FED8F33"
        : "--mb-green-shade-light, #0A7D6C1A"}
    );
    padding: 6px;
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Assuming Tailwind CSS default timing function and duration */
    @media (max-width: 768px) {
      padding: 5px;
      width: 100px !important;
      align-items: center;
      text-align: center;
      font-size: 10px;
      line-height: 14px;
    }
  }
`;
const createStoreHandler = () => {
  setOpen(true);
};

useEffect(() => {
  accountId &&
    checkStoreOwner(accountId, context.accountId)
      .then((data) => setIsStoreOwner(data))
      .catch((error) => {
        console.error(error);
      });

  accountId &&
    fetchStoreMinters(accountId)
      .then((data) =>
        setIsMinter(data?.some((data) => data?.minter_id === context.accountId))
      )
      .catch((error) => {
        console.error(error);
      });

  accountId &&
    getCombinedStoreData({ id: accountId, limit, offset })
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        setStoreData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  accountId &&
    asyncFetch(`https://api.mintbase.xyz/accounts/${accountId}`, {
      method: "GET",
      headers: {
        "mb-api-key": "omni-site",
        "Content-Type": "application/json",
        "x-hasura-role": "anonymous",
      },
    })
      .then((data) => {
        if (data.body) {
          const parseData = { ...data?.body, nearSocialProfile };
          setProfile(parseData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
}, [accountId]);

const minters =
  storeData && storeData.mb_store_minters.map((minter) => minter.minter_id);
const connectedUserIsMinter = minters && minters?.includes(context.accountId);

const connectedUser =
  connectedUserIsMinter &&
  context.accountId === storeData.nft_contracts[0].owner_id
    ? "Owner"
    : "Minter";
const details = [
  { name: "Tokens", value: "1075" },
  { name: "Listed Tokens", value: "109" },
  { name: "Bought", value: "161.18N" },
  { name: "Sales", value: "189.41N" },
  { name: "Transactions", value: "1776" },
];

const PageContent = () => {
  switch (selectedTab) {
    case "nfts":
      return (
        <Widget
          src="${config_account}/widget/Mintbase.App.ContractProfilePage.ContractNFTs"
          props={{
            contractId: accountId,
            isDarkModeOn,
            connectedDao: connectedDao,
            showFilters: showListedFilters,
          }}
        />
      );
    case "about":
      return (
        <div>
          <h2>About User</h2> <p>Nothing to show yet</p>
        </div>
      );
    case "discussions":
      return (
        <Widget
          key="discussion"
          src="${config_account}/widget/CPlanet.Group.Index"
          props={{ groupId: accountId, isDarkModeOn }}
        />
      );
    case "contract-settings":
      return (
        <Widget
          src="${config_account}/widget/Mintbase.App.ContractProfilePage.ContractSettings.Index"
          props={{
            contractId: accountId,
            isDarkModeOn,
            connectedDao: connectedDao,
          }}
        />
      );
    case "mint-nft":
      return (
        <Widget
          src="${config_account}/widget/Mintbase.App.ContractProfilePage.Mint.Index"
          props={{
            contractId: accountId,
            isDarkModeOn,
            connectedDao: connectedDao,
          }}
        />
      );
    case "activity":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.ContractProfilePage.Activity`}
          props={{ isDarkModeOn, contract: accountId }}
        />
      );
    case "analytics":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.ContractProfilePage.Analytics`}
          props={{ isDarkModeOn, contract: accountId }}
        />
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

const accountFollowsYouData = Social.keys(
  `${context.accountId}/graph/follow/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);
const accountFollowsYou = Object.keys(accountFollowsYouData || {}).length > 0;

const [count, setCount] = useState(0);

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreib2cfbayerbbnoya6z4qcywnizqrbkzt5lbqe32whm2lubw3sywr4";

const background = profile.backgroundImage
  ? profile.headerImage ??
    `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
  : "https://ipfs.near.social/ipfs/bafkreiajgp5bmkidwesy2d6tsbdkhyfzjtom2wse2sjcwii227lt5audvq";

return (
  <Card className={isDarkModeOn ? "dark" : ""}>
    {accountId ? (
      <>
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
            <TopContent isDarkModeOn={isDarkModeOn}>
              <h1>
                {storeData.nft_contracts[0].name || accountId || "Store Name"}
              </h1>
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
                  <div>
                    <button
                      onClick={() => followUser(accountId, accountFollowsYou)}
                    >
                      {accountFollowsYou ? "Following" : "Follow"}
                    </button>
                  </div>
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
                <Link
                  className="profile"
                  to={href({
                    widgetSrc: "${config_account}/widget/Mintbase.App.Index",
                    params: {
                      page: "human",
                      tab: `owned&accountId=${accountId}`,
                    },
                  })}
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
                </Link>
                {/* <div key={index} className="profile">
              <i className="bi bi-box-arrow-up"></i>
              <span>Share</span>
            </div> */}
              </div>
              {connectedUserIsMinter && (
                <div className="connected-tab">{connectedUser} CONNECTED</div>
              )}
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
            hasQueryToggle: selectedTab === "nfts",
            onQueryToggle: queryInListedToggleHandler,
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
      </>
    ) : (
      <div
        className="mx-auto text-center p-4 content_main"
        style={{ backgroundColor: `${isDarkModeOn ? "#101223" : "#F9F9F9"}` }}
      >
        <h2>Store Address Not Found</h2>
        <p>
          Please enter a store address as a value for "accountId" on the address
          bar or login to view
        </p>
      </div>
    )}

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
          connectedDao: connectedDao,
        }}
      />
    </MbModal>
  </Card>
);
