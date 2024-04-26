const { isDarkModeOn } = props;
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
const Gallery = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  margin-top: 50px;
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
    margin-top: -5rem;
    svg {
      padding: 0;
      margin: 0;
    }
  }
  .slider-display {
    position: relative;
    width: 500rem;
    height: 357px;
    overflow: hidden;
    @media only screen and (max-width: 927px) {
      width: 50rem;
    }
    @media only screen and (max-width: 627px) {
      width: 50rem;
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
const ProfileImageContainer = styled.div`
  transform: translateY(138px);
  width: 40px;
  height: 40px;
  position: absolute;
  img {
    width: 40px;
    height: 40px;
  }
  &:hover {
    cursor: pointer;
    &:after {
      background-color: rgba(
        45.9,
        45.9,
        45.9,
        0.4
      ); // Dark overlay with 40% opacity on hover
    }
    svg {
      opacity: 1; // Make the image visible on hover
    }
  }
`;
const profileImageStyle = {
  width: "100px",
  height: "100px",
  position: "absolute",
  bottom: "-40px",
  left: "0px",
  pointerEvents: "none",
  border: "1px solid gray",
  padding: "2px",
  background: "#1e2030",
  borderRadius: "5px",
};
const Card = styled.a`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: ${isDarkModeOn ? "#1e2030" : "white"};
  box-shadow: ${isDarkModeOn ? "none" : "0px -2px 0px #dbdbdb inset"};
  border: ${isDarkModeOn ? "none" : "1px solid #dbdbdb"};
  margin-left: auto;
  margin-right: auto;
  position: relative;
  transition: all 300ms;
  .custom {
    max-width: 500px;
  }
  :hover {
    text-decoration: none;
    transform: translateY(-1rem);
  }
`;
const HeaderContainer = styled.div`
  padding-left: 16px;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
`;
const backgroundStyleHeightPx = 168;
const BackgroundImageContainer = styled.div`
  img {
    position: absolute;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    margin-top: 10px;
  }
  svg {
    position: absolute;
    top: ${backgroundStyleHeightPx / 2}px;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0; // Start with the image invisible
    transition: opacity 0.3s;
    z-index: 2; // Ensure the image is on top
    pointer-events: none;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 176px;
  padding: 16px 24px;
  text-align: center;
  gap: 16px;
  flex: 1;
  border-top: ${isDarkModeOn
    ? "1px solid rgb(86, 88, 103)"
    : "1px solid #e8e8e8"};
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${isDarkModeOn ? "#FFFFFF" : "#2e2e2e"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${isDarkModeOn ? "#a7a8b1" : "#2e2e2e"};
  word-wrap: break-word;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 10px 0;
  margin-bottom: 20px;
`;
const Button = styled.div`
  border: ${isDarkModeOn ? "1px solid #565867" : "1px solid gray"};
  padding: 5px 20px;
  color: ${isDarkModeOn ? "#FFFFFF" : "#000000"};
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  &:hover {
    --tw-bg-opacity: 1;
    background-color: ${isDarkModeOn
      ? "rgba(43,46,66,var(--tw-bg-opacity))"
      : "#bdbdbd"};
  }
`;
const backgroundImageStyle = {
  objectFit: "cover",
  left: 0,
  top: 0,
  height: "53px",
  width: "140px",
  borderRadius: "6px 6px 0px 0px",
  pointerEvents: "none",
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 40px;
    font-weight: 700;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
  }
  .content {
    min-height: 500px;
    width: 100%;
  }
`;
const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 0 20px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: 3rem 0;
  gap: 20px;
  .title {
    font-size: 35px;
    font-weight: 600;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
  }
  .sub-title {
    font-size: 20px;
    color: gray;
  }
  .layout-button {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .button {
    color: ${isDarkModeOn ? "#000000" : "#ffffff"};
    background: ${isDarkModeOn ? "#ffffff" : "#000000"};
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    text-decoration: none;
    &:hover {
      background: ${isDarkModeOn ? "rgba(197,208,255,1)" : "#525252"};
    }
  }
`;
const dataCard = [
  {
    title: "Market on NEAR Social",
    desc: "Fork a widget on your own page and build your own market.",
    imgUrl: "https://svgur.com/i/14SC.svg",
    button: "Market",
    button_2: "Widgets",
    url_1: "https://near.org/#/mintbase.near/widget/nft-marketplace",
    url_2:
      "https://near.org/#/adminalpha.near/widget/ProfilePage?accountId=mintbase.near&tab=apps",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "75px",
      width: "180px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Metaverse Gallery",
    desc: "Auto generated and custom made VR-ready galleries for your NFTs linked to each smart contract on Mintbase.",
    imgUrl: "https://www.mintbase.xyz/partners/3xr.svg",
    button: "Webiste",
    button_2: "Read More",
    url_1: "https://www.3xr.space",
    url_2:
      "https://medium.com/mintbase/3xr-is-building-virtual-spaces-for-your-nfts-15f4bd1ea87f",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 0,
      height: "175px",
      width: "140px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Mintbase <> DAOs Interaction",
    desc: "Perform actions on Mintbase with community consensus. Be a member of DAO-owned contracts.",
    imgUrl: "https://www.mintbase.xyz/partners/astro.svg",
    button: "Website",
    button_2: "Read More",
    url_1: "https://app.astrodao.com",
    url_2: "https://medium.com/mintbase/cfcs-mintbase-astrodao-4c01b47bfa4c",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 60,
      height: "30px",
      width: "141px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Customisable Storefronts",
    desc: "Using a few clicks, you can deploy your e-commerce and mint thousands of NFTs using Mintbase API as a backbone.",
    imgUrl: "https://www.mintbase.xyz/partners/gorilla.svg",
    button: "Website",
    button_2: "Read More",
    url_1: "https://gorillashops.io",
    url_2:
      "https://medium.com/mintbase/store-s-of-the-week-gorilla-shops-cb0f07bd9332",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "60px",
      width: "220px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Crowdfunding Launchpad",
    desc: "Staking rewards-based fundraising: mint new project tokens with your staking rewards instead of crypto assets.",
    imgUrl: "https://www.mintbase.xyz/partners/metayield.svg",
    button: "Website",
    url_1: "https://metayield.app",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "60px",
      width: "320px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Ticketing platform",
    desc: "Enabling event organizers to create and manage their NFT tickets easily.",
    imgUrl: "https://www.mintbase.xyz/partners/mintickt.svg",
    button: "Website",
    button_2: "Read More",
    url_1: "https://www.mintickt.com/#/",
    url_2:
      "https://medium.com/mintbase/mintickt-building-a-scalable-ticketing-platform-with-mintbase-54212d787240",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "60px",
      width: "220px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Metaverse and NFT Game",
    desc: "Game with a variety of battle modes where NFTs are your digital property. 8888 unique 3D NFT avatars.",
    imgUrl: "https://www.mintbase.xyz/partners/amber.svg",
    button: "Website",
    url_1: "https://amber.top/en",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "40px",
      width: "220px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Phygital Cultural Experiences",
    desc: "Augmented reality tour in Barcelona intersecting 3D art, city touring, and AR. An actual hybrid cultural experience.",
    imgUrl: "https://www.mintbase.xyz/partners/explorins.svg",
    button: "Website",
    button_2: "Read More",
    url_1: "https://explorins.com/home",
    url_2:
      "https://medium.com/mintbase/store-of-the-week-explorins-99d3a9587fa0",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "50px",
      width: "230px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Payment Streaming",
    desc: "Use NFTs as a key to access the vault. Enjoy seamless token streaming and recurring payment flows on their finance platform.",
    imgUrl: "https://www.mintbase.xyz/partners/roketo.svg",
    button: "Website",
    url_1: "https://app2.roke.to/#/streams",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "47px",
      width: "235px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Rentals Platform",
    desc: "Decentralized platform that offers collateral-free NFT rentals in the Web3 space.",
    imgUrl: "https://www.mintbase.xyz/partners/niftyrent.svg",
    button: "Website",
    url_1: "https://testnet.niftyrent.xyz/",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "60px",
      width: "290px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Marketplace",
    desc: "The Portuguese Whisky Exchange (PWX) is a platform that allows small whisky distilleries to use non-fungible tokens (NFTs) to manage and distribute their future whisky casks.",
    imgUrl: "https://www.mintbase.xyz/partners/pwx.svg",
    button: "Website",
    url_1: "https://pwxchange.com/",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "87px",
      width: "140px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Membership Platform",
    desc: "Verify membership & nurture your community with rewards and special access.",
    imgUrl: "https://www.mintbase.xyz/partners/metronomo.svg",
    button: "Website",
    url_1: "https://enrollmint.io/",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "60px",
      width: "320px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Music Focused Marketplace",
    desc: "Using Web3 and NFTs to empower musicians and shift the landscape of the music industry.",
    imgUrl: "https://www.mintbase.xyz/partners/mintingmusic.svg",
    button: "Webiste",
    button_2: "Read More",
    url_1: "https://marketplace.mintingmusic.com/",
    url_2:
      "https://medium.com/mintbase/web3-tools-for-creators-a-conversation-with-minting-music-4b0c080b778a",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 20,
      height: "108px",
      width: "140px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Membership Platform",
    desc: "Verify membership & nurture your community with rewards and special access.",
    imgUrl: "https://www.mintbase.xyz/partners/enrollmint.svg",
    button: "Webiste",
    url_1: "https://enrollmint.io/",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: 50,
      height: "40px",
      width: "280px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
];
const dataUseCases = [
  {
    title: "Minsta Example",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/omni-live.appspot.com/o/store%2Fmoments.mintbase1.near%3Aheader?alt=media&token=4e29f42b-e44d-45f9-a116-f1c3a360eb33",
    imgProfile:
      "https://firebasestorage.googleapis.com/v0/b/omni-live.appspot.com/o/store%2Fmoments.mintbase1.near%3Aprofile?alt=media&token=4daae9d9-c84e-49cd-a3fa-5fc61a522c3d",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: -10,
      height: "168px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "Ticket Example",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/omni-live.appspot.com/o/store%2Fticket.mintbase1.near%3Aheader?alt=media&token=4330f11b-6425-413a-b23d-5eeb15528015",
    imgProfile:
      "https://firebasestorage.googleapis.com/v0/b/omni-live.appspot.com/o/store%2Fticket.mintbase1.near%3Aprofile?alt=media&token=4dbfe33b-d845-4385-abc3-e32591ce2a96",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: -10,
      height: "168px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "NEAR APAC",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/omni-live.appspot.com/o/store%2Fapac.mintbase1.near%3Aheader?alt=media&token=6ec19069-599e-4de1-9035-a80dbcecb9e5",
    imgProfile:
      "https://firebasestorage.googleapis.com/v0/b/omni-live.appspot.com/o/store%2Fapac.mintbase1.near%3Aprofile?alt=media&token=1a59f747-d807-4502-ba57-b5c8d327a788",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: -10,
      height: "168px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
  {
    title: "SailGP TheDock",
    desc: "Pose blockchain inquiries and facilitate transactions directly through those dialogues.",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/omni-live.appspot.com/o/store%2Fnft.dock-sailgp.near%3Aheader?alt=media&token=22c62788-6670-4afb-9a5f-7f91be8831cd",
    imgProfile:
      "https://firebasestorage.googleapis.com/v0/b/omni-live.appspot.com/o/store%2Fnft.dock-sailgp.near%3Aprofile?alt=media&token=243a80be-2642-42fd-a401-1e7e8c2e63b5",
    customStyle: {
      objectFit: "cover",
      left: 0,
      top: -10,
      height: "168px",
      borderRadius: "6px 6px 0px 0px",
      pointerEvents: "none",
      filter: isDarkModeOn ? "invert(100%)" : "none",
    },
  },
];
const [page, setPage] = useState(0);
const HandleUpSlide = () => {
  if (page < dataUseCases.length + 3 - 1) {
    setPage(page + 1);
  } else {
    setPage(0);
  }
};
const HandleDownSlide = () => {
  if (page > 0) {
    setPage(page - 1);
  } else {
    setPage(dataUseCases.length + 3 - 1);
  }
};
const YoctoToNear = (amountYocto) => {
  return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
};
return (
  <Container>
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
          {dataUseCases.map((value, index) => (
            <Card key={index} style={{ width: "900px" }}>
              <HeaderContainer>
                <BackgroundImageContainer>
                  <img
                    style={value.customStyle}
                    src={value.imgUrl}
                    alt="background"
                  />
                </BackgroundImageContainer>
                <ProfileImageContainer className="profile-picture d-inline-block">
                  <img
                    style={profileImageStyle}
                    src={value.imgProfile}
                    alt="avatar"
                  />
                </ProfileImageContainer>
              </HeaderContainer>
              <Info
                className="d-flex text-center"
                style={{
                  marginLeft: "20px",
                  paddingTop: "5px",
                  paddingBottom: "40px",
                  border: "none",
                }}
              >
                <Title>{value.title}</Title>
              </Info>
            </Card>
          ))}
        </div>
      </div>
      <div onClick={HandleUpSlide} className="arrow-r">
        {rightArrow}
      </div>
    </Gallery>
    <Main>
      <div className="title">Real World Use Cases</div>
      <div className="content"></div>
    </Main>
    <Projects>
      {dataCard.map((value, index) => (
        <Card key={index}>
          <HeaderContainer>
            <BackgroundImageContainer>
              <img
                style={value.customStyle}
                src={value.imgUrl}
                alt="background"
              />
            </BackgroundImageContainer>
          </HeaderContainer>
          <Info>
            <Title>{value.title}</Title>
            <SubTitle>{value.desc}</SubTitle>
          </Info>
          <Footer>
            <Button>
              <a
                href={value.url_1}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: isDarkModeOn ? "#ffffff" : "#000000",
                }}
              >
                {value.button}
              </a>
            </Button>
            {value.button_2 && (
              <Button style={{ border: "none" }}>
                <a
                  href={value.url_2}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    color: isDarkModeOn ? "#ffffff" : "#000000",
                  }}
                >
                  {value.button_2}
                </a>
              </Button>
            )}
          </Footer>
        </Card>
      ))}
    </Projects>
    <Bottom>
      <div>
        <div className="title">Let's build the future together</div>
        <div className="sub-title">
          Skip a year of Web3 development building on top of Mintbase.
        </div>
      </div>
      <div className="layout-button">
        <a
          href="https://docs.mintbase.xyz/dev/getting-started"
          target="_blank"
          className="button"
        >
          Go To Docs
        </a>
        <a href="https://t.me/mintdev" target="_blank" className="button">
          Dev Telegram
        </a>
        <a
          href="https://github.com/mintbase/Grants-Program"
          target="_blank"
          className="button"
        >
          Mintbase Grants
        </a>
      </div>
    </Bottom>
  </Container>
);
