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
    query v2_omnisite_GetOpenOffersByAccount($account: String!, $limit: Int!, $offset: Int!) {
      nft_offers(
        where: {offered_by: {_eq: $account}, listing: {kind: {_eq: "auction"}}}
        order_by: {offered_at: desc}
        limit: $limit
        offset: $offset
      ) {
        offered_by
        offer_price
        offered_at
        invalidated_at
        expires_at
        receipt_id
        withdrawn_at
        nft_contract_id
        token_id
        market_id
        accepted_at
        currency
        listing {
          listed_by
          unlisted_at
          accepted_at
          invalidated_at
          approval_id
          currency
          token_id
          offers {
            invalidated_at
            __typename
          }
          __typename
        }
        token {
          metadata_id
          __typename
        }
        nft_token {
          media
          base_uri
          title
          __typename
        }
        __typename
      }
      nft_offers_aggregate(
        where: {offered_by: {_eq: $account}, listing: {kind: {_eq: "auction"}}}
      ) {
        aggregate {
          count
          __typename
        }
        __typename
      }
    }
  `;

function fetchV2_omnisite_GetOpenOffersByAccount(account, limit, offset) {
  return fetchGraphQL(operationsDoc, "v2_omnisite_GetOpenOffersByAccount", {
    account: account,
    limit: limit,
    offset: offset,
  });
}

fetchV2_omnisite_GetOpenOffersByAccount(account, limit, offset)
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

//   {
//     "account": "nate.near",
//     "limit": 52,
//     "offset": 0
//   }
