const title = props.title;
const isActive = props.isActive;
const mode = Storage.get("mode") || props.mode;
const { typographyClasses } = VM.require(
  "bos.genadrop.near/widget/Mintbase.Theme"
);
const Container = styled.div`
  display: flex;
  margin-left: 8px;
  align-items: center;
  div {
    transition: all 500ms ease-in-out;
  }
  span {
    ${typographyClasses["p-med-130"]}
    color: ${(props) => (props.mode ? "#fff" : "")} !important;
  }
  svg {
    color
  }
`;
const Wrapper = styled.div`
  display: flex;
  > div {
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    color: ${(props) => (props.mode ? "white" : "black")};
    white-space: nowrap;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-duration: 500ms;
    cursor: pointer;
    :focus {
      /* blue-300 blue-100 bg-blue-300-15 g-blue-100-35 */
      box-shadow: 0 0 #0000, 0 0 #0000, var(--tw-shadow, 0 0 #0000);
    }
  }
  .active {
    background: ${`var(--mb-red-${(props) => (props.mode ? "15" : "35")})`};
    color: var(--mb-red);
    :focus {
      --tw-ring-color: rgba(255, 36, 36, var(--tw-ring-opacity));
    }
  }
  :hover {
    > div {
      background: ${(props) =>
        props.mode ? "var(--blue-100-15)" : "var(--blue-300-15)"};
      div {
        div {
          rotate: 180deg;
        }
      }
    }
  }
  .darkSvg {
    color: #fff;
  }
`;
const iconStyles = `
    display: flex; 
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms; 
    transition-duration: 500ms; 
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); 
    --transform-rotate: 0; 
`;
const MbArrowMenu = (props) => {
  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16px"
      viewBox="0 0 24 24"
      width="16px"
      fill="currentColor"
      class={`fill-current ${props.mode ? "darkSvg" : ""}`}
    >
      <path d="M0 0h24v24H0V0z" fill="none"></path>
      <path d="M7 10l5 5 5-5H7z"></path>
    </svg>
  );
  return (
    <Wrapper mode={props.mode}>
      <div className={props.isActive ? "active" : ""}>
        <Container mode={mode}>
          <span>{props.title}</span>
          {arrow}
        </Container>
      </div>
    </Wrapper>
  );
};
return { MbArrowMenu };
