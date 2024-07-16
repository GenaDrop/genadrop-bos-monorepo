const DAOCardStyles = styled.div`
  width: 350px;
  height: 250px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    h2 {
      font-size: 18px;
      margin-bottom: 0;
      margin-left: auto;
      margin-right: auto;
      font-weight: 600;
    }
    .green {
      width: 10px;
      height: 10px;
      background: green;
      border-radius: 50px;
    }
    .red {
      width: 10px;
      height: 10px;
      background: red;
      border-radius: 50px;
    }
  }
.button {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  button {
    background: none;
    color: #000;
    border-color: #000;
    &:hover {
      background: #000;
      color: #fff;
    }
  }
  }
  .dao-card-stats {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 0.5rem;
    row-gap: 0.2rem;
    margin-top: 30px !important;

    & > p:nth-child(1),
    & > p:nth-child(2),
    & > p:nth-child(3) {
      font-size: 0.8rem;
      color: #4498e0;
      margin: 0;
    }

    & > p:nth-child(4),
    & > p:nth-child(5),
    & > p:nth-child(6) {
      font-size: 0.8rem;
      font-weight: 600;
      margin: 0;
    }

    p > b {
      font-size: 1.15rem;
      font-weight: 700;
    }
  }

  a {
    color: #4498e0;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      color: #4498e0cc;
  }
  
`;

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const DAOCard = ({ name }) => {
  const policy = Near.view(name, "get_policy");

  const baseApi = "https://api.pikespeak.ai";
  const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

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
    proposalsStatus: (daoId) => {
      return fetch(
        constructURL(`${baseApi}/daos/proposals/status/${daoId}`),
        fetchApiConfig
      );
    },
  };

  const proposalsStatus = fether.proposalsStatus(name);
  let activeProposalsCount;
  let totalProposalsCount;

  proposalsStatus?.body &&
    proposalsStatus.body?.forEach((p) => {
      activeProposalsCount += p["InProgress"] ? parseInt(p["InProgress"]) : 0;
      totalProposalsCount += p["Total"] ? parseInt(p["Total"]) : 0;
    });

  let members = [];
  policy?.roles &&
    policy?.roles?.forEach((role) => {
      if (typeof role?.kind?.Group === "object") {
        members = members.concat(role.kind.Group);
      }
    });
  members = [...new Set(members)];

  // let NftCount = 0;

  const NftCount = fetch(
    `https://api.mintbase.xyz/human/${name}/owned?offset=0&limit=20`,
    {
      method: "GET",
      headers: {
        "mb-api-key": "omni-site",
        "Content-Type": "application/json",
        "x-hasura-role": "anonymous",
      },
    }
  );
  const isAMember =
    members?.length && members?.some((data) => data === context?.accountId);

  const Count = NftCount?.body ? JSON.parse(NftCount?.body) : 0;

  return (
    <DAOCardStyles>
      <div className="top">
        <h2>{name?.length > 30 ? `${name.substring(0, 30)}...` : name}</h2>
        <span className={isAMember ? "green" : "red"}></span>
      </div>
      <div className="d-grid justify-content-between text-center dao-card-stats mb-3 mt-auto">
        <p>Owned NFTs</p>
        <p>Members/Groups</p>
        <p>Proposals</p>
        <p>
          <b>{Count?.total}</b>
        </p>
        <p>
          <b>{members.length}</b>/{policy.roles.length - 1}
        </p>
        <p>
          <b>{activeProposalsCount ?? 0}</b>/{totalProposalsCount ?? 0}
        </p>
      </div>
      <div className="button">
        <Link
          to={href({
            widgetSrc: "${config_account}/widget/Mintbase.App.Index",
            params: {
              page: "human",
              accountId: name,
            },
          })}
        >
          <button>View DAO Profile</button>
        </Link>
      </div>
    </DAOCardStyles>
  );
};

return { DAOCard };
