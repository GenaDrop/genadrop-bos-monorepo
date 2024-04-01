const { delist } = VM.require(
  "/*__@appAccount__*//widget/Mintbase.NFT.modules"
);

const nearIcon = (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 18 18"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-black dark:text-white"
  >
    <path
      d="M5.10976 4.05615C5.47596 4.05615 5.81596 4.24601 6.00779 4.55812L8.07455 7.62657C8.14188 7.7277 8.11455 7.86404 8.01343 7.93136C7.93145 7.98601 7.823 7.97925 7.74835 7.91502L5.71399 6.15052C5.68019 6.1201 5.62807 6.12319 5.59765 6.157C5.58385 6.17249 5.57652 6.19249 5.57652 6.21305V11.7376C5.57652 11.7832 5.61343 11.8198 5.65906 11.8198C5.68357 11.8198 5.70667 11.8091 5.72216 11.7902L11.8717 4.42911C12.072 4.19277 12.3661 4.05643 12.6757 4.05615H12.8906C13.4723 4.05615 13.9438 4.5277 13.9438 5.10939V12.8902C13.9438 13.4719 13.4723 13.9435 12.8906 13.9435C12.5244 13.9435 12.1844 13.7536 11.9926 13.4415L9.92582 10.3731C9.8585 10.2719 9.88582 10.1356 9.98695 10.0683C10.0689 10.0136 10.1774 10.0204 10.252 10.0846L12.2864 11.8491C12.3202 11.8795 12.3723 11.8764 12.4027 11.8426C12.4165 11.8271 12.4238 11.8071 12.4236 11.7866V6.26066C12.4236 6.21503 12.3867 6.17841 12.341 6.17841C12.3168 6.17841 12.2934 6.18911 12.2779 6.20798L6.1292 13.5705C5.92892 13.8069 5.63483 13.9432 5.32526 13.9435H5.11033C4.52864 13.9438 4.05681 13.4725 4.05624 12.8908V5.10939C4.05624 4.5277 4.52779 4.05615 5.10948 4.05615H5.10976Z"
      fill="currentColor"
    ></path>
  </svg>
);

const DelistContainer = styled.div`
  width: 900px;
  height: 542px;
  background: #fff;
  padding-top: 15px;
  .bodyContent {
    border-radius: 0.25rem;
    width: 9rem;
    height: 1rem;
    background-color: #6b7280;
    @media (max-width: 950px) {
      width: auto;
    }
  }
  .noListing {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 30px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  height: 60px;

  border-bottom: 1px solid #e7ebee;
  p {
    font-weight: bold;
  }
  p:last-child {
    cursor: pointer;
  }
`;

const ContainerTable = styled.div`
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  display: flex;
  flex-direction: column;
  overflow-x: scroll; /* Prevent horizontal overflow */
  margin: 10px;

  @media (max-width: 500px) {
    width: 100vw;
    font-size: 12px;
  }

  .header {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    color: ${isDarkModeOn ? "#4B5563" : "black"};
    margin-bottom: 1rem;
    font-weight: 500px;
    div {
      padding-bottom: 1rem;
      text-align: center;
      border-bottom: 2px solid ${isDarkModeOn ? "#374151" : "#E5E7EB"};
    }
  }

  .trx-row {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 3fr));
    width: 100%;
    font-size: 15px;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid ${color}5a;
    &:last-of-type {
      border-bottom-color: transparent;
    }

    a {
      text-decoration: none;
    }
    div,
    a,
    span {
      text-align: center;
      margin: auto;
    }

    .address {
      color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 2px;
      transition: all 200ms;
      :hover {
        color: #eee;
      }
    }
    .title {
      display: flex;
      align-items: center;
      text-decoration: none;
      gap: 10px;

      div {
        white-space: nowrap;
        height: 40px;
        display: flex;
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 2px;
        transition: all 200ms;
        :hover {
          color: #000000;
        }
      }
      img {
        object-fit: cover;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .kind {
      width: fit-content;
      height: fit-content;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 0.9;
      padding: 4px;
      border-radius: 2px;
      text-transform: uppercase;
    }

    .time {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
      svg {
        box-sizing: content-box;
        height: 14px;
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        cursor: pointer;
        padding: 10px;
        border-radius: 2px;
        transition: all 200ms ease 0s;
        :hover {
          fill: black;
        }
      }
    }
  }

  .price {
    display: flex;
    gap: 4px;
    align-items: center;
    font-weight: 600;
    color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
    img {
      width: 14px;
    }
  }

  @media (max-width: 500px) {
    .header,
    .trx-row {
      grid-template-columns: repeat(7, 150px);
    }
  }
`;

const Content = styled.div``;

const Delist = ({ onClose, data }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const YoctoToNear = (amountYocto) => {
    return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
  };
  // console.log(data);
  const _address = (address, _limit) => {
    const limit = _limit || 20;
    if (address.length > limit) return address.slice(0, 10) + "...";
    else return address;
  };

  function fetchNFTDetails() {
    asyncFetch("https://graph.mintbase.xyz/mainnet", {
      method: "POST",
      headers: {
        "mb-api-key": "omni-site",
        "Content-Type": "application/json",
        "x-hasura-role": "anonymous",
      },
      body: JSON.stringify({
        query: `
        query MyQuery {
            mb_views_nft_tokens(
              where: {owner: {_eq: "${data?.owner}"}, metadata_id: {_eq: "${data?.metadata_id}"}}
              order_by: {last_transfer_timestamp: asc}
            ) {
              listings {
                currency
                kind
                token_id
                created_at
                price
                market_id
              }
            }
          }
        `,
      }),
    }).then((data) => {
      if (data.body.data?.mb_views_nft_tokens?.length) {
        setLoading(false);
        console.log(data.body.data?.mb_views_nft_tokens[0]?.listings);
        setListings(data.body.data?.mb_views_nft_tokens[0]?.listings);
      }
    });
  }

  fetchNFTDetails();
  const cols = Array.from(Array().keys());

  function formatTimeDifference(created_at) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const createdTime = new Date(created_at).getTime();
    const currentTime = new Date().getTime();
    const elapsed = currentTime - createdTime;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  }

  const handleDelist = (token) => {
    if (!token) return;
    delist(data?.nft_contract_id, [token], true);
  };

  return (
    <DelistContainer>
      <Top>
        <p>Remove</p>
        <p onClick={onClose}>X</p>
      </Top>
      <Content>
        <ContainerTable>
          <div className="header">
            <div className="item2">Token ID</div>
            <div className="item3">Listing</div>
            <div className="item4">Price</div>
            <div className="item4">Created</div>
            <div className="item4">Actions</div>
          </div>
          <div>
            {loading ? (
              Array.from(Array(7).keys()).map((_, i) => (
                <tr className="animate-pulse" key={`row-${i}`}>
                  {cols.map((_, i) => (
                    <td key={`col-${i}`}>
                      <div className="bodyContent"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : listings.length ? (
              listings.map((listing, index) => (
                <div key={index} className="trx-row">
                  <div className="item1">
                    <span>{listing?.token_id}</span>
                  </div>
                  <div className="item2">
                    {listing?.type === "simple" ? "Simple Sale" : "-"}
                  </div>

                  <div className="item3">
                    <div className="price">
                      {YoctoToNear(listing?.price)}
                      {nearIcon}
                    </div>
                  </div>
                  <div className="item2">
                    {formatTimeDifference(listing?.created_at)}
                  </div>

                  <div
                    onClick={() => handleDelist(listing?.token_id)}
                    style={{ color: "red", cursor: "pointer" }}
                    className="item4"
                  >
                    Remove Listing
                  </div>
                </div>
              ))
            ) : (
              <div className="noListing">No Listing</div>
            )}
          </div>
        </ContainerTable>
      </Content>
    </DelistContainer>
  );
};

return <Delist {...props} />;
