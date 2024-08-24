const { Pagination } = VM.require("buildhub.near/widget/components") || {
  Pagination: () => <></>,
};

const { getStoreNFTs } = VM.require(
  "${config_account}/widget/Mintbase.utils.sdk"
);

const ContractNFTs = ({ contractId, isDarkModeOn, showFilters }) => {
  const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 24px;
    border-radius: 0.7em;
    width: 100%;
    justify-content: center;
    margin: 1em auto;
    @media (max-width: 500px) {
      margin-left: 0.5rem !important;
    }
    @media (max-width: 380px) {
      margin-left: 0.1rem !important;
    }
  `;

  const perPage = 52;
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countNFTs, setCountNFTs] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [showListed, setShowListed] = useState(false);
  const [showOwnedByMe, setShowOwnedByMe] = useState(false);

  const YoctoToNear = (offer_priceYocto) => {
    return new Big(offer_priceYocto || 0)
      .div(new Big(10).pow(24))
      .toFixed(2)
      .toString();
  };

  useEffect(() => {
    getStoreNFTs({
      offset: (pageNumber - 1) * perPage,
      id: contractId,
      limit: perPage,
      listedFilter: showListed,
      ownedFilter: showOwnedByMe,
      accountId: context.accountId,
    })
      .then(({ results, totalRecords, errors }) => {
        if (errors) {
          // handle those errors like a pro
          console.error(errors);
        }
        // do something great with this precious data
        setCountNFTs(totalRecords);
        setLoading(false);
        setNftData(results);
      })
      .catch((error) => {
        // handle errors from fetch itself
        console.error(error);
      });
  }, [limit, offset, pageNumber, showListed, showOwnedByMe]);

  const listedToggleHandler = () => {
    setShowListed((prev) => !prev);
  };

  const ownedToggleHandler = () => {
    setShowOwnedByMe((prev) => !prev);
  };

  const WrapCards = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;

    gap: 20px;
    @media (max-width: 500px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .count {
      text-transform: uppercase;
      font-weight: 400;
      font-size: 16px;
      color: ${isDarkModeOn ? "#B3B5BD" : "#525c76"};
    }
    .pagination_container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: center;
    }
  `;

  const LeftFilter = styled.div`
    background: ${isDarkModeOn ? "rgba(30, 32, 48, 1)" : "#fff"};
    width: 22%;
    height: 100%;
    padding: 15px;
    border-radius: 4px;
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    gap: 24px;
    flex-flow: column nowrap;
    h2 {
      font-size: 14px;
      font-weight: bold;
    }
    .switch {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
  `;

  const MainContent = styled.div`
    flex: 1;
    width: 100%;
  `;

  const s = countNFTs > 1 ? "s" : "";

  return (
    <WrapCards>
      {showFilters && (
        <LeftFilter>
          <h2>Status</h2>
          <div className="switch">
            <Widget
              src={`${config_account}/widget/Mintbase.MbSwitch`}
              props={{
                id: "showListed",
                label: "Show only Listed",
                value: showListed,
                onChange: listedToggleHandler,
                isDarkModeOn,
              }}
            />
            <Widget
              src={`${config_account}/widget/Mintbase.MbSwitch`}
              props={{
                id: "showOwned",
                label: "Show only Owned by me",
                value: showOwnedByMe,
                onChange: ownedToggleHandler,
                isDarkModeOn,
              }}
            />
          </div>
        </LeftFilter>
      )}
      <MainContent>
        <div className="count">{`${
          countNFTs ? countNFTs?.toLocaleString() : 0
        } Result${s}`}</div>
        {countNFTs > 0 ? (
          <>
            <Cards>
              {nftData &&
                nftData.map((data, index) => (
                  <Widget
                    src="${config_account}/widget/Mintbase.NFT.Index"
                    props={{
                      data,
                      key: index,
                      isDarkModeOn,
                      isConnected,
                      connectedDao: props?.connectedDao,
                    }}
                  />
                ))}
            </Cards>
            <div className="pagination_container">
              <p className="w-100 px-4">
                <Widget
                  src="${config_account}/widget/Mintbase.TablePagination"
                  props={{
                    totalItems: countNFTs,
                    isDarkModeOn,
                    itemsPerPage: perPage,
                    notInTable: true,
                    currentPage: pageNumber,
                    onPageChange: (pageNumber) => setPageNumber(pageNumber),
                  }}
                />
              </p>
            </div>
          </>
        ) : showListed && !showOwnedByMe ? (
          <h5>The user has not listed any NFTs yet.</h5>
        ) : !showListed && showOwnedByMe ? (
          <h5>The user does not own any NFTs yet.</h5>
        ) : (
          <h5>The store has no NFTs yet.</h5>
        )}
      </MainContent>
    </WrapCards>
  );
};

return <ContractNFTs {...props} />;
