const accountId = props.accountId || "bos.genadrop.near";
const { disabled, label, value, id, checked, ref, onChange } = props;
const { getFontType } = VM.require(`${accountId}/widget/Mintbase.Theme`);
const mode = props.mode || Storage.get("mode");
const IsDarkModeOn = mode === "dark";
const RadioButton = styled.div`
  display: flex;
  align-items: center;
  display: inline-block;
  position: relative;
  padding: 0 6px;
  input[type="radio"] {
    display: none;
    cursor: pointer;
  }
  label:before {
    content: " ";
    display: inline-block;
    position: relative;
    border: 2px solid ${isDarkModeOn ? "#4B5563" : "#E5E7EB"}; /* border-gray-200 or border-gray-700 */
    border-radius: 9999px;
    width: 1.25rem; /* w-5 */
    height: 1.25rem; /* h-5 */
    cursor: pointer;
    top: 5px;
  }
  input[type="radio"]:checked + label:before {
    border-color: ${isDarkModeOn
      ? "#A5B4FC"
      : "#93C5FD"}; /* border-blue-300 or border-blue-100 */
  }
  input[type="radio"]:checked + label:after {
    content: " ";
    display: block;
    position: absolute;
    width: 0.75rem; /* w-3 */
    height: 0.75rem; /* h-3 */
    border-radius: 9999px;
    border: 2px solid ${isDarkModeOn ? "#A5B4FC" : "#93C5FD"}; /* border-blue-300 or border-blue-100 */
    background-color: ${isDarkModeOn
      ? "#A5B4FC"
      : "#93C5FD"}; /* bg-blue-300 or bg-blue-100 */
    cursor: pointer;
    top: 9px;
    left: 10px;
  }
  &disabled label:before,
  &disabled input[type="radio"]:checked + label:before {
    border-color: ${isDarkModeOn
      ? "#374151"
      : "#E5E7EB"}; /* border-gray-150 or border-gray-800 */
    cursor: not-allowed;
  }
  &.disabled input[type="radio"]:checked + label:after {
    border-color: ${isDarkModeOn
      ? "#374151"
      : "#E5E7EB"}; /* border-gray-150 or border-gray-800 */
    background-color: ${isDarkModeOn
      ? "#374151"
      : "#E5E7EB"}; /* bg-gray-150 or bg-gray-800 */
    cursor: not-allowed;
  }
  &disabled input[type="radio"],
  &disabled span {
    cursor: not-allowed;
  }
  .labelText {
    ${getFontType("medium")};
    padding-left: 1rem;
    color: ${isDarkModeOn ? "white" : "#000"} !important;
    cursor: pointer;
  }
`;
const MbRadioButton = () => {
  return (
    <RadioButton>
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
      />
      <label htmlFor={id}>
        <span className="labelText">{label}</span>
      </label>
    </RadioButton>
  );
};
return { MbRadioButton };
