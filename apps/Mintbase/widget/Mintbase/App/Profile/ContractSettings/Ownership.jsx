const { MbInputField } = VM.require(
  "bos.genadrop.near/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const { transferStoreOwnership } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.sdk"
);

const OwnerShipRoot = styled.div`
  margin: 40px 0;
  height: 250px;
  padding: 40px;
  background: #fff;
  .text {
    font-size: 14px;
    span {
      color: red;
    }
  }
  .sign-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    button {
      background: #000;
      border-color: black;
      &:hover {
        background: #fff;
        color: #000;
      }
      &:disabled {
        cursor: not-allowed;
      }
    }
  }
`;

const Ownership = ({ isDarkModeOn }) => {
  const [transferAccountName, setTransferAccountName] = useState("");
  const [onError, setOnError] = useState(false);

  const onAccountChange = (e) => {
    setTransferAccountName(e.target.value);
  };

  const onSign = () => {
    const result = Near.view("agwaze.near", "view_access_key_list");
    console.log(result);
    // if (!transferAccountName.endsWith(".near")) return setOnError(true);
    // transferStoreOwnership("liberty.mintbase1.near", transferAccountName);
  };

  return (
    <OwnerShipRoot>
      <h2>Transfer Contract Ownership</h2>
      <div className="text">
        <p>
          Transfer your contract ownership to another account.{" "}
          <span>
            This is a permanent action that will remove your ownership of this
            contract
          </span>
        </p>
      </div>
      <div>
        <MbInputField
          className="input-field"
          id="name"
          value={transferAccountName}
          type="text"
          isDarkModeOn={isDarkModeOn}
          placeholder="Enter NEAR Account to Transfer to"
          error={onError}
          label="Transfer Account"
          onChange={onAccountChange}
          required={true}
        />
      </div>
      <div className="sign-button">
        <button onClick={onSign} disabled={!transferAccountName}>
          Sign
        </button>
      </div>
    </OwnerShipRoot>
  );
};

return <Ownership {...props} />;
