const accountId = props.accountId ?? "bos.genadrop.near";
const { mode } = props;
const TableActivity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const isDarkModeOn = mode === "dark";

const TopTabs = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background-color: ${isDarkModeOn ? "#1F2937" : "#F9FAFB"};
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
  }
  }
`;

const [activeTabIndex, setActiveTabIndex] = useState(1);
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
          mode,
          activeIndex: activeTabIndex,
          onTabChange: handleTabClick,
        }}
      />
      {activeTabIndex === 0 && (
        <Widget
          src={`${accountId}/widget/Mintbase.MbTabs`}
          props={{
            tabLabels: ["24h", "7d", "30d"],
            customStyle,
            mode,
            activeIndex: activeRangeIndex,
            onTabChange: handleRangeClick,
          }}
        />
      )}
    </TopTabs>
    {activeTabIndex === 1 && (
      <Widget
        src={`${accountId}/widget/Mintbase.App.Home.HomeTableActivity`}
        props={{ mode }}
      />
    )}
  </TableActivity>
);
