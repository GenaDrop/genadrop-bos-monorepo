const { deployStore } = VM.require(
  "${config_account}/widget/Mintbase.utils.deploy_store"
);

const {
  listAsADao,
  buyTokenAsADao,
  deployStoreAsADao,
  mintNftAsADao,
  transferStoreOwnershipAsADao,
} = VM.require("${config_account}/widget/Mintbase.utils.DAO");

const { getTimePassed } = VM.require(
  "${config_account}/widget/Mintbase.utils.get_time_passed"
);

const { getUserStores, checkStoreOwner, fetchStoreMinters } = VM.require(
  "${config_account}/widget/Mintbase.utils.get_user_stores"
);

const {fetchNFTInfo} = VM.require("${config_account}/widget/Mintbase.utils.get_nft_info");

const { getUserEarnings } = VM.require(
  "${config_account}/widget/Mintbase.utils.get_user_earnings"
);

const { getOffersToAccount } = VM.require(
  "${config_account}/widget/Mintbase.utils.get_offers_to_account"
);

const { getOpenOffersByAccount } = VM.require(
  "${config_account}/widget/Mintbase.utils.get_open_offers_by_account"
);

const { getCombinedStoreData } = VM.require(
  "${config_account}/widget/Mintbase.utils.get_combined_store_data"
);

const { saveBasicSettings, transferStoreOwnership, addAndRemoveMinters } =
  VM.require("${config_account}/widget/Mintbase.utils.store_contract_settings");

// Function to retrieve all NFTs associated with a store contract
const { getStoreNFTs } = VM.require(
  "${config_account}/widget/Mintbase.utils.get_store_nfts"
);

const { getActivityByContract } = VM.require(
  "${config_account}/widget/Mintbase.utils.get_activity_by_contract"
);

const { mint } = VM.require("${config_account}/widget/Mintbase.utils.mint");

// Configuration (replace with your actual values or define them globally)
const factoryAddress = mainnet ? "mintbase1.near" : "mintspace2.testnet";
const MARKET_ADDRESS = {
  mainnet: "simple.market.mintbase1.near",
  testnet: "market-v2-beta.mintspace2.testnet",
};

const FACTORY_ADDRESS = {
  mainnet: "mintbase1.near",
  testnet: "mintspace2.testnet",
};
const mbGraphEndpoint = "https://graph.mintbase.xyz";

// Helper function to generate IPFS gateway URL
const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

// Function to fetch details of a specific NFT
const getTokenById = (contractName, tokenId) => {
  if (!contractName || !tokenId)
    return console.log("missing contract name or token id");
  const res = asyncFetch(mbGraphEndpoint, {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
    query GetTokenById(
      $tokenId: String!
      $contractAddress: String!
    ) {
      mb_views_nft_tokens(
        where: {
          nft_contract_id: { _eq: $contractAddress }
          token_id: { _eq: $tokenId }
        }
        limit: 1
      ) {
        baseUri: base_uri
        burned_receipt_id
        burned_timestamp
        copies
        description
        expires_at
        issued_at
        last_transfer_receipt_id
        last_transfer_timestamp
        media
        minter
        media_hash
        mint_memo
        nft_contract_is_mintbase
        minted_receipt_id
        minted_timestamp
        metadata_id
        document: reference_blob(path: "$.document")
        animationUrl: reference_blob(path: "$.animation_url")
        extra: reference_blob(path: "$.extra")
        reference
        reference_hash
        starts_at
        title
        updated_at
        owner
        royalties
        royalties_percent
        token_id
      }
  
      mb_views_active_listings_aggregate(
        where: {
          token_id: { _eq: $tokenId }
          kind: { _eq: "auction" }
          nft_contract_id: { _eq: $contractAddress }
        }
      ) {
        aggregate {
          count
        }
      }
    }
    `,
      variables: {
        tokenId: tokenId,
        contractAddress: contractName || "",
      },
    }),
  });
  return res;
};

// Function to retrieve all NFTs owned by a specific account address
const getOwnedNFTs = (owner) => {
  if (!owner) return console.log("missing owner address");
  try {
    const response = asyncFetch(mbGraphEndpoint, {
      method: "POST",
      headers: {
        "mb-api-key": "anon",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query MyQuery($owner: String!) {
                mb_views_nft_tokens(
                  where: {owner: {_eq: $owner}, _and: {burned_timestamp: {}, last_transfer_timestamp: {}}}
                  limit: 30
                  order_by: {minted_timestamp: asc}
                ) {
                  nft_contract_id
                  title
                  description
                  media
                  last_transfer_receipt_id
                }
              }`,
        variables: {
          owner: owner || context.accountId,
        },
      }),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Function to burn (permanently remove) existing NFTs
const nftBurn = (tokenIds, contractName) => {
  if (!isSignedin) return console.log("sign in first");
  if (!tokenIds.length) return console.log("missing token ids");
  const gas = 2e14;
  const deposit = 1;
  try {
    return Near.call([
      {
        contractName: contractName || "",
        methodName: "nft_batch_burn",
        args: {
          token_ids: tokenIds,
        },
        gas,
        deposit,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

return {
  deployStore,
  getTokenById,
  getStoreNFTs,
  getOwnedNFTs,
  mint,
  nftBurn,
  getTimePassed,
  getUserStores,
  checkStoreOwner,
  getUserEarnings,
  buyTokenAsADao,
  getOffersToAccount,
  fetchNFTInfo,
  getOpenOffersByAccount,
  addAndRemoveMinters,
  getCombinedStoreData,
  transferStoreOwnershipAsADao,
  saveBasicSettings,
  transferStoreOwnership,
  fetchStoreMinters,
  mintNftAsADao,
  getActivityByContract,
  listAsADao,
  deployStoreAsADao,
};
