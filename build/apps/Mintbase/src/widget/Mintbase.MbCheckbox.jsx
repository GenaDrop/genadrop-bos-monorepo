const id = props.id;
const label = props.label;
const disabled = props.disabled;
const ref = props.ref;
const checked = props.checked;
const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";
const CheckBox = styled.label`
  display: flex;
  align-items: flex-end;
  input {
    display: none;
  }
  .checkbox-item {
    cursor: pointer;
    border-radius: 4px; /* Assuming rounded */
    border: 1px solid #d1d5db;
    display: flex;
    align-items: center;
    height: 20px;
    width: 20px;
    transition: all 0.5s ease-out 0s;
    justify-content: center;
    &:hover {
      border-color: ${isDarkModeOn ? "#b8c3ef" : "#4f58a3"};
    }
    &.disabled {
      cursor: not-allowed;
      border-color: #d1d5db;
    }
    &.disabled.active {
      border-color: #d1d5db; /* Assuming border-gray-500 */
      background-color: #d1d5db; /* Assuming bg-gray-500 */
    }
  }
  .checkbox-item.active {
    border-color: ${isDarkModeOn
      ? "#b8c3ef"
      : "#4f58a3"}; /* Assuming border-blue-300 */
    background-color: ${isDarkModeOn
      ? "#b8c3ef"
      : "#4f58a3"}; /* Assuming bg-blue-300 */
  }
  .label {
    font-family: "AUTHENTIC Sans 90", sans-serif;
    font-size: 12px;
    line-height: 14px;
    padding-left: 1rem;
    cursor: pointer;
    color: ${isDarkModeOn ? "#fff" : "#000"};
    @media (min-width: 480px) {
      font-size: 14px;
      line-height: 16px;
    }
  }
`;
const MbCheckbox = () => {
  return (
    <CheckBox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        ref={props.ref}
        onChange={props.onChange}
      />
      <div
        className={`checkbox-item ${disabled ? "disabled" : ""} ${
          checked ? "active" : ""
        }`}
        aria-hidden="true"
      >
        {checked && (
          <Widget
            src="bos.genadrop.near/widget/Mintbase.MbIcon"
            props={{
              color: `blue-100`,
              darkColor: "blue-300",
              size: "16px",
              name: "check",
            }}
          />
        )}
      </div>
      <span className="label">{label}</span>
    </CheckBox>
  );
};
return { MbCheckbox };
