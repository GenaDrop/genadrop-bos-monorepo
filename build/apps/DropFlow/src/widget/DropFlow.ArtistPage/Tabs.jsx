const accountId = context.accountId;
const pageOwnerId = props.accountId ?? accountId;
const widgetOwner = "jgodwill.near";
const isLoggedIn = props.isLoggedIn ?? context.accountId ? true : false;
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
const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  justify-content: center;
  h1 {
    font-size: 32px;
    font-weight: 600;
  }
  span {
    color: #b0b0b0;
    font-size: 14px;
  }
`;
const feedAccounts = [];
const graph = Social.keys(`${pageOwnerId}/profile/feed/*`, "final");
console.log("Graph", Object.keys(graph[pageOwnerId].profile.feed || {}));
if (graph !== null) {
  feedAccounts = Object.keys(graph[pageOwnerId].profile.feed || {});
  if (feedAccounts.length > 0) {
    feedAccounts.push(context.pageOwnerId);
  }
}
console.log("Feed Accounts", feedAccounts);
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
const portfolio = profile.folio;
const currentTheme = Number(profile.theme) ?? 0;
const getFirstSBTToken = () => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${context.accountId}`,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};
const hasSBTToken = getFirstSBTToken() !== undefined;
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
      <Loading className="w-100 mx-auto text-center">
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
      </Loading>
    ) : (
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-feed"
          role="tabpanel"
          aria-labelledby="pills-feed-tab"
        >
          <div className="col-lg-8 mx-auto">
            {feedAccounts.length > 0 ? (
              <Widget
                key="feed"
                src="bos.genadrop.near/widget/CPlanet.MainPage.Feed"
                props={{ accounts: [...feedAccounts] }}
              />
            ) : (
              <Widget
                key="feed"
                src="bos.genadrop.near/widget/CPlanet.MainPage.Feed"
              />
            )}
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
                {selectedHashtag ? (
                  <Widget
                    src="jgodwill.near/widget/Hashtag.Feed"
                    props={{ hashtag: selectedHashtag }}
                  />
                ) : (
                  <Loading>
                    <h1>Click a tag above ☝🏾</h1>
                    <span>
                      click a tag button above to view discussions based on it
                    </span>
                  </Loading>
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
              props={{ contractId: nftAddresses[0], profile }}
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
          id="pills-polls"
          role="tabpanel"
          aria-labelledby="pills-polls-tab"
        >
          <div className="section polls">
            <div className="polls-main">
              <div className="polls-tab-main">
                <div className="attach-nft-buttons d-flex align-items-center gap-2">
                  <div className="p-2 ms-auto">
                    <p
                      style={{
                        margin: "0",
                        fontWeight: "bold",
                        fontSize: "15px",
                        color: hasSBTToken ? "#239F28" : "#DD5E56",
                      }}
                    >
                      {!isLoggedIn
                        ? "Sign In To Use EasyPoll"
                        : hasSBTToken
                        ? "Verified Human"
                        : "Non-Verified Human"}
                    </p>
                  </div>
                </div>
                <div className="mb-2 feed">
                  <h4>My Polls</h4>
                </div>
                {hasSBTToken && (
                  <Widget
                    src={`${widgetOwner}/widget/EasyPoll.MyPolls`}
                    props={{
                      indexVersion,
                      blackList,
                      tabs,
                      whitelist,
                      widgetOwner,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-portfolio"
          role="tabpanel"
          aria-labelledby="pills-portfolio-tab"
        >
          {portfolio && (
            <div className="d-flex flex-column gap-2 mt-4">
              {Object.keys(portfolio).map((item) => {
                const portfolioEntry = JSON.parse(portfolio[item]);
                const imagUrl = portfolioEntry.image.cid
                  ? `https://ipfs.near.social/ipfs/${portfolioEntry.image.cid}`
                  : `https://wallpapercave.com/wp/wp3589909.jpg`;
                const itemText = portfolioEntry.text;
                return (
                  portfolio[item] && (
                    <div
                      className="d-flex align-items-center gap-3 mb-3 entry"
                      key={item}
                    >
                      <div
                        className="folioImage rounded h-100"
                        style={{ overflow: "hidden" }}
                      >
                        <img
                          src={imagUrl}
                          // className="col-sm"
                          width="64px"
                          height="64px"
                          style={{ objectFit: "cover" }}
                          alt={portfolioEntry.title}
                        />
                      </div>
                      <div className="col-sm" style={{ flex: "1" }}>
                        <h5 className="card-title">{portfolioEntry.title}</h5>
                        <div
                          className="md_txt"
                          style={{
                            maxHeight: `${2 * 1.2}em`,
                            overflow: "hidden",
                          }}
                        >
                          <Markdown text={portfolioEntry.text} />
                        </div>
                      </div>
                      <div className="date_created">
                        <small>
                          {new Date(
                            portfolioEntry.date_created
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </small>
                      </div>
                      <div
                        className="d-flex justify-content-end align-items-center"
                        style={{ flex: "0.33" }}
                      >
                        <button className="btn btn-primary">More</button>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          )}
        </div>
      </div>
    )}
  </>
);
