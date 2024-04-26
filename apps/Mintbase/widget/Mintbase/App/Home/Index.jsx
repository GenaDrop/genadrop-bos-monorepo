const accountId = props.accountId ?? "bos.genadrop.near";

const HomePage = ({ isDarkModeOn }) => {
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
    z-index: 0;
    background-color: rgba(7, 12, 43, 0.6);
  `;

  const Content = styled.div`
    z-index: 0;
    position: relative;
  `;

  const TableContent = styled.div`
    margin-top: 300px;
  `;
  return (
    <>
      {context.accountId ? (
        <Content>
          <Widget
            src={`${accountId}/widget/Mintbase.App.Hero.Index`}
            props={{ isDarkModeOn }}
          />
        </Content>
      ) : (
        <Home>
          <Overlay />
          <Content>
            <Widget
              src={`${accountId}/widget/Mintbase.App.Hero.Index`}
              props={{ isDarkModeOn }}
            />
          </Content>
        </Home>
      )}

      <TableContent>
        <Widget
          src={`${accountId}/widget/Mintbase.App.Home.HomeTables`}
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
};

return <HomePage {...props} />;
