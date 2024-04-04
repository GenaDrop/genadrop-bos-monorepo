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

const nftTransfer = (tokenId, accountId, contractName) => {
  const deposit = 1;
  try {
    return Near.call([
      {
        contractName,
        methodName: "nft_transfer",
        args: {
          token_id: tokenId,
          receiver_id: accountId,
        },
        deposit,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

const listNFT = (contractAddress, tokenId, mainnet, price, ft) => {
  if (!contractAddress) return;
  const gas = 2e14;
  const storageDeposit = 1e22;
  const msg = { price: _price(price) };

  if (ft) {
    const ftContractId = ftContracts[ft].mainnet;
    msg.ft_contract = ftContractId;
    msg.price = price;
  }
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
      {
        contractName: contractAddress,
        args: {
          token_id: tokenId,
          account_id: mainnet
            ? MARKET_CONTRACT_ADDRESS.mainnet
            : MARKET_CONTRACT_ADDRESS.testnet,
          msg: JSON.stringify(msg),
        },
        methodName: "nft_approve",
        deposit: LISTING_DEPOSIT,
        gas: GAS,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

const delist = (contractAddress, tokenIds, mainnet, oldMarket) => {
  try {
    return Near.call([
      {
        contractName: mainnet
          ? MARKET_CONTRACT_ADDRESS.mainnet
          : MARKET_CONTRACT_ADDRESS.testnet,
        methodName: "unlist",
        gas: GAS,
        deposit: `1`,
        args: {
          token_ids: tokenIds,
          nft_contract_id: contractAddress,
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
};
