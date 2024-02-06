const accountId = props.accountId ?? context.accountId;
const isMyProfile = accountId === context.accountId;

const profile = Social.getr(`${accountId}/profile`);

const themeNumber = profile.theme ?? 0;

const showThemeButton = profile.theme;

const createText = profile.theme ? "Edit Page" : "Create Your Page";

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  justify-content: center;
  h1 {
    font-size: 32px;
    font-weight: 600;
  }
  span {
    color: #b0b0b0;
    font-size: 14px;
  }
`;

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
  max-width: 1400px;
  margin-right: auto;
  margin-left: auto;
  * {
    font-family: Helvetica Neue;
    line-height: normal;
  }
  .btn {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background-color: #fff;
    border-color: #000;
    color: #000;
    :hover {
      background-color: #000;
      border-color: #000;
      color: #fff;
    }
  }
  .btn-outline-primary {
    background-color: #000;
    border-color: #fff;
    color: #fff;
    :hover {
      background-color: #fff;
      border-color: #000;
      color: #000;
    }
  }
  .hashtags {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: scroll;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;

if (!accountId) {
  return <Loading>No account ID, Please Signin with near account</Loading>;
}
return (
  <Wrapper>
    <Widget
      src={`bos.genadrop.near/widget/DropFlow.ArtistPage.theme${themeNumber}`}
      props={{
        profile,
        accountId,
        onChangeTheme: () => {
          const nextThemeNumber = (themeNumber + 1) % 3;
          Social.set(
            {
              profile: {
                theme: nextThemeNumber,
              },
            },
            {
              onCommit: () => (themeNumber = nextThemeNumber),
            }
          );
        },
        createText,
        showThemeButton,
      }}
    />
  </Wrapper>
);
