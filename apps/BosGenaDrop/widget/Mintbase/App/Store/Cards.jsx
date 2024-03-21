const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  gap: 1rem;
  padding-top: 3em;
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

return (
  <Root className="mx-24 md:mx-64">
    {stores.map((store) => (
      <Widget
        src={`/*__@appAccount__*//widget/Mintbase.App.Store.Card`}
        props={{
          isDarkModeOn,
          contract: store,
        }}
      />
    ))}
  </Root>
);
