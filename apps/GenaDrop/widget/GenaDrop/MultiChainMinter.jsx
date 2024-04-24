const auroraCOntract = "0xe53bC42B6b25a1d548B73636777a0599Fd27fE5c";
const auroraSoulCOntract = "0xe1D36964Eb49E38BB3f7410401BC95F0E9f1F6D3";
const polygonContract = "0x436AEceaEeC57b38a17Ebe71154832fB0fAFF878";
const polygonSoulContract = "0xd91cC6DE129D13F4384FB0bC07a1a99D4F858e72";
const celoContract = "0xC291846A587cf00a7CC4AF0bc4EEdbC9c3340C36";
const celoSoulContract = "0xd91cC6DE129D13F4384FB0bC07a1a99D4F858e72";
const avaxContract = "0x43dBdfcAADD0Ea7aD037e8d35FDD7c353B5B435b";
const avaxSoulContract = "0xd91cC6DE129D13F4384FB0bC07a1a99D4F858e72";
const arbitrumContract = "0x959a2945185Ec975561Ac0d0b23F03Ed1b267925";
const arbitrumSoulContract = "0x959a2945185Ec975561Ac0d0b23F03Ed1b267925";
const nearContract = "nft.genadrop.near";
const ownerId = "minorityprogrammers.near"; // attribution
const mintSingle = [
  "function mint(address to, uint256 id, uint256 amount, string memory uri, bytes memory data) public {}",
  "function safeMint(address to, string memory uri) public {}",
];
State.init({
  title: "",
  description: "",
  recipient: "",
  isSoulBound: false,
  showAlert: false,
  toastMessage: "",
  selectIsOpen: false,
});
let accountId = context.accountId;
const contractAddresses = {
  137: [
    polygonContract,
    "Polygon",
    "https://polygonscan.com/tx/",
    polygonSoulContract,
  ],
  1313161554: [
    auroraCOntract,
    "Aurora",
    "https://explorer.aurora.dev/tx/",
    auroraSoulCOntract,
  ],
  42220: [
    celoContract,
    "Celo",
    "https://explorer.celo.org/mainnet/tx/",
    celoSoulContract,
  ],
  43114: [
    avaxContract,
    "Avalanche",
    "https://snowtrace.io/tx/",
    avaxSoulContract,
  ],
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
  console.log("it's here", state.title && state.description && state.image.cid);
  if (!state.image.cid) {
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
        image: `ipfs://${state.image.cid}`,
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
                media: `https://ipfs.io/ipfs/${state.image.cid}`,
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

    const CA = state.isSoulBound
      ? contractAddresses[state.selectedChain][3]
      : contractAddresses[state.selectedChain][0];

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
      image: `ipfs://${state.image.cid}`,
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
      state.isSoulBound
        ? contract
            .safeMint(state.recipient || recipient[0], `ipfs://${cid}`)
            .then((transactionHash) => transactionHash.wait())
            .then((ricit) => {
              console.log("receipt::", ricit);
              State.update({
                link: `${
                  contractAddresses[state.selectedChain][2] +
                  ricit.transactionHash
                }`,
              });
            })
        : contract
            .mint(state.recipient || recipient[0], Id, 1, `ipfs://${cid}`, "0x")
            .then((transactionHash) => transactionHash.wait())
            .then((ricit) => {
              console.log("receipt::", ricit);
              State.update({
                link: `${
                  contractAddresses[state.selectedChain][2] +
                  ricit.transactionHash
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

//select tag
const handleSelectClick = () => {
  State.update({
    selectIsOpen: !state.selectIsOpen,
  });
};

const handleOutsideClick = (e) => {
  if (!e.target.closest(".select-replica__select")) {
    State.update({
      selectIsOpen: false,
    });
  }
};

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

// const onChangeRecipient = (recipient) => {
//   state.selectedChain === "0"
//     ? State.update({
//         recipient: recipient[0],
//       })
//     : State.update({
//         recipient,
//       });
// };
const onChangeRecipient = (recipient) => {
  State.update({
    customRecipient: true,
  });

  if (state.selectedChain == "0") {
    State.update({
      recipient: recipient[0],
    });
  } else {
    State.update({
      recipient,
    });
  }
};
const handleChainChange = (chain_id) => {
  try {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: `0x${Number(chain_id).toString(16)}` },
    ]);

    State.update({
      selectedChain: chain_id,
    });
    console.log(state.selectedChain);
  } catch (err) {
    console.log(err);
  }
};

const onChangeDesc = (description) => {
  console.log("Log ciritcal critics:", state.selectedChain, state.title);
  State.update({
    description,
  });
};

const handleToggle = () => {
  State.update({
    isSoulBound: !state.isSoulBound,
  });
};

const Heading = styled.p`
  margin: 3rem auto 0px auto;
  font-size: 1em;
  color: #0f1d40;
  line-height: 2.1rem;
  width: 60%;
  text-align: center;
  font-family: "SF Pro Display", sans-serif;
`;
const SubHeading = styled.p`
  margin: 0 auto 3px auto;
  font-size: 1em;
  color: #0f1d40;
  line-height: 1.4rem;
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
  margin: 60px auto;
  padding: 5rem 1.5rem;
  text-align: center;
`;

const Main = styled.div`
  display: grid;
  gap: 3rem;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  margin-top: 5px;
  width: 100%;
  padding: 1rem;
  .button {
    padding: 0.75em 2em;
    border-radius: 0.7em;
    border: 1px solid #0d99ff;
    transition: all 0.3s;
    cursor: pointer;
    color: #fff;
    background: #0d99ff;
    &:hover {
      color: #0d99ff;
      background: #fff;
    }
    @media screen and (max-width: 540px) {
      padding: 0.5em 2em;
    }
  }
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
  object-fit: contain;
  border-radius: 50%;
`;

const Card = styled.div`
  padding: 1em;
  border: 1px solid #e5e8eb;
  gap: 2em;
  margin: 10px auto;
  border-radius: 0.7em;
  & input {
    display: block;
    padding: 0.5em;
    width: 100%;
    border: 1px solid #e5e8eb;
    border-radius: 10px;
    outline: none;
    background: #f4f5f6;
    color: #525c76;
    :focus {
      box-shadow: none;
      border: 1px solid #0d99ff;
    }
    &::placeholder {
      color: palevioletred;
    }
  }
  .soulbound {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
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

const SelectReplicaContainer = styled.div`
  position: relative;
  display: inline-block;
  background-color: #fff;
  z-index: 1;
  & .select-replica__select {
    position: relative;
  }

  & .select-replica__selected {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    gap: 10px;
    border-radius: 4px;
    background-color: #fff;
    max-width: 200px;
    & > img {
      height: 100%;
      width: 100px;
      object-fit: contain;
    }
  }

  & .select-replica__options {
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    /* height: fit-content; */
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    margin: auto;
    max-height: 300px;
    max-width: 200px;
    display: none;
  }

  & .select-replica__options.open {
    display: block;
  }

  & .select-replica__option {
    display: flex;
    justify-content: center;
    max-width: 200px;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    padding: 3px;
    border-bottom: 1px solid gray;
  }

  & .select-replica__option.selected {
    background-color: #f0f0f0;
  }

  & .select-replica__option img {
    height: 60px;
    width: 100px;
    object-fit: contain;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem auto;
`;

const ToggleButton = styled.div`
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

if (!(state.sender || accountId)) {
  console.log("Please login here now");
  State.update({
    showAlert: true,
    toastMessage: "Please Sign in or connect a wallet",
  });
}

console.log(
  "Here 🤔 " +
    state.selectedChain +
    " " +
    chains
      .filter((chain) => {
        return state.selectedChain.toString() == chain.id;
      })
      .map((c) => c.url)
);

return (
  <div className="container vh-100 d-flex flex-column justify-content-between">
    <div>
      {state.showAlert && (
        <Widget src="bos.genadrop.near/widget/GenaDrop.Alert" props={state} />
      )}
      <Heading className="text-center fs-2 fw-bold">
        Mint NFT on Multiple chains
      </Heading>

      <Main
        className="container-fluid"
        onLoad={State.update({ chains: chains })}
      >
        {!state.image.cid ? (
          <div className="flex-grow-1">
            <SubHeading>
              Upload an image to create an NFT any of our supported blockchains
              super fast!
            </SubHeading>
            <ImageUploadCard className="flex-grow-1">
              <Elipse />
              {accountId || Ethers.provider() ? (
                <>
                  <IpfsImageUpload
                    image={state.image}
                    className="btn text-decoration-none link-primary pe-auto"
                  />
                  <div>
                    <Text>
                      We support .jpg, .jpeg, .png, .webp, .gif files and deploy
                      to Near, Polygon, Celo, Aurora, Avalanche, and Arbitrum
                    </Text>
                    <Text>Max file size: 20mb</Text>
                  </div>
                </>
              ) : (
                <Card>
                  {state.sender && Ethers.provider() ? (
                    <SelectGroup className="form-group">
                      <label htmlFor="chainSelect">Select Chain</label>
                      <SelectReplicaContainer>
                        <div
                          className={`select-replica__select ${
                            state.selectIsOpen ? "open" : ""
                          }`}
                          onClick={handleSelectClick}
                        >
                          <div className="select-replica__selected">
                            {state.chains.filter(
                              (chain) =>
                                chain.id === state.selectedChain.toString()
                            ) ? (
                              <img
                                src={state.chains
                                  .filter(
                                    (chain) =>
                                      chain.id ===
                                      state.selectedChain.toString()
                                  )
                                  .map((c) => c.url)}
                                alt={state.chains
                                  .filter(
                                    (chain) =>
                                      chain.id ===
                                      state.selectedChain.toString()
                                  )
                                  .map((c) => c.name)}
                              />
                            ) : (
                              "Select an option"
                            )}
                            <span>▼</span>
                          </div>
                          <div
                            className={`select-replica__options ${
                              state.selectIsOpen ? "open" : ""
                            }`}
                          >
                            {state.chains.map((chain) =>
                              chain.id !== state.selectedChain.toString() ? (
                                <div
                                  key={chain.id}
                                  className={`select-replica__option ${
                                    selectedOption === chain.name
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() => handleChainChange(chain.id)}
                                >
                                  <img src={chain.url} alt={chain.name} />
                                </div>
                              ) : (
                                ""
                              )
                            )}
                          </div>
                        </div>
                      </SelectReplicaContainer>
                      {state.link && (
                        <a href={`${state.link}`} target="_blank">
                          View Transaction
                        </a>
                      )}
                    </SelectGroup>
                  ) : accountId ? (
                    <SelectGroup>
                      <label htmlFor="chainSelect">Select Chain</label>
                      <SelectReplicaContainer>
                        <div
                          className={`select-replica__select ${
                            state.selectIsOpen ? "open" : ""
                          }`}
                          onClick={handleSelectClick}
                        >
                          <div className="select-replica__selected">
                            {state.chains.filter(
                              (chain) =>
                                chain.id === state.selectedChain.toString()
                            ) ? (
                              <img
                                src={state.chains
                                  .filter(
                                    (chain) =>
                                      chain.id ===
                                      state.selectedChain.toString()
                                  )
                                  .map((c) => c.url)}
                                alt={state.chains
                                  .filter(
                                    (chain) =>
                                      chain.id ===
                                      state.selectedChain.toString()
                                  )
                                  .map((c) => c.name)}
                              />
                            ) : (
                              "Select an option"
                            )}
                            <span>▼</span>
                          </div>
                          <div
                            className={`select-replica__options ${
                              state.selectIsOpen ? "open" : ""
                            }`}
                          >
                            {state.chains.map((chain) =>
                              chain.id !== state.selectedChain.toString() ? (
                                <div
                                  key={chain.id}
                                  className={`select-replica__option ${
                                    selectedOption === chain.name
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() => handleChainChange(chain.id)}
                                >
                                  <img src={chain.url} alt={chain.name} />
                                </div>
                              ) : (
                                ""
                              )
                            )}
                          </div>
                        </div>
                      </SelectReplicaContainer>
                      <div>
                        <Web3Connect
                          className="btn mt-3"
                          connectLabel="Connect with Ethereum Wallet"
                        />
                      </div>
                    </SelectGroup>
                  ) : (
                    <Web3Connect
                      className="btn mt-3"
                      connectLabel="Connect with Wallet"
                    />
                  )}
                </Card>
              )}
            </ImageUploadCard>
          </div>
        ) : (
          <>
            <Card className="d-flex flex-column align-items-center w-100">
              <div>
                <IpfsImageUpload
                  image={state.image}
                  className="btn btn-outline-primary border-0 rounded-3"
                />
              </div>
              <ImageCard>
                <img
                  src={`https://ipfs.io/ipfs/` + state.image.cid}
                  alt="uploaded image"
                  width="100%"
                  height="100%"
                  className="rounded-3"
                />
              </ImageCard>
            </Card>
            <div>
              <Card>
                {state.sender && Ethers.provider() ? (
                  <SelectGroup className="form-group">
                    <label htmlFor="chainSelect">Select Chain</label>
                    <SelectReplicaContainer>
                      <div
                        className={`select-replica__select ${
                          state.selectIsOpen ? "open" : ""
                        }`}
                        onClick={handleSelectClick}
                      >
                        <div className="select-replica__selected">
                          {state.chains.filter(
                            (chain) =>
                              chain.id === state.selectedChain.toString()
                          ) ? (
                            <img
                              src={state.chains
                                .filter(
                                  (chain) =>
                                    chain.id === state.selectedChain.toString()
                                )
                                .map((c) => c.url)}
                              alt={state.chains
                                .filter(
                                  (chain) =>
                                    chain.id === state.selectedChain.toString()
                                )
                                .map((c) => c.name)}
                            />
                          ) : (
                            "Select an option"
                          )}
                          <span>▼</span>
                        </div>
                        <div
                          className={`select-replica__options ${
                            state.selectIsOpen ? "open" : ""
                          }`}
                        >
                          {state.chains.map((chain) =>
                            chain.id !== state.selectedChain.toString() ? (
                              <div
                                key={chain.id}
                                className={`select-replica__option ${
                                  selectedOption === chain.name
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() => handleChainChange(chain.id)}
                              >
                                <img src={chain.url} alt={chain.name} />
                              </div>
                            ) : (
                              ""
                            )
                          )}
                        </div>
                      </div>
                    </SelectReplicaContainer>
                    {state.link && (
                      <a href={`${state.link}`} target="_blank">
                        View Transaction
                      </a>
                    )}
                  </SelectGroup>
                ) : accountId ? (
                  <SelectGroup>
                    <label htmlFor="chainSelect">Select Chain</label>
                    <SelectReplicaContainer>
                      <div
                        className={`select-replica__select ${
                          state.selectIsOpen ? "open" : ""
                        }`}
                        onClick={handleSelectClick}
                      >
                        <div className="select-replica__selected">
                          {state.chains.filter(
                            (chain) =>
                              chain.id === state.selectedChain.toString()
                          ) ? (
                            <img
                              src={state.chains
                                .filter(
                                  (chain) =>
                                    chain.id === state.selectedChain.toString()
                                )
                                .map((c) => c.url)}
                              alt={state.chains
                                .filter(
                                  (chain) =>
                                    chain.id === state.selectedChain.toString()
                                )
                                .map((c) => c.name)}
                            />
                          ) : (
                            "Select an option"
                          )}
                          <span>▼</span>
                        </div>
                        <div
                          className={`select-replica__options ${
                            state.selectIsOpen ? "open" : ""
                          }`}
                        >
                          {state.chains.map((chain) =>
                            chain.id !== state.selectedChain.toString() ? (
                              <div
                                key={chain.id}
                                className={`select-replica__option ${
                                  selectedOption === chain.name
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() => handleChainChange(chain.id)}
                              >
                                <img src={chain.url} alt={chain.name} />
                              </div>
                            ) : (
                              ""
                            )
                          )}
                        </div>
                      </div>
                    </SelectReplicaContainer>
                    <div>
                      <Web3Connect
                        className="btn mt-3"
                        connectLabel="Connect with Ethereum Wallet"
                      />
                    </div>
                  </SelectGroup>
                ) : (
                  <Web3Connect
                    className="btn mt-3"
                    connectLabel="Connect with Wallet"
                  />
                )}
              </Card>
              <Card>
                <div className="soulbound">
                  <p>SoulBound: {state.isSoulBound ? "Enabled" : "Disabled"}</p>
                  <ToggleButton>
                    <label className="switch">
                      <input type="checkbox" onChange={handleToggle} />
                      <span className="slider round"></span>
                    </label>
                  </ToggleButton>
                </div>
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
    </div>
    <Widget src="bos.genadrop.near/widget/GenaDrop.Footer" />
  </div>
);
