const { customStyle, children, dropdownButton } = props;
const mode = props.mode || Storage.get("mode");

const isDarkModeOn = mode === "dark";

const DropdownContainer = styled.div`
  height: auto;
  width: min-content;
  position: relative;
  border-radius: 0.25rem;
  .menu-items {
    position: absolute;
    z-index: 9999;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    background: ${(props) => (props.mode ? "#1e2030" : "white")};
    color: ${(props) => (props.mode ? "white" : "black")};
    max-height: 0;
    overflow: hidden;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-duration: 500ms;
    ${(props) => props.customStyle || ""}
    &.active {
      max-height: 100rem;
      padding: 0.5rem 0.2rem !important;
    }
    > div {
      display: flex;
      flex-direction: column;
      /* padding: 24px; */
      padding: 8px 12px;
      @media (max-width: 1228px) {
        padding: 8px 7px;
      }
    }
  }
  &:hover {
    color: ${isDarkModeOn ? "#C5D0FF" : "#4F58A3"};
    background-color: ${isDarkModeOn
      ? "rgba(59, 130, 246, 0.15)"
      : "rgba(66, 153, 225, 0.15)"};
    .menu-items {
      max-height: 100rem;
    }
  }
  /* padding: 0.5rem 0.2rem; */
`;

const MbDropdownHoverMenu = (props) => {
  return (
    <DropdownContainer mode={props.mode} customStyle={props.customStyle}>
      {props.dropdownButton}

      <div className="menu-items">
        <div>{props.children}</div>
      </div>
    </DropdownContainer>
  );
};

return { MbDropdownHoverMenu };
