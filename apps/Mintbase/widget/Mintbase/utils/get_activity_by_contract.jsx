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
    query GetActivityByContract($contract: String!, $limit: Int!, $offset: Int!) {
      activities: mb_views_nft_activities(
        limit: $limit
        offset: $offset
        order_by: {timestamp: desc}
        where: {nft_contract_id: {_eq: $contract}}
      ) {
        kind
        description
        media
        title
        timestamp
        nft_contract_id
        action_sender
        receipt_id
        action_receiver
        token_id
        price
        currency
        nft_contract {
          name
          id
          base_uri
        }
        metadata_id
      }
      totalItems: mb_views_nft_activities_aggregate(
        where: {nft_contract_id: {_eq: $contract}}
      ) {
        aggregate {
          count
        }
      }
    }
  `;

function getActivityByContract({ contract, limit, offset }) {
  return fetchGraphQL(operationsDoc, "GetActivityByContract", {
    contract: contract,
    limit: limit || 20,
    offset: offset || 0,
  });
}

return {
  getActivityByContract,
};
