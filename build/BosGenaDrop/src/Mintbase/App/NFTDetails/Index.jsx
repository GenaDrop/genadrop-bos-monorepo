const {isDarkModeOn} = props

const Navbar = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    background:${isDarkModeOn?"#282a3a":"#f6f5f4"};
    height:50px;
    width:100%;
    .container{
        display:flex;
        flex-direction:row;
        justify-content:end;
        flex-wrap:wrap;
        margin-right:20px;
        gap:10px;
    }
    .button{
        background:none;
        border:1px solid #5b5d6b;
        color: ${isDarkModeOn?"#ffffff":"#000000"};
        outline:none;
        padding:5px 20px;
        border-radius:5px;
        min-width:100px;
    }
    .cus{
        color:red;
    }
`;

const fetchStoreFrontData = (nftId) => {
    const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
        "mb-api-key": "anon",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: `query MyQuery {
            mb_views_nft_metadata(
                where: {id: {_eq: "${nftId}"}}
                ) {
                id
                description
                base_uri
                media
                title
                listings {
                    minter
                    listed_by
                    market_id
                    created_at
                    price
                    token_id
                    metadata_id
                    token {
                        last_transfer_receipt_id
                    }
                }
                listings_aggregate {
                    aggregate {
                        count
                    }
                }
                nft_contract_id
            }
            mb_views_nft_activities_rollup(
                where: {metadata_id: {_eq: "${nftId}"}}
                order_by: {timestamp: desc}
            ) {
                action_receiver
                action_sender
                count
                description
                kind
                media
                metadata_id
                nft_contract_id
                receipt_id
                reference
                timestamp
                title
                tx_sender
                token_ids
                price
            }
        }
        `,
    }),
});
    //return response2.body.data;
    State.update({
    infoNFT: response2.body.data.mb_views_nft_metadata[0],
    NftCount:
        response2.body.data.mb_views_nft_metadata[0].listings_aggregate.aggregate.count,
    dataTransaction:response2.body.data.mb_views_nft_activities_rollup,
    });
};

const fetchNFTData = (contractId) => {
    const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
        "mb-api-key": "anon",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: `query MyQuery {
            mb_views_active_listings(
                where: {nft_contract_id: {_eq: "${contractId}"}}
                limit: 4
            ) {
                media
                title
                kind
                nft_contract_id
                listed_by
                token {
                    metadata_id
                }
            }
        }
        `,
    }),
    });
    //return response2.body.data;
    State.update({
        dataNFT:response2.body.data.mb_views_active_listings,
    });
};
fetchNFTData("pixelpals.mintbase1.near")
fetchStoreFrontData("pixelpals.mintbase1.near:6c807f26cc58a9d25108a98b2335e285")
//console.log(state.dataNFT)
return(
    <>
        <Navbar>
            <div className="container">
                <button className="button cus">Burn</button>
                <button className="button">Multiply</button>
                <button className="button">Transfer</button>
                <button className="button">Sell</button>
            </div>
        </Navbar>
        <Widget src={"bos.genadrop.near/widget/Mintbase.App.NFTDetails.NFTShow"} 
            props={{
                isDarkModeOn,
                data: state.infoNFT,
                NftCount: state.NftCount,
            }}
        />
        <Widget src={"bos.genadrop.near/widget/Mintbase.App.NFTDetails.NFTTable"} 
            props={{
                isDarkModeOn,
                dataTransaction: state.dataTransaction,
            }}
        />
        <Widget src={"bos.genadrop.near/widget/Mintbase.App.NFTDetails.NFTMore"} 
            props={{
                isDarkModeOn,
                dataNFT:state.dataNFT,
            }}
        />
    </>
)