const { getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);
const { isDarkModeOn } = props;
const mintSvg = (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 28 38"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current"
  >
    <path
      d="M27.7187 17.4687C27.6723 17.2673 27.5766 17.0804 27.4403 16.925C27.3039 16.7696 27.1311 16.6504 26.9374 16.5781L17.9374 13.2031L20.2187 1.75C20.2711 1.4847 20.2372 1.20957 20.1219 0.964939C20.0067 0.720307 19.816 0.519035 19.578 0.390624C19.3377 0.262769 19.0618 0.217962 18.7933 0.263177C18.5249 0.308393 18.2789 0.441093 18.0937 0.640624L0.593664 19.3906C0.45027 19.5394 0.346517 19.7218 0.291919 19.9211C0.23732 20.1204 0.233622 20.3302 0.281164 20.5312C0.330082 20.7316 0.426652 20.9172 0.562667 21.0723C0.698682 21.2273 0.870121 21.3473 1.06241 21.4219L10.0624 24.7969L7.78116 36.25C7.7287 36.5153 7.7626 36.7904 7.87788 37.0351C7.99317 37.2797 8.18378 37.481 8.42179 37.6094C8.60119 37.6999 8.79898 37.748 8.99991 37.75C9.16971 37.7507 9.33784 37.7164 9.49377 37.6492C9.64971 37.582 9.7901 37.4833 9.90616 37.3594L27.4062 18.6094C27.5496 18.4606 27.6533 18.2782 27.7079 18.0789C27.7625 17.8796 27.7662 17.6698 27.7187 17.4687Z"
      fill="currentColor"
    ></path>
  </svg>
);
const addMinterSvg = (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-purple-300 dark:text-purple-100"
  >
    <path
      d="M15.9375 14.0625V25.3125C15.9375 25.5611 15.8387 25.7996 15.6629 25.9754C15.4871 26.1512 15.2486 26.25 15 26.25C14.7514 26.25 14.5129 26.1512 14.3371 25.9754C14.1613 25.7996 14.0625 25.5611 14.0625 25.3125V14.0625C14.0625 13.8139 14.1613 13.5754 14.3371 13.3996C14.5129 13.2238 14.7514 13.125 15 13.125C15.2486 13.125 15.4871 13.2238 15.6629 13.3996C15.8387 13.5754 15.9375 13.8139 15.9375 14.0625ZM23.4375 22.5C23.1889 22.5 22.9504 22.5988 22.7746 22.7746C22.5988 22.9504 22.5 23.1889 22.5 23.4375V25.3125C22.5 25.5611 22.5988 25.7996 22.7746 25.9754C22.9504 26.1512 23.1889 26.25 23.4375 26.25C23.6861 26.25 23.9246 26.1512 24.1004 25.9754C24.2762 25.7996 24.375 25.5611 24.375 25.3125V23.4375C24.375 23.1889 24.2762 22.9504 24.1004 22.7746C23.9246 22.5988 23.6861 22.5 23.4375 22.5ZM26.25 16.875H24.375V4.6875C24.375 4.43886 24.2762 4.2004 24.1004 4.02459C23.9246 3.84877 23.6861 3.75 23.4375 3.75C23.1889 3.75 22.9504 3.84877 22.7746 4.02459C22.5988 4.2004 22.5 4.43886 22.5 4.6875V16.875H20.625C20.3764 16.875 20.1379 16.9738 19.9621 17.1496C19.7863 17.3254 19.6875 17.5639 19.6875 17.8125V19.6875C19.6875 19.9361 19.7863 20.1746 19.9621 20.3504C20.1379 20.5262 20.3764 20.625 20.625 20.625H26.25C26.4986 20.625 26.7371 20.5262 26.9129 20.3504C27.0887 20.1746 27.1875 19.9361 27.1875 19.6875V17.8125C27.1875 17.5639 27.0887 17.3254 26.9129 17.1496C26.7371 16.9738 26.4986 16.875 26.25 16.875ZM6.5625 18.75C6.31386 18.75 6.0754 18.8488 5.89959 19.0246C5.72377 19.2004 5.625 19.4389 5.625 19.6875V25.3125C5.625 25.5611 5.72377 25.7996 5.89959 25.9754C6.0754 26.1512 6.31386 26.25 6.5625 26.25C6.81114 26.25 7.0496 26.1512 7.22541 25.9754C7.40123 25.7996 7.5 25.5611 7.5 25.3125V19.6875C7.5 19.4389 7.40123 19.2004 7.22541 19.0246C7.0496 18.8488 6.81114 18.75 6.5625 18.75ZM9.375 13.125H7.5V4.6875C7.5 4.43886 7.40123 4.2004 7.22541 4.02459C7.0496 3.84877 6.81114 3.75 6.5625 3.75C6.31386 3.75 6.0754 3.84877 5.89959 4.02459C5.72377 4.2004 5.625 4.43886 5.625 4.6875V13.125H3.75C3.50136 13.125 3.2629 13.2238 3.08709 13.3996C2.91127 13.5754 2.8125 13.8139 2.8125 14.0625V15.9375C2.8125 16.1861 2.91127 16.4246 3.08709 16.6004C3.2629 16.7762 3.50136 16.875 3.75 16.875H9.375C9.62364 16.875 9.8621 16.7762 10.0379 16.6004C10.2137 16.4246 10.3125 16.1861 10.3125 15.9375V14.0625C10.3125 13.8139 10.2137 13.5754 10.0379 13.3996C9.8621 13.2238 9.62364 13.125 9.375 13.125ZM17.8125 7.5H15.9375V4.6875C15.9375 4.43886 15.8387 4.2004 15.6629 4.02459C15.4871 3.84877 15.2486 3.75 15 3.75C14.7514 3.75 14.5129 3.84877 14.3371 4.02459C14.1613 4.2004 14.0625 4.43886 14.0625 4.6875V7.5H12.1875C11.9389 7.5 11.7004 7.59877 11.5246 7.77459C11.3488 7.9504 11.25 8.18886 11.25 8.4375V10.3125C11.25 10.5611 11.3488 10.7996 11.5246 10.9754C11.7004 11.1512 11.9389 11.25 12.1875 11.25H17.8125C18.0611 11.25 18.2996 11.1512 18.4754 10.9754C18.6512 10.7996 18.75 10.5611 18.75 10.3125V8.4375C18.75 8.18886 18.6512 7.9504 18.4754 7.77459C18.2996 7.59877 18.0611 7.5 17.8125 7.5Z"
      fill="currentColor"
    ></path>
  </svg>
);
const badgeSvg = (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-purple-300 dark:text-purple-100"
  >
    <path
      d="M24.375 4.6875H5.625C5.12772 4.6875 4.65081 4.88504 4.29918 5.23667C3.94755 5.58831 3.75 6.06522 3.75 6.5625V13.4414C3.75 23.918 12.6328 27.3984 14.4141 27.9844C14.7947 28.1096 15.2053 28.1096 15.5859 27.9844C17.3672 27.3984 26.25 23.918 26.25 13.4414V6.5625C26.25 6.06522 26.0525 5.58831 25.7008 5.23667C25.3492 4.88504 24.8723 4.6875 24.375 4.6875ZM20.8008 12.8672L13.9336 19.4297C13.7561 19.5967 13.5211 19.689 13.2773 19.6875C13.0372 19.6884 12.8061 19.596 12.6328 19.4297L9.19922 16.1484C9.10399 16.0653 9.02653 15.9639 8.97152 15.8501C8.91651 15.7363 8.88507 15.6126 8.8791 15.4863C8.87312 15.3601 8.89274 15.2339 8.93676 15.1154C8.98079 14.997 9.04831 14.8886 9.13528 14.7969C9.22224 14.7052 9.32685 14.632 9.44282 14.5818C9.55879 14.5315 9.68372 14.5053 9.8101 14.5045C9.93649 14.5038 10.0617 14.5286 10.1783 14.5775C10.2948 14.6264 10.4003 14.6984 10.4883 14.7891L13.2773 17.4492L19.5117 11.5078C19.694 11.3488 19.9307 11.2664 20.1724 11.2778C20.414 11.2892 20.6419 11.3936 20.8083 11.5692C20.9748 11.7447 21.0669 11.9778 21.0655 12.2197C21.0641 12.4616 20.9693 12.6936 20.8008 12.8672Z"
      fill="currentColor"
    ></path>
  </svg>
);
const copySvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 0 24 24"
    width="20px"
    fill="#000000"
    class="fill-current text-blue-300 cursor-pointer dark:text-blue-100"
  >
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path>
  </svg>
);
const upArrow = (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-blue-300 dark:text-blue-100"
  >
    <g clip-path="url(#clip0_2307_53663)">
      <path
        d="M6.00002 3.3335V4.66683H10.3934L2.66669 12.3935L3.60669 13.3335L11.3334 5.60683V10.0002H12.6667V3.3335H6.00002Z"
        fill="currentColor"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_2307_53663">
        <rect width="16" height="16" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);
const AppContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 120px;
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
const MinstaSection = styled.div`
  width: 530px;
  margin-bottom: 25px;
  padding: 24px;
  background: ${isDarkModeOn ? "#1f2031" : "#fff"};
  ${getInputLabelFontType("big")}
  @media (max-width: 600px) {
    width: 98%;
  }
  .minHeader {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 48px;
  }
  h3 {
    font-size: 16px;
    font-weight: bold;
    color: ${isDarkModeOn ? "#fff" : "#000"};
  }
  span {
    font-size: 14px;
    color: ${isDarkModeOn ? "#fff" : "#626471"};
  }
  a {
    margin-top: 20px;
  }
  .link {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 100%;
    background: #f2f4f9;
    p {
      margin-bottom: 0;
    }
    svg {
      cursor: pointer;
    }
  }
`;
return (
  <>
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
            <p>Easily Mint, Sell, Transfer and Burn NFTs on your contract</p>
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
              Enjoy the safety of your contracts with a stamp of approval from
              credible auditors
            </p>
          </div>
          <div className="audit">
            <p>
              AUDITED BY
              <img src="https://www.mintbase.xyz/images/ottersec.svg" alt="" />
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
                src={`bos.genadrop.near/widget/Mintbase.App.Store.CreateForm`}
                props={{
                  isDarkModeOn,
                  isInModal: false,
                }}
              />
            </div>
          </div>
        </FormSection>
      </ContractSection>
    </AppContent>
    <AppContent>
      <div className="head">
        <h2>EASIEST WALLET</h2>
        <h1>Onboard your Community without Barriers</h1>
        <p>Seedless + non custodial + gasless = mass adoption</p>
      </div>
      <div className="templateButton">
        <button>
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://wallet.mintbase.xyz/account/new"
            target="_blank"
          >
            Go to Wallet
          </a>
        </button>
      </div>
    </AppContent>
    <AppContent>
      <div className="head">
        <h2>BUILDERS</h2>
        <h1>Deploy Blockchain + AI Apps in Minutes</h1>
        <p>Access new superpowers using our open source SDK</p>
      </div>
      <ContractSection>
        <div className="leftText">
          <div className="sec">
            <div>
              {mintSvg}
              <h1>Ready-made templates</h1>
            </div>
            <p>
              Deploy a custom marketplace or minter in 5 minutes from our
              templates
            </p>
          </div>
          <div className="sec">
            <div>
              {addMinterSvg}
              <h1>Built-in GraphQL Indexer</h1>
            </div>
            <p>
              1-second block times on NEAR gets almost instant confirmations
            </p>
          </div>
          <div className="sec">
            <div>
              {badgeSvg}
              <h1>Apps with DALLE-3, ChatGPT 4, and StabilityAI</h1>
            </div>
            <p>Mint from prompts, image-to-text minsta descriptions and more</p>
          </div>
        </div>
        <MinstaSection>
          <div className="minHeader">
            <h3>Minsta Selfie Minter</h3>
            <span>
              Roll your own NFT open minter photo app with AI text generation
              and meta transaction paid claim features
            </span>
            <a href="https://minsta.mintbase.xyz/" target="_blank">
              Example {upArrow}
            </a>
          </div>
          <div style={{ marginBottom: 0 }} className="minHeader">
            <h3>Blogchain</h3>
            <span>Make a blog an NFT</span>
            <a href="https://blogchain.mintbase.xyz/" target="_blank">
              Example {upArrow}
            </a>
          </div>
          <div className="link">
            <p>https://github.com/Mintbase/examples.git</p>
            {copySvg}
          </div>
        </MinstaSection>
      </ContractSection>
      <div className="templateButton">
        <button>
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://templates.mintbase.xyz/"
            target="_blank"
          >
            See Templates
          </a>
        </button>
      </div>
    </AppContent>
  </>
);
