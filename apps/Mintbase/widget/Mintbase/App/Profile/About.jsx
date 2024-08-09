const { isDarkModeOn, accountId } = props;
const { MbTextEditor } = VM.require(
  "${config_account}/widget/Mintbase.MbTextEditor"
) || {
  MbTextEditor: () => <></>,
};

const profile = Social.getr(`${accountId}/profile`);
const [showTable, setShowTable] = useState(true);
const [bio, setBio] = useState("");
const [showPreview, setShowPreview] = useState(false);

if (profile === null) {
  return "Loading";
}

console.log({ profile });

useEffect(() => {
  if (profile) {
    const { description } = profile;
    setBio(description);
  }
  console.log({ bio });
}, [profile]);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  height: fit-content;
  flex: 1;
  width: 100%;

  @media (max-width: 500px) {
    width: 100vw;
    min-width: 100vw;
    font-size: 12px;
  }

  .topic_line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1.5rem;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    cursor: pointer;
    i {
      transition: all 300ms;
      font-size: 1.5rem;
    }
    p {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .main-content {
    width: 100%;
  }
  .bottom-buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 1rem;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #3c3d43;
  }
  .top_tabs {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    justify-content: flex-start;
    width: 100%;
  }
  .tab {
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
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

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
`;

const tableToggleHander = () => {
  setShowTable((prev) => !prev);
};

const saveBio = async (bio) => {
  await Social.setr(`${accountId}/profile`, { ...profile, bio });
};

const Editor = `
  html {
    background: transparent;
  }
  
  * {
    border: none !important;
  }

  .rc-md-editor {
    background: transparent;
    border-top: 1px solid #3c3d43 !important; 
    border-radius: 8px;
  }

  .editor-container {
    background: transparent;
  }
  
  .drop-wrap {
    
    border-radius: 0.5rem !important;
  }

  .header-list {
    display: flex;
    align-items: center;
  }

  textarea {
    background: transparent !important;
    color: #939191 !important;

    font-family: sans-serif !important;
    font-size: 1rem;

    border: 1px solid #3c3d43 !important;
    border-top: 0 !important;
    border-radius: 0 0 8px 8px;
  }

  .rc-md-navigation {
    background: #ffffff26 !important;
    border: 1px solid #3c3d43 !important;
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-radius: 8px 8px 0 0;
  
    i {
      color: #cdd0d5;
    }
  }

  .editor-container {
    border-radius: 0 0 8px 8px;
  }

  .rc-md-editor .editor-container .sec-md .input {
    overflow-y: auto;
    padding: 8px !important;
    line-height: normal;
    border-radius: 0 0 8px 8px;
  }
`;

const userIsConnected = accountId === context.accountId;

return (
  <Container style={{ background: isDarkModeOn ? "#1f2031" : "#fff" }}>
    <div
      className="topic_line"
      onClick={tableToggleHander}
      style={{
        borderBottomColor: showTable
          ? isDarkModeOn
            ? "rgba(40, 42, 58, 1)"
            : "rgba(210, 212, 218, 1)"
          : "transparent",
        color: isDarkModeOn ? "#fff" : "#000",
      }}
    >
      <p>Edit About Tab</p>
      <i
        className={`bi bi-chevron-${showTable ? "up" : "down"}`}
        style={{
          fontSize: "1.5rem",
        }}
      ></i>
    </div>
    {userIsConnected && (
      <>
        {" "}
        <div className="top_tabs">
          <div
            className={`tab ${isDarkModeOn ? "hover-dark" : ""}`}
            style={{
              backgroundColor: !showPreview
                ? isDarkModeOn
                  ? "#C74C4C"
                  : "#FFDEDE"
                : "transparent",
              color: showPreview
                ? isDarkModeOn
                  ? "#fff"
                  : "#000"
                : isDarkModeOn
                ? "#fff"
                : "#000",
            }}
            onClick={() => setShowPreview(false)}
          >
            <i className="bi bi-pencil"></i>
            <p>Edit</p>
          </div>
          <div
            className="tab"
            style={{
              backgroundColor: showPreview
                ? isDarkModeOn
                  ? "#C74C4C"
                  : "#FFDEDE"
                : "transparent",
              color: showPreview
                ? isDarkModeOn
                  ? "#fff"
                  : "#000"
                : isDarkModeOn
                ? "#fff"
                : "#000",
            }}
            onClick={() => setShowPreview(true)}
          >
            <i className="bi bi-eye"></i>
            <p>Preview</p>
          </div>
        </div>
        {showTable &&
          (!showPreview ? (
            <div className="main-content p-2">
              <MbTextEditor
                value={bio}
                EditorCSS={Editor}
                isDarkModeOn={isDarkModeOn}
                onChange={(e) => setBio(e)}
                maxWidth="none"
              />
            </div>
          ) : (
            <div className="main-content p-2">
              <div
                className="p-2"
                style={{
                  background: isDarkModeOn ? "#1f2031" : "#fff",
                  borderRadius: "8px",
                }}
              >
                <p style={{ color: isDarkModeOn ? "#fff" : "#000" }}>{bio}</p>
              </div>
            </div>
          ))}
        <div className="bottom-buttons">
          <CommitButton
            disabled={false}
            force
            className="btn rounded-3"
            style={{
              background: "transparent",
              color: "var(--button-primary-color, #000)",
              padding: "0px",
              boxShadow: "none",
            }}
            data={{ profile: { description: bio } }}
            onCommit={() => {
              onCompose();
              setShowToast(true);
              //   State.update({ content: { text: "", image: {} } });
            }}
          >
            <Widget
              src={`${config_account}/widget/Mintbase.MbButton`}
              props={{
                label: "Publish",
                btnType: "primary",
                size: "medium",
                state: "active",
                onClick: () => saveBio(bio),
                isDarkModeOn,
              }}
            />
          </CommitButton>
        </div>
      </>
    )}
  </Container>
);
