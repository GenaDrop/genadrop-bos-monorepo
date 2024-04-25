const accountId = context.accountId;
if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}
let profile = Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}
State.init({
  profile,
});
const Wrapper = styled.div`
  * {
    font-family: Helvetica Neue;
    line-height: normal;
  }
  padding: 32px;
  #pills-tab,
  #pills-tabContent {
    display: none;
  }
  h4,
  h6 {
    font-weight: 700;
  }
  .rbt-token-removeable {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #fff;
    background: #000;
    border-radius: 50px;
    padding: 0.25rem 0.5rem;
    button {
      padding: unset;
      :hover {
        color: #fff;
        border-radius: 50px;
        background: #000;
      }
    }
    .rbt-token-label {
      padding: unset;
    }
  }
  .feed {
    .rbt-token-removeable {
      color: #000;
      background: #fff;
      border: 1px solid #b0b0b0;
      border-radius: 50px;
      button {
        color: #b0b0b0;
        :hover {
          color: #000;
          border-radius: 50px;
          background: #fff;
        }
      }
    }
  }
  input {
    :not([type="checkbox"]) {
      border-radius: 8px;
      background: #f8f8f8;
      :placeholder {
        color: #b0b0b0;
      }
      color: #000;
      outline: none;
      border: none;
      padding: 8px 264px 8px 16px;
    }
    :focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
  textarea,
  .rbt-input {
    border-radius: 8px;
    background: #f8f8f8;
    :placeholder {
      color: #b0b0b0;
    }
    color: #000;
    outline: none;
    border: none;
    padding: 8px 264px 8px 16px;
    :focus {
      border: none;
      outline: none;
      box-shadow: none;
      background: #f8f8f8;
    }
  }
  .subtitle {
    color: #b0b0b0;
  }
  .form-check-input {
    background-color: #fff;
    border-color: #000;
    :checked {
      background-color: #000;
      border-color: #000;
    }
  }
  .btn {
    border-radius: 32px;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    background-color: #fff;
    border-color: #000;
    color: #000;
    :hover {
      background-color: #000;
      border-color: #000;
      color: #fff;
    }
  }
  .btn-outline-primary {
    background-color: #000;
    border-color: #000;
    color: #fff;
    :hover {
      background-color: #fff;
      border-color: #000;
      color: #000;
    }
  }
  .input-group-text {
    background-color: #000;
    border: none;
    color: #fff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .ds-check {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.3rem;
    input {
      margin-top: unset;
    }
  }
`;
return (
  <Wrapper>
    <div className="row">
      <div className="col-lg-10">
        <div>
          <h4>Edit profile of @{accountId}</h4>
          <p className="subtitle">
            Welcome to Drop Flow. Artist portfolio page to show cases your work
            with customize themes on BOS.
          </p>
        </div>
        <div className="mb-2">
          <Widget
            src="bos.genadrop.near/widget/DropFlow.MetadataEditor"
            props={{
              initialMetadata: profile,
              onChange: (profile) => State.update({ profile }),
              options: {
                name: { label: "Name" },
                image: { label: "Profile picture" },
                backgroundImage: { label: "Background image" },
                description: { label: "Add Bio" },
                tags: {
                  label: "Tags",
                  tagsPattern: "*/profile/tags/*",
                  placeholder:
                    "rust, engineer, artist, humanguild, nft, learner, founder",
                },
                linktree: {
                  links: [
                    {
                      label: "Twitter",
                      prefix: "https://twitter.com/",
                      name: "twitter",
                    },
                    {
                      label: "Github",
                      prefix: "https://github.com/",
                      name: "github",
                    },
                    {
                      label: "Telegram",
                      prefix: "https://t.me/",
                      name: "telegram",
                    },
                    {
                      label: "Website",
                      prefix: "https://",
                      name: "website",
                    },
                  ],
                },
              },
            }}
          />
        </div>
        <div className="mb-2">
          <CommitButton data={{ profile: state.profile }}>
            Save profile
          </CommitButton>
          <Link
            className="btn btn-outline-primary ms-2"
            href={`/bos.genadrop.near/widget/DropFlow.ArtistPage.Index?accountId=${accountId}`}
          >
            View profile
          </Link>
        </div>
      </div>
      <div className="col-lg-2">
        <div>
          {/* <Widget
            src="bos.genadrop.near/widget/DropFlow.ArtistPage"
            props={{ accountId, profile: state.profile }}
          /> */}
        </div>
      </div>
    </div>
  </Wrapper>
);
