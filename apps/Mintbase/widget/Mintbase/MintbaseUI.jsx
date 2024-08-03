const { Widget } = VM.require(
  `${config_account}/widget/Mintbase.${props.WidgetName}`
);
const MintBaseUI = () => {
  return <Widget />;
};

export { MintBaseUI };
