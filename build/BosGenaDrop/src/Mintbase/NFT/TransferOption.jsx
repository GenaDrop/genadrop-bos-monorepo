const { nftTransfer } = VM.require(
  "bos.genadrop.near/widget/Mintbase.NFT.modules"
);

const cancelSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
  >
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
  </svg>
);

const TransferContainer = styled.div`
  width: 600px;
  height: 542px;
  background: ${(props) => (props.isDarkModeOn ? "#1f2031" : "#fff")};
  padding-top: 15px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  height: 60px;

  border-bottom: 1px solid
    ${(props) => (props.isDarkModeOn ? "#3e4352" : "#e7ebee")};
  p {
    font-weight: bold;
    color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
  }
  p:last-child {
    cursor: pointer;
  }
`;

const Token = styled.div`
  background: ${(props) => (props.isDarkModeOn ? "#262a3b" : "#f8f8f8")};
  display: flex;
  align-items: center;
  padding-top: 10px;
  justify-content: center;
  p {
    color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
  }
`;

const Content = styled.div`
  height: 228px;
  overflow-y: scroll;
  border-bottom: 1px solid #e7ebee;

  .text {
    padding: 20px;
    p:first-child {
      color: ${(props) => (props.isDarkModeOn ? "#91959f" : "#000")};
    }
    p {
      margin: 0;
      color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
    }
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .accountCard {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    border: none;
    svg {
      color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")} !important;
    }
    padding: 0 20px;
    .count {
      width: 50px;
      height: 45px;
      border: none;
      color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
      background-color: ${(props) =>
        props.isDarkModeOn ? "#3e4352" : "#d0d5d9"};
      border-radius: 4px;
      padding: 0 10px;
    }
    .account {
      flex: 1;
      padding: 0 10px;
      border-radius: 4px;
      border: transparent;
      transition: 0.3s ease-in-out;
      height: 45px;
      color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
      background-color: ${(props) =>
        props.isDarkModeOn ? "#111222" : "#f2f5f8"};
      &:focus {
        border: 1px solid var(--bs-primary-border-subtle);
        outline: none;
      }
    }
  }
  .add {
    padding: 30px;
    color: ${(props) => (props.isDarkModeOn ? "#c3cefd" : "#4f58a3")};
    cursor: pointer;
  }
`;

const Bottom = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  div {
    display: flex;
    gap: 10px;
  }
  .token {
    width: 126px;
    height: 72px;
    background: ${(props) => (props.isDarkModeOn ? "#262a3b" : "#f8f8f8")};
    padding: 8px;
    display: flex;
    flex-direction: column;
    color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
    span {
      font-size: 12px;
    }
  }
  .clear {
    display: flex;
    align-items: center;
    p {
      margin: 0;
      padding: 5px 10px;
      border-radius: 0.25rem;
      transition: 0.3s;
      background: ${(props) =>
        props.isDarkModeOn ? "#c5d0ff" : "transparent"};
      color: #4f58a3;
      cursor: pointer;
      &:hover {
        background: ${(props) =>
          props.isDarkModeOn ? "#c5d0ff" : "rgba(59, 130, 246, 0.5)"};
      }
    }
    button {
      background: #000;
      border: none;
      &:disabled {
        background: #d0d5d9;
        cursor: not-allowed;
        color: #000;
      }
    }
  }
`;

const TransferOption = ({ onClose, data, isDarkModeOn }) => {
  const [accountIds, setAccountIds] = useState([
    {
      accountId: "",
    },
  ]);

  const handleCheckAccount = () => {
    fetch("https://rpc.mainnet.near.org", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        id: "dontcare2",
        jsonrpc: "2.0",
        method: "query",
        params: {
          request_type: "view_account",
          finality: "final",
          account_id: "account",
        },
      }),
    });
  };

  const addAccounts = () => {
    setAccountIds([
      ...accountIds,
      {
        tokenAmount: "",
        accountId: "",
      },
    ]);
  };

  const handleTransfer = () => {
    nftTransfer(data?.token_id, accountIds[0].accountId, data?.nft_contract_id);
  };

  const handleAccountName = (e, index) => {
    const newFields = accountIds;
    newFields[index].accountId = e.target.value;
    // handleCheckAccount(e.target.value);
    setAccountIds(newFields);
  };

  return (
    <TransferContainer isDarkModeOn={isDarkModeOn}>
      <Top isDarkModeOn={isDarkModeOn}>
        <p>Transfer</p>
        <p onClick={onClose}>X</p>
      </Top>
      <Token isDarkModeOn={isDarkModeOn}>
        <p>Token: {data?.token_id}</p>
      </Token>
      <Content isDarkModeOn={isDarkModeOn}>
        <div className="text">
          <p>Airdrop to multiple accounts</p>
          <p>Amount of tokens and recipient account</p>
        </div>
        <Cards isDarkModeOn={isDarkModeOn}>
          {accountIds.map((data, index) => (
            <div key={index} className="accountCard">
              <input className="count" value={data.tokenAmount} disabled />
              <input
                value={data?.accountId}
                onChange={(e) => handleAccountName(e, index)}
                className="account"
                placeholder="account.near"
              />
              {cancelSvg}
            </div>
          ))}
          {!data?.token_id && (
            <div onClick={addAccounts} className="add">
              Add Another Account
            </div>
          )}
        </Cards>
      </Content>
      <Bottom isDarkModeOn={isDarkModeOn}>
        <div>
          <div className="token">
            <span>Available Tokens</span>
            <p>1</p>
          </div>
          <div className="token">
            <span>Available Tokens</span>
            <p>1</p>
          </div>
        </div>
        <div className="clear">
          <p>Clear all</p>
          <button
            disabled={!context.accountId || accountIds[0].accountId === ""}
            onClick={handleTransfer}
          >
            {" "}
            Continue
          </button>
        </div>
      </Bottom>
    </TransferContainer>
  );
};

return <TransferOption {...props} />;
