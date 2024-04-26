const daoId = props.daoId ?? "marmaj.sputnik-dao.near";
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const baseApi = "https://api.pikespeak.ai";
let voters = [];
const CoADaoId = props.dev
  ? "coa.gwg-testing.near"
  : "congress-coa-v1.ndc-gwg.near";
const VotingBodyDaoId = props.dev ? "voting-body-v1.gwg-testing.near" : "";
const TCDaoId = props.dev
  ? "tc.gwg-testing.near"
  : "congress-tc-v1.ndc-gwg.near";
const HoMDaoId = props.dev
  ? "hom.gwg-testing.near"
  : "congress-hom-v1.ndc-gwg.near";
const isCongressDaoID =
  daoId === HoMDaoId || daoId === CoADaoId || daoId === TCDaoId;
function fetchIsHuman(account) {
  const userSBTs = Near.view("registry.i-am-human.near", "is_human", {
    account: account,
  });
  let isHuman = false;
  if (userSBTs) {
    userSBTs.forEach((sbt) => {
      if ("fractal.i-am-human.near" === sbt[0]) {
        isHuman = true;
      }
    });
  }
  return isHuman;
}
function fetchIsUserFollowed(account) {
  const followEdge = Social.keys(
    `${context.accountId}/graph/follow/${account}`,
    undefined,
    {
      values_only: true,
    }
  );
  return Object.keys(followEdge || {}).length > 0;
}
function addNonVotedMembers() {
  if (!policy?.users) {
    return;
  }
  Object.keys(policy.users)?.map((item) => {
    const index = voters.findIndex((d) => d.account === item);
    if (index === -1) {
      voters.push({
        account: item,
        groups: policy.users?.[item],
        approve: 0,
        rejected: 0,
        isHuman: fetchIsHuman(item),
        isUserFollowed: fetchIsUserFollowed(item),
      });
    }
  });
}
function fetchVotes() {
  const res = fetch(`${baseApi}/daos/votes/${daoId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": publicApiKey,
    },
  });
  if (res?.body?.length) {
    res?.body?.map((item) => {
      item.voters?.map((voterData) => {
        const accountIndex = voters.findIndex(
          (d) => d.account === voterData.account
        );
        if (accountIndex !== -1) {
          voters[accountIndex] = {
            ...voters[accountIndex],
            rejected: voters[accountIndex].rejected + voterData.rejected,
            approve: voters[accountIndex].approve + voterData.approve,
          };
        } else {
          voters.push({
            ...voterData,
            isHuman: fetchIsHuman(voterData.account),
            isUserFollowed: fetchIsUserFollowed(voterData.account),
          });
        }
      });
    });
    // if any member have not voted on any proposal their data is not their in voters API
    if (policy?.users) {
      addNonVotedMembers();
    }
  } else {
    addNonVotedMembers();
  }
}
const processPolicy = (policy) => {
  const obj = {
    policy,
    users: {},
    roles: {},
    everyone: {},
  };
  policy.roles.forEach((role) => {
    if (role.kind === "Everyone") {
      obj.everyone = role;
    }
    if (role.kind.Group) {
      if (!obj.roles[role.name]) {
        obj.roles[role.name] = role;
      }
      role.kind.Group.forEach((user) => {
        if (!obj.users[user]) {
          obj.users[user] = [];
        }
        obj.users[user].push(role.name);
      });
    }
  });
  return obj;
};
function processCongressMembers(members) {
  let group = "";
  switch (daoId) {
    case HoMDaoId:
      group = "HoM Member";
      break;
    case CoADaoId:
      group = "CoA Member";
      break;
    case TCDaoId:
      group = "Transparency Commission Member";
      break;
  }
  const obj = {
    policy,
    users: {},
    roles: {
      [group]: {
        permissions: members?.permissions,
      },
    },
    everyone: {},
  };
  members?.members?.map((item) => {
    obj.users[item] = [group];
  });
  return obj;
}
const policy = isCongressDaoID
  ? useCache(
      () =>
        Near.asyncView(daoId, "get_members").then((members) =>
          processCongressMembers(members)
        ),
      daoId + "-processed_congress_policy",
      { subscribe: false }
    )
  : daoId === VotingBodyDaoId
  ? null
  : useCache(
      () =>
        Near.asyncView(daoId, "get_policy").then((policy) =>
          processPolicy(policy)
        ),
      daoId + "-processed_policy",
      { subscribe: false }
    );
if (policy === null) return "";
const EVERYONE = "Everyone";
const rolesArray = Object.keys(policy?.roles ?? {});
if (policy?.everyone?.permissions) {
  rolesArray = rolesArray.concat(EVERYONE);
}
const colorsArray = ["blue", "green", "pink", "red"];
const RolesColor = rolesArray.map((item, i) => {
  return { color: colorsArray[i] ?? "", role: item };
});
const PermissionsPopover = ({ currentRole }) => {
  const permissions =
    currentRole === EVERYONE
      ? policy?.everyone?.permissions
      : policy?.roles?.[currentRole]?.permissions;
  return (
    <Widget
      src="nearui.near/widget/Layout.Popover"
      props={{
        triggerComponent: <i class="bi bi-info-circle"></i>,
        content: (
          <div className="p-2">
            <h5 className="text-gray">Admins have permissions to:</h5>
            {permissions?.length > 0 && (
              <ul className="text-black text-sm">
                {permissions?.map((i) => (
                  <li>{i}</li>
                ))}
              </ul>
            )}
          </div>
        ),
      }}
    />
  );
};
const RoleTag = ({ roles, showIcon }) => {
  const tags = [];
  if (Array.isArray(roles)) {
    roles.map((item) => {
      tags.push(
        <div
          className={`custom-tag ${
            RolesColor.find((i) => i.role === item)?.color ?? ""
          }-bg`}
        >
          {item}
          {showIcon && <PermissionsPopover currentRole={item} />}
        </div>
      );
    });
  } else {
    // for everyone
    tags.push(
      <div className={`custom-tag`}>
        {roles}
        {showIcon && <PermissionsPopover currentRole={roles} />}
      </div>
    );
  }
  return <div className="d-flex gap-2">{tags.map((i) => i)}</div>;
};
fetchVotes();
State.init({
  daoUsers: Object.entries(policy.users).map(([key, data]) => ({
    name: key,
    tags: data,
  })),
});
const Root = styled.div`
    display: flex;
    align-items center;
    flex-wrap: wrap;
    gap: 30px;
    @media (max-width: 800px) {
      justify-content: center;
    }
`;
return (
  <Root>
    {state.daoUsers &&
      voters?.map((data) => (
        <Widget
          src="bos.genadrop.near/widget/CPlanet.DAO.Members.Card"
          props={{
            name: data.account,
            tags: data.groups,
            daoId: data.account,
            isFollowing: data.isUserFollowed,
          }}
        />
      ))}
  </Root>
);
