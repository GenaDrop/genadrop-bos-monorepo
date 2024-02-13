const accountId = props.accountId || 'bos.genadrop.near'
bos.genadrop.near
const { cssColors, colors, typographyClasses } = VM.require(
  "bos.genadrop.near/widget/Theme"
);

const Theme = styled.div`
  ${cssColors}
`;
const [input, setInput] = useState("");

return (
  <Theme>bos.genadrop.near
    <Widget
      src={"bos.genadrop.near/widget/MbInput"}
      props={{
        id: "testset",
        required: true,
        placeholder: "Enter Address",
        label: "Address",
        hasPercentageLabel: true,
        value: input,
        onChange: (e) => {
          setInput(e.target.value);
        },
        type: "text",
        hasIcon: false,
        maxChars: 20,
      }}
    />
  </Theme>
);
