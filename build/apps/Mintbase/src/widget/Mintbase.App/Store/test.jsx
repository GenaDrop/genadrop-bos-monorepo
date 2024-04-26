const [state, setState] = useState({
  media: "",
  title: "",
  desc: "",
  name: "",
  symbol: "",
  tokenId: "3",
  contractAddress: "nakma2321.mintspace2.testnet",
  address: "",
  price: "",
  recevierId: "",
  tokenData: [],
  storeNFTs: [],
  ownedNFTs: [],
});
const {
  media,
  title,
  desc,
  name,
  symbol,
  tokenId,
  contractAddress,
  address,
  price,
  tokenData,
  storeNFTs,
  ownedNFTs,
  recevierId,
} = state;
const updateState = (args) => {
  setState({ ...state, ...args });
};
const [sdk, setSDK] = useState(false);
const filesOnChange = (files) => {
  if (files) {
    updateState({ media: files[0] });
  }
};
const handleSubmit = () => {
  const tokenMetadata = {
    title: title,
    description: desc,
  };
  const mint = sdk.mint(tokenMetadata, media, contractAddress);
};
const handleDeploy = () => {
  const deploy = sdk.deployStore(name, symbol);
};
const handleFetch = (type) => {
  let res;
  switch (type) {
    case "get-token":
      res = sdk.getTokenById(contractAddress, tokenId);
      res.then((res) => {
        updateState({ tokenData: res.body.data.mb_views_nft_tokens });
      });
      break;
    case "get-store-nft":
      res = sdk.getStoreNfts(contractAddress);
      res.then((res) => {
        updateState({
          storeNFTs: res.body.data.mb_views_nft_metadata_unburned,
        });
      });
      break;
    case "get-owned-nft":
      res = sdk.getOwnedNFTs("leo_phoenix.near");
      res.then((res) => {
        updateState({
          ownedNFTs: res.body.data.mb_views_nft_tokens,
        });
      });
      break;
    case "list-nft":
      sdk.nftApprove(tokenId, contractAddress, price);
      break;
    case "nft-burn":
      sdk.nftBurn([tokenId], contractAddress);
      break;
    case "nft-transfer":
      console.log(recevierId);
      sdk.nftTransfer(tokenId, recevierId, contractAddress);
      break;
    default:
      break;
  }
};
return (
  <div>
    <Widget
      src="bos.genadrop.near/widget/Mintbase.SDK"
      props={{
        mainnet: false,
        contractName: "nakma2321.mintspace2.testnet",
        loaded: sdk,
        onLoad: (sdk) => setSDK(sdk),
        onRefresh: (sdk) => setSDK(sdk),
      }}
    />
    <h1 className="mt-4"> MINT</h1>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        title
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ title: e.target.value })}
        type="text"
        defaultValue=""
      />
    </div>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        desc
      </Label.Root>
      <input
        className="Input"
        type="text"
        onChange={(e) => updateState({ desc: e.target.value })}
        defaultValue=""
      />
    </div>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        Contract Address
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ contractAddress: e.target.value })}
        type="text"
        value={contractAddress}
      />
    </div>
    <div className="d-inline-block">
      <Files
        multiple={false}
        accepts={["image/*"]}
        minFileSize={1}
        clickable
        className="btn btn-outline-primary"
        onChange={filesOnChange}
      >
        Upload an Image
      </Files>
    </div>
    <input type="submit" onClick={() => handleSubmit()} value="mint" />
    <h1 className="mt-4">DEPLOY</h1>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        name
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ name: e.target.value })}
        type="text"
        defaultValue=""
      />
    </div>{" "}
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        symbol
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ symbol: e.target.value })}
        type="text"
        defaultValue=""
      />
    </div>
    <h1 className="mt-4">GET TOKEN BY ID</h1>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        Token ID
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ tokenId: e.target.value })}
        type="text"
        value={tokenId}
      />
    </div>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        Contract Address
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ contractAddress: e.target.value })}
        type="text"
        value={contractAddress}
      />
    </div>
    <input type="submit" onClick={() => handleFetch("get-token")} value="get" />
    <div>{JSON.stringify(tokenData[0])}</div>
    <h1 className="mt-4"> GET STORE NFTs</h1>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        Contract Address
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ contractAddress: e.target.value })}
        type="text"
        value={contractAddress}
      />
    </div>
    <input
      type="submit"
      onClick={() => handleFetch("get-store-nft")}
      value="get"
    />
    <div>{JSON.stringify(storeNFTs)}</div>
    <h1 className="mt-4"> GET OWNED NFTs</h1>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        Address
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ address: e.target.value })}
        type="text"
        placeholder="provide address or signed in address"
        value={address}
      />
    </div>
    <input
      type="submit"
      onClick={() => handleFetch("get-owned-nft")}
      value="get"
    />
    <div>{JSON.stringify(ownedNFTs)}</div>
    <h1 className="mt-4">List NFT</h1>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        Token Id
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ tokenId: e.target.value })}
        type="text"
        placeholder=""
        value={tokenId}
      />
    </div>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        Token Contract Id
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ contractAddress: e.target.value })}
        type="text"
        placeholder=""
        value={contractAddress}
      />
    </div>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        price in near
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ price: e.target.value })}
        type="text"
        placeholder=""
        value={price}
      />
    </div>
    <input type="submit" onClick={() => handleFetch("list-nft")} value="list" />
    <h1 className="mt-4">NFT BURN</h1>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        Token Id
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ tokenId: e.target.value })}
        type="text"
        placeholder=""
        value={tokenId}
      />
    </div>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        Conrtact Address
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ contractAddress: e.target.value })}
        type="text"
        placeholder=""
        value={contractAddress}
      />
    </div>{" "}
    <input type="submit" onClick={() => handleFetch("nft-burn")} value="list" />
    <h1 className="mt-4">NFT TRANSFER</h1>
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        TOKEN ID
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ tokenId: e.target.value })}
        type="text"
        placeholder=""
        value={tokenId}
      />
    </div>{" "}
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        accountId
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ recevierId: e.target.value })}
        type="text"
        placeholder=""
        value={recevierId}
      />
    </div>{" "}
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor="firstName">
        Conrtact Address
      </Label.Root>
      <input
        className="Input"
        onChange={(e) => updateState({ contractAddress: e.target.value })}
        type="text"
        placeholder=""
        value={contractAddress}
      />
    </div>{" "}
    <input
      type="submit"
      onClick={() => handleFetch("nft-transfer")}
      value="list"
    />
  </div>
);
