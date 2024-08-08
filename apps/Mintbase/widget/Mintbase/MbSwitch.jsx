// const { disabled, label, value, id, checked, ref, onChange } = props;
const { getFontType } = VM.require(`${config_account}/widget/Mintbase.Theme`);

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
    background-color: ${({ checked, isDarkModeOn }) =>
      checked ? "#f3dfe2" : isDarkModeOn ? "#374151" : "#E5E7EB"};
    border-radius: 9999px;
    height: 18px;
    transition: background-color 0.5s ease-in;
  }
  .switch-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: ${({ checked }) => (checked ? "#ba5c60" : "#D1D5DB")};
    border-radius: 9999px;
    width: 22px;
    height: 22px;
    top: 50%;
    transform: translateY(-50%);
    right: ${({ checked }) => (checked ? "0" : "18px")};
    transition: all 0.5s ease-in 0s;
    z-index: 1;
  }
`;

const [checked, setChecked] = useState(false);

return (
  <SwitchContainer>
    <Switch isDarkModeOn={isDarkModeOn} checked={value || checked}>
      <input
        type="checkbox"
        className="switch-checkbox"
        id={id}
        value={value || checked}
        disabled={disabled}
        onChange={() => onChange() || setChecked(!checked)}
      />
      <label className="switch-label" htmlFor={id}>
        <span className="switch-btn">
          <Widget
            src="${config_account}/widget/Mintbase.MbIcon"
            props={{
              name: value || checked ? "check" : "close",
              size: "18px",
            }}
          />
        </span>
      </label>
    </Switch>
    <span style={{ fontSize: "14px" }}>{label}</span>
  </SwitchContainer>
);
