const accountId = props.accountId ?? context.accountId;
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

const tabProps = {
  tabLabels: [
    "My Contracts",
    "Earned",
    "Offered to Me",
    "My Offers",
    "Stripe Beta",
  ],
};

const [selectedTabIndex, setSelectedTabIndex] = useState(0);
const [switchOn, setSwitchOn] = useState(false);
const [open, setOpen] = useState(false);
const [sdk, setSDK] = useState(false);
const [storeName, setStoreName] = useState("");
const [storeSymbol, setStoreSymbol] = useState("");
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
  setSelectedTabIndex(index);
  // console.log("selectedTabIndex from Mine: ", selectedTabIndex);
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
  padding: 1.5rem; /* 24px */
  border-radius: 0;
  background-color: #f9fafb;
  color: black;
  &.dark {
    background-color: var(--bg-gray-900, #101223);
    color: white;
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

const createStoreHandler = () => {
  // console.log("createStoreHandler");
  setOpen(true);
};

const PageContent = () => {
  switch (selectedTabIndex) {
    case 0:
      return (
        <div className="d-flex flex-column align-items-center">
          <h2>Deploy your own store to mint NFTs from</h2>{" "}
          <p>
            You don't have any stores yet — let's create your first one! Or
            refresh the page if you just deployed (could take up to 5 minutes).
          </p>
          <Widget
            src={`bos.genadrop.near/widget/Mintbase.MbButton`}
            props={{
              label: "New Store",
              onClick: createStoreHandler,
              size: "big",
              mode,
            }}
          />
        </div>
      );
    case 1:
      return (
        <div>
          <h2>Nothing Earned yet</h2>{" "}
          <p>
            You haven't earned any NFTs yet. Once you do, they will appear here.
          </p>
        </div>
      );
    case 2:
      return (
        <div>
          <h2>Nothing Offered yet</h2>{" "}
          <p>
            You haven't been offered any NFTs yet. Once you do, they will appear
            here.
          </p>
        </div>
      );
    case 3:
      return (
        <div>
          <h2>No offers yet</h2>{" "}
          <p>
            You haven't offered any NFTs yet. Once you do, they will appear
            here.
          </p>
        </div>
      );
    case 4:
      return (
        <div>
          <h2>StripeBeta</h2>{" "}
          <p>
            You haven't offered any
            <Widget
              src={`bos.genadrop.near/widget/Mintbase.MbIcon`}
              props={{ name: "stripe" }}
            />
          </p>
        </div>
      );
    default:
      return null;
  }
};

const modalContent = (
  <CreateStore>
    <div className="form">
      <div className="input">
        <MbInputField
          id="storename"
          placeholder="myfirststore"
          type="text"
          required={true}
          label="Store Name"
          error={false}
          className="input-field"
          value={storeName}
          isDarkModeOn={isDarkModeOn}
          onChange={onStoreNameChange}
        />
      </div>
      <div className="input">
        <MbInputField
          id="storesymbol"
          placeholder="MFS"
          type="text"
          required={true}
          label="Symbol (max 3 letters)"
          error={storeSymbol.length > 3}
          className="input-field"
          value={storeSymbol}
          isDarkModeOn={isDarkModeOn}
          onChange={(e) => setStoreSymbol(e.target.value)}
        />
      </div>
    </div>
    <div className="bottom-buttons">
      <div>
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.MbButton`}
          props={{
            label: "Cancel",
            btnType: "secondary",
            size: "medium",
            onClick: onCancel,
            mode,
          }}
        />
      </div>
      <div>
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.MbButton`}
          props={{
            label: "Create Store",
            btnType: "primary",
            disabled: true,
            size: "medium",
            onClick: onDeploy,
            mode,
          }}
        />
      </div>
    </div>
  </CreateStore>
);

console.log({ isDarkModeOn });

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
    <Widget
      src={`bos.genadrop.near/widget/Mintbase.MbTabs`}
      props={{
        ...tabProps,
        activeIndex: selectedTabIndex,
        onTabChange: handleTabClick,
        mode,
      }}
    />
    <div className="d-flex flex-column align-items-center">
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
    <Widget
      src={`bos.genadrop.near/widget/Mintbase.App.Store.Card`}
      props={{
        isDarkModeOn,
      }}
    />
  </Card>
);
