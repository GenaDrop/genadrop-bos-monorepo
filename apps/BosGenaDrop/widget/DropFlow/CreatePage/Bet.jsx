const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

let profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const initialMetadata = profile ?? {};

State.init({
  profile,
  account: accountId,
  initialMetadata,
  metadata: initialMetadata,
  reportedMetadata: initialMetadata,
  linktree: initialMetadata.linktree ?? {},
  image: initialMetadata.image,
  backgroundImage: initialMetadata.backgroundImage,
  screenshots: initialMetadata.screenshots ?? {},
});

const feedTabs = { Feed: "", Discussions: "", NFTs: "" };
const metadata = {
  name: options.name ? state.metadata.name : undefined,
  description: options.name ? state.metadata.description : undefined,
  linktree:
    options.linktree && Object.keys(state.linktree).length > 0
      ? state.linktree
      : undefined,
  image:
    options.image && state.image && Object.keys(state.image).length > 0
      ? state.image
      : undefined,
  backgroundImage:
    options.backgroundImage &&
    state.backgroundImage &&
    Object.keys(state.backgroundImage).length > 0
      ? state.backgroundImage
      : undefined,
  tags: options.tags ? state.metadata.tags : undefined,
  feed: options.feed ? state.metadata.feed : undefined,
  screenshots: options.screenshots ? state.metadata.screenshots : undefined,
  feedTabs: options.feedTabs ? state.metadata.feedTabs : undefined,
};

const onChange = (profile) => State.update({ profile });
if (
  onChange &&
  JSON.stringify(state.reportedMetadata) !== JSON.stringify(state.metadata)
) {
  State.update({
    reportedMetadata: state.metadata,
  });
  onChange(state.metadata);
}

const debounce = (func, wait) => {
  const pause = wait || 350;
  let timeout;

  return (args) => {
    const later = () => {
      clearTimeout(timeout);
      func(args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, pause);
  };
};

// const onFeedTabsChange = debounce((e) => {

//   });

/* Feed Tabs start */
const [selectedTabNames, setSelectedTabNames] = useState([]);

const tabsData = [
  {
    name: "Feed",
    desc: `Custom Web3 social feed that allows you to showcase your post,
    different hashtags, and fellow artists/projects you may be affiliated
    with.`,
    active: true,
  },
  {
    name: "Discussions",
    desc: `Create a custom forum for your NFT community or your page.`,
  },
  {
    name: "NFTs",
    desc: `Showcase your favorite NFT and NFT collections.`,
  },
  {
    name: "Polls",
    desc: `Create polls to survey your audience. Add a NFT gate so only people who hold a certain NFT can answer.`,
  },
  {
    name: "Docs",
    desc: `Deploy on-chain documentation and embed them into your page.`,
  },
  {
    name: "Portfolio",
    desc: `Upload your favorite pieces of work to decentralized storage forever and showcase them beautifully.`,
  },
];

function stringArrayToObject(stringArray) {
  return stringArray.reduce((obj, stringValue) => {
    obj[stringValue.toLowerCase()] = "";
    return obj;
  }, {});
}

// const initialSelectedTabs = Object.keys(feedTabs); // Get tab names as array

// const loadHandler = () => setSelectedTabNames(initialSelectedTabs);

const handleTabSelection = (newSelectedTabs) => {
  setSelectedTabNames(newSelectedTabs);
};

function FeedTabs() {
  const [selectedTabs, setSelectedTabs] = useState([]);

  const handleTabChange = (tabName) => {
    const isAlreadySelected = selectedTabs.includes(tabName);
    setSelectedTabs(
      isAlreadySelected
        ? selectedTabs.filter((tab) => tab !== tabName)
        : [...selectedTabs, tabName]
    );

    // setSelectedTabs((prevSelectedTabs) =>
    //   prevSelectedTabs.includes(tabName)
    //     ? prevSelectedTabs.filter((tab) => tab !== tabName)
    //     : [...prevSelectedTabs, tabName]
    // );
  };

  return (
    <div className="tabsGrid">
      {tabsData.map((tab) => {
        const { name } = tab;
        return (
          <TabCard key={name} active={selectedTabs.includes(name)}>
            <div className="cardTop">
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={selectedTabs.includes(name)}
                onChange={() => handleTabChange(name)}
                className="form-check-input rounded-circle"
              />
              <label htmlFor={name}>{name}</label>
            </div>
            <div className="cardBottom">
              <p>{tab.desc}</p>
            </div>
          </TabCard>
        );
      })}
    </div>
  );
}

console.log(selectedTabNames);

/* Feed Tabs End */

const TabCard = styled.div`
  display: flex;
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 32px;
  border: 1px solid #fff;
  background: ${({ active }) => (active ? "#000" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border: 1px solid #000;
  max-width: 464px;
  .cardTop {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .form-check-input {
    background-color: #fff;
    border-color: #000;
    :checked {
      background-color: #000;
      border-color: #fff;
    }
  }
`;

const Wrapper = styled.div`
  max-width: 1440px;
  padding: 32px;
  * {
    font-family: Helvetica Neue;
    line-height: normal;
    box-sizing: border-box;
  }
  .section {
    margin-bottom: 32px;
  }
  .tabsGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 100%;
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  h4,
  h6 {
    font-weight: 900;
  }
  .btn {
    border-radius: 32px;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    background-color: #000;
    border-color: #000;
    color: #fff;
    :hover {
      background-color: #fff;
      border-color: #000;
      color: #000;
    }
  }
  .form-check.ds-check {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.3rem;
    input {
      margin-top: unset;
    }
    .form-check-input {
      background-color: #fff;
      border-color: #000;
      :checked {
        background-color: #000;
        border-color: #fff;
      }
    }
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
      background: #fff;
      border: 2px solid #efefef;
      :placeholder {
        color: #b0b0b0;
      }
      color: #000;
      outline: none;
      padding: 8px 264px 8px 16px;
    }
    :focus {
      box-shadow: none;
    }
  }
  .defaultDisc {
    opacity: 0.5;
    color: #b0b0b0;
  }
  .discussion-main {
    padding-top: 1rem;
  }
  .txt,
  .form-select {
    max-width: 500px;
  }
  .attach-nft,
  .attach-collection {
    color: #b0b0b0;
    border: 1px solid #efefef;
    background: #f8f8f8;
    :hover {
      path {
        fill: #000;
      }
    }
  }
  .attach-nft {
    ${({ selectedNFTButton }) =>
      selectedNFTButton === "nft" &&
      `
      color: #fff;
      background-color: #000;
      border: 1px solid #fff;
      `}
  }
  .attach-collection {
    ${({ selectedNFTButton }) =>
      selectedNFTButton === "collection" &&
      `
      color: #fff;
      background-color: #000;
      border: 1px solid #fff;
      `}
  }
`;

function onChangeDisabled() {
  State.update({
    disabled: !state.disabled,
  });
  console.log(state.disabled);
}

console.log("selectedTabNames: ", selectedTabNames);

const feedTabsObject =
  selectedTabNames && stringArrayToObject(selectedTabNames);
console.log("tabsObject: ", feedTabsObject);
console.log("feeedtabsobj: ", state.metadata.feedTabs);
selectedTabNames &&
  State.update({
    metadata: {
      ...state.metadata,
      feedTabs: feedTabsObject,
    },
  });

const submitHandler = () => {
  console.log("initialMetadata", initialMetadata);
  console.log("state metadata", state.metadata);
  console.log("metadata", metadata);
  // const feedTabsObject = stringArrayToObject(selectedTabNames);
  // console.log("tabsObject: ", feedTabsObject);
  // State.update({
  //   metadata: {
  //     ...state.metadata,
  //     feedTabs: feedTabsObject,
  //   },
  // });
  console.log("feeedtabsobj: ", state.metadata.feedTabs);
};

/* Discussions start */

const [discussionType, setDiscussionType] = useState("");

const TextareaWrapper = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;

  textarea {
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }

  textarea::placeholder {
    padding-top: 4px;
    font-size: 20px;
  }

  textarea:focus::placeholder {
    font-size: inherit;
    padding-top: 0px;
  }

  &::after,
  textarea,
  iframe {
    width: 100%;
    padding: 8px 0;
    min-width: 1em;
    height: unset;
    min-height: 3em;
    font: inherit;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: 0px solid #eee;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }

  iframe {
    padding: 0;
  }

  textarea:focus,
  textarea:not(:empty) {
    border-bottom: 1px solid #eee;
    min-height: 5em;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }
  &.markdown-editor::after {
    padding-top: 66px;
    font-family: monospace;
    font-size: 14px;
  }
`;

const Search = styled.div`
  margin-top: 12px;
  // justify-content: center;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  input {
    border-radius: 8px;
    flex-shrink: 0;
    height: 48px;
    width: 100%;
    background: #f8f8f8;
    overflow: hidden;
    color: #b0b0b0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 29.6px */
  }
`;

const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading";
}
const accounts = Object.entries(data);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  allWidgets.push(accountId);
}

const onChangeContractID = (contractId) => {
  State.update({
    nftContractId: contractId,
  });
};

const onChangeTokenID = (tokenId) => {
  State.update({
    nftTokenId: tokenId,
  });
};

const onChangeAccount = (account) => {
  State.update({
    account: account[0],
  });
};

console.log("tokenId and accoutId: ", state.nftTokenId);

const Card = styled.div`
  padding: 1em;
  border: 1px solid #e5e8eb;
  gap: 2em;
  margin: 10px auto;
  border-radius: 0.7em;
  width: 100%;
`;

const discussionTypeHandler = (e) => {
  // e.preventDefault();
  const { value } = e.target;
  console.log(value);
  value && setDiscussionType(value);
};
console.log("discussionType: ", discussionType);

const [nftOrCollectionActive, setNFTOrCollectionActive] = useState(null);

const nftOrCollectionSwitchHandler = (clickedButtonId) => {
  // e.preventDefault();
  // const { id, name } = e.target;
  // console.log("selecte item: ", button);
  if (clickedButtonId === "nft") {
    setNFTOrCollectionActive(null);
    clicked;
  } else if (clickedButtonId === "collection") {
    setNFTOrCollectionActive(null);
  }
  setNFTOrCollectionActive(clickedButtonId);
};
console.log("clicked: ", nftOrCollectionActive);
return (
  <Wrapper className="container" selectedNFTButton={nftOrCollectionActive}>
    <h1>Customize your Page </h1>
    <div className="section">
      <h6>Select the Tabs that you want to display</h6>
      <FeedTabs
        selectedTabs={selectedTabNames}
        onTabChange={handleTabSelection}
      />
    </div>
    <div className="section feed-tags">
      <div className="mb-2 feed">
        <h4>Your Feed</h4>
        <div className="form-check ds-check">
          <input
            className="form-check-input rounded-circle"
            type="checkbox"
            onChange={onChangeDisabled}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Display The Default Feed
          </label>
        </div>

        <h6>{options.feed.label ?? "Accounts To Display"}</h6>
        <Widget
          src="jgodwill.near/widget/PageFeedsEditor"
          props={{
            initialPageFeedsObject: state.metadata.feed,
            pageFeedPattern: "*/profile/feed/*",
            placeholder:
              "Enter the usernames to display on your feed e.g. mob.near, jodwill.near, agwaze.near, etc",
            setPageFeedsObject: (feed) => {
              state.metadata.feed = feed;
              State.update();
            },
            disabled: state.disabled,
          }}
        />
      </div>
      {options.tags && (
        <div className="mb-2">
          <h4>{options.tags.label ?? "Tags"}</h4>
          <Widget
            src="mob.near/widget/TagsEditor"
            props={{
              initialTagsObject: state.metadata.tags,
              tagsPattern: "*/profile/tags/*",
              placeholder:
                options.tags.placeholder ??
                "rust, engineer, artist, humanguild, nft, learner, founder",
              setTagsObject: (tags) => {
                state.metadata.tags = tags;
                State.update();
              },
            }}
          />
        </div>
      )}
    </div>
    <div className="section discussions">
      <div className="mb-2 feed">
        <h4>Your Discussions</h4>
      </div>
      <div className="discussions-main">
        <div className="discussion-type-select mb-4 d-flex align-items-center gap-2">
          <span className="select-label">Choose Discussion Type</span>
          <select
            class="form-select"
            aria-label="Default select example"
            value={discussionType}
            onChange={discussionTypeHandler}
          >
            <option className="defaultDisc" selected>
              Select Type from dropdown
            </option>
            <option value="hashtag">Based on Hashtag</option>
            <option value="nftcommunity">For NFT Community</option>
            <option value="profile">For Your Profile</option>
          </select>
        </div>
        <div className="discussion-main">
          {discussionType === "hashtag" && (
            <div className="mb-2">
              <h4>{options.tags.label ?? "Create Hashtags"}</h4>
              <Widget
                src="mob.near/widget/TagsEditor"
                props={{
                  initialTagsObject: state.metadata.tags,
                  tagsPattern: "*/profile/tags/*",
                  placeholder: "Enter the hashtag",
                  setTagsObject: (tags) => {
                    state.metadata.tags = tags;
                    State.update();
                  },
                }}
              />
            </div>
          )}
          {discussionType === "nftcommunity" && (
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="nftcontractaddress">NFT Contract Address</label>
              <input
                type="text"
                name="nftcontractaddress"
                id="nftcontractaddress"
                className="txt"
              />
            </div>
          )}
          {discussionType === "profile" && (
            <div className="mb-2">
              <div className="discussion-title d-flex align-items-center gap-2 mb-3">
                <label htmlFor="discussiontitle">
                  Add a Title to the Discussion
                </label>
                <input
                  type="text"
                  id="discussiontitle"
                  name="discussiontitle"
                  className="txt"
                />
              </div>
              <TextareaWrapper
                className={"markdown-editor"}
                data-value={state.text || ""}
              >
                <Widget
                  key={`markdown-editor-true`}
                  src="mob.near/widget/MarkdownEditorIframe"
                  props={{
                    initialText: state.text,
                    onChange,
                    embedCss,
                  }}
                />
              </TextareaWrapper>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="section">
      <div className="mb-2 feed">
        <h4>NFTs to Display</h4>
      </div>
      <div className="nfts-tab-main">
        <div className="attach-nft-buttons d-flex align-items-center gap-2">
          <button
            className="btn attach-nft"
            id="nft"
            name="nft"
            onClick={() => nftOrCollectionSwitchHandler("nft")}
          >
            <svg
              width="12"
              height="16"
              viewBox="0 0 12 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.49 3.98879V4.17009H7.66V0.340088H7.8413C8.03175 0.340089 8.2144 0.415743 8.34907 0.550409L11.2796 3.48099C11.4143 3.61567 11.49 3.79833 11.49 3.98879ZM7.42062 5.12759C7.02566 5.12759 6.7025 4.80443 6.7025 4.40946V0.340088H0.718125C0.321511 0.340088 0 0.661598 0 1.05821V14.942C0 15.3386 0.321511 15.6601 0.718125 15.6601H10.7719C11.1685 15.6601 11.49 15.3386 11.49 14.942V5.12759H7.42062ZM3.36756 5.60634C4.16079 5.60634 4.80381 6.24936 4.80381 7.04259C4.80381 7.83582 4.16079 8.47884 3.36756 8.47884C2.57433 8.47884 1.93131 7.83582 1.93131 7.04259C1.93131 6.24936 2.57436 5.60634 3.36756 5.60634ZM9.59131 12.7876H1.93131L1.94582 11.3368L3.12818 10.1545C3.2684 10.0142 3.48123 10.0288 3.62144 10.169L4.80381 11.3513L7.90117 8.25397C8.04138 8.11376 8.26873 8.11376 8.40897 8.25397L9.59131 9.43634V12.7876Z"
                fill={
                  !nftOrCollectionActive ||
                  nftOrCollectionActive === "collection"
                    ? "#C0C0C0"
                    : "#fff"
                }
              />
            </svg>
            <span>Attach an NFT</span>
          </button>
          <button
            className="btn attach-collection"
            id="collection"
            name="collection"
            onClick={() => nftOrCollectionSwitchHandler("collection")}
          >
            <svg
              width="21"
              height="16"
              viewBox="0 0 21 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9045 13.4715V14.0187C16.9045 14.9252 16.1696 15.6601 15.2631 15.6601H2.13166C1.22512 15.6601 0.490234 14.9252 0.490234 14.0187V5.26437C0.490234 4.35783 1.22512 3.62295 2.13166 3.62295H2.67881V10.7358C2.67881 12.2443 3.90605 13.4715 5.41452 13.4715H16.9045ZM20.1874 10.7358V1.98152C20.1874 1.07497 19.4525 0.340088 18.5459 0.340088H5.41452C4.50797 0.340088 3.77309 1.07497 3.77309 1.98152V10.7358C3.77309 11.6423 4.50797 12.3772 5.41452 12.3772H18.5459C19.4525 12.3772 20.1874 11.6423 20.1874 10.7358ZM9.24452 3.62295C9.24452 4.52949 8.50964 5.26437 7.60309 5.26437C6.69655 5.26437 5.96166 4.52949 5.96166 3.62295C5.96166 2.7164 6.69655 1.98152 7.60309 1.98152C8.50964 1.98152 9.24452 2.7164 9.24452 3.62295ZM5.96166 8.54723L7.86008 6.64882C8.02032 6.48857 8.28015 6.48857 8.44043 6.64882L9.79166 8.00009L14.4258 3.36596C14.586 3.20571 14.8459 3.20571 15.0061 3.36596L17.9988 6.35866V10.1887H5.96166V8.54723Z"
                fill={
                  !nftOrCollectionActive || nftOrCollectionActive === "nft"
                    ? "#C0C0C0"
                    : "#fff"
                }
              />
            </svg>
            <span>Attach a collection</span>
          </button>
        </div>
        <div className="nfts-collection-select">
          {nftOrCollectionActive === "nft" && (
            <div className="">
              <Card>
                Near Wallet Address:
                <Search>
                  <Typeahead
                    id="type"
                    className="type-ahead"
                    isLoading={isLoading}
                    labelKey="search"
                    options={allWidgets}
                    onChange={(value) => onChangeAccount(value)}
                    placeholder={accountId}
                    allowNew
                  />
                </Search>
              </Card>{" "}
              <div>
                <div
                  className="p-2 rounded mt-3"
                  style={{
                    background: "#fdfdfd",
                    border: "solid 1px #dee2e6",
                    borderBottomLeftRadius: ".375rem",
                    borderBottomRightRadius: ".375rem",
                    minHeight: "9em",
                  }}
                >
                  <div>
                    <div className="mt-2">
                      <Widget
                        src={`jgodwill.near/widget/genadrop-nft-selector`}
                        props={{
                          onChange: ({ contractId, tokenId }) => {
                            State.update({
                              contractId: contractId,
                              tokenId: tokenId,
                            });
                            onChangeTokenID(tokenId);
                            onChangeContractID(contractId);
                          },
                          accountId: state.account,
                          headingText: "Select an NFT to embed",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {nftOrCollectionActive === "collection" && (
            <div className="">Select Collection</div>
          )}
        </div>
      </div>
    </div>
    <CommitButton
      className="btn"
      data={{ profile: state.profile }}
      onClick={submitHandler}
    >
      Save Page
    </CommitButton>
    {/* <button className="btn" onClick={submitHandler}>
      sub
    </button> */}
  </Wrapper>
);
