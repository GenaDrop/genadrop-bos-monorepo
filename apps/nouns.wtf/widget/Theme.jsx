const cssFont1 = fetch(
  "https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap"
).body;
const cssFont2 = fetch("https://fonts.cdnfonts.com/css/pt-root-ui").body;

const Theme = styled.div`
  ${cssFont1}
  ${cssFont2}

  --brand-bg-green: #edf2f0;
  --brand-dark-red: #d63c5e;
  --brand-light-green: #6da886;
  --brand-black: #212529;
  /* Colors from Figma  */
  --brand-cool-background: #d5d7e1;
  --brand-cool-border: rgb(189, 192, 207);
  --brand-cool-dark-text: #151c3b;
  --brand-cool-light-text: #79809c;
  --brand-cool-accent: #e9ebf3;
  --brand-warm-background: #e1d7d5;
  --brand-warm-border: rgb(207, 189, 186);
  --brand-warm-dark-text: #221b1a;
  --brand-warm-light-text: #8f7e7c;
  --brand-warm-accent: #f9f1f1;
  --brand-gray-dark-text: #14161b;
  --brand-gray-border: #e2e3eb;
  --brand-gray-background: #f4f4f8;
  --brand-gray-light-text: #8c8d92;
  --brand-gray-light-text-translucent: rgb(140, 141, 146, 0.1);
  --brand-gray-hover: #fafafb;
  --brand-color-red: #e40536;
  --brand-color-blue: #4965f0;
  --brand-color-green: #43b369;
  --brand-color-red-translucent: rgba(214, 60, 94, 0.1);
  --brand-color-blue-translucent: rgba(73, 101, 240, 0.1);
  --brand-color-green-translucent: rgba(67, 179, 105, 0.1);
  --brand-color-blue-darker: #3a52c7;
`;

return <Theme>{props.children}</Theme>;
