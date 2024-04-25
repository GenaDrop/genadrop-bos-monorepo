const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !props.profile;
if (profile === null) {
  return "Loading";
}
const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
  * {
    font-family: Helvetica Neue;
    line-height: normal;
  }
`;
return (
  <Wrapper>
    <Widget
      src="bos.genadrop.near/widget/CPlanet.Profile.Large"
      props={{
        accountId,
        profile,
        link: true,
        fast,
        showEditButton: !props.profile,
      }}
    />
    <Widget
      src="bos.genadrop.near/widget/CPlanet.ProfilePage.Tabs"
      props={{ accountId, profile }}
    />
  </Wrapper>
);
