const { mode } = props;
const isDarkModeOn = mode === "dark";

const accountId = props.accountId || "bos.genadrop.near";
const [isOpen, setIsOpen] = useState(false);

const {
  getInputLabelFontType,
  getFontType,
  MbDropdownHoverMenu,
  MbArrowMenu,
  MbRoutes,
} = VM.require("bos.genadrop.near/widget/Mintbase.components");

const MbNavbar = styled.div`
  width: 100%;
  border-bottom: 1px solid ${isDarkModeOn ? "#374151" : "#E5E7EB"};
  padding: 10px;
  background: ${isDarkModeOn ? "" : "#fff"};
  position: sticky;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  .nav {
    position: sticky;
    top: 0;
    background-color: ${isDarkModeOn ? "rgba(0, 0, 0, 0.2)" : "#fff"};
    z-index: 50;
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
      width: 20%;
    }
    input {
      ${getInputLabelFontType("big")}
      border: none;
      background: ${mode === "dark" ? "#101223" : "rgba(243, 244, 248)"};
      color: ${mode === "dark" ? "#71766c" : ""};
      padding: 12px;
      &::placeholder {
        color: ${mode === "dark" ? "#71766c" : ""};
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
  background: ${mode === "light" ? "" : "#1e2030"};
  background ${getInputLabelFontType("big")} a {
    color: #000;
    text-decoration: none;
    color: ${isDarkModeOn ? "#fff" : ""};
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
      color: ${isDarkModeOn ? "#fff" : ""};
    }
    li:hover {
      background-color: ${isDarkModeOn
        ? "#93C5FD"
        : "#93C5FD"}; /* hover:bg-blue-300-15 or hover:bg-blue-100-15 */
    }
  }

  .left {
    display: flex;
    flex-direction: column;
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
    stroke: ${props.mode === "dark" ? "#fff" : "#000"};
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

return (
  <MbNavbar>
    <div className="navbar">
      <div className="innerNav">
        <div className="rightNav">
          <img src="https://www.mintbase.xyz/mintbase1.svg" />
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
          {Object.entries(MbRoutes).map(([key, value]) => (
            <MbDropdownHoverMenu
              key={key}
              dropdownButton={
                <MbArrowMenu mode={mode} isActive={true} title={key} />
              }
              mode={mode}
              customStyle={dropdownStyle}
            >
              <Dropdown>
                <div className="left">
                  {Array.isArray(value.left) && (
                    <ul>
                      {value.left.map((item) => (
                        <li key={item.link}>
                          <a
                            target={item.external ? "_blank" : ""}
                            href={`${item.link}`}
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {Array.isArray(value.right) ? (
                  <div className="rightButtons">
                    {value.right.map((element, index) => (
                      <div className="rightButtons" key={index}>
                        <RouteButton href={element.route}>
                          <img
                            alt=""
                            src={`https://ipfs.near.social/ipfs/${element.ipfsHash}`}
                          />
                          <h1>{element.label}</h1>
                        </RouteButton>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rightObjects">
                    {Object.values(value.right).map((group, index) => (
                      <ul key={index}>
                        {group.map((item) => (
                          <li key={item.link}>
                            <a href={`${item.link}`}>{item.name}</a>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                )}
              </Dropdown>
            </MbDropdownHoverMenu>
          ))}
        </div>
      </div>
    </div>
  </MbNavbar>
);
