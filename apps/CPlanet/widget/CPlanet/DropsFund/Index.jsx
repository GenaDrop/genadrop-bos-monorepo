const ownerId = "bos.genadrop.near";
const availableTabs = ["contests", "contest"];

const getTab = (tab) => {
  if (!tab || !availableTabs.includes(tab)) {
    return "contests";
  }

  return tab;
};

State.init({
  tab: getTab(state.tab),
});

const update = (state) => State.update(state);

const tabContentWidget = {
  contests: "bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Index",
  contest: "bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Single",
}[state.tab];

const tabContent = <Widget src={tabContentWidget} props={{ update }} />;

const Root = styled.div``;

return <Root>{tabContent}</Root>;
