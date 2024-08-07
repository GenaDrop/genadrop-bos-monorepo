const accountId = props.accountId ?? context.accountId;
const isDarkModeOn = props.isDarkModeOn ?? false;
const localStorageData = props.localStorageData ?? {};
const setLocalStorageData = props.setLocalStorageData ?? (() => {});

const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const DaoSDK = VM.require("megha19.near/widget/daoSDK") || {
  DaoSDK: () => <></>,
};

const [connectAsDao, setConnectAsDao] = useState(localStorageData);
const [daoError, setDaoError] = useState("");
const [daoAddress, setDaoAddress] = useState(localStorageData.address || "");
const [sdk, setSdk] = useState(null);
const [inputActive, setInputActive] = useState(!!!connectAsDao.address ?? true);

useEffect(() => {
  setConnectAsDao(localStorageData);
}, [localStorageData]);

const validateDAOaddress = (id) => {
  const newSdk = DaoSDK(id);
  setSdk(newSdk);

  Near.asyncView(id, "get_policy")
    .then((policy) => {
      if (!policy) {
        console.error("Invalid DAO address", id);
        setDaoError("Invalid DAO address");
        return false;
      }

      const hasPermission = newSdk.hasPermission({
        accountId: accountId,
        kindName: "FunctionCall",
        actionType: "AddProposal",
      });

      setLocalStorageData({
        ...connectAsDao,
        address: id,
        permission: hasPermission,
      });
      setConnectAsDao({
        ...connectAsDao,
        address: id,
        permission: hasPermission,
      });
      setDaoError(null);
      setInputActive(false);
      return true;
    })
    .catch((error) => {
      console.error("Error validating DAO address:", error);
      setDaoError("An error occurred while validating the DAO address.");
      return false;
    });
};

const handleInputChange = (e) => {
  setDaoAddress(e.target.value);
};

const DAOToggle = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &.dark-dao {
    background-color: #282a3a;
  }
  .ctab {
    align-items: center;
    flex-flow: row nowrap;
    background: transparent;
    color: var(--gray-800, #282a3a);
    width: 100%;
    font-size: 12px;
    &.user-dark {
      color: #fff;
      svg {
        path {
          stroke: #fff;
        }
      }
    }
  }
`;
return (
  <>
    {accountId && (
      <DAOToggle className={isDarkModeOn ? "dark-dao" : ""}>
        {inputActive ? (
          <div>
            <div className="input d-flex nowrap">
              <MbInputField
                id="connectasdao"
                placeholder="dao address"
                type="text"
                // label="Connect as DAO"
                error={daoError}
                className="input-field"
                value={daoAddress}
                isDarkModeOn={isDarkModeOn}
                onChange={handleInputChange}
              />
              <Widget
                src={`${config_account}/widget/Mintbase.MbButton`}
                props={{
                  label: "Connect",
                  btnType: "primary",
                  size: "medium",
                  state: "active",
                  onClick: (e) => {
                    e.stopPropagation();
                    validateDAOaddress(daoAddress);
                  },
                  isDarkModeOn,
                }}
              />
            </div>
            {daoError && <p className="error">{daoError}</p>}
          </div>
        ) : (
          <div
            className="input d-flex align-items-center nowrap"
            style={{ justifyContent: "unset" }}
          >
            <div>
              <p
                className={`connected_as ${
                  isDarkModeOn ? "connected-dark" : ""
                }`}
              >
                Connected as:{" "}
                {connectAsDao.permission ? "member" : "non-member"}
              </p>
              <p
                className={`d-flex ctab ${isDarkModeOn ? "user-dark" : ""}`}
                style={{
                  cursor: "unset",
                }}
              >
                <p
                  className={`status_indicator ${
                    connectAsDao.permission
                      ? `green`
                      : `red 
            `
                  }`}
                ></p>
                {connectAsDao.address}
              </p>
            </div>
            <i
              className="bi bi-pencil-fill py-2 px-3 rounded-2"
              style={{
                color: isDarkModeOn ? "#000" : "#fff",
                backgroundColor: isDarkModeOn ? "#fff" : "#000",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setInputActive(true);
              }}
            ></i>
          </div>
        )}
      </DAOToggle>
    )}
  </>
);
