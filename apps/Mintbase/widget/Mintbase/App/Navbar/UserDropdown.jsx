const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const DaoSDK = VM.require("megha19.near/widget/daoSDK") || {
  DaoSDK: () => <></>,
};
const { isDarkModeOn, ...passProps } = props;
const StyledDropdown = styled.div`
  button,
  a {
    font-weight: 500;
  }
  .dropdown-toggle {
    display: flex;
    align-items: center;
    text-align: left;
    background-color: var(--mb-white, #ffffff);
    border-radius: 50px;
    outline: none;
    border: 0;

    &:after {
      color: #fff;
    }

    &.dark-dropdown-toggle {
      background-color: #1a1d26;
    }

    img {
      border-radius: 50% !important;
    }

    .profile-info {
      margin: 5px 10px;
      line-height: normal;
      max-width: 140px;

      .profile-name,
      .profile-username {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .profile-name {
        color: var(--gray-900, #101223);
      }
    }
  }

  ul {
    background-color: var(--mb-white, #ffffff);
    width: 100%;
    border-radius: 0px;
    border: 0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 24px;
    &.dark-ul {
      background-color: #1e2030;
    }
  }
  .dropdown-menu.show {
    margin: 10px !important;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 307px;
  }
  .dropdown-menu[data-bs-popper] {
    left: var(--bs-dropdown-spacer, 0);
    right: var(--bs-dropdown-spacer, 0);
  }
  .tab,
  .ctab {
    text-decoration: none;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    border-radius: 0.25rem;
    padding: 8px 12px;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    cursor: pointer;
    color: #000;
    background-color: #fff;
    width: fit-content;

    svg {
      margin-right: 7px;
      min-width: 24px;
      path {
        stroke: #000;
      }
    }
    &:focus {
      color: #4f58a3;
      box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
      background-color: rgba(59, 130, 246, 0.15);
      outline: 2px solid transparent;
      outline-offset: 2px;
      svg {
        path {
          stroke: #4f58a3;
        }
      }
    }
    &:hover {
      color: #4f58a3;
      background-color: rgba(66, 153, 225, 0.15);
      svg {
        path {
          stroke: #c5d0ff;
        }
      }
    }
    &.hover-dark {
      color: #fff;
      background-color: unset;
      svg {
        path {
          stroke: #fff;
        }
      }
      &:focus {
        color: #c5d0ff;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        background-color: rgba(59, 130, 246, 0.35);
        svg {
          path {
            stroke: #c5d0ff;
          }
        }
      }
      &:hover {
        color: #c5d0ff;
        background-color: rgba(59, 130, 246, 0.15);
        svg {
          path {
            stroke: #c5d0ff;
          }
        }
      }
    }

    @media (max-width: 768px) {
      padding: 12px;
      font-size: 12px;
      line-height: 14px;
    }
  }
  .ctab {
    background-color: var(--gray-100, #f3f4f8);
    color: var(--gray-800, #282a3a);
    width: 100%;
    font-size: 12px;
    &.user-dark {
      background-color: #282a3a;
      color: #fff;
      svg {
        path {
          stroke: #fff;
        }
      }
    }
  }
  .input {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;
    .input-field {
      width: 100%;
    }
  }
  .connected_as {
    font-size: 12px;
    margin-bottom: 0rem;
  }
  .status_indicator {
    width: 10px;
    height: 10px;
    border-radius: 50px;
    margin: 0px;
  }
  .green {
    background: green;
  }
  .red {
    background: red;
  }
  .error {
    color: red;
    font-size: 12px;
  }
`;

const Attach = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-link"
    viewBox="0 0 16 16"
  >
    <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
    <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
  </svg>
);
function UserDropdown({ ...props }) {
  const LOCALSTORAGE_KEY = "connectedDao";

  const setLocalStorageData = (data) => {
    try {
      Storage.set(LOCALSTORAGE_KEY, data);
    } catch (error) {
      console.error("Error writing to Storage:", error);
    }
  };

  const localStorageData = Storage.get(LOCALSTORAGE_KEY);
  const accountId = context.accountId;
  const profile = props?.profile;

  const withdrawStorage = useCallback(async () => {
    await near.contract.storage_withdraw({}, undefined, "1");
  }, [near]);

  const [connectAsDao, setConnectAsDao] = useState(
    localStorageData || { address: "", permission: false }
  );
  const [daoError, setDaoError] = useState("");
  const [daoAddress, setDaoAddress] = useState(localStorageData.address || "");
  const [sdk, setSdk] = useState(null);
  const [inputActive, setInputActive] = useState(
    !!!connectAsDao.address ?? true
  );

  const validateDAOaddress = (id) => {
    const newSdk = DaoSDK(id);
    setSdk(newSdk);
    const policy = newSdk && newSdk.getPolicy();
    const hasPermision =
      newSdk &&
      newSdk.hasPermission({
        accountId: accountId,
        kindName: "FunctionCall",
        actionType: "AddProposal",
      });

    if (!policy) {
      setDaoError("Invalid DAO address");
      return false;
    } else {
      setDaoError(null);
      setLocalStorageData({
        ...connectAsDao,
        address: id,
        permission: hasPermision,
      });
      setConnectAsDao({
        ...connectAsDao,
        address: id,
        permission: hasPermision,
      });
      setInputActive(false);
      return true;
    }
  };

  return (
    <>
      <StyledDropdown className="dropdown">
        <button
          className={`dropdown-toggle ${
            isDarkModeOn ? "dark-dropdown-toggle" : ""
          }`}
          type="button"
          id="dropdownMenu2222"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Widget
            src={"${alias_mob}/widget/ProfileImage"}
            props={{
              accountId: accountId,
              className: "d-inline-block",
              style: { width: "40px", height: "40px" },
            }}
          />
        </button>
        <ul
          className={`dropdown-menu ${isDarkModeOn ? "dark-ul" : ""}`}
          aria-labelledby="dropdownMenu2222"
          style={{ minWidth: "fit-content" }}
        >
          <li>
            <Link
              type="button"
              className={`dropdown-item ctab ${
                isDarkModeOn ? "user-dark" : ""
              }`}
              to={`/${config_account}/widget/Mintbase.App.Index?page=human&tab=user-settings&accountId=${accountId}`}
            >
              {Attach}
              {accountId}
            </Link>
          </li>
          <li>
            <Link
              className={`dropdown-item tab ${
                isDarkModeOn ? "hover-dark" : ""
              }`}
              type="button"
              to={`/${config_account}/widget/Mintbase.App.Index?page=human&tab=owned&accountId=${accountId}`}
            >
              View Profile
            </Link>
          </li>
          <li>
            {" "}
            {inputActive ? (
              <div>
                <div className="input d-flex nowrap">
                  <MbInputField
                    id="connectasdao"
                    placeholder="dao address"
                    type="text"
                    label="Connect as DAO"
                    error={daoError}
                    className="input-field"
                    value={daoAddress}
                    isDarkModeOn={isDarkModeOn}
                    onChange={(e) => setDaoAddress(e.target.value)}
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
                  <p className="connected_as">
                    Connected as:{" "}
                    {connectAsDao.permission ? "member" : "non-member"}
                  </p>
                  <p
                    className="d-flex align-items-center ctab"
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
          </li>
          {props.urlChecks && (
            <li>
              <button
                className={`dropdown-item tab ${
                  isDarkModeOn ? "hover-dark" : ""
                }`}
                type="button"
                onClick={() => props?.logOut()}
              >
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </StyledDropdown>
    </>
  );
}

return <UserDropdown {...props} />;
