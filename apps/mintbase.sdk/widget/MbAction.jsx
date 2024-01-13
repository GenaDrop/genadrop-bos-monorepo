const [getFontType, setGetFontType] = useState({});

const state = props.state || "active";
const size = props.size || "medium";
const className = props.className;

const fontType = {
  big: `p-big-90`,
  medium: "p-med-90",
  small: "p-small-90",
  default: "p-med-90",
};
console.log(getFontType[fontType[size]]);

const Wrapper = styled.div`
  .action {
    border-radius: 0.25rem;
    color: var(--blue-300);
    background: transparent;
    border: none;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-duration: 500ms;
    padding: 12px;
    cursor: pointer;
    ${getFontType[fontType[size]]}
    &.disabled {
      cursor: not-allowed;
      color: var(--gray-500);
    }
    &:not(.disabled):hover {
      background: var(--blue-300-15);
    }
    &:not(.disabled):focus {
      box-shadow: 0 0 0 4px var(--blue-300-35);
      background: var(--blue-300-15);
    }
    &.caution {
      color: var(--error-300);
      :hover {
        background: var(--mb-red-15);
      }
      :focus {
        background: var(--mb-red-15);
      }
    }
  }
  ${className}
`;

return (
  <Wrapper>
    <Widget
      src="test.near/widget/Theme"
      props={{
        setFontType: (css) => setGetFontType(css),
      }}
    />
    <button
      className={`action ${state} ${fontType[size]}`}
      disabled={state === "disabled"}
      {...props}
    >
      {props.children}
    </button>
  </Wrapper>
);
