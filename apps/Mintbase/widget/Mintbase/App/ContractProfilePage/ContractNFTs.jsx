const Main = styled.div``;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
`;

const [nftData, setNftData] = useState([]);
const [loading, setLoading] = useState(true);

function fetchNFTs() {
  asyncFetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
        mb_views_nft_tokens(
          where: {nft_contract_id: {_eq: "mint.sharddog.near"}}
          limit: 30
        ) {
          nft_contract_id
          title
          media
          owner
        }
      }
      
      `,
    }),
  }).then((data) => {
    if (data.body.data?.mb_views_nft_tokens?.length) {
      setNftData(data.body.data?.mb_views_nft_tokens);
      setLoading(false);
    }
  });
}

fetchNFTs();

console.log(nftData);

return (
  <Main>
    <Cards>
      {nftData.length &&
        nftData?.map((data) => (
          <Widget
            src="${config_account}/widget/Mintbase.MbMetaCard"
            props={{ data, loading }}
          />
        ))}
    </Cards>
  </Main>
);
