// add nft transfers here
// NEED TO FIX SCIENTIFIC NOTION ON PRICE //  ADD ERROR CHECKING for nft contract but preview is enough
const image = props.image;
const onChange = props.onChange;
const amount = "10000000000000000000000"; // 0.01 NEAR // amount to list at, by default its for other marketplaces
const accountId = context.accountId ?? props.accountId; // add check for context it
const ownerId = "minorityprogrammers.near"; // attribution
const chainState = props.chainState;
const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
}; // just in case need to pass in a NFT
const NEAR_NOMINATION_EXP = 24;
const newContractId = props.contractId
  ? props?.contractId?.includes("genadrop")
    ? "nft.genadrop.near"
    : props.contractId
  : "nft.genadrop.near";
const contractId = newContractId; // default nft contract - genadrop-contract.nftgen.near
const tokenId = props.tokenId ?? "1679119560198"; // maybe condtional check if props is eempty // default nft
const fewfarmarket = "market.fewandfar.near";
const tradeportmarket = "market.tradeport.near";
const genadropmarket = "market.genadrop.near";
const fnfMsg = JSON.stringify({
  sale_conditions: {
    near: amount,
  },
});
const trpMsg = JSON.stringify({
  price: amount,
  market_type: "sale",
  ft_token_id: "near",
});
const msg = JSON.stringify({
  price: amount,
});
// need to find custom market link to work with
const nftMetadata = Near.view(contractId, "nft_metadata"); // get the contract name
const tokenInfo = Near.view(contractId, "nft_token", {
  token_id: tokenId,
});
State.init({
  contractId: contractId,
  tokenId: tokenId,
  amount: amount,
  msg: msg,
  fnfMsg: fnfMsg,
  trpMsg: trpMsg,
  mintbaseMarketId: null,
  chainState: chainState,
  marketLinks: [],
  custom: false,
  customMarketLink: defaultCustomMarket,
  isOpen: false,
  validMarketLink: true,
  explorerText: "",
  error: false,
  loadingListing: false,
  nftMetadata: nftMetadata,
  tokenInfo: tokenInfo,
  receiverId: default_receiver,
  validReceiver: true,
  transfer: false, // add checkbox for transfer that shows
  url: image.url,
  nft: image.nft ?? {}, // from santiago
  showAlert: false,
});
function ownsNFT() {
  const ownsNFT = context.accountId === state.tokenInfo.owner_id;
  State.update({
    ownsNFT: ownsNFT,
  });
}
ownsNFT();
const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}
const tradeportLink = `https://www.tradeport.xyz/near/collection/${
  state.contractId.includes("genadrop")
    ? "genadrop-contract.nftgen.near"
    : state.contractId
}?tab=items&tokenId=${state.tokenId}`;
//Few and Far Link
const fewfarlink = `https://fewfar.com/${
  state.contractId.includes("genadrop")
    ? "genadrop-single-nft-c40d654de"
    : state.contractId
}/${state.tokenId}`;
const parasLink = `https://paras.id/token/${state.contractId}::${state.tokenId}`;
const defaultCustomMarket = "apollo42.near";
const mintbasemarket = "simple.market.mintbase1.near";
const default_receiver = "minorityprogrammers.near"; // default reciver nft for transfers
function fetchMintbaseURL() {
  asyncFetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
        query MyQuery {
        nft_listings(where: {token_id: {_eq: "${tokenId}"}}) {
      	metadata_id
      }
    }
      `,
    }),
  }).then((data) => {
    if (data.body.data.nft_listings?.length) {
      State.update({
        mintbaseMarketId: data.body.data.nft_listings[0].metadata_id,
      });
    }
  });
}
fetchMintbaseURL();
const mintBaseLink = `https://www.mintbase.xyz/meta/${state.mintbaseMarketId}`;
const marketLinks = {
  tradeport: {
    link: tradeportLink,
  },
  fewandfar: {
    link: fewfarlink,
  },
  mintbase: {
    link: mintBaseLink,
  },
  paras: {
    link: parasLink,
  },
};
function updateTradeportLink() {
  // Function body goes here
  updatedLink =
    "https://www.tradeport.xyz/near/collection/" +
    state.contractId +
    "/" +
    state.tokenId;
  State.update({
    tradeportLink: updatedLink,
  });
}
function cleanupAmount(amount) {
  return amount.replace(/,/g, "").trim();
}
function trimLeadingZeroes(value) {
  value = value.replace(/^0+/, "");
  if (value === "") {
    return "0";
  }
  return value;
}
function parseNearAmount(amt) {
  if (!amt) {
    return null;
  }
  amt = cleanupAmount(amt);
  const split = amt.split(".");
  const wholePart = split[0];
  const fracPart = split[1] || "";
  if (split.length > 2 || fracPart.length > NEAR_NOMINATION_EXP) {
    throw new Error(`Cannot parse '${amt}' as NEAR amount`);
  }
  return trimLeadingZeroes(
    wholePart + fracPart.padEnd(NEAR_NOMINATION_EXP, "0")
  );
}
/*ON CHANGE FUNCTIONS - NEED TO FINISH NOT CONCATENATING*/
const onChangeNearAmount = (amount) => {
  amount = parseNearAmount(amount);
  const msgConcat = JSON.stringify({
    price: amount,
    market_type: "sale",
    ft_token_id: "near",
  });
  const fnfMsg = JSON.stringify({
    sale_conditions: {
      near: amount,
    },
  });
  // console.log(bigIntNumber);
  State.update({
    amount,
    msg: msgConcat,
    fnfMsg: fnfMsg,
    trpMsg: msgConcat,
  });
};
const onChangeEVMAmount = (amount) => {
  State.update({
    amount,
  });
};
const onChangeMsg = (msg) => {
  // currently done in the amount
  State.update({
    msg: msg,
  });
};
const onChangeReceiver = (receiverId) => {
  const validReceiverLink = isNearAddress(receiverId[0]); // add error message or change button based on this
  State.update({
    receiverId: receiverId[0],
    validReceiver: validReceiverLink,
  });
  console.log(`receiver: ${state.receiverId[0]}`);
};
const onChangeContract = (contractId) => {
  const nftMetadata = Near.view(contractId, "nft_metadata"); // get the contract name
  State.update({
    contractId,
    nftMetadata,
  });
  onChangeToken(state.tokenId);
  ownsNFT();
  updateTradeportLink();
};
const onChangeToken = (tokenId) => {
  const tokenInfo = Near.view(state.contractId, "nft_token", {
    token_id: tokenId,
  });
  State.update({
    tokenId,
    tokenInfo,
  });
  ownsNFT();
  updateTradeportLink();
};
const onChangeCustomMarket = (customMarketLink) => {
  const validMarketLink = isNearAddress(customMarketLink);
  State.update({
    customMarketLink,
    validMarketLink,
  });
};
/* HELPER FUNCTION */
function isNearAddress(address) {
  if (typeof address !== "string") {
    return false;
  }
  if (!address.endsWith(".near")) {
    return false;
  }
  const parts = address.split(".");
  if (parts.length !== 2) {
    return false;
  }
  if (parts[0].length < 2 || parts[0].length > 32) {
    return false;
  }
  if (!/^[a-z0-9_-]+$/i.test(parts[0])) {
    return false;
  }
  return true;
}
const currentChainProps = {
  aurora: {
    img: "https://s2.coinmarketcap.com/static/img/coins/200x200/14803.png",
    id: "1313161554",
    chain: "Aurora",
    explorer: "https://aurorascan.dev/",
    explorerTx: "https://aurorascan.dev/",
    livePrice: "ethereum",
    contract: "0xe93097f7C3bF7A0E0F1261c5bD88F86D878667B5",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/aurora-mainnet",
  },
  arbitrum: {
    img: "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg?1680097630",
    id: "42161",
    contract: "0x27E52A81975F5Fb836e79007E3c478C6c0E6E9FB",
    chain: "Arbitrum",
    explorer: "https://arbiscan.io/",
    explorerTx: "https://arbiscan.io/",
    livePrice: "ethereum",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/arbitrum",
  },
  celo: {
    img: "https://assets.coingecko.com/coins/images/11090/large/InjXBNx9_400x400.jpg?1674707499",
    id: "42220",
    livePrice: "celo",
    contract: "0x5616BCcc278F7CE8B003f5a48f3754DDcfA4db5a",
    explorer: "https://explorer.celo.org/address/",
    explorerTx: "https://explorer.celo.org/",
    chain: "Celo",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/celo-mainnet",
  },
  polygon: {
    img: "https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp",
    id: "137",
    chain: "Polygon",
    livePrice: "matic-network",
    contract: "0x57Eb0aaAf69E22D8adAe897535bF57c7958e3b1b",
    explorer: "https://polygonscan.com/address/",
    explorerTx: "https://polygonscan.com/",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/polygon-mainnet",
  },
};
const listAbi = [
  "function createMarketplaceItem(address nftContract, uint256 tokenId, uint256 price, string calldata category, address seller) public payable {}",
  "function nftSale(uint256 price, uint256 tokenId, address seller, address nftContract) public payable {}",
];
const evmList = () => {
  if (state.amount > 10000000) return;
  State.update({
    loadingListing: true,
  });
  const contract = new ethers.Contract(
    currentChainProps[props.chainState].contract,
    listAbi,
    Ethers.provider().getSigner()
  );
  console.log("Formed thee", contract);
  const nftContract = contractId.split(tokenId)[0];
  contract
    .createMarketplaceItem(
      nftContract,
      tokenId,
      (Number(state.amount) * 1e18).toString(),
      "General",
      state.sender
    )
    .then((transactionHash) => transactionHash.wait())
    .then((ricit) => {
      State.update({
        isOpen: true,
        message: true,
        error: false,
        loadingListing: false,
        explorerText: `${currentChainProps[props.chainState].explorerTx}/tx/${
          ricit.transactionHash
        }`,
      });
    })
    .catch((err) => {
      State.update({
        isOpen: false,
        loadingListing: false,
        error: true,
        text: err.reason,
      });
    });
};
const closeModal = () => State.update({ isOpen: false });
const list = () => {
  if (!accountId) {
    console.log("Sign in to list");
    return;
  }
  State.update({
    loadingListing: true,
  });
  console.log("opioka", state.trpMsg, state.fnfMsg, state.msg);
  // need to buffer serialize arguments, add helper functions with state arguments
  const gas = 100000000000000; // 100 tGas
  //   const deposit = 1; // exactly 1 yocto
  const deposit = 10000000000000000000000; // 0.01 near
  Near.call(
    [
      state.tradeport
        ? {
            contractName: tradeportmarket,
            methodName: "storage_deposit",
            args: {
              receiver_id: context.accountId,
            },
            gas,
            deposit: deposit,
          }
        : null,
      state.tradeport
        ? {
            contractName: state.contractId,
            // need to wrap first with near_deposit
            methodName: "nft_approve",
            args: {
              token_id: state.tokenId,
              account_id: tradeportmarket,
              msg: state.trpMsg,
            },
            gas: gas,
            deposit: deposit,
          }
        : null,
      state.fewfar
        ? {
            contractName: fewfarmarket,
            methodName: "storage_deposit",
            args: {
              receiver_id: context.accountId,
            },
            gas,
            deposit: deposit,
          }
        : null,
      state.fewfar
        ? {
            contractName: state.contractId,
            // need to wrap first with near_deposit
            methodName: "nft_approve",
            args: {
              token_id: state.tokenId,
              account_id: fewfarmarket,
              msg: state.fnfMsg,
            },
            gas: gas,
            deposit: deposit,
          }
        : null,
      state.mintbase
        ? {
            contractName: mintbasemarket,
            methodName: "deposit_storage",
            args: {
              receiver_id: context.accountId,
            },
            gas,
            deposit: deposit,
          }
        : null,
      state.mintbase
        ? {
            contractName: state.contractId,
            // need to wrap first with near_deposit
            methodName: "nft_approve",
            args: {
              token_id: state.tokenId,
              account_id: mintbasemarket,
              msg: state.msg, // need to change mesg to conform with mitnbase market // "{\"price\":\"3900000000000000000000000\",\"autotransfer\":true}"
            },
            gas: gas,
            deposit: deposit, // may take this out
          }
        : null,
      state.genadrop
        ? {
            contractName: genadropmarket,
            methodName: "deposit_storage",
            args: {
              receiver_id: context.accountId,
            },
            gas,
            deposit: deposit,
          }
        : null,
      state.genadrop
        ? {
            contractName: state.contractId,
            // need to wrap first with near_deposit
            methodName: "nft_approve",
            args: {
              token_id: state.tokenId,
              account_id: genadropmarket,
              msg: state.msg, // need to change mesg to conform with mitnbase market // "{\"price\":\"3900000000000000000000000\",\"autotransfer\":true}"
            },
            gas: gas,
            deposit: deposit, // may take this out
          }
        : null,
      state.custom
        ? {
            contractName: state.customMarketLink,
            methodName: "storage_deposit",
            args: {
              receiver_id: context.accountId,
            },
            gas,
            deposit: deposit,
          }
        : null,
      state.custom
        ? {
            contractName: state.contractId,
            // need to wrap first with near_deposit
            methodName: "nft_approve",
            args: {
              token_id: state.tokenId,
              account_id: state.customMarketLink,
              msg: state.msg, // need to add the variables and buffer seerailize
            },
            gas: gas,
            deposit: deposit, // may take this out
          }
        : null,
    ].filter((entry) => entry !== null)
  );
  State.update({
    loadingListing: false,
  });
};
const transfer = () => {
  if (!accountId) {
    return;
  }
  // need to buffer serialize arguments, add helper functions with state arguments
  const gas = 100000000000000; // 100 tGas
  //   const deposit = 1; // exactly 1 yocto
  const deposit = 1; // 0.01 near // maybe less
  Near.call([
    {
      contractName: state.contractId,
      methodName: "nft_transfer",
      args: {
        receiver_id: state.receiverId,
        token_id: state.tokenId,
      },
      gas: gas ?? 200000000000000,
      deposit: deposit ?? 10000000000000000000000,
    },
  ]);
};
const selectFewFar = () => {
  State.update({
    fewfar: !state.fewfar,
  });
};
const selectTradeport = () => {
  State.update({
    tradeport: !state.tradeport,
  });
};
const selectMintbase = () => {
  State.update({
    mintbase: !state.mintbase,
  });
};
const selectGenadrop = () => {
  State.update({
    genadrop: !state.genadrop,
  });
};
if (!accountId) {
  State.update({
    showAlert: true,
    toastMessage: "Please Sign in to Near wallet to list",
  });
}
const selectCustom = () => {
  State.update({
    custom: !state.custom,
  });
}; // need better helper function for checking whether valid NEAR address
const Heading = styled.h1`
  margin: 3px auto 3px auto;
  font-size: 1em;
  color: #0f1d40;
  line-height: 2.1rem;
  width: 60%;
  text-align: center;
  font-family: "SF Pro Display", sans-serif;
`;
const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px); /* Apply background blur */
`;
return (
  <div className="container">
    {state.showAlert && (
      <Widget src="bos.genadrop.near/widget/GenaDrop.Alert" props={state} />
    )}
    <Heading className="text-center fs-2 fw-bold my-4">
      {" "}
      🛍️ List NFT {props.chainState === "near" && "to Multiple Marketplaces"}
    </Heading>
    {!props.tokenId && !props.contractId && (
      <div>
        <div
          className="p-2 rounded mt-3"
          style={{
            background: "#fdfdfd",
            border: "solid 1px #dee2e6",
            borderBottomLeftRadius: ".375rem",
            borderBottomRightRadius: ".375rem",
            minHeight: "9em",
          }}
        >
          <div>
            <div className="mt-2">
              <Widget
                src="bos.genadrop.near/widget/GenaDrop.NFTSelector"
                props={{
                  onChange: ({ contractId, tokenId }) => {
                    State.update({
                      contractId: contractId,
                      tokenId: tokenId,
                    });
                    onChangeToken(tokenId);
                    onChangeContract(contractId);
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )}
    {state.tokenId !== "1679119560198" && (
      <>
        <Widget
          src="bos.genadrop.near/widget/GenaDrop.MultiListing.Input"
          props={{
            state,
            onChangeContract,
            onChangeToken,
            selectTradeport,
            selectFewFar,
            loadingListing: state.loadingListing,
            selectCustom,
            selectMintbase,
            selectGenadrop,
            marketLinks,
            chainState,
            onChangeCustomMarket,
            onChangeNearAmount,
            onChangeEVMAmount,
            list,
            evmList,
            onChangeReceiver,
          }}
        />
      </>
    )}
    {state.isOpen && (
      <Popup>
        <Widget
          src="bos.genadrop.near/widget/GenaDrop.SuccessModal"
          props={{ closeModal, externalLink: state.explorerText }}
        />
      </Popup>
    )}
    <Widget src="bos.genadrop.near/widget/GenaDrop.Footer" />
  </div>
);
