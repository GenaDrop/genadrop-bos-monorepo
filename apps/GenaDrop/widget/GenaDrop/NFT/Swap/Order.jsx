const accountId = context.accountId;

if (!accountId) {
  return "Please login to see offers";
}

initState({ allTransactions: [] });

const contract_id = "swap.genadrop.near";

const allUserTransactionHashes = Near.view(
  "swap.genadrop.near",
  "get_hashes_for_owner",
  {
    owner_id: accountId,
  }
);

const allTransactionData = [];

allUserTransactionHashes.map((item) => {
  allTransactionData.push({
    ...Near.view("swap.genadrop.near", "get_transaction_data", {
      hash: item,
    }),
    hash: item,
  });
});

function processNFTs(nfts, hash) {
  let arrayToReturn = [];
  nfts.map(async (nft) => {
    const nftContract = nft.contract_id;
    const tokenId = nft.token_id;
    const metadata = Near.view(nftContract, "nft_metadata", {
      token_id: tokenId,
    });
    const baseUri = metadata.base_uri || "";

    const nftMetadata = Near.view(nftContract, "nft_token", {
      token_id: tokenId,
    });
    const media = nftMetadata.metadata.media;
    const image =
      media.startsWith("https") || media.startsWith("http")
        ? media
        : `${baseUri}${media[0] === "/" ? "" : "/"}${media}`;
    let collection = "";

    if (nftContract === "x.paras.near") {
      const response = fetch(
        `https://api-v2-mainnet.paras.id/token?token_id=${tokenId}`
      );
      collection = response.data.results[0].metadata.collection_id;
    }

    arrayToReturn.push({
      title: nftMetadata.metadata.title,
      image: image,
      token_id: tokenId,
      contract_id: nftContract,
      collection: collection ? collection : metadata.name,
    });
  });
  return arrayToReturn;
}

State.update({ allTransactions: allTransactionData });

const nftData = [];
allTransactionData.map((item) => {
  const senderNFTs = processNFTs(item.sender_nfts, item.hash);
  const receiverNFTs = processNFTs(item.receiver_nfts, item.hash);
  senderNFTs.map((item) => {
    nftData.push(item);
  });
  receiverNFTs.map((item) => {
    nftData.push(item);
  });
});
State.update({ nftData });

function divideByPowerOfTen(numStr) {
  if (numStr.length <= 24) {
    return (Number(numStr) / 1e24).toFixed(3);
  }

  let wholePart = numStr.slice(0, -24);
  let fractionalPart = numStr.slice(-24);

  // Remove trailing zeros from the fractional part
  while (fractionalPart.endsWith("0")) {
    fractionalPart = fractionalPart.slice(0, -1);
  }

  // Create the result number
  let result = parseFloat(
    wholePart + (fractionalPart ? "." + fractionalPart : "")
  );

  // Generalized rounding
  let rounded = Math.round(result * 1e3) / 1e3;

  // Format the result to 3 decimal places
  return rounded.toFixed(3);
}

function formatDate(timestamp) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log(timestamp);
  const date = new Date(timestamp / 1000000);
  const day = date.getDate().toString().padStart(2, "0"); // To ensure it's always two digits
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0"); // To ensure it's always two digits
  const minutes = date.getMinutes().toString().padStart(2, "0"); // To ensure it's always two digits

  return {
    day: day,
    month: month,
    year: year,
    time: `${hours}:${minutes}`,
  };
}

const ImageGrid = styled.div`
  grid-template-columns: repeat(2, 1fr);
  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const render = (transaction) => {
  const date_data = formatDate(transaction.timestamp);
  return (
    <div
      style={{
        border: "0px solid lightgray",
        borderBottomWidth: 1,
        paddingBottom: 5,
        border: "1px solid lightgray",
        width: "100%",
        borderRadius: 5,
        marginBottom: 5,
        padding: 10,
      }}
    >
      <p style={{ textAlign: "left" }}>
        {date_data.time} UTC - {date_data.day} {date_data.month},{" "}
        {date_data.year}
      </p>
      <p style={{ fontSize: 20, marginBottom: 4, fontWeight: "500" }}>
        Receiving NFT{`'`}s
      </p>
      <ImageGrid
        style={{
          border: "1px solid lightgray",
          width: "100%",
          borderRadius: 5,
          padding: 10,
          display: "grid",
          gap: "10px",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        {transaction.receiver_nfts.map((item) => {
          const transaction_data = state.nftData.filter(
            (_) =>
              _.token_id === item.token_id && item.contract_id === _.contract_id
          )[0];

          return (
            <a
              style={{
                backgroundColor: "transparent",
                borderWidth: 0,
                color: "black",
              }}
              target="_blank"
              href={`/#/bos.genadrop.near/widget/GenaDrop.NFT.Details?contractId=${item.contract_id}&tokenId=${item.token_id}`}
            >
              <div>
                <img
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRadius: "5px",
                    objectFit: "cover",
                    marginBottom: 5,
                  }}
                  src={transaction_data.image}
                />
                <p style={{ marginBottom: 0, fontSize: 12 }}>
                  Collection : {transaction_data.collection}
                </p>
                <p style={{ marginBottom: 0, fontSize: 12 }}>
                  {item.contract_id}
                </p>
                <p style={{ marginBottom: 0, fontSize: 12 }}>{item.token_id}</p>
              </div>
            </a>
          );
        })}
      </ImageGrid>
      {transaction.sender_nfts.length !== 0 && (
        <>
          <p style={{ fontSize: 20, marginBottom: 4, fontWeight: "500" }}>
            Sending NFT{`'`}s
          </p>
          <ImageGrid
            style={{
              border: "1px solid lightgray",
              width: "100%",
              borderRadius: 5,
              padding: 10,
              display: "grid",
              gap: "10px",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {transaction.sender_nfts.map((item) => {
              const transaction_data = state.nftData.filter(
                (_) =>
                  _.token_id === item.token_id &&
                  item.contract_id === _.contract_id
              )[0];

              return (
                <a
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    color: "black",
                  }}
                  target="_blank"
                  href={`/#/bos.genadrop.near/widget/GenaDrop.NFT.Details?contractId=${item.contract_id}&tokenId=${item.token_id}`}
                >
                  <div>
                    <img
                      style={{
                        width: "100%",
                        height: "220px",
                        borderRadius: "5px",
                        objectFit: "cover",
                        marginBottom: 5,
                      }}
                      src={transaction_data.image}
                    />
                    <p style={{ marginBottom: 0, fontSize: 12 }}>
                      Collection : {transaction_data.collection}
                    </p>
                    <p style={{ marginBottom: 0, fontSize: 12 }}>
                      {item.contract_id}
                    </p>
                    <p style={{ marginBottom: 0, fontSize: 12 }}>
                      {item.token_id}
                    </p>
                  </div>
                </a>
              );
            })}
          </ImageGrid>
        </>
      )}

      <div
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: " repeat(2, 1fr)",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: 5 }}>
          Sender
          <Widget
            src="bos.genadrop.near/widget/GenaDrop.NFT.AccountProfile"
            props={{ accountId: transaction.sender_id }}
          />
        </div>
        <div style={{ marginBottom: 0 }}>
          Near : {divideByPowerOfTen(`${transaction.sender_near}`)} Ⓝ
        </div>
        <div style={{ marginBottom: 6 }}>
          Receiver
          <Widget
            src="bos.genadrop.near/widget/GenaDrop.NFT.AccountProfile"
            props={{ accountId: transaction.receiver_id }}
          />
        </div>
      </div>
      {accountId !== transaction.sender_id && (
        <button
          style={{
            backgroundColor: "blue",
            borderWidth: 0,
            marginRight: 10,
          }}
          onClick={() => {
            const txns = transaction.receiver_nfts.map((item) => ({
              contractName: item.contract_id,
              methodName: "nft_transfer",
              args: {
                receiver_id: contract_id,
                token_id: item.token_id,
                msg: transaction.hash,
                approval_id: 0,
              },
              gas: 300000000000000,
              deposit: 1,
            }));
            Near.call(txns);
          }}
        >
          Accept
        </button>
      )}
      <button
        onClick={() => {
          Near.call(
            contract_id,
            "cancel_offer",
            {
              hash: transaction.hash,
            },
            300000000000000,
            1
          );
        }}
        style={{ backgroundColor: "red", borderWidth: 0 }}
      >
        {accountId !== transaction.sender_id ? "Reject" : "Cancel"}
      </button>
    </div>
  );
};

const ResponsiveGridDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

return (
  <ResponsiveGridDiv>
    <div style={{ margin: 5 }}>
      <h4>Your Offers</h4>
      {[
        ...state.allTransactions.filter((item) => item.sender_id === accountId),
      ].map((transaction) => render(transaction))}
    </div>
    <div style={{ margin: 5 }}>
      <h4>Offered To you</h4>
      {[
        ...state.allTransactions.filter((item) => item.sender_id !== accountId),
      ].map((transaction) => render(transaction))}
    </div>
  </ResponsiveGridDiv>
);

// receiverId: nft.contract_id,
// 					actions: [functionCall('nft_transfer_call', {
// 						receiver_id: SWAP_CONTRACT,
// 						token_id: nft.token_id,
// 						approval_id: 0,
// 						msg: hash,
// 					}, 300000000000000, 1)]
