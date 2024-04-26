const accountId = props.accountId || "bos.genadrop.near";
// const { disabled, label, value, id, checked, ref, onChange } = props;
const { getFontType } = VM.require(`${accountId}/widget/Mintbase.Theme`);
const { disabled, label, value, id, onChange, isDarkModeOn } = props;
const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
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
const [checked, setChecked] = useState(false);
return (
  <SwitchContainer>
    <Switch>
      <input
        type="checkbox"
        className="switch-checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={() => {
          setChecked(!checked);
          onChange(!checked);
        }}
      />
      <label className="switch-label" htmlFor={id}>
        <span className="switch-btn">
          <Widget
            src="bos.genadrop.near/widget/Mintbase.MbIcon"
            props={{
              name: checked ? "check" : "close",
              size: "18px",
            }}
          />
        </span>
      </label>
    </Switch>
    <span style={{ fontSize: "14px" }}>{label}</span>
  </SwitchContainer>
);
