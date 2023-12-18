const nearGreen = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <circle
      cx="7"
      cy="7"
      r="11.533"
      fill="#3BD07F"
      stroke="#3BD07F"
      stroke-width="0.933953"
    />
  </svg>
);

const Root = styled.div`
  height: 176px;
  max-width: 932px;
  display: flex;
  padding: 16px;
  background: ${(p) => (p.selected ? "#E4FFF0" : "#fff")};
  border: 1px solid ${(p) => (p.selected ? "#3BD07F" : "#eaeaea")};
  @media (max-width: 500px) {
    width: 90% !important;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    flex-wrap: wrap;
    height: 100%;
  }
`;

const Image = styled.div`
  width: 144px;
  height: 144px;
  flex-shrink: 0;
  margin-right: 5px;
  background: rgba(160, 160, 160, 0.2);
  margin-right: 20px;
  img {
    width: 100%;
    border-radius: 6px;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 500px) {
    width: 250px;
    height: 250px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
`;

const Header = styled.div`  
  a {
    text-decoration: #b0b0b0;
  }
  h1 {
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  p {
    color: #b0b0b0;
    font-family: Helvetica Neue;
    display: flex;
    align-item: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal
    span {
      color: ${(p) => (p.selected ? "#3BD07F" : "#b0b0b0")};
      font-weight: ${(p) => (p.selected ? "700" : "500")};
    }
  }
  img {
    width: 16px !important;
    height: 16px !important;
    margin: 5px 3px 0 5px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const NoProfile = styled.div`
  margin-top: 5px;
  margin: 5px 3px 0 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #808080;
`

const CardBody = styled.div`
  display: flex;
  width: 70%;
  .desc {
    min-width: 600px;
  }
  p {
    overflow: hidden;
    color: #b0b0b0;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 148%; /* 23.68px */
  }
  @media (max-width: 500px) {
    .desc {
      min-width: 100%;
    }
  }
`;
const StartedButton = styled.div`
  margin-top: 30px;
  .vote {
    gap: 8px;
    padding: 12px 30px;
    border-radius: 32px;
    border: 0.357px solid #000;
    background: #000;
    color: #fff;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-weight: 500;
  }
  .won {
    display: flex;
    width: max-content;
    padding: 8px 20px;
    border-radius: 32px;
    border: 1px solid #3bd07f;
    background: #e4fff0;
    gap: 8px;
    color: #3bd07f;
    font-family: Helvetica Neue;
    font-size: 16px;
    margin-right: 40px;
    font-weight: 700;
  }
  .disabled {
    height: 48px;
    gap: 8px;
    width: max-content;
    color: #b0b0b0;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    border: 2px solid #b0b0b0;
    background: none;
    border-radius: 32px;
    text-transform: uppercase;
    font-family: Helvetica Neue;
    margin-bottom: 40px;
  }
  .disabled:hover {
    background: none;
    border-color: #b0b0b0;
    color: #b0b0b0;
  }
  @media (max-width: 500px) {
    display: block;
  }
`;

const handleVoteClick = () => {
  Near.call(
    "fund-v1.genadrop.near",
    "vote",
    {
      submission_owner: props.owner,
      contest_id: Number(props.contestId),
    },
    "300000000000000",
    "10000000000000000000000"
  );
};

const formatTime = (time) => {
  const timestamp = time * 1000; // Convert seconds to milliseconds
  const date = new Date(timestamp);

  // Format the date to "Month day, year" (e.g., "Oct 31, 2023")
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

const winnerDetails = Near.view(
  "fund-v1.genadrop.near",
  "get_winner_payout_info",
  {
    subscribe: true,
    contest_id: Number(props.contestId),
    winner: props.owner,
  }
);

const totalUsersVoted = Near.view(
  "fund-v1.genadrop.near",
  "get_all_user_voted",
  {
    subscribe: true,
    contest_id: Number(props.contestId),
  }
);

const profileImage = Social.getr(`${props?.owner}/profile`)

return (
  <Root
    selected={
      props.winners ? props.winners?.some((data) => data === props.owner) : ""
    }
  >
    <Image>
      <img src={props?.content?.image_url} alt="" />
    </Image>
    <div className="cardContent">
      <Header
        selected={
          props.winners
            ? props.winners?.some((data) => data === props.owner)
            : ""
        }
      >
        <h1>{props?.content?.title}</h1>
        <a
         href={`#/bos.genadrop.near/widget/GenaDrop.Profile.Main?accountId=${props.owner}`}
        >
        <p>
          NFT by {profileImage?.image?.ipfs_cid ? <img src={`https://ipfs.near.social/ipfs/${profileImage?.image?.ipfs_cid}`} /> : <NoProfile />} <span>{props?.owner}</span>
        </p>
        </a>
      </Header>
      <CardBody>
        <div className="desc">
          <p>Time Submitted: {formatTime(props?.content?.timestamp)}</p>
          <p>Total Votes: {props?.content?.votes}</p>
        </div>
      </CardBody>
    </div>
    <StartedButton>
      {!props.isClosed && !props.isOpen ? (
        <button onClick={handleVoteClick} className="vote">
          Upvote
        </button>
      ) : props.winners?.some((data) => data === props.owner) ? (
        <button className="won">
          <img
            src="https://ipfs.near.social/ipfs/bafkreiawfm4tx4xxmqyzify4lmp45mfbqqxn4jkfwqdkg3zzkvlek5fjoi"
            alt=""
          />
          {winnerDetails?.amount} Won
        </button>
      ) : (
        <button className="disabled">
          {props.isOpen ? "Not Started" : "Contest Ended"}
        </button>
      )}
    </StartedButton>
  </Root>
);
