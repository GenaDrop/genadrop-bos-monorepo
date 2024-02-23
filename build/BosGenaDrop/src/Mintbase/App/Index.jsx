const accountId = props.accountId ?? "bos.genadrop.near";

const [mode, setMode] = useState("light");

const App = styled.div`
  background: ${mode === "dark" ? "#101223" : ""};
`;

const Home = styled.div`
  background-image: url("https://ipfs.near.social/ipfs/bafybeidhpspbm4suqwfdkcoip4vkzxlwnmikev46yp26dosxgehqdhcgsu");
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(
    0,
    0,
    0,
    0.4
  ); /* Adjust opacity (last value) as needed */
`;

const Content = styled.div`
  z-index: 999;
  position: relative;
`;

return (
  <App>
    <Home>
      <Overlay />
      <Content>
        <Widget
          src={`${accountId}/widget/Mintbase.App.Navbar.Index`}
          props={{ mode }}
        />
        <Widget
          src={`${accountId}/widget/Mintbase.App.Home.Index`}
          props={{ mode }}
        />
      </Content>
    </Home>
    <Widget
      src={`${accountId}/widget/Mintbase.App.Footer.Index`}
      props={{ mode, setMode }}
    />
  </App>
);
