const { MbCharCounter } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);
const EControlStatus = {
  NORMAL: "normal",
  VALID: "valid",
  INVALID: "invalid",
};
const inputSize = props.inputSize || "medium";
const controlStatus = props.controlStatus || "normal";
const Label = styled.div`
  display: block;
  margin-bottom: 8px;
  color: #000;
  &.dark {
    color: #fff;
  }
`;
const Asterisk = styled.span`
  color: #c74c4c;
  &.dark {
    color: #ed5a5a;
  }
`;
const Container = styled.div`
  .main-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.25rem;
    &.disabled {
      background: #d2d4da;
    }
    &.disabled-dark {
      background: #404252;
    }
    &.default {
      transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
      background: #f3f4f8;
      :hover {
        background: #ebedfb;
      }
      :focus-within {
        box-shadow: 0 0 0 1px #c5d0ff;
      }
    }
    &.default-dark {
      transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
      background: #101223;
      :hover {
        background: #070c2b;
      }
      :focus-within {
        box-shadow: 0 0 0 1px #c5d0ff;
      }
    }
    &.empty:focus-within {
      box-shadow: 0 0 0 1px #1aa7ec;
    }
    &.valid {
      box-shadow: 0 0 0 1px #1aa7ec;
    }
    &.invalid {
      box-shadow: 0 0 0 1px #ed5a5a;
      :focus-within {
        box-shadow: 0 0 0 1px #ed5a5a;
      }
    }
  }
  .input-wrapper {
    padding: 10px;
    max-height: 34px;
    @media (min-width: 480px) {
      padding: 12px;
      max-height: 40px;
    }
  }
`;
const InputField = styled.div`
  display: flex;
  width: 100%;
  background: transparent;
  .input-field {
    outline: none;
    border: none;
    background: transparent;
    width: 100%;
    :focus {
      outline: none;
      outline-offset: 2px;
    }
  }
  .dark-btn {
    color: #fff;
    ::placeholder {
      color: var(--gray-400, #9496a1);
    }
  }
  .light-btn {
    color: #000;
    ::placeholder {
      color: #777986;
    }
  }
  .percentage-label {
    color: #777986;
  }
`;
const MbInputField = ({
  id,
  required,
  disabled,
  placeholder,
  label, //string
  hasPercentageLabel,
  value,
  type,
  error,
  count,
  hasIcon, //boolean
  maxChars, // number
  defaultValue, // number | undefined
  onChange,
  customIcon, // JSX.Element
  className,
  style,
  isDarkModeOn,
}) => {
  const wrapperClasses =
    disabled && isDarkModeOn
      ? "disabled-dark"
      : disabled && !isDarkModeOn
      ? "disabled"
      : !disabled && error
      ? "invalid"
      : !disabled && isDarkModeOn
      ? "default-dark"
      : "default";
  return (
    <Container className={className} style={style}>
      {label && (
        <Label className={isDarkModeOn && "dark"} style={style}>
          {label}
          {required && (
            <Asterisk className={isDarkModeOn && "dark"}> *</Asterisk>
          )}
        </Label>
      )}
      <div
        className={`main-input input-wrapper ${wrapperClasses} ${controlStatus}`}
      >
        <InputField key={`input-container-${id}`}>
          <input
            id={id}
            key={`input-field-${id}`}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            type={type}
            maxLength={maxChars}
            className={`${className} ${
              isDarkModeOn ? "dark-btn" : "light-btn"
            }`}
            onWheel={(e) => {
              if (type !== "number") return;
              e.currentTarget.blur();
            }}
            onChange={onChange}
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
                  size: "20px",
                  color: "success-300",
                  darkColor: "success-100",
                }}
              />
            ) : controlStatus === EControlStatus.INVALID ? (
              <Widget
                src="bos.genadrop.near/widget/Mintbase.MbIcon"
                props={{
                  name: "error",
                  size: "20px",
                  color: "error-300",
                  darkColor: "error-100",
                }}
              />
            ) : (
              <Widget
                src="bos.genadrop.near/widget/Mintbase.MbIcon"
                props={{
                  name: "info",
                  size: "20px",
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
        <MbCharCounter
          counter={count}
          inputSize={inputSize}
          maxChars={maxChars}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};
return {
  MbInputField,
};
