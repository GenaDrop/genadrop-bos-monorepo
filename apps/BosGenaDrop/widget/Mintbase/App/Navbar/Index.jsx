const { mode } = props;
const isDarkModeOn = mode === "dark";

const accountId = props.accountId || "bos.genadrop.near";

const {
  getInputLabelFontType,
  getFontType,
  MbDropdownHoverMenu,
  MbArrowMenu,
  MbRoutes,
} = VM.require("bos.genadrop.near/widget/Mintbase.components");

const MbNavbar = styled.div`
  background-color: ${isDarkModeOn
    ? "rgba(0, 0, 0, 0.2)"
    : "#FFFFFF"}; /* dark:bg-black or bg-white */
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid ${isDarkModeOn ? "#374151" : "#E5E7EB"};
  .nav {
    margin-left: 24px; /* mx-24 */
    margin-right: 24px; /* mx-24 */

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
  }
  .rightNav {
    display: flex;
    justify-content: center; /* flex justify-center */
    align-items: center; /* items-center */
    flex: 1; /* flex-1 */
    gap: 24px; /* gap-24 */
    margin-right: 24px; /* mr-24 */
    img {
      width: 30%;
    }
    input {
      ${getInputLabelFontType("big")}
    }
  }
  .tabs {
    display: flex;
  }
`;

const Dropdown = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 20px;
  height: 100%;
  ${getInputLabelFontType("big")}
  a {
    color: #000;
    text-decoration: none;
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
        </div>
        <div className="tabs">
          {Object.entries(MbRoutes).map(([key, value]) => (
            <MbDropdownHoverMenu
              key={key}
              dropdownButton={<MbArrowMenu isActive={true} title={key} />}
            >
              <Dropdown>
                <div className="left">
                  {Array.isArray(value.left) && (
                    <ul>
                      {value.left.map((item) => (
                        <li key={item.link}>
                          <a href={`${item.link}`}>{item.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <hr className="border"></hr>
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
