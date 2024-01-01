const [media, setMedia] = useState("");
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [sdk, setSDK] = useState(false);

const filesOnChange = (files) => {
  if (files) {
    setMedia(files[0]);
  }
};

const handleSubmit = () => {
  const tokenMetadata = {
    title: title,
    description: desc,
  };
  sdk.mint(tokenMetadata, media);
};

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
        onChange={(e) => setTitle(e.target.value)}
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
        onChange={(e) => setDesc(e.target.value)}
        defaultValue=""
      />
    </div>
    <div className="d-inline-block">
      {media ? (
        <img
          class="rounded w-100 h-100"
          style={{ objectFit: "cover" }}
          src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
          alt="upload preview"
        />
      ) : (
        ""
      )}
      <Files
        multiple={false}
        accepts={["image/*"]}
        minFileSize={1}
        clickable
        className="btn btn-outline-primary"
        onChange={filesOnChange}
      >
        {media?.uploading ? <> Uploading </> : "Upload an Image"}
      </Files>
    </div>
    <input type="submit" onClick={() => handleSubmit()} />
  </div>
);
