const cursomStyle = props.cursomStyle || "";
const perPage = props.perPage || 100; // need to be less than 50
const color = props.color || "#c2cdfd";
const { getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);

const { isDarkModeOn, contract } = props;

const [page, setPage] = useState(1);
const [data, setData] = useState(null);

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreib2cfbayerbbnoya6z4qcywnizqrbkzt5lbqe32whm2lubw3sywr4";
const _address = (address, _limit) => {
  const limit = _limit || 20;
  if (address.length > limit) return address.slice(0, 10) + "...";
  else return address;
};
const YoctoToNear = (amountYocto) => {
  return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
};

const { getTimePassed, getActivityByContract } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.sdk"
) || {
  getTimePassed: () => {},
  getActivityByContract: () => {},
};

useEffect(() => {
  getActivityByContract({
    contract,
    limit: perPage,
    offset: (page - 1) * perPage,
  })
    .then(({ data, errors }) => {
      if (errors) {
        // handle those errors like a pro
        console.error(errors);
      }
      // do something great with this precious data
      console.log(data);
      setData(data);
    })
    .catch((error) => {
      // handle errors from fetch itself
      console.error(error);
    });
}, [limit, offset, page, contract]);
const nft_activities = data?.activities;
const totalItems = data?.totalItems?.aggregate?.count;
if (!nft_activities) return "Loading ...";

const Root = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Container = styled.div`
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  display: flex;
  flex-direction: column;
  overflow-x: scroll; /* Prevent horizontal overflow */
  margin: 10px;
  border-radius: 4px;

  @media (max-width: 500px) {
    width: 100vw;
    font-size: 12px;
  }

  .topic_line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    color: ${isDarkModeOn ? "#fff" : "#000"};
    margin-bottom: 1rem;
    border-bottom: 1px solid ${isDarkModeOn ? "#D2D4DA3a" : "#282A3A3a"};
    p {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .header {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    color: ${isDarkModeOn ? "#B3B5BD" : "#404252"};
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
    div:first-child {
      margin: unset;
      margin: auto auto auto 24px;
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
      gap: 0.5rem;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      i {
        box-sizing: content-box;
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        cursor: pointer;
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
    color: ${isDarkModeOn ? "#fff" : "#000"};
    img {
      width: 14px;
      filter: invert(${isDarkModeOn ? 1 : 0});
    }
  }

  @media (max-width: 500px) {
    .header,
    .trx-row {
      grid-template-columns: repeat(6, 150px);
    }
  }
  .tab {
    text-decoration: none;
    text-align: left;
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
        ${isDarkModeOn ? "rgba(59, 130, 246, 0.5)" : "rgba(66, 153, 225, 0.5)"}; /* Ternary for box-shadow */
      background-color: ${isDarkModeOn
        ? "rgba(59, 130, 246, 0.35)"
        : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
    }

    &:hover {
      background-color: ${isDarkModeOn
        ? "rgba(59, 130, 246, 0.15)"
        : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
    }

    cursor: pointer;
    @media (max-width: 768px) {
      padding: 12px;
      font-size: 12px;
      line-height: 14px;
    }
  }
`;

const Trx = styled.div``;
const kindColor = {
  list: "#8c4fe5",
  unlist: "#8c4fe5",
  sale: "#0a7d6c",
  transfer: "#4f58a3",
  make_offer: "#4f58a3",
  mint: "#000000",
};
// const hanldeRoute = (receipt) => {
//   asyncFetch("https://api.nearblocks.io/v1/search?keyword=" + receipt).then(
//     (data) => {
//       const txnHash =
//         "https://nearblocks.io/txns/" +
//         data.body.receipts[0]?.originated_from_transaction_hash;
//       console.log(txnHash);
//       clipboard.writeText(txnHash);
//     }
//   );
// };
return (
  <Root>
    <Container>
      <div className="topic_line">
        <p>Transactions</p>
      </div>
      <div className="header">
        <div>Event</div>
        <div>Store</div>
        <div>From</div>
        <div>To</div>
        <div> Price</div>
        <div>Date</div>
      </div>
      <div>
        {nft_activities.map((activity) => {
          const hashData = fetch(
            `https://${
              contract.endsWith(".testnet") ? "api3-testnet" : "api3"
            }.nearblocks.io/v1/search?keyword=${activity.receipt_id}`
          );
          const regex = /https?:\/\/[^ ]+/;
          const found = regex.test(activity.media);
          const imageUrl = found
            ? activity.media
            : `${activity.base_uri}/${activity.media}`;
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
              <div className="title">
                {" "}
                <img
                  src={
                    "https://image-cache-service-z3w7d7dnea-ew.a.run.app/media?url=" +
                    imageUrl
                  }
                  alt={activity.title}
                />
                <Link
                  to={
                    activity.metadata_id
                      ? `/${config_account}/widget/Mintbase.App.Index?page=nftDetails&metadataId=${activity?.metadata_id?.replace(
                          ":",
                          "%3A"
                        )}`
                      : "#"
                  }
                  target="_blank"
                  className="tab"
                >
                  {activity.title
                    ? activity.title.length > 7
                      ? `${activity.title.substring(0, 6)}...`
                      : activity.title
                    : "No Title"}
                </Link>
              </div>
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
                      className="tab"
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
                      className="tab"
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
                    <img src={nearLogo} alt="NEAR" />
                  </div>
                ) : (
                  <div className="price">-</div>
                )}{" "}
              </div>
              <div className="time">
                {getTimePassed(activity.timestamp)}
                {hashData.body.receipts[0]
                  ?.originated_from_transaction_hash && (
                  <a
                    href={`https://${
                      contract.endsWith("testnet")
                        ? "testnet.nearblocks"
                        : "nearblocks"
                    }.io/txns/${
                      hashData.body.receipts[0]
                        ?.originated_from_transaction_hash
                    }`}
                    target="_blank"
                    className="tab"
                  >
                    <i class="bi bi-box-arrow-up-right"></i>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="w-100 px-4">
        <Widget
          src="bos.genadrop.near/widget/Mintbase.TablePagination"
          props={{
            totalItems,
            isDarkModeOn,
            itemsPerPage: perPage,
            currentPage: page,
            onPageChange: (page) => setPage(page),
          }}
        />
      </p>
    </Container>
  </Root>
);
