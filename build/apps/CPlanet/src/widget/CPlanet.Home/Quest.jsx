const Root = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    color: #000;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 64px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  p {
    color: #b0b0b0;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 131.3%; /* 31.512px */
  }
  h3 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 128px;
    font-style: italic;
    font-weight: 200;
    line-height: normal;
    letter-spacing: 12.8px;
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 44px;
    }
    p {
      font-size: 18px;
    }
    h3 {
      font-size: 55px;
    }
  }
  @media (max-width: 450px) {
    h1 {
      font-size: 33px;
    }
    p {
      font-size: 16px;
    }
    h3 {
      font-size: 35px;
    }
  }
  .dropfund {
    img {
      width: 100%;
    }
  }
`;
const Portal = styled.div`
  margin-bottom: 30px;
  h2 {
    color: #000;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 64px;
    margin-top: 69px;
    font-style: normal;
    font-weight: 500;
    span {
      font-style: italic;
    }
  }
  .join {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 600px) {
    h2 {
      font-size: 30px;
    }
  }
`;
return (
  <Root>
    <h1>Explore our Quests</h1>
    <p>
      Complete on chain quests to get deeper into the Creatives Constellation
    </p>
    <h3>Coming Soon</h3>
    <div className="dropfund">
      <img src="https://ipfs.near.social/ipfs/bafybeigxh5ey3x5x37egpi46obkedid2jhh5miqaetrxeftvxst6xr27oa" />
    </div>
    <Portal>
      <h2>
        The Portal for Creatives in the <br />
        <span>NEAR</span> Ecosystem
      </h2>
      <div className="join">
        <Widget
          props={{
            href: "https://creativesdao.org/funding",
            isBlank: "_blank",
          }}
          src="agwaze.near/widget/CPlanet.Button.ArrowButton"
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
    </Portal>
  </Root>
);
