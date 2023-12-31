const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const description = profile.description;

const pills = [
  { id: "posts", title: "Feed" },
  { id: "nfts", title: "Discussions" },
  { id: "nfts", title: "NFTs" },
  { id: "widget", title: "Polls" },
  { id: "widget", title: "Docs" },
  { id: "widget", title: "Portfolio" },
];

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
const accounts = [];

const graph = Social.keys(`${accountId}/profile/feed/*`, "final");
if (graph !== null) {
  accounts = Object.keys(graph[accountId].profile.feed || {});
  accounts.push(context.accountId);
  console.log("following", accounts);
} else {
  accounts = [];
}

return (
  <>
    <Nav>
      <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        {pills.map(({ id, title }, i) => (
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
        id="pills-posts"
        role="tabpanel"
        aria-labelledby="pills-posts-tab"
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
            props={{ accounts: [...accounts] }}
          />
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
