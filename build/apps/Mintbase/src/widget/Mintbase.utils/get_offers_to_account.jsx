function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(
    `https://graph.mintbase.xyz/${
      variables.account && variables.account.endsWith(".testnet")
        ? "testnet"
        : "mainnet"
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
    query GetOffersToAccount($account: String!, $limit: Int!, $offset: Int!) {
      mb_views_auctions_with_offer(
        where: {listed_by: {_eq: $account}, offer_id: {_is_null: false}}
        limit: $limit
        offset: $offset
        order_by: {offered_at: desc}
      ) {
        offered_by
        offer_price
        offered_at
        receipt_id: offer_receipt_id
        nft_contract_id
        expires_at: offer_expires_at
        token_id
        offer_id
        currency
        unlisted_at
        invalidated_at: listing_invalidated_at
        withdrawn_at: offer_withdrawn_at
        accepted_at: offer_accepted_at
        listed_by
        metadata_id
        media
        base_uri
        title
        __typename
      }
      mb_views_auctions_with_offer_aggregate(
        where: {listed_by: {_eq: $account}, offer_id: {_is_null: false}}
      ) {
        aggregate {
          count
          __typename
        }
        __typename
      }
    }
  `;
function getOffersToAccount({ account, limit, offset }) {
  return fetchGraphQL(operationsDoc, "GetOffersToAccount", {
    account: account,
    limit: limit ?? 100,
    offset: offset ?? 0,
  });
}
return { getOffersToAccount };
