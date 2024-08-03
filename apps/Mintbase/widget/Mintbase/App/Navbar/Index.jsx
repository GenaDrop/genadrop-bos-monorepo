const { getInputLabelFontType, getFontType, MbDropdownHoverMenu, MbArrowMenu } =
  VM.require("${config_account}/widget/Mintbase.components");

const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const { Button } = VM.require(
  "${config_account}/widget/Mintbase.App.Resources.Button"
) || {
  Button: () => <button></button>,
};

const searchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="25px"
    height="25px"
  >
    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
  </svg>
);

const searchLightIcon = (
  <svg
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="25px"
    height="25px"
  >
    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
  </svg>
);

const { isDarkModeOn, isHome, ...passProps } = props;
const [isOpen, setIsOpen] = useState(false);

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const urlChecks =
  props.isGateway ||
  props.gatewayURL.includes("http://127.0.0.1:8080") ||
  props.gatewayURL.includes("everything.dev");

const MbNavbar = styled.div`
  width: 100%;
  max-width: 1296px;
  padding: 10px;
  top: 10px;
  margin: 0 auto;
  z-index: 100;
  position: sticky;
  .search {
    display: flex;
    align-items: center;
    background: #f3f4f8;
    padding: 0 10px;
    border-radius: 8px;
    background: inherit;
    svg {
      cursor: pointer;
      transition: 0.3s ease-in-out;
    }
    svg:hover {
      opacity: 0.6;
    }
    input {
      :focus {
        outline: none !important;
        border: none !important;
      }
    }
  }
  &:dark {
    svg {
      fill: #fff !important;
    }
  }
  .nav {
    position: sticky;
    top: 10px;
    z-index: 100;
    margin-left: 24px;
    margin-right: 24px;
    padding: 0 10px;
    @media (min-width: 768px) {
      margin-left: 64px;
      margin-right: 64px;
    }
  }
  .navbar {
    flex-wrap: nowrap;
  }
  .user-section {
    display: block;
    padding-top: 5px;
    @media (max-width: 800px) {
      display: none;
    }
  }
  .innerNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    @media (max-width: 800px) {
      width: 100%;
      flex-direction: column;
    }
  }
  .rightNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    gap: 24px;
    margin-right: 24px;
    width: 100%;
    .rhs {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: row nowrap;
      gap: 24px;
    }
    img {
      width: 60%;
    }
    input {
      border: none;
      padding: 12px;
      width: 100%;
      @media (max-width: 800px) {
        font-size: 12px;
        padding: 6px;
      }
      &::placeholder {
        color: #71766c;
      }
    }
    :focus {
      outline: none !important;
      border: none !important;
    }
  }
  .tabs {
    display: flex;
    @media (max-width: 800px) {
      flex-direction: column;
      height: 90vh;
      width: 100%;
      align-items: flex-start;
      margin: 20px;
      display: none;
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
  .logo {
    width: 10vw;
    max-width: 100px;
    min-width: 30px;
    @media (max-width: 800px) {
      width: 60px;
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
  a {
    text-decoration: none;
    padding: 0.75rem;
    border-radius: 0.25rem;
    transition: 0.4s ease-in-out;
    width: max-content;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
    .hover-light {
      color: #000;
    }
    .hover-dark {
      color: #fff;
    }
    .hover-light:hover {
      color: #c5d0ff;
      background-color: rgba(66, 153, 225, 0.15);
    }

    .hover-dark:hover {
      color: #4f58a3;
      background-color: rgba(59, 130, 246, 0.35);
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style-type: none;
    li,
    li li {
      padding: 0.75rem;
      border-radius: 0.25rem;
      transition: 0.4s ease-in-out;
      width: max-content;
      font-size: 14px;
      line-height: 16px;
      cursor: pointer;
    }
    .hover-light,
    .hover-light a {
      color: #000;
    }
    .hover-dark,
    .hover-dark a {
      color: #fff;
    }
    .hover-light:hover a {
      color: #4f58a3;
      background-color: rgba(66, 153, 225, 0.15);
    }

    .hover-dark:hover a {
      color: #c5d0ff;
      background-color: rgba(59, 130, 246, 0.35);
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
  padding: 10px 24px;
  border-radius: 9999px;
  text-align: center;
  margin-top: 10px;
  width: 16rem;
  line-height: 1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .hover-light,
  .hover-light a {
    color: #000;
    background-color: #4f58a3;
  }
  .hover-dark,
  .hover-dark a {
    color: #fff;
  }
  .hover-light:hover a {
    color: #4f58a3;
    background-color: rgba(66, 153, 225, 0.15);
  }

  .hover-dark:hover a {
    color: #c5d0ff;
    background-color: rgba(59, 130, 246, 0.35);
  }
  img {
    height: 20px !important;
    width: 20px !important;
  }
  h1 {
    margin-left: 0.75rem;
    font-size: 16px;
    color: inherit;
  }
`;

const MobileNavOptions = styled.div`
  display: none;

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
  }
`;

const Content = styled.div`
  background: #000;
  display: flex;
  min-width: 259px;
  min-height: 100vh;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex-shrink: 0;
`;

const RouteLabel = styled.p`
  color: #666;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.14px;
  text-transform: uppercase;
  margin: 0;
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
const [searchValue, setSearchValue] = useState("");

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

const SidebarMobile = styled.div`
  display: none;

  .buger path {
    fill: white;
  }

  .mobile-tabs {
    display: none;
    @media (max-width: 800px) {
      display: flex;
      flex-direction: column;
      height: 90vh;
      width: 100%;
      align-items: flex-start;
      margin: 20px;
    }
  }

  @media screen and (max-width: 800px) {
    display: flex;
    background: #fff;
    left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
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
`;

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

const accountId = props.accountId || context.accountId;

const Navbar = ({ routes }) => {
  const [profile, setProfile] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    asyncFetch(`https://api.mintbase.xyz/accounts/${accountId}`, {
      method: "GET",
      headers: {
        "mb-api-key": "omni-site",
        "Content-Type": "application/json",
        "x-hasura-role": "anonymous",
      },
    }).then((data) => {
      if (data.body) {
        const parseData = data.body;
        setProfile(parseData);
      }
    });
  }, []);

  const liClassName = {
    "hover-light": !isDarkModeOn,
    "hover-dark": isDarkModeOn,
  };
  const classNameString = Object.keys(liClassName)
    .filter((className) => liClassName[className])
    .join(" ");

  const currentRoute = props.currentRoute;
  const routeKeys = Object.keys(routes);

  function findDefaultRoute(routesObject) {
    const routeKey =
      routesObject &&
      Object.keys(routesObject).find((key) => {
        const route = routesObject[key];
        return route.default === true;
      });

    if (routeKey) {
      return routeKey;
    } else {
      return null;
    }
  }

  const tab = props.tab ?? findDefaultRoute(routes);

  const filteredRoutes = useMemo(() => {
    if (!routes) return {};
    return Object.fromEntries(
      Object.entries(routes).filter(([_, value]) => !value.hidden)
    );
  }, [routes]);

  return (
    <MbNavbar
      style={{
        background: isDarkModeOn ? "" : "#fff",
      }}
      className={isDarkModeOn ? "dark" : "light"}
    >
      <div
        className="navbar"
        style={{
          backgroundColor: isDarkModeOn ? "rgba(0, 0, 0, 0.2)" : "#fff",
          width: "100%",
        }}
      >
        <div className="innerNav">
          <div className="rightNav">
            <div className="rhs">
              <Link
                to={
                  !props.isGateway
                    ? href({
                        widgetSrc:
                          "${config_account}/widget/Mintbase.App.Index",
                        params: {
                          page: "home",
                        },
                      })
                    : "/"
                }
              >
                {mintBosLogo}
              </Link>
              <div className="search">
                <input
                  type="search"
                  placeholder="Search for NFTs, Contracts or Users"
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{
                    color: isDarkModeOn ? "#71766c" : "",
                    backgroundColor: isDarkModeOn
                      ? "#101223"
                      : "rgba(243, 244, 248)",
                  }}
                />
                <Link
                  to={href({
                    widgetSrc: "${config_account}/widget/Mintbase.App.Index",
                    params: {
                      page: "search",
                      tab: searchValue,
                    },
                  })}
                >
                  {isDarkModeOn ? searchLightIcon : searchIcon}
                </Link>
              </div>
            </div>
            <MobileNavOptions
              style={{
                backgroundColor: isOpen ? "#fff" : "transparent",
                float: "right",
              }}
            >
              <SidebarMobile isOpen={isOpen} onClick={() => setIsOpen(false)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="burger"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  <path
                    d="M22 12H2"
                    stroke="white"
                    stroke-width="1.25"
                    stroke-linejoin="bevel"
                    style={{ stroke: isDarkModeOn ? "#fff" : "#000" }}
                  />
                  <path
                    d="M22 20H2"
                    stroke="white"
                    stroke-width="1.25"
                    stroke-linejoin="bevel"
                    style={{ stroke: isDarkModeOn ? "#fff" : "#000" }}
                  />
                  <path
                    d="M22 4H2"
                    stroke="white"
                    stroke-width="1.25"
                    stroke-linejoin="bevel"
                    style={{ stroke: isDarkModeOn ? "#fff" : "#000" }}
                  />
                </svg>

                <div
                  class="offcanvas offcanvas-start"
                  tabindex="-1"
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                  style={{
                    background: "white",
                    scrollbarWidth: "none",
                  }}
                >
                  <div class="offcanvas-header">
                    <h5
                      class="offcanvas-title"
                      id="offcanvasExampleLabel"
                      style={{
                        color: "white",
                      }}
                    >
                      Menu
                    </h5>
                    <button
                      type="button"
                      class="btn-close btn-close-black text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="offcanvas-body">
                    {/* <Content>
                      {routeKeys.map((route) => {
                        const routeObj = routes[route];
                        const hasSubRoutes =
                          Object.keys(routeObj.routes || {}).length > 0;
                        const isActiveRoute = Object.keys(
                          routeObj.routes || {}
                        ).includes(tab);

                        return (
                          <>
                            {routeObj.label && (
                              <RouteLabel>{routeObj.label}</RouteLabel>
                            )}

                            {hasSubRoutes ? (
                              <>
                                <Button
                                  variant={
                                    isActiveRoute ? "primary" : "outline"
                                  }
                                  className="align-self-stretch justify-content-start"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#${route}`}
                                >
                                  <i
                                    style={{ width: 16 }}
                                    className={routeObj.init.icon}
                                  ></i>
                                  {routeObj.init.name}
                                  <i className="bi bi-chevron-down ms-auto"></i>
                                </Button>

                                <div
                                  className={`collapse ${
                                    isActiveRoute ? "show" : ""
                                  } w-100`}
                                  id={route}
                                >
                                  <div
                                    className="d-flex flex-column gap-2 ms-3 ps-2 w-100"
                                    style={{
                                      borderLeft:
                                        "1px solid rgba(255, 255, 255, 0.2)",
                                    }}
                                  >
                                    {Object.keys(routeObj.routes).map(
                                      (subRoute) => (
                                        <Button
                                          href={`${currentRoute}&tab=${subRoute}`}
                                          style={{
                                            backgroundColor:
                                              tab === subRoute
                                                ? "#2f2008"
                                                : "transparent",
                                            fontWeight: 500,
                                          }}
                                          className="flex-grow-1 justify-content-start"
                                          linkClassName="d-flex w-100"
                                        >
                                          {routeObj.routes[subRoute].init.name}
                                        </Button>
                                      )
                                    )}
                                  </div>
                                </div>
                              </>
                            ) : (
                              !routeObj.hide && (
                                <Button
                                  variant={
                                    tab === route ? "primary" : "outline"
                                  }
                                  href={`${currentRoute}&tab=${route}`}
                                  className="flex-grow-1 justify-content-start"
                                  linkClassName="d-flex w-100"
                                >
                                  <i
                                    style={{ width: 16 }}
                                    className={routeObj.init.icon}
                                  ></i>
                                  {routeObj.init.name}
                                </Button>
                              )
                            )}
                          </>
                        );
                      })}
                    </Content> */}
                    <div className="mobile-tabs">
                      {filteredRoutes &&
                        Object.entries(filteredRoutes)?.map(
                          ([key, value]) =>
                            !value.hidden && (
                              <MbDropdownHoverMenu
                                key={`nav-${key}`}
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
                                <Dropdown
                                  style={{
                                    background: isDarkModeOn ? "#1e2030" : "",
                                  }}
                                >
                                  <div className="left">
                                    {Array.isArray(value?.init?.left) && (
                                      <ul>
                                        {value.init.left.map((item, index) => (
                                          <li
                                            key={`left-${index}`}
                                            style={{
                                              color: isDarkModeOn ? "#fff" : "",
                                            }}
                                            className={classNameString}
                                          >
                                            {item.tab ? (
                                              <NavLink
                                                to={key}
                                                param={item.tab}
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                              >
                                                {item.name}
                                              </NavLink>
                                            ) : (
                                              <a
                                                target="_blank"
                                                href={item.link}
                                                style={{
                                                  textDecoration: "none",
                                                }}
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
                                      {value?.init?.right.map(
                                        (element, index) => (
                                          <div
                                            className="rightButtons"
                                            key={index}
                                          >
                                            {element.route ? (
                                              <RouteButton
                                                target="_blank"
                                                href={element.route}
                                                className={classNameString}
                                              >
                                                <img
                                                  alt=""
                                                  src={`https://ipfs.near.social/ipfs/${element.ipfsHash}`}
                                                />
                                                <h1>{element.label}</h1>
                                              </RouteButton>
                                            ) : (
                                              <NavLink
                                                to={key}
                                                param={element.tab}
                                              >
                                                <RouteButton
                                                  target="_blank"
                                                  href={element.route}
                                                  className={classNameString}
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
                                        )
                                      )}
                                    </div>
                                  ) : (
                                    <div className="rightObjects">
                                      {value?.init?.right &&
                                        Object?.values(value?.init?.right).map(
                                          (group, index) => (
                                            <ul key={index}>
                                              {group.map((item) => (
                                                <li key={item.tab}>
                                                  <NavLink
                                                    to={key}
                                                    param={item.tab}
                                                    className={classNameString}
                                                  >
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
                      {urlChecks && (
                        <div className="user-section">
                          {!props.signedIn &&
                          !props.gatewayURL.includes(
                            "http://127.0.0.1:8080"
                          ) ? (
                            <div>
                              <Widget
                                src={`${config_account}/widget/Mintbase.MbButton`}
                                props={{
                                  label: "Connect Wallet",
                                  btnType: "primary",
                                  size: "medium",
                                  state: "active",
                                  onClick: () => props.requestSignIn(),
                                  isDarkModeOn,
                                }}
                              />
                            </div>
                          ) : (
                            <div className="user-section">
                              <Widget
                                src={`${config_account}/widget/Mintbase.App.Navbar.UserDropdown`}
                                props={{
                                  isDarkModeOn,
                                  profile,
                                  accountId,
                                  urlChecks,
                                  ...props,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SidebarMobile>
            </MobileNavOptions>
          </div>

          <div className="tabs">
            {filteredRoutes &&
              Object.entries(filteredRoutes)?.map(
                ([key, value]) =>
                  !value.hidden && (
                    <MbDropdownHoverMenu
                      key={`nav-${key}`}
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
                      <Dropdown
                        style={{ background: isDarkModeOn ? "#1e2030" : "" }}
                      >
                        <div className="left">
                          {Array.isArray(value?.init?.left) && (
                            <ul>
                              {value.init.left.map((item, index) => (
                                <li
                                  key={`left-${index}`}
                                  style={{
                                    color: isDarkModeOn ? "#fff" : "",
                                  }}
                                  className={classNameString}
                                >
                                  {item.tab ? (
                                    <NavLink
                                      to={key}
                                      param={item.tab}
                                      style={{
                                        textDecoration: "none",
                                      }}
                                    >
                                      {item.name}
                                    </NavLink>
                                  ) : (
                                    <a
                                      target="_blank"
                                      href={item.link}
                                      style={{
                                        textDecoration: "none",
                                      }}
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
                                    className={classNameString}
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
                                      className={classNameString}
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
                                        <NavLink
                                          to={key}
                                          param={item.tab}
                                          className={classNameString}
                                        >
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
          {/* {isOpen && (
            <div className="mobile-tabs">
              {filteredRoutes &&
                Object.entries(filteredRoutes)?.map(
                  ([key, value]) =>
                    !value.hidden && (
                      <MbDropdownHoverMenu
                        key={`nav-${key}`}
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
                        <Dropdown
                          style={{ background: isDarkModeOn ? "#1e2030" : "" }}
                        >
                          <div className="left">
                            {Array.isArray(value?.init?.left) && (
                              <ul>
                                {value.init.left.map((item, index) => (
                                  <li
                                    key={`left-${index}`}
                                    style={{
                                      color: isDarkModeOn ? "#fff" : "",
                                    }}
                                    className={classNameString}
                                  >
                                    {item.tab ? (
                                      <NavLink
                                        to={key}
                                        param={item.tab}
                                        style={{
                                          textDecoration: "none",
                                        }}
                                      >
                                        {item.name}
                                      </NavLink>
                                    ) : (
                                      <a
                                        target="_blank"
                                        href={item.link}
                                        style={{
                                          textDecoration: "none",
                                        }}
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
                                      className={classNameString}
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
                                        className={classNameString}
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
                                          <NavLink
                                            to={key}
                                            param={item.tab}
                                            className={classNameString}
                                          >
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
          )} */}
        </div>
        {urlChecks && (
          <div className="user-section">
            {!props.signedIn &&
            !props.gatewayURL.includes("http://127.0.0.1:8080") ? (
              <div>
                <Widget
                  src={`${config_account}/widget/Mintbase.MbButton`}
                  props={{
                    label: "Connect Wallet",
                    btnType: "primary",
                    size: "medium",
                    state: "active",
                    onClick: () => props.requestSignIn(),
                    isDarkModeOn,
                  }}
                />
              </div>
            ) : (
              <div className="user-section">
                <Widget
                  src={`${config_account}/widget/Mintbase.App.Navbar.UserDropdown`}
                  props={{
                    isDarkModeOn,
                    profile,
                    accountId,
                    urlChecks,
                    ...props,
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </MbNavbar>
  );
};

return <Navbar page={"explore"} routes={props.routes} {...props} />;
