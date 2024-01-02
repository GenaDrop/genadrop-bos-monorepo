const [state, setState] = useState({
  media: "",
  title: "",
  desc: "",
  name: "",
  symbol: "",
  tokenId: "3",
  contractAddress: "liberty.mintbase1.near",
  tokenData: [],
  storeNFTs: [],
});
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
    title: state.title,
    description: state.desc,
  };
  const mint = sdk.mint(tokenMetadata, media);
};

const handleDeploy = () => {
  const deploy = sdk.deployStore(state.name, state.symbol);
  console.log("symbol", deploy);
};
const handleFetch = (type) => {
  let res;
  switch (type) {
    case "get-token":
      res = sdk.getTokenById(state.contractAddress, state.tokenId);
      res.then((res) => {
        updateState({ tokenData: res.body.data.mb_views_nft_tokens });
      });
      break;
    case "get-store-nft":
      res = sdk.getStoreNfts(state.contractAddress);
      res.then((res) => {
        updateState({
          storeNFTs: res.body.data.mb_views_nft_metadata_unburned,
        });
      });
      break;

    default:
      break;
  }
};
console.log(state.tokenData);
return (
  <div>
    <Widget
      src="test.near/widget/SDK"
      props={{
        mainnet: true,
        onLoad: (sdk) => setSDK(sdk),
        onRefresh: (sdk) => setSDK(sdk),
        loaded: sdk,
      }}
    />
    <h1>TEST MINT</h1>
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
    <h1>TEST DEPLOY</h1>
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
    <h1>TEST GET TOKEN BY ID</h1>
    <Label.Root className="LabelRoot" htmlFor="firstName">
      Token ID
    </Label.Root>
    <input
      className="Input"
      onChange={(e) => updateState({ tokenId: e.target.value })}
      type="text"
      value={state.tokenId}
    />
    <Label.Root className="LabelRoot" htmlFor="firstName">
      Contract Address
    </Label.Root>
    <input
      className="Input"
      onChange={(e) => updateState({ contractAddress: e.target.value })}
      type="text"
      value={state.contractAddress}
    />
    <input type="submit" onClick={() => handleFetch("get-token")} value="get" />
    <div>{JSON.stringify(state.tokenData[0])}</div>
    <h1>TEST GET STORE NFTs</h1>
    <Label.Root className="LabelRoot" htmlFor="firstName">
      Contract Address
    </Label.Root>
    <input
      className="Input"
      onChange={(e) => updateState({ contractAddress: e.target.value })}
      type="text"
      value={state.contractAddress}
    />
    <input
      type="submit"
      onClick={() => handleFetch("get-store-nft")}
      value="get"
    />
    <div>{JSON.stringify(state.storeNFTs)}</div>
  </div>
);
