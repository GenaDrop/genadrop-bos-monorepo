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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    .buttons {
      display: flex;
      gap: 10px;
    }
    a, button {
      background: #000;
      border: 1px solid #000;
      color: #fff;
      width: max-width;
      padding: 9px;
      border-radius: 8px;
      transition: 0.4s ease-in-out;
      text-decoration: none;
    }
    a:hover, button:hover {
      background: #fff;
      color: #000;
      border: 1px solid #000;
    }
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
    @media (max-width: 500px) {
      gap: 20px;
      justify-content: center;
      h1 {
        font-size: 28px;
      }
    }
  }
`;

const ExploreContainer = styled.div`
  background: #f8f8f8;
  padding: 20px;
  .searchContainer {
    display: flex;
    margin-top: 32px;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    justify-content: center;
  }
`;

const Search = styled.div`
  display: flex;
  padding: 5px 16px;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  border-radius: 8px;
  border: 1px solid #efefef;
  height: 48px;
  background: #fff;
`;

const Input = styled.input`
&&& {
  padding: 8px;
  font-size: 16px;
  border: none;
  flex: 1;
  &:focus {
    outline: none;
    border: none;
  }
}
`;

const Filter = styled.div`
position: relative;
display: inline-block;
height: 48px;
padding: 12px 24px;
margin-left: 20px;
border-radius: 12px;
background: #000;
cursor: pointer;
color: #fff;

&:hover {
  border: 1px solid #fff;
}

select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;

  &:hover {
    border: 1px solid #fff;
  }
}

span {
  z-index: 0;
}
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  width: max-content;
  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
  }
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
  @media (max-width: 500px) {
    width: 100%;
    justify-content: center;
  }
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
  @media (max-width: 500px) {
    padding: 10px;
  }
`;

const NoContest = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px 32px;
  p {
    color: #d0d0d0;
    font-size: 24px;
    font-weight: 600;
  }
`

const adminLists = ['genadrop.near', 'agwaze.near', 'minorityprogrammers.near', 'bashorun.near', 'jgodwill.near']

const testContract = Storage.get("testContract")



const isFutureTimestamp = (timestamp) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Convert current time to seconds

  const isFuture = timestamp > currentTimestamp;

  return isFuture;
};

const fetchedContests =
  Near.view(testContract ? "fund-beta.genadrop.near" : "contest.genadrop.near", "get_contests", {
    subscribe: true,
  }) || [];

const [activeTab, setActiveTab] = useState("ALL");
const [contest, setContest] = useState(fetchedContests || []);
const [searchValue, setSearchValue] = useState("")
const [filteredValue, setFilteredValue] = useState([])
const [sortOrder, setSortOrder] = useState("A-Z");



const compareContests = (a, b) => {
  const timeA = a[1]?.voting_end_time || 0;
  const timeB = b[1]?.voting_end_time || 0;

  // Sort in descending order (latest first)
  return timeB - timeA;
};

useEffect(() => {
  let sortedContests = [...fetchedContests];

  switch (activeTab) {
    case "ALL":
      // No additional sorting needed for "ALL" tab
      break;
    case "ACTIVE":
      sortedContests = sortedContests.filter((data) =>
        isFutureTimestamp(data[1]?.voting_end_time)
      );
      break;
    case "PAID OUT":
      sortedContests = []; // No contests for "PAID OUT" tab
      break;
    case "PAST":
      sortedContests = sortedContests.filter(
        (data) => !isFutureTimestamp(data[1]?.voting_end_time)
      );
      break;
    default:
      // Default case: handle the default state here
      break;
  }

  sortedContests.sort((a, b) => {
    const titleA = a[1]?.title || "";
    const titleB = b[1]?.title || "";
    const timeA = a[1]?.voting_end_time || 0;
    const timeB = b[1]?.voting_end_time || 0;


    // Adjust the comparison based on the sorting order
    if (sortOrder === "A-Z") {
      return titleA.localeCompare(titleB);
    } else if (sortOrder === "Z-A") {
      return titleB.localeCompare(titleA);
    } else if (sortOrder === "oldest") {
      return timeA - timeB;
    } else if (sortOrder === "latest") {
      return timeB - timeA;
    }

    return 0; // Default to no sorting
  });

  // Sort the contests before setting them
  // sortedContests.sort(compareContests);
  setContest(sortedContests);
}, [fetchedContests, activeTab, sortOrder]);

const handleSortOrderChange = (value) => {
  setSortOrder(value);
};


const searchInputHandler = (e) => {
  const value = e.target.value.toLowerCase();
  const searched = contest.filter((nft) =>
    nft[1]?.title.toLowerCase().includes(value)
  );
  setSearchValue(value)
  setFilteredValue(searched)
}


const isAdmin = adminLists.includes(context.accountId)

return (
  <ExploreContainer>
    <ExploreRoot>
      <div className="header">
        <h1>Explore Creative Contests</h1>
        {isAdmin && 
        <div className="buttons">
          <a
          onClick={() => props.update({ tab: "singleContest" })}
          href={`#/bos.genadrop.near/widget/CPlanet.DropsFund.Admin.Index`}
          className=""
          >
          Create Contest
        </a>
        <button
        onClick={() => {
          Storage.set('testContract', !testContract)
        }}
        className="card-button"
        >
        Switch To {testContract ? "Main Contract" : "Test Contract"}
      </button>
        </div>
        }
      </div>
      <div className="searchContainer">
        <Search>
          <Input placeholder="Search for Different Contests" value={searchValue} onChange={searchInputHandler} />
          {searchSvg}
        </Search>
        <Widget src="bos.genadrop.near/widget/CPlanet.DropsFund.Contest.FilterOption" 
            props={{
              selectedOption: sortOrder,
              onChange: (value) => handleSortOrderChange(value)
            }} 
        />
      </div>
      <Tabs>
        <Tab onClick={() => {
          setActiveTab("ALL")
          setSearchValue("")
        }} selected={activeTab === "ALL"}>
          <h2>ALL</h2>
        </Tab>
        <Tab
          onClick={() => {
          setActiveTab("ACTIVE")
          setSearchValue("")
        }}
          selected={activeTab === "ACTIVE"}
        >
          <h2>ACTIVE</h2>
        </Tab>
        <Tab
          onClick={() => {
            setActiveTab("PAID OUT")
            setSearchValue("")
          }}
          selected={activeTab === "PAID OUT"}
        >
          <h2>PAID</h2>
        </Tab>
        <Tab
          onClick={() => {
            setActiveTab("PAST")
            setSearchValue("")
          }}
          selected={activeTab === "PAST"}
        >
          <h2>PAST</h2>
        </Tab>
      </Tabs>
      <Cards>
        {searchValue === '' ? contest?.length > 0 ? contest?.map((data, index) => (
          <Widget
            src="bos.genadrop.near/widget/CPlanet.DropsFund.Explore.Card"
            key={index}
            props={{
              data: data[1],
              update: props.update,
              isSubmissionOpen: isFutureTimestamp(data[1]?.submission_end_time),
              isVotingEnded: isFutureTimestamp(data[1]?.voting_end_time),
              id: data[0],
              update: props.update,
              isGateway: props.isGateway
            }}
          />
        )) : activeTab=== 'ALL' && contest?.length > 0 ? (
          fetchedContests?.map((data, index) => (
            <Widget
              src="bos.genadrop.near/widget/CPlanet.DropsFund.Explore.Card"
              key={index}
              props={{
                data: data[1],
                update: props.update,
                isSubmissionOpen: isFutureTimestamp(data[1]?.submission_end_time),
                isVotingEnded: isFutureTimestamp(data[1]?.voting_end_time),
                id: data[0],
                update: props.update,
                isGateway: props.isGateway
              }}
            />
          ))

        ) : 
        
        <NoContest>
          <p>There are no {activeTab !== 'ALL' ? activeTab : "" } Contest available</p>
        </NoContest> : filteredValue.length ? filteredValue?.map((data, index) => (
            <Widget
              src="bos.genadrop.near/widget/CPlanet.DropsFund.Explore.Card"
              key={index}
              props={{
                data: data[1],
                update: props.update,
                isSubmissionOpen: isFutureTimestamp(data[1]?.submission_end_time),
                isVotingEnded: isFutureTimestamp(data[1]?.voting_end_time),
                id: data[0],
                update: props.update,
                isGateway: props.isGateway
              }}
            />
          ))
        : (
        <NoContest>
          <p>No Contest Found</p>
        </NoContest>
          )
        }
      </Cards>
    </ExploreRoot>
  </ExploreContainer>
);
