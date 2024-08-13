const fc_args = (args) => {
  return Buffer.from(args, "utf-8").toString("base64");
};

function fetchGraphQL({
  id,
  limit,
  offset,
  listedFilter,
  ownedFilter,
  accountId,
}) {
  return asyncFetch(
    `https://api.mintbase.xyz/stores/${id}/filter?args=${fc_args(
      JSON.stringify({
        limit: limit,
        offset: offset,
        listedFilter,
        ownedFilter,
        kycFilter: false,
        accountId,
      })
    )}`,
    {
      method: "GET",
      headers: {
        "mb-api-key": "omni-site",
        "Content-Type": "application/json",
        "x-hasura-role": "anonymous",
      },
    }
  ).then((result) => JSON.parse(result.body));
}

function getStoreNFTs({
  offset,
  id,
  limit,
  listedFilter,
  ownedFilter,
  accountId,
}) {
  return fetchGraphQL({
    id: id,
    offset: offset || 0,
    limit: limit || 20,
    listedFilter,
    ownedFilter,
    accountId,
    ...(ownedFilter && { accountId }),
  });
}

return { getStoreNFTs };
