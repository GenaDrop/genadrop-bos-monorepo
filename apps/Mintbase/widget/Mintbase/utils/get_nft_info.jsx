const fetchNFTInfo = (nftId) => {
  const response = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query getTokenByMetadataId {
          listingsCount: mb_views_active_listings_aggregate(
              where: {
                metadata_id: { _eq: "${nftId}" }
                token: { burned_timestamp: { _is_null: true } }
              }
              distinct_on: token_id
            ) {
              aggregate {
                count
              }
            }
              mb_views_nft_tokens(
                  where: {metadata_id: {_eq: "${nftId}"}}
                  ) {
                  media
                  minter
                  token_id
                  metadata_id
                  splits
                  royalties_percent
                  royalties
                  reference
                  title
                  nft_contract_id
                  owner
                  base_uri
                  listings(
                 where: {unlisted_at: {_is_null: true}, accepted_at: {_is_null: true}, invalidated_at: {_is_null: true}}
              ) {
                    price
                    kind
                    currency
                    invalidated_at
                  }
                  description
                  listings_aggregate {
                      aggregate {
                      count
                      }
                  }
                  }
            mb_views_nft_activities_rollup(
                where: {metadata_id: {_eq: "${nftId}"}}
                order_by: {timestamp: desc}
                limit: 200
              ) {
                action_receiver
                action_sender
                count
                description
                kind
                media
                metadata_id
                nft_contract_id
                receipt_id
                reference
                timestamp
                title
                tx_sender
                token_ids
                price
              }
          }
          `,
    }),
  });
  return {
    infoNFT: response.body.data.mb_views_nft_tokens[0],
    dataTransaction: response.body.data.mb_views_nft_activities_rollup,
  };
};

return { fetchNFTInfo };