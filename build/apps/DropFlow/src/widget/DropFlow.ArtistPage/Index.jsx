const accountId = props.accountId ?? context.accountId;
const isMyProfile = accountId === context.accountId;
const profile = Social.getr(`${accountId}/profile`);
// const themeNumber = profile.theme ?? 0;
const themeNumber = profile.theme ?? 0;
console.log("profile", profile);
console.log("theme", themeNumber);
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
  .portfolio-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    marging-bottom: 2rem;
    .portfolio-tab-main {
      width: 100%;
    }
  }
  .entry {
    // border: 1px solid #e5e8eb;
    border-radius: 10px;
    padding: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .md_txt{
  &>div {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    // cloudy bottom for hidden text
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
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
          // TODO: increment themeNumber by 1 to max 2 and then set it back to 0
          console.log("themeNumber", themeNumber);
          console.log("context", context);
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
