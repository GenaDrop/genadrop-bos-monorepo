const Root = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  .count {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 16px;
    color: ${isDarkModeOn ? "#B3B5BD" : "#525c76"};
  }
  .pagination_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
  }
`;

const MainCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 20px;
  border-radius: 0.7em;
  width: 100%;
  margin-top: 1em;
`;

const { isDarkModeOn } = props;

const [data, setData] = useState(null);

const fetchMyStores = (id) => {
  const data = asyncFetch("https://graph.mintbase.xyz", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query GetStoreDataById @cached {
        count: mb_store_minters_aggregate(where: {minter_id: {_eq: "${id}"}}) {
          aggregate {
            count
          }
        }
        count2: nft_contracts_aggregate(where: {owner_id: {_eq: "${id}"}}) {
          aggregate {
            count
          }
        }
        stores: mb_store_minters(where: {minter_id: {_eq: "${id}"}}) {
          owner: minter_id
          id: nft_contract_id
          nft_contract{
            name
            icon
          }
        }
        stores2: nft_contracts(where: {owner_id: {_eq: "${id}"}}) {
          id
          owner: owner_id
        }
      }
  `,
    }),
  });
  return data;
};

useEffect(() => {
  fetchMyStores(props.accountId || "nate.near").then((data) => {
    setData(data);
  });
  console.log("data in stores: ", data);
}, []);
const stores = data?.body?.data?.stores;
if (!stores) return "Loading ...";

const countNFTs = data?.body?.data?.count?.aggregate?.count || 0;

const s = countNFTs > 1 ? "s" : "";

return (
  <Root className="mx-24 md:mx-64">
    <div className="count">{`${countNFTs} Result${s}`}</div>
    <MainCardsGrid>
      {stores.length ? (
        stores.map((store) => (
          <Widget
            src={`/*__@appAccount__*//widget/Mintbase.App.Store.Card`}
            props={{
              isDarkModeOn,
              contract: store,
            }}
          />
        ))
      ) : (
        <h5>This user does not own a contract yet.</h5>
      )}
    </MainCardsGrid>
  </Root>
);
