const { MbInputField } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
) || {
  MbInputField: () => <></>,
};
const CreateCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .bottom-buttons {
    display: flex;
    position: absolute;
    bottom: 48px;
    right: 24px;
    width: calc(100% - 48px);
    justify-content: space-between;
    align-items: center;
  }
`;

const CreateStore = ({
  storeName,
  storeSymbol,
  storeNameError,
  onStoreNameChange,
  onStoreSymbolChange,
  onDeploy,
  onCancel,
  isDarkModeOn,
  mode,
}) => (
  <CreateCard>
    <div className="form">
      <div className="d-flex flex-column align-items-center">
        <MbInputField
          placeholder="This is trial button"
          type="text"
          required={true}
          label="Trial"
          count={count}
          error={false}
          hasPercentageLabel={true}
          maxChars={10}
          className="input-field"
          // disabled={true}
          id="trial"
          value={trialText}
          isDarkModeOn={isDarkModeOn}
          onChange={handleTrialTextChange}
        />
      </div>
      <div className="input">
        <MbInputField
          id="storename"
          placeholder="myfirststore"
          type="text"
          required={true}
          label="Store Name"
          error={storeNameError}
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
    <div className="bottom-buttons">
      <div>
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.MbButton`}
          props={{
            label: "Cancel",
            btnType: "secondary",
            size: "medium",
            onClick: onCancel,
            mode,
          }}
        />
      </div>
      <div>
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.MbButton`}
          props={{
            label: "Create Store",
            btnType: "primary",
            disabled: true,
            size: "medium",
            onClick: onDeploy,
            mode,
          }}
        />
      </div>
    </div>
  </CreateCard>
);

return { CreateStore };
