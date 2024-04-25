const deployStore = ({
  storeName,
  storeSymbol,
  reference,
  referenceHash,
  isMainnet,
  accountId,
}) => {
  const base_uri = "https://arweave.net";
  const isSignedin = !!accountId;
  console.log("isSignedin", context);
  const gas = 2e14;
  const deposit = 65e23;
  if (!isSignedin) return console.log("sign in first");
  if (!storeName || !storeSymbol) {
    return console.log("missing store name or symbol");
  }
  try {
    return Near.call([
      {
        contractName: isMainnet ? "mintbase1.near" : "mintspace2.testnet",
        methodName: "create_store",
        args: {
          owner_id: accountId,
          metadata: {
            name: storeName,
            spec: spec,
            symbol: storeSymbol,
            base_uri,
            ...(reference && { reference }),
            ...(referenceHash && { reference_hash: referenceHash }),
          },
        },
        deposit: deposit,
        gas: gas,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};
return { deployStore };
