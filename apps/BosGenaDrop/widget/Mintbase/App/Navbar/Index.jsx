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

// const {}

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
            <div>
              <div>Activity</div>
              <div>Analytics</div>
              <div>Accounts</div>
              <div>Top Affiliates</div>
            </div>
          </MbDropdownHoverMenu>
        </div>
      </div>
    </div>
  </MbNavbar>
);
