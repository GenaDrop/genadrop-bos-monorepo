const [nftState, setNftState] = useState([]);
const fetchDaos = () => {
  const res = fetch(
    "https://raw.githubusercontent.com/GenaDrop/genadrop-bos-widgets/main/data/cdao-mintbase-contracts.json"
  );
  if (!res.ok) return;
  const data = JSON.parse(res.body).daoNftContracts;
  if (data.length) {
    const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
      method: "POST",
      headers: {
        "mb-api-key": "anon",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query MyQuery {
  mb_views_nft_tokens(
    where: {nft_contract: {id: {_in: ["marmaj.mintbase1.near"]}}}
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
      const tokens = response2.body.data.mb_views_nft_tokens;
      setNftState(tokens);
    }
  }
};
const logo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU";
fetchDaos();
const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
return (
  <Root>
    {nftState.length &&
      nftState.map((data, index) => (
        <Widget
          props={{
            title: data.title,
            description: data.description,
            image: data.media,
            owner: data.owner,
            chainState: "near",
            logo: logo,
            onButtonClick: () =>
              props.update({
                tab: "singleNFT",
                contractId: data.nft_contract_id,
                tokenId: data.token_id,
                chainState: "near",
              }),
            price: data.listings.length
              ? (data.listings.length / 1000000000000000000000000).toFixed(2)
              : null,
            isListed: data.listed ? "LISTED" : "NOT LISTED",
            tokenId: data.token_id,
            contractId: data.nft_contract_id,
          }}
          src="bos.genadrop.near/widget/CPlanet.NFTCard.Index"
        />
      ))}
  </Root>
);
