const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = Social.getr(`${accountId}/profile`);

const themeNumber = profile.theme ?? 0;

console.log("theme", themeNumber);
return (
  <div>
    <Widget
      src={`bos.genadrop.near/widget/DropFlow.ArtistPage.theme${themeNumber}`}
      props={{
        profile,
        accountId,
      }}
    />
  </div>
);
