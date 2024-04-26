const checkSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
  >
    <rect width="16" height="12" rx="6" fill="#B0B0B0" />
    <path
      d="M5 6.19231L7 8.5L11 3.5"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const Container = styled.div`
  background: #f8f8f8;
  min-height: 100vh;
`;
const Root = styled.div`
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1400px;
  width: 100%;
  padding-top: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
  @media (max-width: 500px) {
    flex-direction: column;
    padding-top: 30px;
    .left,
    .right {
      width: 100%;
    }
    .left {
      .header {
        h1 {
          font-size: 28px !important;
        }
        span {
          font-size: 18px !important;
        }
      }
    }
  }
  .left {
    .header {
      span {
        color: #808080;
        leading-trim: both;
        text-edge: cap;
        font-family: Helvetica Neue;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
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
    }
  }
`;
const Status = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .submission {
    color: #3bd07f;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 8px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 12px */
    display: flex;
    padding: 2px 10px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 50px;
    border: 1px solid #3bd07f;
    background: #e4fff0;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0);
  }
  .closed {
    color: white;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 8px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 12px */
    display: flex;
    padding: 2px 10px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 50px;
    border: 1px solid #b0b0b0;
    background: #b0b0b0;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0);
  }
  .sum-date {
    color: #b0b0b0;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 8px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 12px */
    border-radius: 50px;
    margin-left: 10px;
    padding: 2px 10px;
    border: 1px solid #b0b0b0;
    background: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0);
  }
`;
const Username = styled.div`
  display: flex;
  flex-direction: row;
  a {
    overflow: hidden;
    color: #b0b0b0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  svg {
    margin-left: 5px;
    margin-top: 3px;
  }
`;
const Desc = styled.div`
  p {
    color: #808080;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 148%; /* 23.68px */
    letter-spacing: -0.16px;
  }
`;
const PriceBucket = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ccc;
  width: 100%;
  padding: 16px 48px 20px 32px;
  justify-content: space-between;
  max-width: 1000px;
  align-items: flex-start;
  border-radius: 8px;
  border: 1px solid #b0b0b0;
  background: #fff;
  .amountSec:last-child {
    border-right: none;
  }
  .amountSec {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid #b0b0b0;
    width: 200px;
    span {
      color: #b0b0b0;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: uppercase;
    }
    .amount {
      display: flex;
      align-items: flex-end;
      img {
        width: 20px;
        height: 20px;
        margin-bottom: 3px;
        margin-right: 5px;
      }
      .first-span {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        margin: 0;
        margin-top: 10px;
        margin-right: 3px;
        line-height: normal;
      }
      .last-span {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding-bottom: 3px;
        text-transform: uppercase;
      }
    }
  }
  @media (max-width: 500px) {
    flex-direction: column;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    align-items: center;
    .amountSec {
      border-bottom: 1px solid #b0b0b0;
      height: 100px;
      justify-content: center;
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      border-right: none !important;
    }
    .amountSec:last-child {
      border-bottom: none;
    }
  }
`;
const contestId = props.contestId;
const testContract = props?.status === "true" ? true : false;
const [userSubmitted, setUserSubmitted] = useState(false);
if (!contestId) {
  return (
    <div>
      No ContestId Provided, Please Redirect to the Contest Overview page and
      Select a Contest
    </div>
  );
}
const contest = Near.view(
  testContract ? "fund-beta.genadrop.near" : "contest.genadrop.near",
  "get_contest_detail",
  {
    contest_id: Number(contestId),
    subscribe: true,
  }
);
if (!contestId && !contest) {
  return (
    <div>
      No ContestId Provided, Please Redirect to the Contest Overview page and
      Select a Contest
    </div>
  );
}
const contestArts = Near.view(
  testContract ? "fund-beta.genadrop.near" : "contest.genadrop.near",
  "get_contest_arts",
  {
    contest_id: Number(contestId),
    subscribe: true,
  }
);
if (!contest) {
  return (
    <div>
      No Contest Details Found, Please make sure you're Navigating from a Valid
      Contest
    </div>
  );
}
const formatTime = (time) => {
  const timestamp = time * 1000; // Convert seconds to milliseconds
  const date = new Date(timestamp);
  // Format the date to "Month day, year" (e.g., "Oct 31, 2023")
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
const isOpen = contest?.submission_end_time > Date.now() / 1000;
const isClosed = contest?.voting_end_time < Date.now() / 1000;
useEffect(() => {
  if (contestArts) {
    const submitted = contestArts?.some(
      (data) => data[0] === context.accountId
    );
    setUserSubmitted(submitted);
  }
}, [contestArts]);
const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    return value.toFixed(4) !== "NaN" ? `$${value.toFixed(2)}` : 0;
  }
};
const policy = Near.view(contest?.dao_id, "get_policy");
const councilMembers =
  policy &&
  policy?.roles?.filter(
    (data) => data?.name === "council" || data?.name === "Council"
  )[0]?.kind?.Group;
return (
  <Container>
    <Root>
      <div className="left">
        <div className="header">
          <span>
            {formatTime(contest?.submission_start_time)} -{" "}
            {formatTime(contest?.voting_end_time)}
          </span>
          <h1>{contest.title ?? "No Title"}</h1>
        </div>
        <Status>
          <p className={isClosed ? "closed" : "submission"}>
            {isOpen
              ? "SUBMISSION OPEN"
              : isClosed
              ? "VOTING CLOSED"
              : "VOTING OPEN"}
          </p>
          <p className="sum-date">
            SUBMISSION FROM ON {formatTime(contest?.submission_start_time)} -{" "}
            {formatTime(contest?.submission_end_time)}
          </p>
          <p className="sum-date">
            VOTING FROM ON {formatTime(contest?.voting_start_time)} -{" "}
            {formatTime(contest?.voting_end_time)}
          </p>
        </Status>
        <Username>
          <a
            href={`#/bos.genadrop.near/widget/CPlanet.DAO.Index?daoId=${contest?.dao_id}`}
          >
            {contest?.dao_id}
          </a>
          {checkSvg}
        </Username>
        <Desc>
          <p>{contest?.description ?? "-- No Description --"}</p>
        </Desc>
        <PriceBucket>
          <div className="amountSec">
            <span>Total Prize</span>
            <div className="amount">
              <img
                src="https://ipfs.near.social/ipfs/bafkreierjvmroeb6tnfu3ckrfmet7wpx7k3ubjnc6gcdzauwqkxobnu57e"
                alt=""
              />
              <p className="first-span">{contest?.prize}</p>
              <span className="last-span">{getUsdValue(contest?.prize)}</span>
            </div>
          </div>
          <div className="amountSec">
            <span>Prize per Place</span>
            <div className="amount">
              <img
                src="https://ipfs.near.social/ipfs/bafkreierjvmroeb6tnfu3ckrfmet7wpx7k3ubjnc6gcdzauwqkxobnu57e"
                alt=""
              />
              <p className="first-span">
                {contest?.places ? contest?.prize / contest.places ?? 0 : 0}
              </p>
              <span className="last-span">
                {getUsdValue(
                  contest?.places ? contest?.prize / contest.places ?? 0 : 0
                )}
              </span>
            </div>
          </div>
          <div className="amountSec">
            <span>Winners</span>
            <div className="amount">
              <p className="first-span">{contest?.winners?.length ?? 0}</p>
            </div>
          </div>
          <div className="amountSec">
            <span>{isOpen ? "Submit Before" : "Voting Ends At"}</span>
            <div className="amount">
              <Widget
                src="bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Countdown"
                props={{
                  startTime: Date.now(),
                  endTime:
                    (isOpen
                      ? contest?.submission_end_time
                      : contest?.voting_end_time) * 1000,
                }}
              />
            </div>
          </div>
          <div className="amountSec">
            <span>Entries</span>
            <div className="amount">
              <p className="first-span">{contest?.submissions ?? 0}</p>
            </div>
          </div>
        </PriceBucket>
        <Widget
          src="bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Content"
          props={{
            usersArts: contestArts,
            isOpen,
            contestName: contest?.title,
            winners: contest.winners,
            daoId: contest.dao_id,
            testContract,
            isClosed,
            councilMembers: councilMembers,
            userSubmitted,
            contestId,
          }}
        />
      </div>
      <div className="right">
        <Widget
          src="bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Rules"
          props={{
            isClosed,
            isOpen,
            testContract,
            winners: contest.winners,
            usersArts: contestArts,
            contestId,
            userSubmitted,
          }}
        />
      </div>
    </Root>
  </Container>
);
