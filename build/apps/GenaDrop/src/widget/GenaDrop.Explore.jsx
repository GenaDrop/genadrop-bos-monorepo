initState({
  collectionData: {},
  inputCollectionSlug: "genadrop-contract.nftgen.near" || "nft.genadrop.near",
  collectionSlug: "genadrop-contract.nftgen.near" || "nft.genadrop.near",
  currentPage: 1,
  searchTerm: "",
  nftData: [],
  filteredNFTData: [],
  chainRate: "",
  chain: "near",
  conversion: 0,
});
const currentChain = {
  near: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
  },
  aptos: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqBinSwbRdx76qY4A3qvVkM9g_mKoGCBDT0sqTT02TgRvKquV2Vlc8fSRmLyuhBS3-CaA&usqp=CAU",
  },
  sui: {
    img: "https://blog.sui.io/content/images/2023/04/Sui_Droplet_Logo_Blue-3.png",
  },
};
const currentChainProps = {
  near: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
    livePrice: "near",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/near-mainnet",
    chain: "near",
    id: "1112",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
  },
  aurora: {
    img: "https://s2.coinmarketcap.com/static/img/coins/200x200/14803.png",
    id: "1313161554",
    chain: "Aurora",
    livePrice: "ethereum",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/aurora-mainnet",
  },
  arbitrum: {
    img: "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg?1680097630",
    id: "42161",
    chain: "Arbitrum",
    livePrice: "ethereum",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/arbitrum",
  },
  celo: {
    img: "https://assets.coingecko.com/coins/images/11090/large/InjXBNx9_400x400.jpg?1674707499",
    id: "42220",
    livePrice: "celo",
    chain: "Celo",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/celo-mainnet",
  },
  polygon: {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Polygon_Blockchain_Matic_Logo.svg/880px-Polygon_Blockchain_Matic_Logo.svg.png",
    id: "137",
    chain: "Polygon",
    livePrice: "matic-network",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/polygon-mainnet",
  },
  aptos: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqBinSwbRdx76qY4A3qvVkM9g_mKoGCBDT0sqTT02TgRvKquV2Vlc8fSRmLyuhBS3-CaA&usqp=CAU",
  },
  sui: {
    img: "https://blog.sui.io/content/images/2023/04/Sui_Droplet_Logo_Blue-3.png",
  },
};
function fetchData() {
  State.update({ nftData: [] });
  if (state.chain === "aptos" || state.chain === "sui") {
    const response = fetch("https://api.indexer.xyz/graphql", {
      method: "POST",
      headers: {
        "x-api-key": "Krqwh4b.bae381951d6050d351945c0c750f1510",
        "x-api-user": "Banyan",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query MyQuery {
    ${state.chain}{
      crypto_rates(where: {fiat: {_eq: "USD"}}) {
        crypto
        rate
      }
      nfts(order_by: {rarity: asc}) {
        id
        name
        media_url
        ranking
        rarity
        contract_id
        token_id
        listings {
          price
        }
      }
    }
  }`,
      }),
    });
    response.length === 0
      ? ""
      : State.update({
          nftData: response.body.data[state.chain].nfts,
          chainRate: response.body.data[state.chain].crypto_rates[4].rate,
        });
    const priceConvert = (chain) => {
      switch (chain) {
        case "stacks":
          return State.update({ conversion: 10000000000 });
        case "sui":
          return State.update({ conversion: 10000000000 });
        case "aptos":
          return State.update({ conversion: 100000000 });
        default:
          return 0;
      }
    };
    priceConvert(state.chain);
  } else {
    let response = fetch(`${currentChainProps[state.chain].subgraph}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
              query MyQuery {
               nfts( orderBy: createdAtTimestamp, ${
                 state.chain !== "near" ? "orderDirection: desc" : ""
               }) {
                  category
                  chain
                  createdAtTimestamp
                  id
                  isSold
                  isListed
                  price
                  tokenID
                  owner {
                      id
                  }
                  tokenIPFSPath
                  transactions {
                    price
                  }
                  }
              }
          `,
      }),
    });
    if (!response.ok) {
      return "Loading";
    }
    const collectionData = response.body.data.nfts;
    if (collectionData) {
      const filteredNftData = [];
      for (const filteredData of collectionData) {
        try {
          const response = fetch(
            filteredData.tokenIPFSPath.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            )
          );
          if (response.body.name != undefined) {
            filteredNftData.push(filteredData);
          }
        } catch (error) {
          // Handle any errors that occur during the fetch if needed
          console.error(`Error fetching data: ${error}`);
        }
      }
      const nftBody = filteredNftData.map((data) => {
        const fetchIPFSData = fetch(
          data.tokenIPFSPath.replace("ipfs://", "https://ipfs.io/ipfs/")
        );
        if (fetchIPFSData.status === 403) {
          return State.update({ error: true });
        }
        if (!fetchIPFSData.ok) {
          return "Loading NFTS from IPFS";
        }
        if (fetchIPFSData.ok) {
          const nft = fetchIPFSData.body;
          let nftObject = {};
          nftObject.contract_id = data?.id;
          nftObject.sold = data?.isSold;
          nftObject.isListed = data?.isListed;
          nftObject.owner = data?.owner?.id;
          nftObject.price = data?.price;
          nftObject.token_id = data?.tokenID;
          nftObject.name = nft?.name;
          nftObject.description = nft?.description;
          nftObject.media_url = nft?.image
            ? nft?.image?.replace("ipfs://", "https://ipfs.io/ipfs/")
            : "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu";
          return nftObject;
        }
      });
      State.update({
        nftData: nftBody,
      });
    }
  }
}
fetchData();
const updateInputCollectionSlug = (e) => {
  State.update({ inputCollectionSlug: e.target.value });
};
const handleFetchButtonClick = () => {
  State.update({ collectionSlug: state.inputCollectionSlug });
  fetchData();
};
const updateCollectionSlug = (e) => {
  State.update({ collectionSlug: e.target.value });
};
const seachInputHandler = (e) => {
  const value = e.target.value.toLowerCase();
  const searched = state.nftData.filter((nft) =>
    nft.name.toLowerCase().includes(value)
  );
  State.update({
    searchTerm: value,
    filteredNFTData: searched,
  });
};
const isPriceValid = typeof nft.listings[0]?.price === "number";
const handleDropdownChange = (event) => {
  State.update({ chain: event.target.value, currentPage: 1 });
};
const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      currentChainProps[state.chain]?.livePrice
    }&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    return value.toFixed(4) !== "NaN" ? `$${value.toFixed(2)}` : 0;
  }
};
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
const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: "100%";
  max-width: 800px;
  gap: 20px;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;
const PageTitle = styled.h1`
  text-align: center;
  font-size: 4vw;
  font-weight: bold;
  margin-bottom: 20px;
  color: #0f1d40;
`;
const NFTCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  -ms-flex-flow: column nowrap;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  border: 1.41429px solid rgba(28, 27, 28, 0.2);
  box-shadow: 5.65714px 5.65714px 11.3143px rgba(28, 27, 28, 0.04);
  padding: 8px 0px;
  background-color: #fff;
  max-width: 350px;
  margin: 0 auto;
  &:hover & > div > img {
    transform: scale(1.05);
  }
  button {
    padding: 0.75em 2em;
    border-radius: 0.7em;
    color: var(--main-color);
    border: 1px solid transparent;
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
const NFTCardText = styled.div`
  width: 100%;
  // padding: 0px 1rem;
`;
const NFTCards = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  background: #e4f1fb;
  background: linear-gradient(180deg, #e4f1fb 0%, rgba(0, 255, 0, 0) 3%);
  background: -webkit-linear-gradient(
    180deg,
    #e4f1fb 0%,
    rgba(0, 255, 0, 0) 3%
  );
  background: -moz-linear-gradient(270deg, #e4f1fb 0%, rgba(0, 255, 0, 0) 3%);
  padding: 20px 3rem 1rem 3rem;
  width: 100%;
`;
const PaginationButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  button {
    margin-right: 10px;
  }
  button:disabled,
  button:last-child:disabled {
    background-color: #ccc; /* Change the background color */
    color: #666; /* Change the text color */
    cursor: not-allowed;
    border-color: #ccc;
  }
  button:last-child {
    background: transparent;
    width: 100px;
    color: #0d6efd;
  }
  button:last-child:hover {
    opacity: 0.7;
  }
`;
const ImageCard = styled.div`
  height: 250px;
  width: 96%;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 0.4rem;
  & > img {
    object-fit: cover;
    transition: all 0.3s ease-in-out;
  }
  & > img:hover {
    transform: scale(1.05);
  }
`;
const InputContainer = styled.div`
  width: 80%;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 1rem auto;
  & > input {
    outline: none;
  }
  & > input:hover,
  & > input:focus {
    border: 1px solid #0d99ff;
    box-shadow: none;
  }
`;
const NoNFTLoading = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Hero = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-image: url(https://www.genadrop.com/static/media/banner-marketplace.e5c03bb6.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-positiion: center;
  width: 100%;
  padding: 2rem;
`;
const MyAcc = styled.p`
  margin: 0;
  margin-left: 8px;
  color: #0a2830;
  background: transparent;
  border: 1px solid #0d99ff;
  padding: 5px;
  border-radius: 10px;
`;
const RankCard = styled.span`
  background-color: rgba(28, 27, 28, 0.06);
  border-radius: 0.5rem;
  color: #000;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  padding: 8px;
`;
const ViewButton = styled.div`
  button {
    background: white;
    color: #0d99ff;
    border: 1px solid;
    padding: 9px 15px;
  }
`;
const PriceArea = styled.div`
  display: flex;
  align-items: center;
  color: #0d99ff;
  & > * {
    margin: 0px;
    padding: 0px;
  }
  & > h6 {
    font-weight: 700;
    font-size: 1.2rem;
  }
  & > span {
    font-size: 1.2rem;
    margin: 0px;
  }
`;
const ChainPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  img {
    min-width: 15px;
    min-height: 15px;
    max-width: 15px;
    margin-right: 5px;
  }
`;
const SelectChain = styled.div`
  select {
    margin: 0 10px;
    border: 1px solid #0d99ff;
    cursor: pointer;
    border-radius: 7px;
    height: 35px;
    background: transparent;
  }
  select:focus {
    outline: none;
  }
`;
const PRICE_CONVERSION_CONSTANT =
  state.chain == "near" ? 1000000000000000000000000 : 1000000000000000000;
function paginateNFTData(pageNumber, itemsPerPage) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = state.nftData.slice(startIndex, endIndex);
  return paginatedData;
}
function paginateNFTData(pageNumber, itemsPerPage) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = state.nftData.slice(startIndex, endIndex);
  return paginatedData;
}
// Define the nextPage and prevPage functions
function nextPage() {
  // Define the current page and items per page
  const currentPage = state.currentPage || 1; // Assuming you have a 'currentPage' state property
  const itemsPerPage = 10; // Change this to the number of items per page you want
  // Calculate the next page number
  const nextPage = currentPage + 1;
  // Update the current page state
  State.update({ currentPage: nextPage });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function prevPage() {
  // Define the current page and items per page
  const currentPage = state.currentPage || 1; // Assuming you have a 'currentPage' state property
  // Ensure we don't go below page 1
  if (currentPage > 1) {
    // Calculate the previous page number
    const prevPage = currentPage - 1;
    // Update the current page state
    State.update({ currentPage: prevPage });
  }
}
// Now, when you want to display the data in your UI, use the currentPage and itemsPerPage to paginate the data
const currentPage = state.currentPage || 1; // Get the current page from the state
const itemsPerPage = 10; // Change this to the number of items per page you want
const pageData = paginateNFTData(currentPage, itemsPerPage);
const totalPages = state?.nftData?.length / itemsPerPage;
const defaultProps = [
  {
    id: "0",
    name: "near",
    url: "https://ipfs.near.social/ipfs/bafkreigv55ubnx3tfhbf56toihekuxvgzfqn5c3ndbfjcg3e4uvaeuy5cm",
  },
  {
    id: "137",
    name: "polygon",
    url: "https://ipfs.near.social/ipfs/bafkreie5h5oq6suoingcwuzj32m3apv56rl56wpwpaxmevlk5vndlypxze",
  },
  {
    id: "1313161554",
    name: "aurora",
    url: "https://ipfs.near.social/ipfs/bafkreiajqik4gjbmkh7z2gylpjzrsuht7simjecpxuoqn6icqfbioswzuy",
  },
  {
    id: "42220",
    name: "celo",
    url: "https://ipfs.near.social/ipfs/bafkreifu6ufsdf2ivrs5febt7l25wdys6odzfelgjauzod7owrfug56cxe",
  },
  {
    id: "42161",
    name: "arbitrum",
    url: "https://ipfs.near.social/ipfs/bafkreiffax4lnya337rz5ph75faondeqmpy6xj37yprwvxbru4qc5emsiq",
  },
  // {
  //   id: "2222",
  //   name: "aptos",
  //   url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqBinSwbRdx76qY4A3qvVkM9g_mKoGCBDT0sqTT02TgRvKquV2Vlc8fSRmLyuhBS3-CaA&usqp=CAU",
  // },
  // {
  //   id: "1111",
  //   name: "sui",
  //   url: "https://blog.sui.io/content/images/2023/04/Sui_Droplet_Logo_Blue-3.png",
  // },
];
const updateChain = (chain) => {
  State.update({ chain, currentPage: 1 });
};
return (
  <>
    <Hero className="w-100">
      <PageTitle>
        View NFTs on <br />
        💧GenaDrop
      </PageTitle>
      <InputContainer>
        <input
          type="search"
          value={state.searchTerm}
          placeholder="Search NFTs"
          onChange={seachInputHandler}
        />{" "}
        <Widget
          src="agwaze.near/widget/GenaDrop.ChainsDropdown"
          props={{ chains: defaultProps, updateChain }}
        />
        {state.sender ? (
          <div>
            <MyAcc>{state.sender ? getSender() : "0x00..."}</MyAcc>
          </div>
        ) : (
          <Web3Connect connectLabel="Connect Wallet" className="w-50" />
        )}
      </InputContainer>
    </Hero>
    {state.searchTerm === "" && (
      <PaginationButtons className="flex justify-center center">
        <button disabled={currentPage === 1} onClick={prevPage}>
          Previous
        </button>
        <button disabled={state.currentPage >= totalPages} onClick={nextPage}>
          Next
        </button>
      </PaginationButtons>
    )}
    {state.nftData.length > 0 ? (
      <NFTCards>
        {state.searchTerm === "" ? (
          pageData.map((nft) => (
            <a
              href={`#/agwaze.near/widget/GenaDrop.NFTDetails?contractId=${nft.contract_id}&tokenId=${nft.token_id}&chainState=${state.chain}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard className="card">
                <ImageCard>
                  <img
                    src={nft.media_url}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                    className="rounded-3"
                  />
                </ImageCard>
                <NFTCardText>
                  <hr />
                  <div className="d-flex my-4 justify-content-between w-100 px-2"></div>
                  <div className="px-2">
                    <div style={{ color: "#a4a9b6" }}>Name</div>
                    <h3
                      style={{
                        fontSize: "16px",
                        margin: "0 0 10px",
                        wordBreak: "break-all",
                      }}
                    >
                      {nft.name}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    {nft.owner ? (
                      <div>
                        <div style={{ color: "#a4a9b6" }}>Owner</div>
                        <p style={{ fontSize: "14px", color: "#0d99ff" }}>
                          {nft.owner.length > 12
                            ? nft.owner.slice(0, 12) + "..."
                            : nft.owner}
                        </p>
                      </div>
                    ) : (
                      nft.nft_state && (
                        <div>
                          <div style={{ color: "#a4a9b6" }}>Owner</div>
                          <p style={{ fontSize: "14px" }}>
                            {nft.nft_state.owner.length > 12
                              ? nft.nft_state.owner.slice(0, 12) + "..."
                              : nft.nft_state.owner}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div className="px-2">
                      <div style={{ color: "#a4a9b6", fontSize: "1.1rem" }}>
                        Price
                      </div>
                      {nft.listings && nft.listings[0] ? (
                        typeof nft.listings[0].price === "number" ? (
                          <ChainPrice>
                            <img
                              src={currentChainProps[state.chain].img}
                              alt=""
                            />
                            <PriceArea>
                              <h6>{`${
                                nft.listings[0].price.toFixed(2) /
                                state.conversion
                              }`}</h6>
                              <span>{`(${getUsdValue(
                                nft.listings[0].price.toFixed(2) /
                                  state.conversion
                              )})`}</span>
                            </PriceArea>
                          </ChainPrice>
                        ) : (
                          <div>Not for Sale</div>
                        )
                      ) : nft.price ? (
                        <ChainPrice>
                          <img
                            src={currentChainProps[state.chain].img}
                            alt=""
                          />
                          <PriceArea>
                            <h6>
                              {(nft.price / PRICE_CONVERSION_CONSTANT).toFixed(
                                2
                              )}
                            </h6>
                            <span>
                              (
                              {getUsdValue(
                                nft.price / PRICE_CONVERSION_CONSTANT
                              )}
                              )
                            </span>
                          </PriceArea>
                        </ChainPrice>
                      ) : (
                        <ChainPrice>
                          <img
                            src={currentChainProps[state.chain].img}
                            alt=""
                          />
                          <PriceArea>
                            <h6>0.00</h6>
                            <span>($0.00)</span>
                          </PriceArea>
                        </ChainPrice>
                      )}
                    </div>
                    <ViewButton>
                      <button>View</button>
                    </ViewButton>
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : state.filteredNFTData.length > 0 ? (
          state.filteredNFTData.map((nft) => (
            <a
              href={`#/agwaze.near/widget/GenaDrop.NFTDetails?contractId=${nft.contract_id}&tokenId=${nft.token_id}&chainState=${state.chain}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard classNmae="card">
                <ImageCard>
                  <img
                    src={nft.media_url}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                    className="rounded-3"
                  />
                </ImageCard>
                <NFTCardText>
                  <hr />
                  <div className="d-flex my-4 justify-content-between w-100 px-2">
                    <div>{nft.nft_state_lists[0].list_contract.name}</div>
                  </div>
                  <div className="px-2">
                    <div style={{ color: "#a4a9b6" }}>Name</div>
                    <h3
                      style={{
                        fontSize: "16px",
                        margin: "0 0 10px",
                        wordBreak: "break-all",
                      }}
                    >
                      {nft.name}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div>
                      <div style={{ color: "#a4a9b6" }}>Token ID</div>
                      <p
                        style={{
                          fontSize: "14px",
                          marginBottom: "5px",
                          color: "#0d99ff",
                        }}
                      >
                        {nft.token_id.length > 30
                          ? `${nft.token_id.slice(0, 30)}...`
                          : nft.token_id}
                      </p>
                    </div>
                    {nft.nft_state && (
                      <div>
                        <div style={{ color: "#a4a9b6" }}>Owner</div>
                        <p style={{ fontSize: "14px" }}>
                          {nft.nft_state.owner.length > 12
                            ? nft.nft_state.owner.slice(0, 12) + "..."
                            : nft.nft_state.owner}
                        </p>
                      </div>
                    )}
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div className="px-2">
                      <div style={{ color: "#a4a9b6", fontSize: "1.1rem" }}>
                        Price
                      </div>
                      {nft.listings && nft.listings[0] ? (
                        typeof nft.listings[0].price === "number" ? (
                          <ChainPrice>
                            <img
                              src={currentChainProps[state.chain].img}
                              alt=""
                            />
                            <PriceArea>
                              <h6>{`${
                                nft.listings[0].price.toFixed(2) /
                                state.conversion
                              }`}</h6>
                              <span>{`(${getUsdValue(
                                nft.listings[0].price.toFixed(2) /
                                  state.conversion
                              )})`}</span>
                            </PriceArea>
                          </ChainPrice>
                        ) : (
                          <div>Not for Sale</div>
                        )
                      ) : nft.price ? (
                        <ChainPrice>
                          <img
                            src={currentChainProps[state.chain].img}
                            alt=""
                          />
                          <PriceArea>
                            <h6>
                              {(nft.price / PRICE_CONVERSION_CONSTANT).toFixed(
                                2
                              )}
                            </h6>
                            <span>
                              (
                              {getUsdValue(
                                nft.price / PRICE_CONVERSION_CONSTANT
                              )}
                              )
                            </span>
                          </PriceArea>
                        </ChainPrice>
                      ) : (
                        <ChainPrice>
                          <img src={currentChain[state.chain].img} alt="" />
                          <PriceArea>
                            <h6>0.00</h6>
                            <span>($0.00)</span>
                          </PriceArea>
                        </ChainPrice>
                      )}
                    </div>
                    <div>
                      <button>View</button>
                    </div>
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : (
          <div>No results found for "{state.searchTerm}".</div>
        )}
      </NFTCards>
    ) : (
      <NoNFTLoading>
        <img
          src="https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu"
          alt=""
        />
      </NoNFTLoading>
    )}
    <Widget src="jgodwill.near/widget/GenaDrop.Footer" />
  </>
);
