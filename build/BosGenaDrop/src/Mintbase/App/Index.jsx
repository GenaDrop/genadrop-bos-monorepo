const [mode, setMode] = useState("light");

const App = styled.div`
  background: ${mode === "dark" ? "#101223" : "#f3f5f9"};
`;

const availableRoutes = ["explore", "home"];

const getTab = (tab) => {
  if (!tab || !availableRoutes.includes(tab)) {
    return "home";
  }

  return tab;
};

const [currentPage, setCurrentPage] = useState("explore");
const [exploreTab, setExploreTab] = useState("");

const update = (state) => setCurrentPage(state);

const tabContentWidget = {
  home: "bos.genadrop.near/widget/Mintbase.App.Home.Index",
  explore: "bos.genadrop.near/widget/Mintbase.App.Explore.Index",
}[currentPage];

const tabContent = (
  <Widget
    src={tabContentWidget}
    props={{
      update,
      isDarkModeOn: mode === "dark",
      handleCurrentTab: setExploreTab,
      tab: exploreTab,
    }}
  />
);

return (
  <App>
    {currentPage !== "home" && (
      <Widget
        src={`bos.genadrop.near/widget/Mintbase.App.Navbar.Index`}
        props={{
          isDarkModeOn: mode === "dark",
          update,
          handleCurrentTab: setExploreTab,
          tab: exploreTab,
        }}
      />
    )}
    <div>{tabContent}</div>
    <Widget
      src={`bos.genadrop.near/widget/Mintbase.App.Footer.Index`}
      props={{ mode, setMode }}
    />
  </App>
);
