const accountId = props.accountId ?? "bos.genadrop.near";

const mode = props.mode || Storage.get("mode") || "light";

const customStyle = `
  width:100% !important;
  background: rgba(40,42,58,0.05);
  padding: 5px 0;
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

const [activeTabIndex, setActiveTabIndex] = useState(0);
const [activeRangeIndex, setActiveRangeIndex] = useState(0);

const handleTabClick = (index) => {
  setActiveTabIndex(index);
};

const handleRangeClick = (index) => {
  setActiveRangeIndex(index);
};

return(
    <>
     <Widget
          src={`${accountId}/widget/Mintbase.App.Navbar.Index`}
          props={{ mode }}
    />
    <Widget
         src={`${accountId}/widget/Mintbase.MbTabs`}
        props={{
          tabLabels: ["Enterprise", "Top Affiliates", "Use Cases"],
          mode,
          customStyle,
          activeIndex: activeTabIndex,
          onTabChange: handleTabClick,
        }}
    />
    <Widget
      src={`${accountId}/widget/Mintbase.App.Solutions.${
        activeTabIndex === 0 ? "Enterprise" : activeTabIndex===1 ? "TopAffiliates" : "UseCases"
      }`}
      props={{ mode,accountId }}
    />
    <Widget
      src={`${accountId}/widget/Mintbase.App.Footer.Index`}
      props={{ mode,accountId }}
    />
    </>
)