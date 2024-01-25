const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

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
const tabKeys = Object.keys(profile.feedTabs);
const tabValues = Object.values(profile.feedTabs);

// Combine keys and values into objects with titles from titleMap (fallback to key value)
tabKeys.forEach((key, index) => {
  pills.push({
    id: key,
    title:
      titleMap[key] ||
      tabValues[index] ||
      key.charAt(0).toUpperCase() + key.slice(1),
  });
});

const Nav = styled.div`
  .nav-pills {
    background: #fbfbfb;
    font-weight: 500;
    --bs-nav-pills-border-radius: 0;
    --bs-nav-link-color: #000;
    --bs-nav-pills-link-active-color: #000;
    --bs-nav-pills-link-active-bg: #fbfbfb;
    --bs-nav-link-padding-y: 0.75rem;
    border-bottom: 1px solid #eee;
    padding-top: 3px;
  }
  .nav-link.active {
    border-bottom: 3px solid #000;
    font-weight: 600;
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

const graph = Social.keys(`${accountId}/profile/feed/*`, "final");
if (graph !== null) {
  feedAccounts = Object.keys(graph[accountId].profile.feed || {});
  feedAccounts.push(context.accountId);
  console.log("Feed Accounts", feedAccounts);
} else {
  feedAccounts = [];
}

const hashtagGraph = Social.keys(
  `${accountId}/profile/discussion/data/*`,
  "final"
);

const [fetchedHashtags, setFetchedHashtags] = useState([]);
const [selectedHashtag, setSelectedHashtag] = useState(
  fetchedHashtags[0] ?? null
);
const fetchHashtags = () => {
  if (hashtagGraph !== null) {
    setFetchedHashtags(
      Object.keys(hashtagGraph[accountId].profile.discussion.data || {})
    );
  } else {
    setFetchedHashtags([]);
  }
};

accountId && fetchHashtags();
console.log("fetchedHashtags", fetchedHashtags[0]);

console.log("selectedHashtag", selectedHashtag);

// query GetNFTs {
//   mb_views_nft_metadata_unburned(
//     where: {nft_contract_id: {_eq: "nft.genadrop.near"}}
//   ) {
//     media
//     minter
//     title
//     minted_timestamp
//   }
// }

return (
  <>
    <Nav>
      <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        {pills &&
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
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <div className="col-lg-8 mx-auto">
          {description && (
            <Widget
              key="desc"
              loading=""
              src="mob.near/widget/MainPage.N.Post"
              props={{
                accountId,
                pinned: true,
                blockHeight: "now",
                content: {
                  text: description,
                },
              }}
            />
          )}
          <Widget
            key="feed"
            src="bos.genadrop.near/widget/CPlanet.MainPage.Feed"
            props={{ accounts: [...feedAccounts] }}
          />
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="pills-discussion"
        role="tabpanel"
        aria-labelledby="pills-discussion-tab"
      >
        <div className="col-lg-8 mx-auto">
          {profile.discussion.type === "hashtag" ? (
            <div>
              <div className="hashtags gap-2 my-3">
                {fetchedHashtags.map((hashtag) => (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedHashtag(hashtag)}
                  >
                    {`#${hashtag}`}
                  </button>
                ))}
              </div>
              {selectedHashtag && (
                <Widget
                  src="mob.near/widget/Hashtag.Feed"
                  props={{ hashtag: selectedHashtag }}
                />
              )}
            </div>
          ) : (
            <Widget
              key="discussion"
              src="bos.genadrop.near/widget/CPlanet.MainPage.Feed"
              props={{ accounts: [...discussionAccounts] }}
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
        {state.loadnfts && (
          <Widget src="mob.near/widget/N.YourNFTs" props={{ accountId }} />
        )}
      </div>
      <div
        className="tab-pane fade widget"
        id="pills-widget"
        role="tabpanel"
        aria-labelledby="pills-widget-tab"
      >
        {state.loadwidget && (
          <Widget src="mob.near/widget/LastWidgets" props={{ accountId }} />
        )}
      </div>
    </div>
  </>
);
