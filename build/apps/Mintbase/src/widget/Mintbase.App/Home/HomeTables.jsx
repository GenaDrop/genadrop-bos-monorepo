const accountId = props.accountId ?? "bos.genadrop.near";
const TableActivity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  @media (max-width: 500px) {
  }
`;
const { isDarkModeOn } = props;
const TopTabs = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  justify-content: space-between;
  @media (max-width: 500px) {
    gap: 10px;
    flex-direction: column;
    margin-top: 70px !important;
  }
`;
const customStyle = `
  width: max-content !important;
ul {
  justify-content: flex-start!important;
  background: none !important;
  width: max-content !important;
  margin-bottom: 0;
  li {
    font-weight: bold;
    margin: 0 10px;
    
  }
  }
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
const [activeTabIndex, setActiveTabIndex] = useState("top-collections");
const [activeRangeIndex, setActiveRangeIndex] = useState(0);
const handleTabClick = (index) => {
  setActiveTabIndex(index);
};
const handleRangeClick = (index) => {
  setActiveRangeIndex(index);
};
return (
  <TableActivity>
    <TopTabs>
      <Widget
        src={`${accountId}/widget/Mintbase.MbTabs`}
        props={{
          tabLabels: ["Top Collections", "Activity"],
          customStyle,
          isDarkModeOn,
          activeTab: activeTabIndex,
          onTabChange: handleTabClick,
        }}
      />
      {/* {activeTabIndex === "activity" && (
        <Widget
          src={`${accountId}/widget/Mintbase.MbTabs`}
          props={{
            tabLabels: ["24h", "7d", "30d"],
            customStyle,
            isDarkModeOn,
            activeIndex: activeRangeIndex,
            onTabChange: handleRangeClick,
          }}
        />
      )} */}
    </TopTabs>
    <Widget
      src={`${accountId}/widget/Mintbase.App.Home.${
        activeTabIndex === "activity"
          ? "HomeTableActivity"
          : "HomeTopCollection"
      }`}
      props={{ isDarkModeOn }}
    />
  </TableActivity>
);
