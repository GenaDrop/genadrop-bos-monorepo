const accountId = props.accountId || "bos.genadrop.near";

const { getFontType } = VM.require(`${accountId}/widget/Mintbase.Theme`);

const { label, isChecked, disabled, handleClick } = props;

const MbChip = styled.div`
    .chip {
        padding: 8px 32px; /* py-8 px-32 */
        background-color: ${
          isDarkModeOn ? "rgba(59, 130, 246, 0.35)" : "rgba(66, 153, 225, 0.15)"
        }; /* dark:bg-blue-100-35 or bg-blue-300-15 with opacity */
        border-radius: 9999px; /* rounded-full */
        width: max-content; /* w-max */
        cursor: pointer; /* cursor-pointer */
        position: relative;
        display: flex;
        align-items: center;
    }
    .chip.icon {
        absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 8px;
    }
    .chip.active {
        background-color: ${
          isDarkModeOn ? "#A5B4FC" : "#93C5FD"
        }; /* bg-blue-100 or bg-blue-300 */
        transition: all 0.5s ease-in 0s;
    }
    .chip.disabled {
        background-color: ${
          isDarkModeOn ? "#374151" : "#E5E7EB"
        }; /* bg-gray-800 or bg-gray-200 */
        cursor: not-allowed; /* cursor-not-allowed */
      }
    
    .chip.active.disabled {
        background-color: ${
          isDarkModeOn ? "#4B5563" : "#4B5563"
        }; /* bg-gray-500 */
      }
    .label {
        ${getFontType("big")};
        padding-top: 0.25rem;
        &.checked {
            color: ${isDarkModeOn ? "#FFF" : "#000"}; 
        }
        &.unchecked {
            color: ${isDarkModeOn ? "#A5B4FC" : "#93C5FD"};
        }
    }
`;

return (
  <MbChip>
    <div
      className={`chip ${isChecked ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={() => {
        if (disabled) return;
        handleClick();
      }}
    >
      {isChecked && (
        <div className="icon">
          <Widget
            src={`${accountId}/widget/Mintbase.MbIcon`}
            props={{ name: "check" }}
          />
        </div>
      )}
      <div className={`label ${isChecked ? "checked" : "unchecked"}`}>
        {label}
      </div>
    </div>
  </MbChip>
);
