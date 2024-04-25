const { isDarkModeOn } = props;
const { getUserStores } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.sdk"
) || {
  getUserStores: () => <></>,
};
const accountId = props.accountId ?? context.accountId;
const Root = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  .count {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 16px;
    color: ${isDarkModeOn ? "#B3B5BD" : "#525c76"};
  }
  .pagination_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
  }
`;
const MainCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 20px;
  border-radius: 0.7em;
  width: 100%;
  margin-top: 1em;
`;
const [stores, setStores] = useState(null);
useEffect(() => {
  getUserStores(accountId)
    .then(({ data, errors }) => {
      if (errors) {
        console.error(errors);
      }
      setStores(data.launchpad_contracts);
    })
    .catch((error) => {
      console.error(error);
    });
}, [accountId]);
if (!stores) return "Loading ...";
const countNFTs = stores && stores.length;
const s = countNFTs > 1 ? "s" : "";
return (
  <Root className="mx-24 md:mx-64">
    <div className="count">{`${countNFTs} Result${s}`}</div>
    <MainCardsGrid>
      {stores.length ? (
        stores.map((store) => (
          <Widget
            src={`bos.genadrop.near/widget/Mintbase.App.Store.Card`}
            props={{
              isDarkModeOn,
              accountId,
              contract: store,
            }}
          />
        ))
      ) : (
        <h5>This user does not own a contract yet.</h5>
      )}
    </MainCardsGrid>
  </Root>
);
