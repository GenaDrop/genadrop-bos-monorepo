const accountId = props.accountId ?? context.accountId;
const profile = Social.getr(`${accountId}/profile`);
State.init({
  profile,
});
const onChange = (profile) => State.update({ profile });
return (
  <>
    <div className="row">
      <button className="btn btn-primary" onClick={props.nextTabHandler}>
        Go Back
      </button>
      <div className="col-lg-10">
        <div>
          <h4>Edit profile of @{accountId}</h4>
          <p className="subtitle">
            Welcome to Drop Flow. Artist portfolio page to show cases your work
            with customize themes on BOS.
          </p>
        </div>
        <div className="mb-2">
          <Widget
            src="bos.genadrop.near/widget/DropFlow.MetadataEditor"
            props={{
              initialMetadata: profile,
              onChange: onChange,
              options: {
                name: { label: "Name" },
                image: { label: "Profile picture" },
                backgroundImage: { label: "Background image" },
                description: { label: "Add Bio" },
                tags: {
                  label: "Tags",
                  tagsPattern: "*/profile/tags/*",
                  placeholder:
                    "rust, engineer, artist, humanguild, nft, learner, founder",
                },
                linktree: {
                  links: [
                    {
                      label: "Twitter",
                      prefix: "https://twitter.com/",
                      name: "twitter",
                    },
                    {
                      label: "Github",
                      prefix: "https://github.com/",
                      name: "github",
                    },
                    {
                      label: "Telegram",
                      prefix: "https://t.me/",
                      name: "telegram",
                    },
                    {
                      label: "Website",
                      prefix: "https://",
                      name: "website",
                    },
                  ],
                },
              },
            }}
          />
        </div>
      </div>
    </div>
    <div className="mb-2">
      <CommitButton data={{ profile: state.profile }}>
        Save profile
      </CommitButton>
      <Link
        className="btn btn-outline-primary ms-2"
        href={`/bos.genadrop.near/widget/DropFlow.ArtistPage.Index?accountId=${accountId}`}
      >
        View profile
      </Link>
    </div>
  </>
);
