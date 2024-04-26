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
        deposit: `1`,
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
  delist,
  burnNFT,
  multiplyNFT,
};
