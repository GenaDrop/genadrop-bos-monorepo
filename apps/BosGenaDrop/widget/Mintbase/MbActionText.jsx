const [showLinkCopiedText, setShowLinkCopiedText] = useState(false);

const { typographyClasses } = VM.require(
  "bos.genadrop.near/widget/Mintbase.Theme"
);

const size = props.size || "big";
const text = props.text || "";
const copyText = props.copyText || "";
const iconTab = props.iconTab || true;
const iconCopy = props.iconCopy || true;
const link = props.link || "";
const mode = Storage.get("mode") || props.mode;

const getFontClass = () => {
  switch (size) {
    case "big":
      return "p-big-90";
    case "small":
      return "p-small-90";
    default:
      return "p-med-90";
  }
};

const iconSize = () => {
  switch (size) {
    case "big":
      return "14px";
    case "small":
      return "10px";
    default:
      return "12px";
  }
};

const handleCopy = async () => {
  clipboard.writeText(copyText || link || text);
  setShowLinkCopiedText(true);
  setTimeout(() => setShowLinkCopiedText(false), 3000);
};

const Container = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const LinkT = styled.a`
  display: flex;
  gap: 0.125rem;
  justify-content: center;
  align-items: center;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  opacity: 1;
  > .text {
    color: ${mode === "dark" ? "var(--blue-100)" : "var(--blue-300)"};
  }
  :hover {
    opacity: 0.7;
    text-decoration: none;
  }
`;

const Text = styled.div`
  color: var(--blue-300);
  ${typographyClasses[getFontClass(size)]}
`;

const CopiedText = styled.div`
  z-index: 999;
  position: absolute;
  top: -2rem;
  left: 50%;
  padding: 8px;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.6);
  > div {
    color: white;
    ${typographyClasses["cap-big-90"]}
  }
`;

const MbActionText = () => {
  return (
    <Container>
      <LinkT href={link} {...(iconTab && { target: "_blank" })}>
        <div className={`${getFontClass()} text`}>{text}</div>
        {iconTab ? (
          <Widget
            src="bos.genadrop.near/widget/Mintbase.MbIcon"
            props={{
              name: "arrow_diagonal",
              size: iconSize(size),
            }}
          />
        ) : null}
      </LinkT>
      {iconCopy ? (
        <div style={{ position: "relative" }}>
          <div style={{ cursor: "pointer" }} onClick={handleCopy}>
            <Widget
              src="bos.genadrop.near/widget/Mintbase.MbIcon"
              props={{
                name: "editions",
                color: `${
                  showLinkCopiedText
                    ? "blue-300 dark:text-blue-100"
                    : "gray-700 dark:text-gray-300 group-hover:text-blue-300 dark:group-hover:text-blue-100"
                } transition ease-in-out duration-500`,
                size: iconSize(size),
              }}
            />
          </div>
          {showLinkCopiedText ? (
            <CopiedText>
              <div>Copied!</div>
            </CopiedText>
          ) : null}
        </div>
      ) : null}
    </Container>
  );
};

return { MbActionText };
