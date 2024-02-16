const accountId = props.accountId || "bos.genadrop.near";

const { disabled, label, value, id, checked, ref, onChange } = props;
const { getFontType } = VM.require(`${accountId}/widget/Mintbase.Theme`);
const mode = props.mode || Storage.get("mode");

const IsDarkModeOn = mode === "dark";

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  input[type="checkbox"] {
    display: none;
    cursor: pointer;
  }
  .switch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    background-color: ${isDarkModeOn
      ? "#374151"
      : "#E5E7EB"}; /* bg-gray-150 or bg-gray-700 */
    border-radius: 9999px; /* rounded-full */
    height: 18px;
  }
  .switch-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: ${isDarkModeOn
      ? "#4B5563"
      : "#D1D5DB"}; /* bg-gray-300 or bg-gray-600 */
    border-radius: 9999px; /* rounded-full */
    width: 22px;
    height: 22px;
    top: 50%;
    transform: translateY(-50%);
    right: 18px;
    transition: all 0.5s ease-in 0s;
    z-index: 1;
  }
`;

const MbSwitch = () => {
  return (
    <Switch>
      <input
        type="checkbox"
        className="switch-checkbox"
        id={id}
        checked={checked}
        ref={ref}
        disabled={disabled}
        onChange={onChange}
      />
      <label className="switch-label" htmlFor={id}>
        <span className="switch-btn">
          <Widget
            src="bos.genadrop.near/widget/Mintbase.MbIcon"
            props={{
              name: checked ? "check" : "close",
            }}
          />
        </span>
      </label>
    </Switch>
  );
};

return { MbSwitch };
