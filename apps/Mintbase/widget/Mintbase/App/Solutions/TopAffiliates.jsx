const { isDarkModeOn } = props;
const accountId = props.accountId ?? "${config_account}";
const YoctoToNear = (amountYocto) => {
  return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
};

const _address = (address, _limit) => {
  const limit = _limit || 20;
  if (address.length > limit) return address.slice(0, 10) + "...";
  else return address;
};

const Root = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  .pagination {
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
      justify-content: flex-end;
    }
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .title-s {
    font-size: 20px;
    font-weight: 700;
    margin-top: 3rem;
    font-size: 40px;
    color: ${isDarkModeOn ? "#fff" : "black"};
  }
  .sub-title {
    color: gray;
    font-size: 20px;
  }
  .func {
    padding: 10px 30px;
    font-size: 18px;
    width: 80%;
    background: #282a3a;
    border-radius: 5px;
  }
  .text {
    color: white;
  }

  .sub-title {
    color: ${isDarkModeOn ? "#fff" : "black"};
    font-size: 25px;
    font-weight: 500;
  }
  .desc {
    color: ${isDarkModeOn ? "#B3B5BD" : "#404252"};
    font-size: 18px;
  }
`;

const ContainerTable = styled.div`
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  display: flex;
  flex-direction: column;
  overflow-x: scroll; /* Prevent horizontal overflow */
  margin: 10px;
  width: 100%;
  @media (max-width: 500px) {
    width: 100vw;
    font-size: 12px;
  }

  .header {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    color: ${isDarkModeOn ? "#ffffff" : "black"};
    margin-bottom: 1rem;
    font-weight: 500px;
    div {
      padding-bottom: 1rem;
      text-align: center;
      border-bottom: 2px solid ${isDarkModeOn ? "#374151" : "#E5E7EB"};
    }

    .item1 {
      grid-column-start: 1;
      grid-column-end: 1;
      margin-top: 23px;
    }
    .item2 {
      grid-column-start: 2;
      grid-column-end: 4;
    }
    .item3 {
      grid-column-start: 4;
      grid-column-end: 6;
    }
    .item4 {
      grid-column-start: 6;
      grid-column-end: 8;
    }
  }

  .trx-row {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 3fr));
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0;
    font-size: 18px;
    border-bottom: 1px solid ${color}5a;
    &:last-of-type {
      border-bottom-color: transparent;
    }

    a {
      text-decoration: none;
    }
    div,
    a,
    span {
      text-align: center;
      margin: auto;
    }
    .item1 {
      grid-column-start: 1;
      grid-column-end: 1;
    }
    .item2 {
      grid-column-start: 2;
      grid-column-end: 4;
      margin: unset;
      text-align: left;
    }
    .item3 {
      grid-column-start: 4;
      grid-column-end: 6;
    }
    .item4 {
      grid-column-start: 6;
      grid-column-end: 8;
    }
    .address {
      color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 2px;
      transition: all 200ms;
      :hover {
        color: #eee;
      }
    }
    .title {
      display: flex;
      align-items: center;
      text-decoration: none;
      gap: 10px;

      div {
        white-space: nowrap;
        margin: 0px;
        height: 40px;
        display: flex;
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 2px;
        transition: all 200ms;
        :hover {
          color: #000000;
        }
      }
      img {
        object-fit: cover;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .kind {
      width: fit-content;
      height: fit-content;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 0.9;
      padding: 4px;
      border-radius: 2px;
      text-transform: uppercase;
    }

    .time {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
      svg {
        box-sizing: content-box;
        height: 14px;
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        cursor: pointer;
        padding: 10px;
        border-radius: 2px;
        transition: all 200ms ease 0s;
        :hover {
          fill: black;
        }
      }
    }
  }

  .price {
    display: flex;
    gap: 4px;
    align-items: center;
    font-weight: 600;
    color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
    img {
      width: 14px;
    }
  }

  @media (max-width: 500px) {
    .header,
    .trx-row {
      grid-template-columns: repeat(7, 150px);
    }
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 50px 0;
  flex-direction: column;
  gap: 5rem;
  @media only screen and (max-width: 800px) {
    margin: 50px 20px;
  }
  .header {
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }
  .title-s {
    font-size: 20px;
    font-weight: 700;
    margin-top: 3rem;
    font-size: 40px;
    color: ${isDarkModeOn ? "#fff" : "black"};
  }
  .sub-title {
    color: gray;
    font-size: 20px;
  }
  .func {
    padding: 10px 30px;
    font-size: 18px;
    width: 80%;
    background: #282a3a;
    border-radius: 5px;
  }
  .text {
    color: white;
  }

  .sub-title {
    color: ${isDarkModeOn ? "#fff" : "black"};
    font-size: 25px;
    font-weight: 500;
  }
  .desc {
    color: ${isDarkModeOn ? "#B3B5BD" : "#404252"};
    font-size: 18px;
  }
`;

const Card = styled.a`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
  border-radius: 12px;
  background: ${isDarkModeOn ? "#1e2030" : "#ffffff"};
  box-shadow: ${isDarkModeOn ? "none" : "0px -2px 0px #dbdbdb inset"};
  border: ${isDarkModeOn ? "none" : "1px solid #dbdbdb"};
  margin-left: auto;
  margin-right: auto;
  position: relative;
  // height: 500px;
  transition: all 300ms;
  :hover {
    text-decoration: none;
    transform: translateY(-1rem);
  }
  .tab {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    text-decoration: none;
    gap: 0.2rem;
    border-radius: 0.25rem; /* Assuming default border radius */
    color: ${isDarkModeOn ? "#C5D0FF" : "#4F58A3"}; /* Ternary for text color */
    padding: 8px 12px; /* Assuming Tailwind CSS default spacing unit */
    font-size: 14px;
    line-height: 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Assuming Tailwind CSS default timing function and duration */
    white-space: nowrap;

    &:focus {
      outline: 2px solid transparent; /* Assuming Tailwind CSS default focus outline */
      outline-offset: 2px; /* Assuming Tailwind CSS default focus outline offset */
      box-shadow: 0 0 0 2px
        ${isDarkModeOn ? "rgba(59, 130, 246, 0.5)" : "rgba(66, 153, 225, 0.5)"}; /* Ternary for box-shadow */
      background-color: ${isDarkModeOn
        ? "rgba(59, 130, 246, 0.35)"
        : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
    }

    &:hover {
      background-color: ${isDarkModeOn
        ? "rgba(59, 130, 246, 0.15)"
        : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
    }

    cursor: pointer;
    @media (max-width: 768px) {
      padding: 12px;
      font-size: 12px;
      line-height: 14px;
    }
  }
`;

const HeaderContainer = styled.div`
  padding-left: 16px;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
`;

const backgroundStyleHeightPx = 168;

const BackgroundImageContainer = styled.div`
  img {
    position: absolute;
    width: 100%;
  }
  svg {
    position: absolute;
    top: ${backgroundStyleHeightPx / 2}px;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0; // Start with the image invisible
    transition: opacity 0.3s;
    z-index: 2; // Ensure the image is on top
    pointer-events: none;
  }
`;
const backgroundImageStyle = {
  objectFit: "cover",
  left: 0,
  top: 0,
  height: "168px",
  borderRadius: "6px 6px 0px 0px",
  pointerEvents: "none",
};

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 176px;
  padding: 16px 24px;
  gap: 16px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${isDarkModeOn ? "#ffffff" : "#2e2e2e"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${isDarkModeOn ? "#9699a2" : "#2e2e2e"};
  word-wrap: break-word;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 10px 0;
  margin-bottom: 20px;
`;

const LayoutFooter = styled.div`
  display: grid;
  margin-bottom: 5rem;
  margin-top: 5rem;
  //background:#F7EEDD;
  width: 100%;
  padding: 30px 50px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media screen and (max-width: 968px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 30px 10px;
  }
  gap: 2rem;
  .layoutLeft {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 90%;
    margin: 0 auto;
  }
  .layoutRight {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .title {
    color: #ff2424;
    font-weight: 700;
    font-size: 40px;
  }
`;

const TOP_AFFILIATES = [
  {
    id: 1,
    affiliate: "tradeport.near",
    amount: 83.412711,
    transactions: 5356,
    logo: "https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fprofile%252Fnew%252Ftradeport.jpg%3Falt%3Dmedia%26token%3D1c51884b-727c-49a2-aefb-a97b3be38eb1%26_gl%3D1*qa98n4*_ga*MTQ3OTczMDI4Mi4xNjg1NTM0NDQ3*_ga_CW55HF8NVT*MTY4NTUzNDQ0Ny4xLjEuMTY4NTUzNDYyNy4wLjAuMA..",
  },
  {
    id: 2,
    affiliate: "longice48.near",
    amount: 0.3125,
    transactions: 3,
  },
  {
    id: 3,
    affiliate: "marmaj.sputnik-dao.near",
    amount: 0.3125,
    transactions: 2,
  },
  {
    id: 4,
    affiliate: "jgold.near",
    amount: 0.225,
    transactions: 3,
  },
  {
    id: 5,
    affiliate: "islangrh.near",
    amount: 0.125,
    transactions: 1,
    logo: "https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fprofile%252Fislangrh.near%253Aprofile%3Falt%3Dmedia%26token%3D82d41876-6c7c-40bb-9dce-e388a3762dc2",
  },
  {
    id: 6,
    affiliate: "gorillaminter.near",
    amount: 0.0625,
    transactions: 5,
  },
  {
    id: 7,
    affiliate: "lehleh.near",
    amount: 0.05,
    transactions: 2,
    logo: "https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fprofile%252Flehleh.near%253Aprofile%3Falt%3Dmedia%26token%3D090b4a37-78db-48ba-b945-75fa0d07b1a5",
  },
];

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreib2cfbayerbbnoya6z4qcywnizqrbkzt5lbqe32whm2lubw3sywr4";

return (
  <>
    <Root>
      <LayoutFooter>
        <div className="layoutLeft">
          <div>
            <div className="sub-title">
              Earn Market Fees from Your Apps or Links
            </div>
            <div className="title">On-Chain Affiliate Program</div>
          </div>
          <div className="desc">
            Sell any NFT on NEAR by building markets in metaverses, wallets, or
            pro-trading DEX's. No need to get your own listings, simply add
            "affiliate_id" to your buy function.
          </div>
          <div>
            <Link
              to={`https://blog.mintbase.xyz/mintbase-launches-affiliatedirect-where-anyone-can-sell-anything-on-near-347c6f19c76b`}
              target="_blank"
            >
              <Widget
                src={`${config_account}/widget/Mintbase.MbButton`}
                props={{
                  label: "Read More",
                  btnType: "primary",
                  size: "medium",
                  state: "active",
                  onClick: () => {},
                  isDarkModeOn,
                }}
              />
            </Link>
          </div>
        </div>
        <div className="layoutRight">
          <img
            src={
              isDarkModeOn
                ? "https://www.mintbase.xyz/_next/image?url=%2Ficons%2Faffiliatedirect-mintbase-dark.svg&w=1200&q=75"
                : "https://www.mintbase.xyz/_next/image?url=%2Ficons%2Faffiliatedirect-mintbase-light.svg&w=1200&q=75"
            }
            alt="image"
          />
        </div>
      </LayoutFooter>
      <div className="func">
        <span className="text">
          function{" "}
          <strong style={{ color: "#f9e24b", fontWeight: 500 }}>buy</strong>
          (nft_contract_id: string, token_id: string, affiliate_id: string){" "}
        </span>
      </div>
      <div className="header">
        <h1 className="title-s">Top Affiliate</h1>
        <span className="desc">
          Build Better Markets! This is the real future of NFTs.
        </span>
      </div>
      <ContainerTable>
        <div className="header">
          <div className="item1"> </div>
          <div className="item2">Affiliate</div>
          <div className="item3">Amount Earned</div>
          <div className="item4">Transactions</div>
        </div>
        <div>
          {TOP_AFFILIATES.map((activity, index) => (
            <div className="trx-row" key={index}>
              <div className="item1">
                <span>{activity.id}</span>
              </div>
              <div className="item2">
                <a
                  href={`/bos.genadrop.near/widget/Mintbase.App.Index?page=human&tab=owned&accountId=${activity.affiliate}`}
                  target="_blank"
                  className="title"
                >
                  {" "}
                  <img
                    src={
                      activity.logo ||
                      "https://www.mintbase.xyz/images/user-light.png"
                    }
                    alt={"logo"}
                    className="afi-logo"
                  />
                  <div>{activity.affiliate}</div>
                </a>
              </div>

              <div className="item3">
                <div className="price">
                  {activity.amount || "-"}
                  <img src={nearLogo} alt="NEAR" />
                </div>
              </div>
              <div className="item4">{activity.transactions || "-"}</div>
            </div>
          ))}
        </div>
      </ContainerTable>
    </Root>
    <Container>
      <div className="header">
        <div className="title-s">Deploy Your Own Your Market in Minutes</div>
        <div className="desc">
          Add as many NEAR NFT smart contracts to your own market and earn a
          1.25% market fee when selling
        </div>
        <div className="desc">
          their NFTs via your metaverse, e-commerce, influencer program, or
          social platforms.
        </div>
      </div>
      <div className="content">
        <Card>
          <HeaderContainer>
            <BackgroundImageContainer>
              <img
                style={backgroundImageStyle}
                src="https://www.mintbase.xyz/images/template-market.jpg"
                alt="background"
              />
            </BackgroundImageContainer>
          </HeaderContainer>
          <Info>
            <Title>Basic Market</Title>
            <SubTitle>
              Pick as many stores as you want that have already listed NFTs and
              sell them in your own creative ways directly to your community and
              instantly get helf the Mintbase market fee.
            </SubTitle>
          </Info>
          <Footer>
            <Link
              to={`https://templates.mintbase.xyz/templates/marketplace`}
              target="_blank"
            >
              <Widget
                src={`${config_account}/widget/Mintbase.MbButton`}
                props={{
                  label: "Template",
                  btnType: "secondary",
                  size: "medium",
                  state: "active",
                  isDarkModeOn,
                }}
              />
            </Link>
            <Link
              to={`https://marketplace-template.mintbase.xyz`}
              target="_blank"
              className="tab"
            >
              Live Example
            </Link>
          </Footer>
        </Card>
        <Card>
          <HeaderContainer>
            <BackgroundImageContainer>
              <img
                style={backgroundImageStyle}
                src="https://www.mintbase.xyz/images/template-mint.jpg"
                alt="background"
              />
            </BackgroundImageContainer>
          </HeaderContainer>
          <Info>
            <Title>Basic Market</Title>
            <SubTitle>
              Pick as many stores as you want that have already listed NFTs and
              sell them in your own creative ways directly to your community and
              instantly get helf the Mintbase market fee.
            </SubTitle>
          </Info>
          <Footer>
            <Link
              to={`https://templates.mintbase.xyz/templates/ai-minter`}
              target="_blank"
            >
              <Widget
                src={`${config_account}/widget/Mintbase.MbButton`}
                props={{
                  label: "Template",
                  btnType: "secondary",
                  size: "medium",
                  state: "active",
                  isDarkModeOn,
                }}
              />
            </Link>
            <Link
              to={`https://ai-minter.mintbase.xyz`}
              target="_blank"
              className="tab"
            >
              Live Example
            </Link>
          </Footer>
        </Card>
        <Card>
          <HeaderContainer>
            <BackgroundImageContainer>
              <img
                style={backgroundImageStyle}
                src="https://www.mintbase.xyz/images/templates-overview.jpg"
                alt="background"
              />
            </BackgroundImageContainer>
          </HeaderContainer>
          <Info>
            <Title>Video Explainer</Title>
            <SubTitle>
              Learn how to deploy a custom marketplace with a built-in business
              model in a quick video with our co-founder Nate Geier
            </SubTitle>
          </Info>
          <Footer>
            <Link
              to={`https://www.loom.com/share/d5a038fb341c40be9ae131dd82f199a8?sid=820f7021-1b6c-43e6-8dc6-f2fa40d73db8`}
              target="_blank"
            >
              <Widget
                src={`${config_account}/widget/Mintbase.MbButton`}
                props={{
                  label: "Watch",
                  btnType: "secondary",
                  size: "medium",
                  state: "active",
                  isDarkModeOn,
                }}
              />
            </Link>
          </Footer>
        </Card>
      </div>
    </Container>
  </>
);
