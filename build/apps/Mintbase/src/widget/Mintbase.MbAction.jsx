const { getFontType } = VM.require("bos.genadrop.near/widget/Mintbase.Theme");
const state = props.state || "active";
const size = props.size || "medium";
const customStyle = props.customStyle;
const mode = Storage.get("mode") || props.mode;
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
    ${getFontType(size)}
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
  ${customStyle}
`;
const MbAction = () => {
  return (
    <Wrapper>
      <button
        className={`action ${state}`}
        disabled={state === "disabled"}
        {...props}
      >
        {props.children}
      </button>
    </Wrapper>
  );
};
return { MbAction };
