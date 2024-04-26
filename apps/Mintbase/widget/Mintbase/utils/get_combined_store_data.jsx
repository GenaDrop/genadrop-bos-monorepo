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
    query GetCombinedStoredData($id: String!, $limit: Int, $offset: Int) @cached(ttl: 120) {
      nft_contracts(where: {id: {_eq: $id}}) {
        name
        created_at
        owner_id
        is_mintbase
      }
      mb_store_minters(
        limit: $limit
        offset: $offset
        where: {nft_contract_id: {_eq: $id}}
      ) {
        nft_contract_id
        minter_id
        nft_contracts {
          owner_id
        }
      }
      uniqueThings: nft_tokens_aggregate(where: {nft_contracts: {id: {_eq: $id}}}) {
        aggregate {
          count
        }
      }
      uniqueOwners: nft_tokens_aggregate(
        distinct_on: owner
        where: {nft_contracts: {id: {_eq: $id}}}
      ) {
        aggregate {
          count
        }
      }
      floorPrice: nft_listings(
        order_by: [{price: asc}, {created_at: desc}]
        where: {unlisted_at: {_is_null: true}, invalidated_at: {_is_null: true}, accepted_at: {_is_null: true}, nft_contract_id: {_eq: $id}}
        limit: 10
      ) {
        price
        created_at
        nft_contract_id
        currency
      }
      averagePrice: nft_offers_aggregate(
        where: {nft_contracts: {id: {_eq: $id}}, currency: {_eq: "near"}}
      ) {
        aggregate {
          avg {
            offer_price
          }
        }
      }
      mb_store_minters_aggregate(where: {nft_contract_id: {_eq: $id}}) {
        aggregate {
          count
        }
      }
      storeEarned: nft_earnings_aggregate(
        where: {nft_contract_id: {_eq: $id}, _and: {approval_id: {_is_null: false}}, currency: {_eq: "near"}}
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  `;

function getCombinedStoreData({ id, limit, offset }) {
  return fetchGraphQL(operationsDoc, "GetCombinedStoredData", {
    id: id,
    limit: limit ?? 100,
    offset: offset ?? 0,
  });
}

return { getCombinedStoreData };
