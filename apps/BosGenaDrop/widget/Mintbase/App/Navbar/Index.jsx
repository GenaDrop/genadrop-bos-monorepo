const { mode } = props;

const accountId = props.accountId || "bos.genadrop.near";

const { getInputLabelFontType, getFontType, MbDropdownHoverMenu, MbArrowMenu } =
  VM.require("bos.genadrop.near/widget/Mintbase.components");

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
`;

const Dropdown = styled.div`
  a {
    color: #000;
    text-decoration: none;
  }
  display: flex;
  align-items: flex-start;
  ${getInputLabelFontType("big")}
  .left {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  .right {
    border-left: 0.5px solid #b0b0b0;
    display: flex;
    ul {
      display: flex;
      flex-direction: column;
      list-style-type: none;
      gap: 20px;
      li {
      }
    }
  }
`;

const tabs = {
  Markets: {
    left: [
      { name: "Featured Contracts", link: "FeaturedContracts" },
      { name: "New Listings", link: "NewListings" },
    ],
    right: {
      one: [
        { name: "AI", link: "AI" },
        { name: "Gaming", link: "Gaming" },
        { name: "Philanthropy", link: "Philanthropy" },
      ],
      two: [
        { name: "Arts", link: "Arts" },
        { name: "Music", link: "Music" },
        { name: "Photography", link: "Photography" },
      ],
      three: [
        { name: "DAOs", link: "DAOs" },
        { name: "PFPs", link: "PFPs" },
        { name: "Utilities", link: "Utilities" },
      ],
    },
  },
  Manage: {
    left: [
      { name: "My Contracts", link: "Contracts?account=" },
      { name: "My NFTs", link: "NFTs?account=" },
      { name: "Stripe Connect", link: "Stripe Connect" },
      { name: "Orders", link: "Orders" },
      { name: "Trading History", link: "Trading History" },
    ],
    right: [<Widget src="" />],
  },
};

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
        <div>
          <MbDropdownHoverMenu
            dropdownButton={<MbArrowMenu isActive={true} title="Market" />}
          >
            <Dropdown>
              {tabs.Markets.left.map((data) => (
                <div className="left">
                  <a href={`${data.link}`}>{data.name}</a>
                </div>
              ))}
              <div className="right">
                {Object.values(tabs.Markets.right).map((group, index) => (
                  <ul key={index}>
                    {group.map((item) => (
                      <li key={item.link}>
                        <a href={`${item.link}`}>{item.name}</a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </Dropdown>
          </MbDropdownHoverMenu>
        </div>
      </div>
    </div>
  </MbNavbar>
);
