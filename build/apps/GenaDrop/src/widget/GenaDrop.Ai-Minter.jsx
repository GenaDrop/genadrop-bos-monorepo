const auroraCOntract = "0xe53bC42B6b25a1d548B73636777a0599Fd27fE5c";
const polygonContract = "0x436AEceaEeC57b38a17Ebe71154832fB0fAFF878";
const celoContract = "0xC291846A587cf00a7CC4AF0bc4EEdbC9c3340C36";
const avaxContract = "0x43dBdfcAADD0Ea7aD037e8d35FDD7c353B5B435b";
const arbitrumContract = "0x959a2945185Ec975561Ac0d0b23F03Ed1b267925";
const nearContract = "nft.genadrop.near";
const ownerId = "minorityprogrammers.near"; // attribution
const mintSingle = [
  "function mint(address to, uint256 id, uint256 amount, string memory uri, bytes memory data) public {}",
];
State.init({
  title: "",
  description: "",
  recipient: "",
  showAlert: false,
  toastMessage: "",
  imgUrl: "",
  fetchStatusError: false,
  prompt: "",
  cid: "",
  isLoading: false,
});
let accountId = context.accountId;
const contractAddresses = {
  137: [polygonContract, "Polygon", "https://polygonscan.com/tx/"],
  1313161554: [auroraCOntract, "Aurora", "https://explorer.aurora.dev/tx/"],
  42220: [celoContract, "Celo", "https://explorer.celo.org/mainnet/tx/"],
  43114: [avaxContract, "Avalanche", "https://snowtrace.io/tx/"],
  42161: [arbitrumContract, "Arbitrum", "https://arbiscan.io/tx/"],
  0: [nearContract, "Near"],
};
const chains = [
  {
    id: "137",
    name: "Polygon",
    url: "https://ipfs.near.social/ipfs/bafkreie5h5oq6suoingcwuzj32m3apv56rl56wpwpaxmevlk5vndlypxze",
  },
  {
    id: "1313161554",
    name: "Aurora",
    url: "https://ipfs.near.social/ipfs/bafkreiajqik4gjbmkh7z2gylpjzrsuht7simjecpxuoqn6icqfbioswzuy",
  },
  {
    id: "42220",
    name: "Celo",
    url: "https://ipfs.near.social/ipfs/bafkreifu6ufsdf2ivrs5febt7l25wdys6odzfelgjauzod7owrfug56cxe",
  },
  {
    id: "43114",
    name: "Avax",
    url: "https://ipfs.near.social/ipfs/bafkreifhu5fytsjcmjluarfnu6kcdhaqz4rgdrbbzf6dlsmggqb7oi3w4e",
  },
  {
    id: "42161",
    name: "Arbitrum",
    url: "https://ipfs.near.social/ipfs/bafkreiffax4lnya337rz5ph75faondeqmpy6xj37yprwvxbru4qc5emsiq",
  },
  {
    id: "0",
    name: "Near",
    url: "https://ipfs.near.social/ipfs/bafkreigv55ubnx3tfhbf56toihekuxvgzfqn5c3ndbfjcg3e4uvaeuy5cm",
  },
];
const handleMint = () => {
  console.log("it's here", state.title && state.description && state.cid);
  if (!state.cid) {
    return;
  }
  if (!state.title) {
    console.log("Please Enter title");
    State.update({
      showAlert: true,
      toastMessage: "Please enter a title for the NFT",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else if (!state.description) {
    State.update({
      showAlert: true,
      toastMessage: "Please enter a description for the NFT",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else {
    if (state.selectedChain == "0") {
      const gas = 200000000000000;
      const deposit = 10000000000000000000000;
      const metadata = {
        name: state.title,
        description: state.description,
        properties: [],
        image: `ipfs://${state.cid}`,
      };
      asyncFetch("https://ipfs.near.social/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: metadata,
      }).then((res) => {
        const cid = res.body.cid;
        const Id = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);
        console.log("in the promise", res, Id);
        Near.call([
          {
            contractName: nearContract,
            methodName: "nft_mint",
            args: {
              token_id: `${Date.now()}`,
              metadata: {
                title: state.title,
                description: state.description,
                media: `https://ipfs.io/ipfs/${state.cid}`,
                reference: `ipfs://${cid}`,
              },
              receiver_id: state.recipient || accountId,
            },
            gas: gas,
            deposit: deposit,
          },
        ]);
      });
      return;
    }
    console.log("passed checks");
    let networkId = Ethers.provider()._network.chainId;
    const CA = contractAddresses[state.selectedChain][0] || "137";
    console.log("CONTRACT ADD", CA);
    const contract = new ethers.Contract(
      CA,
      mintSingle,
      Ethers.provider().getSigner()
    );
    const metadata = {
      name: state.title,
      description: state.description,
      properties: [],
      image: `ipfs://${state.cid}`,
    };
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    }).then((res) => {
      const cid = res.body.cid;
      const Id = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);
      console.log("in the promse", res, Id);
      const recipient = Ethers.send("eth_requestAccounts", []);
      contract
        .mint(state.recipient || recipient[0], Id, 1, `ipfs://${cid}`, "0x")
        .then((transactionHash) => transactionHash.wait())
        .then((ricit) => {
          console.log("receipt::", ricit);
          State.update({
            link: `${
              contractAddresses[state.selectedChain][2] + ricit.transactionHash
            }`,
          });
        });
    });
  }
};
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  console.log("accounts:", accounts, state.sender);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    Ethers.provider()
      .getNetwork()
      .then((data) => {
        State.update({
          selectedChain: data.chainId,
        });
      });
  }
  console.log("in between", state.sender);
  State.update({
    selectedChain: "0",
  });
}
const onChangeTitle = (title) => {
  console.log("go daddy", state.recipient);
  State.update({
    title,
  });
};
const data = Social.keys("*/profile", "final");
if (!data) {
  return "Loading";
}
const accounts = Object.entries(data);
const allWidgets = [];
for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  allWidgets.push(accountId);
}
const onChangeRecipient = (recipient) => {
  State.update({
    recipient,
  });
};
const handleChainChange = (event) => {
  console.log(
    "get what we doing:",
    event.target.value || "no value from event?",
    event.target.value == "0",
    !accountId
  );
  if (event.target.value == "0") {
    if (!accountId) {
      console.log("not what we thought,:", accountId);
      State.update({
        showAlert: true,
        toastMessage: "Please log in before continuing",
      });
      return;
    }
    State.update({
      selectedChain: event.target.value,
    });
  }
  console.log("encts here", Ethers.send);
  Ethers.send("wallet_switchEthereumChain", [
    {
      chainId: "0x" + Number(event.target.value).toString(16),
    },
  ]).then((data) => console.log("done!!!", data));
  console.log("what happens after");
  State.update({
    selectedChain: event.target.value,
  });
  console.log("afters", state.selectedChain);
};
const onChangeDesc = (description) => {
  console.log("Log ciritcal critics:", state.selectedChain, state.title);
  State.update({
    description,
  });
};
const Heading = styled.p`
  margin: 3px auto 3px auto;
  font-size: 1em;
  color: #0f1d40;
  line-height: 2.1rem;
  width: 60%;
  text-align: center;
  font-family: "SF Pro Display", sans-serif;
`;
const ImageUploadCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 80%;
  border: 2px dashed #0d99ff;
  border-radius: 1rem;
  box-shadow: 4px 4px 20px 6px rgba(0, 0, 0, 0.2);
  margin: 30px auto;
  padding: 1.5rem;
  text-align: center;
`;
const Main = styled.div`
  display: grid;
  gap: 3rem;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  // background: linear-gradient(180deg,#e4f1fb,hsla(0,0%,85.1%,0));
  margin-top: 5px;
  width: 100%;
  padding: 1rem;
`;
const Text = styled.p`
  font-size: 0.9rem;
  color: #525c76;
  line-height: 1rem;
  margin: 3px;
`;
const Elipse = styled.div`
  background-color: #dff3f9;
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;
const Card = styled.div`
  padding: 1em;
  border: 1px solid #e5e8eb;
  gap: 2em;
  margin: 10px auto;
  border-radius: 0.7em;
`;
const ImageCard = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  height: 100%;
  max-height: 100%;
  width: 90%;
  max-width: 500px;
  border-radius: 1rem;
  & > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const Input = styled.input`
  display: block;
  padding: 0.5em;
  width: 100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus {
    border: 1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;
const TextArea = styled.textarea`
  display: block;
  padding: 0.5em;
  width: 100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus {
    border: 1px solid #0d99ff;
  }
`;
const SelectTag = styled.select`
  height: fit-content;
  width: 300px;
`;
const ChainIcon = styled.option`
  display: flex;
  height: 130px;
  padding: 1rem auto;
  & > img {
    height: 100px;
    width: 100px;
    object-fit: contain;
  }
`;
if (!(state.sender || accountId)) {
  console.log("Please login here now");
  State.update({
    showAlert: true,
    toastMessage: "Please Sign in or connect a wallet",
  });
}
const uploadFileUpdateState = (prompt) => {
  asyncFetch("https://genadrop.onrender.com/api/v1/general/generate-image", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic dXNlcm5hbWViYXNpYzpwYXNzd29yZGJhc2lj",
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "512x512",
    }),
  })
    .then((res) => {
      console.log(res);
      State.update({ prompt: "", isLoading: false });
      if (res.body.resultCode === 0) {
        State.update({ imgUrl: res.body.content[0].url });
      }
    })
    .catch((err) => {
      State.update({ fetchStatusError: true });
    });
};
const mintImage = () => {
  State.update({ isLoading: true });
  asyncFetch("https://genadrop.onrender.com/api/v1/general/blob", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic dXNlcm5hbWViYXNpYzpwYXNzd29yZGJhc2lj",
    },
    body: JSON.stringify({
      imageUri: state.imgUrl,
      isAi: true,
    }),
  })
    .then((res) => {
      console.log(res);
      State.update({ isLoading: false });
      if (res.body.resultCode === 0) {
        State.update({ cid: res.body.content.upload.IpfsHash });
      }
    })
    .catch((err) => {
      State.update({ fetchStatusError: true });
    });
};
const filesOnChange = () => {
  State.update({ imgUrl: "", isLoading: true });
  if (state.prompt) {
    uploadFileUpdateState(state.prompt);
  } else {
    uploadFileUpdateState("a man in blue sky");
  }
};
const handleInputChange = (event) => {
  State.update({ prompt: event.target.value });
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;
const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;
const Images = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
const DefaultImage = styled.div`
  width: 100%;
  height: 512px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DefaultImageText = styled.span`
  font-size: 18px;
  color: #555;
`;
const TextArea2 = styled.textarea`
  width: 100%;
  max-width: 400px;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  @media (max-width: 768px) {
    max-width: 300px;
    height: 100px;
    font-size: 14px;
  }
`;
const Button = styled.button`
  padding: 10px 20px;
  padding-top: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #0d99ff;
  color: #fff;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;
return (
  <Main className="container-fluid">
    {!state.cid ? (
      <div className="flex-grow-1">
        <Container>
          <ImageContainer>
            {state.imgUrl ? (
              <Images src={state.imgUrl} alt="Preview" />
            ) : (
              <DefaultImage>
                {state.fetchStatusError ? (
                  <DefaultImageText>Failed generate image!</DefaultImageText>
                ) : (
                  <DefaultImageText>
                    Generated image will appear here!
                  </DefaultImageText>
                )}
              </DefaultImage>
            )}
          </ImageContainer>
          <TextArea2
            placeholder="a man in blue sky...."
            value={state.prompt}
            onChange={handleInputChange}
          />
          <div style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Button onClick={filesOnChange}>
              {state.isLoading ? "Generating Image...." : "Generate Image"}
            </Button>
            {state.imgUrl && (
              <Button onClick={mintImage}>
                {state.isLoading ? "uploading Image..." : "Mint Image"}
              </Button>
            )}
          </div>
        </Container>
      </div>
    ) : (
      <>
        <Card className="d-flex flex-column align-items-center w-100">
          <ImageCard>
            <img
              src={state.imgUrl}
              alt="generated image"
              width="100%"
              height="100%"
              className="rounded-3"
            />
          </ImageCard>
        </Card>
        <div>
          <Card>
            {state.sender && Ethers.provider() ? (
              <div className="form-group">
                <label htmlFor="chainSelect">Select Chain</label>
                <select
                  className="form-select"
                  value={state.selectedChain}
                  onChange={handleChainChange}
                >
                  {chains.map((chain) => (
                    <ChainIcon key={chain.id} value={chain.id}>
                      {chain.name}
                    </ChainIcon>
                  ))}
                </select>
                {state.link && (
                  <a href={`${state.link}`} target="_blank">
                    View Transaction
                  </a>
                )}
              </div>
            ) : state.sender ? (
              <div>
                <label htmlFor="chainSelect">Select Chain</label>
                <SelectTag
                  className="form-select"
                  value={state.selectedChain}
                  onChange={handleChainChange}
                >
                  <option disabled selected>
                    Select a Chain
                  </option>
                  {chains.map((chain) => (
                    <ChainIcon key={chain.id} value={chain.id}>
                      <span>{chain.name}</span>
                    </ChainIcon>
                  ))}
                </SelectTag>
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={handleMint}
                >
                  Mint to {contractAddresses[state.selectedChain][1]}
                </button>
                <div>
                  <Web3Connect
                    className="btn mt-3"
                    connectLabel="Connect with Ethereum Wallet"
                  />
                </div>
              </div>
            ) : (
              <Web3Connect
                className="btn mt-3"
                connectLabel="Connect with Wallet"
              />
            )}
          </Card>
          <Card>
            <Card>
              Title:
              <Input
                type="text"
                value={state.title || ""}
                onChange={(e) => onChangeTitle(e.target.value)}
              />
            </Card>
            <Card>
              Description:
              <TextArea
                type="text"
                value={state.description || ""}
                onChange={(e) => onChangeDesc(e.target.value)}
              />
            </Card>
            <Card>
              Mint To:
              {state.selectedChain !== "0" ? (
                <Input
                  type="text"
                  placeholder={
                    state.selectedChain == "0" ? accountId : state.sender
                  }
                  value={state.recipient}
                  onChange={(e) => onChangeRecipient(e.target.value)}
                />
              ) : (
                <Typeahead
                  id="async-example"
                  className="type-ahead"
                  isLoading={isLoading}
                  labelKey="search"
                  minLength={1}
                  options={allWidgets}
                  onChange={(value) => onChangeRecipient(value)}
                  placeholder={
                    state.selectedChain == "0" ? accountId : state.sender
                  }
                />
              )}
            </Card>
          </Card>
          <button
            type="button"
            className="btn btn-primary d-flex flex-column align-items-center mx-auto"
            onClick={handleMint}
          >
            Mint to {contractAddresses[state.selectedChain][1]}
          </button>
        </div>
      </>
    )}
  </Main>
);
