const { deployStore } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.deploy_store"
);

const { getTimePassed } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.get_time_passed"
);

const { getUserStores } = VM.require(
  "bos.genadrop.near/widget/Mintbase.utils.get_user_stores"
);

return {
  deployStore,
  getTimePassed,
  getUserStores,
};
