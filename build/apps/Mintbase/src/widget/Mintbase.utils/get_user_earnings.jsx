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
      query GetEarned($account: String!, $currency: [String!] = ["near"], $limit: Int!, $offset: Int!) {
        earnings: nft_earnings(
          where: {receiver_id: {_eq: $account}}
          order_by: {timestamp: desc}
          limit: $limit
          offset: $offset
        ) {
          offer_id
          offer {
            offered_by
            offered_at
            token {
              metadata_id
              __typename
            }
            nft_token {
              media
              base_uri
              __typename
            }
            receiptId: receipt_id
            __typename
          }
          nft_token {
            media
            base_uri
            media_hash
            title
            __typename
          }
          amount
          currency
          nft_contract_id
          approval_id
          timestamp
          receiver_id
          token_id
          __typename
        }
        earnings_aggregate: nft_earnings_aggregate(
          where: {receiver_id: {_eq: $account}, currency: {_in: $currency}}
        ) {
          aggregate {
            sum {
              amount
              __typename
            }
            count
            __typename
          }
          __typename
        }
        lists_aggregate: nft_listings_aggregate(
          distinct_on: [token_id, nft_contract_id]
          where: {listed_by: {_eq: $account}}
        ) {
          aggregate {
            count
            __typename
          }
          __typename
        }
      }
    `;
function getUserEarnings({ account, currency, limit, offset }) {
  return fetchGraphQL(operationsDoc, "GetEarned", {
    account: account,
    currency: currency,
    limit: limit ?? 100,
    offset: offset ?? 0,
  });
}
return { getUserEarnings };
