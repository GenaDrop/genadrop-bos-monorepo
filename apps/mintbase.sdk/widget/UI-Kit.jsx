const [display, setDisplay] = useState("MbActionText");
const [tab, setTab] = useState("preview");
const [mode, setMode] = useState("light");
const { css } = VM.require("test.near/widget/Theme");

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  .left-nav {
    text-align: left;
    background: #f6f9fc;
    /* border-radius: 1rem; */
    min-width: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    > .title {
      font-weight: 600;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: rgb(153, 153, 153);
      padding: 0.5rem 1rem;
    }
    > .item {
      padding: 0.5rem 1rem;
      font-size: 14px;
      cursor: pointer;
      transition: all 300ms ease-in-out;
      :hover {
        background: #1ea7fd;
        color: white;
      }
      &.active {
        background: #1ea7fd;
        color: white;
      }
    }
  }
  .view {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    .top-nav {
      padding: 1rem;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-right: auto;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
      margin-bottom: 2rem;
      div {
        font-weight: 500;
        border-bottom: 1px solid transparent;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        :hover {
          border-color: #1ea7fd;
          color: #1ea7fd;
        }
        &.active {
          border-color: #1ea7fd;
          color: #1ea7fd;
        }
      }
    }
  }
`;
const Theme = styled.div`
  ${css}
`;

const compoennts = {
  MbAction: {
    props: {
      state: "disabled",
      size: "big",
      children: <div>See Transaction</div>,
    },
  },
  MbActionText: {
    props: {
      // text, icons size
      size: "big",
      text: "https://mintbase.io",
      // text to copy
      copyText: "https://mintbase.io",
      // link icon, new tab
      iconTab: false,
      // copy icon
      iconCopy: false,
      link: "https://mintbase.io",
      modee: "dark",
    },
  },
  MbArrowMenu: {
    props: {
      isActive: false,
      title: "Explore",
    },
  },
  MbTooltip: {
    props: {
      text: "Tooltip text!",
      component: <span>Tooltip</span>,
      place: "right",
    },
  },
  MbLogo: { props: { src: "mintbase" } },
};

useEffect(() => {
  Storage.set("mode", mode);
}, [mode]);

return (
  <Theme>
    <Container>
      <div className="left-nav">
        <div className="title">Compoennets</div>
        {Object.keys(compoennts).map((key) => (
          <div
            className={`${key === display ? "active" : ""} item`}
            onClick={() => setDisplay(key)}
            key={key}
          >
            {key}
          </div>
        ))}
      </div>
      <div className="view">
        <div className="top-nav">
          <div
            onClick={() => setTab("preview")}
            className={tab === "preview" && "active"}
          >
            Preview
          </div>{" "}
          <div
            onClick={() => setTab("docs")}
            className={tab === "docs" && "active"}
          >
            Docs
          </div>{" "}
          |{" "}
          <div onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
            <Widget
              src="test.near/widget/MbIcon"
              props={{
                name: "moon",
                cutomStyle:
                  mode === "dark" &&
                  "border-bottom:1px solid #1ea7fd !important;",
                size: "22px",
              }}
            />
          </div>
        </div>
        <Widget
          src={"/*__@appAccount__*//widget/" + display}
          props={compoennts[display].props}
        />
      </div>
    </Container>
  </Theme>
);
