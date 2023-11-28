const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  justify-content: center;
  .head,
  .community {
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .community {
    margin-top: 92px;
  }
  h1 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 64px;
    font-style: normal;
    font-weight: 500;
    text-align: center;
    line-height: normal;
  }
  span {
    color: #b0b0b0;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 131.3%; /* 31.512px */
  }
  .nfts {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  .daos {
    margin-top: 40px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  .all {
    color: black;
    cursor: pointer;
    text-decoration: none;

    border: 1px solid #000;
    transition: 0.3s ease-in-out;
    padding: 6px;
  }
  .all:hover {
    background: black;
    color: white;
  }
  .explore {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    .daos {
      margin-top: 40px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 35px;
    }
    span {
      font-size: 20px;
    }
  }
`;

const communities = [
  "marmaj.sputnik-dao.near",
  "daorecords.sputnik-dao.near",
  "vibes.sputnik-dao.near",
];

State.init({
  featuredNFTs: [],
});

const logo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU";

const fetchStoreFrontData = () => {
  const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
  mb_views_nft_tokens(
    where: {nft_contract: {id: {_eq: "marmaj.mintbase1.near"}}}
    offset: 0
    limit: 3
  ) {
                media 
                owner
                token_id
                nft_contract_id
                description
                title
                listings {
                    price
                    unlisted_at
                    listed_by
 
            }
      }
}
`,
    }),
  });
  if (response2.ok) {
    State.update({
      featuredNFTs: response2?.body?.data?.mb_views_nft_tokens,
    });
  }
};

fetchStoreFrontData();

return (
  <Root>
    <div className="head">
      <h1>Explore the NFTS</h1>
      <span>DAOs funded by the Creatives DAO</span>
    </div>
    <div className="explore">
      <div className="daos">
        {state.featuredNFTs.length ? (
          state.featuredNFTs.map((data, index) => (
            <div key={index}>
              <Widget
                props={{
                  title: data.title,
                  description: data.description,
                  image: data.media,
                  owner: data.owner,
                  chainState: "near",
                  logo,
                  onButtonClick: () =>
                    props.update({
                      tab: "singleNFT",
                      contractId: data.nft_contract_id,
                      tokenId: data.token_id,
                      chainState: "near",
                    }),
                  price: data.listings.length
                    ? (
                        data.listings.length / 1000000000000000000000000
                      ).toFixed(2)
                    : null,
                  isListed: data.listings.length ? "LISTED" : "NOT LISTED",
                  tokenId: data.token_id,
                  contractId: data.nft_contract_id,
                }}
                src="bos.genadrop.near/widget/CPlanet.NFTCard.Index"
              />
            </div>
          ))
        ) : (
          <div className="noNfts">
            <span>No NFTs to display right now</span>
          </div>
        )}
      </div>
      <a
        href="#/bos.genadrop.near/widget/CPlanet.Index?tab=explore"
        className="all"
        onClick={() => props.update({ tab: "explore" })}
      >
        Show All NFTs (50)
      </a>
    </div>
    <div className="community">
      <h1>Our Communties</h1>
      <span>DAOs funded by the Creatives DAO</span>
    </div>
    <div className="daos">
      {communities.map((data, index) => (
        <div key={index}>
          <Widget
            props={{
              daoId: data,
              onButtonClick: () =>
                props.update({ tab: "daoProfile", daoId: data }),
            }}
            src="bos.genadrop.near/widget/CPlanet.DAO.Card"
          />
        </div>
      ))}
    </div>
    <a
      href="#/bos.genadrop.near/widget/CPlanet.Index?tab=community"
      className="all"
      onClick={() => props.update({ tab: "community" })}
    >
      Show All Communities (59)
    </a>
  </Root>
);
