const { MbModal } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
) || {
  MbModal: () => <></>,
};

const Root = styled.div`
  padding: 1em;
  border: 2px dashed #525c76;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 2em;
  margin: 10px auto;
  height: 293px;
  max-width: 600px;
  width: 100%;
`;

// const [storeName, setStoreName] = useState("");
// const [storeSymbol, setStoreSymbol] = useState("");
// const [open, setOpen] = useState(false);

const CreateStoreCard = ({ isDarkModeOn, onClick }) => (
  <Root>
    <Widget
      src={`bos.genadrop.near/widget/Mintbase.MbButton`}
      props={{
        label: "Create Store",
        btnType: "primary",
        size: "big",
        onClick,
        isDarkModeOn,
      }}
    />
  </Root>
);

return {
  CreateStoreCard,
};
