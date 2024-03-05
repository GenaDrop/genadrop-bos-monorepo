const accountId = props.accountId || "bos.genadrop.near";
// const { MbMetaCard, MbInputField } = VM.require(
//   "bos.genadrop.near/widget/Mintbase.components"
// ) || {
//   MbMetaCard: () => <></>,
//   MbInputField: () => <></>,
// };

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
const mode = switchOn ? "dark" : "light";
const btnType = !switchOn ? "secondary" : "primary";
const isDarkModeOn = mode === "dark";

const handleTabClick = (index) => {
  setSelectedTabIndex(index);
  // console.log("selectedTabIndex from Mine: ", selectedTabIndex);
};

const switchChangeHandler = useCallback(() => {
  setSwitchOn((prev) => !prev);
}, []);

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
  background-color: ${isDarkModeOn ? "#1F2937" : "#F9FAFB"};
  padding: 1.5rem; /* 24px */
  border-radius: 0;
  color: ${isDarkModeOn ? "white" : "black"};
`;

const Toggle = styled.div`
  ${
    "" /* round black button, that is fixed on the right bottom with some padding */
  }
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

const createStoreHandler = useCallback(() => {
  // console.log("createStoreHandler");
  setOpen(true);
}, []);

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
            src={`${accountId}/widget/Mintbase.MbButton`}
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
              src={`${accountId}/widget/Mintbase.MbIcon`}
              props={{ name: "stripe" }}
            />
          </p>
        </div>
      );
    default:
      return null;
  }
};

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

const modalContent = (
  <CreateStore>
    <div className="form">
      <div className="input">
        <Widget
          src={`${accountId}/widget/Mintbase.MbInput`}
          props={{
            id: "storename",
            required: true,
            placeholder: "myfirststore",
            label: "Store Name",
            defaultValue: storeName,
            onChange: onStoreNameChange,
            type: "text",
            hasIcon: false,
            mode,
          }}
        />
      </div>
      <div className="input">
        <Widget
          src={`${accountId}/widget/Mintbase.MbInput`}
          props={{
            id: "storesymbol",
            required: true,
            placeholder: "MFS",
            label: "Symbol (max 3 letters)",
            defaultValue: storeSymbol,
            onChange: (e) => setStoreSymbol(e.target.value),
            type: "text",
            mode,
          }}
        />
      </div>
    </div>
    <div className="bottom-buttons">
      <div>
        <Widget
          src={`${accountId}/widget/Mintbase.MbButton`}
          props={{
            label: "Cancel",
            btnType: "secondary",
            size: "medium",
            onClick: () => setOpen(false),
            mode,
          }}
        />
      </div>
      <div>
        <Widget
          src={`${accountId}/widget/Mintbase.MbButton`}
          props={{
            label: "Create Store",
            btnType: "primary",
            // disabled: true,
            size: "medium",
            onClick: () => handleDeploy(),
            mode,
          }}
        />
      </div>
    </div>
  </CreateStore>
);

return (
  <Card>
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
      src={`${accountId}/widget/Mintbase.MbTabs`}
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
    {/* <MbMetaCard loading={false} /> */}
    <Widget
      src={`${accountId}/widget/Mintbase.MbModal`}
      props={{
        open,
        setOpen,
        onClose: null,
        children: modalContent,
        topElement: (
          <h4 style={{ marginRight: "8px" }}>Let's Create Your Store</h4>
        ),
        topElementFirst: true,
        mode,
      }}
    />
    <Widget
      src={`bos.genadrop.near/widget/Mintbase.App.Store.Card`}
      props={{
        mode,
      }}
    />
  </Card>
);
