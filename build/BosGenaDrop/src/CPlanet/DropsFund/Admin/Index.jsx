const Root = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 700px;
    width: 100%;
    padding: 40px;
    .header {
        h1 {
            font-size: 38px;
            font-weight: 700;
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
`

const [contestName, setName] = useState("")
const [description, setDescription] = useState("")
const [daoId, setDaoId] = useState("")
const [price, setPrice] = useState(0)
const [places, setPlaces] = useState(0)
const [minArtVote, setMinArtVote] = useState(0)
const [submissionStart, setSubmissionStart] = useState("")
const [submissionEnd, setSubmissionEnd] = useState("")
const [votingStart, setVotingStart] = useState("")
const [votingEnd, setVotingEnd] = useState("")

function convertToTimestamp(dateString) {
    // Create a Date object from the given string
    var dateObject = new Date(dateString);
  
    // We need to get the Unix timestamp so we divide by a 1000
    var unixTimestamp = Math.floor(dateObject.getTime() / 1000);
  
    // Return the result
    return unixTimestamp;
  }

const handleSubmit = () => {
    Near.call("fund-v2.genadrop.near",
     "create_contest", 
     {
        title: contestName,
        description,
        dao_id: daoId,
        logo_url: "https://picsum.photos/200/300.jpg",
        submission_start_time: convertToTimestamp(submissionStart),
        submission_end_time: convertToTimestamp(submissionEnd),
        voting_start_time: convertToTimestamp(votingStart),
        voting_end_time: convertToTimestamp(votingStart),
        min_art_vote: Number(minArtVote),
        places: Number(places),
        prize: Number(price),
        quorum: 2,
    },
    "300000000000000",
    "10000000000000000000000"
    )
}

return (
    <Root>
        <div className="header">
            <h1>Create a Contest</h1>
        </div>
        <div className="form">
            <div className="field">
                <label>Name</label>
                <input value={contestName} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="field">
                <label>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}  />
            </div>
            <div className="field">
                <label>DAO Account ID</label>
                <input value={daoId} onChange={e => setDaoId(e.target.value)} required />
            </div>
            <div className="field">
                <label>Price</label>
                <input value={price} onChange={e => setPrice(e.target.value)} type="number" required />
            </div>
            <div className="field">
                <label>Places</label>
                <input value={places} onChange={e => setPlaces(e.target.value)} type="number" required />
            </div>
            
            <div className="field">
                <label>Minimum Art Vote</label>
                <input value={minArtVote} onChange={e => setMinArtVote(e.target.value)} type="number" required />
            </div>
            <div className="date-field">
            <div className="field">
                <label>Submission Start Time</label>
                <input value={submissionStart} onChange={e => setSubmissionStart(e.target.value)} type="datetime-local" required />
            </div>
            <div className="field">
                <label>Submission End Time</label>
                <input value={submissionEnd} onChange={e => setSubmissionEnd(e.target.value)} type="datetime-local" required />
            </div>
            </div>
            <div className="date-field">
            <div className="field">
                <label>Voting Start Time</label>
                <input value={votingStart} onChange={e => setVotingStart(e.target.value)} type="datetime-local" required />
            </div>
            <div className="field">
                <label>Voting End Time</label>
                <input value={votingEnd} onChange={e => setVotingEnd(e.target.value)} type="datetime-local" required />
            </div>
            </div>
            <div className="button">
                <button onClick={handleSubmit}>Create</button>
            </div>
        </div>
    </Root>
)