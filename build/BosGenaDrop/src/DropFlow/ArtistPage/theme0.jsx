const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !profile;

if (profile === null) {
  return "Loading";
}

const [nFTCount, setNFTCount] = useState(0);

const MiddleContent = styled.div`
  width: 900px;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

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
  & > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    position: absolute;
    bottom: 10px;
    right: 20px;
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
    font-weight: bold;
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

const Tags = styled.div`
  display: flex;
  gap: 7px;
  margin: 10px 0 10px 10px;
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

const AmountSec = styled.div`
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

const showEditButton = accountId && accountId === context.accountId;

console.log("edit? ", showEditButton);

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

const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numFollowing = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : null;
const numFollowers = followers ? Object.keys(followers || {}).length : null;

const fetchNFTCount = (account) => {
  const response = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query NFTCountQuery {
    nft_tokens_aggregate(where: {owner: {_eq: "${account}"}}) {
          aggregate {
            count
          }
        }
      }     
`,
    }),
  });
  let countData = response?.body?.data?.nft_tokens_aggregate;
  console.log("counData: ", countData);
  return countData;
};

if (accountId) {
  let nftCountNew = fetchNFTCount(accountId);
  setNFTCount(nftCountNew.aggregate.count);
}

console.log("nFTCount: ", nFTCount);

// {/* <Widget
//   src="bos.genadrop.near/widget/CPlanet.Profile.Large"
// //   props={{
// //     accountId,
// //     profile,
// //     link: true,
// //     fast,
// //     showEditButton: !props.profile,
// //   }}
// /> */}
const background = profile.backgroundImage
  ? `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU";
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
      <div style={{ height: "4rem" }}>
        {showEditButton && (
          <div>
            <Link
              className="btn btn-outline-secondary rounded-5"
              href={`/bos.genadrop.near/widget/DropFlow.CreatePage.Index?accountId=${accountId}`}
            >
              <i class="bi bi-arrow-up-right-circle"></i>
              Create Page
            </Link>
          </div>
        )}
        {showEditButton && (
          <div>
            <button
              className="btn btn-outline-secondary rounded-5"
              onClick={props.onChangeTheme}
            >
              Next Theme
              <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
        )}
      </div>
    </ImageSection>
    <Contents>
      <RightProfile>
        <h1 className="title">{profile.name ?? accountId}</h1>
        <span className="username">@{accountId ?? "creativedao.near"}</span>
        <p className="description">
          {/* Truncate the description if it's longer than 6 lines */}
          {profile.description.split("\n").length > 6 ? (
            <>
              {profile.description
                .split("\n")
                .slice(0, 6)
                .map((line) => (
                  <>
                    {line}
                    <br />
                  </>
                ))}
              <span style={{ color: "#b0b0b0" }}>...</span>
            </>
          ) : (
            profile.description
          )}
        </p>
        <AmountSec>
          <div className="text-center">
            <span>Follower{numFollowers !== 1 && "s"}</span>
            <p className="text-center">
              {numFollowers !== null ? (
                <span className="fw-bolder">{numFollowers}</span>
              ) : (
                "?"
              )}
            </p>
          </div>
          <div className="text-center">
            <span>Following</span>
            <p className="text-center">
              {numFollowing !== null ? (
                <span className="fw-bolder">{numFollowing}</span>
              ) : (
                "?"
              )}
            </p>
          </div>
          <div className="text-center">
            <span>Owned NFTs</span>
            <p className="text-center">{nFTCount ?? "0"}</p>
          </div>
          <div className="text-center">
            <span>Total Polls</span>
            <p className="text-center">{poLlsCount ?? "0"}</p>
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
            onClick={() => followUser(accountId, accountFollowsYou)}
            className={accountFollowsYou ? "following" : "follow"}
          >
            {accountFollowsYou ? "Following" : "Follow"}
          </button>
          <div style={{ minWidth: "12rem" }}>
            <Widget
              src="mob.near/widget/LinkTree"
              props={{ linktree: profile.linktree }}
            />
          </div>
        </div>
      </RightProfile>
      <MiddleContent>
        <Widget
          src="bos.genadrop.near/widget/CPlanet.ProfilePage.Tabs"
          props={{ accountId, profile }}
        />
      </MiddleContent>
    </Contents>
  </Root>
);
