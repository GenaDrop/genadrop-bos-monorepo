const { isDarkModeOn, data, NftCount } = props;
const Container = styled.div`
  display: grid;
  margin: 10px 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .layout {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .view-nft {
    padding: 30px;
    background: ${isDarkModeOn ? "rgb(30, 32, 48)" : "#f6f5f4"};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
    min-width: 800px;
    border-radius: 5px;
    @media screen and (max-width: 768px) {
      min-width: 100%;
      padding: 10px;
    }
  }
  .layout-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  .nft {
    width: 512px;
    height: 512px;
    object-fit: contain;
    @media screen and (max-width: 768px) {
      width: 200px;
      height: 200px;
    }
  }
  .desc {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    padding: 7px 10px;
    gap: 3px;
    background: ${isDarkModeOn ? "rgb(40, 42, 58)" : "#ffffff"};
    text-decoration: none;
    border-radius: 5px;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
  }
  .item-view {
    display: flex;
    flex-direction: column;
    padding: 7px 10px;
    gap: 3px;
    background: ${isDarkModeOn ? "rgb(40, 42, 58)" : "#ffffff"};
    text-decoration: none;
    border-radius: 5px;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
  }
  .title {
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
    margin: 20px 0;
    font-size: 30px;
    font-weight: 500;
    @media screen and (max-width: 768px) {
      font-size: 20px;
    }
  }
  .layout-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .audit {
    border: none;
    background: ${isDarkModeOn ? "rgb(40, 42, 58)" : "#ebeae9"};
    padding: 5px 10px;
    border-radius: 5px;
    max-height: 40px;
    cursor: pointer;
    :hover {
      background: #9dc7f3;
    }
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
  .text-desc {
    color: ${isDarkModeOn ? "rgb(179, 181, 189)" : "#164b8e"};
  }
  .minter {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 30px;
  }

  .footer {
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    gap: 20px;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
  }
  .btn-nft {
    border: 1px solid #000000;
    background: none;
    padding: 3px 6px;
    border-radius: 5px;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
    cursor: pointer;
  }
  .split {
    background: ${isDarkModeOn ? "rgb(30, 32, 48)" : "#f6f5f4"};
    padding: 10px 20px;
    max-hight: 300px;
    width: 100%;
    min-width: 800px;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    transition-duration: 0.2s;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    @media screen and (max-width: 768px) {
      min-width: 100%;
    }
  }
  .splits {
    background: ${isDarkModeOn ? "rgb(30, 32, 48)" : "#f6f5f4"};
    padding: 30px;
    max-hight: 300px;
    width: 100%;
    min-width: 800px;
    border-radius: 5px;
    overflow: hidden;
    transition: height 0.25s ease-out;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
  }
  .split-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
  }
  .left {
    margin-top: 10px;
    font-size: 19px;
    font-weight: 600;
  }
  .right {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .split-content {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      font-size: 16px;
    }
  }
  .right-header {
    padding: 10px 20px;
    color: gray;
    background: ${isDarkModeOn ? "#282a3a" : "#eceae8"};
    width: 100%;
    display: flex;
    text-align: start;
    align-items: start;
    justify-content: start;
    flex-direction: row;
    gap: 3px;
  }
  .right-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 20px;
    @media screen and (max-width: 768px) {
      justify-content: center;
    }
  }
  .right-main {
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
    padding: 10px 20px;
    margin-top: 10px;
  }
  .right-container {
    border: none;
    background: ${isDarkModeOn ? "#1e2030" : "#f6f5f4"};
    display: flex;
    flex-direction: column;
    min-width: 400px;
    max-height: 200px;
    border-radius: 5px;
    margin-right: 40px;
  }
  .truncate {
    display: block;
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text {
    color: ${isDarkModeOn ? "#ffffff" : "#000000"};
  }
  .btn-cus {
    background: ${isDarkModeOn ? "#ffffff" : "#000000"};
    border: none;
    border-radius: 5px;
    outline: none;
    padding: 5px 20px;
    width: 100%;
    color: ${isDarkModeOn ? "#000000" : "#ffffff"};
  }
  .custom-sale {
    display: flex;
    justify-content: end;
  }
  @media screen and (max-width: 768px) {
    .item-view {
      flex-direction: row;
      justify-content: space-between;
      background: none;
      padding: 0 10px;
    }
    .item {
      width: 100%;
    }
    .minter {
      flex-direction: column;
      padding: 0px 10px;
      gap: 10px;
      margin-top: 10px;
    }
    .item-minter {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .btn-nft {
      font-size: 13px;
    }
    .text-decs {
      font-size: 15px;
    }
    .splits {
      min-width: 100%;
      font-size: 16px;
      padding: 10px;
    }
    .custom-sale {
      display: block;
    }
    .right-container {
      min-width: 100%;
    }
  }
`;
const [dropdowVisible, setDropDownVisible] = useState(true);
const [visible, setVisible] = useState(true);
const hanleVisible = () => {
  setDropDownVisible(!dropdowVisible);
};
const hanleVisibleDetails = () => {
  setVisible(!visible);
};
return (
  <Container>
    <div className="layout">
      <div className="view-nft">
        <div className="layout-image">
          {data.media && data.media.startsWith("https://arweave.net/") ? (
            <img className="nft" src={data.media} alt="nft" />
          ) : (
            <img
              className="nft"
              src={`https://image-cache-service-z3w7d7dnea-ew.a.run.app/media?url=https://arweave.net/${data.media}`}
              alt="nft"
            />
          )}
        </div>
        <div className="layout-title">
          <div className="title">
            {data.title ? data.title : "This is NFT not title"}
          </div>
          <button className="audit">Audited</button>
        </div>
        <div className="desc">
          <a href="#" className="item-view">
            <small>Contract</small>
            <small className="text-desc">{data.nft_contract_id}</small>
          </a>
          <a href="#" className="item-view">
            <small>Owner</small>
            <small className="text-desc">{data.owner}</small>
          </a>
          <a href="#" className="item-view">
            <small>Total Minted</small>
            <small>{NftCount}</small>
          </a>
        </div>
        <div className="minter">
          <small className="item-minter">
            <span>Minter: </span>
            <a href="#" className="text-desc text-decoration-none">
              {data.minter}
            </a>
          </small>
          <small className="item-minter">
            <span>Token Id:</span>
            <span>{data.token_id}</span>
          </small>
          <small className="item-minter">
            <span>Type: </span>
            <span>Image</span>
          </small>
        </div>
        <div className="footer">
          <div className="px-2">{data.description}</div>
          <div className="d-flex flex-row gap-3">
            <a
              href={`https://mintbase.xyz/meta/${
                data.id && data.id.replace(":", "%3A")
              }`}
              target="_blank"
              className="btn-nft d-flex flex-row gap-1 align-items-center text-decoration-none"
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/material-outlined/24/share-rounded.png"
                alt="share-rounded"
              />
              <div>Share</div>
            </a>
            <a
              href={`https://www.mintbase.xyz/meta/${
                data.id && data.id.replace(":", "%3A")
              }?affiliateAccount=${data.listings[0].listed_by}`}
              target="_blank"
              className="btn-nft d-flex flex-row gap-1 align-items-center text-decoration-none"
            >
              <img
                width="18"
                height="18"
                src="https://img.icons8.com/pulsar-line/48/share-3.png"
                alt="share-3"
              />
              <div>AffiliateDirect Link</div>
            </a>
          </div>
        </div>
      </div>
      <div>
        <div onClick={hanleVisible} className="split border-bottom">
          <div className="split-title">
            <div className="left">Splits</div>
            <div className="right">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/color/48/info--v1.png"
                alt="info--v1"
              />
              {dropdowVisible ? (
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-glyphs/30/chevron-up.png"
                  alt="chevron-up"
                />
              ) : (
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-glyphs/30/chevron-down.png"
                  alt="chevron-up"
                />
              )}
            </div>
          </div>
        </div>
        {dropdowVisible && (
          <div className="splits">
            <div className="split-content">
              <div className="item">
                <div className="d-flex flex-row gap-2 align-items-center">
                  <div
                    class="error"
                    style={{
                      background: "#c74c4c",
                      height: "10px",
                      width: "10px",
                      borderRadius: "50px",
                    }}
                  ></div>
                  <small>Forever Royalties</small>
                </div>
                <small>0%</small>
              </div>
              <div className="item">
                <div className="d-flex flex-row gap-2 align-items-center">
                  <div
                    className="success"
                    style={{
                      background: "#0a7d6c",
                      height: "10px",
                      width: "10px",
                      borderRadius: "50px",
                    }}
                  ></div>
                  <small>Split Revenue</small>
                </div>
                <small>97.5%</small>
              </div>
              <div className="item">
                <div className="d-flex flex-row gap-2 align-items-center">
                  <div
                    className="disable"
                    style={{
                      background: "#b3b5bd",
                      height: "10px",
                      width: "10px",
                      borderRadius: "50px",
                    }}
                  ></div>
                  <small>Market</small>
                </div>
                <small>2.5%</small>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <div onClick={hanleVisibleDetails} className="split border-bottom">
          <div className="split-title">
            <div className="left">Details</div>
            <div className="right">
              {visible ? (
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-glyphs/30/chevron-up.png"
                  alt="chevron-up"
                />
              ) : (
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-glyphs/30/chevron-down.png"
                  alt="chevron-up"
                />
              )}
            </div>
          </div>
        </div>
        {visible && (
          <div className="splits">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-row">
                <span>Storage Gateway:&nbsp;</span>
                <a
                  href={data.base_uri}
                  target="_blank"
                  className="d-flex flex-row align-items-center text-decoration-none"
                  style={{ color: "#5861a8" }}
                >
                  <span className="truncate">{data.base_uri}</span>
                  <img
                    width="10"
                    height="10"
                    src="https://img.icons8.com/ios/50/up-right-arrow.png"
                    alt="down-left-arrow"
                  />
                </a>
              </div>
              <div className="d-flex flex-row">
                <span>Storage ID:&nbsp;</span>
                <a
                  href={data.media}
                  target="_blank"
                  className="d-flex flex-row align-items-center text-decoration-none"
                  style={{ color: "#5861a8" }}
                >
                  <span className="truncate">
                    {data.media &&
                      data.media.replace("https://arweave.net/", "")}
                  </span>
                  <img
                    className="ml-"
                    width="10"
                    height="10"
                    src="https://img.icons8.com/ios/50/up-right-arrow.png"
                    alt="down-left-arrow"
                  />
                </a>
              </div>
              <div className="d-flex flex-row">
                <span>Contract:&nbsp;</span>
                <a
                  href={`https://www.mintbase.xyz/contract/${data.nft_contract_id}/nfts/all/0`}
                  target="_blank"
                  className="d-flex flex-row align-items-center text-decoration-none"
                  style={{ color: "#5861a8" }}
                >
                  <span className="truncate">{data.nft_contract_id}</span>
                  <img
                    width="10"
                    height="10"
                    src="https://img.icons8.com/ios/50/up-right-arrow.png"
                    alt="down-left-arrow"
                  />
                </a>
              </div>
              <div className="d-flex flex-row">
                <span>Metadata ID:&nbsp;</span>
                <a
                  href={`https://www.mintbase.xyz/meta/${data.id}`}
                  target="_blank"
                  className="d-flex flex-row align-items-center text-decoration-none"
                  style={{ color: "#5861a8" }}
                >
                  <span className="truncate">{data.metadata_id}</span>
                  <img
                    width="10"
                    height="10"
                    src="https://img.icons8.com/ios/50/up-right-arrow.png"
                    alt="down-left-arrow"
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="custom-sale">
      <div className="right-container">
        <div className="right-header">
          <span className="text" style={{ fontWeight: 500 }}>
            {NftCount}{" "}
          </span>{" "}
          of{" "}
          <span className="text" style={{ fontWeight: 500 }}>
            1{" "}
          </span>{" "}
          Listed{" "}
          <span className="text" style={{ fontWeight: 500 }}>
            {" "}
            as Simple Sale
          </span>
        </div>
        {NftCount > 1 ? (
          <div>
            <div className="right-main">
              <span className="d-flex flex-row justify-content-start">
                Lowest Price
              </span>
              <div className="text text-left d-flex flex-row justify-content-start align-items-end">
                <div style={{ fontSize: "25px", fontWeight: 600 }}>
                  2.00
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 18 18"
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "-5px" }}
                    class="fill-current text-black dark:text-white"
                  >
                    <path
                      d="M5.10976 4.05615C5.47596 4.05615 5.81596 4.24601 6.00779 4.55812L8.07455 7.62657C8.14188 7.7277 8.11455 7.86404 8.01343 7.93136C7.93145 7.98601 7.823 7.97925 7.74835 7.91502L5.71399 6.15052C5.68019 6.1201 5.62807 6.12319 5.59765 6.157C5.58385 6.17249 5.57652 6.19249 5.57652 6.21305V11.7376C5.57652 11.7832 5.61343 11.8198 5.65906 11.8198C5.68357 11.8198 5.70667 11.8091 5.72216 11.7902L11.8717 4.42911C12.072 4.19277 12.3661 4.05643 12.6757 4.05615H12.8906C13.4723 4.05615 13.9438 4.5277 13.9438 5.10939V12.8902C13.9438 13.4719 13.4723 13.9435 12.8906 13.9435C12.5244 13.9435 12.1844 13.7536 11.9926 13.4415L9.92582 10.3731C9.8585 10.2719 9.88582 10.1356 9.98695 10.0683C10.0689 10.0136 10.1774 10.0204 10.252 10.0846L12.2864 11.8491C12.3202 11.8795 12.3723 11.8764 12.4027 11.8426C12.4165 11.8271 12.4238 11.8071 12.4236 11.7866V6.26066C12.4236 6.21503 12.3867 6.17841 12.341 6.17841C12.3168 6.17841 12.2934 6.18911 12.2779 6.20798L6.1292 13.5705C5.92892 13.8069 5.63483 13.9432 5.32526 13.9435H5.11033C4.52864 13.9438 4.05681 13.4725 4.05624 12.8908V5.10939C4.05624 4.5277 4.52779 4.05615 5.10948 4.05615H5.10976Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <strong
                  className="font-weight-light"
                  style={{
                    fontSize: "16px",
                    marginLeft: "20px",
                    color: "gray",
                  }}
                >
                  $14,5
                </strong>
              </div>
            </div>
            <div className="right-footer">
              <button className="btn-cus">Buy With Crypto</button>
            </div>
          </div>
        ) : (
          <div className="mx-5 my-3 text-left">Not listed</div>
        )}
      </div>
    </div>
  </Container>
);
