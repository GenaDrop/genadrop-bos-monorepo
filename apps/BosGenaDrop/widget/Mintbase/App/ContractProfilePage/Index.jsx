const { MbFooterRoutes, getInputLabelFontType, MbSwitch } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const accountUrl = `#/bos.genadrop.near/widget/GenaDrop.Profile.Main?accountId=${accountId}`;

const verifiedBatch = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="18px"
    viewBox="0 0 24 24"
    width="18px"
    fill="#000000"
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

const ContractApp = styled.div``;

const Wrapper = styled.div`
  padding-bottom: 48px;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  ${getInputLabelFontType("big")}
`;

const BackgroundImage = styled.div`
  height: 240px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;
  background: #eceef0;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    margin: calc(var(--body-top-padding) * -1) -12px 0;
    border-radius: 0;
  }

  @media (max-width: 1024px) {
    height: 100px;
  }
`;

const TopContent = styled.div`
  margin-top: 40px;
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
    padding: 10px;
    background: #f9f8f8;
    span {
      font-size: 12px;
      font-weight: 500;
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
  .profile {
    display: flex;
    text-decoration: none;
    color: black;
    align-items: center;
    width: max-content;
    cursor: pointer;
    font-size: 12px;
    padding: 5px 7px;
    border-radius: 4px;
    border: 1px solid #b0b0b0;
    img {
      width: 15px;
    }
  }
`;

const Tabs = styled.div`
  margin-top: 30px;
`;

const customStyle = `
  width: max-content !important;
ul {
  justify-content: flex-start!important;
  background: none !important;
  width: max-content !important;
  margin-bottom: 0;
  li {
    font-weight: 500;
    margin: 0 10px;
    
  }
  }
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const Contents = styled.div`
  background: #f2f5f8;
  display: flex;
  margin-top: 20px;
  padding: 24px;
  gap: 20px;
`;

const LeftFilter = styled.div`
  background: #fff;
  width: 22%;
  height: 100%;
  padding: 15px;
  h2 {
    font-size: 14px;
    font-weight: bold;
  }
  .switch {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const MainContent = styled.div`
  max-width: 78%;
`;

const details = [
  { name: "Items", value: "200475" },
  { name: "Total Owners", value: "107126" },
  { name: "Floor Price", value: "2" },
  { name: "Average Offer", value: "0.49" },
  { name: "Volume", value: "120.91" },
];

const profiles = [
  { icon: "twitter", link: "https://twitter.com/sharddog" },
  { icon: "web", name: "Share.dog", link: "https://twitter.com/sharddog" },
  {
    icon: "simple_share",
    name: "Simple Share",
    link: "https://www.mintbase.xyz/contract/mint.sharddog.near/nfts/all/0?orderBy=price+desc+nulls+last#",
  },
  {
    icon: "Claim Ownership",
    name: "Claim Ownership",
    link: "https://docs.google.com/forms/d/1w9QK9GXqmlRGLdS5Dm-yUoRdsd5klky89TwDEck35-M/viewform?edit_requested=true",
  },
  {
    icon: "near",
    name: "BOS",
    link: "https://near.org/mintbase.near/widget/nft-marketplace?contracts=mint.sharddog.near",
  },
];

if (profile === null) {
  return "Loading";
}

const [activeTabIndex, setActiveTabIndex] = useState(props.tab || "");
const [showListed, setShowListed] = useState(false);
const [showCreditCard, setShowCreditCard] = useState(false);

const handleTabClick = (index) => {
  setActiveTabIndex(index);
};

return (
  <Wrapper>
    <BackgroundImage>
      {profile.backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.backgroundImage,
            alt: "profile background image",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
          }}
        />
      )}
    </BackgroundImage>

    <TopContent>
      <h1>ShareDog {verifiedBatch}</h1>
      <div className="contents">
        <div className="content">
          <p>Contract</p>
          <Widget
            src={"${config_account}/widget/Mintbase.MbActionText"}
            props={{
              text: "mint.sharddog.near",
              size: "medium",
              copyText: "mint.sharddog.near",
              link: "https://nearblocks.io/address/mint.sharddog.near",
              iconTab: false,
              iconCopy: false,
              mode: mode,
            }}
          />
        </div>
        <div className="content">
          <p>Created by</p>
          <a>sharedog.near</a>
        </div>
        <div className="content">
          <p>Category</p>
          <a>Utility</a>
        </div>
        <div className="desc">The main ShardDog series based contract</div>
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
      {profiles.map((data, index) => (
        <a href={data.link} target="_blank" key={index} className="profile">
          <Widget
            src="${config_account}/widget/Mintbase.MbIcon"
            props={{
              name: data.icon,
            }}
          />
          <span>{data.name}</span>
        </a>
      ))}
    </Profiles>
    <Tabs>
      <Widget
        src={"${config_account}/widget/Mintbase.MbTabs"}
        props={{
          tabLabels: ["NFTs", "Activity", "Analytics", "Minters"],
          isDarkModeOn,
          customStyle,
          activeIndex: activeTabIndex,
          onTabChange: handleTabClick,
        }}
      />
    </Tabs>
    <Contents>
      <LeftFilter>
        <h2>Status</h2>
        <div className="switch">
          <Widget
            src={`${config_account}/widget/Mintbase.MbSwitch`}
            props={{
              id: "showListed",
              label: "Show only Listed",
              onChange: setShowListed,
            }}
          />
          <Widget
            src={`${config_account}/widget/Mintbase.MbSwitch`}
            props={{
              id: "showCredit",
              onChange: setShowCreditCard,
              label: "Show only Credit Card",
            }}
          />
        </div>
      </LeftFilter>
      <MainContent>
        {activeTabIndex === 0 && (
          <Widget src="${config_account}/widget/Mintbase.App.ContractProfilePage.ContractNFTs" />
        )}
      </MainContent>
    </Contents>
  </Wrapper>
);
