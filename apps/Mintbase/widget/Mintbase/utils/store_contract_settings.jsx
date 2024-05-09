const GAS = "200000000000000";

function saveBasicSettings(data, storeName) {
  if (!storeName) return;

  return asyncFetch(
    `https://www.mintbase.xyz/api/firestore/store/${storeName}`,
    {
      method: "POST",
      headers: {
        "mb-api-key": "anon",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          displayName: data?.displayName,
          description: data?.description,
          contract: storeName,
        },
      }),
    }
  ).then((result) => {
    return result;
  });
}

/**
 * The function `transferStoreOwnership` transfers ownership of a store contract to a new owner in
 * JavaScript React.
 * @returns The `transferStoreOwnership` function is returning the result of calling the `Near.call`
 * function with the specified parameters for transferring store ownership.
 */
function transferStoreOwnership(contractName, newOwner) {
  const deposit = 1;
  try {
    return Near.call([
      {
        contractName,
        args: {
          new_owner: newOwner,
          keep_old_minters: true,
        },
        methodName: "transfer_store_ownership",
        deposit,
        gas: GAS,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

/**
 * The function `addAndRemoveMinters` is used to grant or revoke minting permissions for a specified
 * contract in a JavaScript React application.
 * @returns The function `addAndRemoveMinters` is returning the result of calling the `Near.call`
 * function with a specific configuration object as an argument based on type of call.
 */
function addAndRemoveMinters(contractName, type, minters) {
  const deposit = 1;
  try {
    return Near.call([
      {
        contractName,
        args: {
          grant: type === "grant" ? minters : undefined,
          revoke: type === "revoke" ? minters : undefined,
        },
        methodName: "batch_change_minters",
        deposit,
        gas: GAS,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

return { saveBasicSettings, transferStoreOwnership, addAndRemoveMinters };
