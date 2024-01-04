# Mintbase SDK

Features
---------------

- [Get Token By Id](#get-token-by-id)
- [Get Store NFTs](#get-store-nfts)
- [Get Owned NFTs](#get-owned-nfts)
- [Deploy Store](#deploy-store)
- [Mint NFT](#mint-nft)
- [List NFT](#list-nft)
- [Transfer NFT](#transfer-nft)
- [Burn NFT](#burn-nft)

## Props

| Props        |      Type      | Default |
| ------------ | :------------: | ------: |
| mainnet      |    boolean     |   false |
| contractName |     string     |      "" |
| loaded       | state variable |    null |
| onLoad       |    function    |    null |
| onRefresh    |    function    |    null |

## Initialize

```javascript
const [sdk, setSDK] = useState(false);

return (
    <Widget
      src="test.near/widget/SDK"
      props={{
        mainnet: false,
        contractName: "nakma2321.mintspace2.testnet",
        loaded: sdk,
        onLoad: (sdk) => setSDK(sdk),
        onRefresh: (sdk) => setSDK(sdk),
      }}
    />
    ....)
```

### Get Token By Id

```javascript
res = sdk.getTokenById(contractName? : string, tokenId : string ); //Ex "nakma2321.mintspace2.testnet", "1"

res.then((res) => {
        console.log(res.body.data.mb_views_nft_tokens);
    });
```

### Get Store NFTs

```javascript
res = sdk.getStoreNfts(contractName? : string) //Ex "nakma2321.mintspace2.testnet"

res.then((res) => {
        console.log(res.body.data.mb_views_nft_metadata_unburned);
    });
```

### Get Owned NFTs

```javascript
res = sdk.getOwnedNFTs(owner? : string); // will default to signed-in user Ex "eo_phoenix.near"

res.then((res) => {
    console.log(res.body.data.mb_views_nft_tokens);

```

### Deploy Store

```javascript
sdk.deployStore(storeName: string, // Ex "kanami", "KNM"
// symbol max-length = 3
symbol: string,
//will default to null
reference?: string,
//will default to null
referenceHash?: string);
```

### Mint NFT

```javascript
sdk.mint(tokenMetadata : TokenMetadata , media : File, contractName? : string, numToMint? : number); //numToMint default = 1
// Ex
const tokenMetadata = {
    title: "shinigami,
    description: "shinigami ex",
  };
const media = File
sdk.mint(tokenMetadata,media);
```

[TokenMetadata](https://docs.mintbase.xyz/dev/metadata#metadata-on-chain-vs.-reference-json-off-chain)

### List NFT

```javascript
sdk.nftApprove(tokenId : string, contractName? : string,
// price in Near
price: string
); //Ex "2", "nakma2321.mintspace2.testnet" ,"2"
```

### Transfer NFT

```javascript
 sdk.nftTransfer(tokenId: string, recevierId: string, contractAddress?: string); // Ex "1", "baam.near"
```

### Burn NFT

```javascript
 sdk.nftBurn(tokenIds: [string], contractAddress?: string); // Ex ["1"]
```
