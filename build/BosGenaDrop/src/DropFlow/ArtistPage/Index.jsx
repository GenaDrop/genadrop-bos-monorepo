const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = Social.getr(`${accountId}/profile`);

// const themeNumber = profile.theme ?? 0;
const themeNumber = profile.theme ?? 0;

console.log("profile", profile);

console.log("theme", themeNumber);

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
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
    border-color: #000;
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
              onCommit: () => themeNumber = nextThemeNumber,
            }
          );
        },
      }}
    />
  </Wrapper>
);
