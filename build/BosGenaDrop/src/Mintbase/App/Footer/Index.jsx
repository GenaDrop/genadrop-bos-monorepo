const accountId = props.accountId ?? "bos.genadrop.near";

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
  </Footer>
);
