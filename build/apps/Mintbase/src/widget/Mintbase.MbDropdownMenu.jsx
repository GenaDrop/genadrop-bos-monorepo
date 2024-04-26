const { typographyClasses } = VM.require(
  "bos.genadrop.near/widget/Mintbase.Theme"
);
const { isOpen, items } = props;
const customStyle = props.customStyle || "";
const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";
const DropdownMenu = styled.div`
  background: ${isDarkModeOn ? "var(--gray-800)" : "var(--gray-50)"};
  color: ${isDarkModeOn ? "white" : "var(--mb-blackblue)"};
  overflow: hidden;
  position: absolute;
  z-index: 10;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  min-width: ${items && items?.find((item) => item.icon)
    ? "12rem"
    : "max-content"};
  ${customStyle}
  .dropdown-item {
    display: flex;
    padding: 0.75rem 1rem;
    cursor: pointer;
    justify-content: center;
    text-align: center;
    position: relative;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-duration: 500ms;
    :hover {
      background: ${isDarkModeOn ? "var(--blue-100-35)" : "var(--blue-300-15)"};
    }
    &.selected {
      background: ${isDarkModeOn ? "var(--blue-100-35)" : "var(--blue-300-15)"};
    }
    .text {
      ${typographyClasses["p-med-90"]}
      color: ${isDarkModeOn ? "var(--blue-100)" : "var(--blue-300)"};
      ${icon ? "max-height: 80%;" : "white-space: nowrap;"}
    }
    .dropdown-icon {
      display: flex;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  &.center-pos {
    left: 50%;
    transform: translateX(-50%);
  }
`;
// const MbDropdownMenu = () => {
return !isOpen ? null : (
  <DropdownMenu>
    {items.map(({ content, selected, icon, onClick }, index) => {
      return (
        <div
          key={`${index}`}
          className={`dropdown-item ${selected ? "selected" : ""}`}
          onClick={onClick}
        >
          <div className="text">{content}</div>
          {icon && <div className="dropdown-icon">{icon}</div>}
        </div>
      );
    })}
  </DropdownMenu>
);
// };
// return { MbDropdownMenu };
