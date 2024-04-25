const elements = props.elements;
const deleteRow = props.deleteRow;
const addMinter = props.addMinter;
const removeMinters = props.removeMinters;
const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";
const RowRoot = styled.div`
  overflow-y: scroll;
  padding: 0.5rem;
  width: 100%;
  .selectedElement {
    background-color: rgba(66, 153, 225, 0.15);
  }
  .disabledCheckbox {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .footerSection {
    display: flex;
    padding-top: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top-width: 1px;
    text-align: center;
    border-color: ${isDarkModeOn ? "#374151" : "#F3F4F6"};
  }
  @media (max-width: 1024px) {
    position: relative;
    flex-direction: row;
  }
`;
const MbTable = styled.div`
  background: ${isDarkModeOn ? "var(--gray-850)" : "white"};
  table {
    width: 100%;
  }
  thead {
    border-bottom-width: 2px;
    border-color: #e5e7eb;
    text-align: left;
    color: #374151;
    width: 100%;
  }
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3rem;
  }
  tr {
    border-bottom-width: 1px;
    border-color: ${isDarkModeOn ? "#1F2937" : "#E5E7EB"};
  }
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3rem;
    padding-right: 3rem;
    color: ${isDarkModeOn ? "#FFF" : "#000"};
  }
  tbody {
    color: ${isDarkModeOn ? "#FFF" : "#000"};
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    }
    .bodyContent {
      border-radius: 0.25rem;
      width: 9rem;
      height: 1rem;
      background-color: #6b7280;
      @media (max-width: 950px) {
        width: auto;
      }
    }
  }
`;
const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  justify-items: center;
  width: 100%;
  padding: 0 24px 24px 24px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
  }
  .leftSection {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    text-align: left;
    width: 100%;
    @media (max-width: 500px) {
      justify-content: center;
    }
    .box {
      padding: 0.5rem;
      border-radius: 0.25rem;
      min-width: 290px;
      background-color: ${!isDarkModeOn ? "#F9FAFB" : "#272a3a"};
      span {
        color: ${!isDarkModeOn ? "#374151" : "#D1D5DB"};
      }
      p {
        color: ${!isDarkModeOn ? "#374151" : "#D1D5DB"};
      }
    }
  }
  .rightSection {
    display: flex;
    gap: 6rem;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
      justify-content: flex-end;
    }
  }
`;
const [checkedList, setCheckedList] = useState([]);
const isElementSelected = (id) => {
  return checkedList.includes(id);
};
const RowSelectList = () => {
  return (
    <RowRoot>
      <MbTable>
        <table>
          <thead>
            <tr>
              <td>Account</td>
            </tr>
          </thead>
          <tbody>
            {elements &&
              elements.map((element) => {
                const { id, content, isDisabled } = element;
                return (
                  <tr
                    key={id}
                    className={`${
                      isElementSelected(id) ? "selectedElement" : ""
                    }`}
                  >
                    <td>
                      <div className="disabledCheckbox">
                        {!isDisabled && (
                          <Widget
                            src="bos.genadrop.near/widget/Mintbase.MbCheckbox"
                            props={{
                              checked: isElementSelected(id),
                              onChange: (e) => {
                                if (isElementSelected(id)) {
                                  setCheckedList(
                                    checkedList.filter((elm) => elm !== id)
                                  );
                                  return;
                                }
                                setCheckedList([...checkedList, id]);
                              },
                            }}
                          />
                        )}
                        {content}
                      </div>
                    </td>
                    {isDisabled ? (
                      <></>
                    ) : (
                      checkedList.length < 1 && (
                        <td>
                          <div className="flex justify-end w-auto">
                            <span
                              className="cursor-pointer"
                              onClick={() => deleteRow(id)}
                            >
                              <Widget
                                src="bos.genadrop.near/widget/Mintbase.MbIcon"
                                props={{
                                  color: `${
                                    isDarkModeOn ? "blue-300" : "blue-100"
                                  }`,
                                  size: "16px",
                                  name: "delete",
                                }}
                              />
                            </span>
                          </div>
                        </td>
                      )
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </MbTable>
      <div className="footerSection">
        <Footer>
          <div className="leftSection">
            <div className="box">
              <span>Accounts</span>
              <p>{elements?.length}</p>
            </div>
            {checkedList.length > 0 && (
              <div className="box">
                <span>Selected Accounts</span>
                <p>{checkedList?.length}</p>
              </div>
            )}
          </div>
          <div className="rightSection">
            {checkedList.length > 0 && (
              <Widget
                src="bos.genadrop.near/widget/Mintbase.MbAction"
                props={{
                  children: <div>Clear Selection</div>,
                  onClick: () => setCheckedList([]),
                }}
              />
            )}
            {checkedList.length > 0 ? (
              <Widget
                src="bos.genadrop.near/widgetMintbase//MbButton"
                props={{
                  label: "Remove",
                  state: "caution",
                  btnType: "primary",
                  // dropDownItems: props.dropDownItems,
                  onClick: () => props.removeMinters(checkedList),
                }}
              />
            ) : (
              <Widget
                src="bos.genadrop.near/widget/Mintbase.MbButton"
                props={{
                  label: "Add Minters",
                  state: "active",
                  btnType: "primary",
                  // dropDownItems: props.dropDownItems,
                  onClick: () => props.addMinter(),
                }}
              />
            )}
          </div>
        </Footer>
      </div>
    </RowRoot>
  );
};
return { RowSelectList };
