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
  z-index: 9;
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
  z-index: 10;
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;
const ModelSection = styled.div`
  min-height: 300px;
  max-height: 600px;
  width: 90%;
  border-radius: 0.25rem;
  background-color: white;
  color: black;
  margin-left: 24px;
  margin-right: 24px;
  &.dark-modal-section {
    background-color: #1e2030;
    color: white;
  }
  @media (min-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    width: 600px;
    min-height: 400px;
    max-height: auto;
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
  border-bottom-color: var(--gray-150);
  border-bottom-style: solid;
  justify-content: space-between;
  &.dark-modal-content {
    border-bottom-color: var(--gray-700);
  }
`;
const TopTitle = styled.div`
  font-family: "AUTHENTIC Sans 130", sans-serif;
  font-size: 14px;
  line-height: 16px;
  @media (min-width: 480px) {
    font-size: 16px;
    line-height: 16px;
  }
`;
const SubTitle = styled.div`
  font-family: "AUTHENTIC Sans 90", sans-serif;
  font-size: 12px;
  line-height: 14px;
  @media (min-width: 480px) {
    font-size: 14px;
    line-height: 16px;
  }
  padding-top: 4px;
`;
const CloseIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
`;
const ModalText = styled.div`
  padding: 24px;
  height: 300px;
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;
const TopElement = styled.div`
  .order-first {
    order: -9999;
  }
`;
const MbModal = ({
  open,
  setOpen,
  onClose,
  topTitle,
  children,
  subtitle,
  topElement,
  topElementFirst,
  isDarkModeOn,
}) => {
  return (
    <>
      {open && (
        <div>
          <ModalBg />
          <Modal>
            <ModelSection className={isDarkModeOn ? "dark-modal-section" : ""}>
              <ModelContent
                className={isDarkModeOn ? "dark-modal-content" : ""}
              >
                <TopElement
                  style={
                    topElementFirst
                      ? { display: "flex", alignItems: "center" }
                      : ""
                  }
                >
                  {topElementFirst && (
                    <div className="order-first">
                      {topElement && topElement}
                    </div>
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      color: isDarkModeOn ? "#fff" : "#000",
                    }}
                  >
                    <i class="bi bi-x-lg"></i>
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
};
return { MbModal };
