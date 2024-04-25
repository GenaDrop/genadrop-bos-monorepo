const verifiedCheck = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="13"
    viewBox="0 0 16 13"
    fill="none"
  >
    <rect y="0.5" width="16" height="12" rx="6" fill="#B0B0B0" />
    <path
      d="M5 6.69231L7 9L11 4"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CardRoot = styled.div`
  width: 315px;
  height: 480px;
  border: 1px solid #efefef;
  background: #fff;
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  height: 184px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  position: relative;
  width: 100%;
  background: black;
`;

const Bottom = styled.div`
  h1 {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    whitespace: nowrap;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
`;

const ImageProfile = styled.div`
  img {
    position: absolute;
    width: 66px;
    height: 66px;
    flex-shrink: 0;
    border: 1px solid white;
    border-radius: 50%;
    top: 45px;
    z-index: 99;
    object-fit: cover;
    background: black;
    left: 16px;
  }
`;

const HeaderText = styled.div`
  height: 150px;
  p {
    margin-bottom: 10px;
    overflow: hidden;
    color: #b0b0b0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const CardBody = styled.div`
  margin-top: 20px;
  padding: 0 16px;
  h1 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
  h3 {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    whitespace: nowrap;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
  }
`;

const AmountSec = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  div {
    span {
      color: #b0b0b0;
      font-family: Helvetica Neue;
      font-size: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
    }
    p {
      color: #000;
      font-family: Helvetica Neue;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
      span {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
      }
    }
  }
`;

const Username = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-bottom: 10px;
    margin-left: 5px;
  }
`;

return (
  <CardRoot>
    <Top>
      <img
        src={
          props.image ??
          "https://ipfs.near.social/ipfs/bafkreiajgp5bmkidwesy2d6tsbdkhyfzjtom2wse2sjcwii227lt5audvq"
        }
        alt=""
      />
    </Top>
    <Bottom>
      <CardBody>
        <HeaderText>
          <h1>{props.title ?? `My NFT CARD`}</h1>
          <Username>
            <p>{props.owner ?? "My User"}</p>
            {verifiedCheck}
          </Username>
          <h3>
            {(props.description && props.description.substring(0, 100)) ||
              `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.`.substring(
                0,
                100
              )}
          </h3>
        </HeaderText>
        <AmountSec>
          <div>
            <span>Current Price</span>
            <p>
              {props.price ?? "N/A"} {props.price ? <span>NEAR</span> : ""}
            </p>
          </div>
          <div>
            <span>Status</span>
            <p>{props.isListed ?? "- - -"}</p>
          </div>{" "}
        </AmountSec>
      </CardBody>
      {/* <Button>
          <a
            href={`https://www.mintbase.xyz/meta/${props.metadataId}`}
            target="_blank"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button disabled={!props.price}>
              {props.price ? "More Info" : "Not Available"}
            </button>
          </a>
        </Button> */}
    </Bottom>
  </CardRoot>
);
