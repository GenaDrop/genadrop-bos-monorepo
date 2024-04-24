const elements = props.elements;
const deleteRow = props.deleteRow;
const addMinter = props.addMinter;
const removeMinters = props.removeMinters;

const MbRowList = () => {
  return (
    <Widget
      src="bos.genadrop.near/widget/Mintbase.RowSelectList"
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
