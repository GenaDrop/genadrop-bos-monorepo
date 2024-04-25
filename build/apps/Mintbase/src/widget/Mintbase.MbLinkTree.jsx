const linktreeElements = {
  website: {
    prefix: "https://",
    icon: "bi-globe2",
  },
  github: {
    prefix: "https://github.com/",
    icon: "bi-github",
  },
  twitter: {
    prefix: "https://twitter.com/",
    icon: "bi-twitter",
  },
};
const LinkTree = ({ links, isDarkModeOn }) => {
  const linktree = Object.entries(links ?? {});
  const Main = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    .icon {
      display: flex;
      text-decoration: none;
      color: black !important;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 4px 7px;
      border-radius: 4px;
      border: 1px solid #b0b0b0;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      height: 28px;
      > a {
        margin: 0 auto;
        color: ${isDarkModeOn ? "#fff" : "#000"};
        text-decoration: none;
      }
      .bi {
        font-size: 16px;
        color: ${isDarkModeOn ? "#fff" : "#000"} !important;
      }
    }
    .value {
      @media (max-width: 768px) {
        display: none;
      }
    }
  `;
  return (
    <Main>
      {linktree.map((o, i) => {
        const key = o[0];
        let value = o[1];
        if (!value) {
          return null;
        }
        const e = linktreeElements[key];
        if (e.prefix) {
          value = value && value.replace(e.prefix, "");
        }
        const icon = e.icon ? (
          <i className={`bi ${e.icon ?? ""} text-secondary`}></i>
        ) : (
          ""
        );
        return (
          e.prefix && (
            <div key={i} className="icon">
              <a target="_blank" href={`${e.prefix}${value}`}>
                {icon}
                <span className="value">{e.icon === "bi-globe2" && value}</span>
              </a>
            </div>
          )
        );
      })}
    </Main>
  );
};
return { LinkTree };
