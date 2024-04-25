const { getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);
const { isDarkModeOn } = props;
const coinSvg = (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-purple-300 dark:text-purple-100"
  >
    <path
      d="M6.96536 15.8641C6.97013 15.918 6.96087 15.9722 6.93848 16.0215C6.91608 16.0708 6.88132 16.1135 6.83756 16.1453C6.7938 16.1772 6.74255 16.1972 6.68877 16.2034C6.63499 16.2096 6.58053 16.2018 6.53067 16.1807C4.92479 15.6665 3.52376 14.6555 2.52971 13.2935C1.53566 11.9315 1 10.2889 1 8.60273C1 6.91655 1.53566 5.27396 2.52971 3.91195C3.52376 2.54993 4.92479 1.53892 6.53067 1.02477C6.58053 1.00369 6.63499 0.995865 6.68877 1.00206C6.74255 1.00826 6.7938 1.02827 6.83756 1.06014C6.88132 1.09201 6.91608 1.13466 6.93848 1.18394C6.96087 1.23322 6.97013 1.28746 6.96536 1.34138V1.95884C6.96166 2.04816 6.933 2.13466 6.88263 2.20852C6.83226 2.28239 6.76221 2.34066 6.68041 2.37673C5.4038 2.84286 4.30132 3.69015 3.52237 4.80382C2.74342 5.91748 2.32564 7.24368 2.32564 8.60274C2.32564 9.96179 2.74342 11.288 3.52237 12.4017C4.30132 13.5153 5.4038 14.3626 6.68041 14.8287C6.76221 14.8648 6.83226 14.9231 6.88263 14.9969C6.933 15.0708 6.96166 15.1573 6.96536 15.2466V15.8641Z"
      fill="currentColor"
    ></path>
    <path
      d="M9.61672 13.5735C9.61672 13.6614 9.58181 13.7457 9.51966 13.8078C9.45751 13.87 9.37321 13.9049 9.28532 13.9049H8.6225C8.5346 13.9049 8.45031 13.87 8.38816 13.8078C8.326 13.7457 8.29109 13.6614 8.29109 13.5735V12.5271C7.71521 12.505 7.16523 12.2821 6.73655 11.8969C6.30787 11.5117 6.02753 10.9886 5.94417 10.4184C5.93699 10.374 5.93954 10.3287 5.95165 10.2854C5.96376 10.2421 5.98515 10.202 6.01432 10.1679C6.04349 10.1337 6.07975 10.1063 6.12058 10.0875C6.1614 10.0688 6.20582 10.0592 6.25075 10.0593H7.00674C7.08354 10.06 7.15778 10.087 7.21697 10.136C7.27616 10.1849 7.3167 10.2527 7.33178 10.3281C7.47223 10.9834 7.853 11.4898 9.01018 11.4898C9.86594 11.4898 10.473 11.0129 10.473 10.2978C10.473 9.58248 10.1153 9.31178 8.85829 9.10588C7.00547 8.85653 6.12765 8.29304 6.12765 6.84102C6.14907 6.27222 6.3833 5.7322 6.78396 5.3279C7.18463 4.92359 7.7225 4.68449 8.29109 4.65793V3.63121C8.29109 3.54332 8.326 3.45902 8.38816 3.39687C8.45031 3.33472 8.5346 3.2998 8.6225 3.2998H9.28532C9.37321 3.2998 9.45751 3.33472 9.51966 3.39687C9.58181 3.45902 9.61672 3.54332 9.61672 3.63121V4.68708C10.0951 4.73756 10.5446 4.94042 10.899 5.26574C11.2533 5.59106 11.4938 6.02163 11.5849 6.49397C11.5939 6.53885 11.5927 6.58517 11.5816 6.62955C11.5704 6.67394 11.5495 6.71528 11.5204 6.75058C11.4913 6.78588 11.4546 6.81425 11.4132 6.83362C11.3717 6.853 11.3264 6.8629 11.2807 6.8626H10.5835C10.5112 6.86192 10.4411 6.83782 10.3837 6.79393C10.3263 6.75004 10.2847 6.68871 10.2651 6.61915C10.0765 5.9802 9.61984 5.70309 8.82589 5.70309C7.94808 5.70309 7.49308 6.1259 7.49308 6.72175C7.49308 7.35023 7.75299 7.66459 9.0966 7.85969C10.9172 8.10879 11.8601 8.62902 11.8601 10.1785C11.8414 10.7776 11.602 11.3487 11.188 11.782C10.7739 12.2154 10.2143 12.4805 9.61672 12.5265V13.5735Z"
      fill="currentColor"
    ></path>
    <path
      d="M11.3769 16.1807C11.327 16.2018 11.2726 16.2096 11.2188 16.2034C11.165 16.1972 11.1138 16.1772 11.07 16.1453C11.0262 16.1135 10.9915 16.0708 10.9691 16.0215C10.9467 15.9722 10.9374 15.918 10.9422 15.8641V15.2466C10.9414 15.1562 10.9682 15.0677 11.0192 14.993C11.0701 14.9183 11.1427 14.861 11.2271 14.8287C12.5038 14.3626 13.6062 13.5153 14.3852 12.4017C15.1641 11.288 15.5819 9.96179 15.5819 8.60274C15.5819 7.24368 15.1641 5.91748 14.3852 4.80382C13.6062 3.69015 12.5038 2.84286 11.2271 2.37673C11.1453 2.34066 11.0753 2.28238 11.0249 2.20852C10.9746 2.13465 10.9459 2.04816 10.9422 1.95883V1.34138C10.9374 1.28746 10.9467 1.23322 10.9691 1.18394C10.9915 1.13466 11.0262 1.09201 11.07 1.06014C11.1138 1.02827 11.165 1.00826 11.2188 1.00206C11.2726 0.995865 11.327 1.00369 11.3769 1.02477C12.9828 1.53892 14.3838 2.54993 15.3779 3.91195C16.3719 5.27396 16.9076 6.91655 16.9076 8.60273C16.9076 10.2889 16.3719 11.9315 15.3779 13.2935C14.3838 14.6555 12.9828 15.6665 11.3769 16.1807Z"
      fill="currentColor"
    ></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M27.9572 16V18.1271H23.4849V19.6019C26.6259 19.7595 28.9825 20.4068 29 21.1826L28.9999 22.8C28.9824 23.5759 26.6259 24.2231 23.4849 24.3807V28H20.5152V24.3807C17.3741 24.2231 15.0175 23.5759 15 22.8L15.0001 21.1826C15.0176 20.4068 17.3741 19.7595 20.5152 19.6019V18.1271H16.0428V16H27.9572ZM22 23.2696C25.3521 23.2696 28.1538 22.7222 28.8395 21.9913C28.258 21.3715 26.1549 20.8837 23.4849 20.7497V22.2938C23.0063 22.3178 22.5095 22.3304 22 22.3304C21.4905 22.3304 20.9937 22.3178 20.5152 22.2938V20.7497C17.8451 20.8837 15.742 21.3715 15.1605 21.9913C15.8462 22.7222 18.6479 23.2696 22 23.2696Z"
      fill="currentColor"
    ></path>
  </svg>
);
const nearIcon = (
  <svg
    width="28px"
    height="28px"
    viewBox="0 0 18 18"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-black dark:text-white"
  >
    <path
      d="M5.10976 4.05615C5.47596 4.05615 5.81596 4.24601 6.00779 4.55812L8.07455 7.62657C8.14188 7.7277 8.11455 7.86404 8.01343 7.93136C7.93145 7.98601 7.823 7.97925 7.74835 7.91502L5.71399 6.15052C5.68019 6.1201 5.62807 6.12319 5.59765 6.157C5.58385 6.17249 5.57652 6.19249 5.57652 6.21305V11.7376C5.57652 11.7832 5.61343 11.8198 5.65906 11.8198C5.68357 11.8198 5.70667 11.8091 5.72216 11.7902L11.8717 4.42911C12.072 4.19277 12.3661 4.05643 12.6757 4.05615H12.8906C13.4723 4.05615 13.9438 4.5277 13.9438 5.10939V12.8902C13.9438 13.4719 13.4723 13.9435 12.8906 13.9435C12.5244 13.9435 12.1844 13.7536 11.9926 13.4415L9.92582 10.3731C9.8585 10.2719 9.88582 10.1356 9.98695 10.0683C10.0689 10.0136 10.1774 10.0204 10.252 10.0846L12.2864 11.8491C12.3202 11.8795 12.3723 11.8764 12.4027 11.8426C12.4165 11.8271 12.4238 11.8071 12.4236 11.7866V6.26066C12.4236 6.21503 12.3867 6.17841 12.341 6.17841C12.3168 6.17841 12.2934 6.18911 12.2779 6.20798L6.1292 13.5705C5.92892 13.8069 5.63483 13.9432 5.32526 13.9435H5.11033C4.52864 13.9438 4.05681 13.4725 4.05624 12.8908V5.10939C4.05624 4.5277 4.52779 4.05615 5.10948 4.05615H5.10976Z"
      fill="currentColor"
    ></path>
  </svg>
);
const handSvg = (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-purple-300 dark:text-purple-100"
  >
    <path
      d="M8.00562 3.58602C8.03364 3.19799 8.16179 2.82386 8.37756 2.50014C8.59332 2.17643 8.88934 1.91419 9.23671 1.73902C9.58408 1.56386 9.97094 1.48175 10.3595 1.50072C10.7481 1.5197 11.1251 1.6391 11.4537 1.84727C11.4913 1.87185 11.5216 1.9061 11.5414 1.94642C11.5611 1.98674 11.5697 2.03164 11.5661 2.0764C11.5625 2.12116 11.5469 2.16413 11.521 2.2008C11.4951 2.23746 11.4598 2.26647 11.4187 2.28477C10.8474 2.54181 10.3625 2.95833 10.0221 3.48429C9.68172 4.01025 9.50044 4.62328 9.5 5.24977C9.5 5.32289 9.5 5.39602 9.5075 5.46789C9.51095 5.51332 9.50191 5.55883 9.48137 5.5995C9.46084 5.64017 9.42957 5.67445 9.39097 5.69864C9.35236 5.72283 9.30788 5.73602 9.26233 5.73677C9.21677 5.73752 9.17188 5.7258 9.1325 5.70289C8.76417 5.49221 8.46292 5.18166 8.26353 4.8071C8.06414 4.43253 7.97473 4.00922 8.00562 3.58602ZM15 10.0379C15.0009 10.3236 14.9217 10.6038 14.7715 10.8469C14.6213 11.0899 14.406 11.286 14.15 11.4129L14.1225 11.4254L11.6956 12.4591C11.6716 12.4697 11.6467 12.4781 11.6213 12.4841L7.62125 13.4841C7.58163 13.4943 7.54091 13.4996 7.5 13.4998H1C0.734784 13.4998 0.48043 13.3944 0.292893 13.2069C0.105357 13.0193 0 12.765 0 12.4998V9.99977C0 9.73455 0.105357 9.4802 0.292893 9.29266C0.48043 9.10512 0.734784 8.99977 1 8.99977H2.79312L4.20687 7.58539C4.39225 7.39919 4.61269 7.25156 4.85546 7.15104C5.09822 7.05052 5.3585 6.99911 5.62125 6.99977H8.75C9.01411 6.99974 9.2748 7.05949 9.51253 7.17454C9.75026 7.28959 9.95887 7.45696 10.1227 7.6641C10.2866 7.87124 10.4014 8.11278 10.4586 8.37061C10.5158 8.62845 10.514 8.89589 10.4531 9.15289L13.0681 8.55164C13.2958 8.49136 13.5342 8.48415 13.7651 8.53058C13.996 8.577 14.2131 8.67582 14.3998 8.81942C14.5864 8.96302 14.7376 9.14755 14.8417 9.35881C14.9457 9.57006 14.9999 9.80239 15 10.0379ZM14 10.0379C13.9999 9.95522 13.9808 9.87368 13.9441 9.79959C13.9074 9.72551 13.8542 9.66087 13.7885 9.6107C13.7227 9.56053 13.6464 9.52617 13.5652 9.51029C13.4841 9.49441 13.4004 9.49744 13.3206 9.51914L13.3013 9.52414L9.11375 10.4873C9.07702 10.4955 9.03951 10.4997 9.00187 10.4998H7C6.86739 10.4998 6.74021 10.4471 6.64645 10.3533C6.55268 10.2596 6.5 10.1324 6.5 9.99977C6.5 9.86716 6.55268 9.73998 6.64645 9.64621C6.74021 9.55245 6.86739 9.49977 7 9.49977H8.75C8.94891 9.49977 9.13968 9.42075 9.28033 9.2801C9.42098 9.13944 9.5 8.94868 9.5 8.74977C9.5 8.55086 9.42098 8.36009 9.28033 8.21944C9.13968 8.07879 8.94891 7.99977 8.75 7.99977H5.62125C5.48988 7.99935 5.35974 8.02505 5.23839 8.07537C5.11703 8.12569 5.0069 8.19963 4.91437 8.29289L3.5 9.70664V12.4998H7.4375L11.3394 11.5241L13.7144 10.5129C13.8008 10.4673 13.8731 10.399 13.9235 10.3153C13.9738 10.2315 14.0003 10.1356 14 10.0379ZM10.5 5.24977C10.5 5.69478 10.632 6.12979 10.8792 6.4998C11.1264 6.86981 11.4778 7.1582 11.889 7.3285C12.3001 7.49879 12.7525 7.54335 13.189 7.45653C13.6254 7.36972 14.0263 7.15543 14.341 6.84076C14.6557 6.52609 14.87 6.12518 14.9568 5.68872C15.0436 5.25226 14.999 4.79986 14.8287 4.38873C14.6584 3.9776 14.37 3.62619 14 3.37896C13.63 3.13173 13.195 2.99977 12.75 2.99977C12.1533 2.99977 11.581 3.23682 11.159 3.65878C10.7371 4.08073 10.5 4.65303 10.5 5.24977Z"
      fill="currentColor"
    ></path>
  </svg>
);
const walletSvg = (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-purple-300 dark:text-purple-100"
  >
    <path
      d="M26.25 5.625H3.75C3.25272 5.625 2.77581 5.82254 2.42417 6.17417C2.07254 6.52581 1.875 7.00272 1.875 7.5V22.5C1.875 22.9973 2.07254 23.4742 2.42417 23.8258C2.77581 24.1775 3.25272 24.375 3.75 24.375H26.25C26.7473 24.375 27.2242 24.1775 27.5758 23.8258C27.9275 23.4742 28.125 22.9973 28.125 22.5V7.5C28.125 7.00272 27.9275 6.52581 27.5758 6.17417C27.2242 5.82254 26.7473 5.625 26.25 5.625ZM15.9375 20.625H14.0625C13.8139 20.625 13.5754 20.5262 13.3996 20.3504C13.2238 20.1746 13.125 19.9361 13.125 19.6875C13.125 19.4389 13.2238 19.2004 13.3996 19.0246C13.5754 18.8488 13.8139 18.75 14.0625 18.75H15.9375C16.1861 18.75 16.4246 18.8488 16.6004 19.0246C16.7762 19.2004 16.875 19.4389 16.875 19.6875C16.875 19.9361 16.7762 20.1746 16.6004 20.3504C16.4246 20.5262 16.1861 20.625 15.9375 20.625ZM23.4375 20.625H19.6875C19.4389 20.625 19.2004 20.5262 19.0246 20.3504C18.8488 20.1746 18.75 19.9361 18.75 19.6875C18.75 19.4389 18.8488 19.2004 19.0246 19.0246C19.2004 18.8488 19.4389 18.75 19.6875 18.75H23.4375C23.6861 18.75 23.9246 18.8488 24.1004 19.0246C24.2762 19.2004 24.375 19.4389 24.375 19.6875C24.375 19.9361 24.2762 20.1746 24.1004 20.3504C23.9246 20.5262 23.6861 20.625 23.4375 20.625ZM3.75 10.3125V7.5H26.25V10.3125H3.75Z"
      fill="currentColor"
    ></path>
  </svg>
);
const HomePurchase = styled.div`
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
  .explore {
    display: flex;
    justify-content: center;
    align-item: center;
    margin-top: 30px;
    p {
      padding: 9px 20px;
      border-radius: 8px;
      cursor: pointer;
      color: ${isDarkModeOn ? "#f8f8f8" : "#4f59a2"};
    }
    p:hover {
      border: 1px solid #4f59a2;
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
      background: #262b3a
      cursor: not-allowed;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      font-weight: 600;
      border: none;
    }
  }
  @media (max-width: 600px) {
    .leftText {
      max-width: 100%;
    }
  }
`;
const BuyCard = styled.div`
  background: ${isDarkModeOn ? "#1e2131" : "#fff"};
  width: 406px;
  height: 230px;
  display: flex;
  flex-direction: column;
  .head {
    background: ${isDarkModeOn ? "#262b3a" : "#f8f8f8"};
    align-items: flex-start;
    padding: 16px 24px;
    margin-bottom: 0;
    p {
      font-size: 14px;
      font-weight: bold;
      color: ${isDarkModeOn ? "#fff" : "#000"};
    }
  }
  .content {
    padding: 24px;
    span {
      color: ${isDarkModeOn ? "#fff" : "#000"};
    }
    div {
      display: flex;
      align-items: flex-end;
      margin-top: 8px;
      h1 {
        font-size: 24px;
        color: ${isDarkModeOn ? "#fff" : "#000"};
        font-weight: bold;
      }
      p {
        font-weight: 500;
        color: ${isDarkModeOn ? "#fff" : "#000"};
        font-size: 14px;
      }
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    align-items: center;
    button:first-child {
      color: ${isDarkModeOn ? "#000" : "#fff"};
      font-size: 14px;
      border: none;
      padding: 8px 10px;
      background: ${isDarkModeOn ? "#fff" : "#000"};
      margin-right: 10px;
    }
    button:last-child {
      background: ${isDarkModeOn ? "#000" : "#fff"};
      color: ${isDarkModeOn ? "#fff" : "#000"};
      border-color: #000;
    }
  }
  @media (max-width: 500px) {
    width: 99%;
    margin: 0 10px;
  }
`;
const Section = styled.div`
  width: 100%;
`;
const Partners = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 276px;
  gap: 20px;
  a {
    text-decoration: none;
  }
  .partners {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  h1 {
    ${getInputLabelFontType("big")}
    font-weight: bold;
    color: ${isDarkModeOn ? "#D1D5DB" : "#374151"};
    font-size: 18px !important;
  }
  .partner {
    height: 168px;
    width: 200px;
    display: flex;
    padding: 48px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      height: auto;
      color: transparent;
      filter: ${isDarkModeOn ? "invert(1)" : ""};
      max-width: 100%;
    }
    &:hover {
      background: ${isDarkModeOn ? "#1F2937" : "#fff"};
    }
  }
  .announce {
    display: flex;
    color: ${isDarkModeOn ? "#fff" : "#000"};
    border: 1px solid #5b5d6b;
    padding: 6px 16px;
    margin-bottom: 48px;
  }
`;
const partners = [
  {
    link: "https://www.animocabrands.com/",
    image: "https://www.mintbase.xyz/investors/animoca2.svg",
  },
  {
    link: "https://www.sinoglobalcapital.com/",
    image: "https://www.mintbase.xyz/investors/sino.svg",
  },
  {
    link: "https://www.coinbase.com/",
    image: "https://www.mintbase.xyz/investors/coinbase.svg",
  },
  {
    link: "https://woodstockfund.com/",
    image: "https://www.mintbase.xyz/investors/woodstock.svg",
  },
  {
    link: "https://www.libertuscapital.com/",
    image: "https://www.mintbase.xyz/investors/libertus.svg",
  },
  {
    link: "https://blockworks.co/news/",
    image: "https://www.mintbase.xyz/investors/move.svg",
  },
  {
    link: "https://blockworks.co/news/",
    image: "https://www.mintbase.xyz/investors/iosg-mintbase.svg",
  },
  {
    link: "https://www.cerasvc.com/",
    image: "https://www.mintbase.xyz/investors/ceras.svg",
  },
  {
    link: "https://trgc.io/",
    image: "https://www.mintbase.xyz/investors/trgc.svg",
  },
  {
    link: "https://www.arweave.org/",
    image: "https://www.mintbase.xyz/investors/arweave.svg",
  },
  {
    link: "https://www.animalventures.com/",
    image: "https://www.mintbase.xyz/investors/warburg.svg",
  },
  {
    link: "https://www.figment.io/",
    image: "https://www.mintbase.xyz/investors/figment.svg",
  },
  {
    link: "https://www.fundamentallabs.com/",
    image: "https://www.mintbase.xyz/investors/fundamental.svg",
  },
  {
    link: "https://sustany.co/",
    image: "https://www.mintbase.xyz/investors/sustany_1.svg",
  },
];
const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};
return (
  <Section>
    <HomePurchase>
      <div className="head">
        <h2>STRIPE ENABLED</h2>
        <h1>Sell your NFTs in over +135 Currencies with Credit Cards</h1>
        <p>Setup is less than 10 minutes</p>
      </div>
      <ContractSection>
        <>
          <BuyCard>
            <div className="head">
              <p>1 of 1 Listed as Simple Sale</p>
            </div>
            <div className="content">
              <span>Lowest Price</span>
              <div>
                <h1>2.00 {nearIcon}</h1>
                <p>$7.98</p>
              </div>
            </div>
            <div className="buttons">
              <button>Buy With Crypto</button>
              <button>Buy With Credit Card</button>
            </div>
            <div className="explore">
              <Link
                to={href({
                  widgetSrc: "bos.genadrop.near/widget/Mintbase.App.Index",
                  params: {
                    page: "markets",
                  },
                })}
              >
                <p>Explore Market</p>
              </Link>
            </div>
          </BuyCard>
        </>
        <div className="leftText">
          <div className="sec">
            <div>
              {coinSvg}
              <h1>Sell with stablecoins</h1>
            </div>
            <p>
              Crypto is volatile. Sell your NFTs using USDC or USDT to ensure
              stable prices
            </p>
          </div>
          <div className="sec">
            <div>
              {handSvg}
              <h1>Earn with Affiliate Links</h1>
            </div>
            <p>
              Monetize traffic by earning commissions when directing buyers to
              listings
            </p>
          </div>
          <div className="sec">
            <div>
              {walletSvg}
              <h1>Connect Stripe and Sell for Fiat</h1>
            </div>
            <p>
              Complete an optional KYC and sell your tokens to a broader
              audience
            </p>
          </div>
          <a href="https://www.mintbase.xyz/launchpad/stripe-connection/0">
            Connect To Stripe{upArrow}
          </a>
        </div>
      </ContractSection>
    </HomePurchase>
    <Partners>
      <h1>BACKED BY THE BEST</h1>
      <div className="partners">
        {partners.map((data) => (
          <a
            href={data.link}
            target="_blank"
            className="partner"
            key={data.link}
          >
            <img src={data.image} alt="partner" />
          </a>
        ))}
      </div>
      <a
        href="https://blog.mintbase.xyz/mintbase-raises-7-5m-series-a-5m-grants-pool-to-pioneer-utility-nft-infrastructure-850c9b2bd476"
        target="_blank"
        className="announce"
      >
        See Announcement
      </a>
    </Partners>
  </Section>
);
