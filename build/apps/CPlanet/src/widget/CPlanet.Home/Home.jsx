const Root = styled.div`
  .hero {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 0px;
    height: 400px;
    margin: 0 0 0 34px;
    .text:first-letter {
      color: #fff;
      font-family: Helvetica Neue;
      font-size: 80px;
      font-style: italic;
      font-weight: 200;
      line-height: normal;
    }
    .text {
      color: #fff;
      font-family: Helvetica Neue;
      font-size: 80px;
      font-style: normal;
      text-align: right;
      font-weight: 400;
      line-height: normal;
    }
    @media only screen and (max-width: 900px) {
      .text,
      .text:first-letter {
        font-size: 65px;
      }
    }
    @media only screen and (max-width: 500px) {
      margin: 0 auto;
      height: 500px;
      .text,
      .text:first-letter {
        font-size: 50px;
      }
    }
  }
`;
const Portals = styled.div`
  width: 75%;
  margin: 24px 0;
  padding: 0 34px;
  h1 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 44px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 20px;
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    button {
      font-size: 10px !important;
    }
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
    // padding: 0 16px;
    h1 {
      text-align: center;
      font-size: 16px;
    }
    .buttons {
      justify-content: center;
    }
  }
`;
const Figures = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap-wrap;
    width: 100%;
      border-top: 1px solid #CDCDCD;
      border-bottom: 1px solid #CDCDCD;
      background: #F8F8F8;
    div {
      min-width: max-content;
      padding: 35px 55px;
      border-right: 1px solid #CDCDCD;
    }
    div:last-child {
    border-right: none;
    }
    h1 {
      color: #000;
      font-family: Helvetica Neue;
      font-size: 55px;
      font-style: normal;
      font-weight: 700;
      line-height: 118.5%; /* 75.84px */
    }
    span {
      color: #808080;
      font-family: Helvetica Neue;
      font-size: 24px;
      font-style: italic;
      font-weight: 200;
      line-height: 120%; /* 28.8px */
    }
    @media only screen and (max-width: 600px) {
     flex-direction: column;
     div {
      border-right: none;
      border-bottom: 1px solid #CDCDCD;
      width: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
     }
    }
`;
const CTA = styled.div`
  margin-top: 120px;
  margin-left: 40px;
  @media (max-width: 500px) {
    margin-top: 30px;
  }
  img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 50%;
    animation: rotateImage 5s linear infinite;
  }
  img:hover {
    animation-play-state: paused;
  }
  @keyframes rotateImage {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @media (max-width: 500px) {
    margin-top: 150px;
    img {
      width: 150px;
      height: 150px;
    }
  }
`;
return (
  <Root>
    <div
      className="hero"
      style={{
        backgroundImage: `url("https://ipfs.near.social/ipfs/bafkreicyp6dvoorfcavir27knzieosjjwaslbam73an4ciscx6opbs4wsm")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CTA>
        <img src="https://ipfs.near.social/ipfs/bafkreigfo5h24ketdgtfwxmb3wrj6zif2bfpw4yb323t2chbk2x6oa75ga" />
      </CTA>
      <h1 className="text">CPLANET</h1>
    </div>
    <Portals>
      <h1>The Portal for Creatives in the NEAR Ecosystem</h1>
      <div className="buttons">
        <Widget
          src="agwaze.near/widget/CPlanet.Button.ArrowButton"
          props={{
            href: "https://creativesdao.org/funding",
            isBlank: "_blank",
          }}
        />
        <Widget
          src="agwaze.near/widget/CPlanet.Button.ArrowButton"
          props={{
            whiteBg: true,
            text: "Join Now",
            href: "https://creativesdao.org/join",
            isBlank: "_blank",
          }}
        />
      </div>
    </Portals>
    <Figures>
      <div className="amount">
        <h1>50k</h1>
        <span>NFTS Minted</span>
      </div>
      <div className="amount">
        <h1>$56k</h1>
        <span>Amount of USDC in Treasury</span>
      </div>
      <div className="amount">
        <h1>25 Countries</h1>
        <span>With Active Creative Communites</span>
      </div>
      <div className="amount">
        <h1>70</h1>
        <span>Active DAOs</span>
      </div>
    </Figures>
    <Widget src="bos.genadrop.near/widget/CPlanet.Home.Partners" />
    <Widget
      src="bos.genadrop.near/widget/CPlanet.Home.NFTs"
      props={{ update: props.update, isGateway: props.isGateway }}
    />
    <Widget src="bos.genadrop.near/widget/CPlanet.Home.Quest" />
  </Root>
);
