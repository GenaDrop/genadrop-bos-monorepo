const { isDarkModeOn, tab } = props;
const { MbFeaturedCard } = VM.require(
  "bos.genadrop.near/widget/Mintbase.MbFeaturedCard"
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
const ExplorePage = styled.div`
  padding: 24px;
`;
const Routes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 40px;
  div {
    width: max-content;
  }
  p {
    text-decoration: none;
    padding: 10px;
    border-radius: 8px;
    transition: 0.5s ease-in-out;
    font-weight: 500;
    cursor: pointer;
    color: #4f58a3;
    width: max-content;
    &:hover {
      background-color: #90cdf4;
    }
  }
  .active {
    background-color: ${isDarkModeOn ? "#3a1c28" : "#fedfde"};
    color: #ff5c5c;
  }
  .active:hover {
    background-color: ${isDarkModeOn ? "#3a1c28" : "#fedfde"};
  }
  @media (max-width: 700px) {
    overflow-x: scroll;
  }
`;
const FeaturedCardContainer = styled.div`
  margin-top: 30px;
  position: relative;
  height: 300px;
`;
const FeaturedCard = styled.div`
  width: 600px;
  height: 299px;
  background: ${isDarkModeOn ? "#1f2130" : "#fff"};
  display: flex;
  flex-direction: column;
  .image {
    width: 100%;
    height: 145px !important;
    img {
      width: 100%;
      height: 145px !important;
      object-fit: cover;
    }
  }
  .content {
    height: 100px;
    position: relative;
    display: flex;
    h1 {
      font-size: 20px;
      align-self: center;
      margin-top: 5px;
      font-weight: bold;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      margin-left: 150px;
    }
    .topImage {
      position: absolute;
      bottom: 55%;
      left: 4%;
      img {
        width: 106px;
        height: 106px;
        border: 1px solid ${isDarkModeOn ? "#1f2130" : "#fff"};
        object-fit: cover;
      }
    }
  }
  @media (max-width: 600px) {
    width: 233px;
    min-height: 133px;
    height: max-content;
    .image {
      height: 89px !important;
      img {
        height: 89px !important;
      }
    }
    .content {
      flex-direction: row;
      .topImage {
        img {
          width: 67px;
          height: 67px;
        }
      }
      h1 {
        font-size: 17px;
        text-wrap: wrap;
        margin-left: 20px;
        margin-top: 50px;
      }
    }
  }
`;
const Gallery = styled.div`
  top: 0;
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
      width: 22rem;
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
    .arrow-l,
    .arrow-r {
      padding: 5px 7px 7px 7px;
      svg {
        width: 20px;
      }
    }
  }
`;
const CardContainers = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 5px;
  margin-top: 40px;
  width: 100%;
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-content: center;
  }
`;
const pageRoutes = {
  AI: {
    name: "AI",
    link: "",
  },
  Art: {
    name: "Arts",
    link: "",
  },
  DAOs: {
    name: "DAOs",
    link: "",
  },
  Gaming: {
    name: "Gaming",
    link: "",
  },
  Music: {
    name: "Music",
    link: "",
  },
  PFPs: {
    name: "PFPs",
    link: "",
  },
  Philanthropy: {
    name: "Philanthropy",
    link: "",
  },
  Utility: {
    name: "Utility",
    link: "",
  },
  newListings: {
    name: "New Listings",
    link: "",
  },
};
const MarketPage = ({ isDarkModeOn, tab }) => {
  const [activeTab, setActiveTab] = useState(-1);
  const [currentTab, setCurrentTab] = useState(tab || "Featured");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const handleTabClick = (index) => {
    const fieldName = Object.keys(pageRoutes)[index];
    setActiveTab(index);
    setCurrentTab(pageRoutes[fieldName].name);
    setPage(1);
  };
  const fetchExploreData = useCallback(() => {
    asyncFetch("https://api.mintbase.xyz/explore", {
      method: "GET",
      headers: {
        "mb-api-key": "omni-site",
        "Content-Type": "application/json",
        "x-hasura-role": "anonymous",
      },
    }).then((data) => {
      if (data.body) {
        const parseData = JSON.parse(data.body);
        setFilteredData(
          Object.values(
            parseData[currentTab === "Arts" ? "Art" : currentTab]
          )?.map((data) => ({
            id: data?.storeData?.contract,
            title: data?.storeData?.displayName ?? data?.storeData?.contract,
            totalMinted: data?.totalMinted,
            totalOwners: data?.uniqueOwners,
            image: data?.storeData?.profileImage,
            displayImage: data?.storeData?.headerImage,
            listings: data?.listings,
          }))
        );
      }
    });
  }, [currentTab, activeTab]);
  useEffect(() => {
    fetchExploreData();
  }, [activeTab]);
  useEffect(() => {
    if (tab) {
      setCurrentTab(tab);
      const index = Object.keys(pageRoutes).findIndex((key) => key === tab);
      setActiveTab(index);
    }
  }, [tab]);
  const HandleUpSlide = () => {
    if (page < filteredData?.length - 1) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
  };
  const HandleDownSlide = () => {
    if (page > 0) {
      setPage(page - 1);
    } else {
      setPage(filteredData?.length - 1);
    }
  };
  return (
    <ExplorePage>
      <Routes>
        {Object.values(pageRoutes).map((data, index) => (
          <div key={index}>
            <p
              className={activeTab === index ? "active" : ""}
              onClick={() => handleTabClick(index)}
            >
              <div>{data.name}</div>
            </p>
          </div>
        ))}
      </Routes>
      <FeaturedCardContainer>
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
              {filteredData.length > 0 &&
                filteredData?.map((data, index) => (
                  <FeaturedCard key={index}>
                    <div className="image">
                      <img
                        src={
                          data?.image ||
                          "https://www.mintbase.xyz/images/store-header-light.png"
                        }
                        alt="image"
                      />
                    </div>
                    <div className="content">
                      <div className="topImage">
                        <img
                          src={
                            data?.profileImage ||
                            "https://www.mintbase.xyz/images/store-light.png"
                          }
                        />
                      </div>
                      <h1>{data?.id || "mutart.mintbase1.near"}</h1>
                    </div>
                  </FeaturedCard>
                ))}
            </div>
          </div>
          <div onClick={HandleUpSlide} className="arrow-r">
            {rightArrow}
          </div>
        </Gallery>
      </FeaturedCardContainer>
      <CardContainers>
        {filteredData.length > 0 &&
          filteredData?.map(
            (
              {
                title,
                totalMinted,
                totalOwners,
                image,
                displayImage,
                listings,
              },
              index
            ) => (
              <MbFeaturedCard
                key={index}
                title={title}
                totalMinted={totalMinted}
                totalOwners={totalOwners}
                image={image}
                isDarkModeOn={isDarkModeOn}
                displayImage={displayImage}
                listings={listings}
              />
            )
          )}
      </CardContainers>
    </ExplorePage>
  );
};
return <MarketPage isDarkModeOn={props?.isDarkModeOn} tab={props.tab} />;
