const {
  open,
  setOpen,
  onClose,
  topTitle,
  children,
  subtitle,
  topElement,
  topElementFirst,
} = props;
const mode = props.mode || Storage.get("mode");

const IsDarkModeOn = mode === "dark";

const { typographyClasses } = VM.require(
  "bos.genadrop.near/widget/Mintbase.Theme"
);

const ModalBg = styled.div`
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.75;
  z-index: 99999;
`;

const Modal = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  z-index: 99999;
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;
const ModelSection = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  max-height: 600px;
  width: 90%;
  border-radius: 0.25rem;
  position: relative;
  background: ${IsDarkModeOn ? "#1E2030" : "white"};
  color: ${IsDarkModeOn ? "white" : "black"};
  margin-left: 24px;
  margin-right: 24px;
  @media (min-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    width: 600px;
    min-height: 400px;
    max-height: none;
  }
  @media (min-width: 976px) {
    width: 900px;
  }
`;
const ModelContent = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  border-bottom: 1px;
  border-bottom-color: ${IsDarkModeOn ? "var(--gray-700)" : "var(--gray-150)"};
  border-bottom-style: solid;
  justify-content: space-between;
  position: sticky;
`;
const TopTitle = styled.div`
  ${typographyClasses["p-big-130"]}
`;
const SubTitle = styled.div`
  ${typographyClasses["p-med-90"]}
  padding-top: 4px;
`;
const CloseIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const ModalText = styled.div`
  padding: 24px;
  height: 100%;
  flex: 1;
`;
const TopElement = styled.div`
  ${topElementFirst
    ? `display: flex;
       align-items: center;`
    : ""}
  .order-first {
    order: -9999;
  }
`;

// const MbModal = () => {
return (
  <>
    {open && (
      <div>
        <ModalBg />
        <Modal>
          <ModelSection>
            <ModelContent>
              <TopElement>
                {topElementFirst && (
                  <div className="order-first">{topElement && topElement}</div>
                )}
                <div>
                  <TopTitle>{topTitle}</TopTitle>
                  {subtitle && <SubTitle>{subtitle}</SubTitle>}
                </div>
              </TopElement>
              <CloseIcon>
                {!topElementFirst && <div>{topElement && topElement}</div>}
                <div
                  onClick={() => {
                    setOpen(false);
                    if (onClose) setTimeout(onClose, 300);
                  }}
                >
                  <Widget
                    src="bos.genadrop.near/widget/Mintbase.MbIcon"
                    props={{
                      name: "close",
                      cutomStyle: `cursor:pointer;`,
                      color: "blue-300",
                      darkColor: "blue-100",
                    }}
                  />
                </div>
              </CloseIcon>
            </ModelContent>
            <ModalText>{children}</ModalText>
          </ModelSection>
        </Modal>
      </div>
    )}
  </>
);
// };

// return { MbModal };
