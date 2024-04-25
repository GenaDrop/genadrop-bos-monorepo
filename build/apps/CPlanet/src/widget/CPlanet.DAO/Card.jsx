const daoId = props.daoId ?? "dao.near";
if (!daoId) {
  return "DAO ID not provided";
}
// -- Pikespeak API
const baseApi = "https://api.pikespeak.ai";
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const CardRoot = styled.div`
  width: 315px;
  height: 448px;
  border: 1px solid #efefef;
  background: #fff;
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
    height: 80px;
   > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    position: relative;
    width: 100%;
    background: black;
    div {
      position: absolute;
      top: 50px;
      left: 10px;;
      img {
        width: 66px;
        height: 66px;
        flex-shrink: 0;
        border-radius: 50%;
        border 1px solid #fff;
      }
    }
`;
const Bottom = styled.div`
  h1 {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    whitespace: nowrap;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
`;
const ImageProfile = styled.div`
  img {
    position: absolute;
    width: 66px;
    height: 66px;
    flex-shrink: 0;
    border: 1px solid white;
    border-radius: 50%;
    top: 45px;
    object-fit: cover;
    background: black;
    left: 16px;
  }
`;
const HeaderText = styled.div`
  margin-top: 32px;
  height: 140px;
  p {
    margin-bottom: 10px;
    overflow: hidden;
    color: #b0b0b0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const CardBody = styled.div`
  padding: 0 16px;
  h1 {
    margin-top: 40px;
    color: #000;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    text-transform: lowercase;
    font-weight: 700;
    line-height: normal;
  }
  h3 {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    whitespace: nowrap;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%;
  }
`;
const AmountSec = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  div {
    span {
      color: #b0b0b0;
      font-family: Helvetica Neue;
      font-size: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
    }
    img {
      width: 15px;
      height: 15px;
    }
    p {
      color: #000;
      font-family: Helvetica Neue;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 5px;
      span {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
      }
    }
  }
`;
const Button = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
margin-top: 10px;
  button {
    border: 1px solid black;
    border-radius: 0;
    color: white;
    background: black;
    text-align: center
    display: flex;
    width: 296px;
    padding: 7px 0px;
    cursor: pointer;
  }
  button:disabled {
    background: grey;
    border: grey;
    cursor: not-allowed;
  }
  button:hover, a:hover {
    background: white;
    color: black;
    border-color: black;
  }
`;
const Tags = styled.div`
  display: flex;
  gap: 7px;
  margin-left: 10px;
  margin-top: 40px;
  .tag {
    color: #fff;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-radius: 50px;
    background: #f8f8f8;
    width: max-content;
    color: #b0b0b0;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 15px */
    padding: 3px 10px;
  }
  .no-tag {
    opacity: 0;
  }
`;
const Footer = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
`;
const fetchApiConfig = {
  mode: "cors",
  headers: {
    "x-api-key": publicApiKey,
  },
};
const constructURL = (baseURL, paramObj) => {
  let params = "";
  for (const [key, value] of Object.entries(paramObj ?? {})) {
    params += `${key}=${value}&`;
  }
  params = params.slice(0, -1);
  return `${baseURL}?${params}`;
};
const fether = {
  balances: (accounts) => {
    return fetch(
      constructURL(`${baseApi}/account/balances`, { accounts }),
      fetchApiConfig
    );
  },
  proposalsStatus: (daoId) => {
    return fetch(
      constructURL(`${baseApi}/daos/proposals/status/${daoId}`),
      fetchApiConfig
    );
  },
};
const balances = fether.balances([daoId]);
const proposalsStatus = fether.proposalsStatus(daoId);
let activeProposalsCount;
let totalProposalsCount;
proposalsStatus.body &&
  proposalsStatus.body?.forEach((p) => {
    activeProposalsCount += p["InProgress"] ? parseInt(p["InProgress"]) : 0;
    totalProposalsCount += p["Total"] ? parseInt(p["Total"]) : 0;
  });
// --
// -- Social DB
const profile = Social.get(`${daoId}/profile/**`, "final");
// --
// -- Smart Contract
const policy = Near.view(daoId, "get_policy");
let members = [];
policy &&
  policy.roles.forEach((role) => {
    if (typeof role.kind.Group === "object") {
      members = members.concat(role.kind.Group);
    }
  });
members = [...new Set(members)];
// --
const shorten = (str, len) => {
  if (str.length <= len) {
    return str;
  }
  return str.slice(0, len) + "...";
};
const shortenNumber = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return (n / 1e3).toFixed(1) + "k";
  if (n >= 1e6 && n < 1e9) return (n / 1e6).toFixed(1) + "m";
  if (n >= 1e9 && n < 1e12) return (n / 1e9).toFixed(1) + "b";
  if (n >= 1e12) return (n / 1e12).toFixed(1) + "t";
};
function makeAccountIdShorter(accountId) {
  if (accountId.length > shortenLength) {
    return accountId.slice(0, shortenLength) + "...";
  }
  return accountId;
}
return (
  <CardRoot>
    <Top>
      <img
        src={
          profile.backgroundImage
            ? `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
        }
        alt=""
      />
      <div>
        <img
          src={
            profile.image
              ? `https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
          }
          alt=""
        />
      </div>
    </Top>
    <Bottom>
      <CardBody>
        <HeaderText>
          <h1>{daoId ? makeAccountIdShorter(daoId) : `DAO Name`}</h1>
          <h3>
            {shorten(profile?.description || "", 80)}
            {profile !== null &&
              (!profile?.description || profile?.description?.length < 1) &&
              "No description"}
          </h3>
        </HeaderText>
        <AmountSec>
          <div>
            <span>Total Funds</span>
            <p>
              {props.totalFunds ?? "0"}/<span>0</span>
            </p>
          </div>
          <div>
            <span>Members / Group</span>
            <p>
              {members.length ?? "0"}/
              <span>{policy.roles.length ? policy.roles.length - 1 : 0}</span>
            </p>
          </div>
          <div>
            <span>Active / Total Proposal</span>
            <p>
              {activeProposalsCount ?? "0"} /
              <span>{totalProposalsCount ?? 0}</span>
            </p>
          </div>
        </AmountSec>
      </CardBody>
      <Footer>
        <Tags>
          {profile.tags ? (
            Object.keys(profile.tags).length > 0 &&
            Object.keys(profile.tags)
              .slice(0, 3)
              .map((data) => <div className="tag">{data}</div>)
          ) : (
            <div className="no-tag">man</div>
          )}
        </Tags>
        <Button>
          <a
            href={
              props.isGateway
                ? `#/bos.genadrop.near/widget/CPlanet.DAO.Index?daoId=${props.daoId}`
                : `#/bos.genadrop.near/widget/CPlanet.Index?tab=daoProfile&daoId=${props.daoId}`
            }
            onClick={() => props.onButtonClick()}
          >
            <button>View DAO</button>
          </a>
        </Button>
      </Footer>
    </Bottom>
  </CardRoot>
);
