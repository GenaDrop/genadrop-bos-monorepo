const { Widget } = VM.require(
  `bos.genadrop.near/widget/Mintbase.${props.WidgetName}`
);
const MintBaseUI = () => {
  return <Widget />;
};
export { MintBaseUI };
