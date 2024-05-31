const Discussions = ({ isDarkModeOn, communityAddress }) => {
  return (
    <>
      <Widget
        key="discussion"
        src="bos.genadrop.near/widget/CPlanet.Group.Index"
        props={{ groupId: communityAddress, isDarkModeOn }}
      />
    </>
  );
};
return { Discussions };
