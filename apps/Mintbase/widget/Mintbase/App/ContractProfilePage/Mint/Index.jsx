const checked = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 0 24 24"
    width="20px"
    fill="#000000"
    class="fill-current text-white dark:text-black"
  >
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
  </svg>
);

const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const { mint, mintNftAsADao } = VM.require(
  "${config_account}/widget/Mintbase.utils.sdk"
);

const MintRoot = styled.div`
  background: #f9f9f9;
  &.mint-dark {
    background: #1e2030;
  }
  padding: 24px;
  width: 100%;
  @media (max-width: 500px) {
    width: 95vw;
  }
  h2 {
    font-size: 16px;
    font-weight: bold;
  }

  .bottomButtons {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    p {
      font-size: 14px;
      text-transform: uppercase;
    }
    button {
      background: #000;
      border-color: #000;
      &:hover {
        background: #fff;
        color: #000;
      }
    }
  }
`;

const MintAmount = styled.div`
.amount-input{
  width: 20%;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  padding: 5px 10px;
  p{
    margin-bottom: 8px;
    color: ${props.isDarkModeOn ? "#fff" : "#000"};
  }
  span{
    color: #ff0000;
  }
  @media (max-width: 500px) {
    width: 70%;
  }
}
.burn-light {
  color: #000;
  background-color: #f2f5f8;
  button {
    background-color: #000;
    color: #fff;
  }
  input {
    color: #000;
  }
  
}
.burn-dark {
  color: #fff;
  background: #101223;
  button {
    background-color: #fff;
    color: #000;
  }
  input {
    color: #fff;
  }
}
  .burn-dark, .burn-light {  
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    @media (max-width: 500px) {
      width: 70%;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input:focus {
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
    }
    input {
      width: 40%;
      background: transparent;
      border: transparent;
     
    }
    p {
      margin: 0;
      padding: 2px 10px;
    }
    button {
      padding: 3px 9px;
      border: none;
    
      border-radius: 4px;
      &:disabled {
        cursor: not-allowed;
        background-color: #767986;
        color: #fff;
      }
    }
    }
`;

const Basic = styled.div`
  background: white;
  padding: 12px;
  margin-bottom: 20px;
  width: 100%;
  &.mint-dark {
    background: #1e2030;
    h2 {
      color: #fff;
    }
    .top {
    border-bottom: 1px solid #1e2030;
    }
    .file-upload {
    background: #101223;
    }
  }
  .top {
    border-bottom: 1px solid #f9f9f9;
  }
  .fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
    button {
      width: 100px;
      align-self: center;
      background-color: black;
      border-color: black;
      &:hover {
        background: white;
        color: black;
      }
    }
  }
  .mainImage {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    .file-upload {
      background: #eaedfb;
      width: 100% !important;
      margin-left: auto;
      margin-right: auto;
      justify-content: center;
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 100px;
    }
  }
  .default {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin: 0;
      color: #535aa5;
    }
  }
  .image-file {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    img {
      width: 256px;
      height: 256px;
      object-fit: cover;
    }
  }
  .pre-text {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
  }
`;

const Categories = styled.div`
  padding: 10px;
  margin-top: 20px;
  @media (max-width: 500px) {
    .section {
      overflow-x: scroll;
    }
  }
  .section {
    display: flex;
    align-items: center;
    gap: 20px;
    .category {
      background: #eaedfb;
      padding: 5px 20px;
      cursor: pointer;
      border-radius: 20px;
      span {
        color: #7b83ba;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .category.active {
      background: #4e58a2;
      span {
        color: #fff;
      }
    }
  }
`;

const Mint = ({ isDarkModeOn, contractId, connectedDao }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [description, setDescription] = useState("");
  const [metaDataStatus, setMetaDataStatus] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState("");
  const [tags, setTags] = useState([]);
  const [activeCategory, setActiveCategory] = useState(-1);
  const [royalties, setRoyalties] = useState([]);
  const [splits, setSplits] = useState([]);
  const [img, setImg] = useState(null);

  const uploadFile = (files) => {
    const file = files[0];
    setLoadingUpload(true);
    const uploadPromise = asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        "Content-Type": file.type, // Set content type based on file
      },
      body: file,
    })
      .then((response) => {
        if (!response.ok) {
          setMsg("Upload failed!");
          return Promise.reject(new Error("Upload failed"));
        }
        return response.body;
      })
      .then((data) => {
        setImg(data.cid);
      })
      .catch((error) => {
        setMsg("Upload failed!");
      })
      .finally(() => {});

    uploadPromise
      .then(() => {
        console.log("Upload successful!");
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      })
      .finally(() => setLoadingUpload(false));
  };

  const onMint = (isDAO) => {
    // if (!title && !description && !img) {
    //   return setErrorMessage(
    //     "Please make sure that all required fields are filled"
    //   );
    // }
    let splitsRevenue = [];
    let royaltiesAvailable = [];

    // CALCULATION FOR ROYALTIES
    if (
      royalties.some((data) => data.accountId !== "" && data?.percent !== "")
    ) {
      royaltiesAvailable = royalties.map((data) => ({
        ...data,
        percent: Number(data.percent) / 100,
      }));
    } else if (
      royalties.length === 1 &&
      royalties.some((data) => data.accountId === "" && data?.percent === "")
    ) {
      royaltiesAvailable = null;
    } else if (
      royalties.some((data) => data.accountId === "" || data?.percent === "")
    ) {
      return setErrorMessage(
        "Please make sure all Royalties fields are filled"
      );
    }

    // CALCULATION FOR SPLITS
    if (splits.some((data) => data.accountId !== "" && data?.percent !== "")) {
      splitsRevenue = splits.map((data) => ({
        ...data,
        percent: Number(data.percent) * 100,
      }));
      if (splits.some((data) => data.accountId !== context.accountId)) {
        const totalRev = splits.reduce((a, b) => a + Number(b.percent), 0);
        splitsRevenue.push({
          accountId: context.accountId,
          percent: (100 - totalRev) * 100,
        });
      }
    } else if (
      splits.length === 1 &&
      splits.some((data) => data.accountId === "" && data?.percent === "")
    ) {
      splitsRevenue = null;
    } else {
      return setErrorMessage("Please make sure all Splits fields are filled");
    }

    const metadata = {
      title,
      description,
      media: `https://ipfs.io/ipfs/${img}`,
      extra: [],
      store: contractId,
      type: "NEP171",
      royalties: royaltiesAvailable,
      splits: splitsRevenue,
      category: categories[activeCategory],
      tags: tags,
    };
    const owner = context.accountId;
    if (isDAO === "DAO") {
      mintNftAsADao(
        connectedDao?.address,
        metadata,
        img,
        contractId,
        mintAmount,
        owner,
        setErrorMessage,
        setMetaDataStatus
      );
    } else {
      return mint(
        metadata,
        img,
        contractId,
        mintAmount,
        owner,
        setErrorMessage,
        setMetaDataStatus
      );
    }
  };

  const categories = [
    "Art",
    "DeFi",
    "Fashion",
    "Membership",
    "Music",
    "Photography",
    "Ticker",
  ];

  return (
    <MintRoot className={isDarkModeOn ? "mint-dark" : "mint-light"}>
      <Basic className={isDarkModeOn ? "mint-dark" : "mint-light"}>
        <div className="top">
          <h2>Basic Information</h2>
        </div>
        <MintAmount>
          <div className="amount-input">
            <p>Amount to mint (max 50)<span className="red-text">*</span></p>
            <div className={isDarkModeOn ? "burn-dark" : "burn-light"}>
              <input
                type="number"
                max={50}
                inputmode="numeric"
                pattern="[0-9]*"
                value={mintAmount}
                onChange={(e) => setMintAmount(Math.min(e.target.value, 50))}
              />
              <div className="buttons">
                <button
                  onClick={() => setMintAmount((prev) => Number(prev) - 1)}
                  className="minus"
                  disabled={mintAmount === 1}
                >
                  -
                </button>
                <button
                  disabled={mintAmount === 50}
                  onClick={() => setMintAmount((prev) => Number(prev) + 1)}
                  className="plus"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <MbInputField
              className="input-field"
              id="name"
              value={title}
              type="text"
              isDarkModeOn={isDarkModeOn}
              placeholder="Name of Token"
              label="Name"
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <MbInputField
              className="input-field"
              id="description"
              isDarkModeOn={isDarkModeOn}
              label="Description"
              value={description}
              placeholder="Describe what this token represents"
              rows={8}
              type="textarea"
              onChange={(e) => setDescription(e.target.value)}
              required={true}
            />
          </div>
        </MintAmount>
        <div className="mainImage">
          <p>
            Main Image <span style={{ color: "red" }}>*</span>
          </p>
          {img ? (
            <div className="image-file">
              <img src={`https://ipfs.near.social/ipfs/${img}`} />
            </div>
          ) : (
            ""
          )}
          <>
            <Files
              multiple={false}
              accepts={["image/*"]}
              clickable
              className="file-upload"
              onChange={uploadFile}
            >
              <div className="default">
                {loadingUpload ? (
                  <h2>Uploading...</h2>
                ) : (
                  <>
                    <p>Upload File</p>
                    <span>(or just drop your file here)</span>
                    {img && (
                      <h2
                        onClick={(e) => {
                          e.stopPropagation();
                          setImg(null);
                        }}
                        style={{ color: "red" }}
                      >
                        {" "}
                        Remove
                      </h2>
                    )}
                  </>
                )}
              </div>
            </Files>
            <h4 className="pre-text">
              Accepted Formats: image/png, image/jpeg, image/gif, image/svg+xml
              | Ideal dimension: 1:1 | Max size: 5mb
            </h4>
          </>
        </div>
        <Categories>
          <h2>Category</h2>
          <div className="section">
            {categories?.map((data, index) => (
              <div
                onClick={() => setActiveCategory(index)}
                className={`category ${
                  activeCategory === index ? "active" : ""
                }`}
                key={index}
              >
                <span>{data}</span>
              </div>
            ))}
          </div>
        </Categories>
        <Categories>
          <h2>Tags</h2>
          <Typeahead
            multiple
            options={["AI", "DAOs", "Vibes"]}
            allowNew
            placeholder="Add up to 4 tags to improve discoverability"
            selected={tags}
            onChange={(e) => setTags(e)}
          />
        </Categories>
      </Basic>
      <Widget
        src="${config_account}/widget/Mintbase.App.ContractProfilePage.ContractSettings.Royalties"
        props={{
          isDarkModeOn,
          handleRoyalties: setRoyalties,
          isMintPage: true,
        }}
      />
      <Widget
        src="${config_account}/widget/Mintbase.App.ContractProfilePage.ContractSettings.Revenue"
        props={{
          isDarkModeOn,
          handleSplits: setSplits,
          isMintPage: true,
        }}
      />
      <div className="bottomButtons">
        <div>
          <button disabled={metaDataStatus} onClick={onMint}>
            {metaDataStatus ? "Uploading Metadata..." : "Mint me"}
          </button>
          {connectedDao?.permission && (
            <button disabled={metaDataStatus} onClick={() => onMint("DAO")}>
              {metaDataStatus ? "Uploading Metadata..." : "Mint As A DAO"}
            </button>
          )}
        </div>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </div>
    </MintRoot>
  );
};

return <Mint {...props} />;
