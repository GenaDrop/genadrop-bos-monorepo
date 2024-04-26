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
const Root = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  width: 100%;
  max-width: 1000px;
  @media (max-width: 1000px) {
    max-width: 100% !important;
  }
`;
const Search = styled.div`
  display: flex;
  padding: 5px 16px;
  width: 1000px;
  justify-content: space-between;
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
const Cards = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin-top: 20px;
  @media (max-width: 900px) {
    max-width: 100% !important;
  }
`;
const NoItem = styled.div`
  h1 {
    color: #000;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 100%;
    margin-top: 50px;
  }
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
const userArts = props.usersArts;
const [searchValue, setSearchValue] = useState("");
const [filteredValue, setFilteredValue] = useState([]);
if (userArts.length < 1) {
  return (
    <NoItem>
      <h1>No Arts Submitted for this Contest</h1>
    </NoItem>
  );
}
const searchInputHandler = (e) => {
  const value = e.target.value.toLowerCase();
  const searched = userArts.filter((nft) =>
    nft[1]?.title.toLowerCase().includes(value)
  );
  setSearchValue(value);
  setFilteredValue(searched);
};
const isUserInCouncil = props?.councilMembers
  ? props?.councilMembers?.includes(context?.accountId)
  : false;
const testContract = props.testContract || false;
return (
  <>
    <Root>
      <div className="search"></div>
      <Search>
        <Input
          value={searchValue}
          placeholder="Search Submitted Arts"
          onChange={searchInputHandler}
        />
        {searchSvg}
      </Search>
    </Root>
    <Cards>
      {searchValue === "" ? (
        userArts?.map((data, index) => (
          <Widget
            key={index}
            src="bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Card"
            props={{
              owner: data[0],
              content: data[1],
              isOpen: props.isOpen,
              daoId: props.daoId,
              testContract,
              councilMember: isUserInCouncil,
              contestName: props?.contestName,
              winners: props.winners,
              isClosed: props.isClosed,
              contestId: props.contestId,
            }}
          />
        ))
      ) : filteredValue?.length ? (
        filteredValue?.map((data, index) => (
          <Widget
            key={index}
            src="bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Card"
            props={{
              owner: data[0],
              content: data[1],
              isOpen: props.isOpen,
              winners: props.winners,
              daoId: props.daoId,
              testContract,
              contestName: props?.contestName,
              councilMember: isUserInCouncil,
              isClosed: props.isClosed,
              contestId: props.contestId,
            }}
          />
        ))
      ) : (
        <NoItem>
          <h1>No Art Found</h1>
        </NoItem>
      )}
    </Cards>
  </>
);
