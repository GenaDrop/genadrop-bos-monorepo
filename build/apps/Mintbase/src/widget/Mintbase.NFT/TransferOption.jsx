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
  .home-dark {
    width: 600px;
    height: 542px;
    background: #1f2031;
    padding-top: 15px;
  }
  .home-light {
    width: 600px;
    height: 542px;
    background: #fff;
    padding-top: 15px;
  }
  @media (max-width: 500px) {
    width: 95% !important;
  }
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
  .text-dark {
    padding: 20px;
    p:first-child {
      color: #91959f;
    }
    p {
      margin: 0;
      color: #fff;
    }
  }
  .text-white {
    padding: 20px;
    p:first-child {
      color: #000;
    }
    p {
      margin: 0;
      color: #000;
    }
  }
`;
const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .dark {
    svg {
      color: #fff !important;
    }
    .count {
      color: #fff;
      background: #3e4352;
    }
    .account,
    .count {
      color: #fff;
      background-color: #111222;
      &:focus {
        border: 1px solid var(--bs-primary-border-subtle);
        outline: none;
      }
    }
  }
  .light {
    svg {
      color: #000 !important;
    }
    .count {
      color: #000;
      background: #d0d5d9;
    }
    .account,
    .count {
      color: "#000";
      background-color: #f2f5f8;
      &:focus {
        border: 1px solid var(--bs-primary-border-subtle);
        outline: none;
      }
    }
  }
  .accountCard {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    border: none;
    margin-bottom: 11px;
    padding: 0 20px;
    .count {
      width: 50px;
      height: 45px;
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
    }
  }
  .add-dark {
    padding: 30px;
    color: #c3cefd;
    cursor: pointer;
    width: max-content;
  }
  .add-light {
    width: max-content;
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
  const [tokens, setTokens] = useState([]);
  const [accountIds, setAccountIds] = useState([
    {
      accountId: "",
      tokenAmount: "",
    },
  ]);
  function fetchNFTDetails() {
    asyncFetch("https://graph.mintbase.xyz", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "mb-api-key": "omni-site",
        "x-hasura-role": "anonymous",
      },
      body: JSON.stringify({
        query: `  
        query v2_omnisite_GetTokenByThingID($thingId: String!, $limit: Int, $offset: Int, $search_fields: [mb_views_nft_tokens_bool_exp!]) {
          token: mb_views_nft_tokens(
            where: {metadata_id: {_eq: $thingId}, burned_timestamp: {_is_null: true}, _or: $search_fields}
            limit: $limit
            offset: $offset
          ) {
            id: token_id
            ownerId: owner
          }
    
        }
        `,
        variables: {
          limit: 50,
          offset: 0,
          thingId: data?.metadata_id,
          search_fields: {
            owner: {
              _eq: data?.owner,
            },
          },
        },
      }),
    }).then((data) => {
      if (data?.body?.data) {
        setTokens(data?.body?.data?.token?.map((data) => data?.id));
      }
    });
  }
  useEffect(() => {
    fetchNFTDetails();
  }, []);
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
    let transfers = [];
    if (accountIds.length === 1 && accountIds[0].tokenAmount === "1") {
      nftTransfer(
        data?.token_id,
        accountIds[0]?.accountId,
        data?.nft_contract_id
      );
    } else {
      // Batch transfer
      let k = 0;
      for (let i = 0; i < accountIds.length; i++) {
        const { accountId, tokenAmount } = accountIds[i];
        for (let j = 0; j < parseInt(tokenAmount); j++) {
          const tokenId = tokens[k] || "";
          k++;
          transfers.push([tokenId, accountId]);
        }
      }
      nftTransfer(data?.token_id, transfers, data?.nft_contract_id);
    }
  };
  const totalTokenAmount = accountIds.reduce((total, data) => {
    return total + parseInt(data.tokenAmount || 0);
  }, 0);
  const handleAccountName = (e, index, name) => {
    const newFields = accountIds;
    newFields[index][name] = e.target.value;
    setAccountIds(newFields);
  };
  const handleRemoveCard = (id) => {
    const existingFields = accountIds?.filter((_, index) => index !== id);
    setAccountIds(existingFields);
  };
  return (
    <TransferContainer>
      <div className={isDarkModeOn ? "home-dark" : "home-light"}>
        <Top isDarkModeOn={isDarkModeOn}>
          <p>Transfer</p>
          <p onClick={onClose}>X</p>
        </Top>
        <Token isDarkModeOn={isDarkModeOn}>
          {tokens?.length === 1 ? (
            <p>Token: {tokens[0]}</p>
          ) : (
            <p>Multiple Tokens</p>
          )}
        </Token>
        <Content>
          <div className={isDarkModeOn ? "text-dark" : "text-white"}>
            <p>Airdrop to multiple accounts</p>
            <p>Amount of tokens and recipient account</p>
          </div>
          <Cards>
            <div className={isDarkModeOn ? "dark" : "light"}>
              {accountIds.map((data, index) => (
                <div key={index} className="accountCard">
                  <input
                    className="count"
                    type="number"
                    maxLength={2}
                    max={tokens?.length - data?.amount}
                    onChange={(e) => handleAccountName(e, index, "tokenAmount")}
                    value={data?.tokenAmount}
                  />
                  <input
                    value={data?.accountId}
                    onChange={(e) => handleAccountName(e, index, "accountId")}
                    className="account"
                    placeholder="account.near"
                  />
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      accountIds.length > 1 ? handleRemoveCard(index) : {}
                    }
                  >
                    {cancelSvg}
                  </div>
                </div>
              ))}
              <div
                onClick={addAccounts}
                className={isDarkModeOn ? "add-dark" : "add-light"}
              >
                Add Another Account
              </div>
            </div>
          </Cards>
        </Content>
        <Bottom isDarkModeOn={isDarkModeOn}>
          <div>
            <div className="token">
              <span>Available Tokens</span>
              <p>{Math.max(tokens.length - totalTokenAmount, 0)}</p>
            </div>
            <div className="token">
              <span>Available Tokens</span>
              <p>{tokens?.length}</p>
            </div>
          </div>
          <div className="clear">
            <p
              onClick={() =>
                setAccountIds([
                  {
                    accountId: "",
                    tokenAmount: "",
                  },
                ])
              }
            >
              Clear all
            </p>
            <button
              disabled={
                accountIds.some(
                  (data) => data.accountId === "" || data.tokenAmount === ""
                ) || tokens.length < totalTokenAmount
              }
              onClick={handleTransfer}
            >
              {" "}
              Continue
            </button>
          </div>
        </Bottom>
      </div>
    </TransferContainer>
  );
};
return <TransferOption {...props} />;
