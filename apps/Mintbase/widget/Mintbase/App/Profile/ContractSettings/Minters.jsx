const { addAndRemoveMinters } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.sdk"
);

const { MbInputField } = VM.require(
  "bos.genadrop.near/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const deleteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
    class="fill-current text-blue-300 dark:text-blue-100"
  >
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>
  </svg>
);

const Root = styled.div`
  margin: 40px 0;
  height: 500px;
  padding: 40px;
  background: #fff;
  .topSec {
    max-height: 300px;
    overflow-y: scroll;
    h2 {
      margin-bottom: 20px;
    }
    ul {
      list-style-type: none;
      display: flex;
      width: 100%;
      justify-content: space-between;
      border-bottom: 1px solid #e0e3e7;
      padding-bottom: 10px;
      li {
      }
      svg {
        fill: #7c83bb;
        cursor: pointer;
      }
    }
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

const ModalBg = styled.div`
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw !important;
  height: 100%;
  background-color: #000000;
  opacity: 0.75;
  z-index: 999;
`;

const Modal = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  z-index: 999;
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const ModalRoot = styled.div`
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

const Content = styled.div`
  max-height: 300px;
  overflow-y: scroll;
  padding: 15px;
  h1 {
    font-weight: 400;
    font-size: 16px;
  }
  .accounts {
    margin-left: 20px;
    width: 90%;
  }
`;

const ModalBottom = styled.div`
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

const Minters = ({ isDarkModeOn, contractId }) => {
  const [minters, setMinters] = useState([]);
  const [openAddMintersModal, setOpenAddMintersModal] = useState(false);
  const [accounts, setAccounts] = useState(new Array(100).fill(""));

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
        query v2_omnisite_getStoreMinters($id: String, $limit: Int, $offset: Int) {
            mb_store_minters(
              limit: $limit
              offset: $offset
              where: {nft_contract_id: {_eq: $id}}
            ) {
              nft_contract_id
              minter_id
              nft_contracts {
                owner_id
                __typename
              }
              __typename
            }
            mb_store_minters_aggregate(where: {nft_contract_id: {_eq: $id}}) {
              aggregate {
                count
                __typename
              }
              __typename
            }
          }
        
        `,
        variables: {
          id: "liberty.mintbase1.near",
          offset: null,
          limit: 52,
        },
      }),
    }).then((data) => {
      if (data?.body?.data) {
        setMinters(data?.body?.data?.mb_store_minters);
      }
    });
  }
  useEffect(() => {
    fetchNFTDetails();
  }, []);

  function handleRemoveMinter(account) {
    if (!account.length) return;
    addAndRemoveMinters(contractId, "revoke", [account]);
  }

  const handleAccountChange = (event, index) => {
    const newAccounts = [...accounts];
    const profile = Social.get(`${event.target.value}/profile/**`, "final");
    console.log(profile);
    newAccounts[index] = event.target.value;
    setAccounts(newAccounts);
  };

  const handleAddMinters = () => {
    const filteredAccounts = accounts.filter((data) => data !== "");
    if (!filteredAccounts?.length) return;
    addAndRemoveMinters(contractId, "grant", filteredAccounts);
  };

  return (
    <Root>
      <div className="topSec">
        <h2>Account</h2>
        {minters.map((data) => (
          <ul key={data?.minter_id}>
            <li>{data?.minter_id}</li>
            {data?.minter_id !== data?.nft_contracts?.owner_id && (
              <span onClick={() => handleRemoveMinter(data?.minter_id)}>
                {deleteIcon}
              </span>
            )}
          </ul>
        ))}
      </div>
      <Bottom isDarkModeOn={isDarkModeOn}>
        <div>
          <div className="token">
            <span>Accounts</span>
            {minters?.length}
          </div>
        </div>

        <div className="clear">
          {/* <p>Clear all</p> */}
          <button onClick={() => setOpenAddMintersModal(true)}>
            Add Minters
          </button>
        </div>
      </Bottom>
      {openAddMintersModal && (
        <div>
          <ModalBg />
          <Modal>
            <ModalRoot>
              <div className={isDarkModeOn ? "home-dark" : "home-light"}>
                <Top isDarkModeOn={isDarkModeOn}>
                  <p>Add Minters</p>
                  <p onClick={() => setOpenAddMintersModal(false)}>X</p>
                </Top>
                <Content>
                  <h1>
                    Manage NEAR accounts that can mint tokens from this contract
                  </h1>
                  <p>Select up to 100 accounts</p>
                  <div className="accounts">
                    {accounts.map((account, index) => (
                      <div style={{ marginBottom: "10px" }} key={index}>
                        <MbInputField
                          className="input-field"
                          value={account}
                          placeholder="accounts.near"
                          onChange={(e) => handleAccountChange(e, index)}
                        />
                      </div>
                    ))}
                  </div>
                </Content>
                <ModalBottom isDarkModeOn={isDarkModeOn}>
                  <div>
                    <div className="token">
                      <span>Accounts</span>
                      <p>{accounts.filter((data) => data !== "")?.length}</p>
                    </div>
                  </div>

                  <div className="clear">
                    <p onClick={() => setAccounts(new Array(100).fill(""))}>
                      Clear all
                    </p>
                    <button
                      disabled={!accounts.filter((data) => data !== "")?.length}
                      onClick={handleAddMinters}
                    >
                      {" "}
                      Sign
                    </button>
                  </div>
                </ModalBottom>
              </div>
            </ModalRoot>
          </Modal>
        </div>
      )}
    </Root>
  );
};

return <Minters {...props} />;
