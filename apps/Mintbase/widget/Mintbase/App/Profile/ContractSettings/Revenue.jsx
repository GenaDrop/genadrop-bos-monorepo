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

const Royalty = styled.div`
  background: #fff;
  padding: 16px;
  margin-top: 20px 0;
`;
const RoyaltiesCards = styled.div`
  height: 250px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0;
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
      width: 70px;
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
    min-width: 126px;
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

const [royalties, setRoyalties] = useState([
  {
    accountId: "",
    percent: "",
  },
]);

const addAccounts = () => {
  setRoyalties([
    ...royalties,
    {
      percent: "",
      accountId: "",
    },
  ]);
};

const handleAccountName = (e, index, name) => {
  const newFields = royalties;
  newFields[index][name] = e.target.value;
  setRoyalties(newFields);
};

const handleRemoveCard = (id) => {
  const existingFields = royalties?.filter((_, index) => index !== id);
  setRoyalties(existingFields);
};

return (
  <>
    <Royalty>
      <h2>Default Split Revenue</h2>
      <div className="text">
        <p>Add NEAR Accounts to split revenue when minting</p>
        <span>
          Split revenue clears after each sale. The minter will receive 100% of
          split revenue unless splits are added.
        </span>
      </div>
      <RoyaltiesCards>
        <div className={isDarkModeOn ? "dark" : "light"}>
          {royalties.map((data, index) => (
            <div key={index} className="accountCard">
              <input
                className="count"
                type="number"
                maxLength={2}
                placeholder="%"
                max={tokens?.length - data?.amount}
                onChange={(e) => handleAccountName(e, index, "percent")}
                value={data?.percent}
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
                  royalties.length > 1 ? handleRemoveCard(index) : {}
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
      </RoyaltiesCards>
      <Bottom isDarkModeOn={isDarkModeOn}>
        <div>
          <div className="token">
            <span>Used Percentage</span>
            <p>0</p>
          </div>
          <div className="token">
            <span>Available Percentage</span>
            <p>0</p>
          </div>
        </div>

        <div className="clear">
          <p
            onClick={() =>
              setRoyalties([
                {
                  accountId: "",
                  percent: "",
                },
              ])
            }
          >
            Clear all
          </p>
          <button
            disabled={royalties.some(
              (data) => data.accountId === "" || data.percent === ""
            )}
          >
            {" "}
            Save
          </button>
        </div>
      </Bottom>
    </Royalty>
  </>
);