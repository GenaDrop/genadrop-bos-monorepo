const { Pagination } = VM.require("buildhub.near/widget/components") || {
  Pagination: () => <></>,
};

const { minterId, isDarkModeOn, createStoreHandler, isConnected, showFilters } =
  props;
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

const perPage = 56;

const offset = (pageNumber - 1) * perPage;

const totalPages = Math.ceil(countNFTs / perPage);

const listedToggleHandler = () => {
  setShowListed((prev) => !prev);
};

const fetchMintedNFTs = ({ minter, offset, limit, listed }) => {
  asyncFetch(
    `https://api.mintbase.xyz/human/${minter}/minted?offset=${offset}&limit=${limit}&orderBy=minted_timestamp%20desc%20nulls%20last&listedFilter=${listed}`,
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
      const nfts = JSON.parse(data.body);
      console.log("nfts", nfts);
      setNftData(nfts.results);
      setCountNFTs(nfts.total);
    }
  });
};

useEffect(() => {
  fetchMintedNFTs({
    minter: minterId || "jgodwill.near",
    offset,
    limit: perPage,
    listed: showListed,
  });
}, [limit, offset, pageNumber, showListed]);

const WrapCards = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  gap: 20px;
  .count {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 16px;
    color: var(${isDarkModeOn ? "--gray-300, #b3b5bd" : "--gray-600, #5b5d6b"});
    padding-left: 24px;
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
  background: var(
    ${isDarkModeOn ? "--gray-850, #1e2030" : "--gray-50, #f9f9f9"}
  );
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
              value: showListed,
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
            <div className="w-100 px-4">
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
            </div>
          </div>
        </>
      ) : (
        <h5>The user hasn't minted anything yet.</h5>
      )}
    </MainContent>
  </WrapCards>
);
