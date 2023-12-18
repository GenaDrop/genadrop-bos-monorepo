const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: auto;
  .isHome {
    position: absolute;
    width: 100%;
  }
`;
const Contents = styled.div``;

const availableTabs = [
  "explore",
  "singleNFT",
  "home",
  "community",
  "feed",
  "daoProfile",
];

const getTab = (tab) => {
  if (!tab || !availableTabs.includes(tab)) {
    return "home";
  }

  return tab;
};

State.init({
  tab: getTab(state.tab),
  contractId: "",
  tokenId: "",
  chainState: "",
  state: "",
  daoId: "",
  daoContractId: "",
});

const update = (state) => State.update(state);

const tabContentWidget = {
  home: "/*__@appAccount__*//widget/CPlanet.Home.Home",
  explore: "/*__@appAccount__*//widget/CPlanet.NFTExplore.Index",
  community: "/*__@appAccount__*//widget/CPlanet.DAO.Explore",
  singleNFT: "/*__@appAccount__*//widget/CPlanet.NFTExplore.SingleNFT",
  daoProfile: "/*__@appAccount__*//widget/CPlanet.DAO.Index",
  feed: "/*__@appAccount__*//widget/CPlanet.MainPage.Social",
  profile: "/*__@appAccount__*//widget/GenaDrop.Profile.Main",
}[state.tab];

const tabContent = (
  <Widget
    src={tabContentWidget}
    props={{
      update,
      contractId: state.contractId,
      tokenId: state.tokenId,
      accountId: state.accountId,
      chainState: state.chainState,
      daoId: state.daoId,
      isGateway: props.isGateway,
      daoContractId: state.daoContractId,
    }}
  />
);

return (
  <Root>
    <div className={state.tab === "home" ? "isHome" : ""}>
      <Widget
        src="/*__@appAccount__*//widget/CPlanet.Navbar.Index"
        props={{
          tab: state.tab,
          update,
          isGateway: props.isGateway,
          isHome: state.tab === "home",
        }}
      />
    </div>
    <Contents>{tabContent}</Contents>
    <Widget
      props={{ isGateway: props.isGateway }}
      src="/*__@appAccount__*//widget/CPlanet.Footer.Index"
    />
  </Root>
);
