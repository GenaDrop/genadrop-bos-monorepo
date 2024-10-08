const { href } = VM.require("${alias_builddao}/widget/lib.url") || {
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

const HomeContracts = styled.div`
  padding: 20px;
  min-height: 500px;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  .nfts {
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
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 40px;
  margin-top: 40px;
  width: 100%;
  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 239px;
    padding: 5px;
    background: transparent;
    border-radius: 4px;
    border: 1px dashed ${(props) => (props.isDarkModeOn ? "#f8f8f8" : "#000")};
    &:hover {
      background: ${(props) => (props.isDarkModeOn ? "#070C2B" : "white")};
    }
    i {
      width: 40px;
      height: 40px;
      color: #4e58a2;
    }
    svg {
      color: ${(props) => (props.isDarkModeOn ? "#c5d1fe" : "#4e58a2")};
    }
    a {
      text-decoration: none;
    }
    .button {
      border: 1px solid #9496a1;
      transition: 0.3s ease-in-out;
      color: #000;
      font-size: 14px;
      padding: 5px 15px;
      color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
      margin: 10px 0;
      border-radius: 4px;
      &:hover {
        background-color: rgba(59, 130, 246, 0.2);
        border-color: rgba(59, 130, 246, 0.2);
      }
    }
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const Contracts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 80px;
  width: 100%;
  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-bottom: 15px;
    h1 {
        color: ${(props) => (props.isDarkModeOn ? "#b2b5bd" : "#3f4353")};
        font-size: 14px;
        text-transform: uppercase;
        font-weight: bold;
    }
    a {
      color: ${(props) => (props.isDarkModeOn ? "#aab4df" : "#000")};
      cursor: pointer;
    }
  }
  .tab {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    text-decoration: none;
    gap: 0.2rem;
    border-radius: 0.25rem; /* Assuming default border radius */
    color: ${isDarkModeOn ? "#C5D0FF" : "#4F58A3"}; /* Ternary for text color */
    padding: 8px 12px; /* Assuming Tailwind CSS default spacing unit */
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Assuming Tailwind CSS default timing function and duration */
    white-space: nowrap;

    &:focus {
      outline: 2px solid transparent; /* Assuming Tailwind CSS default focus outline */
      outline-offset: 2px; /* Assuming Tailwind CSS default focus outline offset */
      box-shadow: 0 0 0 2px
        ${
          isDarkModeOn ? "rgba(59, 130, 246, 0.5)" : "rgba(66, 153, 225, 0.5)"
        }; /* Ternary for box-shadow */
      background-color: ${
        isDarkModeOn ? "rgba(59, 130, 246, 0.35)" : "rgba(66, 153, 225, 0.15)"
      }; /* Ternary for background-color */
    }

    &:hover {
      background-color: ${
        isDarkModeOn ? "rgba(59, 130, 246, 0.15)" : "rgba(66, 153, 225, 0.15)"
      }; /* Ternary for background-color */
    }

    cursor: pointer;
    @media (max-width: 768px) {
      padding: 12px;
      font-size: 12px;
      line-height: 14px;
    }
  }
`;

const HomeContractsPage = ({ tabs, isDarkModeOn, connectedDao }) => {
  const [ownedNFts, setOwnedNFTs] = useState([]);
  const [page, setPage] = useState(1);

  const fetchOwnedNfts = () => {
    asyncFetch(
      `https://api.mintbase.xyz/human/${context.accountId}/owned?offset=0&limit=16&orderBy=greatest(minted_timestamp,%20last_transfer_timestamp)%20desc%20nulls%20last&listedFilter=false`,
      {
        method: "GET",
        headers: {
          "mb-api-key": "omni-site",
          "Content-Type": "application/json",
          "x-hasura-role": "anonymous",
        },
      }
    ).then((data) => {
      if (data.body) {
        const nfts = JSON.parse(data?.body);
        setOwnedNFTs(nfts.results);
      }
    });
  };

  useEffect(() => {
    fetchOwnedNfts();
  }, []);

  return (
    <HomeContracts>
      <Widget
        src={`${config_account}/widget/Mintbase.App.LaunchPad.Contracts`}
        props={{
          isDarkModeOn,
          connectedDao: connectedDao,
          isHome: () => {},
        }}
      />
      <Contracts isDarkModeOn={isDarkModeOn}>
        <div className="top">
          <h1>Owned NFTS</h1>
          <div style={{ display: "flex", gap: "20px;" }}>
            <Link
              role="button"
              to={href({
                widgetSrc: "${config_account}/widget/Mintbase.App.Index",
                params: {
                  page: "human",
                  tab: "owned",
                },
              })}
              className="tab"
            >
              View All
            </Link>
            {connectedDao?.address && (
              <Link
                role="button"
                to={href({
                  widgetSrc: "${config_account}/widget/Mintbase.App.Index",
                  params: {
                    page: "human",
                    tab: "owned",
                    accountId: connectedDao?.address,
                  },
                })}
                className="tab"
              >
                View DAO NFTs
              </Link>
            )}
          </div>
        </div>
      </Contracts>

      <div className="nfts">
        {ownedNFts.length
          ? ownedNFts?.slice(0, 4)?.map((data, index) => (
              <Widget
                src="${config_account}/widget/Mintbase.NFT.Index"
                props={{
                  data,
                  isDarkModeOn,
                  connectedDao: connectedDao,
                }}
                key={index}
              />
            ))
          : ""}
      </div>
    </HomeContracts>
  );
};

return (
  <HomeContractsPage
    isDarkModeOn={props.isDarkModeOn}
    connectedDao={props.connectedDao}
    tabs={props.tabs}
  />
);
