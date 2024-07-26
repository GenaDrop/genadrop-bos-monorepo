const { Header } = VM.require("${config_account}/widget/components.Header") || {
  Header: () => <></>,
};

const isDarkModeOn = props.isDarkModeOn;

const { Post } = VM.require("${config_account}/widget/components.Index") || {
  Post: () => <></>,
};

const MarkdownContainer = styled.div`
  max-width: 888px;
  padding: 0 55px 55px 55px;
  background: var(--bg-1, ${isDarkModeOn ? "#000" : "#fff"});
  border-radius: 23px;
  border: 1px solid #ccc;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span,
  li,
  ul,
  ol,
  p {
    color: var(--text-color, ${isDarkModeOn ? "#fff" : "#000"}) !important;
    font-family: "Inter", sans-serif !important;
    font-weight: 500;
  }

  pre {
    margin: 1rem 0;

    padding: 1rem;
    background: ${isDarkModeOn ? "#2d2d2d" : "#b0b0b0"};
    border-radius: 1rem;
  }
  pre div {
    border-radius: 1rem;
    padding: 0 10px;
    background: ${isDarkModeOn ? "#22242b" : "#ccc"} !important;
    scrollbar-color: #fe5051 #fff;

    scrollbar-width: thin;
  }

  code {
    background: var(--bg-2, #22242b);
    color: var(--text-color, ${isDarkModeOn ? "#fff" : "#000"}) !important;
    padding: 0 10px;
    font-family: monospace !important;
    border-radius: 1rem !important;
  }

  h1 {
    padding: 1rem 0;
    font-weight: 800;
  }

  h2 {
    padding: 0.5rem 0;
    font-weight: 700;
  }

  h3 {
    padding: 0.25rem 0;
    font-weight: 600;
  }

  h4,
  h5,
  h6 {
    font-weight: 500;
  }

  p,
  ul,
  li {
    color: #000;
    /* Body/14px */
    font-family: "Inter", sans-serif !important;
    font-style: normal;
    font-weight: 400;
    line-height: 170%;
  }

  @media screen and (max-width: 768px) {
    padding: 40px;
    border-radius: 10px;
  }
`;

function MarkdownView(props) {
  const content = fetch(`${props.path}`);
  if (content === null) return "";
  console.log(content);
  return (
    <MarkdownContainer>
      <Markdown text={content.body} />
    </MarkdownContainer>
  );
}

const mdPath = props.mdPath;
const postAccountId = props.postAccountId;

if (mdPath && !postAccountId) {
  return (
    <div>
      {/* <Header>{props.feedName}</Header> */}
      <MarkdownView path={mdPath} />
    </div>
  );
}

if (!mdPath && postAccountId) {
  return (
    <div>
      {/* <Header>{props.feedName}</Header> */}

      <Post
        accountId={postAccountId}
        blockHeight={props.postBlockHeight}
        noBorder={true}
      />
    </div>
  );
}

return (
  <div>
    {/* <Header>{props.feedName}</Header> */}
    <p>No mdPath or post accountId configured</p>
  </div>
);
