const accountId = props.accountId ?? "bos.genadrop.near";
const { mode } = props;
const { getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);

const Home = styled.div``;

const Hero = styled.div`
  display: flex; /* flex */
  flex-direction: column;
  position: relative;
  height: 70vh; /* h-full */
  width: 100%; /* w-full */
  margin-top: 6rem; /* mt-24 */
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    padding-bottom: 7rem; /* md:pb-28 */
    margin-top: 7rem; /* md:mt-28 */
  }
  @media (min-width: 1280px) {
    margin-top: 5.5rem; /* xl:mt-22 */
    margin-bottom: 6rem; /* xl:mb-24 */
  }
  @media (min-width: 1600px) {
    margin-top: 7.5rem; /* xxxl:mt-30 */
  }
  justify-content: center; /* justify-center */

  .hero {
    display: flex; /* flex */
    flex-direction: column; /* flex-col */
    z-index: 30; /* z-30 */
    gap: 24px; /* gap-24 */
    align-items: center; /* items-center */
    text-align: center; /* text-center */
    padding: 16px; /* p-16 */

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
      z-index: 10; /* z-10 */
    }
  }
  .card {
    height: 100%; /* h-full */
    cursor: pointer; /* cursor-pointer */
    padding: 16px; /* p-24 */
    color: #d1d5db; /* text-purple-100 */
    background-color: rgba(12, 18, 33, 0.6); /* bg-opacity-50 */
    z-index: 30; /* z-30 */
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
    grid-template-columns: repeat(3, 200px);
    grid-gap: 10px;
    margin-top: 20px;
    margin-bottom: 70px;
  }
  .featuredCards {
    position: absolute;
    top: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

const Routes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 40px;
  a {
    text-decoration: none;
    color: #4f59a2;
    padding: 10px;
    border-radius: 8px;
    transition: 0.5s ease-in-out;
    &:hover {
      background: #fff;
    }
  }
`;

const Table = styled.div``;

const Gallery = styled.div`
  position: absolute;
  top: 80%;
  max-width: 1000px;
  display: flex;
  margin: 1rem auto;
  align-items: center;
  .arrow-r {
    rotate: 180deg;
  }
  .arrow-r,
  .arrow-l {
    width: 2rem;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid black;
  }
  .slider-display {
    position: relative;
    width: 120rem;
    height: 357px;
    overflow: hidden;
    @media only screen and (max-width: 927px) {
      width: 32rem;
    }
    @media only screen and (max-width: 627px) {
      width: 15rem;
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
`;
const size = "100%";

const [page, setPage] = useState(0);

const nfts = [
  { account: "dummy" },
  { account: "dummy" },
  { account: "dummy" },
  { account: "dummy" },
  { account: "dummy" },
  { account: "dummy" },
  { account: "dummy" },
  { account: "dummy" },
  { account: "dummy" },
  { account: "dummy" },
  { account: "dummy" },
];

const HandleUpSlide = () => {
  if (page < nfts.length - 1) {
    setPage(page + 1);
  } else {
    setPage(0);
  }
};
const HandleDownSlide = () => {
  if (page > 0) {
    setPage(page - 1);
  } else {
    setPage(nfts.length - 1);
  }
};

const cardItems = [
  { name: "Developers", link: "" },
  { name: "Creator Drop", link: "" },
  { name: "Market", link: "" },
];

const pageRoutes = [
  {
    name: "AI",
    link: "",
  },
  {
    name: "Arts",
    link: "",
  },
  {
    name: "DAOs",
    link: "",
  },
  {
    name: "Gaming",
    link: "",
  },
  {
    name: "Music",
    link: "",
  },
  {
    name: "PFPs",
    link: "",
  },
  {
    name: "Philanthropy",
    link: "",
  },
  {
    name: "Utility",
    link: "",
  },
  {
    name: "New Listings",
    link: "",
  },
];

return (
  <Home>
    <Hero>
      <div>
        <div className="hero">
          <h1>The Digital Assets Factory</h1>
          <div className="subText">
            Easiest hub for brands, creators, and developers pioneering
            blockchain and AI
          </div>
          <div className="cards">
            {cardItems.map((data) => (
              <a>
                <div className="card">
                  <div className="innerCard">
                    <div className="cardText">{data.name}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <Routes>
          {pageRoutes.map((data) => (
            <a href={data.link}>
              <div>{data.name}</div>
            </a>
          ))}
        </Routes>
      </div>
      <Gallery>
        <img
          src="https://ipfs.near.social/ipfs/bafkreiayzzl6o7cgvrv6dvlwi4kahvjojbldljs24ktw7jmidwlpxjziym"
          className="arrow-l"
          onClick={HandleDownSlide}
          alt="angle left"
        />
        <div className="slider-display">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${17 * page}rem)`,
            }}
          >
            {nfts.map((data) => (
              <Widget
                src={`${accountId}/widget/Mintbase.MbFeaturedCard`}
                props={{ mode, data }}
              />
            ))}
          </div>
        </div>
        <img
          className="arrow-r"
          onClick={HandleUpSlide}
          src="https://ipfs.near.social/ipfs/bafkreiayzzl6o7cgvrv6dvlwi4kahvjojbldljs24ktw7jmidwlpxjziym"
          alt="angle left"
        />
      </Gallery>
    </Hero>
  </Home>
);
