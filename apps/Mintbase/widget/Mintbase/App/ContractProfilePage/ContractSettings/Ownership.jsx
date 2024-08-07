const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const { transferStoreOwnership, transferStoreOwnershipAsADao } = VM.require(
  "${config_account}/widget/Mintbase.utils.sdk"
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
  &.dark {
    background: inherit;
    border: 1px solid #111222;
  }
  .sign-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;
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

const Ownership = ({ isDarkModeOn, contractId, connectedDao }) => {
  const [transferAccountName, setTransferAccountName] = useState("");
  const [onError, setOnError] = useState(false);

  const onAccountChange = (e) => {
    setTransferAccountName(e.target.value);
  };
  const profile = Social.get(`${transferAccountName}/profile/**`, "final");

  const onSign = () => {
    if (!profile) return setOnError(true);
    setOnError(false);
    transferStoreOwnership(contractId, transferAccountName);
  };

  const onSignAsDao = () => {
    if (!profile) return setOnError(true);
    setOnError(false);
    transferStoreOwnershipAsADao(
      connectedDao?.address,
      contractId,
      transferAccountName
    );
  };

  return (
    <OwnerShipRoot className={isDarkModeOn ? "dark" : "light"}>
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
        {connectedDao?.permission && (
          <button onClick={onSignAsDao} disabled={!transferAccountName}>
            Sign as a DAO
          </button>
        )}
      </div>
    </OwnerShipRoot>
  );
};

return <Ownership {...props} />;
