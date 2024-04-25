const { typographyClasses } = VM.require(
  "bos.genadrop.near/widget/Mintbase.Theme"
);
const { options, isOpen, isInline, onOptionChange } = props;
const menuCustomStyle = props.menuCustomStyle || "";
const itemCustomStyle = props.itemCustomStyle || "";
const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";
const NetworkMenu = styled.div`
  .network-menu {
    overflow: hidden;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    color: ${isDarkModeOn ? "white" : "black"};
    ${menuCustomStyle}
    &.col {
      display: inline-block;
      position: absolute;
      z-index: 10;
      background: ${isDarkModeOn ? "var(--gray-800)" : "var(--gray-50)"};
    }
    &.flex-row {
      display: flex;
      overflow: scroll;
      padding: 0 24px;
    }
    &.no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    &.no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .network-item {
      background: ${isDarkModeOn ? "var(--gray-800)" : "var(--gray-50)"};
      display: flex;
      padding: 12px;
      justify-content: flex-start;
      align-items: center;
      white-space: nowrap;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
      transition-duration: 500ms;
      cursor: pointer;
      ${itemCustomStyle}
      :hover {
        background: ${isDarkModeOn
          ? "var(--blue-100-35)"
          : "var(--blue-300-15)"};
      }
      .text {
        letter-spacing: 0.1em;
        align-self: center;
        ${typographyClasses["cap-big-130"]}
      }
    }
  }
`;
if (!isOpen) return null;
const MbNetworkMenu = () => {
  return (
    <NetworkMenu>
      <div
        className={`network-menu ${isInline ? "flex-row no-scrollbar" : "col"}`}
      >
        {options.map((option) => (
          <div
            className={`network-item`}
            onClick={() => onOptionChange(option.value)}
            key={option.value}
          >
            {option.indicator}
            <div
              className="text"
              style={{ marginLeft: option.indicator ? "12px" : "" }}
            >
              {option.label}
            </div>
          </div>
        ))}
      </div>
    </NetworkMenu>
  );
};
return { MbNetworkMenu };
