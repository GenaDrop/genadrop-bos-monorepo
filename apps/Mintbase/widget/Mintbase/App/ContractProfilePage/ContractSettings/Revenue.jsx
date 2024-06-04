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
  &.dark {
    background: #1e2030;
    h2 {
      color: #fff;
    }
  }
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

const SplitRevenue = ({ isDarkModeOn, handleSplits, isMintPage }) => {
  const [splits, setSplits] = useState([
    {
      accountId: "",
      percent: "",
    },
  ]);

  const [totalPercent, setTotalPercent] = useState(0);

  const addAccounts = () => {
    setSplits([
      ...splits,
      {
        percent: "",
        accountId: "",
      },
    ]);
  };

  useEffect(() => {
    handleSplits(splits);
    const totalSplitsPercent = splits.reduce((acc, curr) => {
      return acc + (Number(curr.percent) || 0);
    }, 0);
    setTotalPercent(totalSplitsPercent);
  }, [splits, splits.map((item) => item.percent)]);

  const handleAccountName = (e, index, name) => {
    const newFields = splits;
    newFields[index][name] = e.target.value;
    setSplits(newFields);
  };

  const handleRemoveCard = (id) => {
    const existingFields = splits?.filter((_, index) => index !== id);
    setSplits(existingFields);
  };

  return (
    <>
      <Royalty className={isDarkModeOn ? "dark" : "light"}>
        <h2>Default Split Revenue</h2>
        <div className="text">
          <p>Add NEAR Accounts to split revenue when minting</p>
          <span>
            Split revenue clears after each sale. The minter will receive 100%
            of split revenue unless splits are added.
          </span>
        </div>
        <RoyaltiesCards>
          <div className={isDarkModeOn ? "dark" : "light"}>
            {splits.map((data, index) => (
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
                    splits.length > 1 ? handleRemoveCard(index) : {}
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
              <span style={{ color: totalPercent > 100 ? "red" : "" }}>
                Used Percentage
              </span>
              <p style={{ color: totalPercent > 100 ? "red" : "" }}>
                {totalPercent}
              </p>
            </div>
            <div className="token">
              <span>Available Percentage</span>
              <p>100%</p>
            </div>
          </div>

          <div className="clear">
            <p
              onClick={() =>
                setSplits([
                  {
                    accountId: "",
                    percent: "",
                  },
                ])
              }
            >
              Clear all
            </p>
            {!isMintPage && (
              <button
                disabled={splits.some(
                  (data) => data.accountId === "" || data.percent === ""
                )}
              >
                {" "}
                Save
              </button>
            )}
          </div>
        </Bottom>
      </Royalty>
    </>
  );
};

return <SplitRevenue {...props} />;
