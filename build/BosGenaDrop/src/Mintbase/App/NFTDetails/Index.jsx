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
            props={{isDarkModeOn}}
        />
        <Widget src={"bos.genadrop.near/widget/Mintbase.App.NFTDetails.NFTTable"} 
            props={{isDarkModeOn}}
        />
        <Widget src={"bos.genadrop.near/widget/Mintbase.App.NFTDetails.NFTMore"} 
            props={{isDarkModeOn}}
        />
    </>
)