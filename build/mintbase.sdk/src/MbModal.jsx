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
const mode = Storage.get("mode") || props.mode;

const IsDarkModeOn = mode === "dark";

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
  --bg-opacity: 0.75;
  z-index: 99999;
`;

const Modal = styled.div`
  .modal {
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
    .modal-section {
      min-height: 300px;
      max-height: 600px;
      width: 90%;
      border-radius: 0.25rem;
      position: relative;
      background: ${IsDarkModeOn ? "var(--gray-850)" : "white"};
      color: ${IsDarkModeOn ? "white" : "black"};
      margin-left: 24px;
      margin-right: 24px;
    }
  }
`;
return (
  <>
    {open && (
      <div>
        <ModalBg />
        <div id="modal-wrapper" className="modal modal-scale">
          <div className="modal-section">
            <div className="flex items-center p-24 border-b border-gray-150 dark:border-gray-700 justify-between sticky">
              <div className={`${topElementFirst ? "flex items-center" : ""}`}>
                {topElementFirst && (
                  <div className="order-first">{topElement && topElement}</div>
                )}
                <div>
                  <div className="p-big-130">{topTitle}</div>
                  {subtitle && <div className="pt-4 p-med-90">{subtitle}</div>}
                </div>
              </div>
              <div className="flex items-center gap-12">
                {!topElementFirst && <div>{topElement && topElement}</div>}
                <div
                  onClick={() => {
                    const element = document.getElementById("modal-wrapper");
                    if (!element) return;
                    element.classList.add("modal-hide");
                    setTimeout(onClose, 300);
                  }}
                >
                  <Widget
                    src="test.near/widget/MbIcon"
                    props={{
                      name: "close",
                      cutomStyle: `cursor:pointer;`,
                      color: "blue-300",
                      darkColor: "blue-100",
                    }}
                  />
                </div>
              </div>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    )}
  </>
);
