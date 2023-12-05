const Root = styled.div`
  height: 176px;
  max-width: 904px;
  display: flex;
  padding: 16px;
  background: #fff;
  border: 1px solid #eaeaea;
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
`;

const Header = styled.div`
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
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const CardBody = styled.div`
  display: flex;
  width: 80%;
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
`;

const handleVoteClick = () => {
  Near.call(
    "cdao.genadrop.near",
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

return (
  <Root>
    <Image>
      <img src={props?.content?.image_url} alt="" />
    </Image>
    <div className="cardContent">
      <Header>
        <h1>{props?.content?.title}</h1>
        <p>NFT by {props?.owner}</p>
      </Header>
      <CardBody>
        <div className="desc">
          <p>Time Submitted: {formatTime(props?.content?.timestamp)}</p>
          <p>Total Votes: {props?.content?.votes}</p>
        </div>
      </CardBody>
    </div>
    <StartedButton>
      {!props.isClosed ? (
        <button onClick={handleVoteClick} className="vote">
          Upvote
        </button>
      ) : (
        <button className="disabled">
          {props.isOpen ? "Not Started" : "Contest Ended"}
        </button>
      )}
    </StartedButton>
  </Root>
);
