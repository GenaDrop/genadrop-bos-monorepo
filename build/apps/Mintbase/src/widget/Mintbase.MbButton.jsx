const { getFontType } = VM.require("bos.genadrop.near/widget/Mintbase.Theme");
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [dropdownIconColors, setDropdownIconColors] = useState(null);
const EType = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};
const EState = {
  ACTIVE: "active",
  CAUTION: "caution",
  DISABLED: "disabled",
  LOADING: "loading",
};
const ESize = {
  SMALL: "small",
  MEDIUM: "medium",
  BIG: "big",
};
const getLoadingSize = (currentSize) => {
  switch (currentSize) {
    case "small":
      return "w-3.5 h-3.5";
    case "medium":
      return "w-4 h-4";
    case "big":
      return "w-5 h-5";
    default:
      return "w-4 h-4";
  }
};
const getCurrentColor = (btnType, state) => {
  switch (btnType) {
    case EType.PRIMARY:
      if (state === EState.DISABLED) {
        return { dark: "text-gray-300", light: "text-gray-700" };
      }
      return { dark: "black", light: "white" };
    case EType.SECONDARY:
      if (state === EState.DISABLED) {
        return { dark: "text-gray-600", light: "text-gray-400" };
      } else if (state === EState.CAUTION) {
        return { dark: "text-gray-100", light: "text-error-300" };
      }
      return { dark: "white", light: "black" };
  }
};
const label = props.label || "default";
const state = props.state || EState.ACTIVE;
const size = props.size || ESize.MEDIUM;
const btnType = props.btnType || EType.PRIMARY;
const dropDownItems = props.dropDownItems;
const customStyle = props.customStyle || "";
const isLoading = state === EState.LOADING;
const isDarkModeOn = props?.isDarkModeOn;
const LoadingAnimation = ({ size, btnType }) => (
  <div className="animate-pulse absolute inline w-full left-0">
    <div
      className={`rounded-full ${
        btnType === EType.SECONDARY
          ? "bg-black dark:bg-white"
          : "bg-white dark:bg-black"
      } ${getLoadingSize(size)} m-0-auto`}
    ></div>
  </div>
);
useEffect(() => {
  if (!dropDownItems) return;
  setDropdownIconColors(getCurrentColor(btnType, state));
}, [dropDownItems, btnType, state]);
const Container = styled.div`
  ${dropDownItems &&
  `display:flex;
    gap:4px;
  `}
  .button {
    position: relative;
    ${!customStyle && getFontType(size)}
    border:none;
    --tw-ring-opacity: 1;
    &.big {
      padding: 8px 16px;
      min-width: 100px;
      height: 32px;
    }
    &.medium {
      padding: 6px 16px;
      min-width: 80px;
      height: 26px;
    }
    &.small {
      padding: 6px 16px;
      min-width: 80px;
      height: 26px;
    }
    @media (min-width: 480px) {
      &.button.big {
        padding: 12px 52px;
        min-width: 145px;
        height: 42px;
      }
      &.button.medium {
        padding: 8px 16px;
        min-width: 100px;
        height: 32px;
      }
    }
    &.primary {
      border-radius: 0.25rem;
      color: ${isDarkModeOn ? "black" : "white"};
      background: ${isDarkModeOn ? "white" : "black"};
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
      transition-duration: 500ms;
    }
    &.primary:not(.disabled):not(.loading):focus {
      background-color: ${isDarkModeOn ? "var(--blue-100)" : "var(--blue-300)"};
      ${isDarkModeOn
        ? "--tw-ring-color: rgba(63, 66, 84, var(--tw-ring-opacity));"
        : "--tw-ring-color: rgba(194, 197, 221, var(--tw-ring-opacity));"}
      --tw-ring-offset-shadow: 0 0 0 0 2px white;
      --tw-ring-shadow: 0 0 0 0 calc(2px + 2px) var(--tw-ring-color);
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
        var(--tw-shadow, 0 0 #0000);
    }
    &.primary.active:hover {
      background: ${isDarkModeOn
        ? "var(--blue-100, #C5D0FF)"
        : "var(--blue-300, #4F58A3)"};
    }
    &.primary.disabled {
      color: ${isDarkModeOn
        ? "var(--gray-300, #B3B5BD)"
        : "var(--gray-700, #404252)"};
      background: ${isDarkModeOn
        ? "var(--gray-700, #404252)"
        : "var(--gray-200, #D2D4DA)"};
      cursor: not-allowed;
    }
    &.primary.caution {
      background: ${isDarkModeOn ? "var(--error-100)" : "var(--error-300)"};
    }
    &.secondary {
      border-radius: 0.25rem;
      background-color: transparent;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
      transition-duration: 500ms;
      color: ${isDarkModeOn ? "white" : "black"};
      border: 1px solid ${isDarkModeOn ? "#5b5d6b" : "#9496a1"};
    }
    &.secondary:hover {
      border: 1px solid ${isDarkModeOn ? "white" : "black"};
      background: ${isDarkModeOn ? "#2B2E42" : "#ebedfb"};
    }
    &.secondary:not(.disabled):not(.loading):focus {
      background-color: ${isDarkModeOn
        ? "var(--blue-100-15)"
        : "var(--blue-300-15)"};
      --tw-ring-color: rgba(194, 197, 221, var(--tw-ring-opacity));
      --tw-ring-offset-shadow: 0 0 0 0 2px white;
      --tw-ring-shadow: 0 0 0 0 calc(2px + 2px) var(--tw-ring-color);
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
        var(--tw-shadow, 0 0 #0000);
    }
    &.secondary.active:hover {
      background-color: ${isDarkModeOn
        ? "var(--blue-100-15)"
        : "var(--blue-300-15)"};
    }
    &.secondary.disabled {
      color: ${isDarkModeOn ? "var(--gray-600)" : "var(--gray-400)"};
      cursor: not-allowed;
      background-color: transparent;
      --tw-ring-color: rgba(148, 150, 161, var(--tw-ring-opacity));
    }
    &.secondary.caution {
      background-color: transparent;
      color: ${isDarkModeOn ? "var(--error-100)" : "var(--error-300)"};
      ${isDarkModeOn
        ? `--tw-ring-color: rgba(237, 90, 90, var(--tw-ring-opacity));`
        : `--tw-ring-color: rgba(199, 76, 76, var(--tw-ring-opacity));`}
    }
  }
  .dropdown-btn.small-icon {
    width: 26px;
    height: 26px;
  }
  .dropdown-btn.medium-icon {
    width: 26px;
    height: 26px;
  }
  .dropdown-btn.big-icon {
    width: 32px;
    height: 32px;
  }
  @media (min-width: 480px) {
    .dropdown-btn.medium-icon {
      width: 32px;
      height: 32px;
    }
    .dropdown-btn.big-icon {
      width: 42px;
      height: 42px;
    }
  }
`;
return (
  <Container>
    <button
      type="button"
      className={`button ${btnType} ${state} ${
        customStyle ? customStyle : `${size}` //
      }`}
      disabled={state === EState.DISABLED}
      {...props}
    >
      <span style={{ visibility: isLoading ? "hidden" : "visible" }}>
        {label}
      </span>
      {isLoading && <LoadingAnimation btnType={btnType} size={size} />}
    </button>
    {dropDownItems && (
      <div
        className="relative"
        onClick={() => {
          if (state !== EState.DISABLED && state !== EState.LOADING) {
            setIsDropdownOpen(!isDropdownOpen);
          }
        }}
      >
        <MbMenuWrapper setIsOpen={setIsDropdownOpen}>
          <div>
            <button
              type="button"
              className={`button ${btnType} ${
                state === EState.LOADING ? EState.DISABLED : state
              } dropdown-btn ${size}-icon`}
            >
              <div className="pointer-events-none	">
                <MbIcon
                  name={
                    isDropdownOpen
                      ? EIconName.ARROW_DROP_UP
                      : EIconName.ARROW_DROP_DOWN
                  }
                  size="18px"
                  color={dropdownIconColors?.light ?? "mb-black"}
                  darkColor={dropdownIconColors?.dark}
                />
              </div>
            </button>
          </div>
          <MbDropdownMenu
            items={dropDownItems}
            isOpen={isDropdownOpen}
            className="right-0 md:left-0 md:right-auto"
          />
        </MbMenuWrapper>
      </div>
    )}
  </Container>
);
