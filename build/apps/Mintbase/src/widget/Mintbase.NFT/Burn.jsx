const { burnNFT, multiplyNFT } = VM.require(
  "bos.genadrop.near/widget/Mintbase.NFT.modules"
);
const Root = styled.div`
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
    width: 84% !important;
    .home-dark,
    .home-light {
      width: 95%;
    }
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
const BurnField = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
.h-light {
  color: #000;
  font-weight: bold;
  font-size: 14px;
}
.d-light {
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}
margin-top: 100px;
.burn-light {
  color: #000;
  background-color: #f2f5f8;
  button {
    background-color: #000;
    color: #fff;
  }
  input {
    color: #000;
  }
  
}
.burn-dark {
  color: #fff;
  background: #101223;
  button {
    background-color: #fff;
    color: #000;
  }
  input {
    color: #fff;
  }
}
  .burn-dark, .burn-light {  
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input:focus {
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
    }
    input {
      width: 40%;
      background: transparent;
      border: transparent;
    }
    p {
      margin: 0;
      padding: 2px 10px;
    }
    button {
      padding: 3px 9px;
      border: none;
    
      border-radius: 4px;
      &:disabled {
        cursor: not-allowed;
        background-color: #767986;
        color: #fff;
      }
    }
   
`;
const BottomButton = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0 30px;
  margin-top: 150px;
  button {
    border: #000;
    color: black;
    border-radius: 6px;
    background: #ec5b5a;
    transition: 0.3s ease-in-out;
    &:hover {
      background: #ec5b5a;
      opacity: 0.2;
    }
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
const BurnMultiply = ({ isDarkModeOn, data, onClose, type }) => {
  const [tokens, setTokens] = useState([]);
  const [amount, setAmount] = useState(0);
  const isBurn = type === "BURN";
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
  const handleFinish = () => {
    if (amount < 1 || tokens.length < 1) return;
    if (isBurn) {
      const tokensToBurn = tokens.slice(0, amount);
      burnNFT(data?.nft_contract_id, tokensToBurn);
    } else if (type === "MULTIPLY") {
      multiplyNFT(
        data?.nft_contract_id,
        data?.owner,
        data?.reference,
        data?.media,
        amount
      );
    }
  };
  return (
    <Root>
      <div className={isDarkModeOn ? "home-dark" : "home-light"}>
        <Top isDarkModeOn={isDarkModeOn}>
          <p>{isBurn ? "Burn" : "Multiply"}</p>
          <p onClick={onClose}>X</p>
        </Top>
        <Token isDarkModeOn={isDarkModeOn}>
          <p>Token {tokens?.length}</p>
        </Token>
        <BurnField>
          <p className={isDarkModeOn ? "d-light" : "h-light"}>
            {isBurn ? "Burn Amount" : "Mint more amount"}
          </p>
          <div className={isDarkModeOn ? "burn-dark" : "burn-light"}>
            <input
              type="number"
              max={isBurn ? tokens?.length : 20}
              inputmode="numeric"
              pattern="[0-9]*"
              value={amount}
              onChange={(e) =>
                setAmount(
                  Math.min(e.target.value, isBurn ? tokens?.length : 20)
                )
              }
            />
            <div className="buttons">
              <button
                onClick={() => setAmount((prev) => Number(prev) - 1)}
                className="minus"
                disabled={amount === 0}
              >
                -
              </button>
              <button
                disabled={isBurn ? tokens?.length === amount : amount === 20}
                onClick={() => setAmount((prev) => Number(prev) + 1)}
                className="plus"
              >
                +
              </button>
            </div>
          </div>
        </BurnField>
        <BottomButton isDarkModeOn={isDarkModeOn}>
          <button onClick={handleFinish}>Continue</button>
        </BottomButton>
      </div>
    </Root>
  );
};
return <BurnMultiply {...props} />;
