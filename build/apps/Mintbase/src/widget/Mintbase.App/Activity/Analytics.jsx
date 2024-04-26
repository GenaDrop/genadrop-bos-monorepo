const accountId = props.accountId ?? "bos.genadrop.near";
const mode = props.mode || Storage.get("mode");
const IsDarkModeOn = mode === "dark";
const Root = styled.div`
  width: 100%;
  overflow: hidden;
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  margin: 30px 0;
  .title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;
const ContainerTable = styled.div`
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  display: flex;
  flex-direction: column;
  overflow-x: scroll; /* Prevent horizontal overflow */
  margin: 20px;
  @media (max-width: 500px) {
    width: 100vw;
    font-size: 12px;
  }
  .header {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    color: ${isDarkModeOn ? "#4B5563" : "black"};
    margin-bottom: 1rem;
    font-weight: 500px;
    div {
      padding-bottom: 1rem;
      text-align: center;
      border-bottom: 2px solid ${isDarkModeOn ? "#374151" : "#E5E7EB"};
    }
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
        background: "";
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
        display: flex;
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 2px;
        transition: all 200ms;
        :hover {
          background: "";
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
          background: "";
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
  @media (max-width: 500px) {
    .header,
    .trx-row {
      grid-template-columns: repeat(6, 150px);
    }
  }
`;
const Row = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: center;
`;
const ContainerCard = styled.div`
  .info-card {
    border-radius: 0.25rem;
    background: ${IsDarkModeOn ? "var(--gray-800)" : "rgba(40,42,58,0.1)"};
    //max-width: 165px;
    min-width: 168px;
    
    &.small,
    &.medium,
    &.big {
      padding: 8px;
      min-height: 46px;
      width:100%;
      @media (min-width: 480px) {
        min-height: 72px;
        padding: 12px;
      }
    }
    @media (min-width: 976px) {
      .info-card.small {
        min-width: 160px;
      }
    }
    .title-wrapper {
      display: flex;
      position: relative;
      align-items: center;
    }
    
`;
const Title = styled.div`
  color: ${IsDarkModeOn ? "var(--gray-300)" : "var(--gray-700)"};
  font-size: 13px;
`;
const Description = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  magrin: 5px 0;
  .description-rt {
    display: flex;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
  }
`;
const SearchBar = styled.div`
  padding: 20px;
  margin-top: 20px;
  diplay: flex;
  flex-direction: column;
  gap: 1rem;
  background: #dcdcdc;
  .title {
    font-size: 18px;
  }
  .search {
    width: 100%;
    padding: 10px 20px;
    outline: none;
    border: none;
    background: rgba(243, 244, 248);
    padding: 12px;
    margin: 10px 0;
    border-radius: 5px;
    :focs {
      border: 1px soild gray;
    }
  }
`;
const MbCard = ({ title, description }) => {
  return (
    title &&
    description && (
      <ContainerCard>
        <div className="info-card medium">
          <div className={`title-wrapper`}>
            <Title>{title}</Title>
          </div>
          <Description>
            <div className="description-rt">{description}</div>
          </Description>
        </div>
      </ContainerCard>
    )
  );
};
const data = [
  {
    title: "Mintbase Contracts",
    description: "4,644,3773",
  },
  {
    title: "Total Contracts",
    description: "4,644,3773",
  },
  {
    title: "Total Volume",
    description: "4,644,3773",
  },
  {
    title: "Tokens",
    description: "4,644,3773",
  },
  {
    title: "Minters",
    description: "4,644,3773",
  },
  {
    title: "Listed",
    description: "4,644,3773",
  },
  {
    title: "Affiliate",
    description: "4,644,3773",
  },
];
return (
  <>
    <SearchBar>
      <div className="title">Months</div>
      <input type="search" className="search" placeholder="0" />
    </SearchBar>
    <Row>
      {data.map((dt) => (
        <MbCard title={dt.title} description={dt.description} />
      ))}
    </Row>
  </>
);
