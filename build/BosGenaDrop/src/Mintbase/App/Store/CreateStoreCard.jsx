const Root = styled.div`
padding: 1em;
border: 2px dashed #525c76;
display: flex;
align-items: center;
justify-content: center;
align-content: center;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
height: 293px;
max-width: 600px;
width: 100%;
button {
    border: 1px solid black;
    border-radius: 0;
    color: white;
    background: black;
    text-align: center
    display: flex;
    padding: 7px 20px;
    cursor: pointer;
  }
  button:disabled {
    background: grey;
    border: grey;
    cursor: not-allowed;
  }
  button:hover {
    background: white;
    color: black;
    border-color: black;
  }
`;

const CreateStoreCard = ({ isDarkModeOn, createStoreHandler }) => (
  <Root>
    <Widget
      src={`bos.genadrop.near/widget/Mintbase.MbButton`}
      props={{
        label: "Create Store",
        btnType: "primary",
        size: "big",
        onClick: createStoreHandler,
        isDarkModeOn,
      }}
    />
  </Root>
);

return {
  CreateStoreCard,
};
