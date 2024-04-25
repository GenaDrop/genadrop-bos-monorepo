const daoId = props.daoId ?? "wazes-dao.sputnik-dao.near";
const Root = styled.div`
  margin-bottom: 50px;
  .proposeButton {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    button {
      background: black;
      border-radius: 0;
      width: 250px;
      border-color: black;
    }
  }
`;
const ImageSection = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    position: absolute;
    top: 120px;
    border: 3px solid #fff;
    left: 20px;
  }
`;
const RightProfile = styled.div`
  margin-top: 104px;
  width: 250px;
  width: 315px;
  padding: 0 20px;
  .title {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
  .username {
    overflow: hidden;
    color: #b0b0b0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 148%;
  }
  .description {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    margin-top: 7px;
    font-weight: 400;
    line-height: 148%;
  }
  .buttons {
    .follow {
      width: 90%;
      height: 32px;
      background: #000;
      color: white;
      margin-bottom: 10px;
    }
    .following {
      width: 90%;
      height: 32px;
      color: #b0b0b0;
      border: 1px solid #b0b0b0 !important;
      margin-bottom: 10px;
      cursor: not-allowed;
    }
    width: 100%;
  }
  .joinButton {
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: space-between;
    button {
      background: black;
      border: 0;
      border-radius: 0;
      width: 100%;
    }
  }
  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 40px;
    margin-left: 15px;
    .title {
      font-size: 20px;
    }
  }
`;
const AmountSec = styled.div`
  max-width: 300px;
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
  button:hover {
    background: white;
    color: black;
    border-color: black;
  }
`;
const Tags = styled.div`
  display: flex;
  gap: 7px;
  margin-left: 10px;
  margin-bottom: 10px;
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
`;
const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 28px;
  overflow: auto;
  scroll-behavior: smooth;
  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 26px;
    > * {
      flex: 1;
    }
  }
  @media (max-width: 800px) {
    width: 100% !important;
    overflow: scroll;
  }
`;
const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "black" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;
  &:hover {
    color: #11181c;
  }
  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: black;
  }
  @media (max-width: 800px) {
    font-size: 12px;
  }
`;
State.init({
  selectedTab: props.tab || "feed",
  toggle: false,
  joinRole: "",
});
const [councilMembers, setCouncilMembers] = useState({});
const Contents = styled.div`
  display: flex;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  align-items: flex-start;
  max-width: 1400px;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const MiddleContent = styled.div`
  width: 900px;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
const MembersGroup = styled.div`
  margin-top: 40px;
  width: 220px;
  margin-left: 20px;
  h1 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 28.8px */
  }
  .members {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0;
  }
`;
const profile = Social.get(`${daoId}/profile/**`, "final");
const accounts = [daoId];
// -- Smart Contract
const policy = Near.view(daoId, "get_policy");
let members = [];
policy?.roles?.length &&
  policy.roles.forEach((role) => {
    if (typeof role.kind.Group === "object") {
      members = members.concat(role.kind.Group);
    }
  });
members = [...new Set(members)];
// --
if (!policy)
  return (
    <div>
      <h2>Not a Valid DAO</h2>
    </div>
  );
function makeAccountIdShorter(accountId) {
  if (accountId.length > shortenLength) {
    return accountId.slice(0, shortenLength) + "...";
  }
  return accountId;
}
const background = profile.backgroundImage
  ? `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU";
useEffect(() => {
  setCouncilMembers(
    policy.roles.filter(
      (data) => data.name === "council" || data.name === "Council"
    )[0]?.kind?.Group
  );
}, [policy]);
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
const shortenNumber = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return (n / 1e3).toFixed(1) + "k";
  if (n >= 1e6 && n < 1e9) return (n / 1e6).toFixed(1) + "m";
  if (n >= 1e9 && n < 1e12) return (n / 1e9).toFixed(1) + "b";
  if (n >= 1e12) return (n / 1e12).toFixed(1) + "t";
};
// Account follows you:
const accountFollowsYouData = Social.keys(
  `${context.accountId}/graph/follow/${daoId}`,
  undefined,
  {
    values_only: true,
  }
);
const accountFollowsYou = Object.keys(accountFollowsYouData || {}).length > 0;
function followUser(user, isFollowing) {
  if (isFollowing) return;
  const dataToSend = {
    graph: { follow: { [user]: isFollowing ? null : "" } },
    index: {
      graph: JSON.stringify({
        key: "follow",
        value: {
          type,
          accountId: user,
        },
      }),
      notify: JSON.stringify({
        key: user,
        value: {
          type,
        },
      }),
    },
  };
  Social.set(dataToSend, {
    force: true,
  });
}
const onAddUserProposal = (memberId, roleId) => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "Potential member",
          kind: {
            AddMemberToRole: {
              member_id: memberId,
              role: roleId ?? "council",
            },
          },
        },
      },
      gas: 219000000000000,
      deposit: policy?.policy?.proposal_bond || 100000000000000000000000,
    },
  ]);
};
return (
  <Root>
    <ImageSection
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        src={
          profile.image
            ? `https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
        }
      />
    </ImageSection>
    <Contents>
      <RightProfile>
        <h1 className="title">{profile.name ?? daoId}</h1>
        <span className="username">@{daoId ?? "creativedao.near"}</span>
        <p className="description">{profile.description ?? "No Description"}</p>
        <AmountSec>
          <div>
            <span>TotalFunds</span>
            {balances?.body.totalUsd ? (
              <b className="me-1">{shortenNumber(balances.body.totalUsd)}USD</b>
            ) : (
              <p>0</p>
            )}
          </div>
          <div>
            <span>Members/Group</span>
            <p>
              {members.length ?? "0"}/
              <span>{policy.roles.length ? policy.roles.length - 1 : 0}</span>
            </p>
          </div>
          <div>
            <span>Active/Total Proposal</span>
            <p>
              {activeProposalsCount ?? "0"} /
              <span>{totalProposalsCount ?? 0}</span>
            </p>
          </div>
        </AmountSec>
        <Tags>
          {profile.tags &&
            Object.keys(profile.tags).length > 0 &&
            Object.keys(profile.tags)
              .slice(0, 3)
              .map((data) => <div className="tag">{data}</div>)}
        </Tags>
        <div className="buttons">
          <button
            onClick={() => followUser(daoId, accountFollowsYou)}
            className={accountFollowsYou ? "following" : "follow"}
          >
            {accountFollowsYou ? "Following" : "Follow"}
          </button>
          <Widget
            src="astraplusplus.ndctools.near/widget/Layout.Modal"
            props={{
              toggleContainerProps: {
                className: "w-100",
              },
              toggle: (
                <div className="joinButton">
                  <button onClick={() => State.update({ toggle: true })}>
                    Ask To Join
                  </button>
                </div>
              ),
              content: (
                <div className="ndc-card p-4">
                  <Widget
                    src="nearui.near/widget/Input.Select"
                    props={{
                      label: "Role you want to join as",
                      options: policy.roles?.map((r) => {
                        return {
                          title: r.name,
                          value: r.name,
                        };
                      }),
                      onChange: (v) => State.update({ joinRole: v }),
                      value: state.joinRole,
                    }}
                  />
                  <div className="proposeButton">
                    <button
                      onClick={() =>
                        onAddUserProposal(context?.accountId, state.joinRole)
                      }
                    >
                      Propose To Join
                    </button>
                  </div>
                </div>
              ),
            }}
          />
        </div>
      </RightProfile>
      <MiddleContent>
        <>
          <Tabs>
            <TabsButton
              onClick={() => State.update({ selectedTab: "feed" })}
              selected={state.selectedTab === "feed"}
            >
              Social Feed
            </TabsButton>
            <TabsButton
              href={`#`}
              onClick={() => State.update({ selectedTab: "proposals" })}
              selected={state.selectedTab === "proposals"}
            >
              Proposals
            </TabsButton>
            <TabsButton
              href={`#`}
              onClick={() => State.update({ selectedTab: "nfts" })}
              selected={state.selectedTab === "nfts"}
            >
              NFTs
            </TabsButton>
            <TabsButton
              href={`#`}
              onClick={() => State.update({ selectedTab: "members" })}
              selected={state.selectedTab === "members"}
            >
              Members
            </TabsButton>
          </Tabs>
          {state.selectedTab === "feed" && (
            <>
              <Widget
                src="jgodwill.near/widget/CPlanet.MainPage.Feed"
                props={{ accounts }}
              />
              <p className="text-center">{daoId} has no post yet</p>
            </>
          )}
          {state.selectedTab === "members" && (
            <Widget
              src="bos.genadrop.near/widget/CPlanet.DAO.Members.Index"
              props={{ daoId }}
            />
          )}
          {state.selectedTab === "nfts" && (
            <Widget
              src="bos.genadrop.near/widget/CPlanet.DAO.ProfileNFTs"
              props={{ daoId }}
            />
          )}
          {state.selectedTab === "proposals" && (
            <Widget src="sking.near/widget/DAO.Proposals" props={{ daoId }} />
          )}
        </>
      </MiddleContent>
      <MembersGroup>
        <h1>Council Members </h1>
        {councilMembers ? (
          <div className="members">
            {councilMembers.map((data) => (
              <div>
                <Widget
                  src="agwaze.near/widget/CPlanet.DAO.Members.SideCard"
                  props={{
                    daoId: data,
                    userId: data,
                    update: props.update,
                    isGateway: props.isGateway,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div> No Council Members </div>
        )}
      </MembersGroup>
    </Contents>
  </Root>
);
