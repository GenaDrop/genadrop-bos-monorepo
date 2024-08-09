const accountId = props.accountId ?? "${config_account}";

const { isDarkModeOn, setMode } = props;

const { MbFooterRoutes, getInputLabelFontType } = VM.require(
  "${config_account}/widget/Mintbase.components"
);

const Footer = styled.div`
  background: ${!isDarkModeOn ? "#fff" : "#1e2030"};
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
        color: ${isDarkModeOn ? "#9496A1" : "#5B5D6B"};
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
        color: ${isDarkModeOn ? "#a0c8c3" : ""};
        ${getInputLabelFontType("medium")};
      }
    }
  }
  .logo {
    width: 10vw;
    max-width: 100px;
    min-width: 30px;
    @media (max-width: 800px) {
      width: 60px;
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

const mintBosLogo = (
  <svg
    id="logo"
    data-name="Layer 2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 628.71 182.74"
    className="logo"
    fill="none"
  >
    <g id="Layer_1-2" data-name="Layer 1">
      <g>
        <path
          fill="#ff2424"
          strokeWidth="0"
          d="m279.6,42.62v97.41h-11.58V58.77l-22.79,81.26h-28.55l-22.82-81.26v81.26h-11.55V42.62h18.09l24.91,86.83h11.29l24.91-86.83h18.09Z"
        />
        <path
          fill="#ff2424"
          strokeWidth="0"
          d="m299.36,42.62h11.13v12.81h-11.13v-12.81Zm0,27.69h11.13v69.72h-11.13v-69.72Z"
        />
        <path
          fill="#ff2424"
          strokeWidth="0"
          d="m380.34,89.52v50.51h-11.13v-47c0-8.49-3.9-14.75-13.08-14.75s-16.11,6.23-16.11,16.85v45h-11.17v-69.82h11.17v8.63c4.25-6.77,11.73-10.83,19.72-10.71,11,0,20.6,7.23,20.6,21.29Z"
        />
        <path
          fill="#ff2424"
          strokeWidth="0"
          d="m402.02,119.99v-39.66h-9.18v-10h9.32v-17.41h11v17.39h15.46v10h-15.44v39.38c0,9.32,3.89,11.41,10.29,11.41h5.85v10h-6c-11.54.03-21.3-2.47-21.3-21.11Z"
        />
        <path
          fill="#ff2424"
          strokeWidth="0"
          d="m493.88,92.58v25.18c0,14.47-9.32,24.35-22.26,24.35-7.94,0-14.89-3.48-18.09-8.76v6.68h-11.13V42.62h11.13v34.37c3.2-5.28,10.15-8.76,18.09-8.76,12.94,0,22.26,9.9,22.26,24.35Zm-11.13.83c0-10.15-6.12-15.16-14.61-15.16s-14.61,5-14.61,15.16v23.52c0,10.15,6.12,15.16,14.61,15.16s14.61-5,14.61-15.16v-23.52Z"
        />
        <path
          fill="#ff2424"
          strokeWidth="0"
          d="m535.21,68.25c-14.72,0-24.61,10.11-24.61,25.16v23.52c0,15.05,9.89,25.16,24.61,25.16s24.61-10.11,24.61-25.16v-23.52c0-15.05-9.89-25.16-24.61-25.16Zm14.61,48.68c0,10.2-6.12,15.16-14.61,15.16s-14.61-5.01-14.61-15.16v-23.52c0-10.16,6.13-15.16,14.61-15.16s14.61,5.01,14.61,15.16v23.52Z"
        />
        <path
          fill="#ff2424"
          strokeWidth="0"
          d="m577.23,117.76v-2.22h11.13v2.64c0,9.18,5.43,13.91,15.44,13.91,6.4,0,13.5-1.94,13.5-9.73,0-7.38-5.56-9.47-16.7-13-13.49-4.17-22.4-8.2-22.4-20.73,0-15.72,14.06-20.45,24.77-20.45,11.83,0,24.63,6,24.63,22v3.2h-11.13v-2.89c0-9.6-7.1-12.24-13.78-12.24-7.23,0-13.08,3.06-13.08,9.46,0,6.82,6.82,9,16,11.82,14.61,4.32,23.1,9.33,23.1,22.27,0,15.44-13.08,20.31-25.32,20.31-15.73.02-26.16-8.07-26.16-24.35Z"
        />
        <path
          fill="#ff2424"
          strokeWidth="0"
          d="m125.16,69.99h-12.66V21.34C112.53,9.59,103.03.03,91.28,0c-11.75-.03-21.31,9.47-21.34,21.22-.03,11.75,9.47,21.31,21.22,21.34,4.6.01,9.09-1.47,12.78-4.22v31.65h-48.84c-11.71,0-21.21,9.5-21.21,21.21h0v.46h0v48.64h-12.66C9.51,140.29,0,149.79,0,161.51c0,11.72,9.49,21.22,21.21,21.23,11.64,0,21.12-9.38,21.23-21.02h0v-12.86h31.85c-6.98,9.4-5.01,22.67,4.38,29.64,9.4,6.98,22.67,5.01,29.64-4.38s5.01-22.67-4.38-29.64c-3.66-2.71-8.09-4.18-12.64-4.18h-48.84v-32.1c9.38,7,22.66,5.06,29.65-4.32,5.61-7.52,5.6-17.83,0-25.34h31.84v12.86h0c.11,11.71,9.7,21.12,21.41,21.01,11.71-.11,21.12-9.7,21.01-21.41-.11-11.64-9.57-21.01-21.21-21.01h.01Zm-33.87-36c-6.99,0-12.66-5.66-12.67-12.65,0-6.99,5.66-12.66,12.65-12.67s12.66,5.66,12.67,12.65h0c0,7-5.66,12.66-12.65,12.68h0Zm12.65,127.52c0,6.99-5.67,12.66-12.66,12.66-6.99,0-12.66-5.67-12.66-12.66s5.67-12.66,12.66-12.66h0c6.99,0,12.66,5.68,12.65,12.67h0Zm-82.71,12.62c-6.99,0-12.66-5.67-12.66-12.66,0-6.99,5.67-12.66,12.66-12.66,6.99,0,12.66,5.67,12.66,12.66,0,0,0,0,0,0,0,6.99-5.67,12.65-12.66,12.65Zm33.87-70.31c-6.99,0-12.66-5.67-12.66-12.66,0-6.99,5.67-12.66,12.66-12.66s12.66,5.67,12.66,12.66c0,.01,0,.03,0,.04,0,6.99-5.67,12.65-12.66,12.66v-.04Zm70.06,0c-6.99,0-12.66-5.66-12.67-12.65,0-6.99,5.66-12.66,12.65-12.67s12.66,5.66,12.67,12.65h0c.01,7.01-5.65,12.69-12.65,12.71v-.04Z"
        />
      </g>
    </g>
  </svg>
);

return (
  <Footer>
    <div className="footerLinks">
      <div className="left">
        <div className="icon">{mintBosLogo}</div>
        <div className="iconLinks">
          {iconLinks &&
            iconLinks?.map((data) => (
              <a target="_blank" href={data.route}>
                <Widget
                  src={`${accountId}/widget/Mintbase.MbIcon`}
                  props={{
                    name: data.name,
                    size: "18px",
                    isDarkModeOn,
                    color: isDarkModeOn ? "mb-white" : "mb-black",
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
                    props={{
                      ...data,
                      isDarkModeOn,
                    }}
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
            setMode(isDarkModeOn ? "light" : "dark");
            Storage.set("mode", isDarkModeOn ? "light" : "dark");
          }}
        >
          <Widget
            src={`${accountId}/widget/Mintbase.MbIcon`}
            props={{
              name: isDarkModeOn ? "moon" : "sun",
              customStyle:
                isDarkModeOn && "border-bottom:1px solid #1ea7fd !important;",
              size: "22px",
              isDarkModeOn,
              color: isDarkModeOn ? "mb-white" : "mb-black",
            }}
          />
        </div>
      </div>
    </div>
  </Footer>
);
