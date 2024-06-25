const data = fetch(`https://httpbin.org/headers`);
const gatewayURL = data?.body?.headers?.Origin ?? "";
const currentMode = Storage.get("mode");

const [mode, setMode] = useState(currentMode || "light");
const [showOwnedFilters, setShowOwnedFilters] = useState(true);
const [storeAddress, setStoreAddress] = useState("nft.genadrop.near");
const isDarkModeOn = mode === "dark";

const Root =
  gatewayURL.includes("near.org") || gatewayURL.includes("everything.dev")
    ? styled.div`
        width: 100%;
      `
    : styled.div`
        position: fixed;
        inset: 73px 0px 0px;
        width: 100%;
        overflow-y: scroll;
      `;

const accountId = context.accountId;
const { getInputLabelFontType } = VM.require(
  "${config_account}/widget/Mintbase.components"
);

const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const tabProps = {
  tabLabels: [
    "My Owned NFTs",
    "My Minted NFTs",
    "My Stores",
    "Mint NFT",
    "Store NFTs",
    "Deploy Store",
    "My Activity",
  ],
};

const [selectedTab, setSelectedTab] = useState(props.tab ?? "my-owned-nfts");

const switchChangeHandler = () => {
  if (!isDarkModeOn) {
    setMode("dark");
    Storage.set("mode", "dark");
  } else {
    setMode("light");
    Storage.set("mode", "light");
  }
};

const Toggle = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem;
  background-color: ${!isDarkModeOn ? "#1f2937" : "#D2D4DA"};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100000;
  width: 2rem;
  height: 2rem;
`;

const AppContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  .head {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 48px;
    justify-content: center;
    ${getInputLabelFontType("big")}
    h2 {
      color: #8c4fe5;
      font-size: 16px;
      font-weight: bold;
    }
    h1 {
      font-weight: bold;
      font-size: 29px;
      color: ${isDarkModeOn ? "#fff" : "#000"};
    }
    p {
      font-size: 18px;
      color: ${isDarkModeOn ? "#8a8c96" : "#000"};
      font-weight: 600;
    }
  }
  .audit {
    p {
      color: ${isDarkModeOn ? "#fff" : "#000"};
    }
  }
  .templateButton {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      border-radius: 0;
      padding: 6px 40px;
      border-color: ${isDarkModeOn ? "#fff" : "#000"};
      background: transparent;
      color: ${isDarkModeOn ? "#8a8c96" : "#000"};
      transition: 0.5s ease-in-out;
      &:hover {
        opacity: 0.5;
      }
    }
  }
  @media (max-width: 500px) {
    margin: 0 10px;
    .head {
      h2 {
        font-size: 14px;
      }
      h1 {
        font-size: 24px;
        text-align: center;
      }
      p {
        font-size: 16px;
      }
    }
  }
`;

const ContractSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  justify-content: space-evenly;
  ${getInputLabelFontType("big")}
  a {
    color: #4f5fa3;
    text-decoration: none;
    svg {
      color: #4f5fa3;
    }
  }
  svg {
    color: #8c4fe5;
  }
  .leftText {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 50%;
    .sec {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;
      p {
        font-size: 16px;
        margin-top: 15px;
        color: ${isDarkModeOn ? "#8a8c96" : "#000"};
      }
      div {
        ${getInputLabelFontType("big")}

        display: flex;
        align-items: center;
        h1 {
          font-size: 20px;
          font-weight: bold;
          color: ${isDarkModeOn ? "#fff" : "#000"};
          margin-left: 12px;
          margin-bottom: 0;
        }
      }
    }
  }
  button {
    background: black;
    color: ${isDarkModeOn ? "#fff" : "#000"};
    align-self: center;
    border: 1px solid #000;
    transition: 0.5s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
    &:disabled {
      background: ${isDarkModeOn ? "#3e4253" : "#d1d4d9"};
      cursor: not-allowed;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      font-weight: 600;
      border: none;
    }
  }
  @media (max-width: 600px) {
    .leftText {
      max-width: 100%;
      .sec {
        p {
          font-size: 14px;
        }
        div {
          h1 {
            font-size: 17px;
          }
        }
      }
    }
  }
`;

const FormSection = styled.div`
  width: 50%;
  display: flex;
  position: relative;
  flex-direction: column;
  height: fit-content;
  & > p > .down-arr {
    padding: 0;
    margin: 0;
    transform: rotateY(180deg);
  }
  & > p {
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${isDarkModeOn
      ? "var(--gray-300, #B3B5BD)"
      : "var(--gray-700, #404252)"};
  }

  .form-main {
    background-color: ${isDarkModeOn ? "#1e2030" : "#fff"};
    border-radius: 4px;
    height: 340px;
    overflow: hidden;
    .top {
      color: ${isDarkModeOn ? "#fff" : "#000"};
      border-bottom: 1px solid
        ${isDarkModeOn ? "rgba(40, 42, 58, 1)" : "rgba(210, 212, 218, 1)"};
      padding: 24px;
      p {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .form-content {
      padding: 24px;
      height: 230px;
      background-color: ${isDarkModeOn ? "#1e2030" : "#fff"};
    }
  }

  @media (max-width: 500px) {
    width: 100%;
    margin-top: 60px;
  }
`;

const handleTabClick = (tab) => {
  setSelectedTab(tab);
};

const PageContent = () => {
  switch (selectedTab) {
    case "my-stores":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.Store.Cards`}
          props={{
            isDarkModeOn,
            accountId,
          }}
        />
      );
    case "mint-nft":
      return (
        <Widget
          src="${config_account}/widget/Mintbase.App.ContractProfilePage.Mint.Index"
          props={{ contractId: accountId, isDarkModeOn }}
        />
      );
    case "deploy-store":
      return (
        <AppContent>
          <div className="head">
            <h2>SMART CONTRACT</h2>
            <h1>Deploy your Own Smart Contract with a few clicks</h1>
            <p>Assets Can be Worth $0.0001 or $10M</p>
          </div>
          <ContractSection>
            <div className="leftText">
              <div className="sec">
                <div>
                  {mintSvg}
                  <h1>Mint NFTs Collection</h1>
                </div>
                <p>
                  Easily Mint, Sell, Transfer and Burn NFTs on your contract
                </p>
              </div>
              <div className="sec">
                <div>
                  {addMinterSvg}
                  <h1>Add Minters</h1>
                </div>
                <p>Your Contract is your own DAO</p>
              </div>
              <div className="sec">
                <div>
                  {badgeSvg}
                  <h1>Safe and Audited</h1>
                </div>
                <p>
                  Enjoy the safety of your contracts with a stamp of approval
                  from credible auditors
                </p>
              </div>
              <div className="audit">
                <p>
                  AUDITED BY
                  <img
                    src="https://www.mintbase.xyz/images/ottersec.svg"
                    alt=""
                  />
                </p>
              </div>
              <a
                target="_blank"
                href="https://llyh4t73eduhn2i3j4gs523hnndpb24ynlrnsglgque46drcisxa.arweave.net/WvB-T_sg6HbpG08NLutna0bw65hq4tkZZoUJzw4iRK4"
              >
                View Report {upArrow}
              </a>
            </div>
            <FormSection>
              <p>
                <span>Try it out, it's that simple</span>
                <p className="down-arr">
                  <i class="bi bi-arrow-90deg-down"></i>
                </p>
              </p>
              <div className="form-main">
                <div className="top">
                  <p>New Contract</p>
                </div>
                <div className="form-content">
                  <Widget
                    src={`${config_account}/widget/Mintbase.App.Store.CreateForm`}
                    props={{
                      isDarkModeOn,
                      isInModal: false,
                      accountId,
                    }}
                  />
                </div>
              </div>
            </FormSection>
          </ContractSection>
        </AppContent>
      );
    case "my-owned-nfts":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.Tokens.Owned`}
          props={{
            isDarkModeOn,
            ownerId: accountId,
            isConnected,
            showFilters: showOwnedFilters,
            onCreateStore,
          }}
        />
      );
    case "my-minted-nfts":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.Tokens.Minted`}
          props={{
            isDarkModeOn,
            minterId: accountId,
            isConnected,
            showFilters: showOwnedFilters,
            onCreateStore,
          }}
        />
      );
    case "store-nfts":
      return (
        <Widget
          src="${config_account}/widget/Mintbase.App.ContractProfilePage.ContractNFTs"
          props={{ contractId: storeAddress, isDarkModeOn }}
        />
      );
    case "my-activity":
      return (
        <Widget
          src={`${config_account}/widget/Mintbase.App.Profile.Activity`}
          props={{ isDarkModeOn, accountId }}
        />
      );
    default:
      return null;
  }
};
const [count, setCount] = useState(0);

if (!context.accountId) {
  return (
    <p
      className="text-center"
      style={{
        color: isDarkModeOn ? "white" : "black",
        padding: "20px 0",
      }}
    >
      Please Sign In
    </p>
  );
}

const Card = styled.div`
  width: 100%;
  border-radius: 0;
  background-color: #f9fafb;
  color: black;
  margin: 0;
  padding: 12px 0;
  .top-desc {
    padding: 20px 0;
  }
  .input {
    margin: 0 auto;
    width: 70%;
    padding: 20px 0;
  }
  pre {
    margin: 0;
    padding: 0;
  }
  &.dark {
    background-color: var(--bg-gray-900, #101223);
    color: white;
  }
  .content_main {
    margin: 48px 44px 48px 44px;
  }
  .stripe-data {
    display: flex;
    flex-direction: row;
    gap: 32px;
    img {
      max-width: 500px;
      width: 100%;
      height: auto;
    }
    .stripe-image {
      width: 45%;
    }
    padding: 32px;
    .stripe-text {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 32px;
      width: 45%;
      max-width: 500px;
      .paras {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
    }
    @media only screen and (max-width: 800px) {
      flex-direction: column;
      .stripe-text {
        margin-top: 0;
        padding: 0;
        text-align: center;
        width: 100%;
        .paras {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
      }
      .stripe-image {
        width: 100%;
      }
    }
  }
`;

const queryInOwnedToggleHandler = () => {
  setShowOwnedFilters((prev) => !prev);
};

const onStoreAddressChange = (e) => {
  setStoreAddress(e.target.value);
};

const Index = ({}) => (
  <Root>
    <Card className={isDarkModeOn ? "dark" : ""}>
      <div
        className="top-desc"
        style={{ background: isDarkModeOn ? "#1e2030" : "#fff" }}
      >
        <h4 className="text-center">Hi {accountId}, I'm Mintbos Mini!</h4>
        <div className="input">
          <MbInputField
            id="contractAddress"
            placeholder="nft.genadrop.near"
            type="text"
            label="Store Address"
            // error={storeAddress.length > 3}
            className="input-field"
            // value={storeAddress}
            isDarkModeOn={isDarkModeOn}
            onChange={onStoreAddressChange}
          />
        </div>
        <Widget
          src={`${config_account}/widget/Mintbase.MbTabs`}
          props={{
            ...tabProps,
            activeTab: selectedTab,
            onTabChange: handleTabClick,
            isDarkModeOn,
            hasQueryToggle:
              selectedTab === "my-owned-nfts" ||
              selectedTab === "my-minted-owned",
            onQueryToggle: queryInOwnedToggleHandler,
          }}
        />
      </div>
      <div className="d-flex flex-column align-items-center content_main">
        <PageContent />
      </div>
      <Toggle onClick={switchChangeHandler} title="Toggle Theme">
        <Widget
          src={"${config_account}/widget/Mintbase.MbIcon"}
          props={{
            name: !isDarkModeOn ? "moon" : "sun",
            size: "22px",
            isDarkModeOn,
            color: !isDarkModeOn ? "mb-white" : "mb-black",
          }}
        />
      </Toggle>
    </Card>
  </Root>
);

return <Index {...props} />;
