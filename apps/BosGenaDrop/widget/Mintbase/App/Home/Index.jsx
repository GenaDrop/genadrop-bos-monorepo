const accountId = props.accountId ?? "bos.genadrop.near";

const { isDarkModeOn } = props;

const Home = styled.div`
  background-image: url("https://ipfs.near.social/ipfs/bafybeihjswj7zrr26jknsnl35okiy7ecusbhv6sc535gon7kkdxibffg4i");
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
  background-color: rgba(7, 12, 43, 0.6);
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
          props={{ isDarkModeOn }}
        />
      </Content>
    </Home>
    <TableContent>
      <Widget
        src={`${accountId}/widget/Mintbase.App.Home.HomeTable`}
        props={{ isDarkModeOn }}
      />
    </TableContent>
    <Widget
      src={`${accountId}/widget/Mintbase.App.Home.HomeSmartContract`}
      props={{ isDarkModeOn }}
    />
    <Widget
      src={`${accountId}/widget/Mintbase.App.Home.HomeCreators`}
      props={{ isDarkModeOn }}
    />
    <Widget
      src={`${accountId}/widget/Mintbase.App.Home.HomePurchase`}
      props={{ isDarkModeOn }}
    />
  </>
);
