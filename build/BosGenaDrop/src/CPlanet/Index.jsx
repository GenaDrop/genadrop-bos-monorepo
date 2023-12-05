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
  home: "agwaze.near/widget/CPlanet.Home.index",
  explore: "bos.genadrop.near/widget/CPlanet.NFTExplore.Index",
  community: "agwaze.near/widget/CPlanet.DAO.Explore",
  singleNFT: "agwaze.near/widget/CPlanet.Explore.SingleNFT",
  daoProfile: "agwaze.near/widget/CPlanet.DAO.index",
  feed: "jgodwill.near/widget/CPlanet.MainPage.Social",
  profile: "agwaze.near/widget/GenaDrop.Profile.Main",
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
      daoContractId: state.daoContractId,
    }}
  />
);

return (
  <Root>
    <div className={state.tab === "home" ? "isHome" : ""}>
      <Widget
        src="bos.genadrop.near/widget/CPlanet.Navbar.Index"
        props={{ tab: state.tab, update, isHome: state.tab === "home" }}
      />
    </div>
    <Contents>{tabContent}</Contents>
    <Widget src="agwaze.near/widget/CPlanet.Footer.index" />
  </Root>
);
