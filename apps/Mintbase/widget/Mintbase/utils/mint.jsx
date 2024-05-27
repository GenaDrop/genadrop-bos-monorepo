const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

function mintingDeposit({ nTokens, nRoyalties, nSplits, metadata }) {
  const nSplitsAdj = nSplits < 1 ? 0 : nSplits - 1;
  const bytesPerToken = 440 + nSplitsAdj * 80 + 80;
  const metadataBytesEstimate = JSON.stringify(metadata).length;

  const totalBytes =
    92 +
    100 +
    metadataBytesEstimate +
    bytesPerToken * nTokens +
    80 * nRoyalties;

  return `${Math.ceil(totalBytes)}${"0".repeat(19)}`;
}

function getRoyaltyTotal(royalties, errorMessage) {
  let royaltyTotal = 0;
  royalties.forEach((value) => {
    royaltyTotal += Number(value.percent);
  });

  if (royaltyTotal <= 0 || royaltyTotal > 0.5) {
    errorMessage("Invalid royalty percentage, it must be between 0 and 0.5");
    return "Error";
  }
  return royaltyTotal;
}

function adjustRoyaltiesForContract(royalties, royaltyTotal, errorMessage) {
  let counter = 0;
  const result = {};
  royalties.map(({ accountId, percent }) => {
    if (percent <= 0) {
      errorMessage("Invalid royalty percentage, it must be between 0 and 0.5");
    }
    const adjustedAmount = (percent / royaltyTotal) * 10000;
    result[accountId] = adjustedAmount;
    counter += adjustedAmount;
  });
  if (counter != 10000) {
    errorMessage("Splits percentages must add up 10000 in the contract call ");
    return "Error";
  }
  return result;
}

function roundRoyalties(royalties) {
  let roundedCounter = 0;
  const result = {};
  const firstKey = Object.keys(royalties)[0];
  Object.keys(royalties).forEach((key) => {
    const roundedVal = Math.round(royalties[key]);
    result[key] = roundedVal;
    roundedCounter += roundedVal;
  });

  if (roundedCounter != 10000) {
    result[firstKey] += 10000 - roundedCounter;
  }
  return result;
}

// Function to create (mint) new NFTs and uploads them to IPFS
const mint = (
  metadata,
  media,
  contractName,
  numToMint,
  owner,
  errorMessage,
  fileUploadStatus
) => {
  if (!media && !metadata) return console.log("missing file");
  fileUploadStatus(true);

  //HANDLE ROYALTIES
  let royaltyTotal = null;
  let roundupRoyalties = null;
  if (metadata.royalties) {
    royaltyTotal = getRoyaltyTotal(metadata.royalties, errorMessage);
    const adjustedRoyalties = adjustRoyaltiesForContract(
      metadata.royalties,
      royaltyTotal,
      errorMessage
    );
    roundupRoyalties = roundRoyalties(adjustedRoyalties);
    if (royaltyTotal === "Error" || adjustedRoyalties === "Error") return;
  }

  // HANDLE SPLITS
  let splits = {};
  if (metadata?.splits) {
    if (metadata?.splits.reduce((a, b) => a + b.percent) > 100) {
      return errorMessage("SPLITS Percentage cannot be more than 100%");
    } else if (metadata?.splits?.length > 25) {
      return errorMessage("Splits Account cannot be more than 25");
    } else {
      metadata.splits.map((data) => {
        splits[data?.accountId] = data.percent;
      });
    }
    console.log(splits);
  }

  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: metadata,
  })
    .then((res) => {
      const reference = res.body.cid;
      fileUploadStatus(false);
      if (!reference) {
        return errorMessage("could not upload to IPFS");
      }
      const gas = 2e14;
      return Near.call([
        {
          contractName: contractName || "",
          methodName: "nft_batch_mint",
          args: {
            owner_id: owner,
            metadata: {
              media: ipfsUrl(media),
              reference,
              title: metadata.title,
              description: metadata.description,
            },
            num_to_mint: numToMint || 1,
            royalty_args: !royaltyTotal
              ? null
              : {
                  split_between: roundupRoyalties,
                  percentage: Math.round(royaltyTotal * 10000),
                },
            split_owners: metadata?.splits ? splits : null,
            token_ids_to_mint: null,
          },
          gas: gas,
          deposit: mintingDeposit({
            nSplits: metadata?.splits?.length,
            nTokens: numToMint,
            nRoyalties: !metadata?.royalties
              ? null
              : metadata?.royalties?.length,
            metadata,
          }),
        },
      ]);
    })
    .catch((err) => {
      console.log(err);
      errorMessage("Something went wrong during minting");
    });
};

return { mint };
