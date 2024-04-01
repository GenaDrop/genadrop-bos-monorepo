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
        query GetLaunchpadContracts($id: String!) {
          launchpad_contracts(args: {minter_id: $id}) {
            minted_timestamp
            nft_contract_id
            owner_id
            __typename
          }
        }
      `;

function getUserStores(id) {
  return fetchGraphQL(operationsDoc, "GetLaunchpadContracts", {
    id: id,
  });
}

return { getUserStores };
