const accountId = props.accountId ?? context.accountId;
const widgetOwner = "jgodwill.near";
const isLoggedIn = context.accountId ? true : false;

if (!isLoggedIn) {
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
  collectionContractIdIsValid: false,
  nftTokenId: null,
  nftContractId: null,
  isValidCummunityContractId: false,
  disabled: !initialMetadata.feed ? true : false,
  portfolioImage: {},
  nftsArray:
    initialMetadata.nfts.type === "single" ? initialMetadata.nfts.content : [],
  nfts: initialMetadata.nfts ?? {},
  feedTabs: initialMetadata.feedTabs ?? {},
  discussion: initialMetadata.discussion ?? {},
  createPoll: false,
  feed: initialMetadata.feed ?? {},
  portfolio: initialMetadata.portfolio ?? {},
  theme: initialMetadata.theme ?? 0,
});

// const feedTabs = { Feed: "", Discussions: "", NFTs: "" };
// const metadata = {
//   name: options.name ? state.metadata.name : undefined,
//   description: options.name ? state.metadata.description : undefined,
//   linktree:
//     options.linktree && Object.keys(state.linktree).length > 0
//       ? state.linktree
//       : undefined,
//   image:
//     options.image && state.image && Object.keys(state.image).length > 0
//       ? state.image
//       : undefined,
//   backgroundImage:
//     options.backgroundImage &&
//     state.backgroundImage &&
//     Object.keys(state.backgroundImage).length > 0
//       ? state.backgroundImage
//       : undefined,
//   tags: options.tags ? state.metadata.tags : undefined,
//   discussion: options.discussion ? state.metadata.discussion : undefined,
//   feed: options.feed ? state.metadata.feed : undefined,
//   screenshots: options.screenshots ? state.metadata.screenshots : undefined,
//   feedTabs: options.feedTabs ? state.metadata.feedTabs : undefined,
//   nfts: options.nfts ? state.metadata.nfts : undefined,
// };

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

// const debounce = (func, wait) => {
//   const pause = wait || 350;
//   let timeout;

//   return (args) => {
//     const later = () => {
//       clearTimeout(timeout);
//       func(args);
//     };

//     clearTimeout(timeout);
//     timeout = setTimeout(later, pause);
//   };
// };

// const onFeedTabsChange = debounce((e) => {

//   });

/* Feed Tabs start */
const [selectedTheme, setSelectedTheme] = useState(
  state.initialMetadata.theme ?? 0
);
const [selectedTabNames, setSelectedTabNames] = useState(
  Object.keys(initialMetadata.feedTabs || {})
);

const [singleOrCollectionActive, setSingleOrCollectionActive] = useState(
  state.initialMetadata.nfts.type ?? null
);
const [discussionNFTContractId, setDiscussionNFTContractId] = useState(
  JSON.parse(initialMetadata.discussion.community) ?? null
);
const [discussionType, setDiscussionType] = useState(
  state.initialMetadata.discussion.type ?? null
);
const [allCommunities, setAllCommunities] = useState(null);
const [collectionContractId, setCollectionContractId] = useState(
  initialMetadata.nfts.type === "collection"
    ? JSON.parse(initialMetadata.nfts.content)
    : []
);
const [createPoll, setCreatePoll] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [doc, setDoc] = useState(null);
const [msg, setMsg] = useState("Attach a file");
const [portfolioEntryTitle, setPortfolioEntryTitle] = useState(null);
const [portfolioEntryText, setPortfolioEntryText] = useState(
  "Enter your portfolio content here"
);
const [allCollections, setAllCollections] = useState(null);

function generateUID() {
  const maxHex = 0xffffffff;

  const randomNumber = Math.floor(Math.random() * maxHex);

  return randomNumber.toString(16).padStart(8, "0");
}

console.log("single or collection active: ", singleOrCollectionActive);

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
    obj[stringValue && stringValue.toLowerCase()] = "";
    return obj;
  }, {});
}

// const initialSelectedTabs = Object.keys(feedTabs); // Get tab names as array

// const loadHandler = () => setSelectedTabNames(initialSelectedTabs);

const handleTabChange = (tabName) => {
  const isAlreadySelected = selectedTabNames.includes(tabName);
  setSelectedTabNames(
    isAlreadySelected
      ? selectedTabNames.filter((tab) => tab !== tabName)
      : [...selectedTabNames, tabName]
  );
};
// console.log("selectedTabNames: ", selectedTabNames);
// console.log("contains nfts? ", selectedTabNames.includes("nfts"));

console.log("collectioninitial: ", collectionContractId);

const FeedTabs = () => {
  // I need to add logic to disable a tab (for users who aren't human, and propbably add a toolti when it's disabled with a help message)
  return (
    <div key={selectedTabNames.join("-")} className="tabsGrid">
      {tabsData.map((tab) => {
        const { name, desc } = tab;
        const lowerCaseName = name.toLowerCase();
        return (
          <TabCard
            key={lowerCaseName}
            active={selectedTabNames.includes(lowerCaseName)}
          >
            <div className="cardTop">
              <input
                type="checkbox"
                id={lowerCaseName}
                name={lowerCaseName}
                checked={selectedTabNames.includes(lowerCaseName)}
                onChange={() => handleTabChange(lowerCaseName)}
                className="form-check-input rounded-circle"
              />
              <label htmlFor={lowerCaseName}>{name}</label>
            </div>
            <div className="cardBottom">
              <p>{desc}</p>
            </div>
          </TabCard>
        );
      })}
    </div>
  );
};

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
  // max-width: 464px;
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

const themesData = [
  {
    name: "Default",
  },
  {
    name: "Left Muse",
  },
  {
    name: "Jungle Right",
  },
];

const handleThemeChange = (index) => {
  setSelectedTheme(index);
  State.update({
    metadata: {
      ...state.metadata,
      theme: index,
    },
  });
};
const displayThemes = themesData.map((theme, index) => {
  const { name } = theme;
  console.log(`${index} selected? ${Number(selectedTheme) === index}`);
  return (
    <div
      key={index}
      className="themeCard"
      style={{
        backgroundColor: "#fff",
        color: "#000",
        border: `1px solid #000`,
      }}
    >
      <input
        type="radio"
        id={index}
        name="theme"
        checked={Number(selectedTheme) === index}
        onChange={() => handleThemeChange(index)}
        className="form-check-input rounded-circle"
      />
      <label htmlFor={index}>{name}</label>
    </div>
  );
});

console.log("selectedTheme: ", selectedTheme);

// select all input tags that are not checkboxes or radio buttons with css

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
    padding-bottom: 2rem;
    margin-top: 2rem;
    border-bottom: 8px solid #efefef;
  }
  .section.portfolio {
    border-bottom: none;
  }
  .tabsGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 16px;
    column-gap: 28px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
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
    :not([type="checkbox"]):not([type="radio"]) {
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
  .attach-docs {
    color: #b0b0b0;
    border: 1px solid #efefef;
    background: #f8f8f8;
    :hover {
      path {
        stroke: #000;
      }
    }
  }
  .unselected-item {
    border-radius: 32px;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    padding: 0.6rem;
    color: #c0c0c0;
    background-color: #fff;
    border: 1px solid #c0c0c0;
    path {
      fill: #c0c0c0;
    }
    :hover {
      color: #fff;
      background-color: #000;
      border: 1px solid #fff;
      path {
        fill: #fff;
      }
    }
  }
  .selected-item {
    color: #fff;
    background-color: #000;
    border: 1px solid #fff;
    path {
      fill: #fff;
    }
  }
  .is-invalid {
    border-color: #dd5353e9 !important;
    color: #dd5353e9 !important;
  }
  .right-add-btn {
    float: right;
  }
  .tooltip {
    background-color: #000;
    color: #fff;
  }
  .themesCard {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .themeCard {
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 32px;
    width: 200px;
    input {
      margin-top: unset;
      :hover {
        cursor: pointer;
      }
    }
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
  .upload-image-button,
  .mkd-butn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f3f5;
    color: #11181c;
    border-radius: 40px;
    height: 40px;
    min-width: 40px;
    font-size: 0;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &::before {
      font-size: 16px;
    }

    :hover,
    :focus {
      background: #d7dbde;
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    span {
      margin-left: 12px;
    }
  }
`;

// console.log("selectedTabNames: ", selectedTabNames);

const feedTabsObject =
  selectedTabNames && stringArrayToObject(selectedTabNames);
// console.log("tabsObject: ", feedTabsObject);
// console.log("feeedtabsobj: ", state.metadata.feedTabs);
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
    max-width: 500px;
    padding: 0 16px;
    background: #f8f8f8;
    overflow: hidden;
    color: #b0b0b0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
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

const fetchCollections = () => {
  const response = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query SearchCollections  {
        nft_contracts(order_by: {id: asc}) {
          id
        }
      }
`,
    }),
  });
  let collections = response?.body?.data?.nft_contracts;
  return collections;
};

const fetchCommunities = () => {
  const response = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyCommunities {
        mb_views_nft_tokens(
          where: {owner: {_eq: "${accountId}"}}
          distinct_on: nft_contract_id
        ) {
          id: nft_contract_id
        }
      }      
`,
    }),
  });
  let collections = response?.body?.data?.mb_views_nft_tokens;
  console.log("collections: ", collections);
  return collections;
};

if (accountId) {
  const fetchedCollections = fetchCollections();
  const fetchedCommunities = fetchCommunities();
  // Extract id values and create a new list
  const ids =
    fetchedCollections &&
    fetchedCollections?.map((collection) => collection.id);
  const communityIds =
    fetchedCommunities && fetchedCommunities?.map((community) => community.id);
  setAllCollections(ids);
  setAllCommunities(communityIds);
}

const nftDataChangeHandler = (chain, tokenId, contractId) => {
  State.update({
    nftTokenId: tokenId,
    nftContractId: contractId,
    chain: chain,
    nftsArray: [...state.nftsArray, { chain, tokenId, contractId }],
    metadata: {
      ...state.metadata,
      nfts: {
        ...state.metadata.nfts,
        type: singleOrCollectionActive,
        content: state.nftsArray,
      },
    },
  });
  console.log("NFTtokenId:", state.nftTokenId);
  console.log("NFTcontractId:", state.nftContractId);
  console.log("nftsArray:", state.nftsArray);
};

// if (!state.metadata.nfts.type || !state.initialMetadata.nfts) {
//   state.metadata.nfts = null;
// }

// console.log("nfts: ", state.initialMetadata.nfts.type);

if (!state.metadata.discussion.type) {
  state.metadata.discussion = null;
}

const onChangeAccount = (account) => {
  State.update({
    account: account[0],
  });
};

const onChangeCollection = (address) => {
  setCollectionContractId(address);
  State.update({
    metadata: {
      ...state.metadata,
      nfts: {
        ...state.metadata.nfts,
        type: singleOrCollectionActive,
        content: collectionContractId,
      },
    },
  });
  console.log("Address: ", address);
};

// console.log("tokenId and accoutId: ", state.nftTokenId);

const Card = styled.div`
  padding: 1em;
  border: 1px solid #e5e8eb;
  gap: 2em;
  margin: 10px auto;
  border-radius: 0.7em;
  width: 100%;
`;

const discussionTypeSwitchHandler = (e) => {
  e.preventDefault();
  const { value } = e.target;
  console.log(value);
  // change the value of the discussion data to null if the value is not "nftcommunity"
  setDiscussionType(value);
  console.log("discussionType: ", discussionType);
};

// const discussionNFTContractIdHandler = (e) => {
//   e.preventDefault();
//   const { value } = e.target;
//   setDiscussionNFTContractId(value);
//   console.log("discussionNFTContractId: ", value);
// };

const nftCommunityChangeHandler = (community) => {
  setDiscussionNFTContractId(community);
  State.update({
    metadata: {
      ...state.metadata,
      discussion: {
        ...state.metadata.discussion,
        type: discussionType,
        community: community,
      },
    },
  });
  console.log("discussion community : ", community);
};

/* HELPER FUNCTION */
function isNearAddress(address) {
  if (typeof address !== "string") {
    return false;
  }
  if (!address.endsWith(".near")) {
    return false;
  }
  const parts = address.split(".");
  if (parts.length !== 2) {
    return false;
  }
  if (parts[0].length < 2 || parts[0].length > 32) {
    return false;
  }
  if (!/^[a-z0-9_-]+$/i.test(parts[0])) {
    return false;
  }
  return true;
}

const nftOrCollectionSwitchHandler = (clickedButtonId) => {
  if (clickedButtonId === "single") {
    setSingleOrCollectionActive(null);
  } else if (clickedButtonId === "collection") {
    setSingleOrCollectionActive(null);
    state.nftsArray = [];
  }
  setSingleOrCollectionActive(clickedButtonId);
  setCollectionContractId(null);
  State.update({
    metadata: {
      ...state.metadata,
      nfts: {
        ...state.metadata.nfts,
        type: singleOrCollectionActive,
        content: undefined,
      },
    },
  });
};

singleOrCollectionActive && !collectionContractId;
State.update({
  metadata: {
    ...state.metadata,
    nfts: {
      ...state.metadata.nfts,
      type: singleOrCollectionActive,
      content: collectionContractId ? collectionContractId : state.nftsArray,
    },
  },
});

const onChangeDisabled = (e) => {
  // e.preventDefault();
  const { checked } = e.target;
  console.log(e);
  State.update({
    disabled: checked,
  });
};
state.disabled &&
  State.update({
    metadata: {
      ...state.metadata,
      feed: {},
    },
  });

const handleCreatePoll = () => setCreatePoll(true);

const getFirstSBTToken = () => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${context.accountId}`,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};

const hasSBTToken = getFirstSBTToken() !== undefined;

const [fileData, setFileData] = useState(null);

const portfolioDocHandler = (files) => {
  setMsg("Uploading...");

  const file = fetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: files[0],
  });

  setDoc(file.body.cid);
  console.log("doc: ", doc);
  setMsg("Attach a file");
};

const portfolioEntryTitleHandler = (e) => {
  const { value } = e.target;
  setPortfolioEntryTitle(value);
};

const addPortfolioEntryHandler = () => {
  const entryId = generateUID();
  const portfolioEntry = {
    type: "md",
    title: portfolioEntryTitle,
    image: state.portfolioImage,
    text: portfolioEntryText,
    // file: doc,
  };
  console.log("portfolioEntry: ", portfolioEntry);
  portfolioEntry.title &&
    portfolioEntry.text &&
    State.update({
      metadata: {
        ...state.metadata,
        portfolio: {
          ...state.metadata.portfolio,
          [entryId]: portfolioEntry,
        },
        // index: {
        //   portfolio: JSON.stringify({
        //     key: "portfolio",
        //     value: {
        //       type: "md",
        //     },
        //   }),
        // },
      },
    });
  // Empty the portfolio entry text
  setPortfolioEntryTitle("");
  setPortfolioEntryText(null);
  // setDoc(null);
  // setMsg("Attach a file");
  State.update({
    portfolioImage: {},
  });
};

const imagetooltip = <Tooltip id="tooltip">Upload an image</Tooltip>;
return (
  <Wrapper
    className="container"
    selectedNFTButton={singleOrCollectionActive}
    theme={selectedTheme}
  >
    <h1>Customize your Page </h1>
    <div className="themes">
      <h6>Choose a Theme</h6>
      <div className="themesCard">{displayThemes}</div>
    </div>
    <div className="section">
      <h6>Select the Tabs that you want to display</h6>
      <FeedTabs selectedTabNames={selectedTabNames} />
    </div>
    {
      // if selectedTabNames array contains "feed" then show the feed section
      selectedTabNames.includes("feed") && (
        <div className="section feed-tags">
          <div className="mb-2 feed">
            <h4>Your Feed</h4>
            <div className="form-check ds-check">
              <input
                className="form-check-input rounded-circle"
                type="checkbox"
                onChange={onChangeDisabled}
                checked={state.disabled}
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
      )
    }
    {
      // if selectedTabNames array contains "discussions" then show the discussions section
      selectedTabNames.includes("discussions") && (
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
                onChange={(e) => discussionTypeSwitchHandler(e)}
              >
                <option className="defaultDisc" selected>
                  Select Type from dropdown
                </option>
                <option value="hashtag">Based on Hashtag</option>
                <option value="nftcommunity">For NFT Community</option>
              </select>
            </div>
            <div className="discussion-main">
              {discussionType === "hashtag" && (
                <div className="mb-2">
                  <h4>Create Hashtags</h4>
                  <Widget
                    src="mob.near/widget/TagsEditor"
                    props={{
                      initialTagsObject:
                        discussionType === "hashtag" &&
                        state.metadata.discussion.data,
                      tagsPattern: "*/profile/tags/*",
                      placeholder: "Enter the hashtag",
                      setTagsObject: (discussionTags) => {
                        // state.metadata.discussion.data = discussionTags;
                        State.update({
                          metadata: {
                            ...state.metadata,
                            discussion: {
                              ...state.metadata.discussion,
                              type: discussionType,
                              data: discussionTags,
                            },
                          },
                        });
                      },
                    }}
                  />
                </div>
              )}
              {discussionType === "nftcommunity" && (
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="nftcontractaddress">
                    NFT Contract Address
                  </label>
                  {/* <input
                    type="text"
                    name="nftcontractaddress"
                    id="nftcontractaddress"
                    className="txt w-100"
                    placeholder="Enter the NFT contract address"
                    value={discussionNFTContractId}
                    onChange={(e) => discussionNFTContractIdHandler(e)}
                  />
                  <button
                    // disabled={!state.isValidCummunityContractId}
                    onClick={() => handleAddNFTCommunity()}
                  >
                    Add Community
                  </button> */}
                  <Search>
                    <Typeahead
                      id="community-address"
                      className="type-ahead w-100"
                      isLoading={isLoading}
                      labelKey="community"
                      options={allCommunities}
                      onChange={(v) => nftCommunityChangeHandler(v)}
                      placeholder={"Enter or select the NFT community address"}
                      selected={discussionNFTContractId}
                    />
                  </Search>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
    {
      // if selectedTabNames array contains "nfts" then show the nfts section
      selectedTabNames.includes("nfts") && (
        <div className="section nfts">
          <div className="mb-2 feed">
            <h4>NFTs to Display</h4>
          </div>
          <div className="nfts-tab-main">
            <div className="attach-nft-buttons d-flex align-items-center gap-2">
              <button
                className={`unselected-item ${
                  singleOrCollectionActive === "single" ? "selected-item" : ""
                }`}
                id="single"
                name="single"
                onClick={() => nftOrCollectionSwitchHandler("single")}
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
                      !singleOrCollectionActive ||
                      singleOrCollectionActive === "collection"
                        ? "#C0C0C0"
                        : "#fff"
                    }
                  />
                </svg>
                <span>Attach an NFT</span>
              </button>
              <button
                className={`unselected-item ${
                  singleOrCollectionActive === "collection"
                    ? "selected-item"
                    : ""
                }`}
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
                      !singleOrCollectionActive ||
                      singleOrCollectionActive === "single"
                        ? "#C0C0C0"
                        : "#fff"
                    }
                  />
                </svg>
                <span>Attach a collection</span>
              </button>
            </div>
            <div className="nfts-collection-select my-4">
              {singleOrCollectionActive === "single" && (
                <div className="">
                  <Card>
                    Near Wallet Address:
                    <Search>
                      <Typeahead
                        id="type"
                        className="type-ahead"
                        isLoading={isLoading}
                        labelKey="single"
                        options={allWidgets}
                        onChange={(value) => onChangeAccount(value)}
                        placeholder={accountId}
                        value={state.account}
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

                                nftDataChangeHandler(
                                  "Near",
                                  tokenId,
                                  contractId
                                );
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
              {singleOrCollectionActive === "collection" && (
                // <div className="">Select Collection</div>
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="nftcollecollectioncontractaddress">
                    NFT Contract Address
                  </label>
                  <Search>
                    <Typeahead
                      id="type"
                      className="type-ahead"
                      isLoading={isLoading}
                      labelKey="collection"
                      options={allCollections}
                      onChange={(v) => onChangeCollection(v)}
                      placeholder={"Enter or select the NFT contract address"}
                      selected={collectionContractId}
                    />
                  </Search>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
    {selectedTabNames.includes("polls") && (
      <div className="section polls">
        <div className="mb-2 feed">
          <h4>Polls to Display</h4>
          <p>
            Your personal polling station! Manage and review your own polls,
            watch them gain traction, and get insights from responses.
          </p>
        </div>
        <div className="polls-main">
          <div className="polls-tab-main">
            <div className="attach-nft-buttons d-flex align-items-center gap-2">
              <div className="p-2 ms-auto">
                <p
                  style={{
                    margin: "0",
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: hasSBTToken ? "#239F28" : "#DD5E56",
                  }}
                >
                  {!isLoggedIn
                    ? "Sign In To Use EasyPoll"
                    : hasSBTToken
                    ? "Verified Human"
                    : "Non-Verified Human"}
                </p>
              </div>
              {isLoggedIn &&
                (hasSBTToken ? (
                  !createPoll && (
                    <Widget
                      src="rubycop.near/widget/NDC.StyledComponents"
                      props={{
                        Button: {
                          text: "Create a Poll",
                          icon: <i className="bi bi-plus-lg" />,
                          onClick: () => handleCreatePoll(),
                        },
                      }}
                    />
                  )
                ) : (
                  <a
                    href="https://i-am-human.app"
                    target="_blank"
                    className="text-decoration-none"
                  >
                    <Widget
                      src="rubycop.near/widget/NDC.StyledComponents"
                      props={{
                        Button: {
                          text: "Verify as Human",
                          icon: (
                            // should be replaced with I-AM-HUMAN logo svg but I couldn't find it :(
                            <img
                              height={25}
                              width={25}
                              style={{
                                filter: "brightness(100)",
                              }}
                              src="data:image/png;base64,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"
                            />
                          ),
                          className:
                            "primary dark d-flex gap-2 align-items-center",
                          onClick: () => {},
                        },
                      }}
                    />
                  </a>
                ))}
            </div>
            {!createPoll && (
              <Widget
                src={`${widgetOwner}/widget/EasyPoll.MyPolls`}
                props={{
                  indexVersion,
                  blackList,
                  tabs,
                  whitelist,
                  widgetOwner,
                }}
              />
            )}

            {createPoll && (
              <Widget
                src={`${widgetOwner}/widget/EasyPoll.CreatePoll`}
                props={{
                  indexVersion,
                  blockHeight: props.blockHeight,
                  src: props.src,
                  whitelist,
                }}
              />
            )}
          </div>
        </div>
      </div>
    )}
    {
      // if selectedTabNames array contains "docs" then show the docs section

      selectedTabNames.includes("docs") && (
        <div className="section docs">
          <div className="mb-2 feed">
            <h4>Docs to Display</h4>
          </div>
          <div className="docs-main">
            <div className="docs-tab-main">
              <div className="attach-docs-buttons d-flex align-items-center gap-2">
                <button className="btn attach-docs" id="docs" name="docs">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1V11"
                      stroke="#C0C0C0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 6H11"
                      stroke="#C0C0C0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Attach a Doc</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    {
      // if selectedTabNames array contains "portfolio" then show the portfolio section

      selectedTabNames.includes("portfolio") && (
        <div className="section portfolio">
          <div className="mb-2 feed">
            <h4>Portfolio to Display</h4>
          </div>
          <div className="portfolio-main">
            <div className="portfolio-tab-main">
              <div className="mb-2">
                <div className="portfolio-title d-flex align-items-center gap-2 mb-3">
                  <label htmlFor="portfoliotitle">
                    Add a Title to the Portfolio
                  </label>
                  <input
                    type="text"
                    id="portfoliotitle"
                    name="portfoliotitle"
                    className="txt w-100"
                    placeholder="Enter the title of the portfolio"
                    onChange={(e) => portfolioEntryTitleHandler(e)}
                    value={portfolioEntryTitle}
                  />
                  <OverlayTrigger placement="top" overlay={imagetooltip}>
                    <Actions>
                      <IpfsImageUpload
                        image={state.portfolioImage}
                        className="upload-image-button bi bi-image"
                        title="Upload an image"
                      />
                    </Actions>
                  </OverlayTrigger>
                </div>

                <div className="portfolio-description mb-3">
                  <TextareaWrapper
                    className={"markdown-editor"}
                    data-value={portfolioEntryText || ""}
                  >
                    <Widget
                      key={`markdown-editor-true`}
                      src="mob.near/widget/MarkdownEditorIframe"
                      props={{
                        initialText: portfolioEntryText,
                        onChange: (text) => {
                          setPortfolioEntryText(text);
                          console.log("text", text);
                        },
                        embedCss,
                      }}
                      placeholder="Enter the description of the portfolio"
                    />
                  </TextareaWrapper>
                </div>
              </div>
              {/* VM has some internal errors so I disabled attach doc button */}
              {/* <div className="attach-portfolio-buttons d-flex align-items-center gap-2">
                <Files
                  multiple={false}
                  accepts={["application/pdf]}
                  clickable
                  className="btn btn-outline-primary"
                  onChange={portfolioDocHandler}
                >
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.67646 1.30089L7.78372 1.40575L1.45406 7.88029L1.3468 7.77543L1.45406 7.88029C-0.262376 9.63597 -0.292822 12.4769 1.41269 14.2367L1.30497 14.3411L1.41269 14.2367C3.12942 16.0081 5.94017 16.029 7.67856 14.2509L12.8706 8.94L12.9779 9.04486L12.8706 8.94C12.9991 8.80856 12.9967 8.59785 12.8653 8.46937L12.9701 8.36211L12.8653 8.46937L12.1749 7.79452C12.0435 7.66602 11.8328 7.66841 11.7043 7.79983L11.597 7.69498L11.7043 7.79984L6.51226 13.1107L6.405 13.0059L6.51226 13.1107C5.42513 14.2227 3.66902 14.2213 2.58393 13.1016C1.49675 11.9799 1.51591 10.1502 2.62032 9.02045L2.72758 9.12531L2.62032 9.02045L8.95001 2.54595C9.58816 1.89317 10.6134 1.89352 11.2513 2.54594L11.144 2.6508L11.2513 2.54594C11.9004 3.20993 11.9005 4.2887 11.2516 4.9524L11.2516 4.95245L5.73405 10.5907C5.54002 10.7893 5.23431 10.7853 5.04427 10.5839L5.04426 10.5838C4.84557 10.3732 4.86584 10.0285 5.06567 9.82409L5.06574 9.82402L9.40284 5.39359C9.53141 5.26225 9.52918 5.05154 9.39783 4.92295L8.70798 4.24765C8.57665 4.11909 8.36594 4.12132 8.23733 4.25267L3.89986 8.68344L7.67646 1.30089ZM7.67646 1.30089L7.78372 1.40575C9.06215 0.0980101 11.139 0.0978963 12.4176 1.40575L12.5241 1.3016L12.4176 1.40575C13.685 2.7022 13.6865 4.79481 12.4176 6.09278C12.4176 6.0928 12.4176 6.09281 12.4176 6.09283L6.90001 11.7312L6.89997 11.7312M7.67646 1.30089L6.89997 11.7312M6.89997 11.7312C6.05868 12.5917 4.68508 12.5798 3.85789 11.703M6.89997 11.7312L3.85789 11.703M3.85789 11.703C3.06114 10.8585 3.08522 9.51682 3.89979 8.68352L3.85789 11.703Z"
                      fill="#B0B0B0"
                      stroke="#F8F8F8"
                      stroke-width="0.3"
                    />
                  </svg>
                  {msg}
                </Files>
              </div> */}
              <button
                className={`btn ${"right-add-btn"}`}
                onClick={addPortfolioEntryHandler}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )
    }
    <div className="mb-2">
      <CommitButton
        className="btn"
        data={{ profile: state.profile }}
        onClick={submitHandler}
      >
        Save Page
      </CommitButton>
      <Link
        className="btn btn-outline-primary ms-2"
        href={`/bos.genadrop.near/widget/DropFlow.ArtistPage.Index?accountId=${accountId}`}
      >
        View Page
      </Link>
    </div>
  </Wrapper>
);
