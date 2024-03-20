const accountId = props.accountId ?? context.accountId;
const { MbModal, MbInputField } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
) || {
  MbModal: () => <></>,
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
  border-radius: 0;
  background-color: #f9fafb;
  color: black;
  margin: 0;
  padding: 0;
  &.dark {
    background-color: var(--bg-gray-900, #101223);
    color: white;
  }
  .content_main {
    padding: 23vh 4vw;
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

const CreateCard = styled.div`
padding: 1em;
border: 2px dashed rgba(0,0,0,.3);
display: flex;
align-items: center;
justify-content: center;
align-content: center;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
height: 293px;
max-width: 600px;
width: 100%;
button {
    border: 1px solid black;
    border-radius: 0;
    color: white;
    background: black;
    text-align: center
    display: flex;
    padding: 7px 20px;
    cursor: pointer;
  }
  button:disabled {
    background: grey;
    border: grey;
    cursor: not-allowed;
  }
  button:hover {
    background: white;
    color: black;
    border-color: black;
  }
`;
const createStoreHandler = () => {
  // console.log("createStoreHandler");
  setOpen(true);
};

const PageContent = () => {
  switch (selectedTabIndex) {
    case 0:
      return (
        <>
          {!stores ? (
            <div className="d-flex flex-column align-items-center">
              <h2>Deploy your own store to mint NFTs from</h2>{" "}
              <p>
                You don't have any stores yet — let's create your first one! Or
                refresh the page if you just deployed (could take up to 5
                minutes).
              </p>
              <Widget
                src={`/*__@appAccount__*//widget/Mintbase.MbButton`}
                props={{
                  label: "New Store",
                  onClick: createStoreHandler,
                  size: "big",
                  mode,
                }}
              />
            </div>
          ) : (
            <CreateCard>
              <a href={`#/jgodwill.near/widget/Mintbase.Store.Deploy`}>
                <button>New Store</button>
              </a>
            </CreateCard>
          )}
        </>
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
          <img
            src="https://www.mintbase.xyz/_next/image?url=%2Fpartners%2Fmintbase-stripe.png&w=640&q=75"
            alt=""
          />
          <h2>StripeBeta</h2>
          <div className="stripe-data">
            <p className="p-32 w-1/2">
              To enable selling NFTs in over 135 currencies, complete the KYC
              process. Only NFTs valued over $1 in NEAR, without royalties or
              splits, will have fiat access. NFTs cannot be reclaimed if a buyer
              claims fraud. By connecting to Stripe, you confirm your business
              doesn’t fall under Stripe Restricted Business List.
            </p>
            <p>
              Royalties and splits are not paid out when the buyer uses fiat.
              It's up to you to payout royalties directly if requested.
            </p>
          </div>
          <Widget
            src={`/*__@appAccount__*//widget/Mintbase.MbButton`}
            props={{
              label: "Connect to Stripe",
              onClick: null,
              size: "big",
              mode,
            }}
          />
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
          src={`/*__@appAccount__*//widget/Mintbase.MbButton`}
          props={{
            label: "Cancel",
            btnType: "secondary",
            size: "medium",
            state: "active",
            onClick: () => setOpen(false),
            mode,
          }}
        />
      </div>
      <div>
        <Widget
          src={`/*__@appAccount__*//widget/Mintbase.MbButton`}
          props={{
            label: "Create Store",
            btnType: "primary",
            state: `${
              storeName.length > 0 &&
              storeSymbol.length > 0 &&
              storeSymbol.length <= 3
                ? "active"
                : "disabled"
            }`,
            size: "medium",
            onClick: onDeploy,
            mode,
          }}
        />
      </div>
    </div>
  </CreateStore>
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
    <Widget
      src={`/*__@appAccount__*//widget/Mintbase.MbTabs`}
      props={{
        ...tabProps,
        activeIndex: selectedTabIndex,
        onTabChange: handleTabClick,
        isDarkModeOn,
      }}
    />
    <div className="d-flex flex-column align-items-center content_main">
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
