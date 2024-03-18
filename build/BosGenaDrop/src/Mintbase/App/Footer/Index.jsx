const accountId = props.accountId ?? "bos.genadrop.near";

const { mode, setMode } = props;

const { MbFooterRoutes, getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);

const Footer = styled.div`
  background: ${mode === "light" ? "#fff" : "#1e2030"};
  padding: 20px;
  padding-top: 48px;
  margin: 30px 0;
  .footerLinks {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    @media (max-width: 600px) {
      flex-direction: column;
    }
  }
  .left {
    .icon {
      img {
        width: 40%;
        @media (max-width: 500px) {
          width: 40%;
        }
      }
      margin-bottom: 40px;
    }
    .iconLinks {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      a {
        text-decoration: none;
        border: 1px solid #b0b0b0;
        padding: 5px;
        border-radius: 4px;
        height: max-content;
      }
    }
  }

  .right {
    display: flex;
    width: 60%;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 600px) {
      margin-top: 40px;
      width: 100%;
    }
    .section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      h2 {
        ${getInputLabelFontType("big")}
        margin-bottom: 20px;
      }
      .list {
        align-self: flex-start;
        display: flex;
        margin-bottom: 15px;
      }
      @media (max-width: 600px) {
        margin-top: 20px;
      }
    }
  }
  .bottom {
    .about {
      display: flex;
      justify-content: space-between;
      border-top: 0.1px solid #b0b0b0;
      margin: 40px 0;
      padding: 20px;
      p {
        color: ${mode === "dark" ? "#a0c8c3" : ""};
        ${getInputLabelFontType("medium")};
      }
    }
  }
`;

const iconLinks = [
  { route: "https://twitter.com/mintbase", name: "twitter" },
  { route: "https://www.instagram.com/mintbase_", name: "instagram" },
  { route: "https://mintbase.xyz/telegram", name: "telegram" },
  { route: "https://www.linkedin.com/company/mintbase", name: "linkedin" },
  { route: "https://medium.com/mintbase", name: "medium" },
  { route: "https://mintbase.xyz/discord", name: "discord" },
  { route: "https://github.com/mintbase", name: "github" },
  { route: "https://www.youtube.com/@mintbase", name: "youtube" },
];

return (
  <Footer>
    <div className="footerLinks">
      <div className="left">
        <div className="icon">
          <img src="https://www.mintbase.xyz/mintbase1.svg" />
        </div>
        <div className="iconLinks">
          {iconLinks.map((data) => (
            <a target="_blank" href={data.route}>
              <Widget
                src={`${accountId}/widget/Mintbase.MbIcon`}
                props={{
                  name: data.name,
                  size: "18px",
                  mode,
                }}
              />
            </a>
          ))}
        </div>
      </div>
      <div className="right">
        {Object.entries(MbFooterRoutes).map(([key, value]) => (
          <div className="section" key={key}>
            <h2>{key}</h2>
            <div>
              {value.routes.map((data) => (
                <div className="list">
                  <Widget
                    src={`${accountId}/widget/Mintbase.MbActionText`}
                    props={{ ...data, mode: mode }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bottom">
      <div className="about">
        <p>© Mintbase 2024 / Lisbon, Portugal</p>
        <div
          onClick={() => {
            setMode(mode === "dark" ? "light" : "dark");
            Storage.set("mode", mode === "dark" ? "light" : "dark");
          }}
        >
          <Widget
            src={`${accountId}/widget/Mintbase.MbIcon`}
            props={{
              name: mode === "light" ? "moon" : "sun",
              customStyle:
                mode === "dark" &&
                "border-bottom:1px solid #1ea7fd !important;",
              size: "22px",
              mode,
            }}
          />
        </div>
      </div>
    </div>
  </Footer>
);
