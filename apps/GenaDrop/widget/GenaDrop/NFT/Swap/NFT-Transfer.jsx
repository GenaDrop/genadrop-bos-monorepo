const accountId = context.accountId; // add check for context it
const contractId = "swap.genadrop.near"; // default nft contract
const default_receiver = ""; // default reciver nft for transfers

initState({
  receiverId: default_receiver,
  offerAmount: 0,
  validReceiver: true,
  ownsNFT: false, // change this and check intially
  transfer: false, // add checkbox for transfer that shows
  url: image.url,
  sendNFTS: [],
  offerNFTS: [],
  nft: image.nft ?? {}, // from santiago
});

/* HELPER FUNCTION */
function isNearAddress(address) {
  if (typeof address !== "string" || address === "") {
    return false;
  }
  if (context.accountId === address) {
    return false;
  }

  return true;
}

const offerButtonDisabled =
  (state.sendNFTS.length === 0 && state.offerNFTS.length === 0) ||
  !isNearAddress(state.receiverId);

console.log(state);

const ResponsiveFlex = styled.div`
  display: grid;
  grid-template-columns: 40% 20% 40%;
  gap: 7px;
  @media screen and (max-width: 800px) {
    display: block;
  }
`;

return (
  <div>
    <h1> 🛍️ Transfer NFT </h1>
    <ResponsiveFlex>
      <div
        className="p-2"
        style={{
          background: "#fdfdfd",
          margin: 5,
          border: "1px solid lightgray",
          borderTop: 0,
          borderRadius: "5px",
        }}
      >
        <div>
          <p style={{ wordBreak: "break-all" }}>
            Your Account:{" "}
            <span>
              {state.sendNFTS.length !== 0 && `(${state.sendNFTS.length})`}
            </span>{" "}
            <Widget
              src="harrydhillon.near/widget/AccountProfile"
              props={{ accountId }}
            />{" "}
          </p>
          <div className="mt-2">
            <Widget
              src={`harrydhillon.near/widget/nft-selector`}
              props={{
                selectedNFTS: state.sendNFTS,
                onChange: (nftDetails) => {
                  const isInList = !!state.sendNFTS.filter(
                    ({ tokenId }) => tokenId === nftDetails.tokenId
                  )?.[0];
                  console.log(
                    isInList,
                    state.sendNFTS.filter(
                      ({ tokenId }) => tokenId !== nftDetails.tokenId
                    ),
                    state.sendNFTS
                  );
                  if (isInList) {
                    State.update({
                      sendNFTS: state.sendNFTS.filter(
                        ({ tokenId }) => tokenId !== nftDetails.tokenId
                      ),
                    });
                  } else {
                    State.update({
                      sendNFTS: [...state.sendNFTS, nftDetails],
                    });
                  }
                },
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          padding: 10,
          marginLeft: 5,
          marginRight: 5,
          border: "1px solid lightgray",
          borderRadius: 10,
          height: "fit-content",
        }}
      >
        <h4>Offer </h4>
        Instructions:
        <br />
        1. Select the NFTs you want to trade.
        <br />
        2. Input the recipient's address.
        <br />
        3. Select the NFTs you want to receive.
        <br />
        4. Click on the "Offer" button.
        <input
          style={{ marginTop: 10 }}
          type="number"
          placeholder="amount in near Ⓝ"
          value={state.offerAmount}
          onChange={(e) => {
            State.update({ offerAmount: e.target.value });
          }}
        />
        <input
          style={{ marginTop: 10 }}
          placeholder="Recipient Address"
          value={state.receiverId}
          onChange={(e) => {
            State.update({ receiverId: e.target.value });
          }}
        />
        {!isNearAddress(state.receiverId) && (
          <p style={{ color: "red", fontSize: 10, marginBottom: 0 }}>
            Please enter a valid near wallet address
          </p>
        )}
        <button
          disabled={offerButtonDisabled}
          onClick={() => {
            State.update({ isOfferModalOpen: true });
          }}
          style={{ width: "100%", marginTop: 15 }}
        >
          Offer
        </button>
      </div>
      <div
        className="p-2"
        style={{
          background: "#fdfdfd",
          margin: 5,

          border: "1px solid lightgray",
          borderTop: 0,
          borderRadius: "5px",
        }}
      >
        <div>
          <p>
            Recipient{`'`}s Wallet:{" "}
            <span>
              {state.offerNFTS.length !== 0 && `(${state.offerNFTS.length})`}
            </span>
          </p>
          {isNearAddress(state.receiverId) ? (
            <Widget
              src="harrydhillon.near/widget/AccountProfile"
              props={{ accountId: state.receiverId }}
            />
          ) : (
            <>
              <p style={{ color: "red" }}>
                Please enter a valid near receiver address
              </p>
            </>
          )}

          <div className="mt-2">
            {isNearAddress(state.receiverId) && (
              <Widget
                src={`bos.genadrop.near/widget/GenaDrop.NFT.Swap.nft-selector`}
                props={{
                  selectedNFTS: state.offerNFTS,
                  accountId: state.receiverId,
                  onChange: (nftDetails) => {
                    const isInList = !!state.offerNFTS.filter(
                      ({ tokenId }) => tokenId === nftDetails.tokenId
                    )?.[0];
                    console.log(
                      isInList,
                      state.offerNFTS.filter(
                        ({ tokenId }) => tokenId !== nftDetails.tokenId
                      ),
                      state.offerNFTS
                    );
                    if (isInList) {
                      State.update({
                        offerNFTS: state.offerNFTS.filter(
                          ({ tokenId }) => tokenId !== nftDetails.tokenId
                        ),
                      });
                    } else {
                      State.update({
                        offerNFTS: [...state.offerNFTS, nftDetails],
                      });
                    }
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </ResponsiveFlex>

    <Widget
      src="bos.genadrop.near/widget/GenaDrop.NFT.Swap.NewOffer"
      props={{
        ...state,
        update: (d) => State.update(d),
        isOpen: state.isOfferModalOpen,
        contentStyles: {
          style: {
            overflowX: "hidden",
            width: 600,
          },
        },
      }}
    />
  </div>
);
