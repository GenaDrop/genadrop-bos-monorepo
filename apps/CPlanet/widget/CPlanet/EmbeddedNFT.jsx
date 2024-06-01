const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
};

const contractId = props.contractId || "yuzu.recurforever.near";
const tokenId = props.tokenId || "92690";
const className = props.className ?? "img-fluid";
const style = props.style;
const alt = props.alt;
const thumbnail = props.thumbnail;
const fallbackUrl = props.fallbackUrl;
const loadingUrl =
  props.loadingUrl ??
  "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu";

State.init({
  contractId,
  tokenId,
  description: "",
  text: "",
  message: false,
  listings: [],
  loadingBuying: false,
  title: "",
  owner: "",
  imageUrl: null,
});

const profile = props.profile ?? Social.getr(`${state.owner}/profile`);

const currentChainProps = {
  near: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
    livePrice: "near",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/near-mainnet",
    chain: "near",
    id: "1112",
    explorer: "https://nearblocks.io/address/",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
  },
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
  aptos: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqBinSwbRdx76qY4A3qvVkM9g_mKoGCBDT0sqTT02TgRvKquV2Vlc8fSRmLyuhBS3-CaA&usqp=CAU",
  },
  sui: {
    img: "https://blog.sui.io/content/images/2023/04/Sui_Droplet_Logo_Blue-3.png",
  },
};

const listAbi = [
  "function createMarketplaceItem(address nftContract, uint256 tokenId, uint256 price, string calldata category, address seller) public payable {}",
  "function nftSale(uint256 price, uint256 tokenId, address seller, address nftContract) public payable {}",
];

const NoNFTLoading = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const nftMetadata =
  nft.contractMetadata ?? Near.view(contractId, "nft_metadata");
const tokenMetadata =
  nft.tokenMetadata ??
  Near.view(contractId, "nft_token", {
    token_id: tokenId,
  }).metadata;

if (contractId !== state.contractId || tokenId !== tokenId) {
  State.update({
    contractId,
    tokenId,
    imageUrl: null,
  });
}

let imageUrl = null;

const handleBuyClick = (price, owner) => {
  const contract = new ethers.Contract(
    currentChainProps[props.chainState].contract,
    listAbi,
    Ethers.provider().getSigner()
  );

  const nftContract = contractId.split(tokenId)[0];
  State.update({
    loadingBuying: true,
  });
  contract
    .nftSale(price, tokenId, owner, nftContract, { value: price })
    .then((transactionHash) => transactionHash.wait())
    .then((ricit) => {
      console.log("does not get hiere", ricit);
      State.update({
        message: true,
        error: false,
        loadingBuying: false,
        text: `${currentChainProps[props.chainState].explorerTx}/tx/${
          ricit.transactionHash
        }`,
      });
    })
    .catch((err) => {
      console.log("couldnt finish", err);
      State.update({
        error: true,
        loadingBuying: false,
        text: err.reason,
      });
    });
};

function fetchTokens() {
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
                mb_views_nft_tokens(
                where: { nft_contract_id: { _eq: "${contractId}" }, token_id: {_eq: "${tokenId}"}}
                order_by: {minted_timestamp: desc}
              ) {
                  attributes {
                      attribute_display_type
                      attribute_value
                  }
                  media 
                  owner
                  token_id
                  nft_contract_id
                  description
                  title
                  listings {
                      price
                      unlisted_at
                      listed_by
                  }
              }
            }
          `,
    }),
  }).then((res) => {
    if (res.ok) {
      const tokens = res.body.data.mb_views_nft_tokens;
      const token = tokens[0];
      State.update({
        description: token.description,
        owner: token.owner,
        listings: token.listings[0],
        title: token.title,
      });
      if (!token && props.chainState !== ("aptos" || "sui")) {
        let response = fetch(currentChainProps[props.chainState]?.subgraph, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query MyQuery {
               nfts(where: {tokenID: "${tokenId}"}) {
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
        const collectionData = response.body.data.nfts;

        if (collectionData) {
          const nftBody = collectionData.map((data) => {
            const fetchIPFSData = fetch(
              data.tokenIPFSPath.replace("ipfs://", "https://ipfs.io/ipfs/")
            );

            if (fetchIPFSData.ok) {
              const nft = fetchIPFSData.body;
              let nftObject = {};
              nftObject.contract_id = data.id;
              nftObject.sold = data.isSold;
              nftObject.isListed = data.isListed;
              nftObject.owner = data.owner.id;
              nftObject.price = data.price;
              nftObject.token_id = data.tokenID;
              nftObject.name = nft?.name;
              nftObject.description = nft?.description;
              nftObject.attributes = nft?.properties;
              nftObject.image = nft?.image.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
              );
              return nftObject;
            }
          });
          State.update({
            title: nftBody[0].name,
            imageUrl: nftBody[0].image,
            owner: nftBody[0]?.owner,
            description: nftBody[0]?.description,
            price: nftBody[0].price,
          });
        }
      }
      if (!token) {
        const response = fetch("https://api.indexer.xyz/graphql", {
          method: "POST",
          headers: {
            "x-api-key": "Krqwh4b.bae381951d6050d351945c0c750f1510",
            "x-api-user": "Banyan",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `query MyQuery {
    ${props.chainState} {
      nfts(
        where: { contract_id: { _eq: "${contractId}" }, token_id: {_eq: "${tokenId}"}}
      ) {
        contract_id
        name
        media_url
        token_id
        media_type
        owner
        
        staked_owner
        listings {
          listed
          price
        }
        attributes {
          rarity
          value
          type
          score
        }
       }
       }
      }`,
          }),
        });
        const token = response.body.data[props.chainState].nfts;
        if (token) {
          State.update({
            title: token[0].name,
            listings: token[0].listings,
            attributes: token[0].attributes,
            imageUrl: token[0].media_ur,
          });
          console.log("token", token[0]);
        }
      }
    }
  });
}

fetchTokens();

if (props.contractId && props.tokenId && !state.title) {
  return (
    <NoNFTLoading>
      <img
        src="https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu"
        alt=""
      />
    </NoNFTLoading>
  );
}
if (nftMetadata && tokenMetadata) {
  let tokenMedia = tokenMetadata.media || "";

  imageUrl =
    tokenMedia.startsWith("https://") ||
    tokenMedia.startsWith("http://") ||
    tokenMedia.startsWith("data:image")
      ? tokenMedia
      : nftMetadata.base_uri
      ? `${nftMetadata.base_uri}/${tokenMedia}`
      : tokenMedia.startsWith("Qm") || tokenMedia.startsWith("ba")
      ? `https://ipfs.near.social/ipfs/${tokenMedia}`
      : tokenMedia;

  if (!tokenMedia && tokenMetadata.reference) {
    if (
      nftMetadata.base_uri === "https://arweave.net" &&
      !tokenMetadata.reference.startsWith("https://")
    ) {
      const res = fetch(`${nftMetadata.base_uri}/${tokenMetadata.reference}`);
      imageUrl = res.body.media;
    } else if (
      tokenMetadata.reference.startsWith("https://") ||
      tokenMetadata.reference.startsWith("http://")
    ) {
      const res = fetch(tokenMetadata.reference);
      imageUrl = JSON.parse(res.body).media;
    } else if (tokenMetadata.reference.startsWith("ar://")) {
      const res = fetch(
        `${"https://arweave.net"}/${tokenMetadata.reference.split("//")[1]}`
      );
      imageUrl = JSON.parse(res.body).media;
    }
  }

  if (!imageUrl) {
    imageUrl = false;
  }
}

const replaceIpfs = (imageUrl) => {
  if (state.oldUrl !== imageUrl && imageUrl) {
    const match = rex.exec(imageUrl);
    if (match) {
      const newImageUrl = `https://ipfs.near.social/ipfs/${match[1]}${
        match[2] || ""
      }`;
      if (newImageUrl !== imageUrl) {
        State.update({
          oldUrl: imageUrl,
          imageUrl: newImageUrl,
        });
        return;
      }
    }
  }
  if (state.imageUrl !== false) {
    State.update({
      imageUrl: false,
    });
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
  const accounts = Ethers?.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

const thumb = (imageUrl) =>
  thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
    ? `https://i.near.social/${thumbnail}/${imageUrl}`
    : imageUrl;

const img = state.imageUrl !== null ? state.imageUrl : imageUrl;
const src = img !== false ? img : fallbackUrl;

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  align-items: center;
  justify-content: center;
  a {
    opacity: 0.6;
  }
`;
const MainContainer = styled.div`
  padding: 30px;
  height: auto;
  max-width: 1300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  @media screen and (max-width: 600px) {
    justify-content: center;
    align-items: center;
  }
`;

const TopImageContainer = styled.div`
  padding: 1em;
  background: #ffffff;
  width: 50%;
  min-width: 300px;
  // border: 2px solid #cacdd5;
  border: 4px solid rgba(0, 0, 0, 0.317);
  margin: 20px;
  box-shadow: 2px 7px 22px rgba(28, 27, 28, 0.1);
  border: 1px solid #eeeff2;
  // border-radius: 0.7em;
  .Top-section {
    display: flex;
    justify-content: space-between;
    padding: 0 0.4rem;
  }
  & > img {
    width: 100%;
  }
`;

const loadingAnimation = styled.keyframes`
  0% {
    content: "Loading";
  }
  25% {
    content: "Loading.";
  }
  50% {
    content: "Loading..";
  }
  75% {
    content: "Loading...";
  }
`;

const HeaderText = styled.p`
  font-family: Helvetica Neue;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: 100%; /* 16px */
`;

const Logo = styled.div`
  & > img {
    width: 30px;
    margin-right: 5px;
  }
`;

const RightSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
`;

const Description = styled.div`
  width: 100%;
  // border-radius: 1em;
  background: #ffffff;
  border: 1px solid #eeeff2;
  padding: 1em;
  margin-top: 10px;
  box-shadow: 1px 1px 10px 1px rgba(28, 27, 28, 0.1);
  & > .desc {
    font-weight: 700;
    // font-size: 1.5rem;
  }
`;

const AttributeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Attribute = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.5em;
  border-radius: 0.5em;
  width: 206px;
  background: #fafafb;
  margin-bottom: 20px;
  border: 1px solid #86ccff;
  border-radius: 10.6849px;
  & > *span {
    padding: 0;
    color: #b2b7c2;
  }
`;

const owner = state?.owner;

const nftOwner =
  owner &&
  `${
    owner?.endsWith(".near")
      ? `@${
          owner?.length > 20
            ? `${owner?.slice(0, 10)}...${owner?.slice(owner?.length - 4)}`
            : `${owner}`
        }`
      : `@${owner?.slice(0, 10)}...${owner?.slice(owner?.length - 4)}`
  }`;

return (
  <Root>
    <MainContainer>
      <TopSection>
        <TopImageContainer>
          <div className="Top-section">
            <HeaderText>{state.title || "AI Sunset"}</HeaderText>
            {props.chainState ? (
              <Logo>
                <img src={currentChainProps[props.chainState]?.img} />
              </Logo>
            ) : (
              <Logo>
                <Widget
                  src="jgodwill.near/widget/GenaDrop.NearLogo"
                  props={{ width: 25 }}
                />
              </Logo>
            )}
          </div>
          <Description>
            <img
              src={
                src ||
                "https://genadrop.mypinata.cloud/ipfs/QmZbtU8RnMymJAJRpTriZgDXVeeCpm5RyXMJNquGoVc4Rb"
              }
              alt="NFT"
              width="100%"
              height="100%"
            />
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  marginBottom: "0.5em",
                  fontSize: "0.85rem",
                  color: "#000",
                  fontWeight: "700",
                }}
              >
                Owner
              </p>
              <a
                target="_blank"
                style={{ textDecoration: "none" }}
                href={
                  state.owner && tokenId
                    ? currentChainProps[props.chainState]?.explorer +
                      state.owner
                    : "#"
                }
              >
                <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  {nftOwner ||
                    (state?.owner && tokenId
                      ? "----"
                      : `${"nft.genadrop.near".slice(
                          0,
                          10
                        )}...${"nft.genadrop.near".slice(
                          "nft.genadrop.near".length - 4
                        )}`)}
                </span>
              </a>
            </div>
          </Description>
          <RightSection>
            <Description>
              <p className="desc">Description</p>
              <span>
                {state.description
                  ? state.description.length > 250
                    ? `${state.description.slice(0, 250)}. . .`
                    : state.description
                  : tokenId && !state.description
                  ? "--No Description--"
                  : "Ai generated sunset cliffs"}
              </span>
            </Description>
          </RightSection>
        </TopImageContainer>
      </TopSection>
    </MainContainer>
  </Root>
);