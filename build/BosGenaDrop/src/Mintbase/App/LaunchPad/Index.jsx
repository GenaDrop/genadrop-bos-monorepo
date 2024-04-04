const accountId = props.accountId ?? context.accountId;

const tabProps = {
  tabLabels: [
    "My Contracts",
    "Earned",
    "Offered to Me",
    "My Offers",
    "Stripe Beta",
  ],
};

const [selectedTab, setSelectedTab] = useState(props.tab ?? "my-contracts");
const [sdk, setSDK] = useState(false);
const isDarkModeOn = props.isDarkModeOn;

const handleTabClick = (tab) => {
  setSelectedTab(tab);
};

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
    margin: 48px 44px 48px 44px;
  }
`;

const PageContent = () => {
  switch (selectedTab) {
    case "my-contracts":
      return (
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.App.LaunchPad.Contracts`}
          props={{
            isDarkModeOn,
          }}
        />
      );
    case "earned":
      return (
        <div>
          <h2>Nothing Earned yet</h2>{" "}
          <p>
            You haven't earned any NFTs yet. Once you do, they will appear here.
          </p>
        </div>
      );
    case "offered-to-me":
      return (
        <div>
          <h2>Nothing Offered yet</h2>{" "}
          <p>
            You haven't been offered any NFTs yet. Once you do, they will appear
            here.
          </p>
        </div>
      );
    case "my-offers":
      return (
        <div>
          <h2>No offers yet</h2>{" "}
          <p>
            You haven't offered any NFTs yet. Once you do, they will appear
            here.
          </p>
        </div>
      );
    case "stripe-beta":
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
            src={`bos.genadrop.near/widget/Mintbase.MbButton`}
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
    <Widget
      src={`bos.genadrop.near/widget/Mintbase.MbTabs`}
      props={{
        ...tabProps,
        activeTab: selectedTab,
        onTabChange: handleTabClick,
        isDarkModeOn,
      }}
    />
    <div className="d-flex flex-column align-items-center content_main">
      <PageContent />
    </div>
  </Card>
);
