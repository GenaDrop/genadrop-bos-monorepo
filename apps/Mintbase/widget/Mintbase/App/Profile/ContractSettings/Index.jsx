const { MbInputField } = VM.require(
  "bos.genadrop.near/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};
const { checkStoreOwner, saveBasicSettings } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.sdk"
) || {
  checkStoreOwner: () => <></>,
  saveBasicSettings: () => <></>,
};

const SettingsRoot = styled.div`
  background: #f9f9f9;
  padding: 24px;
  h2 {
    font-size: 16px;
    font-weight: bold;
  }
`;

const Basic = styled.div`
  background: white;
  padding: 12px;
  margin-bottom: 20px;

  .fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
    button {
      width: 100px;
      align-self: center;
      background-color: black;
      border-color: black;
      &:hover {
        background: white;
        color: black;
      }
    }
  }
`;

const ContractSettings = ({ isDarkModeOn, contractId }) => {
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [isStoreOwner, setIsStoreOwner] = useState("");

  useEffect(() => {
    checkStoreOwner(contractId, context.accountId)
      .then((data) => setIsStoreOwner(data))
      .catch((error) => {
        console.error("in contracts", error);
      });
  }, []);
  const handleSaveBasics = () => {
    if (!isStoreOwner) return;
    const payload = {
      storeName,
      storeDescription,
    };
    saveBasicSettings(payload, contractId).then((data) => console.log(data));
  };

  const onStoreNameChange = (e) => {
    setStoreName(e.target.value);
  };

  const onStoreDescriptionChange = (e) => {
    setStoreDescription(e.target.value);
  };

  return (
    <SettingsRoot>
      <Basic>
        <h2>Basic Information</h2>
        <div className="fields">
          <MbInputField
            className="input-field"
            id="name"
            value={storeName}
            type="text"
            isDarkModeOn={isDarkModeOn}
            label="Name"
            onChange={onStoreNameChange}
            required={true}
          />
          <MbInputField
            className="input-field"
            id="description"
            isDarkModeOn={isDarkModeOn}
            label="Description"
            value={storeDescription}
            rows={5}
            type="textarea"
            onChange={onStoreDescriptionChange}
            required={true}
          />
          <button onClick={handleSaveBasics}>Save</button>
        </div>
      </Basic>
      <Widget
        src="${config_account}/widget/Mintbase.App.Profile.ContractSettings.Minters"
        props={{ isDarkModeOn, contractId, isStoreOwner }}
      />
      <Widget
        src="${config_account}/widget/Mintbase.App.Profile.ContractSettings.Royalties"
        props={{ isDarkModeOn }}
      />
      <Widget
        src="${config_account}/widget/Mintbase.App.Profile.ContractSettings.Revenue"
        props={{ isDarkModeOn }}
      />
      {isStoreOwner && (
        <Widget
          src="${config_account}/widget/Mintbase.App.Profile.ContractSettings.Ownership"
          props={{ isDarkModeOn, contractId }}
        />
      )}
    </SettingsRoot>
  );
};

return <ContractSettings {...props} />;
