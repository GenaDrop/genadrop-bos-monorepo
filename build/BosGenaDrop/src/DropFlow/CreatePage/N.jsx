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
    obj[stringValue] = "";
    return obj;
  }, {});
}

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
  };

  return (
    <div className="tabsGrid">
      {tabsData.map((tab) => (
        <div
          key={tab.name}
          className={`tab-item ${
            selectedTabs.includes(tab.name) ? "selected" : ""
          }`}
        >
          <div className="cardTop">
            <input
              type="checkbox"
              id={tab.name}
              name={tab.name}
              checked={selectedTabs.includes(tab.name)}
              onChange={() => handleTabChange(tab.name)}
              className="form-check-input rounded-circle"
            />
            <label htmlFor={tab.name}>{tab.name}</label>
          </div>
          <div className="cardBottom">
            <p>{tab.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

console.log(selectedTabNames);

const handleSubmit = () => {
  const tabsObject = stringArrayToObject(selectedTabNames);
  console.log(tabsObject);
};

return (
  <div>
    <FeedTabs
      selectedTabs={selectedTabNames}
      onTabChange={handleTabSelection}
    />
    <button onClick={handleSubmit}>submit</button>
  </div>
);
