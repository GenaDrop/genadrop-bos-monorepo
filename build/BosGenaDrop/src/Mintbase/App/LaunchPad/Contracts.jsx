const { getUserStores } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.sdk"
) || {
  getUserStores: () => <></>,
};

const { MbModal } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
) || {
  MbModal: () => <></>,
};
const isDarkModeOn = props.isDarkModeOn;

const Root = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  .top {
    display: flex;
    justify-content: space-between;
    .lhs {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 14px;
      color: ${isDarkModeOn ? "#B3B5BD" : "#525c76"};
    }
    .rhs {
      display: flex;
      gap: 10px;
      margin-left: -12px;
      .tab {
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
    }
  }
  .pagination_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
  }
  .create-area {
    h3 {
      color: ${isDarkModeOn ? "#fff" : "#000"};
      font-weight: 700;
      @media (max-width: 768px) {
        font-size: 20px;
      }
    }
    p {
      max-width: 500px;
      color: ${isDarkModeOn ? "#B3B5BD" : "#404252"};
    }
  }
`;

const MainCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 34px;
  border-radius: 0.7em;
  width: 100%;
  margin-top: 1em;
`;

const Contracts = () => {
  const accountId = context.accountId;
  const [stores, setStores] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getUserStores(accountId)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        setStores(data.launchpad_contracts);
      })
      .catch((error) => {
        console.error("in contracts", error);
      });
  }, [accountId]);

  if (!stores) return "Loading ...";

  if (!accountId)
    return (
      <div className="text-center mx-auto">
        Please connect your wallet to view your contracts or create a new one.
      </div>
    );

  const createStoreHandler = () => {
    setModalIsOpen(true);
  };

  return (
    <Root>
      {stores.length ? (
        <>
          <div className="top">
            <div className="lhs">Your Contracts </div>
            <div className="rhs">
              <div className="tab">View All</div>
              <div className="tab" onClick={() => setModalIsOpen(true)}>
                New Contract
              </div>
            </div>
          </div>
          <MainCardsGrid>
            {stores.map(
              (store) =>
                store && (
                  <Widget
                    src={`bos.genadrop.near/widget/Mintbase.App.Store.Card`}
                    props={{
                      isDarkModeOn,
                      accountId,
                      contract: store,
                    }}
                  />
                )
            )}
          </MainCardsGrid>
        </>
      ) : (
        <div className="text-center mx-auto">
          <div className="d-flex flex-column align-items-center gap-4 create-area">
            <div>
              <h3 className="mb-2">Deploy your own store to mint NFTs from</h3>{" "}
              <p>
                You don't have any stores yet — let's create your first one! Or
                refresh the page if you just deployed (could take up to 5
                minutes).
              </p>
            </div>
            <Widget
              src={`bos.genadrop.near/widget/Mintbase.MbButton`}
              props={{
                label: "New Store",
                onClick: createStoreHandler,
                size: "big",
                isDarkModeOn,
              }}
            />
          </div>
        </div>
      )}
      <MbModal
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        topElement={
          <h4 style={{ marginRight: "8px" }}>Let's Create Your Store</h4>
        }
        isDarkModeOn={isDarkModeOn}
        onClose={null}
        topElementFirst={true}
      >
        <Widget
          src={`bos.genadrop.near/widget/Mintbase.App.Store.CreateForm`}
          props={{
            isDarkModeOn,
            onCancel: () => setModalIsOpen(false),
            setModalOpen: setModalIsOpen,
          }}
        />
      </MbModal>
    </Root>
  );
};

return <Contracts {...props} />;
