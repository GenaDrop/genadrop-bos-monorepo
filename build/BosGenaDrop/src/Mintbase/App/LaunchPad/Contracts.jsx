const { accountId } = props;

const { getUserStores } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.sdk"
) || {
  getUserStores: () => <></>,
};
useEffect(() => {
  getUserStores(accountId ?? "nate.near")
    .then(({ data, errors }) => {
      if (errors) {
        // handle those errors like a pro
        console.error(errors);
      }
      // do something great with this precious data
      console.log({ accountId, data });
    })
    .catch((error) => {
      // handle errors from fetch itself
      console.error(error);
    });
}, [accountId]);

return <>HI</>;
