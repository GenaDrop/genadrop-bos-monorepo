const accountId = props.accountId || "bos.genadrop.near";
const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";
const Tag = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    border-radius: 9999px; /* rounded-full */
    width: max-content; /* w-max */
    position: relative;
    background-color: ${isDarkModeOn ? "#1F2937" : "#FFFFFF"};
    padding: 6px 12px; /* py-6 px-12 */
    .tag {
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 12px;
        line-height: 14px;
        color: ${isDarkModeOn ? "#fff" : "#000"};
        @media (min-width: 480px) {
                font-size: 14px;
                line-height: 16px;
        }
    }
    .cancel {
        cursor-pointer;
    }
`;
const MbTag = () => {
  return (
    <Tag>
      <div className="tag">{props?.children}</div>
      <div onClick={() => props.removeTag()} className="cancel">
        <Widget
          src={`${accountId}/widget/Mintbase.MbIcon`}
          props={{ name: "close" }}
        />
      </div>
    </Tag>
  );
};
return { MbTag };
