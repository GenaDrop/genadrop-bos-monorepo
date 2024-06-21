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

const _price = (price) =>
  Number(Number(new Big(price).mul(new Big(10).pow(24)).toString()))
    .toLocaleString()
    .replace(/,/g, "");

/**
 * The function `nftTransfer` transfers an NFT with a specified token ID to a specified account ID
 * using a specified contract name.
 * @returns The function `nftTransfer` is returning the result of calling the `Near.call` function with
 * a specific configuration object as an argument. The configuration object includes the contract name,
 * method name, arguments (token_id and receiver_id), and deposit amount. The function is attempting to
 * transfer an NFT (Non-Fungible Token) with the specified token ID to the specified account ID using
 * the given
 */
const nftTransfer = (tokenId, accountIds, contractName) => {
  const deposit = 1;
  if (typeof accountIds !== "string") {
    return Near.call([
      {
        contractName,
        methodName: "nft_batch_transfer",
        args: {
          token_ids: accountIds,
        },
        deposit,
        gas: GAS,
      },
    ]);
  }
  try {
    return Near.call([
      {
        contractName,
        methodName: "nft_transfer",
        args: {
          token_id: tokenId,
          receiver_id: accountIds,
        },
        deposit,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

/**
 * The function `listNFT` lists NFTs for sale on a marketplace contract, handling different scenarios
 * based on parameters such as contract address, token IDs, price, and fungible token.
 * @returns The `listNFT` function returns the result of calling the `Near.call` function with an array
 * of objects containing contract information for depositing storage and listing NFTs. If an error
 * occurs during the process, the function catches the error and logs it to the console.
 */

// a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near

const listNFT = (contractAddress, tokenIds, mainnet, price, listAmount, ft) => {
  const storageDeposit = listAmount * 1e22;
  if (!contractAddress) return;
  if (tokenIds.length < 1) return;
  const gas = 2.25e14;
  // const storageDeposit = 1e22;
  let msg = { price: _price(price) };
  let optionalDeposit = [];

  if (ft) {
    const ftContractId = ftContracts[ft].mainnet;
    msg.ft_contract = ftContractId;
    msg.price = `${Number(price) * 1000000}`;

    // Extra Deposit

    optionalDeposit.push({
      contractName: ftContracts[ft].mainnet,
      methodName: "storage_deposit",
      args: {
        registration_only: true,
      },
      gas: gas,
      deposit: `1250${"0".repeat(18)}`,
    });
  }

  const ids = tokenIds.slice(0, listAmount).map((data) => ({
    contractName: contractAddress,
    args: {
      token_id: data,
      account_id: mainnet
        ? MARKET_CONTRACT_ADDRESS.mainnet
        : MARKET_CONTRACT_ADDRESS.testnet,
      msg: JSON.stringify(msg),
    },
    methodName: "nft_approve",
    deposit: listAmount > 1 ? `9300${"0".repeat(18)}` : LISTING_DEPOSIT,
    gas: GAS,
  }));
  try {
    return Near.call([
      {
        contractName: mainnet
          ? MARKET_CONTRACT_ADDRESS.mainnet
          : MARKET_CONTRACT_ADDRESS.testnet,
        methodName: "deposit_storage",
        args: {
          autotransfer: true,
        },
        gas: gas,
        deposit: storageDeposit.toString(),
      },
      ...optionalDeposit,
      ...ids,
    ]);
  } catch (error) {
    console.log(error);
  }
};

/**
 * The `delist` function takes a contract address, an array of token IDs, a boolean flag for mainnet,
 * and an old market object, then constructs and executes a series of unlist operations using the Near
 * protocol.
 * @returns The `delist` function returns the result of calling the `Near.call` function with an array
 * of objects representing token IDs to be delisted from a market contract.
 */
const delist = (contractAddress, tokenIds, mainnet, oldMarket) => {
  if (!tokenIds.length) return;
  const ids = tokenIds.map((data) => ({
    contractName: mainnet
      ? MARKET_CONTRACT_ADDRESS.mainnet
      : MARKET_CONTRACT_ADDRESS.testnet,
    methodName: "unlist",
    gas: GAS,
    deposit: `1`,
    args: {
      token_ids: [data],
      nft_contract_id: contractAddress,
    },
  }));
  try {
    return Near.call([...ids]);
  } catch (error) {
    console.log(error);
  }
};

/**
 * The function `burnNFT` is used to batch burn NFTs by calling the `nft_batch_burn` method on a
 * specified contract address with given token IDs.
 * @returns The `burnNFT` function is returning the result of calling the `Near.call` function with the
 * specified parameters. The `Near.call` function is making a contract call to the specified
 * `contractAddress` with the method name "nft_batch_burn" and passing the `tokenIds` as arguments. The
 * function is also specifying gas and deposit values for the contract call. If the contract
 */
const burnNFT = (contractAddress, tokenIds, mainnet) => {
  if (!tokenIds.length) return;

  try {
    return Near.call([
      {
        contractName: contractAddress,
        methodName: "nft_batch_burn",
        gas: GAS,
        deposit: `1`,
        args: {
          token_ids: tokenIds,
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

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

/**
 * The function `buyToken` is used to purchase a token from a specified contract address with the given
 * contract ID, token ID, and price.
 * @returns The `buyToken` function is returning the result of a `Near.call` function call with a
 * specific configuration object as an argument. The configuration object includes details such as the
 * contract name, method name, arguments, gas limit, and price. The `Near.call` function is likely
 * responsible for making a call to a smart contract on the NEAR Protocol blockchain to execute the
 * specified method with the provided
 */
const buyToken = (contractId, tokenId, price, mainnet, ftAddress) => {
  if (ftAddress !== "near") {
    //  WORK IN PROGRESS
    return Near.call([
      {
        contractName: ftAddress,
        methodName: "ft_transfer_call",
        args: {
          amount: price,
          receiver_id: mainnet
            ? MARKET_CONTRACT_ADDRESS.mainnet
            : MARKET_CONTRACT_ADDRESS.testnet,
          msg: JSON.stringify({
            nft_contract_id: contractId,
            token_id: tokenId,
          }),
        },
        gas: MAX_GAS,
        deposit: `1`,
      },
    ]);
  }
  return Near.call([
    {
      contractName: mainnet
        ? MARKET_CONTRACT_ADDRESS.mainnet
        : MARKET_CONTRACT_ADDRESS.testnet,
      methodName: "buy",
      args: {
        nft_contract_id: contractId,
        token_id: tokenId,
        referrer_id: null,
      },
      gas: MAX_GAS,
      deposit: price,
    },
  ]);
};

const buyFTToken = (contractAddress, contractId, tokenId, price) => {
  return Near.call([{}]);
};

const multiplyNFT = (
  contractAddress,
  ownerId,
  reference,
  media,
  numberToMint
) => {
  try {
    return Near.call([
      {
        contractName: contractAddress,
        methodName: "nft_batch_mint",
        gas: GAS,
        deposit: mintingDeposit({
          nSplits: 0,
          nTokens: numberToMint,
          nRoyalties: 0,
          metadata: {
            reference: reference,
            media: media,
          },
        }),
        args: {
          owner_id: ownerId,
          metadata: {
            reference: reference,
            media: media,
          },
          num_to_mint: numberToMint,
          royalty_args: null,
          token_ids_to_mint: null,
          split_owners: null,
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

return {
  nftTransfer,
  listNFT,
  buyToken,
  delist,
  burnNFT,
  multiplyNFT,
};
