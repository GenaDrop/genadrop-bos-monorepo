const accountId = context.accountId;
const tabProps = {
  tabLabels: [
    "My Contracts",
    "Earned",
    "Offered to Me",
    "My Offers",
    "Stripe Connection",
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
  pre {
    margin: 0;
    padding: 0;
  }
  &.dark {
    background-color: var(--bg-gray-900, #101223);
    color: white;
  }
  .content_main {
    margin: 48px 44px 48px 44px;
  }
  .stripe-data {
    display: flex;
    flex-direction: row;
    gap: 32px;
    img {
      max-width: 500px;
      width: 100%;
      height: auto;
    }
    .stripe-image {
      width: 45%;
    }
    padding: 32px;
    .stripe-text {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 32px;
      width: 45%;
      max-width: 500px;
      .paras {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
    }
    @media only screen and (max-width: 800px) {
      flex-direction: column;
      .stripe-text {
        margin-top: 0;
        padding: 0;
        text-align: center;
        width: 100%;
        .paras {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
      }
      .stripe-image {
        width: 100%;
      }
    }
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
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.App.LaunchPad.Earned`}
          props={{
            isDarkModeOn,
            accountId,
          }}
        />
      );
    case "offered-to-me":
      return (
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.App.LaunchPad.OffersToAccount`}
          props={{
            isDarkModeOn,
            accountId,
          }}
        />
      );
    case "my-offers":
      return (
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.App.LaunchPad.OpenOffersByAccount`}
          props={{
            isDarkModeOn,
            accountId,
          }}
        />
      );
    case "stripe-connection":
      return (
        <div className="stripe-data">
          <div className="stripe-image">
            <img
              src="https://www.mintbase.xyz/_next/image?url=%2Fpartners%2Fmintbase-stripe.png&w=640&q=75"
              alt=""
            />
          </div>
          <div className="stripe-text">
            <h2>Stripe Connection Beta</h2>
            <div className="paras">
              <p className="p-32 w-1/2">
                To enable selling NFTs in over 135 currencies, complete the KYC
                process. Only NFTs valued over $1 in NEAR, without royalties or
                splits, will have fiat access. NFTs cannot be reclaimed if a
                buyer claims fraud. By connecting to Stripe, you confirm your
                business doesn’t fall under{" "}
                <a
                  href="https://stripe.com/en-gb-pt/legal/restricted-businesses"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stripe Restricted Business List.
                </a>
              </p>
              <p>
                Royalties and splits are not paid out when the buyer uses fiat.
                It's up to you to payout royalties directly if requested.
              </p>
            </div>
            <a
              href="https://connect.stripe.com/express/oauth/authorize?redirect_uri=https%3A%2F%2Fconnect.stripe.com%2Fexpress%2Foauth%2Fauthorize&client_id=ca_H1xdb6b9lEkVCVsMnoF1fVKqwpa2GHtP&state=CHANGE%20THE%20STATE%20REDIR&suggested_capabilities[]=card_payments&&suggested_capabilities[]=transfers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Widget
                src={`bos.genadrop.near/widget/Mintbase.MbButton`}
                props={{
                  label: "Connect to Stripe",
                  onClick: null,
                  size: "big",
                  isDarkModeOn,
                }}
              />
            </a>
          </div>
        </div>
      );
    default:
      return null;
  }
};
const [count, setCount] = useState(0);
if (!context.accountId) {
  return (
    <p
      className="text-center"
      style={{
        color: isDarkModeOn ? "white" : "black",
        padding: "20px 0",
      }}
    >
      Please Sign In
    </p>
  );
}
return (
  <Card className={isDarkModeOn ? "dark" : ""}>
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
