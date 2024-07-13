const [isOpen, setIsOpen] = useState(false);

const { getInputLabelFontType, getFontType, MbDropdownHoverMenu, MbArrowMenu } =
  VM.require("${config_account}/widget/Mintbase.components");

const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const { isDarkModeOn, isHome, ...passProps } = props;

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

console.log("in Nav widget: ", props);

const MbNavbar = styled.div`
  width: 100%;
  padding: 10px;
  background: ${isDarkModeOn ? "" : "#fff"};
  position: ${isDarkModeOn && isHome ? "absolute" : "sticky"};
  top: 10px;
  z-index: 100;
  position: sticky;
  .nav {
    position: sticky;
    top: 10px;
    background-color: ${isDarkModeOn ? "rgba(0, 0, 0, 0.2)" : "#fff"};
    z-index: 100;
    margin-left: 24px; /* mx-24 */
    margin-right: 24px; /* mx-24 */
    padding: 0 10px;
    @media (min-width: 768px) {
      margin-left: 64px; /* md:mx-64 */
      margin-right: 64px; /* md:mx-64 */
    }
  }
  .user-section {
    color: red;
  }
  .innerNav {
    display: flex;
    justify-content: space-between; /* flex justify-between */
    align-items: center; /* items-center */
    padding-top: 20px; /* py-20 */
    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
  .rightNav {
    display: flex;
    justify-content: center; /* flex justify-center */
    align-items: center; /* items-center */
    flex: 1; /* flex-1 */
    gap: 24px; /* gap-24 */
    margin-right: 24px; /* mr-24 */
    img {
      width: 60%;
    }
    input {
      ${getInputLabelFontType("big")}
      border: none;
      background: ${isDarkModeOn ? "#101223" : "rgba(243, 244, 248)"};
      color: ${isDarkModeOn ? "#71766c" : ""};
      padding: 12px;
      &::placeholder {
        color: ${isDarkModeOn ? "#71766c" : ""};
      }
    }
    input:focus {
      outline: none;
      border: none;
    }
  }
  .tabs {
    display: flex;
    @media (max-width: 800px) {
      flex-direction: column;
      height: 90vh;
      display: ${isOpen ? "flex" : "none"};
      width: 100%;
      align-items: flex-start;
      margin: 20px;
    }
  }

  .container {
    display: flex;
    align-items: center;

    .navigation-section {
      margin-left: 50px;
      display: flex;

      > div {
        > a {
          margin-right: 20px;
        }
      }
    }

    .user-section {
      display: flex;
      align-items: center;

      .nav-create-btn {
        margin-left: 10px;
      }

      .nav-sign-in-btn {
        margin-left: 10px;
      }
    }

    .arrow-up-right {
      margin-left: 4px;
    }
  }
`;
const Dropdown = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 20px;
  height: 100%;
  width: 100%;
  background: ${(props) => (props.isDarkModeOn ? "#1e2030" : "")};
  background ${getInputLabelFontType("big")} a {
    color: #000;
    text-decoration: none;
    color: ${(props) => (props.isDarkModeOn ? "#fff" : "")};
  }
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style-type: none;
    li {
      padding: 0.75rem;
      border-radius: 9999px;
      transition: 0.4s ease-in-out;
      color: ${(props) => (props.isDarkModeOn ? "#fff" : "")};
      width: max-content;
    }
    li:hover {
      background-color: ${(props) =>
        props.isDarkModeOn ? "#93C5FD" : "#93C5FD"};
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    width: max-content;
  }
  .rightButtons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .rightObjects {
    display: flex;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    margin-left: 40px;
    align-items: flex-start;
  }
`;

const RouteButton = styled.a`
  text-decoration: none;
  display: flex;
  padding: 10px; /* p-10 */
  border-radius: 9999px; /* rounded */
  color: ${isDarkModeOn ? "#FFFFFF" : "#000000"}; /* dark:text-white */
  text-align: center; /* text-center */
  margin-top: 10px; /* mt-10 */
  ${getInputLabelFontType("big")}
  background-color: ${isDarkModeOn
    ? "#374151"
    : "#F3F4F6"}; /* dark:bg-gray-800 or bg-gray-100 */
  &:hover {
    background-color: ${isDarkModeOn
      ? "#93C5FD"
      : "#93C5FD"}; /* hover:bg-blue-300-15 or hover:bg-blue-100-15 */
  }
  height: 3.5rem; /* h-14 */
  width: 16rem; /* w-64 */
  line-height: 1rem; /* leading-4 */
  justify-content: center; /* justify-center */
  align-items: center; /* items-center */
  cursor: pointer; /* cursor-pointer */
  &:hover {
    background-color: ${isDarkModeOn
      ? "#BFDBFE"
      : "#BFDBFE"}; /* dark:hover:bg-blue-100-15 or hover:bg-blue-100-15 */
  }
  img {
    height: 20px !important;
    width: 20px !important;
  }
  h1 {
    margin-left: 0.75rem;
    ${getInputLabelFontType("big")}
  }
`;

const MobileNavOptions = styled.div`
  display: none;
  background-color: ${isOpen ? "#fff" : "transparent"};

  * {
    font-family: Helvetica Neue;
  }
  @media screen and (max-width: 769px) {
    display: flex;
  }
`;

const MenuToggle = styled.div`
  padding: 5px;
  cursor: pointer;
  .burger path {
    stroke: ${props.isDarkModeOn ? "#fff" : "#000"};
  }
`;

const dropdownStyle = `
  @media (max-width: 500px) {
    .menu-items {
      > div {
        padding: 5px !important;
      }
    }
  }
`;

const menuToggleHandler = () => setIsOpen(!isOpen);

const { param } = props;

const NavLink = ({ to, children, param }) => {
  if (param === "tab") {
    return (
      <Link
        key={"preview-to" + to}
        to={href({
          widgetSrc: "${config_account}/widget/Mintbase.App.Index",
          params: {
            page: "preview",
            tab: to,
          },
        })}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <Link
        key={"to" + to}
        to={href({
          widgetSrc: "${config_account}/widget/Mintbase.App.Index",
          params: {
            page: to,
            ...(param && { tab: param }),
          },
        })}
      >
        {children}
      </Link>
    );
  }
};

const mintBosLogo = (
  <svg
    id="logo"
    data-name="Layer 2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 628.71 182.74"
    className="logotype"
    width="125"
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

const Navbar = ({ routes }) => {
  return (
    <MbNavbar>
      <div className="navbar">
        <div className="innerNav">
          <div className="rightNav">
            <Link
              to={
                !props.isGateway
                  ? href({
                      widgetSrc: "${config_account}/widget/Mintbase.App.Index",
                      params: {
                        page: "home",
                      },
                    })
                  : "https://mintbos.vercel.app"
              }
            >
              {mintBosLogo}
            </Link>
            <input
              type="search"
              placeholder="Search for NFTs, Contracts or Users"
            />
            <MobileNavOptions>
              <MenuToggle onClick={() => menuToggleHandler()}>
                {!isOpen ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="burger"
                  >
                    <path
                      d="M22 12H2"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linejoin="bevel"
                    />
                    <path
                      d="M22 20H2"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linejoin="bevel"
                    />
                    <path
                      d="M22 4H2"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linejoin="bevel"
                    />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L9 9M17 17L9 9M9 9L17 1M9 9L1 17"
                      stroke="black"
                      stroke-width="1.25"
                      stroke-linejoin="bevel"
                    />
                  </svg>
                )}
              </MenuToggle>
            </MobileNavOptions>
          </div>

          <div className="tabs">
            {routes &&
              Object.entries(routes)?.map(
                ([key, value]) =>
                  !value.hidden && (
                    <MbDropdownHoverMenu
                      key={"nav-" + key.toString()}
                      dropdownButton={
                        <MbArrowMenu
                          mode={isDarkModeOn}
                          isActive={true}
                          title={value.init.name}
                        />
                      }
                      mode={isDarkModeOn}
                      customStyle={dropdownStyle}
                    >
                      <Dropdown isDarkModeOn={isDarkModeOn}>
                        <div className="left">
                          {Array.isArray(value?.init?.left) && (
                            <ul>
                              {value.init.left.map((item) => (
                                <li key={item.tab}>
                                  {item.tab ? (
                                    <NavLink
                                      to={key}
                                      param={item.tab}
                                      style={{ textDecoration: "none" }}
                                    >
                                      {item.name}
                                    </NavLink>
                                  ) : (
                                    <a
                                      target="_blank"
                                      style={{ textDecoration: "none" }}
                                      href={item.link}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {Array.isArray(value?.init?.right) ? (
                          <div className="rightButtons">
                            {value?.init?.right.map((element, index) => (
                              <div className="rightButtons" key={index}>
                                {element.route ? (
                                  <RouteButton
                                    target="_blank"
                                    href={element.route}
                                  >
                                    <img
                                      alt=""
                                      src={`https://ipfs.near.social/ipfs/${element.ipfsHash}`}
                                    />
                                    <h1>{element.label}</h1>
                                  </RouteButton>
                                ) : (
                                  <NavLink to={key} param={element.tab}>
                                    <RouteButton
                                      target="_blank"
                                      href={element.route}
                                    >
                                      <img
                                        alt=""
                                        src={`https://ipfs.near.social/ipfs/${element.ipfsHash}`}
                                      />
                                      <h1>{element.label}</h1>
                                    </RouteButton>
                                  </NavLink>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rightObjects">
                            {value?.init?.right &&
                              Object?.values(value?.init?.right).map(
                                (group, index) => (
                                  <ul key={index}>
                                    {group.map((item) => (
                                      <li key={item.tab}>
                                        <NavLink to={key} param={item.tab}>
                                          {item.name}
                                        </NavLink>
                                      </li>
                                    ))}
                                  </ul>
                                )
                              )}
                          </div>
                        )}
                      </Dropdown>
                    </MbDropdownHoverMenu>
                  )
              )}
          </div>
          <div className="input">
            <MbInputField
              id="connectasdao"
              placeholder="dao address"
              type="text"
              required={true}
              label="Connect as DAO"
              error={false}
              className="input-field"
              value={e}
              isDarkModeOn={isDarkModeOn}
              onChange={e}
            />
          </div>
        </div>
        <div className="user-section">
          {!props.signedIn ? (
            <div>
              <Widget
                src={`${config_account}/widget/Mintbase.MbButton`}
                props={{
                  label: "Sign In",
                  btnType: "primary",
                  size: "medium",
                  state: "active",
                  onClick: () => props.requestSignin(),
                  isDarkModeOn,
                }}
              />
            </div>
          ) : (
            <div>{context.accountId}</div>
          )}
        </div>
      </div>
    </MbNavbar>
  );
};

return <Navbar page={"explore"} routes={props.routes} {...props} />;
