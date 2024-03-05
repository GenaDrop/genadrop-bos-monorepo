const cursomStyle = props.cursomStyle || "";
const mode = props?.mode;
const perPage = props.perPage || 50; // need to be less than 50
const color = props.color || "#c2cdfd";
const { getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);

const isDarkModeOn = mode === "dark";

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreib2cfbayerbbnoya6z4qcywnizqrbkzt5lbqe32whm2lubw3sywr4";
const [page, setPage] = useState(0);

const _address = (address, _limit) => {
  const limit = _limit || 20;
  if (address.length > limit) return address.slice(0, 10) + "...";
  else return address;
};
const YoctoToNear = (amountYocto) => {
  return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
};
const utcDate2 = new Date();

// Get the current date in the local time zone
const currentDate = new Date();

// Calculate the time zone offset in milliseconds
let localTimeZoneOffsetMinutes = currentDate.getTimezoneOffset();
localTimeZoneOffsetMinutes = localTimeZoneOffsetMinutes * 60 * 1000;

const currentTimestamp = new Date().getTime();
const getTimePassed = (date) => {
  // Get the current timestamp in milliseconds
  const timestamp = new Date(date).getTime();

  // Calculate the difference in milliseconds
  const timePassed = currentTimestamp + localTimeZoneOffsetMinutes - timestamp;

  // Convert milliseconds to seconds, minutes, hours, etc.
  const secondsPassed = Math.floor(timePassed / 1000);
  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(hoursPassed / 24);

  let time = 0;

  // Display the time passed conditionally
  if (daysPassed > 0) {
    time = `${daysPassed} days`;
  } else if (hoursPassed > 0) {
    time = `${hoursPassed} hours`;
  } else if (minutesPassed > 0) {
    time = `${minutesPassed} minutes`;
  } else {
    time = `${secondsPassed} seconds`;
  }
  return time;
};

const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "anon",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `query MyQuery {
        mb_views_nft_activities(order_by: {timestamp: desc}, limit: 10) {
            action_receiver
            action_sender
            price
            receipt_id
            timestamp
            currency
            kind
            metadata_id
            tx_sender
            token_id
            media
            title
          }
    }
  `,
  }),
});
const nft_activities = data?.body?.data?.mb_views_nft_activities;
if (!nft_activities) return "Loading ...";

const Root = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Container = styled.div`
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  margin: 10px;
  @media (max-width: 500px) {
    width: 100vw;
    font-size: 12px;
  }
  .header {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    gap: 1rem;
    border-bottom: 2px solid ${isDarkModeOn ? "#374151" : "#E5E7EB"};
    color: ${isDarkModeOn ? "#4B5563" : "black"};
    margin-bottom: 1rem;
    ${getInputLabelFontType("big")}
    font-weight: 500px;
    div {
      text-align: center;
    }
    ${cursomStyle}
  }
  .trx-row {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 3fr));
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid ${color}5a;
    &:last-of-type {
      border-bottom-color: transparent;
    }
    a {
      text-decoration: none;
    }
    div,
    a,
    span {
      text-align: center;
      margin: auto;
    }
    .address {
      color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 2px;
      transition: all 200ms;
      :hover {
        background: ${color};
        color: white;
      }
    }
    .title {
      display: flex;
      align-items: center;
      text-decoration: none;
      gap: 10px;
      div {
        white-space: nowrap;
        height: 40px;
        text
        display: flex;
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 2px;
        transition: all 200ms;
        :hover {
          background: ${color};
          color: white;
        }
      }
      img {
        object-fit: cover;
        width: 40px;
        height: 40px;
      }
    }
    .kind {
      width: fit-content;
      height: fit-content;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 0.9;
      padding: 4px;
      border-radius: 2px;
      text-transform: uppercase;
    }

    .time {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
      svg {
        box-sizing: content-box;
        height: 14px;
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        cursor: pointer;
        padding: 10px;
        border-radius: 2px;
        transition: all 200ms ease 0s;
        :hover {
          fill: white;
          background: ${color};
        }
      }
    }
  }
  .price {
    display: flex;
    gap: 4px;
    align-items: center;
    font-weight: 600;
    color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
    img {
      width: 14px;
    }
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    background: transparent;
    color: black;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 5px 10px;
    &:hover {
      background: transparent;
    }
  }
`;

const Trx = styled.div``;
const kindColor = {
  list: "#8c4fe5",
  unlist: "#8c4fe5",
  sale: "#0a7d6c",
  transfer: "#4f58a3",
  make_offer: "#4f58a3",
  mint: "#000000",
};
// const hanldeRoute = (receipt) => {
//   asyncFetch("https://api.nearblocks.io/v1/search?keyword=" + receipt).then(
//     (data) => {
//       const txnHash =
//         "https://nearblocks.io/txns/" +
//         data.body.receipts[0]?.originated_from_transaction_hash;
//       console.log(txnHash);
//       clipboard.writeText(txnHash);
//     }
//   );
// };
return (
  <Root>
    <Container>
      <div className="header">
        <div>Event</div>
        <div>NFT</div>
        <div>From</div>
        <div>To</div>
        <div> Price</div>
        <div>Date</div>
      </div>
      <div>
        {nft_activities
          .slice(page * perPage, (page + 1) * perPage)
          .map((activity) => {
            const hashData = fetch(
              "https://api.nearblocks.io/v1/search?keyword=" +
                activity.receipt_id
            );
            return (
              <div className="trx-row" key={activity.receipt_id}>
                <div
                  style={{
                    background: kindColor[activity.kind] + "40",
                    color: isDarkModeOn ? "#fff" : kindColor[activity.kind],
                  }}
                  className="kind"
                >
                  {activity.kind}
                </div>
                <a
                  href={
                    activity.metadata_id
                      ? `https://mintbase.xyz/meta/${activity?.metadata_id?.replace(
                          ":",
                          "%3A"
                        )}`
                      : "#"
                  }
                  target="_blank"
                  className="title"
                >
                  {" "}
                  <img
                    src={
                      "https://image-cache-service-z3w7d7dnea-ew.a.run.app/media?url=" +
                      activity.media
                    }
                    alt={activity.title}
                  />
                  {activity?.title && (
                    <div>{activity.title.substring(0, 6)}...</div>
                  )}
                </a>
                <Widget
                  src="near/widget/AccountProfileOverlay"
                  props={{
                    accountId: activity.action_sender,
                    children: (
                      <a
                        href={
                          "https://near.org/near/widget/ProfilePage?accountId=" +
                          activity.action_sender
                        }
                        className="address"
                        target="_blank"
                      >
                        {_address(activity.action_sender)}{" "}
                      </a>
                    ),
                  }}
                />
                <Widget
                  src="near/widget/AccountProfileOverlay"
                  props={{
                    accountId: activity.action_receiver,
                    children: (
                      <a
                        href={
                          "https://near.org/near/widget/ProfilePage?accountId=" +
                          activity.action_receiver
                        }
                        className="address"
                        target="_blank"
                      >
                        {_address(activity.action_receiver)}{" "}
                      </a>
                    ),
                  }}
                />

                <div>
                  {" "}
                  {activity.price ? (
                    <div className="price">
                      {YoctoToNear(activity.price)}
                      <img src={nearLogo} alt="NEAR" />
                    </div>
                  ) : (
                    <div className="price">-</div>
                  )}{" "}
                </div>
                <div className="time">
                  {" "}
                  {getTimePassed(activity.timestamp)} ago{" "}
                  {hashData.body.receipts[0]
                    ?.originated_from_transaction_hash && (
                    <a
                      href={
                        "https://nearblocks.io/txns/" +
                        hashData.body.receipts[0]
                          ?.originated_from_transaction_hash
                      }
                      target="_blank"
                    >
                      <svg
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m432 320h-32a16 16 0 0 0 -16 16v112h-320v-320h144a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16h-160a48 48 0 0 0 -48 48v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-128a16 16 0 0 0 -16-16zm56-320h-128c-21.37 0-32.05 25.91-17 41l35.73 35.73-243.73 243.64a24 24 0 0 0 0 34l22.67 22.63a24 24 0 0 0 34 0l243.61-243.68 35.72 35.68c15 15 41 4.5 41-17v-128a24 24 0 0 0 -24-24z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </Container>
    <Button disabled={true}>
      <button>Full Activity</button>
    </Button>
  </Root>
);
