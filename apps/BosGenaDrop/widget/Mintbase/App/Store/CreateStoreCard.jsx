const Root = styled.div`
padding: 1em;
border: 2px dashed #525c76;
display: flex;
align-items: center;
justify-content: center;
align-content: center;
gap: 2em;
margin: 10px auto;
height: 293px;
max-width: 600px;
width: 100%;
`;

const CreateStoreCard = ({ isDarkModeOn, createStoreHandler }) => (
  <Root>
    <Widget
      src={`/*__@appAccount__*//widget/Mintbase.MbButton`}
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
