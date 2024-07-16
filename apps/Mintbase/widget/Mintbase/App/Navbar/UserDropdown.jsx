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
  }
  .dropdown-menu.show {
    margin: 10px !important;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 307px;
  }
  .dropdown-menu[data-bs-popper] {
    left: unset;
    right: var(--bs-dropdown-spacer, 0);
  }
  .tab,
  .ctab {
    text-decoration: none;
    text-align: left;
    display: flex;
    align-items: center;
    /* justify-content: flex-end; */
    gap: 0.2rem;
    border-radius: 0.25rem; /* Assuming default border radius */
    color: ${({ isDarkModeOn }) =>
      isDarkModeOn ? "#fff" : "#000"}; /* Ternary for text color */
    padding: 8px 12px; /* Assuming Tailwind CSS default spacing unit */
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Assuming Tailwind CSS default timing function and duration */
    white-space: nowrap;
    cursor: pointer;
    width: fit-content;

    svg {
      margin-right: 7px;
      min-width: 24px;
      path {
        stroke: ${({ isDarkModeOn }) => (isDarkModeOn ? "#fff" : "#000")};
      }
    }

    &:focus {
      color: ${({ isDarkModeOn }) => (isDarkModeOn ? "#C5D0FF" : "#4F58A3")};
      outline: 2px solid transparent; /* Assuming Tailwind CSS default focus outline */
      outline-offset: 2px; /* Assuming Tailwind CSS default focus outline offset */
      box-shadow: 0 0 0 2px
        ${({ isDarkModeOn }) =>
          isDarkModeOn
            ? "rgba(59, 130, 246, 0.5)"
            : "rgba(66, 153, 225, 0.5)"}; /* Ternary for box-shadow */
      background-color: ${({ isDarkModeOn }) =>
        isDarkModeOn
          ? "rgba(59, 130, 246, 0.35)"
          : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
      svg {
        path {
          stroke: ${({ isDarkModeOn }) =>
            isDarkModeOn ? "#C5D0FF" : "#4F58A3"};
        }
      }
    }

    &:hover {
      color: ${({ isDarkModeOn }) => (isDarkModeOn ? "#C5D0FF" : "#4F58A3")};
      background-color: ${({ isDarkModeOn }) =>
        isDarkModeOn
          ? "rgba(59, 130, 246, 0.15)"
          : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
      svg {
        path {
          stroke: ${({ isDarkModeOn }) =>
            isDarkModeOn ? "#C5D0FF" : "#4F58A3"};
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
  }
`;

const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

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
function UserDropdown({ isDarkModeOn, accountId, ...props }) {
  //   const near = useNear();
  //   const account = useAccount();

  const withdrawStorage = useCallback(async () => {
    await near.contract.storage_withdraw({}, undefined, "1");
  }, [near]);

  const [showPretendModal, setShowPretendModal] = useState(false);
  const [showMobileQR, setShowMobileQR] = useState(false);

  const profile = props?.profile;

  return (
    <>
      <StyledDropdown className="dropdown" isDarkModeOn={isDarkModeOn}>
        <button
          className="dropdown-toggle"
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
          {/* {props.widgets.profileName && (
                  <div className="profile-name">
                    <Widget src={props.widgets.profileName} />
                  </div>
                )} */}
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenu2222"
          style={{ minWidth: "fit-content" }}
        >
          <li>
            <Link
              type="button"
              className="dropdown-item ctab"
              to={`/${config_account}/widget/Mintbase.App.Index?page=human&tab=user-settings&accountId=${accountId}`}
            >
              {Attach}
              {accountId}
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item tab"
              type="button"
              to={`/${config_account}/widget/Mintbase.App.Index?page=human&tab=owned&accountId=${accountId}`}
            >
              {/* <User /> */}
              View Profile
            </Link>
          </li>
          {/* <li>
            <button
              className="dropdown-item tab"
              type="button"
              onClick={() => withdrawStorage()}
            >
              <Withdraw />
              Withdraw {props.availableStorage.div(1000).toFixed(2)}kb
            </button>
          </li>
          {account.pretendAccountId ? (
            <li key="pretend">
              <button
                className="dropdown-item tab"
                type="button"
                disabled={!account.startPretending}
                onClick={() => account.startPretending(undefined)}
              >
                <StopPretending />
                Stop pretending
              </button>
            </li>
          ) : (
            <>
              <li key="stop-pretend">
                <button
                  className="dropdown-item tab"
                  type="button"
                  onClick={() => setShowPretendModal(true)}
                >
                  <Pretend />
                  Pretend to be another account
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item tab"
                  type="button"
                  onClick={() => setShowMobileQR(true)}
                >
                  <QR />
                  Mobile Sign-in QR
                </button>
              </li>
            </>
          )} */}
          {props.urlChecks && (
            <li>
              <button
                className="dropdown-item tab"
                type="button"
                onClick={() => props.logOut()}
              >
                {/* <LogOut /> */}
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </StyledDropdown>
      {/* {showPretendModal && (
        <PretendModal
          key="pretend-modal"
          show={showPretendModal}
          onHide={() => setShowPretendModal(false)}
          widgets={props.widgets}
        />
      )} */}
    </>
  );
}

return <UserDropdown {...props} />;
