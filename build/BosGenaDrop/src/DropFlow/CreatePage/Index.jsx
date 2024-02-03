const accountId = props.accountId ?? context.accountId;

const isLoggedIn = context.accountId ? true : false;

const profile = Social.getr(`${accountId}/profile`);

if (!isLoggedIn) {
  return "Please sign in with NEAR wallet to edit your profile";
}

if (context.loading) {
  return "Loading";
}
const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  justify-content: center;
  h1 {
    font-size: 32px;
    font-weight: 600;
  }
  span {
    color: #b0b0b0;
    font-size: 14px;
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

const Wrapper = styled.div`
  max-width: 1440px;
  padding: 32px;
  margin: 0 auto;
  * {
    font-family: Helvetica Neue;
    line-height: normal;
    box-sizing: border-box;
  }
  .section {
    margin-bottom: 32px;
    padding-bottom: 2rem;
    margin-top: 2rem;
  }
  .tabsGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 16px;
    column-gap: 28px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  h4,
  h6 {
    font-weight: 900;
  }
  .btn {
    border-radius: 32px;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    background-color: #000;
    border-color: #000;
    color: #fff;
    :hover {
      background-color: #fff;
      border-color: #000;
      color: #000;
    }
  }
  .form-check.ds-check {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.3rem;
    input {
      margin-top: unset;
    }
    .form-check-input {
      background-color: #fff;
      border-color: #000;
      :checked {
        background-color: #000;
        border-color: #fff;
      }
    }
  }
  .rbt-token-removeable {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #fff;
    background: #000;
    border-radius: 50px;
    padding: 0.25rem 0.5rem;
    button {
      padding: unset;
      :hover {
        color: #fff;
        border-radius: 50px;
        background: #000;
      }
    }
    .rbt-token-label {
      padding: unset;
    }
  }
  .feed {
    .rbt-token-removeable {
      color: #000;
      background: #fff;
      border: 1px solid #b0b0b0;
      border-radius: 50px;
      button {
        color: #b0b0b0;
        :hover {
          color: #000;
          border-radius: 50px;
          background: #fff;
        }
      }
    }
  }
  input {
    :not([type="checkbox"]):not([type="radio"]) {
      border-radius: 8px;
      background: #fff;
      border: 2px solid #efefef;
      :placeholder {
        color: #b0b0b0;
      }
      color: #000;
      outline: none;
      padding: 8px 264px 8px 16px;
    }
    :focus {
      box-shadow: none;
    }
  }
  .defaultDisc {
    opacity: 0.5;
    color: #b0b0b0;
  }
  .discussion-main {
    padding-top: 1rem;
  }
  .txt,
  .form-select {
    max-width: 500px;
  }
  .attach-nft,
  .attach-collection {
    color: #b0b0b0;
    border: 1px solid #efefef;
    background: #f8f8f8;
    :hover {
      path {
        fill: #000;
      }
    }
  }
  .attach-docs {
    color: #b0b0b0;
    border: 1px solid #efefef;
    background: #f8f8f8;
    :hover {
      path {
        stroke: #000;
      }
    }
  }
  .unselected-item {
    border-radius: 32px;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    padding: 0.6rem;
    color: #c0c0c0;
    background-color: #fff;
    border: 1px solid #c0c0c0;
    path {
      fill: #c0c0c0;
    }
    :hover {
      color: #fff;
      background-color: #000;
      border: 1px solid #fff;
      path {
        fill: #fff;
      }
    }
  }
  .selected-item {
    color: #fff;
    background-color: #000;
    border: 1px solid #fff;
    path {
      fill: #fff;
    }
  }
  .is-invalid {
    border-color: #dd5353e9 !important;
    color: #dd5353e9 !important;
  }
  .right-add-btn {
    float: right;
  }
  .tooltip {
    background-color: #000;
    color: #fff;
  }
  .tooltipred {
    background: #dd5353e9;
    color: #fff;
  }
  .themesCard {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .input-group-text {
    background-color: #000;
    border: none;
    color: #fff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .subtitle {
    color: #b0b0b0;
  }
`;

const [activeTab, setActiveTab] = useState(1);

// useEffect(() => {
//   switch (activeTab) {
//     case 1:
//      No additional sorting needed for "ALL" tab
//       break;
//     case 2:
//       break;
//     default:
//      Default case: handle the default state here
//       break;
//   }
//  Sort the contests before setting them
//  sortedContests.sort(compareContests);
//    setContest(sortedContests);
// }, [activeTab]);

const isLastPage = activeTab === 2;

console.log("activeTab", activeTab);

if (context.accountId && accountId !== context.accountId) {
  return (
    <Loading>
      <h5>You are not authorized to edit this profile</h5>
      <p>Please open the profile you're currently logged in to</p>
    </Loading>
  );
}

return (
  <Wrapper>
    {/* <Tabs>
      <Tab
        onClick={() => {
          setActiveTab(1);
          setSearchValue("");
        }}
        selected={activeTab === 1}
      >
        <h2>Editor</h2>
      </Tab>
      <Tab
        onClick={() => {
          setActiveTab(2);
          setSearchValue("");
        }}
        selected={activeTab === 2}
      >
        <h2>New</h2>
      </Tab>
    </Tabs> */}
    {activeTab === 1 ? (
      <Widget
        src="bos.genadrop.near/widget/DropFlow.CreatePage.New"
        props={{
          accountId,
          isLoggedIn,
          nextTabHandler: () => setActiveTab((activeTab) => activeTab + 1),
        }}
      />
    ) : (
      <Widget
        src="bos.genadrop.near/widget/DropFlow.CreatePage.Editor"
        props={{
          accountId,
          // nextTabHandler: () => setActiveTab((activeTab) => activeTab + 1),
        }}
      />
    )}
    {/* {isLastPage && (
      <div className="mb-2">
        <CommitButton data={{ profile: state.profile },}>
          Save profile
        </CommitButton>
        <Link
          className="btn btn-outline-primary ms-2"
          href={`/bos.genadrop.near/widget/DropFlow.ArtistPage.Index?accountId=${accountId}`}
        >
          View profile
        </Link>
      </div>
    )} */}
  </Wrapper>
);
