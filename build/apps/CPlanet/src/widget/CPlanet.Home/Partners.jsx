const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 54px;
  height: max-content;
  border: 1px solid #cdcdcd;
  background: #f8f8f8;
  border-top: none;
  h1 {
    color: #b0b0b0;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .partners {
    display: grid;
    margin-top: 40px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    width: 100%;
    align-items: center;
    justify-items: center;
    img {
      cursor: pointer;
    }
    img:hover {
      opacity: 0.8;
    }
    @media (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 40px;
    }
    @media (max-width: 500px) {
      grid-gap: 40px;
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media (max-width: 500px) {
    h1 {
      font-size: 35px;
      margin-bottom: 50px;
    }
  }
`;
return (
  <Root>
    <h1>We Work With The Best</h1>
    <div className="partners">
      <a target="_blank" href="https://near.foundation/">
        <img src="https://ipfs.near.social/ipfs/bafkreicgzwkboqnkollt63yo5jchbjszwvw7j4zs3q2wutmmir6telrpye" />
      </a>
      <a target="_blank" href="http://mintbase.xyz/">
        <img src="https://ipfs.near.social/ipfs/bafkreibfraebg4hm7atedo4pwd4vxm7xa4ssttoyx4ipjjnp533sufob3m" />
      </a>
      <a target="_blank" href="https://www.neardc.org/">
        <img src="https://ipfs.near.social/ipfs/bafkreia63u3nw7mb4ex5r74v4y6gfef2gj6x54mpjlh54f4swbyafao42i" />
      </a>
      <a target="_blank" href="http://genadrop.io/">
        <img src="https://ipfs.near.social/ipfs/bafkreifat2nwrnxsplscad6pqktksctqvbf4ub6ior4nbnnb3utjdf666y" />
      </a>
      <a target="_blank" href="http://ethmilan.xyz/">
        <img src="https://ipfs.near.social/ipfs/bafkreibcmjcwfetvhy7o4rkjrhcpgaupgn25y4mkqqt7g7ehmfegvn4uim" />
      </a>
      <a target="_blank" href="https://shard.dog/">
        <img src="https://ipfs.near.social/ipfs/bafkreibosuz52hmmhu7lvcbxewi7ubzo2zxxfldbsgyavpld5fgczto7oa" />
      </a>
    </div>
  </Root>
);
