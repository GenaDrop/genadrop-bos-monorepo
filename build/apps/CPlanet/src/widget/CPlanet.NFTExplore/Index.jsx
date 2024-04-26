const Root = styled.div`
  padding: 20px;
  width: 100%;
  h1 {
    color: var(--Black, #000);
    leading-trim: both;
    text-edge: cap;
    font-family: Helvetica Neue;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const NFTCards = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  padding: 20px 3rem 1rem 3rem;
  width: 100%;
`;
const NoNFTLoading = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TopNFTS = styled.div`
  display: flex;
  max-width: 1400px;
  margin-right: auto;
  margin-left: auto;
  flex-direction: row;
  gap: 16px;
  overflow-x: scroll;
  margin-top: 30px;
`;
const SearchSection = styled.div`
  margin-top: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 500px) {
    h1 {
      font-size: 25px;
      text-align: center;
    }
  }
`;
const NoData = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const Search = styled.div`
  margin-top: 32px;
  justify-content: center;
  display: flex;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
  input {
    border-radius: 8px;
    flex-shrink: 0;
    height: 48px;
    width: 65%;
    background: #f8f8f8;
    overflow: hidden;
    color: #b0b0b0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 29.6px */
    @media (max-width: 500px) {
      width: 95%;
      font-size: 15px;
      margin-bottom: 5px;
    }
  }
`;
const Cards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  margin-top: 32px;
  flex-wrap: wrap;
  width: 100%;
  gap: 30px;
`;
const FilterDropdown = styled.div`
  width: 192px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #b0b0b0;
  overflow: hidden;
  color: #fff;
  font-family: Helvetica Neue;
  font-size: 20px;
  font-style: normal;
  text-align: center;
  font-weight: 400;
  padding-top: 8px;
  margin-left: 10px;
`;
const Explore = styled.div`
  width: 100%;
  display: flex;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;
  justify-contents: center;
`;
State.init({
  nftData: [],
  chain: "near",
  filterDisplayId: "0",
  filteredNFTData: [],
  searchTerm: "",
});
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
];
const updateChain = (chain) => {
  State.update({ chain, currentPage: 1 });
};
const updateFilter = (id) => {
  State.update({ filterDisplayId: id });
};
const fetchData = () => {
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
          filteredData.tokenIPFSPath.replace("ipfs://", "https://ipfs.io/ipfs/")
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
        nftObject.contract_id = data?.id.split(data?.tokenID)[0];
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
};
fetchData();
const PRICE_CONVERSION_CONSTANT =
  state.chain == "near" ? 1000000000000000000000000 : 1000000000000000000;
return (
  <Root>
    <TopNFTS>
      <Widget
        props={{
          onButtonClick: props.update,
          chainState: "near",
          isGateway: props.isGateway,
        }}
        src="bos.genadrop.near/widget/CPlanet.NFTCard.FeaturedNFT"
      />
    </TopNFTS>
    <Explore>
      <SearchSection>
        <h1>
          Explore {state.filterDisplayId === "0" ? "Creative" : "Multi Chain"}{" "}
          NFTs
        </h1>
        <Search>
          <input
            value={state.searchTerm}
            type="search"
            onChange={seachInputHandler}
            placeholder="Search for NFTs"
          />
          <Widget
            props={{ updateChain: updateFilter }}
            src="bos.genadrop.near/widget/CPlanet.NFTExplore.FilterDropdown"
          />
          {state.filterDisplayId === "1" && (
            <Widget
              props={{ chains: defaultProps, updateChain }}
              src="bos.genadrop.near/widget/CPlanet.NFTExplore.ChainsDropdown"
            />
          )}
        </Search>
      </SearchSection>
      {state.filterDisplayId === "0" ? (
        <Widget
          src="bos.genadrop.near/widget/CPlanet.NFTExplore.DAONFTs"
          props={{ update: props.update }}
        />
      ) : (
        <Cards>
          {state.nftData.length > 0 ? (
            <NFTCards>
              {state.searchTerm === ""
                ? state.nftData.map((data, index) => (
                    <div key={index}>
                      <Widget
                        props={{
                          title: data.name,
                          description: data.description,
                          image: data.media_url,
                          onButtonClick: () =>
                            props.update({
                              tab: "singleNFT",
                              contractId: data.contract_id,
                              tokenId: data.token_id,
                              chainState: state.chain,
                            }),
                          price: data.price
                            ? (data.price / PRICE_CONVERSION_CONSTANT).toFixed(
                                2
                              )
                            : null,
                          owner: data.owner,
                          logo: currentChainProps[state.chain].img,
                          isListed: data.isListed ? "LISTED" : "NOT LISTED",
                          tokenId: data.token_id,
                          contractId: data.contract_id,
                          chainState: state.chain,
                        }}
                        src="bos.genadrop.near/widget/CPlanet.NFTCard.Index"
                      />
                    </div>
                  ))
                : state.filteredNFTData.map((data, index) => (
                    <div key={index}>
                      <Widget
                        props={{
                          title: data.name,
                          description: data.description,
                          image: data.media_url,
                          owner: data.owner,
                          chainState: state.chainState,
                          logo: currentChainProps[state.chain].img,
                          onButtonClick: () =>
                            props.update({
                              tab: "singleNFT",
                              contractId: data.contract_id,
                              tokenId: data.token_id,
                              chainState: state.chain,
                            }),
                          price: data.price
                            ? (data.price / PRICE_CONVERSION_CONSTANT).toFixed(
                                2
                              )
                            : null,
                          isListed: data.isListed ? "LISTED" : "NOT LISTED",
                          tokenId: data.token_id,
                          contractId: data.contract_id,
                        }}
                        src="bos.genadrop.near/widget/CPlanet.NFTCard.Index"
                      />
                    </div>
                  ))}
            </NFTCards>
          ) : (
            <div></div>
          )}
        </Cards>
      )}
    </Explore>
  </Root>
);
