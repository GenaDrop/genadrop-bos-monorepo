const accountId = context.accountId;
const pageOwnerId = props.accountId ?? accountId;
if (!pageOwnerId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${pageOwnerId}/profile`);

if (profile === null) {
  return "Loading";
}

const description = profile.description;

// Create a separate titleMap for dynamic linking
const titleMap = {
  feed: "Feed",
  nfts: "NFTs",
  discussions: "Discussions",
  polls: "Polls",
  docs: "Docs",
  portfolio: "Portfolio",
};

const pills = [];

// Extract keys and values from feedTabs
const tabKeys = profile.feedTabs && Object.keys(profile.feedTabs);
const tabValues = profile.feedTabs && Object.values(profile.feedTabs);

// Combine keys and values into objects with titles from titleMap (fallback to key value)
tabKeys &&
  tabKeys.forEach((key, index) => {
    pills.push({
      id: key,
      title:
        titleMap[key] ||
        tabValues[index] ||
        key.charAt(0).toUpperCase() + key.slice(1),
    });
  });

console.log("pills", pills);
const Nav = styled.div`
  .nav-pills {
    background: #fbfbfb;
    font-weight: 400;
    --bs-nav-pills-border-radius: 0;
    --bs-nav-link-color: #b0b0b0;
    --bs-nav-pills-link-active-color: #000;
    --bs-nav-pills-link-active-bg: #fbfbfb;
    --bs-nav-link-padding-y: 0.75rem;
    border-bottom: 1px solid #eee;
    padding-top: 3px;
  }
  .nav-link.active {
    border-bottom: 3px solid #000;
    font-weight: 500;
  }

  .nav-item:not(:has(> .disabled)):hover {
    background: rgba(0, 0, 0, 0.15);
    * {
      color: #000 !important;
    }
  }

  margin: 0 -12px;
`;
const feedAccounts = [];

const graph = Social.keys(`${pageOwnerId}/profile/feed/*`, "final");
if (graph !== null) {
  feedAccounts = Object.keys(graph[pageOwnerId].profile.feed || {});
  feedAccounts.push(context.pageOwnerId);
  console.log("Feed Accounts", feedAccounts);
} else {
  feedAccounts = [];
}

const hashtagGraph = Social.keys(
  `${pageOwnerId}/profile/discussion/data/*`,
  "final"
);

const [fetchedHashtags, setFetchedHashtags] = useState([]);
const [selectedHashtag, setSelectedHashtag] = useState(
  fetchedHashtags[0] ?? null
);
const fetchHashtags = () => {
  if (hashtagGraph !== null) {
    setFetchedHashtags(
      Object.keys(hashtagGraph[pageOwnerId].profile.discussion.data || {})
    );
  } else {
    setFetchedHashtags([]);
  }
};

pageOwnerId && fetchHashtags();
console.log("fetchedHashtags", fetchedHashtags[0]);

console.log("selectedHashtag", selectedHashtag);

const communityAddress = JSON.parse(profile.discussion.community);

console.log("community: ", profile.discussion.community);

const nftType = profile.nfts.type;
const nftAddresses = profile.nfts && JSON.parse(profile.nfts.content);
const portfolio = profile.portfolio;

const portfolioIds = portfolio && Object.keys(portfolio);

const currentTheme = Number(profile.theme) ?? 0;

// if (portfolioIds) {
//   for (let i = 0; i < portfolioIds.length; i++) {
//     const id = portfolioIds[i];
//     const item = profile.portfolio[id];

//     console.log("Image url: ", item.image.cid);
//   }
// }

// {description && (
//   <Widget
//     key="desc"
//     loading=""
//     src="mob.near/widget/MainPage.N.Post"
//     props={{
//       accountId: pageOwnerId,
//       pinned: true,
//       blockHeight: "now",
//       content: {
//         text: description,
//       },
//     }}
//   />
// )}

console.log("isOwner? ", accountId === pageOwnerId);
console.log("owner", pageOwnerId);
console.log("feedTabs", profile.feedTabs);
return (
  <>
    <Nav>
      <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        {profile.feedTabs &&
          pills &&
          pills.map(({ id, title }, i) => (
            <li className="nav-item" role="presentation" key={i}>
              <button
                className={`nav-link ${i === 0 ? "active" : ""}`}
                id={`pills-${id}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#pills-${id}`}
                type="button"
                role="tab"
                aria-controls={`pills-${id}`}
                aria-selected={i === 0}
                onClick={() => {
                  const key = `load${id}`;
                  !state[key] && State.update({ [key]: true });
                }}
              >
                {title}
              </button>
            </li>
          ))}
      </ul>
    </Nav>
    {!profile.feedTabs ? (
      <div className="w-100 mx-auto text-center">
        <h4>Nothing to show yet😿</h4>
        {accountId === pageOwnerId && (
          <p>
            Don't have Page?{" "}
            <Link
              className="btn btn-outline-secondary rounded-5"
              href={`/bos.genadrop.near/widget/DropFlow.CreatePage.Index?pageOwnerId=${pageOwnerId}`}
            >
              Create One
            </Link>
          </p>
        )}
      </div>
    ) : (
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-feed"
          role="tabpanel"
          aria-labelledby="pills-feed-tab"
        >
          <div className="col-lg-8 mx-auto">
            <Widget
              key="feed"
              src="bos.genadrop.near/widget/CPlanet.MainPage.Feed"
              props={{ accounts: [...feedAccounts] }}
            />
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-discussions"
          role="tabpanel"
          aria-labelledby="pills-discussions-tab"
        >
          <div className="col-lg-12 mx-auto">
            {profile.discussion.type === "hashtag" && (
              <div>
                <div className="hashtags gap-2 my-3">
                  {fetchedHashtags.map((hashtag) => (
                    <button
                      className={`btn btn-outline-primary ${
                        currentTheme !== 2 && "rounded-5"
                      } btn-sm`}
                      onClick={() => setSelectedHashtag(hashtag)}
                    >
                      {`#${hashtag}`}
                    </button>
                  ))}
                </div>
                {selectedHashtag && (
                  <Widget
                    src="jgodwill.near/widget/Hashtag.Feed"
                    props={{ hashtag: selectedHashtag }}
                  />
                )}
              </div>
            )}
            {profile.discussion.type === "nftcommunity" && (
              <Widget
                key="discussion"
                src="bos.genadrop.near/widget/CPlanet.Group.Index"
                props={{ groupId: communityAddress[0] }}
              />
            )}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-nfts"
          role="tabpanel"
          aria-labelledby="pills-nfts-tab"
        >
          {/* {state.loadnfts && (
            <Widget src="mob.near/widget/N.YourNFTs" props={{ pageOwnerId }} />
          )} */}
          {nftType === "collection" && (
            <Widget
              src="bos.genadrop.near/widget/DropFlow.CollectionNFTs"
              props={{ contractId: nftAddresses[0] }}
            />
          )}
          {nftType === "single" && (
            // <Widget
            //   src="bos.genadrop.near/widget/DropFlow.AccountNFTs"
            //   props={{ accountId: nftAddresses[0] }}
            // />
            <div className="mt-2 row g-4">
              {nftAddresses.map((address) => (
                <div className="col-md">
                  <Widget
                    src="jgodwill.near/widget/DropFlow.SingleNFT"
                    props={{
                      contractId: address.contractId,
                      tokenId: address.tokenId,
                      chainState: address.chain?.toLowerCase(),
                    }}
                  />
                </div>
              ))}
              {/* <pre>{JSON.stringify(nftAddresses, null, 2)}</pre> */}
            </div>
          )}
        </div>
        <div
          className="tab-pane fade"
          id="pills-portfolio"
          role="tabpanel"
          aria-labelledby="pills-portfolio-tab"
        >
          {portfolio &&
            Object.keys(portfolio).map((item) => (
              <div className="d-flex align-items-center gap-3 mb-3" key={item}>
                <img
                  src={`https://ipfs.near.social/ipfs/${portfolio[item].image.cid}`}
                  // className="col-sm"
                  width="100px"
                  height="100px"
                  style={{ objectFit: "cover" }}
                  alt={portfolio[item].title}
                />
                <div className="col-sm">
                  <h5 className="card-title">{portfolio[item].title}</h5>
                  <Markdown text={portfolio[item].text} />
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <a href={"#"} className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    )}
  </>
);
