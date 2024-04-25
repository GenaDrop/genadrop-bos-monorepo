const accountId = props.accountId || context.accountId;
const onChange = props.onChange;
if (!accountId) {
  return <></>;
}
const size = "100%";
const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
  query v2_omnisite_GetOwnedTokens{
    tokens: mb_views_nft_owned_tokens(
      where: {
        owner: { _eq: "${accountId}" }
      }
    ) {
      tokenId: token_id
      contractId: nft_contract_id
      media
    }}
`,
  }),
});
const finalData = data?.body?.data;
if (!finalData) {
  return <></>;
}
const selectedTokenID = (props?.selectedNFTS ? props?.selectedNFTS : [])?.map(
  (item) => item.tokenId
);
return (
  <>
    <div
      className="d-flex flex-wrap gap-2 justify-content-center"
      style={{
        height: "100%",
        overflow: "auto",
      }}
    >
      {finalData.tokens.length === 0 && (
        <p style={{ padding: 10 }}>User has no NFT's</p>
      )}
      {finalData.tokens.map((nft, index) => {
        const isInsideList = selectedTokenID.includes(nft.tokenId);
        const stylesForSelected = isInsideList
          ? {
              border: "1px solid lightgray",
              borderRadius: 5,
              padding: 2.5,
            }
          : {};
        return (
          <div
            key={`${nft.contractId}-${nft.tokenId}-${index}`}
            role="button"
            style={{
              width: "30%",
              aspectRatio: "1/1",
              ...stylesForSelected,
            }}
            onClick={() => {
              onChange(nft);
            }}
          >
            <Widget
              src="mob.near/widget/NftImage"
              props={{
                nft: { tokenId: nft.tokenId, contractId: nft.contractId },
                style: {
                  width: size,
                  height: size,
                  objectFit: "cover",
                  borderRadius: 5,
                  minWidth: size,
                  minHeight: size,
                  maxWidth: size,
                  maxHeight: size,
                  overflowWrap: "break-word",
                },
                className: "",
                fallbackUrl:
                  "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
                alt: `NFT ${nft.contractId} ${nft.tokenId}`,
              }}
            />
            <p style={{ textAlign: "center", marginTop: 1, marginBottom: 0 }}>
              {index}
            </p>
          </div>
        );
      })}
    </div>
  </>
);
