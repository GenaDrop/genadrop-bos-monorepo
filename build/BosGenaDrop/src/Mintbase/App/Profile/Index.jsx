const accountId = props.accountId ?? context.accountId;

const isConnected = context.accountId === accountId;
const { MbModal } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
) || {
  MbModal: () => <></>,
};

const { MbInputField } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
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

// create an array from the array of objects above, based on whether the tab is hidden or not, creating an array of indexes in the format { tabLabels: ["Owned", "Minted", "Activity", "Contracts", "User Settings"] }
const hiddenTabs = actualTabs.tabLabels
  .filter((tab) => !tab.hidden)
  .map((tab) => tab.title);
const tabProps = { tabLabels: hiddenTabs };

console.log("tabProps", tabProps);

const [selectedTab, setSelectedTab] = useState("owned");
const [switchOn, setSwitchOn] = useState(false);
const [open, setOpen] = useState(false);
const [sdk, setSDK] = useState(false);
const [storeName, setStoreName] = useState("");
const [storeSymbol, setStoreSymbol] = useState("");
const [showOwnedFilters, setShowOwnedFilters] = useState(true);
const mode = switchOn ? "light" : "dark";
const btnType = !switchOn ? "secondary" : "primary";
const isDarkModeOn = mode === "dark";

// const [trialText, setTrialText] = useState("");

// const handleTrialTextChange = ({ target: { value: text } }) => {
//   console.log("handleTrialTextChange", text);
//   setTrialText(text);
//   setCount(text.length);
// };

const handleTabClick = (index) => {
  setSelectedTab(index);
  // console.log("selectedTab from Mine: ", selectedTab);
};

const switchChangeHandler = () => {
  setSwitchOn((prev) => !prev);
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
    padding: 20px;
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

const Toggle = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem;
  background-color: black;
  border-radius: 9999px;
  cursor: pointer;
  z-index: 100000;
  &:hover {
    background-color: #1f2937;
  }
  width: 2rem;
  height: 2rem;
  color: black;
`;

const queryInOwnedToggleHandler = () => {
  setShowOwnedFilters((prev) => !prev);
};

const AboutOwner = styled.div`
  height: 300px;
  background: ${isDarkModeOn ? "#1E2030" : "#FFF"};
`;
const createStoreHandler = () => {
  // console.log("createStoreHandler");
  setOpen(true);
};

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
          }}
        />
      );
    case "minted":
      return (
        <div>
          <h2>Nothing Minted yet</h2>
          <p>
            You haven't minted any NFTs yet. Once you do, they will appear here.
          </p>
        </div>
      );
    case "about":
      return (
        <div>
          <h2>About User</h2> <p>Nothing to show yet</p>
        </div>
      );
    case "activity":
      return (
        <div>
          <h2>No Activity yet</h2>{" "}
          <p>
            You haven't offered any NFTs yet. Once you do, they will appear
            here.
          </p>
        </div>
      );
    case "contracts":
      return (
        <div>
          <Widget
            src={`bos.genadrop.near/widget/Mintbase.App.Stores.Index`}
            props={{}}
          />
        </div>
      );
    case "user settings":
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

const modalContent = (
  <>
    <Widget
      src={`bos.genadrop.near/widget/Mintbase.App.Store.CreateForm`}
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
    <Toggle onClick={switchChangeHandler} title="Toggle Theme" />
    <AboutOwner></AboutOwner>
    <Widget
      src={`bos.genadrop.near/widget/Mintbase.MbTabs`}
      props={{
        ...tabProps,
        activeTab: selectedTab,
        onTabChange: handleTabClick,
        isDarkModeOn,
        hasQueryToggle: true,
        onQueryToggle: queryInOwnedToggleHandler,
      }}
    />
    <div
      className="d-flex flex-column align-items-center content_main"
      style={{ backgroundColor: `${isDarkModeOn ? "#101223" : "#F9F9F9"}` }}
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
