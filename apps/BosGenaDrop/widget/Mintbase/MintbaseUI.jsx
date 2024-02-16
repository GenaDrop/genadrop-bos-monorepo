const MintBaseUI = (Widget) => {
  const { Widget } = VM.require(`bos.genadrop.near/widget/Mintbase.${Widget}`);
  return <Widget />;
};

export { MintBaseUI };
