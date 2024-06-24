const accountId = context.accountId;

const tabProps = {
  tabLabels: ["My Stores", "Mint NFT", "My NFTs", "Store NFTs"],
};

const [selectedTab, setSelectedTab] = useState(props.tab ?? "my-stores");
const isDarkModeOn = props.isDarkModeOn;

const handleTabClick = (tab) => {
  setSelectedTab(tab);
};

const PageContent = () => {
  switch (selectedTab) {
    case "my-stores":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.LaunchPad.Contracts`}
          props={{
            isDarkModeOn,
          }}
        />
      );
    case "mint-nft":
      return <div>Needs special UI</div>;
    case "my-nfts":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.LaunchPad.OffersToAccount`}
          props={{
            isDarkModeOn,
            accountId,
          }}
        />
      );
    case "my-nfts":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.LaunchPad.OpenOffersByAccount`}
          props={{
            isDarkModeOn,
            accountId,
          }}
        />
      );
    case "store-nfts":
      return (
        <div>Custom UI needed here</div>
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
const Index = ({}) => (
  <Card>
    <h1 className="text-center">Hi, I'm Mintbos Mini!</h1>
    <Widget
      src={`${config_account}/widget/Mintbase.MbTabs`}
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

return <Index {...props} />;
