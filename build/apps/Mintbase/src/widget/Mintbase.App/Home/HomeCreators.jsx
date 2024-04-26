const accountId = props.accountId ?? "bos.genadrop.near";
const { getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);
const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};
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
const { isDarkModeOn } = props;
const upArrow = (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-blue-300 dark:text-blue-100"
  >
    <g clip-path="url(#clip0_2307_53663)">
      <path
        d="M6.00002 3.3335V4.66683H10.3934L2.66669 12.3935L3.60669 13.3335L11.3334 5.60683V10.0002H12.6667V3.3335H6.00002Z"
        fill="currentColor"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_2307_53663">
        <rect width="16" height="16" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);
const CreatorApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-gap: 10px;
  margin-bottom: 264px;
  margin-left: 20px;
  @media (max-width: 500px) {
    margin-left: 0;
  }
`;
const Creators = styled.div`
  display: flex;
  margin-top: 100px;
  position: relative;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 20px: 
  flex-direction: row;
  width: 100%;
  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 48px;
    justify-content: center;
    width: 30%;
    margin-top: 20px;
    button {
      background: #000;
      border-color: black;
      margin-bottom: 20px;
    }
    @media (max-width: 500px) {
      width: 100%;
      align-items: center !important;
      h1 {
        text-align: center;
        font-size: 24px !important;
        margin: 0;
      }
      h2 {
        margin-bottom: 15px !important;
      }
    }
    ${getInputLabelFontType("big")}
    h2 {
      color: #8c4fe5;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 32px;
    }
    h1 {
      font-weight: bold;
      font-size: 29px;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      margin-bottom: 32px;
    }
    a {
      color: #4f5fa3;
      text-decoration: none;
      svg {
        color: #4f5fa3;
      }
    }
  }
`;
const Gallery = styled.div`
  max-width: 1000px;
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
    width: 50rem;
    height: ${(props) => (props.dev ? "400px" : "200px")};
    overflow: hidden;
    @media only screen and (max-width: 927px) {
      width: 32rem;
    }
    @media only screen and (max-width: 627px) {
      width: 18rem;
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
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 449px;
  padding: 24px;
  border-radius: 8px;
  border-radius: 4px;
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  height: 184px;
  ${getInputLabelFontType("big")}
  .top-image {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    h1 {
      font-size: 20px;
      font-weight: 600;
      margin-left: 20px;
      color: ${isDarkModeOn ? "#fff" : "#000"};
    }
  }
  p {
    font-size: 14px;
    color: ${isDarkModeOn ? "#fff" : "#000"};
  }
  img {
    width: 50px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
  }
  a {
    text-decoration: none;
  }
`;
const DevCard = styled.div`
  padding: 0;
  margin: 0;
  width: 479px;
  background: ${isDarkModeOn ? "#1f2130" : "#fff"};
  min-height: 400px;
  overflow: hidden;
  .image {
    width: 479px;
    .img {
      max-width: 479px !important:
    }
  }
  .text-sec {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 24px;
    align-items: center;
    justify-content: space-between;
    a {
      text-decoration: none;
      width: max-content;
      padding: 12px 24px;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      cursor: pointer;
      border: 1px solid #b0b0b0;
    }
    h1 {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      color: ${isDarkModeOn ? "#fff" : "#000"};
    }
    p {
      font-size: 14px;
      font-weight: 500;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      margin-top: 12px;
    }
  }
  @media (max-width: 500px) {
    width: 274px;
    height: 500px;
    .image {
      width: 279px;
      img {
        max-width: 274px;
      }
    }
  }
`;
const [page, setPage] = useState(0);
const [devPage, setDevPage] = useState(0);
const creators = [
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fstore%252Fnft.dock-sailgp.near%253Aprofile%3Falt%3Dmedia%26token%3D243a80be-2642-42fd-a401-1e7e8c2e63b5",
    title: "nft.dock-sailgp.near",
    para: "A fan loyalty program, but make it web3 🌐",
  },
  {
    title: "deadmau5.mintbase1.near",
    para: "Deadmau5 and Portugal. The man minted over 600k NFTs as a Single Release",
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fstore%252Fheaders%252Fdeadmau5-mintbase-nft-ab6761610000e5ebc5ceb05f152103b2b70d3b07.jpg%3Falt%3Dmedia%26token%3D71c08920-dd74-4221-8ecf-4da7be3bdf78",
  },
  {
    title: "nft.dock-sailgp.near",
    para: "Wilde Möhren Belin music festival IRL + Metaverse",
    image: "https://www.mintbase.xyz/images/store-light.png",
  },
  {
    title: "jwneartokens.mintbase1.near",
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fstore%252Fjwneartokens.mintbase1.near%253Aprofile%3Falt%3Dmedia%26token%3D317d2381-d578-491e-879d-7b33d7c766f5",
    para: "Photography stills and licenses",
  },
];
const developers = [
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-base-1.appspot.com%2Fo%2Fexample-cards%252FMarketplace%2520for%25203D-Printed%2520Products%253Aimage%3Falt%3Dmedia%26token%3D31941ad5-56e1-4acb-a8d2-354d04d5765e",
    head: "Marketplace for 3D-Printed Products",
    subHead:
      "Blockchain based marketplace for products that can be printed wherever you are",
    link: "https://about.nano-store.xyz/home/",
  },
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-base-1.appspot.com%2Fo%2Fexample-cards%252FDigital%2520ID%2520Aggregator%253Aimage%3Falt%3Dmedia%26token%3D398fed00-175c-423c-9018-9f4ccf742c55",
    head: "Digital ID Aggregator",
    subHead:
      "Seamless Web3 authentication using common Web2 methods like social media logins",
    link: "https://wallid.io/",
  },
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-base-1.appspot.com%2Fo%2Fexample-cards%252FMarket%2520on%2520NEAR%2520Social%253Aimage%3Falt%3Dmedia%26token%3D846c52d7-3680-494e-b741-b04ce03343eb",
    head: "Market on NEAR Social",
    subHead: "Fork a widget on your own page and build your own market.",
    link: "https://near.org/mintbase.near/widget/nft-marketplace",
    hasWidget: true,
    widgetLink:
      "https://near.org/adminalpha.near/widget/ProfilePage?accountId=mintbase.near&tab=apps",
  },
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-base-1.appspot.com%2Fo%2Fexample-cards%252FPayment%2520Streaming%253Aimage%3Falt%3Dmedia%26token%3D6b69dedf-2756-412e-900d-1f3e61c8cb24",
    head: "Payment Streaming",
    subHead:
      "Use NFTs as a key to access the vault. Enjoy seamless token streaming and recurring payment flows on their finance platform",
    link: "https://app2.roke.to/#/authorize",
    isApp: true,
  },
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fexample-cards%252FBuild%2520Better%2520Store%2520Fronts!%253Aimage%3Falt%3Dmedia%26token%3D2ff30e15-870b-44eb-a6e7-f2bf05788625",
    head: "Build Better Store Fronts!",
    subHead:
      "Create fully customized storefronts for any contract on Mintbase. Apply your very own branding and stand out from the crowd!",
    link: "https://gorillashops.io/",
  },
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fexample-cards%252FBuy%2520%2526%2520Sell%2520NEAR%2520accounts%2520as%2520NFTs.%253Aimage%3Falt%3Dmedia%26token%3Dd63ea95f-621e-431b-89e0-77c410b514ef",
    head: "Buy & Sell NEAR accounts as NFTs.",
    subHead:
      "Convert your NEAR account into an NFT, securing it within a NameSky NFT upon minting.",
    link: "https://testnet.namesky.app/",
    isApp: true,
  },
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fexample-cards%252FNext%2520Generation%2520Shooter%2520Game%253Aimage%3Falt%3Dmedia%26token%3Da29bcb84-0084-46e8-9ca5-80ca5481ee62",
    head: "Next Generation Shooter Game",
    subHead:
      "Play, trade, and earn money by customizing avatars, skins, and weapons.",
    link: "https://ailand.app/",
  },
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fexample-cards%252FDigital%2520Transformation%2520of%2520Retail%2520%2526%2520Hotel%2520Businesses%253Aimage%3Falt%3Dmedia%26token%3D10a1de3d-58f7-446e-b932-eeaddf6f63ac",
    head: "Digital Transformation of Retail & Hotel Businesses",
    subHead:
      "Streamline Food Safety & Supply Chain: No-code platform that optimizes the supply chain with data sharing.",
    link: "https://puzzletask.com/",
  },
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fexample-cards%252FDiscover%252C%2520Invest%252C%2520and%2520Savor%2520your%2520Gateway%2520to%2520Unique%2520Whisky%2520Casks%253Aimage%3Falt%3Dmedia%26token%3Dd43db740-d467-48d3-a5ea-3e4717c6d90b",
    head: "Discover, Invest, and Savor your Gateway to Unique Whisky Casks",
    subHead:
      "A platform empowering small distilleries through NFTs, redefining whisky cask management and distribution.",
    link: "https://pwxchange.com/",
  },
  {
    image:
      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fexample-cards%252FCollateral-free%252C%2520Utility%2520NFT%2520Rental%253Aimage%3Falt%3Dmedia%26token%3Df8ceb9ae-83a4-454f-b66e-2fad883c034d",
    head: "Collateral-free, Utility NFT Rental",
    subHead:
      "Simplify with a secure SDK integration or create a custom marketplace using the Whitelabel option. Hassle-free renting, anytime, anywhere.",
    link: "https://testnet.niftyrent.xyz/",
    appLink: "https://testnet.niftyrent.xyz/app",
    isApp: true,
  },
];
const HandleCreatorUpSlide = () => {
  if (page < creators.length - 1) {
    setPage(page + 1);
  } else {
    setPage(0);
  }
};
const HandleCreatorDownSlide = () => {
  if (page > 0) {
    setPage(page - 1);
  } else {
    setPage(creators.length - 1);
  }
};
const HandleDeveloperUpSlide = () => {
  if (devPage < developers.length - 1) {
    setDevPage(devPage + 1);
  } else {
    setDevPage(0);
  }
};
const HandleDeveloperDownSlide = () => {
  if (devPage > 0) {
    setDevPage(devPage - 1);
  } else {
    setDevPage(developers.length - 1);
  }
};
return (
  <CreatorApp>
    <Creators>
      <div className="left">
        <h2>Creators</h2>
        <h1>No code, no limits: NFT projects without the complexity</h1>
        <a
          href="https://docs.mintbase.xyz/creator/getting-started/"
          target="_blank"
        >
          Creator Docs {upArrow}
        </a>
      </div>
      <Gallery>
        <div onClick={HandleCreatorDownSlide} className="arrow-l">
          {rightArrow}
        </div>
        <div className="slider-display">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${10 * page}rem)`,
            }}
          >
            {creators.map((data, index) => (
              <Card key={index}>
                <Link
                  key={"storeFront"}
                  className="route"
                  to={href({
                    widgetSrc: "bos.genadrop.near/widget/Mintbase.App.Index",
                    params: {
                      page: "contract",
                      tab: `nfts&accountId=${data.title}`,
                    },
                  })}
                >
                  <div className="top-image">
                    <img src={data.image} alt={data.title} />
                    <h1>
                      {data.title.length > 22
                        ? `${data.title.substring(0, 22)}...`
                        : data.title}
                    </h1>
                  </div>
                  <p>{data.para}</p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
        <div onClick={HandleCreatorUpSlide} className="arrow-r">
          {rightArrow}
        </div>
      </Gallery>
    </Creators>
    <Creators>
      <div className="left">
        <h2>DEVELOPERS</h2>
        <h1>SDK, Indexer, and templates...</h1>
        <button>Learn More</button>
        <a href="https://docs.mintbase.xyz/dev/getting-started" target="_blank">
          Developer Docs {upArrow}
        </a>
      </div>
      <Gallery dev={true}>
        <div onClick={HandleDeveloperDownSlide} className="arrow-l">
          {rightArrow}
        </div>
        <div className="slider-display">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${30 * devPage}rem)`,
            }}
          >
            {developers.map((data, index) => (
              <DevCard key={index}>
                <div className="image">
                  <img className="img" src={data.image} alt={data.head} />
                </div>
                <div className="text-sec">
                  <h1>{data.head}</h1>
                  <p>{data.subHead}</p>
                  <a target="_blank" href={data.link}>
                    Website
                  </a>
                </div>
              </DevCard>
            ))}
          </div>
        </div>
        <div onClick={HandleDeveloperUpSlide} className="arrow-r">
          {rightArrow}
        </div>
      </Gallery>
    </Creators>
  </CreatorApp>
);
