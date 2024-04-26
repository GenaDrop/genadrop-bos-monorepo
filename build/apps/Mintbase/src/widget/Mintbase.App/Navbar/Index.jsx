const [isOpen, setIsOpen] = useState(false);
const { getInputLabelFontType, getFontType, MbDropdownHoverMenu, MbArrowMenu } =
  VM.require("bos.genadrop.near/widget/Mintbase.components");
const { isDarkModeOn, isHome } = props;
const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};
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
        key={to}
        to={href({
          widgetSrc: "bos.genadrop.near/widget/Mintbase.App.Index",
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
        key={to}
        to={href({
          widgetSrc: "bos.genadrop.near/widget/Mintbase.App.Index",
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
const Navbar = ({ routes }) => {
  return (
    <MbNavbar>
      <div className="navbar">
        <div className="innerNav">
          <div className="rightNav">
            <Link
              to={href({
                widgetSrc: "bos.genadrop.near/widget/Mintbase.App.Index",
                params: {
                  page: "home",
                },
              })}
            >
              <img src="https://www.mintbase.xyz/mintbase1.svg" />
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
                      key={key}
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
        </div>
      </div>
    </MbNavbar>
  );
};
return <Navbar page={"explore"} routes={props.routes} {...props} />;
