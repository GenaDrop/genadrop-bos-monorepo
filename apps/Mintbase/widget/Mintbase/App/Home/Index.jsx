const { DisplayHomeContracts } = VM.require(
  "${config_account}/widget/Mintbase.App.Hero.DisplayHomeContracts"
) || {
  DisplayHomeContracts: () => <></>,
};

const HomePage = ({ isDarkModeOn, connectedDao }) => {
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
    margin-top: 250px;
    @media (min-width: 700px) {
      margin-top: 300px;
    }
  `;

  const HomeApp = styled.div`
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 500px) {
      padding: 10px;
    }
  `;

  return (
    <HomeApp>
      {context.accountId ? (
        <Content>
          <DisplayHomeContracts
            isLoggedIn={context.accountId}
            connectedDao={connectedDao}
            isDarkModeOn={isDarkModeOn}
          ></DisplayHomeContracts>
          <Widget
            src={`${config_account}/widget/Mintbase.App.Hero.Index`}
            props={{ isDarkModeOn, connectedDao: connectedDao }}
          />
        </Content>
      ) : (
        <Home>
          <Overlay />
          <Content>
            <DisplayHomeContracts
              isLoggedIn={context.accountId}
              connectedDao={connectedDao}
              isDarkModeOn={isDarkModeOn}
            ></DisplayHomeContracts>
            <Widget
              src={`${config_account}/widget/Mintbase.App.Hero.Index`}
              props={{ isDarkModeOn }}
            />
          </Content>
        </Home>
      )}

      <TableContent>
        <Widget
          src={`${config_account}/widget/Mintbase.App.Home.HomeTables`}
          props={{ isDarkModeOn }}
        />
      </TableContent>
      <Widget
        src={`${config_account}/widget/Mintbase.App.Home.HomeSmartContract`}
        props={{
          isDarkModeOn,
          accountId: context.accountId,
          connectedDao: connectedDao,
        }}
      />
      <Widget
        src={`${config_account}/widget/Mintbase.App.Home.HomeCreators`}
        props={{ isDarkModeOn }}
      />
      <Widget
        src={`${config_account}/widget/Mintbase.App.Home.HomePurchase`}
        props={{ isDarkModeOn }}
      />
    </HomeApp>
  );
};

return <HomePage {...props} />;
