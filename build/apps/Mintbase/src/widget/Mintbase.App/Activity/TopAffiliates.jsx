const { isDarkModeOn } = props;
const accountId = props.accountId ?? "bos.genadrop.near";
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
  .pagination {
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
      justify-content: flex-end;
    }
  }
  .title {
    font-size: 20px;
    font-weight: 700;
    margin-top: 3rem;
  }
`;
const ContainerTable = styled.div`
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  display: flex;
  flex-direction: column;
  overflow-x: scroll; /* Prevent horizontal overflow */
  margin: 10px;
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
    color: ${isDarkModeOn ? "#4B5563" : "black"};
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
  .header {
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  .des {
    font-size: 17px;
  }
  .content {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }
`;
const Card = styled.a`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: white;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border: 1px solid #dbdbdb;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  // height: 500px;
  transition: all 300ms;
  :hover {
    text-decoration: none;
    transform: translateY(-1rem);
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
  color: #2e2e2e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
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
const Button = styled.div`
  border: 1px solid gray;
  padding: 5px 20px;
  color: #000000;
  cursor: pointer;
  :hover {
    background: #e7e7e7;
  }
`;
return (
  <>
    <Root>
      <div className="title">Top Affiliate Independent Markets</div>
      <ContainerTable>
        <div className="header">
          <div className="item1"> </div>
          <div className="item2">Affiliate</div>
          <div className="item3">Amount Earned</div>
          <div className="item4">Transactions</div>
        </div>
        <div>
          <div className="trx-row">
            <div className="item1">
              <span>1</span>
            </div>
            <div className="item2">
              <a href={"#"} target="_blank" className="title">
                {" "}
                <img
                  src={
                    "https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fprofile%252Fnew%252Ftradeport.jpg%3Falt%3Dmedia%26token%3D1c51884b-727c-49a2-aefb-a97b3be38eb1%26_gl%3D1*qa98n4*_ga*MTQ3OTczMDI4Mi4xNjg1NTM0NDQ3*_ga_CW55HF8NVT*MTY4NTUzNDQ0Ny4xLjEuMTY4NTUzNDYyNy4wLjAuMA.."
                  }
                  alt={"logo"}
                />
                <div>magicbuild.near</div>
              </a>
            </div>

            <div className="item3">
              {" "}
              {true ? (
                <div className="price">
                  {YoctoToNear(activity.price)}
                  <img src={nearLogo} alt="NEAR" />
                </div>
              ) : (
                <div className="price">-</div>
              )}{" "}
            </div>
            <div className="item4">32000</div>
          </div>
        </div>
      </ContainerTable>
    </Root>
    <Container>
      <div className="header">
        <div className="title">Deploy Your Own Your Market in Minutes</div>
        <div className="des">
          Add as many NEAR NFT smart contracts to your own market and earn a
          1.25% market fee when selling
        </div>
        <div className="des">
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
            <Button>Template</Button>
            <Button style={{ border: "none" }}>Live Example</Button>
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
            <Button>Template</Button>
            <Button style={{ border: "none" }}>Live Example</Button>
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
            <Title>Basic Market</Title>
            <SubTitle>
              Pick as many stores as you want that have already listed NFTs and
              sell them in your own creative ways directly to your community and
              instantly get helf the Mintbase market fee.
            </SubTitle>
          </Info>
          <Footer>
            <Button>Template</Button>
            <Button style={{ border: "none" }}>Live Example</Button>
          </Footer>
        </Card>
      </div>
    </Container>
  </>
);
