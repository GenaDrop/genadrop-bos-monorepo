const LISTING_DEPOSIT = `1000${"0".repeat(18)}`;
const GAS = "200000000000000";

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
const listNFT = (contractAddress, tokenIds, mainnet, price, ft) => {
  if (!contractAddress) return;
  if (tokenIds.length < 1) return;
  const gas = 2e14;
  const storageDeposit = 1e22;
  const msg = { price: _price(price) };

  if (ft) {
    const ftContractId = ftContracts[ft].mainnet;
    msg.ft_contract = ftContractId;
    msg.price = Number(price) * 1000000;
  }

  const ids = tokenIds.map((data) => ({
    contractName: contractAddress,
    args: {
      token_id: data,
      account_id: mainnet
        ? MARKET_CONTRACT_ADDRESS.mainnet
        : MARKET_CONTRACT_ADDRESS.testnet,
      msg: JSON.stringify(msg),
    },
    methodName: "nft_approve",
    deposit: LISTING_DEPOSIT,
    gas: GAS,
  }));
  try {
    return Near.call([
      {
        contractName: mainnet
          ? MARKET_CONTRACT_ADDRESS.mainnet
          : MARKET_CONTRACT_ADDRESS.testnet,
        methodName: "deposit_storage",
        args: {},
        gas: gas,
        deposit: storageDeposit,
      },
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

return {
  nftTransfer,
  listNFT,
  delist,
};
