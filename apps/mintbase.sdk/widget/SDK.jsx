let { onLoad, onRefresh, loaded } = props;

const spec = "nft-1.0.0";
const base_uri = "https://arweave.net";
const marketAddress = "simple.market.mintbase1.near";
let MintbaseSDK = {
  initialized: false,
  mainnet: props.mainnet ? true : false,
  contractName: MintbaseSDK.mainnet ? "mintbase1.near" : "mintspace2.testnet",
  owner_id: context.accountId,
  mbGraphEndpoin: `https://graph.mintbase.xyz/${
    MintbaseSDK.mainnet ? "mainnet" : "testnet"
  }`,
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
    const response = fetch(MintbaseSDK.mbGraphEndpoin, {
      method: "POST",
      headers: {
        "mb-api-key": "anon",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query GetTokenById{
          mb_views_nft_tokens(
            where: {
              nft_contract_id: { _eq: "${contractAddress}" }
              token_id: { _eq: "${tokenId}" }
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
              token_id: { _eq: "${tokenId}"  }
              kind: { _eq: "auction" }
              nft_contract_id: { _eq: ${contractAddress} }
            }
          ) {
            aggregate {
              count
            }
          }
        }`,
      }),
    });
    return response.body.data.mb_views_nft_tokens;
  },
  getStoreNfts: (contractAddress) => {
    const response = fetch(MintbaseSDK.mbGraphEndpoin, {
      method: "POST",
      headers: {
        "mb-api-key": "anon",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query GetStoreNfts {
          mb_views_nft_metadata_unburned(
            where: { nft_contract_id: { _eq: ${contractAddress} } }
          ) {
            createdAt: minted_timestamp
            listed: price
            media
            storeId: nft_contract_id
            metadataId: metadata_id
            title
            base_uri
          }
          mb_views_nft_metadata_unburned_aggregate(
            where: { nft_contract_id: { _eq: ${contractAddress} } }
          ) {
            aggregate {
              count
            }
          }
        }
`,
      }),
    });
    return response.body.data.mb_views_nft_metadata_unburned;
  },
  getOwnedNFTs: (owner) => {
    const response = fetch(MintbaseSDK.mbGraphEndpoin, {
      method: "POST",
      headers: {
        "mb-api-key": "anon",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query MyQuery {
                mb_views_nft_tokens(
                  where: {owner: {_eq: "${owner}"}, _and: {burned_timestamp: {_is_null: true}, last_transfer_timestamp: {_is_null: false}}}
                  limit: 30
                  order_by: {last_transfer_timestamp: desc}
                ) {
                  nft_contract_id
                  title
                  description
                  media
                  last_transfer_receipt_id
                }
              }}`,
      }),
    });
    return response.body.data.mb_views_nft_tokens;
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
  mint: (tokenMetadata, media, contractName, numToMint) => {
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: media,
    })
      .then((res) => {
        const cid = res.body.cid;
        const deposit = 1;
        return Near.call([
          {
            contractName: contractName,
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
            deposit: deposit,
          },
        ]);
      })
      .catch((err) => console.log(err));
  },
  nftBurn: (tokenIds, contractName) => {
    return Near.call([
      {
        contractName: contractName,
        methodName: "nft_batch_burn",
        args: {
          token_ids: tokenIds,
        },
      },
    ]);
  },
};
if (onLoad && !loaded) {
  MintbaseSDK.init();
  onLoad(MintbaseSDK);
}
