const { CreateStoreCard } = VM.require(
  "bos.genadrop.near/widget/Mintbase.App.Store.CreateStoreCard"
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
  grid-gap: 1em;
  border-radius: 0.7em;
  width: 100%;
  margin-top: 1em;
`;
const fetchStoreFrontData = (owner, contractId) => {
  const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
  mb_views_nft_metadata_unburned(
    where: {nft_contract: {id: {_eq: "${contractId}"}, owner_id: {_eq: "${owner}"}}}
    offset: 0
    order_by: {minted_timestamp: desc}
  ) {
    createdAt: minted_timestamp
    listed: price
    media
    storeId: nft_contract_id
    metadataId: metadata_id
    title
    description
  }
  mb_views_nft_metadata_unburned_aggregate(
    where: {nft_contract: {id: {_eq: "${contractId}"}, owner_id: {_eq: "${owner}"}}}
  ) {
    aggregate {
      count
    }
  }
}
`,
    }),
  });
  State.update({
    storeContracts: response2.body.data.mb_views_nft_metadata_unburned,
    storeNftsCount:
      response2.body.data.mb_views_nft_metadata_unburned_aggregate.aggregate
        .count,
    ownerId: owner,
  });
  console.log("running2", state.storeContracts);
};
fetchStoreFrontData(
  props.ownerId || "nate.near",
  props.contract || "nate.mintbase1.near"
);
const storeNfts = state.storeContracts;
const WrapCards = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0.05rem 0.05rem rgb(34 34 34 / 5%),
    0 0.2rem 0.8rem rgb(34 34 34 / 8%);
  .count {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 16px;
    color: #525c76;
  }
`;
const s = state.storeNftsCount > 1 ? "s" : "";
return (
  <WrapCards>
    <div className="count">{`${state.storeNftsCount} Result${s}`}</div>
    <Cards>
      {storeNfts &&
        storeNfts.map((data, index) => (
          <div key={index}>
            <Widget
              props={{
                title: data.title,
                description: data.description,
                image: data.media,
                price: data.listed,
                owner: state.ownerId,
                price: data.listed
                  ? (data.listed / 1000000000000000000000000).toFixed(2)
                  : null,
                isListed: data.listed ? "LISTED" : "NOT LISTED",
                tokenId: data.token_id,
                contractId: data.storeId,
                metadataId: data.metadataId,
              }}
              src="bos.genadrop.near/widget/Mintbase.NFT.Card"
            />
          </div>
        ))}
      <CreateStoreCard
        isDarkModeOn={isDarkModeOn}
        createStoreHandler={createStoreHandler}
      />
    </Cards>
  </WrapCards>
);
