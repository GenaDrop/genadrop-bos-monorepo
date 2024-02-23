
const Loader = styled.div`
  width: 100%;
  max-width: 500px;
  .base-card {
    display: flex;
    flex-flow: column nowrap;
    border-radius: 0.25rem;
    width: 100%;
    padding: 10px;
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

const Header = styled.div``;
const Footer = styled.div``;

const LoadingCard = () => {
  return (
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
  );
};

const MbMetaCardHeader = ({ data }) => {
  const {
    metaCardImage,
    nftTypeIcon,
    showCreditCardIcon,
    onMetaCardImageClick,
  } = data;

  return (
    <Header className="flex flex-col cover justify-center items-center metaCardImage">
      <div
        className="h-full w-full rounded-t-md overflow-hidden relative pt-56 sm:pt-72 lg:pt-68"
        onClick={onMetaCardImageClick}
      >
        <div className="flex gap-8 items-center absolute top-3 left-3 z-10">
          {nftTypeIcon ? (
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <MbIcon name={nftTypeIcon} size="14px" color="white" />
            </div>
          ) : null}
          {showCreditCardIcon ? (
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <MbIcon name={EIconName.CREDIT_CARD} size="14px" color="white" />
            </div>
          ) : null}
        </div>

        <div className="absolute inset-0">{metaCardImage}</div>
      </div>
    </Header>
  );
};

const MbMetaCardInfo = ({ data }) => {
  const {
    storeNameElement,
    nftTitle,
    minterImage,
    tokenListings,
    priceWidget,
    onMinterImageClick,
  } = data;

  return (
    <Footer className="px-12 pb-12">
      <div className="p-small-90  text-gray-700 dark:text-gray-300 mt-12 w-5/6  extraMidLeftEl">
        {storeNameElement}
      </div>
      <div className="flex flex-row justify-between text-black dark:text-white mt-8 items-center">
        <div className="p-med-90 w-3/4 truncate ">{nftTitle}</div>
        {priceWidget}
      </div>
      <div className="flex flex-row justify-between text-gray-200 mt-12">
        {minterImage ? (
          <div
            className="inline object-fit w-6 h-6 rounded-full overflow-hidden"
            onClick={onMinterImageClick}
          >
            {minterImage}
          </div>
        ) : (
          <div></div>
        )}
        <div className=" flex flex-row items-center text-black dark:text-white space-x-8">
          <div className="p-small-90 metaCardScale">{tokenListings}</div>
        </div>
      </div>
    </Footer>
  );
};

const MbMetaCard = ({ loading, metaCardInfo, metaCardHeaderData }) => {
  if (loading) return <LoadingCard />;

  return (
    <>
      <MbMetaCardHeader data={metaCardHeaderData} />
      <MbMetaCardInfo data={metaCardInfo} />
    </>
  );
};

return { MbMetaCard };
