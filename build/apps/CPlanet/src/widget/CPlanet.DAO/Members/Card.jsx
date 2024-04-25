const daoId = props.daoId ?? "dao.near";
const Root = styled.div`
  width: 296px;
  height: 512px;
  border-radius: 8px;
  border: 1px solid #efefef;
  background: #fff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  .topImage {
    margin-bottom: 8px;
    img {
      width: 100%;
      height: 64px;
    }
  }
  .profile {
    padding: 8px;
    display: flex;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
      margin-right: 10px;
      border-radius: 50%;
    }
    h1 {
      color: #000;
      font-family: Helvetica Neue;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%; /* 19.2px */
      margin-bottom: 0;
    }
    span {
      overflow: hidden;
      color: #b0b0b0;
      text-align: justify;
      text-overflow: ellipsis;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%; /* 14.4px */
    }
  }
  .desc {
    padding: 6px 16px;
    color: #000;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    height: 100px;
    line-height: 148%; /* 23.68px */
  }
  .follow,
  .following {
    display: flex;
    width: 264px;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: white;
    border-radius: 0;
    transition: 0.3s ease-in-out;
    margin-left: 16px;
  }
  .following {
    cursor: not-allowed;
  }
  .follow {
    background: black;
    color: white;
    border-color: black;
  }
  .following,
  .follow:hover {
    background: white;
    color: black;
    border-color: black;
  }
`;
const MemberStat = styled.div`
  .date {
    padding: 7px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      overflow: hidden;
      color: #000;
      text-overflow: ellipsis;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 148%; /* 17.76px */
      text-transform: uppercase;
      margin-bottom: 0;
    }
    span {
      overflow: hidden;
      color: #000;
      text-overflow: ellipsis;
      font-family: Helvetica Neue;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
    }
  }
  .groups {
    padding: 8px 16px;
    h1 {
      overflow: hidden;
      color: #000;
      text-overflow: ellipsis;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 148%; /* 17.76px */
      text-transform: uppercase;
    }
    .tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 8px;
      p {
        border-radius: 100px;
        border: 1px solid #4498e0;
        background: rgba(68, 152, 224, 0.1);
        color: #4498e0;
        font-family: Helvetica Neue;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%; /* 14.4px */
        padding: 5px 8px;
        text-transform: capitalize;
      }
    }
  }
  .memberStat {
    padding: 0 16px;
    h1 {
      overflow: hidden;
      color: #000;
      text-overflow: ellipsis;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 148%; /* 17.76px */
      text-transform: uppercase;
      margin-bottom: 0;
    }
    h5 {
      color: #b0b0b0;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
    }
  }
`;
const profile = Social.get(`${daoId}/profile/**`, "final");
function makeAccountIdShorter(accountId, shortenLength) {
  if (accountId.length > shortenLength) {
    return accountId.slice(0, shortenLength) + "...";
  }
  return accountId;
}
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
console.log(props?.tags);
return (
  <Root>
    <div className="topImage">
      <img
        src={
          profile.backgroundImage
            ? `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
        }
        alt=""
      />
    </div>
    <div className="profile">
      <img
        src={
          profile.image
            ? `https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
        }
      />
      <div className="names">
        <h1>{makeAccountIdShorter(profile.name ?? daoId, 19)}</h1>
        <span>
          @{makeAccountIdShorter(daoId) ?? "@og-sbt.sputnik-dao.near"}
        </span>
      </div>
    </div>
    <div className="desc">
      {profile.description
        ? profile.description?.length > 90
          ? `${profile.description.substring(0, 90)}...`
          : profile.description
        : "No Description"}
    </div>
    <MemberStat>
      <div className="date">
        <div>
          <p>DAO Member Since</p>
          <span>{props.joined ?? "N/A"}</span>
        </div>
        <div>
          <p>Joined CPlanet</p>
          <span>N/A</span>
        </div>
      </div>
      <div className="groups">
        <h1>Groups</h1>
        <div className="tags">
          {props?.tags ? (
            Array.isArray(props.tags) ? (
              props.tags.map((data) => (
                <p key={data} className="tag">
                  {data}
                </p>
              ))
            ) : (
              <p key={props.tags} className="tag">
                {props.tags}
              </p>
            )
          ) : (
            <p className="tag">Admin</p>
          )}
        </div>
      </div>
      <div className="memberStat">
        <h1>Member Stats</h1>
        <div className="date">
          <div>
            <p>{props.totalVotes ?? "0"}</p>
            <h5>Votes Casted</h5>
          </div>
          <div>
            <p>{props.proposal ?? "0"}</p>
            <h5>Proposal Accepted</h5>
          </div>
        </div>
      </div>
    </MemberStat>
    <button
      disabled={props.isFollowing}
      onClick={() => followUser(daoId, props.isFollowing)}
      className={props.isFollowing ? "following" : "follow"}
    >
      {props.isFollowing ? "Following" : "Follow"}
    </button>
  </Root>
);
