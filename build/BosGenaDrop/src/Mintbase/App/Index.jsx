const accountId = props.accountId ?? "bos.genadrop.near";

const [mode, setMode] = useState("light");

const App = styled.div`
  background: ${mode === "dark" ? "#101223" : "#f3f5f9"};
`;

return (
  <App>
    <Widget
      src={`${accountId}/widget/Mintbase.App.Home.Index`}
      props={{ mode }}
    />
    <Widget
      src={`${accountId}/widget/Mintbase.App.Footer.Index`}
      props={{ mode, setMode }}
    />
  </App>
);
