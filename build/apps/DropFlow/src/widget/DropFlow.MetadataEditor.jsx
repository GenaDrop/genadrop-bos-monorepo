const initialMetadata = props.initialMetadata ?? {};
const onChange = props.onChange;
const options = props.options;
State.init({
  initialMetadata,
  metadata: initialMetadata,
  reportedMetadata: initialMetadata,
  linktree: initialMetadata.linktree ?? {},
  image: initialMetadata.image,
  backgroundImage: initialMetadata.backgroundImage,
  screenshots: initialMetadata.screenshots ?? {},
  disabled: false,
});
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
const onNameChange = debounce((e) => {
  State.update({
    metadata: {
      ...state.metadata,
      name: e.target.value,
    },
  });
});
const onDescriptionChange = debounce((e) => {
  State.update({
    metadata: {
      ...state.metadata,
      description: e.target.value,
    },
  });
});
const onLinkTreeChange = debounce((e) => {
  State.update({
    linktree: {
      ...state.linktree,
      [e.target.id]: e.target.value,
    },
  });
});
function onChangeDisabled() {
  State.update({
    disabled: !state.disabled,
  });
  console.log(state.disabled);
}
return (
  <>
    {options.name && (
      <div className="mb-2">
        <h4>{options.name.label ?? "Name"}</h4>
        <input
          type="text"
          defaultValue={state.metadata.name}
          onChange={onNameChange}
        />
      </div>
    )}
    {options.image && (
      <div className="mb-2">
        <h4>{options.image.label ?? "Image"}</h4>
        <Widget
          src="jgodwill.near/widget/ImageEditorTabs"
          props={{
            image: state.image,
            onChange: (image) => State.update({ image }),
          }}
        />
      </div>
    )}
    {options.backgroundImage && (
      <div className="mb-2">
        <h4>{options.backgroundImage.label ?? "Background image"}</h4>
        <Widget
          src="jgodwill.near/widget/ImageEditorTabs"
          props={{
            image: state.backgroundImage,
            onChange: (backgroundImage) => State.update({ backgroundImage }),
            debounce,
          }}
        />
      </div>
    )}
    {options.description && (
      <div className="mb-2">
        <h4>{options.description.label ?? "Description"}</h4>
        <span className="text-secondary"> (supports markdown)</span>
        <textarea
          className="form-control"
          rows={5}
          defaultValue={state.metadata.description}
          onChange={onDescriptionChange}
        />
      </div>
    )}
    {options.tags && (
      <div className="mb-2">
        <h4>{options.tags.label ?? "Tags"}</h4>
        <Widget
          src="mob.near/widget/TagsEditor"
          props={{
            initialTagsObject: metadata.tags,
            tagsPattern: options.tags.pattern,
            placeholder:
              options.tags.placeholder ??
              "rust, engineer, artist, humanguild, nft, learner, founder",
            setTagsObject: (tags) => {
              state.metadata.tags = tags;
              State.update();
            },
          }}
        />
      </div>
    )}
    {options.linktree &&
      (options.linktree.links ?? []).map((link) => (
        <div className="mb-2">
          {link.label}
          <div className="input-group">
            <span className="input-group-text">{link.prefix}</span>
            <input
              type="text"
              id={link.name}
              defaultValue={state.linktree[link.name]}
              onChange={onLinkTreeChange}
            />
          </div>
        </div>
      ))}
    {options.feed && (
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
    )}
  </>
);
