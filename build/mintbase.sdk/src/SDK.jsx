let { onLoad, onRefresh, loaded } = props;

const spec = "nft-1.0.0";
const base_uri = "https://arweave.net";
// const marketAddress = "simple.market.mintbase1.near";
const _price = (price) =>
  Number(Number(new Big(price).mul(new Big(10).pow(24)).toString()))
    .toLocaleString()
    .replace(/,/g, "");

let MintbaseSDK = {
  initialized: false,
  mainnet: props.mainnet ? true : false,
  contractName: MintbaseSDK.mainnet ? "mintbase1.near" : "mintspace2.testnet",
  marketAddress: MintbaseSDK.mainnet
    ? "simple.market.mintbase1.near"
    : "market-v2-beta.mintspace2.testnet",
  owner_id: context.accountId,
  mbGraphEndpoin: `https://graph.mintbase.xyz`,
  init: () => {
    MintbaseSDK.initialized = true;
    MintbaseSDK.refresh();
  },
  refresh: () => {
    if (onRefresh) {
      onRefresh(MintbaseSDK);
    }
  },
  ipfsUrl: (cid) => `https://ipfs.near.social/ipfs/${cid}`,
  getTokenById: (contractAddress, tokenId) => {
    const res = asyncFetch(MintbaseSDK.mbGraphEndpoin, {
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
          contractAddress: contractAddress,
        },
      }),
    });
    return res;
  },
  getStoreNfts: (contractAddress) => {
    const response = asyncFetch(MintbaseSDK.mbGraphEndpoin, {
      method: "POST",
      headers: {
        "mb-api-key": "anon",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query GetStoreNfts( 
          $offset: Int = 0 $condition: mb_views_nft_metadata_unburned_bool_exp ) 
          @cached 
          { mb_views_nft_metadata_unburned( where: $condition 
            offset: $offset order_by: { minted_timestamp: desc } ) 
           { createdAt: minted_timestamp 
             listed: price 
             media 
             storeId: nft_contract_id 
             metadataId: metadata_id 
             title base_uri 
           } 
          mb_views_nft_metadata_unburned_aggregate(where: $condition) 
          { 
            aggregate { 
              count 
            } 
           } 
         }
      `,
        variables: { condition: { nft_contract_id: { _in: contractAddress } } },
      }),
    });
    return response;
  },
  getOwnedNFTs: (owner) => {
    const response = asyncFetch(MintbaseSDK.mbGraphEndpoin, {
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
          owner: owner || MintbaseSDK.owner_id,
        },
      }),
    });
    return response;
  },
  deployStore: (storeName, symbol_name, reference, referenceHash, baseUri) => {
    const gas = 2e14;
    const deposit = 65e23;
    return Near.call([
      {
        contractName: MintbaseSDK.contractName,
        methodName: "create_store",
        args: {
          owner_id: MintbaseSDK.owner_id,
          metadata: {
            name: storeName,
            spec: spec,
            symbol: symbol_name,
            ...(baseUri && { base_uri: baseUri }),
            ...(reference && { reference }),
            ...(referenceHash && { reference_hash: referenceHash }),
          },
        },
        deposit: deposit,
        gas: gas,
      },
    ]);
  },
  mint: (tokenMetadata, media, contractAddress, numToMint) => {
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: media,
    })
      .then((res) => {
        const cid = res.body.cid;
        const gas = 2e14;
        return Near.call([
          {
            contractName: contractAddress,
            methodName: "nft_batch_mint",
            args: {
              owner_id: MintbaseSDK.owner_id,
              metadata: {
                media: MintbaseSDK.ipfsUrl(cid),
                ...tokenMetadata,
              },
              num_to_mint: numToMint || 1,
              royalty_args: {
                split_between: {
                  [MintbaseSDK.owner_id]: 10000,
                },
                percentage: 1000,
              },
              split_owners: null,
            },
            gas: gas,
            deposit: 8e22,
          },
        ]);
      })
      .catch((err) => console.log(err));
  },
  nftBurn: (tokenIds, contractName) => {
    const gas = 2e14;
    const deposit = 1;
    return Near.call([
      {
        contractName: contractName,
        methodName: "nft_batch_burn",
        args: {
          token_ids: tokenIds,
        },
        gas,
        deposit,
      },
    ]);
  },
  nftTransfer: (tokenId, accountId) => {
    const deposit = 1;
    return Near.call([
      {
        contractName: contractName,
        methodName: "nft_transfer",
        args: {
          token_id: tokenId,
          receiver_id: accountId,
        },
        deposit,
      },
    ]);
  },
  nftApprove: (tokenId, nftContractId, price) => {
    const gas = 2e14;
    const storageDeposit = 1e22;
    return Near.call([
      {
        contractName: MintbaseSDK.marketAddress,
        methodName: "deposit_storage",
        args: {},
        gas: gas,
        deposit: storageDeposit,
      },
      {
        methodName: "nft_approve",
        contractName: nftContractId,
        gas: gas,
        args: {
          token_id: tokenId,
          account_id: MintbaseSDK.marketAddress,
          msg: JSON.stringify({
            price: _price(price),
          }),
        },
        deposit: 8e22,
      },
    ]);
  },
};
if (onLoad && !loaded) {
  MintbaseSDK.init();
  onLoad(MintbaseSDK);
}
