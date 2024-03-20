const { CreateStoreCard } = VM.require(
  "bos.genadrop.near/widget/Mintbase.App.Store.CreateStoreCard"
);

const { Pagination } = VM.require("buildhub.near/widget/components") || {
  Pagination: () => <></>,
};

const { ownerId, isDarkModeOn, createStoreHandler, isConnected, showFilters } =
  props;
const Card = styled.div`
  padding: 1em;
  border: 1px solid #e5e8eb;
  gap: 2em;
  margin: 10px auto;
  border-radius: 0.7em;
  & input {
    display: block;
    padding: 0.5em;
    width: 100%;
    border: 1px solid #e5e8eb;
    border-radius: 10px;
    outline: none;
    background: #f4f5f6;
    color: #525c76;
    :focus {
      box-shadow: none;
      border: 1px solid #0d99ff;
    }
    &::placeholder {
      color: palevioletred;
    }
  }
  .soulbound {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
  border-radius: 0.7em;
  width: 100%;
  margin-top: 1em;
`;

const [nftData, setNftData] = useState([]);
const [loading, setLoading] = useState(true);
const [countNFTs, setCountNFTs] = useState(0);
const [pageNumber, setPageNumber] = useState(1);

const limit = 20;

const offset = (pageNumber - 1) * limit;
function fetchOwnedNFTs(owner, l, o) {
  asyncFetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
        query fetchOwnedNFTs @cached {
            mb_views_nft_owned_tokens(
              where: {owner: {_eq: "${owner}"}},
              limit: ${l}
              offset: ${o}
              distinct_on: token_id
            ) {
              base_uri
              description
              media
              nft_contract_id
              price
              title
              token_id
              issued_at
              nft_contract_name
              listing_approval_id
              minter
            }
            mb_views_nft_owned_tokens_aggregate(
              where: {owner: {_eq: "${owner}"}} 
              distinct_on: token_id
            ) {
              aggregate {
                count
              }
            }
          }
        
        `,
    }),
  }).then((data) => {
    console.log("data", data);
    if (data.body.data?.mb_views_nft_owned_tokens?.length) {
      setNftData(data.body.data?.mb_views_nft_owned_tokens);
      setCountNFTs(
        data.body.data?.mb_views_nft_owned_tokens_aggregate.aggregate.count
      );
      setLoading(false);
    }
  });
}
const totalPages = Math.ceil(countNFTs / limit);

useEffect(() => {
  console.log({ totalPages, pageNumber, limit, offset });
  fetchOwnedNFTs(props.ownerId || "jgodwill.near", 56, offset);
}, [offset, pageNumber]);

const WrapCards = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  gap: 20px;
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

const LeftFilter = styled.div`
  background: ${isDarkModeOn ? "rgba(30, 32, 48, 1)" : "#fff"};
  width: 22%;
  height: 100%;
  padding: 15px;
  border-radius: 4px;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  gap: 24px;
  flex-flow: column nowrap;
  h2 {
    font-size: 14px;
    font-weight: bold;
  }
  .switch {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const s = countNFTs > 1 ? "s" : "";

return (
  <WrapCards>
    {showFilters && (
      <LeftFilter>
        <h2>Status</h2>
        <div className="switch">
          <Widget
            src={`/*__@appAccount__*//widget/Mintbase.MbSwitch`}
            props={{
              id: "showListed",
              label: "Show only Listed",
              onChange: setShowListed,
              isDarkModeOn,
            }}
          />
        </div>
      </LeftFilter>
    )}
    <MainContent>
      <div className="count">{`${countNFTs} Result${s}`}</div>
      <Cards>
        {nftData &&
          nftData.map((data, index) => (
            <div key={index}>
              <Widget
                src="/*__@appAccount__*//widget/Mintbase.MbMetaCard"
                props={{ data, loading, isDarkModeOn, isConnected }}
              />
            </div>
          ))}
        <CreateStoreCard
          isDarkModeOn={isDarkModeOn}
          createStoreHandler={createStoreHandler}
        />
      </Cards>
      <div className="pagination_container">
        <Pagination
          totalPages={totalPages}
          selectedPage={pageNumber}
          onPageClick={(v) => setPageNumber(v)}
        />
      </div>
    </MainContent>
  </WrapCards>
);
