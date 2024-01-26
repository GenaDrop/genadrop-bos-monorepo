const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = Social.getr(`${accountId}/profile`);
const fast = !profile;

if (profile === null) {
  return "Loading";
}

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
  * {
    font-family: Helvetica Neue;
    line-height: normal;
  }
  .btn {
    border-radius: 32px;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
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
      src="/*__@appAccount__*//widget/CPlanet.Profile.Large"
      props={{
        accountId,
        profile,
        link: true,
        fast,
        showEditButton: !props.profile,
      }}
    />
    <Widget
      src="/*__@appAccount__*//widget/CPlanet.ProfilePage.Tabs"
      props={{ accountId, profile }}
    />
  </Wrapper>
);
