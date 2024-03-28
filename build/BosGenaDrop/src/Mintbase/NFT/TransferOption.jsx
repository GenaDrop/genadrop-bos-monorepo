const { nftTransfer } = VM.require(
  "bos.genadrop.near/widget/Mintbase.NFT.modules"
);

const cancelSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
    class="fill-current text-blue-300 dark:text-blue-100"
  >
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
  </svg>
);

const TransferContainer = styled.div`
  width: 600px;
  height: 542px;
  background: #fff;
  padding-top: 15px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  height: 60px;

  border-bottom: 1px solid #e7ebee;
  p {
    font-weight: bold;
  }
  p:last-child {
    cursor: pointer;
  }
`;

const Token = styled.div`
  background: #f8f8f8;
  display: flex;
  align-items: center;
  padding-top: 10px;
  justify-content: center;
`;

const Content = styled.div`
  height: 228px;
  overflow-y: scroll;
  border-bottom: 1px solid #e7ebee;

  .text {
    padding: 20px;
    p {
      margin: 0;
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
    padding: 0 20px;
    .count {
      width: 50px;
      height: 45px;
      background: #d0d5d9;
      border: none;
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
      background: #f2f5f8;
      &:focus {
        border: 1px solid var(--bs-primary-border-subtle);
        outline: none;
      }
    }
  }
  .add {
    padding: 30px;
    color: #4f58a3;
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
    background: #f8f8f8;
    padding: 8px;
    display: flex;
    flex-direction: column;
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
      background: transparent;
      color: #4f58a3;
      cursor: pointer;
      &:hover {
        background: rgba(59, 130, 246, 0.5);
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

const TransferOption = ({ onClose, data }) => {
  const [accountIds, setAccountIds] = useState([
    {
      tokenAmount: "",
      accountId: "",
    },
  ]);

  const handleCheckAccount = (value) => {
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

  return (
    <TransferContainer>
      <Top>
        <p>Transfer</p>
        <p onClick={onClose}>X</p>
      </Top>
      <Token>
        <p>Token: {data?.token_id}</p>
      </Token>
      <Content>
        <div className="text">
          <p>Airdrop to multiple accounts</p>
          <p>Amount of tokens and recipient account</p>
        </div>
        <Cards>
          {accountIds.map((data, index) => (
            <div key={index} className="accountCard">
              <input className="count" value={data.tokenAmount} disabled />
              <input
                value={data.accountId}
                onChange={(e) => {
                  const newFields = accountIds;
                  newFields[index].accountId = e.target.value;
                  handleCheckAccount(e.target.value);
                  setAccountIds(newFields);
                }}
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
      <Bottom>
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
