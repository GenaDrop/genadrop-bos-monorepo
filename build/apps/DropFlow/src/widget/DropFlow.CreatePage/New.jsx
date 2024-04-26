const accountId = props.accountId;
const widgetOwner = "jgodwill.near";
const isLoggedIn = props.isLoggedIn ?? context.accountId ? true : false;
let profile = props.profile ?? Social.getr(`${accountId}/profile`);
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
    initialMetadata.nfts.type === "single"
      ? JSON.parse(initialMetadata.nfts.content)
      : [],
  nfts: initialMetadata.nfts ?? {},
  feedTabs: initialMetadata.feedTabs ?? {},
  discussion: initialMetadata.discussion ?? {},
  createPoll: false,
  feed: initialMetadata.feed ?? {},
  folio: initialMetadata.folio ?? {},
  theme: initialMetadata.theme ?? 0,
  nftChainState: "Near",
});
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
/* Feed Tabs start */
const [selectedTheme, setSelectedTheme] = useState(
  state.initialMetadata.theme ?? 0
);
const [selectedTabNames, setSelectedTabNames] = useState(
  Object.keys(initialMetadata.feedTabs || {})
);
const [selectedTabs, setSelectedTabs] = useState(
  selectedTabNames.reduce((obj, tab) => {
    obj[tab.toLowerCase()] = "";
    return obj;
  }, {})
);
const [singleOrCollectionActive, setSingleOrCollectionActive] = useState(
  state.initialMetadata.nfts.type
);
const [discussionNFTContractId, setDiscussionNFTContractId] = useState(
  JSON.parse(initialMetadata.discussion.community) ?? null
);
const [discussionType, setDiscussionType] = useState(
  state.initialMetadata.discussion.type ?? null
);
const [allCommunities, setAllCommunities] = useState(null);
const [collectionContractId, setCollectionContractId] = useState(
  initialMetadata.nfts.type === "collection" &&
    (JSON.parse(initialMetadata.nfts.content) ?? [])
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
const [modalIsOpen, setModalIsOpen] = useState(false);
const [sec, setSec] = useState(0);
const [isNewEntry, setIsNewEntry] = useState(false);
function generateUID() {
  const maxHex = 0xffffffff;
  const randomNumber = Math.floor(Math.random() * maxHex);
  return randomNumber.toString(16).padStart(8, "0");
}
// console.log("single or collection active: ", singleOrCollectionActive);
const tabsData = [
  {
    name: "Feed",
    desc: `Custom Web3 social feed that allows you to showcase your post,
    different hashtags, and fellow artists/projects you may be affiliated
    with.`,
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
const chains = [
  {
    id: "137",
    name: "Polygon",
    url: "https://ipfs.near.social/ipfs/bafkreie5h5oq6suoingcwuzj32m3apv56rl56wpwpaxmevlk5vndlypxze",
  },
  {
    id: "1313161554",
    name: "Aurora",
    url: "https://ipfs.near.social/ipfs/bafkreiajqik4gjbmkh7z2gylpjzrsuht7simjecpxuoqn6icqfbioswzuy",
  },
  {
    id: "42220",
    name: "Celo",
    url: "https://ipfs.near.social/ipfs/bafkreifu6ufsdf2ivrs5febt7l25wdys6odzfelgjauzod7owrfug56cxe",
  },
  {
    id: "42161",
    name: "Arbitrum",
    url: "https://ipfs.near.social/ipfs/bafkreiffax4lnya337rz5ph75faondeqmpy6xj37yprwvxbru4qc5emsiq",
  },
  {
    id: "0",
    name: "Near",
    url: "https://ipfs.near.social/ipfs/bafkreigv55ubnx3tfhbf56toihekuxvgzfqn5c3ndbfjcg3e4uvaeuy5cm",
  },
];
const iAmHumanIcon =
  "data:image/png;base64,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";
const handleTabChange = (tabName) => {
  const isAlreadySelected = selectedTabNames.includes(tabName);
  // Update selected tab names
  const updatedSelectedTabNames = isAlreadySelected
    ? selectedTabNames.filter((tab) => tab !== tabName)
    : [...selectedTabNames, tabName];
  setSelectedTabNames(updatedSelectedTabNames);
  const updatedSelectedTabs = { ...selectedTabs };
  Object.keys(updatedSelectedTabs).forEach((tabName) => {
    const isSelected = updatedSelectedTabNames.includes(tabName);
    updatedSelectedTabs[tabName] = isSelected ? "" : null;
  });
  // Special handling for newly selected tab
  if (!isAlreadySelected) {
    updatedSelectedTabs[tabName] = ""; // Ensure newly selected tab has empty string
  }
  setSelectedTabs(updatedSelectedTabs);
  console.log("tab", tabName);
  console.log("selectedTabs: ", selectedTabs);
};
const FeedTabs = () => {
  return (
    <div key={selectedTabNames.join("-")} className="tabsGrid">
      {tabsData.map((tab) => {
        const { name, desc } = tab;
        const lowerCaseName = name.toLowerCase();
        const isDisabled = lowerCaseName === "docs";
        return !isDisabled ? (
          <TabCard
            key={lowerCaseName}
            active={selectedTabNames.includes(lowerCaseName)}
            disabled={lowerCaseName === "docs"}
            onClick={() => handleTabChange(lowerCaseName)}
          >
            <div className="cardTop">
              <input
                type="checkbox"
                id={lowerCaseName}
                name={lowerCaseName}
                checked={selectedTabNames.includes(lowerCaseName)}
                // onChange={() => handleTabChange(lowerCaseName)}
                className="form-check-input rounded-circle"
                disabled={lowerCaseName === "docs"}
              />
              <label htmlFor={lowerCaseName}>{name}</label>
            </div>
            <div className="cardBottom">
              <p>{desc}</p>
            </div>
          </TabCard>
        ) : (
          <OverlayTrigger placement="top" overlay={tabTooltip}>
            <TabCard
              key={lowerCaseName}
              active={selectedTabNames.includes(lowerCaseName)}
              disabled={lowerCaseName === "docs"}
              onClick={() => {
                console.log("disabled tab clicked");
              }}
            >
              <div className="cardTop">
                <input
                  type="checkbox"
                  id={lowerCaseName}
                  name={lowerCaseName}
                  checked={selectedTabNames.includes(lowerCaseName)}
                  // onChange={() => handleTabChange(lowerCaseName)}
                  className="form-check-input rounded-circle"
                  disabled={lowerCaseName === "docs"}
                />
                <label htmlFor={lowerCaseName}>{name}</label>
              </div>
              <div className="cardBottom">
                <p>{desc}</p>
              </div>
            </TabCard>
          </OverlayTrigger>
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
  user-select: none;
  gap: 8px;
  border-radius: 32px;
  border: 1px solid #fff;
  background: ${({ active, disabled }) =>
    disabled ? "#F8F8F8" : active ? "#000" : "#fff"};
  color: ${({ active, disabled }) =>
    disabled ? "#B0B0B0" : active ? "#fff" : "#000"};
  border: 1px solid ${({ disabled }) => (disabled ? "#b0b0b0" : "#000")};
  // max-width: 464px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
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
const ThemeCard = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  border-radius: 32px;
  user-select: none;
  background: ${({ activeTheme }) => (activeTheme ? "#000" : "#fff")};
  color: ${({ activeTheme }) => (activeTheme ? "#fff" : "#000")};
  border: 1px solid #000;
  width: 200px;
  input {
    margin-top: unset;
    :hover {
      cursor: pointer;
    }
  }
`;
const displayThemes = themesData.map((theme, index) => {
  const { name } = theme;
  const nowActive = Number(selectedTheme);
  // console.log(`${index} selected? ${nowActive === index}`);
  return (
    <ThemeCard
      key={index}
      activeTheme={nowActive === index}
      onClick={() => handleThemeChange(index)}
    >
      <input
        type="radio"
        id={index}
        name="theme"
        checked={nowActive === index}
        // onChange={() => handleThemeChange(index)}
        className="form-check-input rounded-circle"
      />
      <label htmlFor={index}>{name}</label>
    </ThemeCard>
  );
});
// console.log("selectedTheme: ", selectedTheme);
// select all input tags that are not checkboxes or radio buttons with css
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 3rem;
  column-gap: 1rem;
  .initArea {
    display: flex;
    // align-items: center;
    flex-direction: column;
    justify-content: space-between;
    gap: 3rem;
  }
  .nav-pills {
    // background: #fbfbfb;
    font-weight: 400;
    --bs-nav-pills-border-radius: 0;
    --bs-nav-link-color: #b0b0b0;
    --bs-nav-pills-link-active-color: #000;
    --bs-nav-pills-link-active-bg: #fbfbfb;
    --bs-nav-link-padding-y: 0.75rem;
    padding-top: 3px;
    user-select: none;
  }
  .nav-link {
    display: flex;
    align-items: center;
    flex-flow: column wrap;
    gap: 2px;
    color: #b0b0b0;
    // disable selection
    user-select: none;
    .num {
      padding: 1rem;
      font-size: 1.5rem;
      font-weight: 400;
      width: 30px;
      height: 30px;
      border: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .nav-link.active {
    color: #000;
    background: transparent;
    .num {
      color: #fff;
      background-color: #000;
    }
  }
  .title {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #000;
  }
  .inner {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    // align-items: center;
    & > button {
      align-self: flex-end;
    }
  }
  .btn-remove {
    border-radius: 32px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    background-color: #ffe3e3;
    border-color: #ffe3e3;
    color: #ff0202;
    :hover {
      background-color: #ff0202;
      border-color: #ff0202;
      color: #fff;
    }
  }
  .portfolio-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    marging-bottom: 2rem;
    .portfolio-tab-main {
      width: 100%;
    }
  }
  .btn-outline-secondary,
  .attach-portfolio-image {
    background: #f8f8f8;
    color: #b0b0b0;
    border-radius: 32px;
    font-size: 16px;
    font-weight: normal;
    border-color: #b0b0b0;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;
    :hover,
    :focus {
      background: #fff;
      color: #000;
      border-color: #000;
      outline: none;
    }
  }
  .entry {
    // border: 1px solid #e5e8eb;
    border-radius: 10px;
    padding: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .md_txt {
    & > div {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      // cloudy bottom for hidden text
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        #ffffff 100%
      );
    }
  }
`;
selectedTabNames.length > 0 &&
  State.update({
    metadata: {
      ...state.metadata,
      feedTabs: selectedTabs,
    },
  });
const submitHandler = () => {
  console.log("initialMetadata", initialMetadata);
  console.log("state profile", state.profile);
  console.log("nft Content: ", state.metadata.nfts.content);
  if (JSON.stringify(state.initialMetadata) === JSON.stringify(state.profile)) {
    console.log("no changes");
  } else {
    console.log("changes");
  }
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
const Input = styled.input`
  display: block;
  padding: 0.5em;
  width: 100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus {
    border: 1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;
const SelectCard = styled.div`
  display: flex;
  padding: 1em;
  gap: 2em;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 100%;
  border-radius: 0.7em;
  height: 100%;
  @media screen and (max-width: 540px) {
    flex-wrap: wrap;
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.92);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 8000;
  ${({ isOpen }) =>
    isOpen &&
    `
    display: flex;
    opacity: 1;
    pointer-events: auto;
  `}
`;
const ModalTop = styled.div`
  background-color: #f5f5f5;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ModalHeader = styled.h4`
  margin: 0;
`;
const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 40px;
  &:hover {
    color: #333;
    background: none;
  }
`;
const ModalContent = styled.div`
  background-color: #fff;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding-bottom: 20px;
  minheight: 300px;
  @media screen and (max-width: 540px) {
    width: 80%;
  }
`;
const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;
const embedCss = `
.rc-md-editor {
  border-radius: 10px;
  overflow: hidden;
}
.rc-md-editor .editor-container>.section {
  border: 0;
}
.rc-md-editor .editor-container .sec-md .input {
  overflow-y: auto;
  padding: 8px !important;
  line-height: normal;
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
  // console.log("collections: ", collections);
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
const updateChain = (chain) => {
  State.update({ nftChainState: chain, nftTokenId: "", nftContractId: "" });
};
const nftDataChangeHandler = (chain, tokenId, contractId) => {
  chain &&
    tokenId &&
    contractId &&
    State.update({
      nftTokenId: tokenId,
      nftContractId: contractId,
      nftChainState: chain,
      nftsArray: [...state.nftsArray, { chain, tokenId, contractId }],
      metadata: {
        ...state.metadata,
        nfts: {
          ...state.metadata.nfts,
          type: singleOrCollectionActive,
          content: JSON.stringify(state.nftsArray),
        },
      },
    });
  console.log("NFTtokenId:", state.nftTokenId);
  console.log("NFTcontractId:", state.nftContractId);
  console.log("nftsArray:", state.nftsArray);
};
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
        content: JSON.stringify(collectionContractId),
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
const nftOrCollectionSwitchHandler = (clickedButtonId) => {
  if (clickedButtonId === "single") {
    setSingleOrCollectionActive(null);
  } else if (clickedButtonId === "collection") {
    setSingleOrCollectionActive(null);
    state.nftsArray = [];
  }
  singleOrCollectionActive;
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
debounce(
  State.update({
    metadata: {
      ...state.metadata,
      nfts: {
        ...state.metadata.nfts,
        type: singleOrCollectionActive,
        content:
          collectionContractId.length > 0
            ? JSON.stringify(collectionContractId)
            : JSON.stringify(state.nftsArray),
      },
    },
  })
);
const onChangeDisabled = (e) => {
  // e.preventDefault();
  const { checked } = e.target;
  console.log(e);
  State.update({
    disabled: checked,
  });
};
state.disabled &&
  state.feedTabs.feed &&
  State.update({
    metadata: {
      ...state.metadata,
      feed: {},
    },
  });
useEffect(() => {
  State.update({
    metadata: {
      ...state.metadata,
      theme: selectedTheme,
    },
  });
}, []);
const handleCreatePoll = () => setCreatePoll(true);
const getFirstSBTToken = () => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${context.accountId}`,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};
const hasSBTToken = getFirstSBTToken() !== undefined;
// const [fileData, setFileData] = useState(null);
// const portfolioDocHandler = (files) => {
//   setMsg("Uploading...");
//   const file = fetch("https://ipfs.near.social/add", {
//     method: "POST",
//     headers: { Accept: "application/json" },
//     body: files[0],
//   });
//   setDoc(file.body.cid);
//   console.log("doc: ", doc);
//   setMsg("Attach a file");
// };
const portfolioEntryTitleHandler = debounce((e) => {
  const { value } = e.target;
  setPortfolioEntryTitle(value);
}, 1);
const addPortfolioEntryHandler = () => {
  const entryId = generateUID();
  const newDateTimeStamp = new Date().toISOString();
  const portfolioEntry = {
    type: "md",
    title: portfolioEntryTitle,
    image: state.portfolioImage,
    text: portfolioEntryText,
    date_created: newDateTimeStamp,
    // file: doc,
  };
  console.log("portfolioEntry: ", portfolioEntry);
  if (portfolioEntry.title && portfolioEntry.text) {
    State.update({
      metadata: {
        ...state.metadata,
        folio: {
          ...state.metadata.folio,
          [entryId]: JSON.stringify(portfolioEntry),
        },
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
    setIsNewEntry((prev) => !prev);
  }
};
const newEntryToggleHandler = () => {
  setIsNewEntry((prev) => !prev);
};
const removePortfolioEntryHandler = (entryId) => {
  State.update({
    metadata: {
      ...state.metadata,
      folio: {
        ...state.metadata.folio,
        [entryId]: null,
      },
    },
  });
  console.log("updatedPortfolio: ", state.metadata.folio);
};
const currentPortfolio = state.metadata.folio;
const tabTooltip = (
  <Tooltip id="tooltip" className="tooltipred">
    Comming Soon
  </Tooltip>
);
const editProfileTooltip = (
  <Tooltip id="tooltip" className="tooltipred">
    Update your name, email, biography, and more.
  </Tooltip>
);
const toggleModal = () => {
  setModalIsOpen((prev) => !prev);
  console.log("modalIsOpen: ", modalIsOpen);
};
const modalContent = (
  <div>
    <p className="mb-4">
      Congratulations, You've finished creating your CPlanet Page! Choose your
      next step:
    </p>
    <div className="d-flex justify-content-center gap-2 align-items-center mx-auto">
      <OverlayTrigger placement="top" overlay={editProfileTooltip}>
        <button className="btn btn-primary" onClick={props.nextTabHandler}>
          Edit Personal Info <i class="bi bi-pencil-square ml-2"></i>
        </button>
      </OverlayTrigger>
      <Link
        className="btn btn-outline-primary"
        href={`/bos.genadrop.near/widget/DropFlow.ArtistPage.Index?accountId=${accountId}`}
      >
        View Page <i className="bi bi-eye ml-2"></i>
      </Link>
    </div>
  </div>
);
const titleMap = {
  feed: "Feed",
  nfts: "NFTs",
  discussions: "Discussions",
  polls: "Polls",
  docs: "Docs",
  portfolio: "Portfolio",
};
const navItems = [];
// Extract keys and values from feedTabs
const tabKeys = selectedTabNames.sort();
// const tabValues = Object.values(state.profile.feedTabs);
const tabValues = tabKeys.map(() => "");
console.log("Keys:", tabKeys);
console.log("Values:", tabValues);
// Use filtered keys to create navItems
tabKeys.forEach((key, index) => {
  navItems.push({
    id: key,
    title:
      titleMap[key] ||
      tabValues[index] ||
      key.charAt(0).toUpperCase() + key.slice(1),
  });
});
console.log("selectedTabNames: ", selectedTabNames);
const switchSecHandler = () => {
  setSec((prev) => (prev + 1) % 3);
};
const [currentTab, setCurrentTab] = useState(0); // Track active tab index
return (
  <Wrapper className="container" selectedNFTButton={singleOrCollectionActive}>
    {sec === 0 && (
      <div className="initArea">
        <div>
          <button
            onClick={switchSecHandler}
            style={{ float: "right" }}
            className="btn btn-outline-primary"
          >
            Next
          </button>
          <div className="themes">
            <h6>Choose a Theme</h6>
            <div className="themesCard">{displayThemes}</div>
          </div>
        </div>
        <Widget
          src="bos.genadrop.near/widget/DropFlow.ArtistPage.Preview.Index"
          props={{
            accountId,
            theme: selectedTheme,
            // nextTabHandler: () => setActiveTab((activeTab) => activeTab + 1),
            feedTabsArr: selectedTabNames,
          }}
        />
      </div>
    )}
    <div className="lhs">
      {sec === 2 && (
        <>
          <div className="inner">
            <button
              onClick={() => setSec(1)}
              style={{ float: "right" }}
              className="btn btn-outline-primary"
            >
              <i class="bi bi-arrow-left-short mx-2"></i>Previous{" "}
            </button>
            <ul
              className="nav nav-pills nav-fill mt-4 justify-content-between align-items-center"
              role="tablist"
              id="pills-tab"
            >
              {navItems.map(({ id, title }, i) => (
                <>
                  <li className="nav-item" role="presentation" key={i}>
                    <div
                      className={`nav-link ${currentTab === i ? "active" : ""}`}
                      id={`pills-${id}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#pills-${id}`}
                      type="button"
                      role="tab"
                      aria-controls={`pills-${id}`}
                      aria-selected={currentTab === i}
                      onClick={() => {
                        setCurrentTab(i); // Update currentTab on click
                        const key = `load${id}`;
                        !state[key] && State.update({ [key]: true });
                      }}
                    >
                      <span className={`num rounded-circle text-center m-2`}>
                        {i + 1}
                      </span>
                      <p className="text-center">{title}</p>
                    </div>
                  </li>
                  {i !== navItems.length - 1 && (
                    <li className="nav-item border-right mx-2 mb-4">
                      <hr />
                    </li>
                  )}
                </>
              ))}
            </ul>
          </div>
          <div className="tab-content" id="pills-tabContent">
            {navItems.map(({ id, title }, i) => (
              <div
                key={id}
                id={`pills-${id}`}
                className={`tab-pane fade ${
                  currentTab === i ? "show active" : ""
                }`}
              >
                {id === "feed" && (
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
                )}
                {id === "discussions" && (
                  <div className="section discussions">
                    <div className="mb-2 feed">
                      <h4>Your Discussions</h4>
                    </div>
                    <div className="discussions-main">
                      <div className="discussion-type-select mb-4 d-flex align-items-center gap-2">
                        <span className="select-label">
                          Choose Discussion Type
                        </span>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          // value={discussionType}
                          defaultValue={discussionType}
                          onChange={(e) => discussionTypeSwitchHandler(e)}
                        >
                          <option className="defaultDisc" selected>
                            Select Type from dropdown
                          </option>
                          <option value="hashtag">Based on Hashtag</option>
                          <option value="nftcommunity">
                            For NFT Community
                          </option>
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
                            <Search>
                              <Typeahead
                                id="community-address"
                                className="type-ahead w-100"
                                isLoading={isLoading}
                                labelKey="community"
                                options={allCommunities}
                                onChange={(v) => nftCommunityChangeHandler(v)}
                                placeholder={
                                  "Enter or select the NFT community address"
                                }
                                selected={discussionNFTContractId}
                              />
                            </Search>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {id === "nfts" && (
                  <div className="section nfts">
                    <div className="mb-2 feed">
                      <h4>NFTs to Display</h4>
                    </div>
                    <div className="nfts-tab-main">
                      <div className="attach-nft-buttons d-flex align-items-center flex-wrap gap-2">
                        <button
                          className={`unselected-item ${
                            singleOrCollectionActive === "single"
                              ? "selected-item"
                              : ""
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
                          onClick={() =>
                            nftOrCollectionSwitchHandler("collection")
                          }
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
                            <SelectCard>
                              <Card>
                                <div>Select a Chain</div>
                                <Widget
                                  src="bos.genadrop.near/widget/CPlanet.ChainsDropdown"
                                  props={{ chains, updateChain }}
                                />
                              </Card>
                              {state.nftChainState === "Near" && (
                                <Card>
                                  Near Wallet Address:
                                  <Search>
                                    <Typeahead
                                      id="type"
                                      className="type-ahead"
                                      isLoading={isLoading}
                                      labelKey="single"
                                      options={allWidgets}
                                      onChange={(value) =>
                                        onChangeAccount(value)
                                      }
                                      placeholder={accountId}
                                      // value={state.account}+
                                      defaultValue={state.account}
                                    />
                                  </Search>
                                </Card>
                              )}
                            </SelectCard>
                            {state.nftChainState === "Near" ? (
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
                                        src={`bos.genadrop.near/widget/GenaDrop.NFT.Selector`}
                                        props={{
                                          onChange: ({
                                            contractId,
                                            tokenId,
                                          }) => {
                                            State.update({
                                              contractId: contractId,
                                              tokenId: tokenId,
                                            });
                                            nftDataChangeHandler(
                                              state.nftChainState,
                                              tokenId,
                                              contractId
                                            );
                                          },
                                          accountId: state.account,
                                          headingText: "Select an NFT to Add",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Card>
                                <h4>Enter the NFT details</h4>
                                <Card>
                                  NFT Contract ID:
                                  <Input
                                    type="text"
                                    onChange={({ target }) =>
                                      State.update({
                                        nftContractId: target.value,
                                      })
                                    }
                                    // value={state.nftContractId}
                                  />
                                </Card>
                                <Card>
                                  NFT Token Id:
                                  <Input
                                    type="text"
                                    onChange={({ target }) =>
                                      State.update({
                                        nftTokenId: target.value,
                                      })
                                    }
                                    // value={state.nftTokenId}
                                  />
                                </Card>
                                <button
                                  onClick={() =>
                                    nftDataChangeHandler(
                                      state.nftChainState,
                                      state.nftTokenId,
                                      state.nftContractId
                                    )
                                  }
                                >
                                  Add NFT
                                </button>
                              </Card>
                            )}
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
                                placeholder={
                                  "Enter or select the NFT contract address"
                                }
                                selected={collectionContractId}
                              />
                            </Search>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {id === "polls" && (
                  <div className="section polls">
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
                                          src={iAmHumanIcon}
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
                        <div className="mb-2 feed">
                          <h4>Polls to Display</h4>
                          <p>
                            Your personal polling station! Manage and review
                            your own polls, watch them gain traction, and get
                            insights from responses.
                          </p>
                        </div>
                        {!createPoll && hasSBTToken && (
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
                {id === "docs" && (
                  <div className="section docs">
                    <div className="mb-2 feed">
                      <h4>Docs to Display</h4>
                    </div>
                    <div className="docs-main">
                      <div className="docs-tab-main">
                        <div className="attach-docs-buttons d-flex align-items-center gap-2">
                          <button
                            className="btn attach-docs"
                            id="docs"
                            name="docs"
                          >
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
                )}
                {id === "portfolio" && (
                  <div className="section portfolio">
                    <div className="mb-2 feed">
                      <h4>Portfolio to Display</h4>
                    </div>
                    {isNewEntry ? (
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
                                onChange={portfolioEntryTitleHandler}
                                // value={portfolioEntryTitle}
                              />
                            </div>
                            <div className="portfolio-description mb-3">
                              <TextareaWrapper
                                className={"markdown-editor"}
                                data-value={portfolioEntryText || ""}
                              >
                                <Widget
                                  className="rounded"
                                  key={`markdown-editor-true`}
                                  src="mob.near/widget/MarkdownEditorIframe"
                                  props={{
                                    initialText: portfolioEntryText,
                                    onChange: (text) => {
                                      setPortfolioEntryText(text);
                                      // console.log("text", text);
                                    },
                                    embedCss,
                                  }}
                                  placeholder="Enter the description of the portfolio"
                                />
                              </TextareaWrapper>
                            </div>
                          </div>
                          <IpfsImageUpload
                            image={state.portfolioImage}
                            className="btn attach-portfolio-image bi bi-paperclip"
                            title="Upload an image"
                          />
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
                    ) : (
                      <>
                        {currentPortfolio && (
                          <div className="d-flex flex-column gap-2 mt-4">
                            {Object.keys(currentPortfolio).map((item) => {
                              const portfolioEntry = JSON.parse(
                                currentPortfolio[item]
                              );
                              const imagUrl = portfolioEntry.image.cid
                                ? `https://ipfs.near.social/ipfs/${portfolioEntry.image.cid}`
                                : `https://wallpapercave.com/wp/wp3589909.jpg`;
                              const itemText = portfolioEntry.text;
                              return (
                                currentPortfolio[item] && (
                                  <div
                                    className="d-flex align-items-center gap-3 mb-3 entry"
                                    key={item}
                                  >
                                    <div
                                      className="folioImage rounded h-100"
                                      style={{ overflow: "hidden" }}
                                    >
                                      <img
                                        src={imagUrl}
                                        // className="col-sm"
                                        width="64px"
                                        height="64px"
                                        style={{ objectFit: "cover" }}
                                        alt={portfolioEntry.title}
                                      />
                                    </div>
                                    <div
                                      className="col-sm"
                                      style={{ flex: "1" }}
                                    >
                                      <h5 className="card-title">
                                        {portfolioEntry.title}
                                      </h5>
                                      <div
                                        className="md_txt"
                                        style={{
                                          maxHeight: `${2 * 1.2}em`,
                                          overflow: "hidden",
                                        }}
                                      >
                                        <Markdown text={portfolioEntry.text} />
                                      </div>
                                    </div>
                                    <div className="date_created">
                                      <small>
                                        {new Date(
                                          portfolioEntry.date_created
                                        ).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </small>
                                    </div>
                                    <div
                                      className="d-flex justify-content-end align-items-center"
                                      style={{ flex: "0.33" }}
                                    >
                                      <button
                                        className="btn btn-remove"
                                        onClick={() =>
                                          removePortfolioEntryHandler(item)
                                        }
                                      >
                                        <i class="bi bi-x-lg"></i>
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                )
                              );
                            })}
                          </div>
                        )}
                        <button
                          className="btn btn-outline-secondary"
                          onClick={newEntryToggleHandler}
                        >
                          <i className="bi bi-plus"></i> Add Entry
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mb-2">
            {(JSON.stringify(state.initialMetadata) !==
              JSON.stringify(state.profile) ||
              sec ||
              JSON.stringify(selectedTabNames) !==
                JSON.stringify(Object.keys(initialMetadata.feedTabs))) && (
              <CommitButton
                className="btn"
                data={{ profile: state.profile }}
                onClick={submitHandler}
                onCommit={toggleModal}
                onCancel={() => {
                  console.log("cancelled");
                }}
              >
                Save Page
              </CommitButton>
            )}
            <Link
              className="btn btn-outline-primary ms-2"
              href={`/bos.genadrop.near/widget/DropFlow.ArtistPage.Index?accountId=${accountId}`}
            >
              View Page
            </Link>
          </div>
        </>
      )}
      {sec === 1 && (
        <>
          {selectedTabNames.length > 0 && (
            <div className="mb-2">
              <button onClick={switchSecHandler} style={{ float: "right" }}>
                Next
              </button>
              <button
                onClick={() => setSec(0)}
                style={{ float: "right", marginRight: "5px" }}
              >
                <i class="bi bi-arrow-left-short mx-2"></i>Previous{" "}
              </button>
            </div>
          )}
          <h1>Customize your Page </h1>
          <div className="section">
            <h6>Select the Tabs that you want to display</h6>
            <FeedTabs selectedTabNames={selectedTabNames} />
          </div>
          <div className="mb-2">
            {(JSON.stringify(state.initialMetadata) !==
              JSON.stringify(state.profile) ||
              sec ||
              JSON.stringify(selectedTabNames) !==
                JSON.stringify(Object.keys(initialMetadata.feedTabs))) && (
              <CommitButton
                className="btn"
                data={{ profile: state.profile }}
                onClick={submitHandler}
                onCommit={toggleModal}
                onCancel={() => {
                  console.log("cancelled");
                }}
              >
                Save Page
              </CommitButton>
            )}
            <Link
              className="btn btn-outline-primary ms-2"
              href={`/bos.genadrop.near/widget/DropFlow.ArtistPage.Index?accountId=${accountId}`}
            >
              View Page
            </Link>
          </div>
        </>
      )}
      <Modal isOpen={modalIsOpen}>
        <ModalContent>
          <ModalTop>
            <ModalHeader>What Next?</ModalHeader>
            <ModalCloseButton onClick={toggleModal}>
              <span aria-hidden="true">&times;</span>
            </ModalCloseButton>
          </ModalTop>
          {modalIsOpen ? modalContent : null}
          {/* <ModalButton onClick={toggleModal}>Go Back</ModalButton> */}
        </ModalContent>
      </Modal>
    </div>
  </Wrapper>
);
