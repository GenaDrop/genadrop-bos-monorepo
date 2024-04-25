const searchSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M13.3038 13.3038C10.4891 16.1184 5.92564 16.1184 3.11099 13.3038C0.296337 10.4891 0.296336 5.92564 3.11099 3.11099C5.92564 0.296336 10.4891 0.296337 13.3038 3.11099C16.1184 5.92564 16.1184 10.4891 13.3038 13.3038ZM13.3038 13.3038L17 17"
      stroke="#B0B0B0"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const ExploreRoot = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  .header {
    h1 {
      color: var(--Black, #000);
      leading-trim: both;
      text-edge: cap;
      font-family: Helvetica Neue;
      font-size: 48px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`;
const ExploreContainer = styled.div`
  background: #f8f8f8;
  .searchContainer {
    display: flex;
    margin-top: 32px;
  }
`;
const Search = styled.div`
  display: flex;
  padding: 5px 16px;
  justify-content: space-between;
  width: 1180px;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #efefef;
  height: 48px;
  background: #fff;
  input {
    border: none;
  }
  input:focus: {
    outline: none;
    border: none;
  }
`;
const Filter = styled.div`
  display: flex;
  height: 48px;
  padding: 12px 24px;
  align-items: center;
  margin-left: 20px;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid #fff;
  background: #000;
  width: 112px;
  span {
    color: #fff;
  }
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  width: max-content;
`;
const Tab = styled.div`
  display: flex;
  padding: 12px 32px;
  cursor: pointer;
  align-items: center;
  gap: 10px;
  border-top: 2px solid #eaeaea;
  border: 1px solid #eaeaea;
  background: ${(p) => (p.selected ? "#fff" : "")};
  h2 {
    color: ${(p) => (p.selected ? "#000" : "#d0d0d0")};
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const Cards = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  display: flex;
  padding: 24px 32px;
  min-height: 800px;
  align-items: flex-start;
  align-content: flex-start;
  row-gap: 64px;
  flex-shrink: 0;
  flex-wrap: wrap;
  background: white;
`;
const contests = Near.view("fund-v1.genadrop.near", "get_contests", {
  subscribe: true,
});
const [activeTab, setActiveTab] = useState("ALL");
const [contest, setContest] = useState(contests[0]);
return (
  <ExploreContainer>
    <ExploreRoot>
      <div className="header">
        <h1>Explore Creative Contests</h1>
      </div>
      <div className="searchContainer">
        <Search>
          <input />
          {searchSvg}
        </Search>
        <Filter>
          <span>Filter</span>
          <img src="https://ipfs.near.social/ipfs/bafkreieqdxxr3fxbtsew2tnzi3m5kixh5s55oyn6ylkw4ozfiroegyc7ui" />
        </Filter>
      </div>
      <Tabs>
        <Tab onClick={() => setActiveTab("ALL")} selected={activeTab === "ALL"}>
          <h2>ALL</h2>
        </Tab>
        <Tab
          onClick={() => setActiveTab("ACTIVE")}
          selected={activeTab === "ACTIVE"}
        >
          <h2>ACTIVE</h2>
        </Tab>
        <Tab
          onClick={() => setActiveTab("PAID")}
          selected={activeTab === "PAID"}
        >
          <h2>PAID</h2>
        </Tab>
        <Tab
          onClick={() => setActiveTab("PAST")}
          selected={activeTab === "PAST"}
        >
          <h2>PAST</h2>
        </Tab>
      </Tabs>
      <Cards>
        {contest.length ? (
          contest?.map((data, index) => (
            <Widget
              src="bos.genadrop.near/widget/CPlanet.DropsFund.Explore.Card"
              key={index}
              props={{ data }}
            />
          ))
        ) : (
          <div>Loading..</div>
        )}
      </Cards>
    </ExploreRoot>
  </ExploreContainer>
);
