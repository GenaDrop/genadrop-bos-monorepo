const { isDarkModeOn, image, title, profileImage, owner } = props;
const FeaturedCard = styled.div`
  width: 600px;
  height: 299px;
  background: ${isDarkModeOn ? "#1f2130" : "#fff"};
  display: flex;
  flex-direction: column;
  .image {
    width: 100%;
    height: 145px;
    img {
      width: 100%;
    }
  }
  .content {
    height: 100px;
    position: relative;
    display: flex;
    h1 {
      font-size: 20px;
      align-self: center;
      margin-top: 55px;
      font-weight: bold;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      margin-left: 150px;
    }
    .topImage {
      position: absolute;
      top: 0;
      left: 4%;
      img {
        width: 106px;
        height: 106px;
        border: 1px solid ${isDarkModeOn ? "#1f2130" : "#fff"};
        object-fit: cover;
      }
    }
  }
`;
return (
  <FeaturedCard>
    <div className="image">
      <img
        src={image || "https://www.mintbase.xyz/images/store-header-light.png"}
        alt="image"
      />
    </div>
    <div className="content">
      <div className="topImage">
        <img
          src={
            profileImage || "https://www.mintbase.xyz/images/store-light.png"
          }
        />
      </div>
      <h1>{owner || "mutart.mintbase1.near"}</h1>
    </div>
  </FeaturedCard>
);
