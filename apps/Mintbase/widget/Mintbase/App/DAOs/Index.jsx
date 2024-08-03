//
const { DAOCard } = VM.require(
  "${config_account}/widget/Mintbase.App.DAOs.DAOCard"
) || {
  DAOCard: () => <></>,
};
//
const MintDaos = styled.div`
  &.dark {
    .header-text {
      color: #fff;
    }
    .type {
      p {
        color: #fff !important;
      }
    }
  }
  min-height: 500px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
  }
  .header-text {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  input {
    max-width: 700px;
  }
  .daos {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .green {
    width: 10px;
    height: 10px;
    background: green;
    border-radius: 50px;
  }
  .red {
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50px;
  }
  .type {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-end;
    div {
      p {
        margin: 0;
      }
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;

const MintDAOs = ({ isDarkModeOn }) => {
  const [daos, setDaos] = useState([]);
  const [searchValue, setSearchValue] = useState("dao");

  const getDaos = () => {
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
            query v2_omnisite_GetUsersBySearchKeyword(
                $limit: Int!
                $offset: Int!
                $text: String!
              ) @cached {
                minter: mb_store_minters(
                  where: { minter_id: { _ilike: $text } }
                  distinct_on: minter_id
                  limit: $limit
                  offset: $offset
                ) {
                  account: minter_id
                  storeId: nft_contract_id
                }
                minters_aggregate: mb_store_minters_aggregate(
                  where: { minter_id: { _ilike: $text } }
                  distinct_on: minter_id
                ) {
                  aggregate {
                    count
                  }
                }
              }
              `,
        variables: {
          limit: 150,
          offset: null,
          text: `%${searchValue}%`,
        },
      }),
    }).then((data) => {
      if (data?.body?.data?.minter) {
        const onlyDaos = data?.body?.data?.minter?.filter((data) =>
          Near.view(data?.account, "get_policy")
        );
        setDaos(onlyDaos);
      }
    });
  };

  useEffect(() => {
    getDaos();
  }, [searchValue]);

  return (
    <MintDaos className={isDarkModeOn ? "dark" : "light"}>
      <div className="header">
        <h1 className="header-text">Search For DAOs on Mintbase</h1>
        <input
          type="search"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for DAOs on Mintbase"
        />
      </div>
      <div className="type">
        <div>
          <p> Member of a DAO</p>
          <p className="green"></p>
        </div>
        <div>
          <p>Not A Member</p>
          <p className="red"></p>
        </div>
      </div>
      <div className="daos">
        {daos.length >= 1 ? (
          daos?.map((data) => (
            <DAOCard
              account={context?.accountId}
              isDarkModeOn={isDarkModeOn}
              name={data?.account}
            ></DAOCard>
          ))
        ) : (
          <div>
            <h4>No Result Found</h4>
          </div>
        )}
      </div>
    </MintDaos>
  );
};

return <MintDAOs {...props} />;
