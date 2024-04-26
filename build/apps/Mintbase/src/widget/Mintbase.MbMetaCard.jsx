const {
  onMetaCardImageClick,
  nftTypeIcon,
  showCreditCardIcon,
  metaCardImage,
  storeNameElement,
  minterImage,
  onMinterImageClick,
  tokenListings,
  data,
  loading,
  isDarkModeOn,
  isInStore,
  isConnected,
} = props;
const { getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);
const { MbModal } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
) || {
  MbModal: () => <></>,
};
const [modalOpen, setModalOpen] = useState(false);
const modalOpenHandler = () => {
  setModalOpen(true);
};
const MetaCard = styled.div`
  background-color: ${isDarkModeOn ? "#1F2937" : "#FFFFFF"};
  color: ${isDarkModeOn ? "#D1D5DB" : "#1F2937"};
  &:hover {
    background-color: ${isDarkModeOn ? "#111827" : "#F3F4F6"};
    color: ${isDarkModeOn ? "#F9FAFB" : "#111827"};
    scale: 1.01;
    .image {
      scale: 1.2;
    }
  }
  cursor: pointer;
  display: inline-block;
  transition: all 0.5s ease-in-out;
  width: 100%;
  border-radius: 0.375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: fit-content;
  max-width: 354px;
`;
const Loader = styled.div`
  width: 100%;
  max-width: 500px;
  .base-card {
    display: flex;
    flex-flow: column nowrap;
    border-radius: 0.25rem;
    width: 100%;
    padding: 10px;
    flex-wrap: wrap;
    gap: 10px;
    background-color: #ffffff;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-duration: 500ms;
    cursor: pointer;
    :hover {
      background-color: #f9fafb;
    }
  }
  .base-card:hover {
    scale: 1.01;
  }
  .loading-card-image {
    height: 120px;
  }
  .metaCardImage img {
    object-fit: cover !important;
  }
  .loader-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    & > div {
      border-radius: 0.25rem;
      width: 100%;
      height: 100%;
      background-color: #6b7280;
    }
  }
  .nearIcon {
    position: relative;
    top: -1px;
    margin-left: 3px;
  }
  .coverImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .extraMidLeftEl {
    width: 100% !important;
    height: 18px;
  }
  @media (max-width: 768px) {
    .base-card .p-med-90,
    .base-card .p-med-130 {
      font-size: 14px !important;
    }
    .base-card .p-small-90 {
      font-size: 12px !important;
    }
    .nearIcon {
      width: 11.5px;
    }
    .base-card .mb-tooltip svg {
      width: 16px;
    }
  }
`;
const LoaderBottom = styled.div`
  display: flex;
  flex-direction: column;
  ${"" /* justify-content: center; */}
  gap: 1.5rem;
  padding: 1.5%;
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  }
  .loader-bottom-item-0 {
    border-radius: 0.25rem;
    width: 25%;
    height: 1rem;
    background-color: #6b7280;
  }
  .bt-it-1-1 {
    border-radius: 0.25rem;
    width: 50%;
    height: 1rem;
    background-color: #6b7280;
  }
  .bt-it-1-2,
  .bt-it-2-2 .s {
    border-radius: 0.25rem;
    width: 2rem;
    height: 1rem;
    background-color: #6b7280;
  }
  .bt-it-2-1 {
    border-radius: 9999px;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #6b7280;
  }
  .bt-it-2-2 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    object-fit: cover !important;
  }
  .nearIcon {
    position: relative;
    top: -1px;
    margin-left: 3px;
  }
  .coverImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .imageLayer {
    height: 354px !important;
    width: 354px;
    background: #aa4747;
    .image {
      transition: all 0.4s ease-in-out;
      height: 354px !important;
      width: 354px !important;
      object-fit: cover;
    }
  }
  .imgContainer {
    overflow: hidden;
    position: relative;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    width: 100%;
    height: 100%;
    @media (min-width: 1024px) {
    }
  }
  .topIconContainer {
    display: flex;
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 10;
    gap: 0.5rem;
    align-items: center;
  }
  @media (max-width: 768px) {
    .base-card .p-med-90,
    .base-card .p-med-130 {
      font-size: 14px !important;
    }
    .base-card .p-small-90 {
      font-size: 12px !important;
    }
    .nearIcon {
      width: 11.5px;
    }
    .base-card .mb-tooltip svg {
      width: 16px;
    }
  }
`;
const Footer = styled.div`
  padding: 24px;
  ${getInputLabelFontType("big")}
  .extraMidLeftEl {
    width: 100% !important;
    color: ${isDarkModeOn ? "#D1D5DB" : "#374151"};
  }
  .titleContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;
    color: ${isDarkModeOn ? "#fff" : "#000"};
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    ${getInputLabelFontType("large")}
    white-space: nowrap;
    color: ${isDarkModeOn ? "#fff" : "#000"};
  }
  .minterTitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #e5e7eb;
  }
  .minterImageContainer {
    display: inline;
    overflow: hidden;
    border-radius: 9999px;
    width: 1.5rem;
    height: 1.5rem;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
const {
  base_uri,
  description,
  media,
  nft_contract_id,
  title,
  token_id,
  issued_at,
  nft_contract_icon,
  nft_contract_name,
} = data;
const { price } = data?.price ?? "0.00";
const nftImage = base_uri ? `${base_uri}/${media}` : media;
if (loading)
  return (
    <div>
      <Loader>
        <li className="base-card thing">
          <div className="loader-top loading-card-image">
            <div></div>
          </div>
          <LoaderBottom>
            <div className="loader-bottom-item-0">
              <div></div>
            </div>
            <div className="loader-bottom-item-1">
              <div className="bt-it-1-1"></div>
              <div className="bt-it-1-2"></div>
            </div>
            <div className="loader-bottom-item-2">
              <div className="bt-it-2-1"></div>
              <div className="bt-it-2-2">
                <div className="s"></div>
              </div>
            </div>
          </LoaderBottom>
        </li>
      </Loader>
    </div>
  );
const modalContent = <div>Hey!</div>;
const NFTAction = styled.div`
  padding: 6px;
  background: #fff;
  color: #000;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  .bi {
    line-height: 14px;
  }
  :hover {
    color: #4f58a3;
    background: #ebedfb;
  }
  &.dark-action {
    background: #1e2030;
    color: #fff;
    :hover {
      background: #282a3a;
      color: #c5d0ff;
    }
  }
`;
return (
  <>
    <MetaCard>
      <Header>
        <div className="imgContainer" onClick={onMetaCardImageClick}>
          {isConnected && (
            <div className="topIconContainer">
              <div>
                <NFTAction
                  className={isDarkModeOn && "dark-action"}
                  onClick={modalOpenHandler}
                >
                  <span>Sell</span>
                </NFTAction>
              </div>
              <div>
                <NFTAction
                  className={isDarkModeOn && "dark-action"}
                  onClick={dropdownToggleHandler}
                >
                  <span>
                    <i class="bi bi-three-dots"></i>
                  </span>
                </NFTAction>
              </div>
            </div>
          )}
          {showTradeIcons && (
            <div>
              <NFTAction
                className={isDarkModeOn && "dark-action"}
                onClick={dropdownToggleHandler}
              >
                <span>...</span>
              </NFTAction>
            </div>
          )}
          <div className="imageLayer">
            <img
              className="image"
              src={`https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=${nftImage}`}
              alt={title}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Header>
      <Footer>
        <div className="extraMidLeftEl">{!isInStore && nft_contract_id}</div>
        <div className="titleContainer">
          <div className="title">
            {(title.length > 22 ? `${title.slice(0, 22)}...` : title) ??
              "--NFT Title--"}
          </div>
          <div>{price}</div>
        </div>
        <div className="minterTitle">
          {!minterImage ? (
            <div className="minterImageContainer" onClick={onMinterImageClick}>
              <img src="data:image/png;base64,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" />
            </div>
          ) : (
            <div></div>
          )}
          <div className=" flex flex-row items-center text-black dark:text-white space-x-8">
            <div className="p-small-90 metaCardScale">{tokenListings}</div>
          </div>
        </div>
      </Footer>
    </MetaCard>
    <MbModal
      open={modalOpen}
      setOpen={setModalOpen}
      topElement={<h4 style={{ marginRight: "8px" }}>Sell</h4>}
      isDarkModeOn={isDarkModeOn}
      onClose={null}
      topElementFirst={true}
    >
      {modalContent}
    </MbModal>
  </>
);
