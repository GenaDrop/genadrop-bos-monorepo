/*
This is an example snippet - you should consider tailoring it
to your service.
*/

function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch("https://graph.mintbase.xyz/mainnet", {
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
  }).then((result) => result.body);
}

const operationsDoc = `
  query v2_omnisite_GetAllTokensQuery($metadataId: String!, $limit: Int, $offset: Int, $search_fields: [mb_views_nft_tokens_with_listing_bool_exp!]) {
    tokens: mb_views_nft_tokens_with_listing(
      order_by: {price: asc_nulls_last}
      where: {metadata_id: {_eq: $metadataId}, _or: $search_fields}
      limit: $limit
      offset: $offset
    ) {
      title
      token_id
      price
      owner
      nft_contract_id
      market_id
      currency
      listing_kind
    }
    totalTokensCount: mb_views_nft_tokens_with_listing_aggregate(
      where: {metadata_id: {_eq: $metadataId}, _or: $search_fields}
    ) {
      aggregate {
        count
      }
    }
  }
`;

function getAllTokens({
  metadataId,
  limit,
  offset,
  search_fields,
}) {
  return fetchGraphQL(operationsDoc, "v2_omnisite_GetAllTokensQuery", {
    metadataId: metadataId,
    limit: limit,
    offset: offset,
    search_fields: search_fields,
  });
}

return { getAllTokens };
