const accountId = props.accountId ?? "bos.genadrop.near";
const { getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);
const { isDarkModeOn } = props;
const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};
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
const rightArrow = (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-white dark:text-black"
  >
    <g clip-path="url(#clip0_2025_39245)">
      <path
        d="M12.0001 4.00003L10.5901 5.41003L16.1701 11L4.00006 11L4.00006 13L16.1701 13L10.5801 18.58L12.0001 20L20.0001 12L12.0001 4.00003Z"
        fill="currentColor"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_2025_39245">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(24) rotate(90)"
        ></rect>
      </clipPath>
    </defs>
  </svg>
);
const Home = styled.div``;
const Hero = styled.div`
  display: flex; /* flex */
  flex-direction: column;
  position: relative;
  width: 100%; /* w-full */
  justify-content: center;
  height: ${context.accountId ? "" : "75vh"};
  align-items: center;
  @media (min-width: 768px) {
    padding-bottom: 7rem; /* md:pb-28 */
  }
  @media (min-width: 1280px) {
  }
  @media (min-width: 1600px) {
  }
  justify-content: center; /* justify-center */
  .hero {
    display: flex; /* flex */
    flex-direction: column; /* flex-col */
    z-index: 1; /* z-30 */
    gap: 24px; /* gap-24 */
    align-items: center; /* items-center */
    text-align: center; /* text-center */
    padding: 16px; /* p-16 */
    width: 100%;
    h1 {
      color: #e087ff;
      font-size: 48px;
      line-height: 50px;
    }
    .subText {
      font-size: 24px; /* h2-90 */
      color: #cad0d8;
      font-weight: bold;
      text-align: center; /* text-center */
      max-width: 976px; /* max-w-screen-lg */
      z-index: 1; /* z-10 */
    }
  }
  .card {
    height: 100%; /* h-full */
    cursor: pointer; /* cursor-pointer */
    padding: 16px; /* p-24 */
    color: #d1d5db; /* text-purple-100 */
    background-color: rgba(12, 18, 33, 0.6); /* bg-opacity-50 */
    min-width: 169px;
    z-index: 1; /* z-30 */
    transition: 0.5s ease-in-out;
    border-radius: 8px; /* rounded */
    color: #e087ff;
    &:hover {
      background-color: rgb(12, 18, 33); /* hover:bg-mb-blackblue */
    }
    .innerCard {
      text-align: center; /* text-center */
      word-break: break-word; /* break-words */
      vertical-align: middle; /* align-middle */
      backdrop-filter: blur(50px);
      text-align: center; /* align-text-center */
      .cardText {
        ${getInputLabelFontType("big")}
        font-weight: bold;
        padding-right: 24px; /* pr-24 */
        padding-left: 24px; /* pl-24 */
      }
    }
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(4, 200px);
    grid-gap: 10px;
    margin-top: 20px;
    margin-bottom: 70px;
    a {
      text-decoration: none;
    }
  }
  .featuredCards {
    position: absolute;
    top: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  @media (max-width: 500px) {
    .hero {
      h1 {
        font-size: 35px;
      }
      .subText {
        font-size: 20px;
      }
    }
    .cards {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
const Routes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 40px;
  .route {
    text-decoration: none;
    color: #4f59a2;
    height: max-content !important;
    padding: 10px;
    border-radius: 8px;
    transition: 0.5s ease-in-out;
    &:hover {
      background: #fff;
    }
  }
  @media (max-width: 500px) {
    overflow-x: scroll;
  }
`;
const Table = styled.div``;
const Gallery = styled.div`
  position: absolute;
  top: 80%;
  max-width: 1300px;
  display: flex;
  margin: 1rem auto;
  align-items: center;
  .arrow-l {
    rotate: 180deg;
  }
  .arrow-r,
  .arrow-l {
    cursor: pointer;
    border-radius: 50%;
    padding: 8px 10px 10px 10px;
    border: 1px solid black;
    background: black;
    svg {
      padding: 0;
      margin: 0;
    }
  }
  .slider-display {
    position: relative;
    width: 210rem;
    height: 357px;
    overflow: hidden;
    @media only screen and (max-width: 927px) {
      width: 32rem;
    }
    @media only screen and (max-width: 627px) {
      width: 20rem;
    }
  }
  .slider-track {
    transition: all 300ms ease;
    position: absolute;
    display: flex;
    gap: 2rem;
    justify-content: center;
    .nft-card {
      width: 15rem;
      height: 15rem;
      border-radius: 10px;
      overflow: hidden;
      img {
        transition: all 300ms ease-in-out;
      }
      :hover img {
        scale: 1.1;
      }
    }
  }
  @media (max-width: 500px) {
    top: 100%;
  }
`;
const FeaturedCard = styled.div`
  border-radius: 0.25rem; /* rounded */
  background-color: ${isDarkModeOn ? "#1f2130" : "#fff"};
  padding: 12px; /* p-12 */
  max-height: 600px;
  height: 357px;
  width: 418px;
  border: 0 solid;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
  a {
    text-decoration: none;
  }
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
      color: ${isDarkModeOn ? "#fff" : "#000"};
      font-size: 20px !important;
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
      background-color: ${isDarkModeOn ? "#272a3a" : "#f9f9f9"};
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 72px;
      span {
        ${getInputLabelFontType("medium")}
        color: ${isDarkModeOn ? "#fff" : "#000"};
      }
      p {
        margin-top: 20px;
        ${getInputLabelFontType("big")}
        color: ${isDarkModeOn ? "#fff" : "#000"};
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
    width: 269px;
    height: 269px;
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
  background-size: cover;
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
const size = "100%";
const [page, setPage] = useState(0);
const [featuredNFTs, setFeaturedNFTs] = useState([]);
function fetchNFTDetails() {
  asyncFetch("https://api.mintbase.xyz/explore", {
    method: "GET",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
  }).then((data) => {
    if (data.body) {
      const parsedData = JSON.parse(data.body);
      setFeaturedNFTs(Object.values(parsedData?.Featured));
    }
  });
}
useEffect(() => {
  fetchNFTDetails();
}, []);
const HandleUpSlide = () => {
  if (page < featuredNFTs.length - 1) {
    setPage(page + 1);
  } else {
    setPage(0);
  }
};
const HandleDownSlide = () => {
  if (page > 0) {
    setPage(page - 1);
  } else {
    setPage(featuredNFTs.length - 1);
  }
};
const cardItems = [
  { name: "Developers", link: "https://templates.mintbase.xyz/" },
  { name: "Creator Drop", link: "https://wallet.mintbase.xyz/create-drop" },
  { name: "Market", tab: "markets" },
  {
    name: "Mint with AI",
    link: "https://wallet.mintbase.xyz/create-account?success_url=https://wallet.mintbase.xyz/smart-actions",
  },
];
const pageRoutes = [
  {
    name: "AI",
    link: "AI",
  },
  {
    name: "Arts",
    link: "Art",
  },
  {
    name: "DAOs",
    link: "DAOs",
  },
  {
    name: "Gaming",
    link: "Gaming",
  },
  {
    name: "Music",
    link: "Music",
  },
  {
    name: "PFPs",
    link: "PFPs",
  },
  {
    name: "Philanthropy",
    link: "Philanthropy",
  },
  {
    name: "Utility",
    link: "Utility",
  },
  {
    name: "New Listings",
    link: "newListings",
  },
];
const YoctoToNear = (amountYocto) => {
  return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
};
console.log(featuredNFTs);
return (
  <Home>
    <Hero>
      <div style={{ width: "100%" }}>
        <div className="">
          {context.accountId ? (
            <>
              <Widget
                src="bos.genadrop.near/widget/Mintbase.App.Home.HomeContracts"
                props={{ isDarkModeOn, tabs }}
              />
            </>
          ) : (
            <div className="hero">
              <h1>The Digital Assets Factory</h1>
              <div className="subText">
                Easiest hub for brands, creators, and developers pioneering
                blockchain and AI
              </div>
              <div className="cards">
                {cardItems.map((data) =>
                  !data.link ? (
                    <Link
                      key={data.name}
                      to={
                        data.tab &&
                        href({
                          widgetSrc:
                            "bos.genadrop.near/widget/Mintbase.App.Index",
                          params: {
                            page: data.tab,
                          },
                        })
                      }
                    >
                      <a>
                        <div className="card">
                          <div className="innerCard">
                            <div className="cardText">{data.name}</div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ) : (
                    <a href={data.link} target={data.link ? "_blank" : ""}>
                      <div className="card">
                        <div className="innerCard">
                          <div className="cardText">{data.name}</div>
                        </div>
                      </div>
                    </a>
                  )
                )}
              </div>
              <Routes>
                {pageRoutes.map((data) => (
                  <Link
                    key={data.name}
                    className="route"
                    to={href({
                      widgetSrc: "bos.genadrop.near/widget/Mintbase.App.Index",
                      params: {
                        page: "markets",
                        tab: data.link,
                      },
                    })}
                  >
                    <a>
                      <div>{data.name}</div>
                    </a>
                  </Link>
                ))}
              </Routes>
            </div>
          )}
        </div>
      </div>
      <Gallery>
        <div onClick={HandleDownSlide} className="arrow-l">
          {rightArrow}
        </div>
        <div className="slider-display">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${12 * page}rem)`,
            }}
          >
            {featuredNFTs.length > 0 &&
              featuredNFTs?.map((value, key) => (
                <FeaturedCard key={key}>
                  <Link
                    key={"storeFront"}
                    className="route"
                    to={href({
                      widgetSrc: "bos.genadrop.near/widget/Mintbase.App.Index",
                      params: {
                        page: "contract",
                        tab: `nfts&accountId=${value.storeDataDb.id}`,
                      },
                    })}
                  >
                    <div className="head">
                      <img src={value.storeData.profileImage} alt="" />
                      <h1>{value?.storeData?.displayName}</h1>
                    </div>
                    <div className="stats">
                      <div className="stat">
                        <span>Total Minted</span>
                        <p>{value?.totalMinted}</p>
                      </div>
                      <div className="stat">
                        <span>Owners</span>
                        <p>{value?.uniqueOwners}</p>
                      </div>
                    </div>
                    <div className="cards">
                      {value?.listings?.length > 0 &&
                        value?.listings?.map((data) => (
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
                  </Link>
                </FeaturedCard>
              ))}
          </div>
        </div>
        <div onClick={HandleUpSlide} className="arrow-r">
          {rightArrow}
        </div>
      </Gallery>
    </Hero>
  </Home>
);
