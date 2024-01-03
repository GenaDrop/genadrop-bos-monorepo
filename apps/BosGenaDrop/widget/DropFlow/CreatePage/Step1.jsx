const { formState, errors, renderFooter } = props;
const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

let profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

State.init({
  profile,
});
const initialMetadata = profile ?? {};
const onChange = props.onChange;

const initialAnswers = {
  name: formState.name,
  soulBoundTokenIssuer: formState.soulBoundTokenIssuer,
};

State.init({
  answers: initialAnswers,
  initialMetadata,
  metadata: initialMetadata,
  reportedMetadata: initialMetadata,
  linktree: initialMetadata.linktree ?? {},
  image: initialMetadata.image,
  backgroundImage: initialMetadata.backgroundImage,
  screenshots: initialMetadata.screenshots ?? {},
});

const onValueChange = (key, value) => {
  State.update({
    answers: {
      ...state.answers,
      [key]: value,
    },
  });
};

const metadata = {
  name: options.name ? state.metadata.name : undefined,
  description: options.name ? state.metadata.description : undefined,
  linktree:
    options.linktree && Object.keys(state.linktree).length > 0
      ? state.linktree
      : undefined,
  image:
    options.image && state.image && Object.keys(state.image).length > 0
      ? state.image
      : undefined,
  backgroundImage:
    options.backgroundImage &&
    state.backgroundImage &&
    Object.keys(state.backgroundImage).length > 0
      ? state.backgroundImage
      : undefined,
  tags: options.tags ? state.metadata.tags : undefined,
  feed: options.feed ? state.metadata.feed : undefined,
  screenshots: options.screenshots ? state.metadata.screenshots : undefined,
};

if (
  onChange &&
  JSON.stringify(state.reportedMetadata) !== JSON.stringify(metadata)
) {
  State.update({
    reportedMetadata: metadata,
  });
  onChange(metadata);
}

const debounce = (func, wait) => {
  const pause = wait || 350;
  let timeout;

  return (args) => {
    const later = () => {
      clearTimeout(timeout);
      func(args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, pause);
  };
};
return (
  <div className="mt-4 ndc-card p-4">
    <div className="d-flex flex-column gap-4">
      <h2 className="h5 fw-bold">
        <span
          className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bolder h5 me-2"
          style={{
            width: "48px",
            height: "48px",
            border: "1px solid #82E299",
          }}
        >
          1
        </span>
        Customize your Feed
      </h2>

      <div className="mb-2 feed">
        <h4>Your Feed</h4>
        <div class="form-check ds-check">
          <input
            class="form-check-input rounded-circle"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={onChangeDisabled}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Display The Default Feed
          </label>
        </div>

        <h6>{options.feed.label ?? "Accounts To Display"}</h6>
        <Widget
          src="jgodwill.near/widget/PageFeedsEditor"
          props={{
            initialPageFeedsObject: metadata.feed,
            pageFeedPattern: options.feed.pageFeedPattern,
            placeholder:
              options.feed.placeholder ??
              "Enter the usernames to display on your feed e.g. mob.near, jodwill.near, agwaze.near, etc",
            setPageFeedsObject: (feed) => {
              state.metadata.feed = feed;
              State.update();
            },
            disabled: state.disabled,
          }}
        />
      </div>

      {/* <Widget
        src="nearui.near/widget/Input.ExperimentalText"
        props={{
          label: <>Accounts To Display</>,
          placeholder: "Enter the usernames to display on your feed",
          size: "md",
          onChange: (v) => onValueChange("soulBoundTokenIssuer", v),
          error: errors["soulBoundTokenIssuer"],
          inputProps: {
            name: "soulBoundTokenIssuer",
            defaultValue: state.answers.soulBoundTokenIssuer,
          },
        }}
      /> */}
    </div>

    {renderFooter(state.answers)}
  </div>
);
