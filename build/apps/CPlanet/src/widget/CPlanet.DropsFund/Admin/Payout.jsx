const Root = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  width: 100%;
  padding: 40px;
  .header {
    display: flex;
    align-items: center;
    flex-direction: column;
    h1 {
      font-size: 38px;
      font-weight: 700;
    }
    span {
      color: #b0b0b0;
      text-align: center;
    }
  }
  .field {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .date-field {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 40px;
  }
  .button {
    width: 100%;
    button {
      background: #000;
      border: 1px solid #000;
      width: 100%;
      margin-top: 30px;
    }
  }
`;
const [winner, setWinner] = useState("");
const [contestId, setContestId] = useState(0);
const [proposalId, setProposalId] = useState(0);
const handleSubmit = () => {
  Near.call(
    "fund-beta.genadrop.near",
    "set_payout_proposal_id",
    {
      contest_id: Number(contestId),
      proposal_id: Number(proposalId),
      winner: winner,
    },
    "300000000000000"
  );
};
return (
  <Root>
    <div className="header">
      <h1>Update Winner Information</h1>
      <span>Update the Winner information with the proposal Id</span>
    </div>
    <div className="form">
      <div className="field">
        <label>Winner Account ID</label>
        <input
          placeholder="genadrop.near"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label>Contest ID</label>
        <input
          value={contestId}
          onChange={(e) => setContestId(e.target.value)}
          type="number"
          required
        />
      </div>
      <div className="field">
        <label>
          Proposal ID (The ID of the Proposal that was created to Payout this
          User)
        </label>
        <input
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          type="number"
          required
        />
      </div>
      <div className="button">
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  </Root>
);
