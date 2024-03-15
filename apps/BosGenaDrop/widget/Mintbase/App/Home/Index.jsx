const accountId = props.accountId ?? "bos.genadrop.near";

const mode = props.mode;

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

const TableContent = styled.div`
  margin-top: 300px;
`;

return (
  <>
    <Home>
      <Overlay />
      <Content>
        <Widget
          src={`${accountId}/widget/Mintbase.App.Hero.Index`}
          props={{ mode }}
        />
      </Content>
    </Home>
    <TableContent>
      <Widget
        src={`${accountId}/widget/Mintbase.App.Home.HomeTable`}
        props={{ mode }}
      />
    </TableContent>
    <Widget
      src={`${accountId}/widget/Mintbase.App.Home.HomeSmartContract`}
      props={{ mode }}
    />
    <Widget
      src={`${accountId}/widget/Mintbase.App.Home.HomeCreators`}
      props={{ mode }}
    />
    <Widget
      src={`${accountId}/widget/Mintbase.App.Home.HomePurchase`}
      props={{ mode }}
    />
  </>
);
