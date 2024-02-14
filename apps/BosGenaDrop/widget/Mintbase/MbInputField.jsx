const {
  id,
  required,
  disabled,
  placeholder,
  label, //string
  hasPercentageLabel,
  value,
  type,
  hasIcon, //boolean
  maxChars, // number
  defaultValue, // number | undefined
  onChange,
  customIcon, // JSX.Element
  ...props
} = props;

const Input = styled.div``;

return (
  <input
    id={id}
    disabled={disabled}
    className="input-field"
    // placeholder={placeholder}
    type="text"
    // value={value}
    // maxLength={maxChars}
    // required={required}
    defaultValue={defaultValue}
    className="input-field"
    onWheel={(e) => {
      if (type !== "number") return;
      e.currentTarget.blur();
    }}
    // onChange={onChange}
    {...props}
  />
);
