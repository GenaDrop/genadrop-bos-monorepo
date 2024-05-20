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

function fetchStoreMinters(contractId, account) {
  return asyncFetch("https://graph.mintbase.xyz", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "mb-api-key": "omni-site",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `  
        query v2_omnisite_getStoreMinters($id: String, $limit: Int, $offset: Int) {
            mb_store_minters(
              limit: $limit
              offset: $offset
              where: {nft_contract_id: {_eq: $id}}
            ) {
              nft_contract_id
              minter_id
              nft_contracts {
                owner_id
                __typename
              }
              __typename
            }
            mb_store_minters_aggregate(where: {nft_contract_id: {_eq: $id}}) {
              aggregate {
                count
                __typename
              }
              __typename
            }
          }
        
        `,
      variables: {
        id: contractId,
        offset: null,
        limit: 52,
      },
    }),
  }).then((data) => {
    if (data?.body?.data) {
      // Run a check to confirm this account connected is a minter
      if (account) {
        return data?.body?.data?.mb_store_minters?.some(
          (data) => data.minter_id === account
        );
      }
      // Return all Minters
      return data?.body?.data?.mb_store_minters;
    }
  });
}

return { getUserStores, checkStoreOwner, fetchStoreMinters };
