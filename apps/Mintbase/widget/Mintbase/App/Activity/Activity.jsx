const { IsDarkModeOn, accountId } = props;

const { getInputLabelFontType } = VM.require(
  "${config_account}/widget/Mintbase.components"
);

const nearSvg = (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-black dark:text-white"
  >
    <path
      d="M5.10976 4.05615C5.47596 4.05615 5.81596 4.24601 6.00779 4.55812L8.07455 7.62657C8.14188 7.7277 8.11455 7.86404 8.01343 7.93136C7.93145 7.98601 7.823 7.97925 7.74835 7.91502L5.71399 6.15052C5.68019 6.1201 5.62807 6.12319 5.59765 6.157C5.58385 6.17249 5.57652 6.19249 5.57652 6.21305V11.7376C5.57652 11.7832 5.61343 11.8198 5.65906 11.8198C5.68357 11.8198 5.70667 11.8091 5.72216 11.7902L11.8717 4.42911C12.072 4.19277 12.3661 4.05643 12.6757 4.05615H12.8906C13.4723 4.05615 13.9438 4.5277 13.9438 5.10939V12.8902C13.9438 13.4719 13.4723 13.9435 12.8906 13.9435C12.5244 13.9435 12.1844 13.7536 11.9926 13.4415L9.92582 10.3731C9.8585 10.2719 9.88582 10.1356 9.98695 10.0683C10.0689 10.0136 10.1774 10.0204 10.252 10.0846L12.2864 11.8491C12.3202 11.8795 12.3723 11.8764 12.4027 11.8426C12.4165 11.8271 12.4238 11.8071 12.4236 11.7866V6.26066C12.4236 6.21503 12.3867 6.17841 12.341 6.17841C12.3168 6.17841 12.2934 6.18911 12.2779 6.20798L6.1292 13.5705C5.92892 13.8069 5.63483 13.9432 5.32526 13.9435H5.11033C4.52864 13.9438 4.05681 13.4725 4.05624 12.8908V5.10939C4.05624 4.5277 4.52779 4.05615 5.10948 4.05615H5.10976Z"
      fill="currentColor"
    ></path>
  </svg>
);

const Root = styled.div`
  width: 100%;
  overflow: hidden;
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  margin: 30px 0;
  .title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const Row = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: center;
  padding: 10px 20px;
  overflow: scroll;
`;

const Container = styled.div`
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
    grid-template-columns: repeat(6, minmax(0, 1fr));
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    color: ${isDarkModeOn ? "#4B5563" : "black"};
    margin-bottom: 1rem;
    ${getInputLabelFontType("big")}
    font-weight: 500px;
    div {
      padding-bottom: 1rem;
      text-align: center;
      border-bottom: 2px solid ${isDarkModeOn ? "#374151" : "#E5E7EB"};
    }
    ${cursomStyle}
  }

  .trx-row {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 3fr));
    width: 100%;
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
        background: ${color};
        color: white;
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
        font-size: 14px;
        border-radius: 2px;
        transition: all 200ms;
        :hover {
          background: ${color};
          color: white;
        }
      }
      img {
        object-fit: cover;
        width: 40px;
        height: 40px;
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
          fill: white;
          background: ${color};
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
      grid-template-columns: repeat(6, 150px);
    }
  }
`;

const ContainerCard = styled.div`
  .info-card {
    border-radius: 0.25rem;
    background: ${IsDarkModeOn ? "var(--gray-800)" : "rgba(40,42,58,0.1)"};
    &.small,
    &.medium,
    &.big {
      padding: 8px;
      min-height: 46px;
      @media (min-width: 480px) {
        min-height: 72px;
        padding: 12px;
      }
    }
    @media (min-width: 976px) {
      .info-card.small {
        min-width: 160px;
      }
    }
    .title-wrapper {
      display: flex;
      position: relative;
      align-items: center;
    }
  }
`;

const Title = styled.div`
  color: ${IsDarkModeOn ? "var(--gray-300)" : "var(--gray-700)"};
  font-size: 13px;
`;
const Description = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  magrin: 5px 0;
  .description-rt {
    display: flex;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
  }
`;

const [analyticsData, setAnalyticsData] = useState([]);
const [totalTransactionCount, setTotalTransactionCount] = useState(0);
const [totalMintbaseTransactions, seTotalMintbaseTransactions] = useState(0);
const [page, setPage] = useState(1);

const fetchActivity = (offset) => {
  return asyncFetch("https://graph.mintbase.xyz", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query v2_omnisite_GetActivity($limit: Int!, $offset: Int!) {
        activities: mb_views_nft_activities(
          limit: $limit
          offset: $offset
          order_by: { timestamp: desc }
        ) {
          kind
          description
          media
          title
          timestamp
          nft_contract_id
          action_sender
          receipt_id
          action_receiver
          token_id
          price
          currency
          metadata_id
          nft_contract {
            name
            id
            base_uri
          }
        }
        totalItems: nft_activities_aggregate {
          aggregate {
            count
          }
        }
      }
  `,
      variables: {
        limit: 100,
        offset: offset ?? 0,
      },
    }),
  });
};

const fetchTotalCount = () => {
  return asyncFetch("https://graph.mintbase.xyz", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query v2_omnisite_GetCount {
        totalItems: nft_activities_aggregate {
          aggregate {
            count
          }
        }
        mintbaseOnly: nft_activities_aggregate(
          where: {nft_contract_id: {_like: "%.mintbase1.near"}}
        ) {
          aggregate {
            count
            __typename
          }
          __typename
        }
      }
  `,
    }),
  });
};

useEffect(() => {
  fetchTotalCount().then((data) => {
    if (data?.body) {
      setTotalTransactionCount(data?.body?.data?.totalItems?.aggregate?.count);
      seTotalMintbaseTransactions(
        data?.body?.data?.mintbaseOnly?.aggregate?.count
      );
    }
  });
}, []);

useEffect(() => {
  fetchActivity((page - 1) * 100).then((data) => {
    if (data?.body) {
      setAnalyticsData(data?.body?.data?.activities);
    }
  });
}, [page]);

const data = [
  {
    title: "Total Transactions (All Near)",
    description: totalTransactionCount,
  },
  {
    title: "Total Transactions MB",
    description: totalMintbaseTransactions,
  },
  {
    title: "24h Transactions (All Near)",
    description: "-",
  },
  {
    title: "24h Transactions MB",
    description: "-",
  },
  {
    title: "24h Minted (All Near)",
    description: "-",
  },
  {
    title: "24hrs Earnings MB",
    description: "-",
  },
];

const _address = (address, _limit) => {
  const limit = _limit || 20;
  if (address.length > limit) return address.slice(0, 20) + "...";
  else return address;
};

const YoctoToNear = (amountYocto) => {
  return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
};
const utcDate2 = new Date();

// Get the current date in the local time zone
const currentDate = new Date();

// Calculate the time zone offset in milliseconds
let localTimeZoneOffsetMinutes = currentDate.getTimezoneOffset();
localTimeZoneOffsetMinutes = localTimeZoneOffsetMinutes * 60 * 1000;

const currentTimestamp = new Date().getTime();
const getTimePassed = (date) => {
  // Get the current timestamp in milliseconds
  const timestamp = new Date(date).getTime();

  // Calculate the difference in milliseconds
  const timePassed = currentTimestamp + localTimeZoneOffsetMinutes - timestamp;

  // Convert milliseconds to seconds, minutes, hours, etc.
  const secondsPassed = Math.floor(timePassed / 1000);
  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(hoursPassed / 24);

  let time = 0;

  // Display the time passed conditionally
  if (daysPassed > 0) {
    time = `${daysPassed} days`;
  } else if (hoursPassed > 0) {
    time = `${hoursPassed} hours`;
  } else if (minutesPassed > 0) {
    time = `${minutesPassed} minutes`;
  } else {
    time = `${secondsPassed} seconds`;
  }
  return time;
};

return (
  <div>
    <Row>
      {data.map((dt) => (
        <ContainerCard>
          <div className="info-card medium">
            <div className={`title-wrapper`}>
              <Title>{dt.title}</Title>
            </div>
            <Description>
              <div className="description-rt">
                {dt.description?.toLocaleString()}
              </div>
            </Description>
          </div>
        </ContainerCard>
      ))}
    </Row>
    <Root>
      <div className="title">Transactions</div>
      <Container>
        <div className="header">
          <div>Event</div>
          <div>NFT</div>
          <div>From</div>
          <div>To</div>
          <div> Price</div>
          <div>Date</div>
        </div>
        <div>
          {analyticsData.length &&
            analyticsData
              // .slice(page * perPage, (page + 1) * perPage)
              .map((activity) => {
                const hashData = fetch(
                  "https://api.nearblocks.io/v1/search?keyword=" +
                    activity.receipt_id
                );
                return (
                  <div className="trx-row" key={activity.receipt_id}>
                    <div
                      style={{
                        background: kindColor[activity.kind] + "40",
                        color: isDarkModeOn ? "#fff" : kindColor[activity.kind],
                      }}
                      className="kind"
                    >
                      {activity.kind}
                    </div>
                    <a
                      href={
                        activity.metadata_id
                          ? `https://mintbase.xyz/meta/${activity?.metadata_id?.replace(
                              ":",
                              "%3A"
                            )}`
                          : "#"
                      }
                      target="_blank"
                      className="title"
                    >
                      {" "}
                      <img
                        src={
                          "https://image-cache-service-z3w7d7dnea-ew.a.run.app/media?url=" +
                          activity.media
                        }
                        alt={activity.title}
                      />
                      {activity?.title && (
                        <div>{_address(activity?.title)}</div>
                      )}
                    </a>
                    <Widget
                      src="near/widget/AccountProfileOverlay"
                      props={{
                        accountId: activity.action_sender,
                        children: (
                          <a
                            href={
                              "https://near.org/near/widget/ProfilePage?accountId=" +
                              activity.action_sender
                            }
                            className="address"
                            target="_blank"
                          >
                            {_address(activity.action_sender)}{" "}
                          </a>
                        ),
                      }}
                    />
                    <Widget
                      src="near/widget/AccountProfileOverlay"
                      props={{
                        accountId: activity.action_receiver,
                        children: (
                          <a
                            href={
                              "https://near.org/near/widget/ProfilePage?accountId=" +
                              activity.action_receiver
                            }
                            className="address"
                            target="_blank"
                          >
                            {_address(activity.action_receiver)}{" "}
                          </a>
                        ),
                      }}
                    />

                    <div>
                      {" "}
                      {activity.price ? (
                        <div className="price">
                          {YoctoToNear(activity.price)}
                          {nearSvg}
                        </div>
                      ) : (
                        <div className="price">-</div>
                      )}{" "}
                    </div>
                    <div className="time">
                      {" "}
                      {getTimePassed(activity.timestamp)} ago{" "}
                      {hashData.body.receipts[0]
                        ?.originated_from_transaction_hash && (
                        <a
                          href={
                            "https://nearblocks.io/txns/" +
                            hashData.body.receipts[0]
                              ?.originated_from_transaction_hash
                          }
                          target="_blank"
                        >
                          <svg
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m432 320h-32a16 16 0 0 0 -16 16v112h-320v-320h144a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16h-160a48 48 0 0 0 -48 48v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-128a16 16 0 0 0 -16-16zm56-320h-128c-21.37 0-32.05 25.91-17 41l35.73 35.73-243.73 243.64a24 24 0 0 0 0 34l22.67 22.63a24 24 0 0 0 34 0l243.61-243.68 35.72 35.68c15 15 41 4.5 41-17v-128a24 24 0 0 0 -24-24z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
        </div>
      </Container>
      <p className="w-100 px-4">
        <Widget
          src="${config_account}/widget/Mintbase.TablePagination"
          props={{
            totalItems: totalTransactionCount,
            isDarkModeOn,
            itemsPerPage: 100,
            currentPage: page,
            onPageChange: (page) => setPage(page),
          }}
        />
      </p>
    </Root>
  </div>
);
