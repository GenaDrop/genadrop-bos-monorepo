const {isDarkModeOn,accountId} = props
const contractId = props.contractId || "nft.herewallet.near";
const metadataId = props.metadataId || "nft.herewallet.near:d96acabbdb8bc6ad1317385be84030ed";
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
    @media screen and (max-width:768px){
        display:none;
        height:10px;
    }
`;
const [SDK,setSDK] = useState(null);

const fetchStoreFrontData = (nftId) => {
    const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
        "mb-api-key": "anon",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: `query getTokenByMetadataId {
            mb_views_nft_tokens(
                where: {metadata_id: {_eq: "${nftId}"}}
                ) {
                media
                minter
                token_id
                metadata_id
                splits
                royalties_percent
                royalties
                title
                nft_contract_id
                owner
                base_uri
                description
                listings_aggregate {
                    aggregate {
                    count
                    }
                }
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
    infoNFT: response2.body.data.mb_views_nft_tokens[0],
    NftCount:
        response2.body.data.mb_views_nft_tokens[0].listings_aggregate.aggregate.count,
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
fetchNFTData(contractId);
fetchStoreFrontData(metadataId);
console.log(state.infoNFT.owner)

return(
    <>
        {state.infoNFT.owner==accountId&&
            <Navbar>
                <div className="container">
                    <button className="button cus">Burn</button>
                    <button className="button">Multiply</button>
                    <button className="button">Transfer</button>
                    <button className="button">Sell</button>
                </div>
            </Navbar>
        }
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
        <Widget
        src="bos.genadrop.near/widget/Mintbase.SDK"
        props={{
            mainnet: false,
            contractName: "mintspace2.testnet",
            loaded: SDK,
            onLoad: (SDK) => setSDK(SDK),
            onRefresh: (SDK) => setSDK(SDK),
        }}
        />
    </>
)