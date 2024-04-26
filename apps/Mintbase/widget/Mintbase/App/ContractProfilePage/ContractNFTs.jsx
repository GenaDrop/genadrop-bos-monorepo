const { contractId, isDarkModeOn } = props;

const { Pagination } = VM.require("buildhub.near/widget/components") || {
  Pagination: () => <></>,
};

const { getStoreNFTs } = VM.require(
  "${config_account}/widget/Mintbase.utils.sdk"
);

const Card = styled.div`
  padding: 1em;
  border: 1px solid #e5e8eb;
  gap: 2em;
  margin: 10px auto;
  border-radius: 0.7em;
  & input {
    display: block;
    padding: 0.5em;
    width: 100%;
    border: 1px solid #e5e8eb;
    border-radius: 10px;
    outline: none;
    background: #f4f5f6;
    color: #525c76;
    :focus {
      box-shadow: none;
      border: 1px solid #0d99ff;
    }
    &::placeholder {
      color: palevioletred;
    }
  }
  .soulbound {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
  border-radius: 0.7em;
  width: 100%;
  margin-top: 1em;
`;

const [nftData, setNftData] = useState([]);
const [loading, setLoading] = useState(true);
const [countNFTs, setCountNFTs] = useState(0);
const [pageNumber, setPageNumber] = useState(1);
const [showListed, setShowListed] = useState(false);
const perPage = 50;

const YoctoToNear = (offer_priceYocto) => {
  return new Big(offer_priceYocto || 0)
    .div(new Big(10).pow(24))
    .toFixed(2)
    .toString();
};

useEffect(() => {
  getStoreNFTs({ offset: (page - 1) * perPage, id: contractId, limit: perPage })
    .then(({ data, errors }) => {
      if (errors) {
        // handle those errors like a pro
        console.error(errors);
      }
      // do something great with this precious data
      console.log({ Nfts: data });
      setCountNFTs(data.count.aggregate.count);
      setLoading(false);
      setNftData(data.tokens);
    })
    .catch((error) => {
      // handle errors from fetch itself
      console.error(error);
    });
}, [limit, offset, pageNumber, showListed]);

const listedToggleHandler = () => {
  setShowListed((prev) => !prev);
};

const WrapCards = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  gap: 20px;
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
`;

const MainContent = styled.div`
  flex: 1;
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
              onChange: listedToggleHandler,
              isDarkModeOn,
            }}
          />
        </div>
      </LeftFilter>
    )}
    <MainContent>
      <div className="count">{`${countNFTs} Result${s}`}</div>
      {countNFTs > 0 ? (
        <>
          <Cards>
            {nftData &&
              nftData.map((data, index) => (
                <div key={index}>
                  <Widget
                    src="${config_account}/widget/Mintbase.NFT.Index"
                    props={{ data, isDarkModeOn, isConnected }}
                  />
                </div>
              ))}
          </Cards>
          <div className="pagination_container">
            <p className="w-100 px-4">
              <Widget
                src="bos.genadrop.near/widget/Mintbase.TablePagination"
                props={{
                  totalItems,
                  isDarkModeOn,
                  itemsPerPage: countNFTs,
                  currentPage: page,
                  onPageChange: (page) => setPage(page),
                }}
              />
            </p>
          </div>
        </>
      ) : (
        <h5>The user does not own anything yet.</h5>
      )}
    </MainContent>
  </WrapCards>
);
