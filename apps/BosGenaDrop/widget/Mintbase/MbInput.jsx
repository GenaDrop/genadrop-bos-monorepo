const { getInputLabelFontType, getFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.Theme"
);

const EControlStatus = {
  NORMAL: "normal",
  VALID: "valid",
  INVALID: "invalid",
};

const {
  id,
  required,
  disabled,
  customStyle,
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

const inputSize = props.inputSize || "medium";
const controlStatus = props.controlStatus || "normal";
const initialCounter = props.initialCounter || 0;
const mode = props.mode || Storage.get("mode");

const IsDarkModeOn = mode === "dark";

const [count, setCount] = useState(initialCounter);

const getIconSize = () => {
  return inputSize === "big" ? "24px" : "20px";
};

const Label = styled.div`
  display: block;
  margin-bottom: 8px;
  ${IsDarkModeOn ? "color: white;" : ""}
  ${getInputLabelFontType(inputSize)}
`;

const Asterisk = styled.span`
  color: ${IsDarkModeOn ? "var(--error-100)" : "var(--error-300)"};
`;

const Container = styled.div`
  .main-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.25rem;
    ${customStyle}
    &.disabled {
      background: ${IsDarkModeOn ? "var(--gray-700)" : "var(--gray-200)"};
    }
    &.default {
      /* @apply   focus-within:ring-1 transition-all duration-500; */
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 500ms;
      background: ${IsDarkModeOn ? "var(--gray-900)" : "var(--gray-100)"};
      :hover {
        background: ${IsDarkModeOn
          ? "var(--mb-blackblue)"
          : "var(--blue-300-15)"};
      }
      :focus-within {
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
          var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
          calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000);
      }
    }
    &.empty:focus-within {
      ${IsDarkModeOn
        ? ` --tw-ring-opacity: 1;
            --tw-ring-color: var(--blue-100-35);`
        : `
            --tw-ring-opacity: 1;
            --tw-ring-color:  var(--blue-300-35);
        `}
    }
    &.valid {
      --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
        var(--tw-ring-offset-width) var(--tw-ring-offset-color);
      --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
        calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
      ${IsDarkModeOn
        ? ` --tw-ring-opacity: 1;
            --tw-ring-color: var(--success-100);`
        : `
            --tw-ring-opacity: 1;
            --tw-ring-color: var(--success-300);
        `}
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
        var(--tw-shadow, 0 0 #0000);
    }
    &.invalid {
      ${IsDarkModeOn
        ? ` --tw-ring-opacity: 1;
            --tw-ring-color: var(--error-100);`
        : `
            --tw-ring-opacity: 1;
            --tw-ring-color: var(--error-300);
        `}
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
        var(--tw-shadow, 0 0 #0000);
    }
  }
  .input-wrapper.big {
    padding: 12px;
    max-height: 40px;
    @media (min-width: 480px) {
      padding: 16px;
      max-height: 48px;
    }
  }
  .input-wrapper.medium {
    padding: 10px;
    max-height: 34px;
    @media (min-width: 480px) {
      padding: 12px;
      max-height: 40px;
    }
  }
  .input-wrapper.small {
    padding: 10px;
    max-height: 34px;
  }
  .input-wrapper {
    width: 100%;
  }
`;

const InputField = styled.div`
  display: flex;
  width: 100%;
  .input-field {
    outline: none;
    border: none;
    background: transparent;
    color: black;
    width: 100%;
    ${getFontType(inputSize)}
    :focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    ::placeholder {
      color: ${isDarkModeOn ? "white" : "var(--gray-500)"};
    }
  }
  .percentage-label {
    ${getFontType(inputSize)}
    color: var(--gray-500);
  }
`;

const handleChange = (e) => {
  if (maxChars) {
    setCount(e.target.value.length);
  }
  if (!onChange) return;
  console.log(e);

  onChange(e);
};

return (
  <Container>
    {label && (
      <Label>
        {label}
        {required && <Asterisk> *</Asterisk>}
      </Label>
    )}
    <div
      className={`main-input input-wrapper ${inputSize} ${
        disabled ? "disabled" : "default"
      } ${controlStatus}`}
    >
      <InputField>
        <input
          disabled={disabled}
          placeholder={placeholder}
          type="text"
          // value={value}
          maxLength={maxChars}
          required={required}
          defaultValue={defaultValue}
          className="input-field"
          onWheel={(e) => {
            if (type !== "number") return;
            e.currentTarget.blur();
          }}
          onChange={handleChange}
          {...props}
        />
        {hasPercentageLabel && <span className="percentage-label">%</span>}
      </InputField>

      {hasIcon && (
        <div className="flex">
          {controlStatus === EControlStatus.VALID ? (
            <Widget
              src="bos.genadrop.near/widget/Mintbase.MbIcon"
              props={{
                name: "success",
                size: getIconSize(),
                color: "success-300",
                darkColor: "success-100",
              }}
            />
          ) : controlStatus === EControlStatus.INVALID ? (
            <Widget
              src="bos.genadrop.near/widget/Mintbase.MbIcon"
              props={{
                name: "error",
                size: getIconSize(),
                color: "error-300",
                darkColor: "error-100",
              }}
            />
          ) : (
            <Widget
              src="bos.genadrop.near/widget/Mintbase.MbIcon"
              props={{
                name: "info",
                size: getIconSize(),
                color: "blue-300",
                darkColor: "blue-100",
              }}
            />
          )}
        </div>
      )}
      {!!customIcon && !hasIcon && customIcon}
    </div>
    {maxChars ? (
      <Widget
        src="bos.genadrop.near/widget/Mintbase.MbCharCounter"
        props={{
          counter: count,
          inputSize: inputSize,
          maxChars: maxChars,
        }}
      />
    ) : (
      <></>
    )}
  </Container>
);

/* <Widget
          src="bos.genadrop.near/widget/MbInputField"
          props={{
            id: id,
            disabled: disabled,
            placeholder: placeholder,
            type: "text",
            value: count,
            maxLength: maxChars,
            required: required,
            defaultValue: defaultValue,
            className: "input-field",
            onWheel: (e) => {
              if (type != "number") return;
              e.currentTarget.blur();
            },
            onChange: handleChange,
            ...props,
          }}
        /> */
