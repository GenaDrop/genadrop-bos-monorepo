const arrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
  >
    <path
      d="M1.13672 1C4.20751 1 5.92918 1 8.99997 1V9"
      stroke="black"
      stroke-width="1.3478"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.99883 1L1 8.7377"
      stroke="black"
      stroke-width="1.3478"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const Root = styled.div``;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  padding: 30px 0 0 30px;
  h4 {
    color: #000;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
    line-height: 160%; /* 25.6px */
  }
`;
const Body = styled.div`
  margin-top: 23px;
`;
const Row = styled.a`
  display: flex;
  justify-content: space-between;
  width: 80%;
  max-width: 700px;
  margin-bottom: 10px;
  align-items: center;
`;
const ImageSec = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-left: 10px;
    p {
      color: #000;
      font-family: Helvetica Neue;
      font-size: 14px;
      font-style: normal;
      margin-bottom: 0;
      font-weight: 400;
      line-height: 17px; /* 121.429% */
    }
    span {
      color: rgba(0, 0, 0, 0.85);
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%; /* 19.2px */
    }
  }
`;
const PriceSec = styled.div`
  h1 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 25.6px */
    margin-bottom: 0;
    display: flex;
    gap: 4px;
    align-items: center;
  }
  span {
    color: rgba(17, 17, 15, 0.6);
    font-family: Helvetica Neue;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 19.2px */
  }
  img {
    width: 12px;
    height: 12px;
  }
`;
const Image = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background: #000;
`;
const About = styled.div`
  padding-left: 30px;
  h1 {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
  a {
    display: flex;
    border-radius: 32px;
    border: 1px solid #000;
    display: flex;
    padding: 4px 12px;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    transition: 0.3s ease-in-out;
    margin-top: 8px;
    gap: 8px;
    width: max-content;
    h2 {
      color: #000;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      margin-bottom: 0;
      line-height: normal;
    }
  }
  a:hover {
    opacity: 0.5;
  }
  p {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    margin-top: 8px;
    line-height: 148%;
  }
`;
const TabHeight = styled.div`
  height: 280px;
  overflow-y: scroll;
  margin-bottom: 20px;
`;
const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      currentChainProps[props.chainState].livePrice
    }&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price;
    return value !== "NaN" ? `$${value.toFixed(3)}` : 0;
  }
};
const profile = props.profile ?? Social.getr(`${props.owner}/profile`);
initState({
  tab: "HISTORY",
});
const currentChainProps = {
  near: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
    livePrice: "near",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/near-mainnet",
    chain: "near",
    id: "1112",
    explorer: "https://explorer.near.org/?query=",
    explorerTx: "https://explorer.near.org/?query=",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
  },
  aurora: {
    img: "https://s2.coinmarketcap.com/static/img/coins/200x200/14803.png",
    id: "1313161554",
    chain: "Aurora",
    explorer: "https://aurorascan.dev/",
    explorerTx: "https://aurorascan.dev/tx/",
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
    explorerTx: "https://explorer.celo.org/tx/",
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
    explorerTx: "https://polygonscan.com/tx/",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/polygon-mainnet",
  },
};
const PRICE_CONVERSION_CONSTANT =
  props.chainState == "near" ? 1000000000000000000000000 : 1000000000000000000;
return (
  <Root>
    <Header>
      <h4
        onClick={() => State.update({ tab: "INFO" })}
        style={
          state.tab === "INFO"
            ? {
                borderBottom: "3px solid black",
              }
            : {}
        }
      >
        Info
      </h4>
      <h4
        onClick={() => State.update({ tab: "HISTORY" })}
        style={
          state.tab === "HISTORY"
            ? {
                borderBottom: "3px solid black",
              }
            : {}
        }
      >
        History
      </h4>
      <h4
        onClick={() => State.update({ tab: "OFFERS" })}
        style={
          state.tab === "OFFERS"
            ? {
                borderBottom: "3px solid black",
              }
            : {}
        }
      >
        Offers
      </h4>
      <h4
        onClick={() => State.update({ tab: "ATTRIBUTES" })}
        style={
          state.tab === "ATTRIBUTES"
            ? {
                borderBottom: "3px solid black",
              }
            : {}
        }
      >
        Attributes
      </h4>
    </Header>
    <Body>
      <TabHeight>
        {state.tab === "HISTORY" &&
          props.transactions &&
          props?.transactions?.map((data, index) => (
            <Row
              href={`${currentChainProps[props.chainState].explorerTx}${
                data.txId
              }`}
              target="_blank"
              key={data}
            >
              <ImageSec>
                <Image></Image>
                <div>
                  <p>
                    {data.type} by
                    {props.chainState === "near"
                      ? data?.from?.id
                      : data?.from?.id
                      ? `${data?.from?.id?.slice(
                          0,
                          8
                        )}...${data?.from?.id?.slice(38)}`
                      : `${data?.to?.id?.slice(0, 8)}...${data?.to?.id?.slice(
                          38
                        )}`}
                  </p>
                  <span>06 Feb 2022 12:30:39 PM</span>
                </div>
              </ImageSec>
              <PriceSec>
                <h1>
                  <img src={currentChainProps[props.chainState].img} />
                  {(data.price / PRICE_CONVERSION_CONSTANT).toFixed(2)}
                </h1>
                <span>
                  {getUsdValue(
                    (data.price / PRICE_CONVERSION_CONSTANT).toFixed(2)
                  )}
                </span>
              </PriceSec>
            </Row>
          ))}
      </TabHeight>
      <About>
        <h1>ABOUT THE ARTIST</h1>
        <a
          target="_blank"
          href={
            props.chainState === "near"
              ? `/bos.genadrop.near/widget/DropFlow.ArtistPage.Index?accountId=${props.owner}`
              : currentChainProps[props.chainState].explorer + props.owner
          }
        >
          {arrow}
          <h2>View Artist Page</h2>
        </a>
        {props.chainState === "near" && (
          <p>
            {profile.description
              ? profile.description
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat."}
          </p>
        )}
      </About>
    </Body>
  </Root>
);
