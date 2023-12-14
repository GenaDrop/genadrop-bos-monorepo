const Wrapper = styled.div`
  background-color: var(--brand-warm-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navigation = styled.div`
  align-self: start;
  display: flex;
  align-items: center;
  gap: 5px;
  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  color: var(--brand-warm-dark-text);
  align-items: center;
  border-radius: 50%;
  background-color: var(--brand-warm-accent);
  height: 32px;
  padding: 0 10px;
  cursor: pointer;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Date = styled.div`
  justify-content: center;
  color: var(--brand-warm-light-text);
  flex-grow: 1;
  white-space: nowrap;
  margin: auto 0;
  font: 700 15px/27px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const ImageContainer = styled.div`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 100%;
  overflow: hidden;
  margin-top: 16px;
  img {
    width: 100%;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 34px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--brand-warm-dark-text);
  margin-top: 27px;
  margin-right: auto;
  font-family: "Londrina Solid", sans-serif;
  font-size: 68px;
  font-weight: 600;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
    line-height: 54px;
  }
`;

const BidWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  width: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const BidContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  white-space: nowrap;
  @media (max-width: 991px) {
    padding-right: 20px;
  }
`;

const BidLabel = styled.div`
  color: var(--brand-warm-light-text);
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
`;

const BidValue = styled.div`
  color: var(--brand-warm-dark-text);
  margin-top: 8px;
  font-weight: 700;
  font-size: 29px;
`;

const MintContainer = styled.div`
  display: flex;
  align-items: start;
  gap: 8px;
`;

const LazyImage = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
  overflow: hidden;
  max-width: 100%;
`;

const MintLink = styled.a`
  display: flex;
  align-items: center;
  color: #5f5f5f;
  width: 100%;
  text-align: start;
  font-size: 15px;
  line-height: 24px;
  svg {
    height: 1em;
    margin-right: 4px;
    opacity: 0.6;
    margin-bottom: -0.1em;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
`;

const AuctionLabel = styled.div`
  color: #79809c;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 11px;

  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const TimeSegment = styled.div`
  color: #151c3b;
  align-self: start;
  font-weight: 700;
  white-space: nowrap;
  font-size: 29px;
  line-height: 32px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 100%;
  background: var(--brand-warm-dark-text);
  margin: 0 20px;
`;

const Container = styled.div`
  align-self: stretch;
  display: flex;
  margin-top: 19px;
  justify-content: space-between;
  gap: 9px;

  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const BidAmount = styled.input`
  justify-content: center;
  color: #79809c;
  white-space: nowrap;
  border-radius: 12px;
  background-color: #fff;
  flex-grow: 1;
  align-items: start;
  padding: 18px 60px 18px 15px;
  font: 700 23px/38px Inter, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
    padding-right: 20px;
  }
`;

const BidButton = styled.button`
  justify-content: center;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  border-radius: 12px;
  background-color: #808080;
  align-self: center;
  margin: auto 0;
  padding: 18px;
  font: 700 18px/29px Inter, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

return (
  <Wrapper>
    <Grid>
      <div>
        <ImageContainer>
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4453aee8fd1d971c2c584f9a207b364101818f872408a39ca62bfd3a44c9df8c?apiKey=1049abc3c3594b2d906ee110a2fe4523&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4453aee8fd1d971c2c584f9a207b364101818f872408a39ca62bfd3a44c9df8c?apiKey=1049abc3c3594b2d906ee110a2fe4523&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4453aee8fd1d971c2c584f9a207b364101818f872408a39ca62bfd3a44c9df8c?apiKey=1049abc3c3594b2d906ee110a2fe4523&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4453aee8fd1d971c2c584f9a207b364101818f872408a39ca62bfd3a44c9df8c?apiKey=1049abc3c3594b2d906ee110a2fe4523&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4453aee8fd1d971c2c584f9a207b364101818f872408a39ca62bfd3a44c9df8c?apiKey=1049abc3c3594b2d906ee110a2fe4523&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4453aee8fd1d971c2c584f9a207b364101818f872408a39ca62bfd3a44c9df8c?apiKey=1049abc3c3594b2d906ee110a2fe4523&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4453aee8fd1d971c2c584f9a207b364101818f872408a39ca62bfd3a44c9df8c?apiKey=1049abc3c3594b2d906ee110a2fe4523&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4453aee8fd1d971c2c584f9a207b364101818f872408a39ca62bfd3a44c9df8c?apiKey=1049abc3c3594b2d906ee110a2fe4523&"
          />
        </ImageContainer>
      </div>
      <Details>
        <Navigation>
          <Arrow>←</Arrow>
          <Arrow>→</Arrow>
          <Date>December 12, 2023</Date>
        </Navigation>
        <Title>Noun 944</Title>
        <BidWrapper>
          <BidContainer>
            <BidLabel>Current bid</BidLabel>
            <BidValue>Ξ 0.03</BidValue>
          </BidContainer>
          <VerticalLine />
          <BidContainer>
            <BidLabel>Auction ends in</BidLabel>
            <BidValue>12:15:59 AM</BidValue>
          </BidContainer>
        </BidWrapper>
        <MintLink href="https://fomonouns.wtf/" target="_blank">
          <svg
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
            ></path>
          </svg>
          Help mint the next Noun
        </MintLink>
        <Container>
          <BidAmount type="text" placeholder="Ξ 0.01 or more" />
          <BidButton type="text" onClick={handleBid}>
            Place bid
          </BidButton>
        </Container>
      </Details>
    </Grid>
  </Wrapper>
);
