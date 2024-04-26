const Root = styled.a`
  width: 328px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 8px;
  display: flex;
  background-color: black;
  text-decoration: none;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  :hover {
    text-decoration: none;
  }
`;
const Container = styled.div`
  display: flex;
  gap: 20px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  h1 {
    color: black;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
  span {
    color: black;
  }
`;
const ImageContainer = styled.div`
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid white;
  }
`;
const Tag = styled.div`
  color: #fff;
  font-family: Helvetica Neue;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 50px;
  background: #f8f8f8;
  width: max-content;
  color: #000;
  text-align: center;
  font-family: Helvetica Neue;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 15px */
  padding: 3px 10px;
`;
const Tags = styled.div`
  display: flex;
  gap: 7px;
  margin-left: 10px;
`;
initState({
  featuredNFTs: [],
});
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
    where: {nft_contract: {id: {_eq: "thekindao.mintbase1.near"}}}
    offset: 0
    limit: 6
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
  <Container>
    {state.featuredNFTs.length &&
      state.featuredNFTs.map((data, index) => (
        <Root
          href={
            props.isGateway
              ? `#/bos.genadrop.near/widget/CPlanet.NFTExplore.SingleNFT?contractId=${data.nft_contract_id}&tokenId=${data.token_id}&chainState=near`
              : `#/bos.genadrop.near/widget/CPlanet.Index?tab=singleNFT&contractId=${data.nft_contract_id}&tokenId=${data.token_id}&chainState=near`
          }
          onClick={() =>
            props.onButtonClick({
              tab: "singleNFT",
              contractId: data.nft_contract_id,
              tokenId: data.token_id,
              chainState: "near",
            })
          }
          style={{
            backgroundImage: `url("${data.media}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div />
          <Content>
            <h1>
              {data.title
                ? data.title.length > 15
                  ? `${data.title.substring(0, 15)}...`
                  : data.title
                : "MY NFT"}
            </h1>
            <span>{data.owner}</span>
          </Content>
        </Root>
      ))}
  </Container>
);
