const {
  title,
  isOpen,
  isFixedAccordion,
  extraIcon,
  isVerifiedToken,
  children,
} = props;
const { typographyClasses } = VM.require(
  "bos.genadrop.near/widget/Mintbase.Theme"
);
const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";
const [isExpanded, setIsExapnded] = useState(isOpen);
const toggle = () => {
  if (isFixedAccordion) return;
  console.log(isExpanded);
  setIsExapnded(!isExpanded);
};
// useEffect(() => {
//   setIsExapnded(isOpen);
// }, [isOpen]);
let accordionStyleClass = "";
if (!isFixedAccordion) {
  if (isExpanded) {
    accordionStyleClass = "expanded";
  } else {
    accordionStyleClass = "notExpanded";
  }
} else {
  accordionStyleClass = "fixedAccordion";
}
const Accordion = styled.div`
  border-radius: 0.25rem;
  background-color: ${isDarkModeOn ? "var(--gray-850)" : "white"};
  color: ${isDarkModeOn ? "white" : "black"};
  > .header-container {
    display: flex;
    padding: 12px;
    justify-content: space-between;
    align-items: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    cursor: ${isFixedAccordion ? "" : "pointer"};
    border-bottom-style: solid;
    border-bottom-color: ${isDarkModeOn ? "var(--gray-700)" : "var(gray-15)"};
    border-bottom-width: ${isExpanded || isFixedAccordion ? "1px" : "0"};
    @media (min-width: 768px) {
      padding: 24px;
    }
    > .header {
      display: flex;
      gap: 12px;
      align-items: center;
      ${typographyClasses["p-big-130"]}
    }
    > .icons {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }
  .content-wrapper {
    overflow: hidden;
    max-height: 0;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    &.active {
      max-height: 100rem;
    }
  }
  .content {
    padding: 12px;
    @media (min-width: 768px) {
      padding: 24px;
    }
  }
`;
const arrowCustomStyle = `
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms; 
  transition-duration: 300ms; 
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); 
  rotate: ${isExpanded ? "180deg" : ""};
`;
const MbAccordion = () => {
  return (
    <Accordion>
      <div className={`header-container`} onClick={toggle}>
        <div className="header">
          {title}
          {isVerifiedToken && (
            <Widget
              src={"bos.genadrop.near/widget/Mintbase.MbTooltip"}
              props={{
                text: "Token from Verified Store",
                component: (
                  <div>
                    <Widget
                      src="bos.genadrop.near/widget/Mintbase.MbIcon"
                      props={{
                        name: "verified",
                      }}
                    />
                  </div>
                ),
                place: "top",
              }}
            />
          )}
        </div>
        <div className="icons">
          {/* {extraIcon && extraIcon} */}
          {!isFixedAccordion && (
            <Widget
              src="bos.genadrop.near/widget/Mintbase.MbIcon"
              props={{
                name: "arrow_expand_more",
                size: "20px",
                color: "black",
                darkColor: "white",
                customStyle: arrowCustomStyle,
              }}
            />
          )}
        </div>
      </div>
      <div
        className={`content-wrapper ${
          isExpanded || isFixedAccordion ? "active" : ""
        }`}
      >
        <div className="content">{children}</div>
      </div>
    </Accordion>
  );
};
return { MbAccordion };
