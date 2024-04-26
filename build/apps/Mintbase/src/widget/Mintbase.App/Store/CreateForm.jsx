const { isDarkModeOn, setModalOpen } = props;
const isInModal = props.isInModal ?? true;
const { MbModal } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
) || {
  MbModal: () => <></>,
};
const { deployStore } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.sdk"
);
const { MbInputField } = VM.require(
  "bos.genadrop.near/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};
const [storeName, setStoreName] = useState("");
const [storeSymbol, setStoreSymbol] = useState("");
const [invalidStoreName, setInvalidStoreName] = useState(false);
const CreateStore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: inherit;
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    flex: 1;
  }
  .bottom-buttons {
    display: flex;
    width: 100%;
    align-items: center;
  }
`;
const onDeploy = () => {
  try {
    deployStore({
      storeName,
      storeSymbol,
      accountId: context.accountId,
      isMainnet: true,
    });
  } catch (error) {
    console.error(error);
  }
};
const onStoreNameChange = (e) => {
  setStoreName(e.target.value);
  if (e.target.value.length > 0) {
    setInvalidStoreName(false);
  }
};
const onStoreSymbolChange = (e) => {
  setStoreSymbol(e.target.value);
};
return (
  <CreateStore>
    <div className="form">
      <div className="input">
        <MbInputField
          id="storename"
          placeholder="myfirststore_🔥"
          type="text"
          required={true}
          label="Store Name"
          error={invalidStoreName}
          className="input-field"
          value={storeName}
          isDarkModeOn={isDarkModeOn}
          onChange={onStoreNameChange}
        />
      </div>
      <div className="input">
        <MbInputField
          id="storesymbol"
          placeholder="MFS"
          type="text"
          required={true}
          label="Symbol (max 3 letters)"
          error={storeSymbol.length > 3}
          className="input-field"
          value={storeSymbol}
          isDarkModeOn={isDarkModeOn}
          onChange={onStoreSymbolChange}
        />
      </div>
    </div>
    <div
      className="bottom-buttons"
      style={{
        justifyContent: isInModal ? "space-between" : "center",
      }}
    >
      {isInModal && (
        <div>
          <Widget
            src={`bos.genadrop.near/widget/Mintbase.MbButton`}
            props={{
              label: "Cancel",
              btnType: "secondary",
              size: "medium",
              state: "active",
              onClick: () => setModalOpen(false),
              isDarkModeOn,
            }}
          />
        </div>
      )}
      <div>
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.MbButton`}
          props={{
            label: "Create Store",
            btnType: "primary",
            state: `${
              storeName.length > 0 &&
              storeSymbol.length > 0 &&
              storeSymbol.length <= 3
                ? "active"
                : "disabled"
            }`,
            size: "medium",
            onClick: onDeploy,
            isDarkModeOn,
          }}
        />
      </div>
    </div>
  </CreateStore>
);
