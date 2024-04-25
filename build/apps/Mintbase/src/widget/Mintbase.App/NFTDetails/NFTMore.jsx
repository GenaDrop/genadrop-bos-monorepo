const { isDarkModeOn, dataNFT } = props;
const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin: 30px 0;
`;
const Bottom = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
const Card = styled.a`
  text-decoration: none;
  transition-duration: 0.5s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: ${isDarkModeOn ? "rgb(30, 32, 48)" : "#f6f5f4"};
  border-radius: 0.25rem;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  height: 470px;
  :hover {
    scale: 1;
    transition: all;
    transition-duration: 0.5s;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .header {
    width: 100%;
    height: 350px;
    border-radius: 0.25rem;
    padding-top: 35px;
    overflow: hidden;
    position: relative;
  }
  .layout-image {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
  .img {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .image {
    osition: absolute;
    height: 100%;
    width: 100%;
    inset: 0px;
    object-fit: contain;
    color: transparent;
    object-fit: cover !important;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: -10px;
  padding: 20px;
  .text {
    margin-top: 10px;
    font-size: 17px;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
  }

  .sub-text {
    color: ${isDarkModeOn ? "rgb(90, 91, 104)" : "#86868a"};
  }
  .desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text-s {
      color: ${isDarkModeOn ? "#ffffff" : "#000000"};
    }
  }
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 30px;
  margin-top: 3rem;
  color: ${isDarkModeOn ? "#ffffff" : "#000000"};
  .button {
    padding: 5px 20px;
    background: none;
    border-radius: 5px;
    outline: none;
    width: 200px;
    border: 1px solid gray;
    :hover {
      background: #e6e6e7;
    }
  }
`;
return (
  <div style={{ marginBottom: "5rem", marginTop: "3rem" }}>
    <Title>More from this contract</Title>
    <Bottom>
      {dataNFT &&
        dataNFT.map((dt, index) => (
          <Card
            href={`https://www.mintbase.xyz/meta/${dt.token.metadata_id}`}
            target="_blank"
            className="text-decoration-none"
            key={index}
          >
            <Header>
              <div className="header">
                <div className="layout-image">
                  <div className="img">
                    <img className="image" src={dt.media} alt="NFT" />
                  </div>
                </div>
              </div>
            </Header>
            <Container>
              <div>
                <small className="sub-text">{dt.nft_contract_id}</small>
                <div className="text">{dt.title}</div>
              </div>
              <div className="desc">
                <div>
                  <img
                    height={"24px"}
                    src="https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fprofile%252Fnearmedianft.near%253Aprofile%3Falt%3Dmedia%26token%3D696a6c76-1c87-4cb4-93f5-b6f58296a730"
                    alt="logo"
                  />
                </div>
                <small className="text-s">
                  {dt.listed_by ? "1/1" : "Not Listed"}
                </small>
              </div>
            </Container>
          </Card>
        ))}
    </Bottom>
    <Footer>
      <a
        href={`https://www.mintbase.xyz/contract/${dataNFT[0].nft_contract_id}/nfts/all/0`}
        target="_blank"
        style={{ color: "black" }}
        className="button d-flex text-align-center justify-content-center text-decoration-none"
      >
        See Contract
      </a>
      <a
        href={`https://nearblocks.io/address/${dataNFT[0].nft_contract_id}`}
        className="button d-flex text-align-center justify-content-center text-decoration-none"
        target="_blank"
        style={{ border: "none", color: "black" }}
      >
        Explorer
        <svg
          viewBox="0 0 512 512"
          width={20}
          height={20}
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: "5px" }}
        >
          <path d="m432 320h-32a16 16 0 0 0 -16 16v112h-320v-320h144a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16h-160a48 48 0 0 0 -48 48v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-128a16 16 0 0 0 -16-16zm56-320h-128c-21.37 0-32.05 25.91-17 41l35.73 35.73-243.73 243.64a24 24 0 0 0 0 34l22.67 22.63a24 24 0 0 0 34 0l243.61-243.68 35.72 35.68c15 15 41 4.5 41-17v-128a24 24 0 0 0 -24-24z" />
        </svg>
      </a>
    </Footer>
  </div>
);
