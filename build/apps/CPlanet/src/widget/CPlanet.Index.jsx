const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  position: relative;
  height: auto;
  margin: 0 auto;
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
  "dropFunds",
  "singleContest",
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
  contestId: "",
  daoId: "",
  daoContractId: "",
});
const update = (state) => State.update(state);
const tabContentWidget = {
  home: "bos.genadrop.near/widget/CPlanet.Home.Home",
  explore: "bos.genadrop.near/widget/CPlanet.NFTExplore.Index",
  community: "bos.genadrop.near/widget/CPlanet.DAO.Explore",
  singleNFT: "bos.genadrop.near/widget/CPlanet.NFTExplore.SingleNFT",
  daoProfile: "bos.genadrop.near/widget/CPlanet.DAO.Index",
  feed: "bos.genadrop.near/widget/CPlanet.MainPage.Social",
  profile: "bos.genadrop.near/widget/GenaDrop.Profile.Main",
  dropFunds: "bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Index",
  singleContest: "bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Single",
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
        src="bos.genadrop.near/widget/CPlanet.Navbar.Index"
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
      src="bos.genadrop.near/widget/CPlanet.Footer.Index"
    />
  </Root>
);
