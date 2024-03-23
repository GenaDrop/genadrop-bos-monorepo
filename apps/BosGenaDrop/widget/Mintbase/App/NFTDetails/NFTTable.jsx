const {isDarkModeOn} = props    
const Provenance = styled.div`
    background:#f6f5f4;
    padding:30px;
    border-bottom:1px solid #bdbbb4;
    .title{
        font-size:20px;
        font-weight:600;
    }
`;

const ContainerTable = styled.div`
    background: ${isDarkModeOn ? "#1f2031" : "#f6f5f4"};
    display: flex;
    flex-direction: column;
    overflow-x: scroll; /* Prevent horizontal overflow */
    width:100%;
    @media (max-width: 500px) {
        width: 100vw;
        font-size: 12px;
    }

    .header {
        display: grid;
        grid-template-columns: repeat(8, minmax(0, 1fr));
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
    
        .item1 {
            grid-column-start: 1;
            grid-column-end: 1;
        }
        .item2 {
            grid-column-start: 2;
            grid-column-end: 3;
        }
        .item3 {
            grid-column-start: 3;
            grid-column-end: 4;
        }
        .item4{
            grid-column-start: 4;
            grid-column-end: 6;
        }
        .item5{
            grid-column-start: 6;
            grid-column-end: 8;
        }
        .item6{
            grid-column-start: 8;
            grid-column-end: 9;
        }
    }
    .trx-row {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 3fr));
        width: 100%;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 0;
        font-size:18px;
        border-bottom: 1px solid ${color}5a;
        &:last-of-type {
        border-bottom-color: transparent;
        }
    }

    a {
        text-decoration: none;
    }
    
    .address {
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        height: 40px;
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 2px;
        transition: all 200ms;
        margin-left:-4rem;
        :hover {
            color: #eee;
        }
    }
    .address_2 {
        color: ${isDarkModeOn ? "#c2cdfd" : "#4e58a2"};
        height: 40px;
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 2px;
        transition: all 200ms;
        margin-left:1rem;
        :hover {
            color: #eee;
        }
    }
    .title {
        display: flex;
        align-items: center;
        text-decoration: none;
        gap: 10px;
        margin-left:0;
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
            color: #000000;
            }
        }
        img {
            object-fit: cover;
            width: 40px;
            height: 40px;
            border-radius: 50%;
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
        margin-left:4rem;
        display:flex;
        margin-top:5px;
        align-items:center;
    }

    .time {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-left:3rem;
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
                background: #97d3f9;
            }
        }
    }
    }
    .price{
        margin-left:-3rem;
        display:flex;
        align-items:center;
    }
    .link{
        border-radius:5px;
        padding:10px 15px;
        color:#5861a8;
        display:flex;
        align-items:center;
        text-align:center;
        :hover{
            background:#c2d9f5;
        }
    }

    @media (max-width: 500px) {
        .header,
        .trx-row {
            grid-template-columns: repeat(7, 150px);
        }
    }
`;

const truncateString = (str, num) => {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}
const kindColor = {
    list: "#8c4fe5",
    unlist: "#8c4fe5",
    sale: "#0a7d6c",
    transfer: "#4f58a3",
    make_offer: "#4f58a3",
    mint: "#000000",
};


return(
    <>
        <Provenance>
            <div className="title">Provenance</div>
        </Provenance>
        <ContainerTable>
            <div className="header">
                <div className="item1">Event</div>
                <div className="item2">Token ID</div>
                <div className="item3">Price</div>
                <div className="item4">From</div>
                <div className="item5">To</div>
                <div className="item6">Date</div>
            </div>
            <div>
                <div className="trx-row">
                    <div
                            style={{
                                background: kindColor.list + "40",
                                color: isDarkModeOn ? "#fff" : kindColor.list,
                            }}
                            className="kind"
                            >
                            LIST
                    </div>
                    <div className="title">
                        384
                    </div>     
                    <div className="price">
                        17&nbsp;
                        <svg width="25px" height="25px" viewBox="0 0 18 18" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"-5px"}} class="fill-current text-black dark:text-white"><path d="M5.10976 4.05615C5.47596 4.05615 5.81596 4.24601 6.00779 4.55812L8.07455 7.62657C8.14188 7.7277 8.11455 7.86404 8.01343 7.93136C7.93145 7.98601 7.823 7.97925 7.74835 7.91502L5.71399 6.15052C5.68019 6.1201 5.62807 6.12319 5.59765 6.157C5.58385 6.17249 5.57652 6.19249 5.57652 6.21305V11.7376C5.57652 11.7832 5.61343 11.8198 5.65906 11.8198C5.68357 11.8198 5.70667 11.8091 5.72216 11.7902L11.8717 4.42911C12.072 4.19277 12.3661 4.05643 12.6757 4.05615H12.8906C13.4723 4.05615 13.9438 4.5277 13.9438 5.10939V12.8902C13.9438 13.4719 13.4723 13.9435 12.8906 13.9435C12.5244 13.9435 12.1844 13.7536 11.9926 13.4415L9.92582 10.3731C9.8585 10.2719 9.88582 10.1356 9.98695 10.0683C10.0689 10.0136 10.1774 10.0204 10.252 10.0846L12.2864 11.8491C12.3202 11.8795 12.3723 11.8764 12.4027 11.8426C12.4165 11.8271 12.4238 11.8071 12.4236 11.7866V6.26066C12.4236 6.21503 12.3867 6.17841 12.341 6.17841C12.3168 6.17841 12.2934 6.18911 12.2779 6.20798L6.1292 13.5705C5.92892 13.8069 5.63483 13.9432 5.32526 13.9435H5.11033C4.52864 13.9438 4.05681 13.4725 4.05624 12.8908V5.10939C4.05624 4.5277 4.52779 4.05615 5.10948 4.05615H5.10976Z" fill="currentColor"></path></svg>
                    </div>
                    <div className="address">
                        <a href="#" target="_blank" className="link">huunhanz.near</a>
                    </div>
                    <div className="address_2">
                        <a href="#" target="_blank" className="link text-truncate">{truncateString("simple.market.mintbase.near",15)}</a>
                    </div>
                    <div className="time">
                        2 days ago
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
                    </div>
                </div>
            </div>
        </ContainerTable>
    </>
)