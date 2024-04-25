const { delist } = VM.require("bos.genadrop.near/widget/Mintbase.NFT.modules");
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
const usdtIcon = (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-black dark:text-white"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.9572 6V8.12708H13.4849V9.60186C16.6259 9.75946 18.9825 10.4068 19 11.1826L18.9999 12.8C18.9824 13.5759 16.6259 14.2231 13.4849 14.3807V18H10.5152V14.3807C7.37411 14.2231 5.01749 13.5759 5 12.8L5.00012 11.1826C5.01759 10.4068 7.37411 9.75946 10.5152 9.60186V8.12708H6.04284V6H17.9572ZM12 13.2696C15.3521 13.2696 18.1538 12.7222 18.8395 11.9913C18.258 11.3715 16.1549 10.8837 13.4849 10.7497V12.2938C13.0063 12.3178 12.5095 12.3304 12 12.3304C11.4905 12.3304 10.9937 12.3178 10.5152 12.2938V10.7497C7.84511 10.8837 5.74197 11.3715 5.16051 11.9913C5.84619 12.7222 8.64794 13.2696 12 13.2696Z"
      fill="currentColor"
    ></path>
  </svg>
);
const usdcIcon = (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 18 18"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-black dark:text-white"
  >
    <path
      d="M7.47402 14.1481C7.4776 14.1885 7.47065 14.2292 7.45386 14.2661C7.43706 14.3031 7.41099 14.3351 7.37817 14.359C7.34535 14.3829 7.30691 14.3979 7.26658 14.4025C7.22625 14.4072 7.1854 14.4013 7.148 14.3855C5.94359 13.9999 4.89282 13.2416 4.14728 12.2201C3.40175 11.1986 3 9.96668 3 8.70205C3 7.43741 3.40175 6.20547 4.14728 5.18396C4.89282 4.16245 5.94359 3.40419 7.148 3.01858C7.1854 3.00277 7.22625 2.9969 7.26658 3.00155C7.30691 3.0062 7.34535 3.0212 7.37817 3.0451C7.41099 3.06901 7.43706 3.10099 7.45386 3.13796C7.47065 3.17492 7.4776 3.2156 7.47402 3.25604V3.71913C7.47124 3.78612 7.44975 3.851 7.41197 3.90639C7.3742 3.96179 7.32166 4.00549 7.26031 4.03255C6.30285 4.38214 5.47599 5.01761 4.89178 5.85286C4.30756 6.68811 3.99423 7.68276 3.99423 8.70205C3.99423 9.72134 4.30756 10.716 4.89178 11.5512C5.47599 12.3865 6.30285 13.022 7.26031 13.3716C7.32166 13.3986 7.3742 13.4423 7.41197 13.4977C7.44975 13.5531 7.47124 13.618 7.47402 13.685V14.1481Z"
      fill="currentColor"
    ></path>
    <path
      d="M9.46248 12.4304C9.46248 12.4963 9.4363 12.5595 9.38968 12.6061C9.34307 12.6527 9.27985 12.6789 9.21393 12.6789H8.71681C8.65089 12.6789 8.58767 12.6527 8.54106 12.6061C8.49444 12.5595 8.46826 12.4963 8.46826 12.4304V11.6456C8.03635 11.629 7.62386 11.4618 7.30235 11.1729C6.98084 10.884 6.77059 10.4917 6.70807 10.064C6.70268 10.0308 6.70459 9.99674 6.71368 9.9643C6.72276 9.93185 6.7388 9.90177 6.76068 9.87615C6.78256 9.85052 6.80975 9.82996 6.84037 9.8159C6.87099 9.80184 6.90431 9.79462 6.938 9.79472H7.50499C7.5626 9.79522 7.61827 9.81552 7.66266 9.85223C7.70706 9.88894 7.73746 9.9398 7.74877 9.99629C7.85411 10.4878 8.13969 10.8676 9.00757 10.8676C9.6494 10.8676 10.1047 10.51 10.1047 9.97362C10.1047 9.43711 9.83638 9.23408 8.89366 9.07966C7.50404 8.89264 6.84568 8.47002 6.84568 7.38101C6.86174 6.95441 7.03741 6.5494 7.33791 6.24617C7.63841 5.94294 8.04182 5.76361 8.46826 5.74369V4.97365C8.46826 4.90773 8.49444 4.84451 8.54106 4.7979C8.58767 4.75128 8.65089 4.7251 8.71681 4.7251H9.21393C9.27985 4.7251 9.34307 4.75128 9.38968 4.7979C9.4363 4.84451 9.46248 4.90773 9.46248 4.97365V5.76556C9.82128 5.80342 10.1584 5.95556 10.4242 6.19955C10.69 6.44354 10.8703 6.76647 10.9386 7.12072C10.9453 7.15438 10.9445 7.18912 10.9361 7.22241C10.9278 7.2557 10.9121 7.2867 10.8902 7.31318C10.8684 7.33965 10.8409 7.36093 10.8098 7.37546C10.7787 7.38999 10.7448 7.39742 10.7104 7.3972H10.1876C10.1334 7.39668 10.0808 7.37861 10.0377 7.34569C9.99468 7.31277 9.96346 7.26678 9.94875 7.21461C9.80729 6.73539 9.46482 6.52756 8.86936 6.52756C8.211 6.52756 7.86975 6.84467 7.86975 7.29156C7.86975 7.76292 8.06468 7.99868 9.07239 8.14501C10.4379 8.33184 11.145 8.72201 11.145 9.88414C11.131 10.3335 10.9515 10.7618 10.6409 11.0868C10.3304 11.4118 9.9107 11.6107 9.46248 11.6451V12.4304Z"
      fill="currentColor"
    ></path>
    <path
      d="M10.7825 14.3855C10.7451 14.4013 10.7043 14.4072 10.6639 14.4025C10.6236 14.3979 10.5852 14.3829 10.5523 14.359C10.5195 14.3351 10.4934 14.3031 10.4766 14.2661C10.4599 14.2292 10.4529 14.1885 10.4565 14.1481V13.685C10.4559 13.6172 10.476 13.5508 10.5142 13.4948C10.5524 13.4387 10.6068 13.3957 10.6702 13.3716C11.6277 13.022 12.4545 12.3865 13.0387 11.5512C13.6229 10.716 13.9363 9.72134 13.9363 8.70205C13.9363 7.68276 13.6229 6.68811 13.0387 5.85286C12.4545 5.01761 11.6277 4.38214 10.6702 4.03255C10.6088 4.00549 10.5563 3.96179 10.5185 3.90639C10.4808 3.85099 10.4593 3.78612 10.4565 3.71912V3.25604C10.4529 3.2156 10.4599 3.17492 10.4766 3.13796C10.4934 3.10099 10.5195 3.06901 10.5523 3.0451C10.5852 3.0212 10.6236 3.0062 10.6639 3.00155C10.7043 2.9969 10.7451 3.00277 10.7825 3.01858C11.9869 3.40419 13.0377 4.16245 13.7832 5.18396C14.5288 6.20547 14.9305 7.43741 14.9305 8.70205C14.9305 9.96668 14.5288 11.1986 13.7832 12.2201C13.0377 13.2416 11.9869 13.9999 10.7825 14.3855Z"
      fill="currentColor"
    ></path>
  </svg>
);
const DelistContainer = styled.div`
  width: 900px;
  height: 542px;
  background: ${(props) => (props.isDarkModeOn ? "#1f2031" : "#fff")};
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
    color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
  }
  p:last-child {
    cursor: pointer;
  }
`;
const ContainerTable = styled.div`
  background: ${(props) => (props.isDarkModeOn ? "#1f2031" : "#fff")};
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  margin: 10px;
  min-height: 350px;
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
    color: ${(props) => (props.isDarkModeOn ? "#4B5563" : "black")};
    margin-bottom: 1rem;
    font-weight: 500px;
    div {
      padding-bottom: 1rem;
      text-align: center;
      border-bottom: 2px solid
        ${(props) => (props.isDarkModeOn ? "#374151" : "#E5E7EB")};
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
      color: ${(props) => (props.isDarkModeOn ? "#c2cdfd" : "4e58a2")};
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
        color: ${(props) => (props.isDarkModeOn ? "#c2cdfd" : "4e58a2")};
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 2px;
        transition: all 200ms;
        :hover {
          color: ${(props) => (props.isDarkModeOn ? "#fff" : "#000")};
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
      color: ${(props) => (props.isDarkModeOn ? "#c2cdfd" : "4e58a2")};
      svg {
        box-sizing: content-box;
        height: 14px;
        color: ${(props) =>
          props.isDarkModeOn ? "#c2cdfd" : "4e58a2"} !important;
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
    color: ${(props) => (props.isDarkModeOn ? "#c2cdfd" : "4e58a2")};
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
const RemoveAll = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 24px;
  border-top: 4px solid
    ${(props) => (props.isDarkModeOn ? "#374151" : "#E5E7EB")};
  .button {
    background: ${(props) => (props.isDarkModeOn ? "#374151" : "#E5E7EB")};
    border: none;
    padding: 8px 16px;
    border-radius: 7px;
  }
`;
const Content = styled.div``;
const Delist = ({ onClose, data, isDarkModeOn }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const YoctoToNear = (amountYocto) => {
    return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
  };
  const _address = (address, _limit) => {
    const limit = _limit || 20;
    if (address.length > limit) return address.slice(0, 10) + "...";
    else return address;
  };
  function fetchNFTDetails() {
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
        query v2_omnisite_GetTokenByThingID($thingId: String!, $limit: Int, $offset: Int, $search_fields: [mb_views_nft_tokens_bool_exp!]) {
          token: mb_views_nft_tokens(
            where: {metadata_id: {_eq: $thingId}, burned_timestamp: {_is_null: true}, _or: $search_fields}
            limit: $limit
            offset: $offset
          ) {
            id: token_id
            ownerId: owner
            listings(
              where: {unlisted_at: {_is_null: true}, accepted_at: {_is_null: true}, invalidated_at: {_is_null: true}}
            ) {
              currency
              kind
              price
              created_at
              market_id
              __typename
            }
            __typename
          }
          tokens_aggregate: mb_views_nft_tokens_aggregate(
            where: {metadata_id: {_eq: $thingId}, burned_timestamp: {_is_null: true}, _or: $search_fields}
          ) {
            aggregate {
              count
              __typename
            }
            __typename
          }
          listed_aggregate: mb_views_nft_tokens_aggregate(
            where: {metadata_id: {_eq: $thingId}, burned_timestamp: {_is_null: true}, listings: {unlisted_at: {_is_null: true}, accepted_at: {_is_null: true}, invalidated_at: {_is_null: true}}, _or: $search_fields}
          ) {
            aggregate {
              count
              __typename
            }
            __typename
          }
        }        
        `,
        variables: {
          thingId: data?.metadata_id,
          search_fields: {
            owner: {
              _eq: data?.owner,
            },
          },
        },
      }),
    }).then((data) => {
      if (data?.body?.data) {
        setLoading(false);
        setListings(data?.body?.data?.token);
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
  const delistMultiple = () => {
    const tokenIds = listings?.map((data) => data?.id);
    delist(data?.nft_contract_id, tokenIds, true);
  };
  const listingType = {
    near: nearIcon,
    "ft::a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near":
      usdcIcon,
    "ft::dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near":
      usdtIcon,
    "usdc.fakes.testnet": usdcIcon,
    "usdt.fakes.testnet": usdtIcon,
  };
  return (
    <DelistContainer isDarkModeOn={isDarkModeOn}>
      <Top isDarkModeOn={isDarkModeOn}>
        <p>Remove</p>
        <p onClick={onClose}>X</p>
      </Top>
      <Content isDarkModeOn={isDarkModeOn}>
        <ContainerTable isDarkModeOn={isDarkModeOn}>
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
              listings.map((tokenItem, index) => (
                <div key={tokenItem.id}>
                  {tokenItem?.listings &&
                    tokenItem.listings.map((listing, index) => (
                      <div key={index} className="trx-row">
                        <div className="time">
                          <span>{tokenItem.id}</span>
                        </div>
                        <div className="time">
                          {listing.kind === "simple" ? "Simple Sale" : "-"}
                        </div>
                        <div className="item3">
                          <div className="price">
                            {listing?.currency === "near"
                              ? YoctoToNear(listing.price)
                              : (listing?.price / 1000000).toFixed(2)}
                            {listingType[listing?.currency]}
                          </div>
                        </div>
                        <div className="time">
                          {formatTimeDifference(listing.created_at)}
                        </div>
                        <div
                          onClick={() => handleDelist(tokenItem.id)}
                          style={{ color: "red", cursor: "pointer" }}
                          className="item4"
                          disabled={index === 0} // disable only for the first listing
                        >
                          Remove Listing
                        </div>
                      </div>
                    ))}
                  {tokenItem.listings.length === 0 && (
                    <div className="trx-row">
                      <div className="item1">
                        <span>{tokenItem.id}</span>
                      </div>
                      <div className="item2">-</div>
                      <div className="item3">-</div>
                      <div className="item2">-</div>
                      <div className="item4">-</div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="noListing">No Listing</div>
            )}
          </div>
        </ContainerTable>
        <RemoveAll isDarkModeOn={isDarkModeOn}>
          <button
            disabled={listings?.map((data) => data?.id)?.length > 15}
            onClick={delistMultiple}
            className="button"
          >
            Remove Max (15) Listings
          </button>
        </RemoveAll>
      </Content>
    </DelistContainer>
  );
};
return <Delist {...props} />;
