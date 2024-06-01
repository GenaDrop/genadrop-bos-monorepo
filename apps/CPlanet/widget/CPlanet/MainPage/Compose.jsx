if (!context.accountId) {
  return "";
}
console.log("content here", state.content);
const indexKey = props.indexKey ?? "main";
const draftKey = props.indexKey ?? "draft";
const draft = Storage.privateGet(draftKey);
const groupId = props.groupId;

if (draft === null) {
  return "";
}

const [initialText] = useState(draft);

const composeData = () => {
  const data = {
    post: {
      main: JSON.stringify(Object.assign({ groupId }, state.content)),
    },
    index: {
      post: JSON.stringify({
        key: indexKey,
        value: {
          type: "md",
        },
      }),
    },
  };

  const item = {
    type: "social",
    path: `${context.accountId}/post/main`,
  };

  const notifications = state.extractMentionNotifications(
    state.content.text,
    item
  );

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  const hashtags = state.extractHashtags(state.content.text);

  if (hashtags.length) {
    data.index.hashtag = JSON.stringify(
      hashtags.map((hashtag) => ({
        key: hashtag,
        value: item,
      }))
    );
  }

  return data;
};

State.init({
  onChange: ({ content, isChecked }) => {
    State.update({ content, isChecked });
    Storage.privateSet(draftKey, content.text || "");
  },
});

const Main = styled.div`
  * {
    font-family: Helvetica Neue;
  }
  .normal_input::placeholder {
    color: #b0b0b0;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
  }
`;

return (
  <Main>
    <div style={{ margin: "0 -12px" }}>
      <Widget
        src="jgodwill.near/widget/CPlanet.MainPage.Common.Compose"
        props={{
          placeholder: "What's happening?",
          initialText,
          onChange: state.onChange,
          onHelper: ({ extractMentionNotifications, extractHashtags }) => {
            State.update({ extractMentionNotifications, extractHashtags });
          },
          composeButton: (onCompose) => (
            <CommitButton
              disabled={!state.content.text}
              force
              className="btn btn-dark rounded-5 mx-3"
              data={composeData}
              onCommit={() => {
                onCompose();
              }}
            >
              Post Now
            </CommitButton>
          ),
        }}
      />
    </div>
    {(state.content.text || state.isChecked) && (
      <div className="mt-3">
        <Widget
          src="${config_account}/widget/CPlanet.MainPage.Post.Index"
          props={{
            accountId: context.accountId,
            content: state.content,
            blockHeight: "now",
          }}
        />
      </div>
    )}
  </Main>
);
