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
`;

return (
  <MbNavbar>
    <div className="navbar">
      <div className="innerNav">
        <div className="rightNav">
          <img src="https://www.mintbase.xyz/mintbase1.svg" />
        </div>
      </div>
    </div>
  </MbNavbar>
);
