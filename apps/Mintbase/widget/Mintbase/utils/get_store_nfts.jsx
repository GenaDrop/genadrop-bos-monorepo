function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(
    `https://graph.mintbase.xyz/${
      variables.id && variables.id.endsWith(".testnet") ? "testnet" : "mainnet"
    }`,
    {
      method: "POST",
      headers: {
        "mb-api-key": "anon",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  ).then((result) => result.body);
}

const operationsDoc = `
    query GetStoreNFTs($offset: Int = 0, $id: [String!], $limit: Int) @cached {
      count: mb_views_nft_metadata_unburned_aggregate(
        where: {nft_contract_id: {_in: $id}}
      ) {
        aggregate {
          count
        }
      }
      tokens: mb_views_nft_metadata_unburned(
        offset: $offset
        limit: $limit
        order_by: {minted_timestamp: desc}
        where: {nft_contract_id: {_in: $id}}
      ) {
        createdAt: minted_timestamp
        price
        media
        minter
        nft_contract_id
        metadata_id
        title
        base_uri
      }
    }
  `;

function getStoreNFTs({ offset, id, limit }) {
  return fetchGraphQL(operationsDoc, "GetStoreNFTs", {
    id: id,
    offset: offset || 0,
    limit: limit || 20,
  });
}

return { getStoreNFTs };
