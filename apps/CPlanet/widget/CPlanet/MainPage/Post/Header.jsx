const accountId = props.accountId;
const blockHeight = props.blockHeight;
const postType = props.postType ?? "post";
const link = props.link;
const hasImageInPost = props.hasImageInPost;
const nftMint = props.nftMint;

return (
  <div className="d-flex flex-row align-items-center">
    <div className="flex-grow-1 text-truncate">
      <a
        className="text-dark text-decoration-none text-truncate"
        href={`/${config_account}/widget/DropFlow.ArtistPage?accountId=${accountId}`}
      >
        <Widget
          src="jgodwill.near/widget/ProfileLine"
          props={{ accountId, tooltip: true }}
        />
      </a>
    </div>
    <span className="text-nowrap text-muted">
      <small>
        {blockHeight === "now" ? (
          "now"
        ) : (
          <a className="text-muted" href={link}>
            <Widget src="${alias_mob}/widget/TimeAgo" props={{ blockHeight }} />
          </a>
        )}
      </small>
      {blockHeight !== "now" && (
        <span>
          <a
            href="javascript:void"
            className="link-secondary ms-2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fs-6 bi bi-three-dots" />
          </a>
          <ul className="dropdown-menu">
            <li className="dropdown-item">
              <a
                className="link-dark text-decoration-none"
                href={`${link}&raw=true`}
              >
                <i className="bi bi-filetype-raw" /> View raw markdown source
              </a>
            </li>
            {hasImageInPost && (
              <li className="dropdown-item">
                <a className="link-dark text-decoration-none" onClick={nftMint}>
                  <i className="bi bi-gift" /> Send This Post to Author as NFT
                </a>
              </li>
            )}
            <li>
              <Widget
                src="${alias_mob}/widget/MainPage.Common.HideAccount"
                props={{ accountId }}
              />
            </li>
            {props.flagItem && (
              <li>
                <Widget
                  src="${alias_mob}/widget/MainPage.Common.FlagContent"
                  props={{
                    item: props.flagItem,
                    label: `Flag ${postType} for moderation`,
                  }}
                />
              </li>
            )}
          </ul>
        </span>
      )}
    </span>
  </div>
);
