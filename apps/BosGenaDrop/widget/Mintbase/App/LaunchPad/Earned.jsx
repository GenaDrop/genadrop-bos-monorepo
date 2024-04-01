/*
This is an example snippet - you should consider tailoring it
to your service.
*/

function fetchGraphQL(operationsDoc, operationName, variables) {
  return fetch("https://graph.mintbase.xyz/mainnet", {
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
  }).then((result) => result.json());
}

const operationsDoc = `
    query v2_omnisite_GetEarned($account: String!, $currency: [String!] = ["near"], $limit: Int!, $offset: Int!) {
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

function fetchV2_omnisite_GetEarned(account, currency, limit, offset) {
  return fetchGraphQL(operationsDoc, "v2_omnisite_GetEarned", {
    account: account,
    currency: currency,
    limit: limit,
    offset: offset,
  });
}

fetchV2_omnisite_GetEarned(account, currency, limit, offset)
  .then(({ data, errors }) => {
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
    // do something great with this precious data
    console.log(data);
  })
  .catch((error) => {
    // handle errors from fetch itself
    console.error(error);
  });

// {
//     "account": "nate.near",
//     "currency": [
//       "near"
//     ],
//     "limit": 52,
//     "offset": 0
//   }
