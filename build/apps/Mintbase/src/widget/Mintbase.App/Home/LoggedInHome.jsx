const Routes = styled.div`
  display: flex;
  margin-bottom: -40px;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 40px;
  div {
    width: max-content;
  }
  p {
    text-decoration: none;
    padding: 10px;
    border-radius: 8px;
    transition: 0.5s ease-in-out;
    font-weight: 500;
    cursor: pointer;
    color: #4f58a3;
    width: max-content;
    &:hover {
      background-color: #90cdf4;
    }
  }
  .active {
    background-color: ${isDarkModeOn ? "#3a1c28" : "#fedfde"};
    color: #ff5c5c;
  }
  .active:hover {
    background-color: ${isDarkModeOn ? "#3a1c28" : "#fedfde"};
  }
  @media (max-width: 700px) {
    overflow-x: scroll;
  }
`;
const LoggedInHome = styled.div``;
const pageRoutes = {
  MyContracts: {
    name: "My Contracts",
    link: "",
  },
  Earned: {
    name: "Earned",
    link: "",
  },
  OfferedToMe: {
    name: "Offered To Me",
    link: "",
  },
  MyOffers: {
    name: "My Offers",
    link: "",
  },
  StripeBeta: {
    name: "Stripe Beta",
    link: "",
  },
};
const [activeTab, setActiveTab] = useState(-1);
const [currentTab, setCurrentTab] = useState(tab || "Enterprise");
useEffect(() => {
  if (tab) {
    setCurrentTab(tab);
    const index = Object.keys(pageRoutes).findIndex((key) => key === tab);
    setActiveTab(index);
  }
}, [tab]);
const handleTabClick = (index) => {
  const fieldName = Object.keys(pageRoutes)[index];
  setActiveTab(index);
  setCurrentTab(pageRoutes[fieldName].name);
  setPage(1);
};
return (
  <LoggedInHome>
    <Routes>
      {Object.values(pageRoutes).map((data, index) => (
        <div key={index}>
          <p
            className={activeTab === index ? "active" : ""}
            onClick={() => handleTabClick(index)}
          >
            <div>{data.name}</div>
          </p>
        </div>
      ))}
    </Routes>
    {activeTab === 0 && (
      <Widget src="bos.genadrop.near/widget/Mintbase.App.Home.HomeContracts" />
    )}
  </LoggedInHome>
);
