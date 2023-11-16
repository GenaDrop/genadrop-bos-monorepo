const daoId = props.daoId ?? "beat-dao.sputnik-dao.near";
const Root = styled.div`
  margin-bottom: 50px;
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
  width: 200px;
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
    line-height: 148%; /* 23.68px */
  }
  .description {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    margin-top: 7px;
    font-weight: 400;
    line-height: 148%; /* 23.68px */
  }
  .buttons {
    .follow {
      width: 90%;
      height: 32px;
      background: #000;
      color: white;
      margin-bottom: 10px;
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
      width: 48%;
    }
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
`;

State.init({
  selectedTab: props.tab || "feed",
});

const [councilMembers, setCouncilMembers] = useState({});

const Contents = styled.div`
  display: flex;
`;

const MiddleContent = styled.div`
  border-left: 1px solid #eceef0;
  width: 750px;
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
policy &&
  policy.roles.forEach((role) => {
    if (typeof role.kind.Group === "object") {
      members = members.concat(role.kind.Group);
    }
  });
members = [...new Set(members)];
// --

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
        <h1 className="title">{profile.name ?? "LOREM IPSUM DAO"}</h1>
        <span className="username">@{daoId ?? "lorem.ipsum.dono"}</span>
        <p className="description">
          {profile.description ??
            " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ualiquip ex ea commodo consequat."}
        </p>
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
        <Tags>
          {profile.tags &&
            Object.keys(profile.tags).length > 0 &&
            Object.keys(profile.tags)
              .slice(0, 3)
              .map((data) => <div className="tag">{data}</div>)}
        </Tags>
        <div className="buttons">
          <button className="follow">Follow</button>
          <div className="joinButton">
            <button>Ask To Join</button>
            <button>Share</button>
          </div>
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
              src="agwaze.near/widget/CPlanet.DAO.Members.Index"
              props={{ daoId }}
            />
          )}
          {state.selectedTab === "nfts" && (
            <Widget
              src="agwaze.near/widget/CPlanet.DAO.ProfileNFTs"
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
                  props={{ daoId: data, userId: data }}
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
