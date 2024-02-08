const { getCharsCounterSize } = VM.require("test.near/widget/Theme");

const { inputSize, maxChars, counter } = props;
const mode = Storage.get("mode") || props.mode;

const IsDarkModeOn = mode === "dark";

const color =
  "color:" + IsDarkModeOn ? "var(--error-100);" : "var(--error-300);";

const Container = styled.div`
  text-align: right;
  ${getCharsCounterSize(inputSize)}
  ${counter === maxChars ? color : IsDarkModeOn ? "color: white;" : ""}
  padding-top: 8px;
`;

return (
  <Container>
    {counter}/{maxChars}
  </Container>
);