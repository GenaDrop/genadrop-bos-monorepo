const verifiedCheck = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="13"
    viewBox="0 0 16 13"
    fill="none"
  >
    <rect y="0.5" width="16" height="12" rx="6" fill="#B0B0B0" />
    <path
      d="M5 6.69231L7 9L11 4"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const trippleDots = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="4"
    viewBox="0 0 18 4"
    fill="none"
  >
    <circle cx="2" cy="2" r="2" fill="black" />
    <circle cx="9" cy="2" r="2" fill="black" />
    <circle cx="16" cy="2" r="2" fill="black" />
  </svg>
);
const mintbaseImage =
  "data:image/png;base64,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";
const dotSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="4"
    height="5"
    viewBox="0 0 4 5"
    fill="none"
  >
    <circle cx="2" cy="2.5" r="2" fill="#B0B0B0" />
  </svg>
);
const tradePortLogo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
  >
    <path
      d="M15.3076 7.74805L18.0078 10.4727L6.70031 21.8821L4 19.1574L15.3076 7.74805Z"
      fill="black"
    />
    <path
      d="M28.1357 20.6895L30.8361 23.414L19.5285 34.8235L16.8281 32.0988L28.1357 20.6895Z"
      fill="black"
    />
    <path
      d="M25.4345 10.4727L28.1348 13.1973L13.1143 28.3531L10.4141 25.6284L25.4345 10.4727Z"
      fill="black"
    />
    <path
      d="M34.5492 14.2174L31.8488 16.942L21.7227 6.72464L24.4229 4L34.5492 14.2174Z"
      fill="black"
    />
  </svg>
);
const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  padding: 40px 10px;
  justify-content: space-between;
`;
const fewAndFarLogo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <g clip-path="url(#clip0_155_4752)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.5 0.564453L0.604503 19.8572L3.91621 19.8379L3.83048 3.95389H19.3669V0.564453H0.5ZM8.51959 8.77372L8.63256 19.8651L11.9443 19.8297L11.8659 12.1631H19.367V8.77372H8.51959ZM22.8227 23.2105H11.9753V19.8212H19.4763L19.3979 12.1542L22.7097 12.1188L22.8227 23.2105ZM11.9753 31.4197H30.8421L30.7376 12.1266L27.4259 12.1458L27.5117 28.0302H11.9753V31.4197Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_155_4752">
        <rect
          width="30.9531"
          height="31.9849"
          fill="white"
          transform="translate(0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
const marketPlaceImage = {
  tradeport: tradePortLogo,
  fewandfar: fewAndFarLogo,
  mintbase: (
    <img src={mintbaseImage} alt="" style={{ width: 20, height: 20 }} />
  ),
};
const Right = styled.div`
  width: 50%;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
const TopLeft = styled.div`
  h1 {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    whitespace: nowrap;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
`;
const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  > div:first-child {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
  }
`;
const Username = styled.div`
      display: flex;
      a {
        text:decoration: none;
         overflow: hidden;
          color: #B0B0B0;
          text-overflow: ellipsis;
          font-family: Helvetica Neue;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          cursor: pointer;
      }
      a:hover {
        text:decoration: none;
        opacity: 0.6;
      }
      svg {
          margin: 7px;
      }
      h2 {
          overflow: hidden;
          color: #B0B0B0;
          text-overflow: ellipsis;
          font-family: Helvetica Neue;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
      }
  `;
const Svg = styled.div`
  svg {
    margin-top: 2px;
    margin-left: 3px;
  }
`;
const TopRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  p {
    border: 1px solid #000;
    border-radius: 32px;
    color: #000;
    padding: 7px 20px;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 0;
    cursor: pointer;
  }
  p:hover {
    background: black;
    color: white;
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImageContainer = styled.div`
  width: 544px;
  height: 444px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 500px) {
    width: 90vw;
  }
`;
const PriceSection = styled.div`
  margin-top: 20px;
  width: 544px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
`;
const Price = styled.div`
  h1 {
    color: #b0b0b0;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }
`;
const Owner = styled.div`
  h2 {
    margin: 0;
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
  p {
    color: #b0b0b0;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
    margin-bottom: 7px;
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }
`;
const PriceAmount = styled.div`
  display: flex;
  align-items: baseline;
  img {
    width: 22px;
    height: 22px;
    margin-right: 5px;
  }
  h2 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
  h5 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    text-transform: uppercase;
    margin-left: 10px;
  }
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  button:first-child {
    display: flex;
    width: 268px;
    padding: 7px 0px;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    background: #000;
    border-radius: 0;
  }
  button:first-child:hover {
    background: white;
    color: black;
    border-color: black;
  }
  button:first-child:disabled {
    cursor: not-allowed;
    background: #b0b0b0;
  }
  button:last-child {
    display: flex;
    width: 268px;
    padding: 7px 0px;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    background: #fff;
    border-radius: 0;
    color: black;
  }
  button:last-child:hover {
    background: black;
    color: white;
  }
  @media (max-wdith: 500px) {
    justify-content: center;
  }
`;
const Des = styled.div`
  width: 90%;
  h5 {
    margin-top: 10px;
    color: #000;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 23.68px */
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;
const Share = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  padding: 0px 7px;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  border: 1px solid #000;
  margin-left: 7px;
`;
const Others = styled.div`
  margin-top: 31px;
  h1 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 38.4px */
  }
`;
const Table = styled.div`
  @media (max-width: 500px) {
    width: 90vw;
    overflow: hidden;
  }
`;
const MarketRow = styled.div`
  width: 480px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  a {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    text-decoration: none;
    width: 90%;
    transition: 0.3s ease-in-out;
    padding: 10px;
    margin-bottom: 5px;
  }
  a:hover {
    opacity: 0.7;
    background: #e7e6e8;
    border-radius: 8px;
  }
  p {
    color: #363c42;
    font-family: Helvetica Neue;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  @media (max-width: 500px) {
    width: 90vw;
    overflow: hidden;
  }
`;
const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 480px;
  justify-content: space-between;
  h2 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 25.6px */
  }
`;
const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  justify-content: center;
  h1 {
    font-size: 32px;
    font-weight: 600;
  }
  span {
    color: #b0b0b0;
    font-size: 14px;
  }
`;
const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
};
const contractId = props.contractId;
const tokenId = props.tokenId;
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
  isCreative: false,
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
const tokenInfo = Near.view(contractId ?? "nft.genadrop.near", "nft_token", {
  token_id: tokenId,
});
const tradeportLink = `https://www.tradeport.xyz/near/collection/${
  state.contractId
    ? state?.contractId?.includes("genadrop")
      ? "nft.genadrop.near"
      : state.contractId
    : ""
}?tab=items&tokenId=${state.tokenId}`;
//Few and Far Link
const fewfarlink = `https://fewfar.com/${
  state.contractId
    ? state?.contractId?.includes("genadrop")
      ? "genadrop-single-nft-c40d654de"
      : state.contractId
    : ""
}/${state.tokenId}`;
const currentChainProps = {
  near: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
    livePrice: "near",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/near-mainnet",
    chain: "near",
    id: "1112",
    explorer: "https://explorer.near.org/?query=",
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
    explorerTx: "https://explorer.celo.org/mainnet/tx/",
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
                    market_id
                    metadata_id
                    nft_contract_id
                  }
              }
            }
          `,
    }),
  }).then((res) => {
    if (res.body.data.mb_views_nft_tokens.length) {
      console.log(res);
      const tokens = res.body.data.mb_views_nft_tokens;
      const token = tokens[0];
      State.update({
        description: token.description,
        owner: token.owner,
        isCreative: true,
        listings: token.listings[0],
        title: token.title,
        imageUrl: token.media,
        listings: token.listings,
        price: token.listings?.length ? token.listings[0]?.price : 0,
      });
    } else {
      let response = fetch(
        currentChainProps[props.chainState ?? "near"].subgraph,
        {
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
                    type
                    txId
                    from {
                      id
                    }
                    to {
                      id
                    }
                  }
                  }
              }
          `,
          }),
        }
      );
      const collectionData = response.body.data.nfts;
      if (collectionData) {
        const nftBody = collectionData.map((data) => {
          const fetchIPFSData = fetch(
            data.tokenIPFSPath.replace("ipfs://", "https://ipfs.io/ipfs/")
          );
          console.log(fetchIPFSData);
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
            nftObject.transactions = data?.transactions;
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
          isCreative: false,
          description: nftBody[0]?.description,
          price: nftBody[0].price,
          transactions: nftBody[0].transactions,
        });
      }
    }
  });
}
fetchTokens();
const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      currentChainProps[props.chainState || "near"]?.livePrice
    }&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price;
    return value !== "NaN" ? `$${value.toFixed(3)}` : 0;
  }
};
const keywordsToCheck = ["tradeport", "mintbase", "fewandfar", "paras"];
const matchedKeyWords = (inputString) => {
  return keywordsToCheck.find((keyword) => inputString.includes(keyword));
};
const PRICE_CONVERSION_CONSTANT =
  props.chainState == "near" || !props.chainState
    ? 1000000000000000000000000
    : 1000000000000000000;
function followUser(user, isFollowing) {
  if (isFollowing) return;
  const dataToSend = {
    graph: { follow: { [user]: isFollowing ? null : "" } },
    index: {
      graph: JSON.stringify({
        key: "follow",
        value: {
          type,
          accountId: user,
        },
      }),
      notify: JSON.stringify({
        key: user,
        value: {
          type,
        },
      }),
    },
  };
  Social.set(dataToSend, {
    force: true,
  });
}
const handleBuyClick = (price, owner) => {
  console.log(price, owner);
};
if (!state.title) {
  return (
    <Loading>
      <h1>Loading NFT...</h1>
      <span>
        If this takes too long, something is wrong with IPFS, Please refresh
        page
      </span>
    </Loading>
  );
}
return (
  <Root>
    <Right>
      <Top>
        <div>
          <TopLeft>
            <h1>{state.title ?? "-- No Title --"}</h1>
            <Username>
              <a
                target="_blank"
                href={`/bos.genadrop.near/widget/DropFlow.ArtistPage.Index?accountId=${state.owner}`}
              >
                {state.owner ?? "-- No Owner --"}
              </a>
              <Svg>{verifiedCheck}</Svg>
              {dotSVG}
            </Username>
          </TopLeft>
          <TopRight>
            <p>Follow Artist</p>
            <Share>{trippleDots}</Share>
          </TopRight>
        </div>
        <Des>
          <h5>{state.description ?? "-- No Description --"}</h5>
        </Des>
      </Top>
      {state.transactions && (
        <Widget
          src={`bos.genadrop.near/widget/CPlanet.NFTExplore.NFTInfo`}
          props={{
            chainState: props.chainState,
            transactions: state.transactions,
            owner: state.owner,
          }}
        />
      )}
    </Right>
    <Left>
      <ImageContainer>
        <img src={state.imageUrl} alt="" />
      </ImageContainer>
      <PriceSection>
        <Price>
          <h1>CURRENT PRICE</h1>
          <PriceAmount>
            <img src={currentChainProps[props.chainState || "near"].img} />
            <h2>
              {state.price
                ? (state.price / PRICE_CONVERSION_CONSTANT)?.toFixed(2)
                : "N/A"}
            </h2>
            <h5>
              {getUsdValue(
                state.price ? state.price / PRICE_CONVERSION_CONSTANT : 0
              )}
            </h5>
          </PriceAmount>
        </Price>
        <Owner>
          <p>Current Owner</p>
          <h2>
            {state.owner.length > 5 && state.owner
              ? `${state.owner.slice(0, 7)}${
                  props.chainState === "near"
                    ? "...near"
                    : `...${state.owner.slice(40)}`
                }`
              : state.owner
              ? state.owner
              : "LOREMIP..."}
          </h2>
        </Owner>
      </PriceSection>
      <Buttons>
        <button
          onClick={() => handleBuyClick(state.price, state.owner)}
          disabled={state.isCreative}
        >
          Buy Now
        </button>
        {/* {props.chainState === "near" && <button>Trade NFT</button>} */}
      </Buttons>
      {props.chainState === "near" && (
        <Others>
          <h1>OTHER LISTINGS</h1>
          <Table>
            <TableHeader>
              <h2>Marketplace</h2>
              <h2>Price</h2>
              <h2>USD Price</h2>
            </TableHeader>
            <MarketRow>
              {tokenInfo &&
                Object.keys(tokenInfo.approved_account_ids).map((key) => (
                  <a
                    target="_blank"
                    href={
                      matchedKeyWords(key) === "tradeport"
                        ? tradeportLink
                        : fewfarlink
                    }
                  >
                    {marketPlaceImage[matchedKeyWords(key)]}
                    <p>
                      {state.price
                        ? (state.price / PRICE_CONVERSION_CONSTANT)?.toFixed(3)
                        : "N/A"}
                    </p>
                    <p>
                      {getUsdValue(
                        state.price
                          ? state.price / PRICE_CONVERSION_CONSTANT
                          : 0
                      )}
                    </p>
                  </a>
                ))}
            </MarketRow>
            <MarketRow>
              {state.listings.length > 0 &&
                state.listings.map((data, key) => (
                  <a
                    target="_blank"
                    href={
                      matchedKeyWords(data.nft_contract_id) === "mintbase"
                        ? `https://www.mintbase.xyz/meta/${data?.metadata_id}`
                        : fewfarlink
                    }
                  >
                    {marketPlaceImage[matchedKeyWords(data.nft_contract_id)]}
                    <p>
                      {data.price
                        ? (data.price / PRICE_CONVERSION_CONSTANT)?.toFixed(3)
                        : "N/A"}
                    </p>
                    <p>
                      {getUsdValue(
                        data.price ? data.price / PRICE_CONVERSION_CONSTANT : 0
                      )}
                    </p>
                  </a>
                ))}
            </MarketRow>
          </Table>
        </Others>
      )}
    </Left>
  </Root>
);
