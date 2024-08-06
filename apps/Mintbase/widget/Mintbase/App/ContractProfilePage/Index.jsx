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

const [isStoreOwner, setIsStoreOwner] = useState(false);
const [isMinter, setIsMinter] = useState(false);

const actualTabs = {
  tabLabels: [
    { id: 0, title: "NFTs" },
    { id: 1, title: "_About", hidden: !connectedUserIsMinter },
    { id: 2, title: "Discussions" },
    // { id: 3, title: "_User Settings", hidden: !connectedUserIsMinter },
    { id: 4, title: "Activity" },
    { id: 5, title: "Analytics" },
  ],
};

if (isStoreOwner && context.accountId) {
  actualTabs.tabLabels.splice(2, 0, { id: 7, title: "Contract Settings" });
}
if (isMinter) {
  actualTabs.tabLabels.splice(1, 0, { id: 2, title: "Mint NFT" });
}
const hiddenTabs = actualTabs.tabLabels
  .filter((tab) => !tab.hidden)
  .map((tab) => tab.title);
const tabProps = { tabLabels: hiddenTabs };

const [selectedTab, setSelectedTab] = useState(props.tab ?? "nfts");
const [open, setOpen] = useState(false);
const [showOwnedFilters, setShowOwnedFilters] = useState(true);
const [storeData, setStoreData] = useState(null);
const [profile, setProfile] = useState({});
const isDarkModeOn = props.isDarkModeOn ?? false;

const handleTabClick = (index) => {
  setSelectedTab(index);
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

const ImageSection = styled.div`
  height: 254px;
  background: #eceef0;
  position: relative;
  width: 100%;
  img {
    width: 126px;
    height: 126px;
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

useEffect(() => {
  checkStoreOwner(accountId, context.accountId)
    .then((data) => setIsStoreOwner(data))
    .catch((error) => {
      console.error("in contracts", error);
    });

  fetchStoreMinters(accountId)
    .then((data) => setIsMinter(data))
    .catch((error) => {
      console.error("in contracts", error);
    });

  getCombinedStoreData({ id: accountId, limit, offset })
    .then(({ data, errors }) => {
      if (errors) {
        // handle those errors like a pro
        console.error(errors);
      }
      // do something great with this precious data
      console.log({ storeData: data });
      setStoreData(data);
    })
    .catch((error) => {
      // handle errors from fetch itself
      console.error(error);
    });
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
  { name: "Last Activity", value: "3 hours ago" },
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
            {storeData.nft_contracts[0].name || accountId || "Store Name"}
            {/* {verifiedBatch} */}
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
                src="${config_account}/widget/Mintbase.MbIcon"
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
          connectedDao: connectedDao,
        }}
      />
    </MbModal>
  </Card>
);
