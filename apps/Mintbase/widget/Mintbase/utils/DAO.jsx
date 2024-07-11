const LISTING_DEPOSIT = `1000${"0".repeat(18)}`;
const GAS = "200000000000000";
const MAX_GAS = "300000000000000";

const MARKET_CONTRACT_ADDRESS = {
  mainnet: "simple.market.mintbase1.near",
  testnet: "market-v2-beta.mintspace2.testnet",
};

const USDC_ADDRESS = {
  mainnet: "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near",
  testnet: "usdc.fakes.testnet",
};

const USDT_ADDRESS = {
  mainnet: "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
  testnet: "usdt.fakes.testnet",
};

const ftContracts = {
  usdt: USDT_ADDRESS,
  usdc: USDC_ADDRESS,
};

const fc_args = (args) => {
  return Buffer.from(args, "utf-8").toString("base64");
};

const convertScientificToNormal = (price) => {
  if (typeof price !== "number") Number(price);
  let normalNumber = parseFloat(price);
  return normalNumber.toLocaleString("fullwide", { useGrouping: false });
};

const _price = (price) =>
  Number(Number(new Big(price).mul(new Big(10).pow(24)).toString()))
    .toLocaleString()
    .replace(/,/g, "");

const listAsADao = (
  daoId,
  contractAddress,
  tokenIds,
  mainnet,
  price,
  listAmount,
  ft
) => {
  const storageDeposit = listAmount * 1e22;
  if (!contractAddress) return;
  if (tokenIds.length < 1) return;

  const gas = 2.25e14;
  let msg = { price: _price(price) };

  const ids = tokenIds.slice(0, listAmount).map((data) => ({
    token_id: data,
    account_id: mainnet
      ? MARKET_CONTRACT_ADDRESS.mainnet
      : MARKET_CONTRACT_ADDRESS.testnet,
    msg: JSON.stringify(msg),
  }));

  return Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: `Creating a Proposal for Deposit on Listing`,
          kind: {
            FunctionCall: {
              receiver_id: mainnet
                ? MARKET_CONTRACT_ADDRESS.mainnet
                : MARKET_CONTRACT_ADDRESS.testnet,
              actions: [
                {
                  method_name: "deposit_storage",
                  args: fc_args(
                    JSON.stringify({
                      autotransfer: true,
                    })
                  ),
                  gas: gas?.toString(),
                  deposit: "10000000000000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: 100000000000000000000000,
      gas: 200000000000000,
    },
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: `A Proposal to List this NFT on mintbase`,
          kind: {
            FunctionCall: {
              receiver_id: contractAddress,
              actions: [
                {
                  method_name: "nft_approve",
                  args: fc_args(JSON.stringify(...ids)),
                  deposit:
                    listAmount > 1 ? `9300${"0".repeat(18)}` : LISTING_DEPOSIT,
                  gas: GAS,
                },
              ],
            },
          },
        },
      },
      deposit: 100000000000000000000000,
      gas: 200000000000000,
    },
  ]);
};

const buyTokenAsADao = (
  daoId,
  contractId,
  tokenId,
  price,
  mainnet,
  ftAddress
) => {
  if (ftAddress !== "near") {
    return Near.call([
      {
        contractName: daoId,
        methodName: "add_proposal",
        args: {
          proposal: {
            description: `Buying a FT Token NFT on mintbase`,
            kind: {
              FunctionCall: {
                receiver_id: ftAddress.substring(4),
                actions: [
                  {
                    method_name: "ft_transfer_call",
                    args: fc_args(
                      JSON.stringify({
                        amount: `${convertScientificToNormal(`${price}`)}`,
                        receiver_id: mainnet
                          ? MARKET_CONTRACT_ADDRESS.mainnet
                          : MARKET_CONTRACT_ADDRESS.testnet,
                        msg: JSON.stringify({
                          nft_contract_id: contractId,
                          token_id: tokenId,
                        }),
                      })
                    ),
                    gas: MAX_GAS,
                    deposit: "1",
                  },
                ],
              },
            },
          },
        },
        deposit: 100000000000000000000000,
        gas: 200000000000000,
      },
    ]);
  } else {
    return Near.call([
      {
        contractName: daoId,
        methodName: "add_proposal",
        args: {
          proposal: {
            description: `Buying a Near Token NFT on mintbase`,
            kind: {
              FunctionCall: {
                receiver_id: mainnet
                  ? MARKET_CONTRACT_ADDRESS.mainnet
                  : MARKET_CONTRACT_ADDRESS.testnet,
                actions: [
                  {
                    method_name: "buy",
                    args: fc_args(
                      JSON.stringify({
                        nft_contract_id: contractId,
                        token_id: tokenId,
                        referrer_id: null,
                      })
                    ),
                    gas: MAX_GAS,
                    deposit: `${convertScientificToNormal(`${price}`)}`,
                  },
                ],
              },
            },
          },
        },
        deposit: 100000000000000000000000,
        gas: 200000000000000,
      },
    ]);
  }
};

const deployStoreAsADao = ({
  daoId,
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
        contractName: daoId,
        methodName: "add_proposal",
        args: {
          proposal: {
            description: `A Proposal to Create a Store in Mintbase`,
            kind: {
              FunctionCall: {
                receiver_id: isMainnet
                  ? "mintbase1.near"
                  : "mintspace2.testnet",
                actions: [
                  {
                    method_name: "create_store",
                    args: fc_args(
                      JSON.stringify({
                        owner_id: accountId,
                        metadata: {
                          name: storeName,
                          spec: spec,
                          symbol: storeSymbol,
                          base_uri,
                          ...(reference && { reference }),
                          ...(referenceHash && {
                            reference_hash: referenceHash,
                          }),
                        },
                      })
                    ),
                    deposit: convertScientificToNormal(deposit),
                    gas: convertScientificToNormal(gas),
                  },
                ],
              },
            },
          },
        },
        deposit: 100000000000000000000000,
        gas: 200000000000000,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

return {
  listAsADao,
  buyTokenAsADao,
  deployStoreAsADao,
};
