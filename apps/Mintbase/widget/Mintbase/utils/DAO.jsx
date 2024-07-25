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
          description: `A Proposal for Deposit on Listing`,
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
            description: `A Proposal to Create a Store on Mintbase`,
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
                        owner_id: daoId,
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

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

function mintingDeposit({ nTokens, nRoyalties, nSplits, metadata }) {
  const nSplitsAdj = nSplits < 1 ? 0 : nSplits - 1;
  const bytesPerToken = 440 + nSplitsAdj * 80 + 80;
  const metadataBytesEstimate = JSON.stringify(metadata).length;

  const totalBytes =
    92 +
    100 +
    metadataBytesEstimate +
    bytesPerToken * nTokens +
    80 * nRoyalties;

  return `${Math.ceil(totalBytes)}${"0".repeat(19)}`;
}

function getRoyaltyTotal(royalties, errorMessage) {
  let royaltyTotal = 0;
  royalties.forEach((value) => {
    royaltyTotal += Number(value.percent);
  });

  if (royaltyTotal <= 0 || royaltyTotal > 0.5) {
    errorMessage("Invalid royalty percentage, it must be between 0 and 0.5");
    return "Error";
  }
  return royaltyTotal;
}

function adjustRoyaltiesForContract(royalties, royaltyTotal, errorMessage) {
  let counter = 0;
  const result = {};
  royalties.map(({ accountId, percent }) => {
    if (percent <= 0) {
      errorMessage("Invalid royalty percentage, it must be between 0 and 0.5");
    }
    const adjustedAmount = (percent / royaltyTotal) * 10000;
    result[accountId] = adjustedAmount;
    counter += adjustedAmount;
  });
  if (counter != 10000) {
    errorMessage("Splits percentages must add up 10000 in the contract call ");
    return "Error";
  }
  return result;
}

/**
 * The function `mintNftAsADao` mints NFTs on Mintbase through a DAO by handling royalties, splits, and
 * uploading metadata to IPFS.
 * @returns The function `mintNftAsADao` is returning a call to the `Near.call` function with a
 * specific set of arguments for minting an NFT on Mintbase.
 */
const mintNftAsADao = (
  daoId,
  metadata,
  media,
  contractName,
  numToMint,
  owner,
  errorMessage,
  fileUploadStatus
) => {
  try {
    if (!media && !metadata) return console.log("missing file");
    fileUploadStatus(true);

    //HANDLE ROYALTIES
    let royaltyTotal = null;
    let roundupRoyalties = null;
    if (metadata.royalties) {
      royaltyTotal = getRoyaltyTotal(metadata.royalties, errorMessage);
      const adjustedRoyalties = adjustRoyaltiesForContract(
        metadata.royalties,
        royaltyTotal,
        errorMessage
      );
      roundupRoyalties = roundRoyalties(adjustedRoyalties);
      if (royaltyTotal === "Error" || adjustedRoyalties === "Error") return;
    }

    // HANDLE SPLITS
    let splits = {};
    if (metadata?.splits) {
      if (metadata?.splits.reduce((a, b) => a + b.percent) > 100) {
        return errorMessage("SPLITS Percentage cannot be more than 100%");
      } else if (metadata?.splits?.length > 25) {
        return errorMessage("Splits Account cannot be more than 25");
      } else {
        metadata.splits.map((data) => {
          splits[data?.accountId] = data.percent;
        });
      }
    }

    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    })
      .then((res) => {
        const reference = res.body.cid;
        fileUploadStatus(false);
        if (!reference) {
          return errorMessage("could not upload to IPFS");
        }
        const gas = 2e14;

        return Near.call([
          {
            contractName: daoId,
            methodName: "add_proposal",
            args: {
              proposal: {
                description: "A Proposal to Mint an NFT on Mintbase",
                kind: {
                  FunctionCall: {
                    receiver_id: contractName || "",
                    actions: [
                      {
                        method_name: "nft_batch_mint",
                        args: fc_args(
                          JSON.stringify({
                            owner_id: daoId,
                            metadata: {
                              media: ipfsUrl(media),
                              reference,
                              title: metadata.title,
                              description: metadata.description,
                            },
                            num_to_mint: numToMint || 1,
                            royalty_args: !royaltyTotal
                              ? null
                              : {
                                  split_between: roundupRoyalties,
                                  percentage: Math.round(royaltyTotal * 10000),
                                },
                            split_owners: metadata?.splits ? splits : null,
                            token_ids_to_mint: null,
                          })
                        ),
                        gas: convertScientificToNormal(gas),
                        deposit: mintingDeposit({
                          nSplits: metadata?.splits?.length || 0,
                          nTokens: numToMint,
                          nRoyalties: !metadata?.royalties
                            ? null
                            : metadata?.royalties?.length,
                          metadata,
                        }),
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
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong during minting");
      });
  } catch (error) {
    console.log(error);
  }
};

return {
  listAsADao,
  buyTokenAsADao,
  deployStoreAsADao,
  mintNftAsADao,
};
