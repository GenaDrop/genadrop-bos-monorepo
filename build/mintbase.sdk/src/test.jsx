const [state, setState] = useState({
  media: "",
  title: "",
  desc: "",
  name: "",
  symbol: "",
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
  sdk.mint(tokenMetadata, media);
};

const handleDeploy = () => {};
return (
  <div>
    <Widget
      src="test.near/widget/SDK"
      props={{
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
        id="firstName"
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
        id="firstName"
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
        id="firstName"
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
        id="firstName"
        defaultValue=""
      />
    </div>
    <input type="submit" onClick={() => handleDeploy()} value="deploy" />
  </div>
);
