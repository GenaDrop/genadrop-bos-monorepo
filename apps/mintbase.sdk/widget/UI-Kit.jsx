// const [css, setCSS] = useState("");

const { css } = VM.require("test.near/widget/Theme");

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  .left-nav {
    padding: 1rem 2rem;
    background: #bbbbbb;
    border-radius: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .view {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;
const Theme = styled.div`
  ${css}
`;

return (
  <Theme>
    <Container>
      {/* <Widget
        src="test.near/widget/Theme"
        props={{
          setTheme: (css) => setCSS(css),
        }}
      /> */}
      <div className="left-nav">
        <div>Action</div>
      </div>
      <div className="view">
        {/* <Widget
          src="test.near/widget/MbAction"
          props={{
            state: "disabled",
            size: "big",
            children: <div>See Transaction</div>,
          }}
        /> */}
        <Widget
          src="test.near/widget/MbActionText"
          props={{
            size: "big",
            text: "https://mintbase.io",
            // text to copy
            copyText: "https://mintbase.io",
            // link icon
            iconTab: false,
            // copy icon
            iconCopy: false,
            link: "https://mintbase.io",
          }}
        />
      </div>
    </Container>
  </Theme>
);
