const { getOffersToAccount, getTimePassed } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.sdk"
) || {
  getOffersToAccount: () => <></>,
  getTimePassed: () => <></>,
};
const accountId = props.accountId || context.accountId;
const perPage = 50;
const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreib2cfbayerbbnoya6z4qcywnizqrbkzt5lbqe32whm2lubw3sywr4";
const _address = (address, _limit) => {
  const limit = _limit || 20;
  if (address.length > limit) return address.slice(0, 10) + "...";
  else return address;
};
const YoctoToNear = (offer_priceYocto) => {
  return new Big(offer_priceYocto || 0)
    .div(new Big(10).pow(24))
    .toFixed(2)
    .toString();
};
const OffersToAccount = ({ isDarkModeOn }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [showTable, setShowTable] = useState(true);
  useEffect(() => {
    getOffersToAccount({
      account: accountId,
      limit: perPage,
      offset: (page - 1) * perPage,
    })
      .then(({ data, errors }) => {
        if (errors) {
          // handle those errors like a pro
          console.error(errors);
        }
        // do something great with this precious data
        console.log("data", data);
        setData(data);
      })
      .catch((error) => {
        // handle errors from fetch itself
        console.error(error);
      });
  }, [limit, offset, page]);
  const Container = styled.div`
    background: ${isDarkModeOn ? "#1f2031" : "#fff"};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    height: fit-content;
    flex: 1;
    width: 100%;
    @media (max-width: 500px) {
      width: 100vw;
      min-width: 100vw;
      font-size: 12px;
    }
    .topic_line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 1.5rem;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      border-bottom: 1px solid
        ${showTable
          ? isDarkModeOn
            ? "rgba(40, 42, 58, 1)"
            : "rgba(210, 212, 218, 1)"
          : "transparent"};
      cursor: pointer;
      i {
        transition: all 300ms;
        font-size: 1.5rem;
      }
      p {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .table_main {
      display: flex;
      overflow: auto;
      flex-direction: column;
      width: 100%;
      .header {
        display: grid;
        grid-template-columns: repeat(6, minmax(150px, 1fr));
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
        color: ${isDarkModeOn ? "#B3B5BD" : "#404252"};
        margin-bottom: 1rem;
        font-weight: 500px;
        div {
          padding-bottom: 1rem;
          text-align: center;
          border-bottom: 2px solid
            ${isDarkModeOn ? "rgba(16,18,35,1)" : "rgba(210,212,218,1)"};
        }
        & > div:first-child {
          text-align: left;
          padding-left: 28px;
        }
        ${cursomStyle}
      }
      .trx-row {
        display: grid;
        grid-template-columns: repeat(6, minmax(150px, 3fr));
        justify-content: space-between;
        padding: 1rem 0;
        border-bottom: 1px solid
          ${isDarkModeOn ? "rgba(40, 42, 58, 1)" : "rgba(210, 212, 218, 1)"};
        div,
        a,
        span {
          text-align: center;
          margin: auto;
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
          color: ${isDarkModeOn
            ? "#C5D0FF"
            : "#4F58A3"}; /* Ternary for text color */
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
              ${isDarkModeOn
                ? "rgba(59, 130, 246, 0.5)"
                : "rgba(66, 153, 225, 0.5)"}; /* Ternary for box-shadow */
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
        & > div:first-child {
          margin: unset;
          margin: auto auto auto 24px;
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
    }
  `;
  const tableToggleHander = () => {
    setShowTable((prev) => !prev);
  };
  const acceptAndTransferHandler = () => null;
  const offers = data.mb_views_auctions_with_offer;
  const totalItems =
    data.mb_views_auctions_with_offer_aggregate.aggregate.count;
  console.log("offers", offers);
  return (
    <Container>
      <div className="topic_line" onClick={tableToggleHander}>
        <p>Offered To Me</p>
        <i
          className={`bi bi-chevron-${showTable ? "up" : "down"}`}
          style={{
            fontSize: "1.5rem",
          }}
        ></i>
      </div>
      {showTable && (
        <div className="table_main">
          <div className="header">
            <div>ID</div>
            <div>NFT</div>
            <div>Amount</div>
            <div>From</div>
            <div>Action</div>
            <div>Created</div>
          </div>
          <div>
            {offers &&
              offers.map((offer) => {
                const hashData = fetch(
                  `https://${
                    accountId.endsWith(".testnet") ? "api3-testnet" : "api3"
                  }.nearblocks.io/v1/search?keyword=${offer.receipt_id}`
                );
                const regex = /https?:\/\/[^ ]+/;
                const found = regex.test(offer.media);
                const imageUrl = found
                  ? offer.media
                  : `${offer.base_uri}/${offer.media}`;
                return (
                  <div className="trx-row" key={offer.offer_id}>
                    <div>
                      <Link
                        to={
                          offer.metadata_id
                            ? `/bos.genadrop.near/widget/Mintbase.App.Index?page=nftDetails&metadataId=${offer?.metadata_id?.replace(
                                ":",
                                "%3A"
                              )}`
                            : "#"
                        }
                        target="_blank"
                        className="title tab"
                      >
                        {offer?.offer_id ? offer.offer_id : "No ID"}
                      </Link>
                    </div>
                    <div className="title">
                      {" "}
                      <img
                        src={
                          "https://image-cache-service-z3w7d7dnea-ew.a.run.app/media?url=" +
                          imageUrl
                        }
                        alt={offer.title}
                      />
                      <Link
                        to={
                          offer.metadata_id
                            ? `/bos.genadrop.near/widget/Mintbase.App.Index?page=nftDetails&metadataId=${offer?.metadata_id?.replace(
                                ":",
                                "%3A"
                              )}`
                            : "#"
                        }
                        target="_blank"
                        className="tab"
                      >
                        {offer.title
                          ? offer.title.length > 7
                            ? `${offer.title.substring(0, 6)}...`
                            : offer.title
                          : "No Title"}
                      </Link>
                    </div>
                    <div>
                      {" "}
                      {offer.offer_price ? (
                        <div className="price">
                          {YoctoToNear(offer.offer_price)}
                          <img src={nearLogo} alt="NEAR" />
                        </div>
                      ) : (
                        <div className="price">-</div>
                      )}{" "}
                    </div>
                    <Widget
                      src="near/widget/AccountProfileOverlay"
                      props={{
                        accountId: offer.offered_by,
                        children: (
                          <a
                            href={
                              "https://near.org/near/widget/ProfilePage?accountId=" +
                              offer.offered_by
                            }
                            className="address tab"
                            target="_blank"
                          >
                            {_address(offer.offered_by)}{" "}
                          </a>
                        ),
                      }}
                    />
                    <div className="tab" onClick={acceptAndTransferHandler}>
                      Take
                    </div>
                    <div className="time">
                      {getTimePassed(offer.offered_at)}
                      {hashData.body.receipts[0]
                        ?.originated_from_transaction_hash && (
                        <a
                          href={`https://${
                            accountId.endsWith("testnet")
                              ? "testnet.nearblocks"
                              : "nearblocks"
                          }.io/txns/${
                            hashData.body.receipts[0]
                              ?.originated_from_transaction_hash
                          }`}
                          className="tab"
                          target="_blank"
                        >
                          <i class="bi bi-box-arrow-up-right"></i>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          {!offers.length && (
            <p className="trx-row">
              <div>No offers yet</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
            </p>
          )}
        </div>
      )}
      {showTable && (
        <p className="w-100 px-4">
          <Widget
            src="bos.genadrop.near/widget/Mintbase.TablePagination"
            props={{
              totalItems,
              isDarkModeOn,
              itemsPerPage: offers.length,
              currentPage: page,
              onPageChange: (page) => setPage(page),
            }}
          />
        </p>
      )}
    </Container>
  );
};
return <OffersToAccount {...props} />;
