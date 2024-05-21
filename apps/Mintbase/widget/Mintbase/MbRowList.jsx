const elements = props.elements;
const deleteRow = props.deleteRow;
const addMinter = props.addMinter;
const removeMinters = props.removeMinters;

const MbRowList = () => {
  return (
    <Widget
      src="${config_account}/widget/Mintbase.RowSelectList"
      props={{
        elements,
        deleteRow,
        addMinter,
        removeMinters,
      }}
    />
  );
};

return { MbRowList };
