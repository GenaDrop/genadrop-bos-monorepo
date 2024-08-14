const { MbFeaturedCard } = VM.require(
  "bos.genadrop.near/widget/Mintbase.MbFeaturedCard"
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

const SearchContainer = styled.div`
  padding: 26px;
  .keyword {
    font-size: 14px;
    background: #fff;
    width: max-content;
    border-radius: 8px;
    padding: 0 15px;
    font-weight: 500;
  }
  .link {
    text-decoration: none;
    h2 {
      text-underline: none;
    }
  }
  .contracts {
    h1 {
      margin-bottom: 20px;
      font-size: 14px;
      text-transform: uppercase;
    }
  }
  .user {
    background: ${(props) => (props.isDarkModeOn ? "#1e2131" : "#fff")};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px !important;
    height: 147px;
    border-radius: 8px;
    justify-content: center;
    span {
      width: 15px;
      height: 15px;
      background: #f9f9f9;
    }
    img {
      width: 93px;
      height: 93px;
      border-radius: 50%;
    }
    h2 {
      font-size: 16px;
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
    height: 140px;
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

const Search = ({ tab, isDarkModeOn }) => {
  // const [searchedContracts, setSearchedContracts] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // function getContracts() {
  //   return asyncFetch(
  //     `https://api.mintbase.xyz/stores/liberty.mintbase1.near/filter?args=eyJmaWx0ZXJzIjp7fSwibGltaXQiOjMsIm9mZnNldCI6MCwibGlzdGVkRmlsdGVyIjpmYWxzZSwiYWNjb3VudElkIjpudWxsfQ==`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "*/*",
  //         "Content-Type": "application/json",
  //         "mb-api-key": "omni-site",
  //         "x-hasura-role": "anonymous",
  //       },
  //     }
  //   )
  //     .then((data) => {
  //       if (data.body) {
  //         return setSearchedContracts(JSON.parse(data.body));
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }

  function getUsers() {
    asyncFetch("https://graph.mintbase.xyz", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "mb-api-key": "omni-site",
        "x-hasura-role": "anonymous",
      },
      body: JSON.stringify({
        query: `  
        query v2_omnisite_GetUsersBySearchKeyword(
            $limit: Int!
            $offset: Int!
            $text: String!
          ) @cached {
            minter: mb_store_minters(
              where: { minter_id: { _ilike: $text } }
              distinct_on: minter_id
              limit: $limit
              offset: $offset
            ) {
              account: minter_id
              storeId: nft_contract_id
            }
            minters_aggregate: mb_store_minters_aggregate(
              where: { minter_id: { _ilike: $text } }
              distinct_on: minter_id
            ) {
              aggregate {
                count
              }
            }
          }
          `,
        variables: {
          limit: 48,
          offset: null,
          text: `%${tab}%`,
        },
      }),
    }).then((data) => {
      setLoadingUsers(false);
      if (data?.body) {
        setSearchedUsers(data?.body?.data?.minter);
      }
    });
  }

  const HandleUpSlideUsers = () => {
    if (usersPage < searchedUsers?.length - 1) {
      setUsersPage(usersPage + 1);
    } else {
      setUsersPage(0);
    }
  };
  const HandleDownSlideUser = () => {
    if (usersPage > 0) {
      setUsersPage(usersPage - 1);
    } else {
      setUsersPage(searchedUsers?.length - 1);
    }
  };

  useEffect(() => {
    // getContracts();
    getUsers();
  }, []);

  return (
    <SearchContainer isDarkModeOn={isDarkModeOn}>
      <div className="keyword">
        <p>Search: {tab}</p>
      </div>
      {/* <div className="contracts">
        <h1>{searchedContracts?.results?.length} Contract Results</h1>
        <div>
          {searchedContracts?.results?.length > 0 &&
            searchedContracts?.results?.map((data, key) => (
              <MbFeaturedCard key={key} title={data?.title} />
            ))}
        </div>
      </div> */}
      <div className="contracts">
        <h1 style={{ color: isDarkModeOn ? "#fff" : "" }}>
          {searchedUsers?.length} Humans Results
        </h1>
        {loadingUsers ? (
          <div className="user">
            <span className="animate-pulse"></span>
            <span className="animate-pulse"></span>
          </div>
        ) : searchedUsers?.length > 0 ? (
          <Gallery>
            <div onClick={HandleDownSlideUser} className="arrow-l">
              {rightArrow}
            </div>
            <div className="slider-display">
              <div
                className="slider-track"
                style={{
                  transform: `translateX(-${5 * usersPage}rem)`,
                }}
              >
                {searchedUsers?.length > 0 &&
                  searchedUsers?.map((data) => (
                    <Link
                      className="link"
                      key={data?.account}
                      to={href({
                        widgetSrc:
                          "${config_account}/widget/Mintbase.App.Index",
                        params: {
                          page: "human",
                          tab: "owned",
                          accountId: data?.account,
                        },
                      })}
                    >
                      <div className="user">
                        <img src="https://ipfs.near.social/ipfs/bafkreif677z3rtjdwcaie6lsegkt3lwehpwywus3lcumc5jivp2lx5hi24" />
                        <h2>
                          {data?.account?.length > 20
                            ? `${data?.account?.substring(0, 20)}...`
                            : data?.account}
                        </h2>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <div onClick={HandleUpSlideUsers} className="arrow-r">
              {rightArrow}
            </div>
          </Gallery>
        ) : (
          <h4
            style={{
              color: isDarkModeOn ? "#fff" : "",
              textAlign: "center",
              minHeight: 100,
            }}
          >
            No Result Found
          </h4>
        )}
      </div>
    </SearchContainer>
  );
};

return <Search {...props} />;
