const redFlag = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <rect x="0.5" y="1" width="15" height="15" rx="7.5" fill="#FF7777"/>
  <rect x="0.5" y="1" width="15" height="15" rx="7.5" stroke="#FF7777"/>
  <path d="M9.69231 13.125C9.69231 14.1589 8.86412 15 7.84615 15C6.82818 15 6 14.1589 6 13.125C6 12.0911 6.82818 11.25 7.84615 11.25C8.86412 11.25 9.69231 12.0911 9.69231 13.125ZM6.21369 3.5906L6.52754 9.9656C6.54228 10.265 6.78556 10.5 7.08069 10.5H8.61162C8.90675 10.5 9.15002 10.265 9.16477 9.9656L9.47862 3.5906C9.49442 3.2693 9.24222 3 8.92546 3H6.76685C6.45009 3 6.19788 3.2693 6.21369 3.5906Z" fill="#FFEEEE"/>
</svg>
)

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

const Container = styled.div`
  border: 1px solid ${(p) => (p.selected ? "#3BD07F" : p.notOwner ? "#F777" :  "#eaeaea")};
  margin-bottom: 20px;
  @media (max-width: 500px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`

const Root = styled.div`
  height: max-height;
  max-width: 1000px;
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${(p) => (p.selected ? "#3BD07F" : p.notOwner ? "#F777" :  "#eaeaea")};
  background: ${(p) => (p.selected ? "#E4FFF0" : p.notOwner ? "#FFF8F8" : "#fff")};
  @media (max-width: 500px) {
    width: 100% !important;
    max-width: 100% !important;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
    height: 100%;
  }
  .cardContent {
    width: 70%;
    @media (max-width: 500px) {
      width: 100%;
    }
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
  .headerName {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .dots {
    width: 7px;
    height: 7px;
    margin-bottom: 13px;
    margin-right: 5px;
    margin-left: 5px;
    background: #b0b0b0;
    border-radius: 50%;
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
      min-width: inherit;
    }
  }
`;
const StartedButton = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 132px;
  .bannedUser {
    display: flex;
    margin-top: 5px;
    align-items: center: !important;
    svg {
      margin-right: 7px;
      width: 25px;
    }
    p {
      color: #F77;
      leading-trim: both;
      text-edge: cap;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

  }
  .proposal {
    border-radius: 12px;
    width: max-content;
    border: 1px solid #3BD07F;
    background: #3BD07F;
    color: #E4FFF0;
    font-size: 12px;
    font-weight: 700;
    padding: 10px 15px;
    margin: 10px 0;
    margin-right: 40px;
    text-transform: uppercase;
  }
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
    :disabled {
      background: #b0b0b0;
      cursor: not-allowed;
    }
  }
  .banned {
    gap: 8px;
    padding: 12px 30px;
    border-radius: 32px;
    border: 0.357px solid #F77;
    background: #F77;
    color: #fff;
    text-align: center;

    font-family: Helvetica Neue;
    font-size: 16px;
    font-weight: 500;
    cursor: not-allowed;
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
    margin-bottom: 10px;
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
    "fund-vf.genadrop.near",
    "vote",
    {
      submission_owner: props.owner,
      contest_id: Number(props.contestId),
    },
    "300000000000000",
    "10000000000000000000000"
  );
};

const [isAccountConnected, setIsAccountConnected] = useState(!context.accountId)
const [nftData, setNftData] = useState({})

const formatTime = (time) => {
  const timestamp = time * 1000; // Convert seconds to milliseconds
  const date = new Date(timestamp);

  // Format the date to "Month day, year" (e.g., "Oct 31, 2023")
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

const winnerDetails = Near.view(
  "fund-vf.genadrop.near",
  "get_winner_payout_info",
  {
    subscribe: true,
    contest_id: Number(props.contestId),
    winner: props.owner,
  }
);

const totalUsersVoted = Near.view(
  "fund-vf.genadrop.near",
  "get_all_user_voted",
  {
    subscribe: true,
    contest_id: Number(props.contestId),
  }
);

const handleOnMouseEnter = () => {
  setIsAccountConnected(true)
};
const handleOnMouseLeave = () => {
  setIsAccountConnected(false)
};


const profileImage = Social.getr(`${props?.owner}/profile`)

const overlay = (
  <div
    className='border m-3 p-3 rounded-4 bg-white shadow'
    style={{ maxWidth: "24em", zIndex: 1070 }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    Please connect to a Near Wallet to vote
  </div>
);

function fetchNFTDetails() {
  asyncFetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
        mb_views_nft_tokens(
          where: {nft_contract_id: {_eq: "${props?.content?.contract_id}"}, token_id: {_eq: "${props?.content?.token_id}"}}
          limit: 30
          order_by: {last_transfer_timestamp: desc}
        ) {
          nft_contract_id
          title
          description
          media
          owner
          last_transfer_receipt_id
        }
      }
      
      `,
    }),
  }).then((data) => {
    if(data.body.data?.mb_views_nft_tokens?.length) {
      setNftData(data.body.data?.mb_views_nft_tokens[0])
    }
  });
}

fetchNFTDetails()

function makeDescriptionShorter(desc) {
  if (desc.length > 200) {
    return desc.slice(0, 200) + "...";
  }
  return desc;
}

const gas = 200000000000000;
    const deposit = 100000000000000000000000;


let ftMetadata = {
      decimals: 24
};


const amountInYocto = Big(0.5)
        .mul(Big(10).pow(ftMetadata.decimals))
        .toFixed();


function handleCreateProposal() {
  Near.call([
    {
        contractName: props.daoId,
        methodName: "add_proposal",
        args: {
            proposal: {
                description: state.description ?? "Transfer proposal",
                kind: {
                    Transfer: {
                        token_id: "",
                        receiver_id: props?.owner,
                        amount: amountInYocto
                    }
                }
            }
        },
        gas: gas,
        deposit: deposit
    }
]);

}

const notOwner = props?.owner !== nftData?.owner
console.log(notOwner, props?.owner, nftData?.owner)


return (
  <Container
    selected={
      props.winners ? props.winners?.some((data) => data === props.owner) : ""
    }
    notOwner={props?.owner === nftData?.owner ? false: true}
  >
  <Root
    selected={
      props.winners ? props.winners?.some((data) => data === props.owner) : ""
    }
    notOwner={props?.owner === nftData?.owner ? false: true}
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
        <div className="headerName">
        <a
         href={`#/bos.genadrop.near/widget/GenaDrop.Profile.Main?accountId=${props.owner}`}
        >
        <p>
          NFT by {profileImage?.image?.ipfs_cid ? <img src={`https://ipfs.near.social/ipfs/${profileImage?.image?.ipfs_cid}`} /> : <NoProfile />} <span>{props?.owner}</span>
        </p>
        </a>
        <span className="dots"></span>
        <p>
          {formatTime(props?.content?.timestamp)}
        </p>
        </div>
      </Header>
      <CardBody>
        <div className="desc">
          <p>{makeDescriptionShorter(nftData?.description ?? "")}</p>
        </div>
      </CardBody>
    </div>
    <StartedButton>
      {!props.isClosed && !props.isOpen ? (
        <OverlayTrigger 
        show={isAccountConnected || !context.accountId} 
        trigger={['hover']} 
        delay={{ show: 250, hide: 300 }}
        overlay={overlay}
        placement='auto'
       
        >
        <button disabled={isAccountConnected || !context.accountId || notOwner} onClick={handleVoteClick} 
        className={notOwner ? "banned": "vote"}>
          {props?.owner === nftData?.owner ? "Vote": "Banned"}
        </button>
        </OverlayTrigger>
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
      {
        props.isClosed && props?.councilMember && !winnerDetails?.proposal_id && (
          <button onClick={handleCreateProposal} className="proposal">CREATE PROPOSAL</button>
        )
      }
      {props?.owner === nftData?.owner || nftData?.owner === undefined ? "" : (
        <div className="bannedUser">
          {redFlag}
           <p className="">Owner no longer owns the NFT</p>
        </div>
      )}
       <p>{props?.content?.votes} Vote(s)</p>
    </StartedButton>
  </Root>
  <Widget src="bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Proposal" props={{daoId: props.daoId, proposalId: winnerDetails?.proposal_id }} />
  </Container>
);
