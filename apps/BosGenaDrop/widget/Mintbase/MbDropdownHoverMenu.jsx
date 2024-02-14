const { customStyle, children, dropdownButton } = props;
const mode = props.mode || Storage.get("mode");

const isDarkModeOn = mode === "dark";

const DropdownContainer = styled.div`
  height: auto;
  width: min-content;
  .menu-items {
    position: absolute;
    z-index: 40;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    background: ${isDarkModeOn ? "var(--gray-850)" : "white"};
    color: ${isDarkModeOn ? "white" : "black"};
    max-height: 0;
    overflow: hidden;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-duration: 500ms;
    ${customStyle || ""}
    &.active {
      max-height: 100rem;
    }
    > div {
      display: flex;
      flex-direction: column;
      padding: 24px;
    }
  }
  &:hover {
    .menu-items {
      max-height: 100rem;
    }
  }
`;

return (
  <DropdownContainer>
    {dropdownButton}

    <div className="menu-items">
      <div>{children}</div>
    </div>
  </DropdownContainer>
);
