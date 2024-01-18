const title = props.title;
const isActive = props.isActive;
const mode = Storage.get("mode") || props.mode;

const { typographyClasses } = VM.require("test.near/widget/Theme");

const IsDarkModeOn = mode === "dark";
const Container = styled.div`
  display: flex;
  margin-left: 8px;
  align-items: center;
  div {
    transition: all 500ms ease-in-out;
  }
  span {
    ${typographyClasses["p-med-130"]}
  }
`;

const Wrapper = styled.div`
  display: flex;
  > div {
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    color: ${IsDarkModeOn ? "white" : "black"};
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
    background: ${`var(--mb-red-${IsDarkModeOn ? "15" : "35"})`};
    color: var(--mb-red);
    :focus {
      --tw-ring-color: rgba(255, 36, 36, var(--tw-ring-opacity));
    }
  }
  :hover {
    > div {
      color: ${IsDarkModeOn ? "var(--blue-100)" : "var(--blue-300)"};
      background: ${IsDarkModeOn ? "var(--blue-100-15)" : "var(--blue-300-15)"};
      div {
        div {
          rotate: 180deg;
        }
      }
    }
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
return (
  <Wrapper>
    <div className={isActive ? "active" : ""}>
      <Container>
        <span>{title}</span>
        <Widget
          src="test.near/widget/MbIcon"
          props={{
            name: "arrow_drop_down",
            cutomStyle: iconStyles,
            color: `black dark:text-white group-hover:text-blue-300 dark:group-hover:text-blue-100`,
            size: "16px",
          }}
        />
      </Container>
    </div>
  </Wrapper>
);
