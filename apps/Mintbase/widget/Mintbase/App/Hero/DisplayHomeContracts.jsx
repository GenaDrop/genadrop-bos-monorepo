const { getInputLabelFontType } = VM.require(
  "${config_account}/widget/Mintbase.components"
);

const { href } = VM.require("${alias_builddao}/widget/lib.url") || {
  href: () => {},
};

const Hero = styled.div`
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

const DisplayHomeContracts = ({ isDarkModeOn, isLoggedIn, connectedDao }) => {
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

  return (
    <Hero>
      <div>
        <div className="">
          {isLoggedIn ? (
            <>
              <Widget
                src="${config_account}/widget/Mintbase.App.Home.HomeContracts"
                props={{
                  isDarkModeOn,
                  tabs,
                  connectedDao: connectedDao,
                }}
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
                            "${config_account}/widget/Mintbase.App.Index",
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
                      widgetSrc: "${config_account}/widget/Mintbase.App.Index",
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
    </Hero>
  );
};

return { DisplayHomeContracts };
