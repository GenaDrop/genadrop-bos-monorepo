const accountId = props.accountId ?? "bos.genadrop.near";

const { MbFooterRoutes, getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);

const Footer = styled.div`
  margin: 30px;
  .left {
    .icon {
      img {
        width: 25%;
      }
      margin-bottom: 40px;
    }
    .iconLinks {
      display: flex;
      gap: 12px;
      a {
        text-decoration: none;
        border: 1px solid #b0b0b0;
        padding: 5px;
        border-radius: 4px;
      }
    }
  }

  .right {
    .section {
      h2 {
        ${getInputLabelFontType("medium")}
      }
    }
  }
`;

const iconLinks = [
  { route: "", name: "twitter" },
  { route: "", name: "instagram" },
  { route: "", name: "telegram" },
  { route: "", name: "linkedin" },
  { route: "", name: "medium" },
  { route: "", name: "discord" },
  { route: "", name: "github" },
  { route: "", name: "youtube" },
];

return (
  <Footer>
    <div className="left">
      <div className="icon">
        <img src="https://www.mintbase.xyz/mintbase1.svg" />
      </div>
      <div className="iconLinks">
        {iconLinks.map((data) => (
          <a href={data.route}>
            <Widget
              src={`${accountId}/widget/Mintbase.MbIcon`}
              props={{
                name: data.name,
                size: "18px",
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
          <div className="list">
            {value.routes.map((data) => (
              <Widget
                src={`${accountId}/widget/Mintbase.MbActionText`}
                props={{ ...data, mode: "light" }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </Footer>
);
