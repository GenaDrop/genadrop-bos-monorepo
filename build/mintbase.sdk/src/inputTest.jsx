const { cssColors, colors, typographyClasses } = VM.require(
  "test.near/widget/Theme"
);

const Theme = styled.div`
  ${cssColors}
`;
const [input, setInput] = useState("");

return (
  <Theme>
    <Widget
      src={"test.near/widget/MbInput"}
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
