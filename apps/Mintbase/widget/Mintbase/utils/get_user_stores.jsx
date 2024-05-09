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
  if (!id) console.log("missing accountId");
  return fetchGraphQL(operationsDoc, "GetLaunchpadContracts", {
    id: id || "",
  });
}

const checkStoreQuery = `
query v2_omnisite_GetStoreData($id: String!) {
  store: nft_contracts(where: { id: { _eq: $id } }) {
    id
    owner: owner_id
  }
}
`;

function checkStoreOwner(storeId, accountId) {
  if (!storeId) return;
  return asyncFetch(`https://graph.mintbase.xyz/${storeId}`, {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: checkStoreQuery,
      variables: {
        id: storeId,
      },
    }),
  }).then((result) => {
    if (result.body?.data) {
      const isOwner = result?.body?.data?.store?.some(
        (data) => data?.owner == accountId
      );
      return isOwner;
    }
  });
}

return { getUserStores, checkStoreOwner };
