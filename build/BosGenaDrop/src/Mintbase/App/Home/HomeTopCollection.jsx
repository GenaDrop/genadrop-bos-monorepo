// const { getInputLabelFontType } = VM.require(
//   "bos.genadrop.near/widget/Mintbase.components"
// );

const color = props.color || "#c2cdfd";
const { isDarkModeOn } = props;

const [sliceIndex, setSliceIndex] = useState(6);

const data = fetch("https://api.mintbase.xyz/stores/top-stores", {
  method: "GET",
  headers: {
    "mb-api-key": "anon",
    "Content-Type": "application/json",
  },
});

const tableData = JSON.parse(data?.body);

if (!tableData) return <div>No Data Available</div>;

const App = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div`
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 50%;
  @media (max-width: 1000px) {
    display: ${(props) => {
      return props.hide ? "none" : "block";
    }};
    width: 100%;
  }
  @media (max-width: 500px) {
    font-size: 12px;
    .number {
      grid-column: span 1 !important;
    }
  }
  .header {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: flex-end;
    justify-content: space-between;
    padding: 1rem 0;
    gap: 1rem;
    border-bottom: 2px solid ${isDarkModeOn ? "#374151" : "#E5E7EB"};
    color: ${isDarkModeOn ? "#4B5563" : "black"};
    margin-bottom: 1rem;
    font-weight: 500px;
    div {
      text-align: center;
    }
  }
  @media (max-width: 500px) {
    .header {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .header > *:nth-child(4) {
      display: none;
    }
  }
  .trx-row {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
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
    .title {
      display: flex;
      align-items: flex-start;
      flex: 1;
      text-decoration: none;
      width: 100%;
      gap: 10px;
      div {
        white-space: nowrap;
        height: 40px;
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        padding: 10px;
        margin: 0;
        margin-right: 200px;
        text-align: left !important;
        border-radius: 2px;
        transition: all 200ms;

        :hover {
          background: ${color};
          color: white;
        }
        @media (max-width: 500px) {
          font-size: 12px;
        }
      }
      img {
        object-fit: cover;
        width: 40px;
        height: 40px;
      }
    }
  }
  @media (max-width: 500px) {
    .trx-row {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .trx-row > *:nth-child(4) {
      display: none;
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
  color: black;
  border: 1px solid #000;
  border-radius: 6px;
  padding: 5px 10px;
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

return (
  <App>
    <Container>
      <div className="header">
        <div></div>
        <div>Store</div>
        <div>Transactions</div>
        <div>Owners</div>
      </div>
      <div>
        {tableData.slice(0, sliceIndex).map((activity, index) => {
          return (
            <div className="trx-row" key={activity.id}>
              <div className="number">{index + 1}</div>
              <a target="_blank" className="title" href={activity.websiteUrl}>
                <img
                  src={activity.icon || activity.profileImage || activity.media}
                  alt={activity.name}
                />
                {activity?.name && <div>{activity.name}</div>}
              </a>

              <div>
                {" "}
                {activity.transactions ? (
                  <div className="price">{activity.transactions}</div>
                ) : (
                  <div className="price">-</div>
                )}{" "}
              </div>
              <div className="price">{activity?.totalOwners}</div>
            </div>
          );
        })}
      </div>
    </Container>
    <Container hide={true}>
      <div className="header">
        <div></div>
        <div>Store</div>
        <div>Transactions</div>
        <div>Owners</div>
      </div>
      <div>
        {tableData.slice(6).map((activity, index) => {
          return (
            <div className="trx-row" key={activity.id}>
              <div>{7 + index}</div>
              <a target="_blank" className="title" href={activity.websiteUrl}>
                <img
                  src={activity.icon || activity.profileImage || activity.media}
                  alt={activity.name}
                />
                {activity?.name && <div>{activity.name}</div>}
              </a>

              <div>
                {" "}
                {activity.transactions ? (
                  <div className="price">{activity.transactions}</div>
                ) : (
                  <div className="price">-</div>
                )}{" "}
              </div>
              <div className="price">{activity?.totalOwners}</div>
            </div>
          );
        })}
      </div>
    </Container>
  </App>
);
