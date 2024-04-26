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
const CardRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  border: 1px solid #efefef;
  width: 392px;
  height: 250px;
  gap: 12px;
  background: #fff;
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.05);
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    width: 100%;
    a {
      color: #b0b0b0;
    }
    h1 {
      color: #000;
      text-align: flex-start;
      font-family: Helvetica Neue;
      font-size: 24px;
      font-style: normal;
      margin-bottom: 0;
      font-weight: 700;
      line-height: normal;
      @media (max-width: 500px) {
        font-size: 20px !important;
      }
    }
    .not {
      color: white;
      text-align: center;
      font-family: Helvetica Neue;
      font-size: 8px;
      text-transform: uppercase;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 12px */
      border-radius: 50px;
      border: 1px solid #b0b0b0;
      background: #b0b0b0;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0);
      display: inline-flex;
      padding: 2px 10px;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
    .voting {
      color: #3bd07f;
      text-align: center;
      font-family: Helvetica Neue;
      font-size: 8px;
      text-transform: uppercase;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 12px */
      border-radius: 50px;
      border: 1px solid #3bd07f;
      background: #e4fff0;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0);
      display: inline-flex;
      padding: 2px 10px;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
  }
  .description {
    padding: 0 15px;
    height: 60px;
    p {
      color: #808080;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      margin: 0;
      font-weight: 500;
      line-height: 132.423%; /* 15.891px */
    }
  }
  .card-footer {
    width: 100%;
    border-top: 1px solid #efefef;
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;
    .one-sec {
      padding: 0 12px;
      .prize {
        color: #b0b0b0;
        font-family: Helvetica Neue;
        font-size: 8px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-transform: uppercase;
      }
      .amount {
        display: flex;
        align-items: flex-end;
        img {
          height: 18px;
          width: 18px;
          margin-right: 3px;
        }
        .formattedAmount {
          color: #000;
          font-family: Helvetica Neue;
          font-size: 13px;
          font-style: normal;
          font-weight: 700;
          margin: 0;
          line-height: normal;
          text-transform: none !important;
        }
        p {
          color: #000;
          font-family: Helvetica Neue;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          margin: 0;
          line-height: normal;
          text-transform: uppercase;
        }
        span {
          color: #000;
          font-family: Helvetica Neue;
          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          padding-left: 5px;
          line-height: normal;
          text-transform: uppercase;
        }
      }
    }
  }
  .card-button {
    width: 100%;
    background: #000;
    color: #fff;
    height: 32px;
    text-align: center;
    color: #fff;
    padding-top: 5px;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 12px;
    border: none;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 18px */
    text-decoration: none;
    color: white;
  }
`;
const data = props?.data;
const [isSubmissionTime, setIsSubmissionTime] = useState(null);
const [isVotingTime, setIsVotingTime] = useState(null);
const convertTime = (time) => {
  const timestamp = time * 1000; // Convert seconds to milliseconds
  const date = new Date(timestamp);
  // Get the current date
  const currentDate = new Date();
  // Calculate the difference in milliseconds
  const differenceMilliseconds = date - currentDate;
  // Calculate the difference in days
  const differenceDays = Math.floor(
    differenceMilliseconds / (24 * 60 * 60 * 1000)
  );
  if (differenceDays < 0) {
    return <p>0</p>;
  }
  // Check if it's the present day
  const differenceHours = Math.floor(differenceMilliseconds / (60 * 60 * 1000));
  if (differenceDays === 0) {
    // Calculate the difference in hours
    return (
      <>
        <p>{differenceHours}</p> <span>HOURS</span>
      </>
    );
  } else {
    return (
      <>
        <p>{differenceDays}</p>
        <span>DAY{differenceDays !== 1 ? "S" : ""}</span>
      </>
    );
  }
};
useEffect(() => {
  const currentTimestamp = Date.now() / 1000;
  setIsSubmissionTime(false);
  if (data?.submission_end_time < currentTimestamp) {
    // Submission time is over
    setIsVotingTime(data?.voting_end_time < currentTimestamp);
  } else {
    // Calculate submission time remaining
    const submissionTimeRemaining = convertTime(data?.submission_end_time);
    setIsSubmissionTime(submissionTimeRemaining <= 0);
    setIsVotingTime(false);
  }
}, [data]);
function makeAccountIdShorter(accountId) {
  if (accountId.length > 20) {
    return accountId.slice(0, 17) + "...";
  }
  return accountId;
}
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
const formatTimestampToDate = (timestamp) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(timestamp * 1000).toLocaleDateString(
    "en-US",
    options
  );

  return <p className="formattedAmount">{formattedDate}</p>;
};
return (
  <CardRoot>
    <div className="card-title">
      <div className="name">
        <h1>{makeAccountIdShorter(data?.title) ?? "-- No Title --"}</h1>
        <a
          href={`#/bos.genadrop.near/widget/CPlanet.DAO.Index?daoId=${props?.data?.dao_id}`}
        >
          {props?.data?.dao_id} {checkSvg}
        </a>
      </div>
      <p
        className={
          !props?.isVotingEnded
            ? "not"
            : data?.winners?.length === 0
            ? "voting"
            : "not"
        }
      >
        {props.isSubmissionOpen
          ? "Submission Open"
          : !props?.isVotingEnded
          ? "Voting Closed"
          : "Voting Open"}
      </p>
    </div>
    <div className="description">
      <p>
        {props?.data?.description?.substring(0, 120) ?? "-- No description --"}
      </p>
    </div>
    <div className="card-footer">
      <div className="one-sec">
        <span className="prize">Total Prize</span>
        <div className="amount">
          <img
            src="https://ipfs.near.social/ipfs/bafkreierjvmroeb6tnfu3ckrfmet7wpx7k3ubjnc6gcdzauwqkxobnu57e"
            alt=""
          />
          <p>{props?.data?.prize}</p>
          <span>{getUsdValue(props?.data?.prize)}</span>
        </div>
      </div>
      <div className="one-sec">
        <span className="prize">Winners</span>
        <div className="amount">
          <p>{data?.winners?.length ?? 0}</p>
        </div>
      </div>
      <div className="one-sec">
        <span className="prize">
          {props.isSubmissionOpen
            ? "Submit Before"
            : !props.isVotingEnded
            ? "Voting Ended"
            : "Voting Ends In"}
        </span>
        <div className="amount">
          {props.isSubmissionOpen
            ? convertTime(data?.submission_end_time)
            : props?.isVotingEnded
            ? convertTime(data?.voting_end_time)
            : formatTimestampToDate(data?.voting_end_time)}
        </div>
      </div>
      <div className="one-sec">
        <span className="prize">Entries</span>
        <div className="amount">
          <p>{data?.submissions ?? 0}</p>
        </div>
      </div>
    </div>
    <a
      onClick={() => props.update({ tab: "singleContest" })}
      href={
        props.isGateway
          ? `#/bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Single?&contestId=${props.id}&status=${props?.isTest}`
          : `#/bos.genadrop.near/widget/CPlanet.Index?tab=singleContest&contestId=${props.id}&status=${props?.isTest}`
      }
      className="card-button"
    >
      View Contest
    </a>
  </CardRoot>
);
