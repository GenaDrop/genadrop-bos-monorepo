const { getInputLabelFontType, getFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);
const NearIcon = (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 18 18"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-white dark:text-undefined"
  >
    <path
      d="M5.10976 4.05615C5.47596 4.05615 5.81596 4.24601 6.00779 4.55812L8.07455 7.62657C8.14188 7.7277 8.11455 7.86404 8.01343 7.93136C7.93145 7.98601 7.823 7.97925 7.74835 7.91502L5.71399 6.15052C5.68019 6.1201 5.62807 6.12319 5.59765 6.157C5.58385 6.17249 5.57652 6.19249 5.57652 6.21305V11.7376C5.57652 11.7832 5.61343 11.8198 5.65906 11.8198C5.68357 11.8198 5.70667 11.8091 5.72216 11.7902L11.8717 4.42911C12.072 4.19277 12.3661 4.05643 12.6757 4.05615H12.8906C13.4723 4.05615 13.9438 4.5277 13.9438 5.10939V12.8902C13.9438 13.4719 13.4723 13.9435 12.8906 13.9435C12.5244 13.9435 12.1844 13.7536 11.9926 13.4415L9.92582 10.3731C9.8585 10.2719 9.88582 10.1356 9.98695 10.0683C10.0689 10.0136 10.1774 10.0204 10.252 10.0846L12.2864 11.8491C12.3202 11.8795 12.3723 11.8764 12.4027 11.8426C12.4165 11.8271 12.4238 11.8071 12.4236 11.7866V6.26066C12.4236 6.21503 12.3867 6.17841 12.341 6.17841C12.3168 6.17841 12.2934 6.18911 12.2779 6.20798L6.1292 13.5705C5.92892 13.8069 5.63483 13.9432 5.32526 13.9435H5.11033C4.52864 13.9438 4.05681 13.4725 4.05624 12.8908V5.10939C4.05624 4.5277 4.52779 4.05615 5.10948 4.05615H5.10976Z"
      fill="currentColor"
    ></path>
  </svg>
);
const FeaturedCard = styled.div`
  border-radius: 0.25rem; /* rounded */
  background-color: ${(props) => (props.isDarkModeOn ? "#1f2130" : "#fff")};
  padding: 12px; /* p-12 */
  max-height: 600px;
  height: 357px;
  width: 418px;
  border: 0 solid;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 30px;
  @media (min-width: 768px) {
    padding: 24px; /* md:p-24 */
  }
  .head {
    display: flex;
    align-items: center;
    h1 {
      ${getInputLabelFontType("big")}
      font-weight: bold;
      margin-right: 4px;
      color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
      font-size: 20px !important;
      text-wrap: wrap;
    }
    img {
      width: 50px;
      height: 60px;
      object-fit: cover;
      margin-right: 10px;
      border-radius: 4px;
    }
  }
  .stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .stat {
      padding: 12px;
      width: 179px;
      background-color: ${(props) =>
        props.isDarkModeOn ? "#272a3a" : "#f9f9f9"};
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 72px;
      span {
        ${getInputLabelFontType("medium")}
        color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
      }
      p {
        margin-top: 20px;
        ${getInputLabelFontType("big")}
        color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
      }
    }
  }
  .cards {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  @media (max-width: 500px) {
    width: 95%;
    height: max-content;
    .head {
      h1 {
        font-size: 17px !important;
      }
    }
    .cards {
      gap: 2px !important;
    }
  }
`;
const NFTCard = styled.div`
  width: 115px;
  height: 115px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  background-image: ${(props) => `url(${props.bgImage})`};
  .amount {
    background: #000;
    border-radius: 4px;
    min-width: 50px;
    text-align: center;
    padding: 6px;
    margin-bottom: 7px;
    span {
      color: #fff;
      font-weight: 600;
      ${getInputLabelFontType("big")}
    }
  }
  @media (max-width: 500px) {
    width: 73px;
    height: 73px;
  }
`;
const imgAddr =
  "https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fstore%252Fjwneartokens.mintbase1.near%253Aprofile%3Falt%3Dmedia%26token%3D317d2381-d578-491e-879d-7b33d7c766f5";
const YoctoToNear = (amountYocto) => {
  return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
};
const MbFeaturedCard = ({
  totalOwners,
  listings,
  totalMinted,
  image,
  title,
  isDarkModeOn,
}) => {
  return (
    <FeaturedCard isDarkModeOn={isDarkModeOn}>
      <div className="head">
        <img
          src={image ?? "https://www.mintbase.xyz/images/store-light.png"}
          alt=""
        />
        <h1>{title ?? "-- NO TITLE --"}</h1>
      </div>
      <div className="stats">
        <div className="stat">
          <span>Total Minted</span>
          <p>{totalMinted ?? "0"}</p>
        </div>
        <div className="stat">
          <span>Owners</span>
          <p>{totalOwners ?? "0"}</p>
        </div>
      </div>
      <div className="cards">
        {listings?.length > 0 &&
          listings?.map((data) => (
            <NFTCard
              bgImage={`https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=${data.media}`}
            >
              <div className="amount">
                <span>{YoctoToNear(data.price)}</span>
                {NearIcon}
              </div>
            </NFTCard>
          ))}
      </div>
    </FeaturedCard>
  );
};
return { MbFeaturedCard };
