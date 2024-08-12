const { getInputLabelFontType, getFontType, MbDropdownHoverMenu, MbArrowMenu } =
  VM.require("${config_account}/widget/Mintbase.components");

const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};

const { Button } = VM.require(
  "${config_account}/widget/Mintbase.App.Resources.Button"
) || {
  Button: () => <button></button>,
};

const searchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="25px"
    height="25px"
  >
    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
  </svg>
);

const searchLightIcon = (
  <svg
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="25px"
    height="25px"
  >
    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
  </svg>
);

const { isDarkModeOn, isHome, ...passProps } = props;
const [isOpen, setIsOpen] = useState(false);

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const urlChecks =
  props.isGateway ||
  props.gatewayURL.includes("http://127.0.0.1:8080") ||
  props.gatewayURL.includes("everything.dev");

const MbNavbar = styled.div`
  width: 100%;
  padding: 10px;
  top: 0px;
  margin: 0 auto;
  z-index: 100;
  position: sticky;
  .searchInput {
    :focus {
      outline: none !important;
      border: none !important;
    }
  }
  &.dark {
    .search {
      background: #101223;
    }
  }
  .search {
    display: flex;
    align-items: center;
    background: #f3f4f8;
    padding: 0 10px;
    border-radius: 8px;
    svg {
      cursor: pointer;
      transition: 0.3s ease-in-out;
    }
    svg:hover {
      opacity: 0.6;
    }
  }

  .nav {
    position: sticky;
    top: 10px;
    z-index: 100;
    margin-left: 24px;
    margin-right: 24px;
    padding: 0 10px;
    @media (min-width: 768px) {
      margin-left: 64px;
      margin-right: 64px;
    }
  }
  .navbar {
    flex-wrap: nowrap;
  }
  .user-section {
    display: block;
    padding-top: 5px;
    @media (max-width: 800px) {
      display: none;
    }
  }
  .innerNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    @media (max-width: 800px) {
      width: 100%;
      flex-direction: column;
    }
  }
  .rightNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    gap: 24px;
    margin-right: 24px;
    width: 100%;
    .rhs {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: row nowrap;
      gap: 24px;
    }
    img {
      width: 60%;
    }
    input {
      border: none;
      padding: 12px;
      width: 100%;
      @media (max-width: 800px) {
        font-size: 12px;
        padding: 6px;
      }
      &::placeholder {
        color: #71766c;
      }
    }
    :focus {
      outline: none !important;
      border: none !important;
    }
  }
  .tabs {
    display: flex;
    @media (max-width: 800px) {
      flex-direction: column;
      height: 90vh;
      width: 100%;
      align-items: flex-start;
      margin: 20px;
      display: none;
    }
  }

  .container {
    display: flex;
    align-items: center;

    .navigation-section {
      margin-left: 50px;
      display: flex;

      > div {
        > a {
          margin-right: 20px;
        }
      }
    }

    .user-section {
      display: flex;
      align-items: center;

      .nav-create-btn {
        margin-left: 10px;
      }

      .nav-sign-in-btn {
        margin-left: 10px;
      }
    }

    .arrow-up-right {
      margin-left: 4px;
    }
  }
  .logo {
    width: 10vw;
    max-width: 100px;
    min-width: 30px;
    @media (max-width: 800px) {
      width: 60px;
    }
  }
`;
const Dropdown = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 20px;
  height: 100%;
  width: 100%;
  a {
    text-decoration: none;
    padding: 0.75rem;
    border-radius: 0.25rem;
    transition: 0.4s ease-in-out;
    width: max-content;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
  }
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style-type: none;
    li,
    li li {
      padding: 0.75rem;
      border-radius: 0.25rem;
      transition: 0.4s ease-in-out;
      width: max-content;
      font-size: 14px;
      line-height: 16px;
      cursor: pointer;
    }

    color: ${isDarkModeOn ? "#fff" : "#000"};
    a {
      color: ${isDarkModeOn ? "#fff" : "#000"};
      &:hover {
        color: ${isDarkModeOn ? "#c5d0ff" : "#4f58a3"};
        background-color: ${isDarkModeOn
          ? "rgba(59, 130, 246, 0.15)"
          : "rgba(66, 153, 225, 0.15)"};
      }
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    width: max-content;
  }
  .rightButtons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .rightObjects {
    display: flex;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    margin-left: 40px;
    align-items: flex-start;
    .rightObjects {
      flex-wrap: wrap;
    }
  }
`;

const RouteButton = styled.a`
  text-decoration: none;
  display: flex;
  padding: 10px 24px;
  border-radius: 9999px;
  text-align: center;
  margin-top: 10px;
  width: 16rem;
  line-height: 1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${isDarkModeOn ? "#fff" : "#000"};
  background-color: ${!isDarkModeOn ? "#F9F9F9" : "#282A3A"};
  a {
    color: ${isDarkModeOn ? "#fff" : "#000"};
    background-color: ${!isDarkModeOn ? "#F9F9F9" : "#282A3A"};
    &:hover {
      color: ${isDarkModeOn ? "#c5d0ff" : "#4f58a3"};
      background-color: ${isDarkModeOn
        ? "rgba(59, 130, 246, 0.15)"
        : "rgba(66, 153, 225, 0.15)"};
    }
  }
  &:hover {
    color: ${isDarkModeOn ? "#c5d0ff" : "#4f58a3"};
    background-color: ${isDarkModeOn
      ? "rgba(59, 130, 246, 0.15)"
      : "rgba(66, 153, 225, 0.15)"};
  }
  img {
    height: 20px !important;
    width: 20px !important;
  }
  h1 {
    margin-left: 0.75rem;
    font-size: 16px;
    color: inherit;
  }
`;

const MobileNavOptions = styled.div`
  display: none;

  * {
    font-family: Helvetica Neue;
  }
  @media screen and (max-width: 769px) {
    display: flex;
  }
`;

const MenuToggle = styled.div`
  padding: 5px;
  cursor: pointer;
  .burger path {
  }
`;

const RouteLabel = styled.p`
  color: #666;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.14px;
  text-transform: uppercase;
  margin: 0;
`;

const dropdownStyle = `
  @media (max-width: 500px) {
    .menu-items {
      > div {
        padding: 5px !important;
      }
    }
  }
`;

const menuToggleHandler = () => setIsOpen(!isOpen);
const [searchValue, setSearchValue] = useState("");

const NavLink = ({ to, children, param }) => {
  if (param === "tab") {
    return (
      <Link
        key={"preview-to" + to}
        to={href({
          widgetSrc: "${config_account}/widget/Mintbase.App.Index",
          params: {
            page: "preview",
            tab: to,
          },
        })}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <Link
        key={"to" + to}
        to={href({
          widgetSrc: "${config_account}/widget/Mintbase.App.Index",
          params: {
            page: to,
            ...(param && { tab: param }),
          },
        })}
      >
        {children}
      </Link>
    );
  }
};

const SidebarMobile = styled.div`
  display: none;
  &:dark {
    svg {
      fill: #fff !important;
    }
  }

  .buger path {
    fill: ${isDarkModeOn ? "transparent" : "white"};
  }

  .mobile-tabs {
    display: none;
    @media (max-width: 800px) {
      display: flex;
      flex-direction: column;
      height: 90vh;
      width: 100%;
      align-items: flex-start;
      margin: 20px;
    }
  }

  .innerNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    @media (max-width: 800px) {
      width: 100%;
      flex-direction: column;
    }
  }
  .rightNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    gap: 24px;
    margin-right: 24px;
    width: 100%;
    .rhs {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: row nowrap;
      gap: 24px;
    }
    img {
      width: 60%;
    }
    input {
      border: none;
      padding: 12px;
      width: 100%;
      @media (max-width: 800px) {
        font-size: 12px;
        padding: 6px;
      }
      &::placeholder {
        color: #71766c;
      }
    }
    :focus {
      outline: none !important;
      border: none !important;
    }
  }
  .tabs {
    display: flex;
    @media (max-width: 800px) {
      flex-direction: column;
      height: 90vh;
      width: 100%;
      align-items: flex-start;
      margin: 20px;
      display: none;
    }
  }
  .container {
    display: flex;
    align-items: center;

    .navigation-section {
      margin-left: 50px;
      display: flex;

      > div {
        > a {
          margin-right: 20px;
        }
      }
    }

    .user-section {
      display: flex;
      align-items: center;

      .nav-create-btn {
        margin-left: 10px;
      }

      .nav-sign-in-btn {
        margin-left: 10px;
      }
    }

    .arrow-up-right {
      margin-left: 4px;
    }
  }

  @media screen and (max-width: 800px) {
    display: flex;
    background: ${isDarkModeOn ? "#00000033" : "#fff"};
    left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  }
  .user-section {
    display: flex;
    align-items: center;

    .nav-create-btn {
      margin-left: 10px;
    }

    .nav-sign-in-btn {
      margin-left: 10px;
    }
  }
`;

const mintBosLogo = (
  <svg
    width="128"
    height="32"
    viewBox="0 0 128 32"
    fill="none"
    className="logo"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_416_14)">
      <path
        d="M51.5136 7.441V24.51H49.3853V10.2695L45.1804 24.51H39.9214L35.7165 10.2695V24.51H33.5938V7.441H36.9271L41.5172 22.6541H43.5994L48.1876 7.4375L51.5136 7.441Z"
        fill="#FF2424"
      />
      <path
        d="M55.1562 7.44531H57.2071V9.69022H55.1562V7.44531ZM55.1562 12.2979H57.2071V24.5143H55.1562V12.2979Z"
        fill="#FF2424"
      />
      <path
        d="M70.0816 15.6691V24.519H68.0288V16.2824C68.0288 14.7964 67.3121 13.6976 65.6187 13.6976C63.9603 13.6976 62.6446 14.7963 62.6446 16.6487V24.5243H60.5938V12.3026H62.6446V13.815C63.0303 13.2305 63.5681 12.7506 64.206 12.4218C64.8439 12.093 65.5602 11.9264 66.2857 11.9381C68.3108 11.9381 70.0816 13.1999 70.0816 15.6691Z"
        fill="#FF2424"
      />
      <path
        d="M74.0783 21.0038V14.0535H72.3867V12.301H74.1041V9.25H76.131V12.2975H78.9779V14.05H76.131V20.9512C76.131 22.5845 76.8496 22.9508 78.0289 22.9508H79.1087V24.7032H78.0031C75.873 24.7102 74.0783 24.2704 74.0783 21.0038Z"
        fill="#FF2424"
      />
      <path
        d="M23.0568 12.2403H20.7258V3.71632C20.7283 2.87624 20.4325 2.05996 19.8862 1.39975C19.34 0.739541 18.5754 0.274072 17.7163 0.078756C16.8572 -0.11656 15.9539 -0.0302771 15.1528 0.323624C14.3517 0.677525 13.6997 1.27831 13.3024 2.02865C12.9051 2.77898 12.7859 3.63489 12.964 4.45772C13.1421 5.28056 13.6071 6.02209 14.2837 6.56219C14.9603 7.10229 15.8088 7.40931 16.6917 7.43351C17.5747 7.4577 18.4403 7.19766 19.1485 6.69551V12.2403H10.149C9.63557 12.2403 9.1272 12.3365 8.65291 12.5234C8.17862 12.7103 7.74769 12.9843 7.38475 13.3296C7.02181 13.6749 6.73396 14.0849 6.53766 14.5361C6.34136 14.9872 6.24045 15.4708 6.24069 15.959C6.24069 15.9853 6.24069 16.0134 6.24069 16.0396V24.5636H3.9079C3.13597 24.5633 2.3812 24.7803 1.73873 25.1873C1.09625 25.5942 0.59481 26.1729 0.29758 26.8505C0.000350087 27.528 -0.0793629 28.2741 0.0684856 28.9946C0.216334 29.7152 0.585126 30.378 1.12839 30.8995C1.67166 31.4211 2.3651 31.778 3.12132 31.9254C3.87753 32.0728 4.66269 32.004 5.37786 31.7277C6.09303 31.4513 6.7062 30.9799 7.14011 30.3727C7.57402 29.7655 7.80925 29.0498 7.81616 28.3157V26.0637H13.6942C13.1704 26.7349 12.9 27.5545 12.9267 28.39C12.9534 29.2254 13.2757 30.0279 13.8414 30.6676C14.4072 31.3072 15.1833 31.7466 16.0442 31.9147C16.9051 32.0828 17.8005 31.9698 18.5855 31.5938C19.3705 31.2179 19.9991 30.6011 20.3698 29.8433C20.7404 29.0854 20.8314 28.2307 20.628 27.4176C20.4246 26.6044 19.9386 25.8803 19.2488 25.3624C18.559 24.8445 17.7056 24.5631 16.8267 24.5636H7.81616V18.9382C8.56811 19.473 9.49751 19.7322 10.434 19.6683C11.3706 19.6043 12.2515 19.2216 12.9155 18.5901C13.5794 17.9587 13.9819 17.1209 14.0491 16.2302C14.1163 15.3395 13.8438 14.4556 13.2815 13.7404H19.1485V15.9993C19.1561 16.733 19.3919 17.448 19.826 18.0544C20.2601 18.6609 20.8733 19.1316 21.5882 19.4072C22.3031 19.6828 23.0877 19.7511 23.8433 19.6034C24.599 19.4557 25.2917 19.0987 25.8344 18.5772C26.377 18.0558 26.7453 17.3933 26.8927 16.6732C27.0402 15.9531 26.9603 15.2075 26.6631 14.5305C26.366 13.8535 25.8648 13.2753 25.2227 12.8687C24.5806 12.4621 23.8263 12.2453 23.0549 12.2456L23.0568 12.2403ZM16.8157 5.93143C16.3543 5.93143 15.9033 5.80131 15.5197 5.55753C15.136 5.31374 14.837 4.96724 14.6605 4.56184C14.4839 4.15644 14.4377 3.71035 14.5277 3.27998C14.6177 2.84961 14.8399 2.45429 15.1661 2.14401C15.4924 1.83373 15.9081 1.62243 16.3606 1.53682C16.8131 1.45122 17.2822 1.49515 17.7084 1.66308C18.1347 1.831 18.499 2.11536 18.7553 2.48021C19.0117 2.84506 19.1485 3.27401 19.1485 3.71282C19.1487 4.0044 19.0886 4.29317 18.9715 4.56264C18.8544 4.83212 18.6826 5.07702 18.466 5.28336C18.2494 5.48971 17.9921 5.65345 17.709 5.76525C17.4258 5.87705 17.1223 5.93471 16.8157 5.93494V5.93143ZM19.1485 28.2824C19.1485 28.7212 19.0117 29.1501 18.7553 29.515C18.499 29.8798 18.1347 30.1642 17.7084 30.3321C17.2822 30.5 16.8131 30.544 16.3606 30.4584C15.9081 30.3727 15.4924 30.1615 15.1661 29.8512C14.8399 29.5409 14.6177 29.1456 14.5277 28.7152C14.4377 28.2848 14.4839 27.8387 14.6605 27.4333C14.837 27.0279 15.136 26.6814 15.5197 26.4377C15.9033 26.1939 16.3543 26.0637 16.8157 26.0637C17.4342 26.0642 18.0273 26.2981 18.4647 26.7141C18.9021 27.13 19.148 27.6941 19.1485 28.2824V28.2824ZM3.9079 30.4992C3.44643 30.4992 2.99534 30.3691 2.61167 30.1252C2.22801 29.8813 1.929 29.5347 1.75249 29.1292C1.57598 28.7237 1.52989 28.2776 1.62005 27.8471C1.71021 27.4167 1.93258 27.0214 2.25901 26.7112C2.58544 26.401 3.00127 26.1898 3.45391 26.1044C3.90655 26.019 4.37566 26.0632 4.80189 26.2314C5.22813 26.3996 5.59233 26.6842 5.84844 27.0493C6.10455 27.4144 6.24106 27.8435 6.24069 28.2824C6.2402 28.8705 5.99421 29.4343 5.55678 29.85C5.11935 30.2657 4.52627 30.4992 3.9079 30.4992V30.4992ZM10.149 18.1759C9.6875 18.1759 9.23641 18.0457 8.85274 17.8019C8.46908 17.558 8.17007 17.2114 7.99356 16.8059C7.81705 16.4004 7.77096 15.9542 7.86112 15.5238C7.95128 15.0934 8.17365 14.6981 8.50008 14.3879C8.82651 14.0777 9.24234 13.8665 9.69498 13.7811C10.1476 13.6957 10.6167 13.7399 11.043 13.908C11.4692 14.0762 11.8334 14.3609 12.0895 14.726C12.3456 15.091 12.4821 15.5202 12.4818 15.959C12.4813 16.5472 12.2353 17.111 11.7979 17.5267C11.3604 17.9424 10.7673 18.1759 10.149 18.1759V18.1759ZM23.0475 18.1759C22.5861 18.1759 22.135 18.0457 21.7513 17.8019C21.3677 17.558 21.0687 17.2114 20.8921 16.8059C20.7156 16.4004 20.6695 15.9542 20.7597 15.5238C20.8499 15.0934 21.0722 14.6981 21.3987 14.3879C21.7251 14.0777 22.1409 13.8665 22.5936 13.7811C23.0462 13.6957 23.5153 13.7399 23.9415 13.908C24.3678 14.0762 24.732 14.3609 24.9881 14.726C25.2442 15.091 25.3807 15.5202 25.3803 15.959C25.3799 16.5456 25.1351 17.1082 24.6997 17.5236C24.2643 17.9391 23.6735 18.1736 23.0568 18.1759H23.0475Z"
        fill="#FF2424"
      />
      <path
        d="M81.25 25V8H87.5C88.6333 8 89.6 8.4 90.4 9.2C91.2 10 91.6 10.9667 91.6 12.1C91.6 12.8833 91.4 13.6 91 14.25C90.6 14.8833 90.0667 15.375 89.4 15.725C90.3 16.075 91.0167 16.6167 91.55 17.35C92.0833 18.0833 92.35 18.9417 92.35 19.925C92.35 21.3417 91.8583 22.5417 90.875 23.525C89.8917 24.5083 88.6917 25 87.275 25H81.25ZM87.225 16.65H83.25V23.2H87.225C88.1083 23.2 88.8667 22.875 89.5 22.225C90.1333 21.575 90.45 20.8083 90.45 19.925C90.45 19.025 90.1333 18.2583 89.5 17.625C88.8667 16.975 88.1083 16.65 87.225 16.65ZM87.125 9.8H83.25V14.85H87.125C87.8417 14.85 88.45 14.6083 88.95 14.125C89.45 13.6417 89.7 13.0417 89.7 12.325C89.7 11.6083 89.45 11.0083 88.95 10.525C88.45 10.0417 87.8417 9.8 87.125 9.8ZM96.1363 22.925C94.953 21.275 94.3613 19.1333 94.3613 16.5C94.3613 13.8667 94.953 11.725 96.1363 10.075C97.3363 8.425 99.128 7.6 101.511 7.6C103.128 7.6 104.486 8.00833 105.586 8.825C106.703 9.64167 107.503 10.7 107.986 12C108.47 13.3 108.711 14.8 108.711 16.5C108.711 18.2 108.47 19.7 107.986 21C107.503 22.3 106.703 23.3583 105.586 24.175C104.486 24.9917 103.128 25.4 101.511 25.4C99.128 25.4 97.3363 24.575 96.1363 22.925ZM97.6363 11.4C96.7863 12.7 96.3613 14.4 96.3613 16.5C96.3613 18.6 96.7863 20.3083 97.6363 21.625C98.503 22.925 99.7947 23.575 101.511 23.575C103.245 23.575 104.545 22.9167 105.411 21.6C106.278 20.2833 106.711 18.5833 106.711 16.5C106.711 14.4167 106.278 12.7167 105.411 11.4C104.545 10.0833 103.245 9.425 101.511 9.425C99.7947 9.425 98.503 10.0833 97.6363 11.4ZM111.857 21.6C112.357 22.15 113.007 22.6083 113.807 22.975C114.624 23.3417 115.507 23.525 116.457 23.525C117.424 23.525 118.249 23.275 118.932 22.775C119.632 22.275 119.982 21.575 119.982 20.675C119.982 19.7583 119.682 19.0417 119.082 18.525C118.499 18.0083 117.782 17.6167 116.932 17.35C116.099 17.0833 115.257 16.8 114.407 16.5C113.574 16.2 112.857 15.7083 112.257 15.025C111.674 14.325 111.382 13.4083 111.382 12.275C111.382 10.725 111.882 9.55833 112.882 8.775C113.899 7.99167 115.09 7.6 116.457 7.6C118.34 7.6 119.899 7.99167 121.132 8.775L120.132 10.375C119.182 9.775 117.949 9.475 116.432 9.475C115.632 9.475 114.924 9.7 114.307 10.15C113.69 10.6 113.382 11.2667 113.382 12.15C113.382 13.2667 113.957 14.0833 115.107 14.6C115.607 14.8333 116.157 15.0417 116.757 15.225C117.374 15.4083 117.982 15.625 118.582 15.875C119.199 16.125 119.757 16.425 120.257 16.775C121.407 17.5583 121.982 18.7833 121.982 20.45C121.982 22.1 121.449 23.3417 120.382 24.175C119.332 24.9917 117.999 25.4 116.382 25.4C114.232 25.4 112.34 24.6333 110.707 23.1L111.857 21.6Z"
        fill="#FF2424"
      />
    </g>
    <defs>
      <clipPath id="clip0_416_14">
        <rect width="128" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const accountId = props.accountId || context.accountId;

const Navbar = ({ routes }) => {
  const [profile, setProfile] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    asyncFetch(`https://api.mintbase.xyz/accounts/${accountId}`, {
      method: "GET",
      headers: {
        "mb-api-key": "omni-site",
        "Content-Type": "application/json",
        "x-hasura-role": "anonymous",
      },
    }).then((data) => {
      if (data.body) {
        const parseData = data.body;
        setProfile(parseData);
      }
    });
  }, []);

  const currentRoute = props.currentRoute;
  const routeKeys = Object.keys(routes);

  function findDefaultRoute(routesObject) {
    const routeKey =
      routesObject &&
      Object.keys(routesObject).find((key) => {
        const route = routesObject[key];
        return route.default === true;
      });

    if (routeKey) {
      return routeKey;
    } else {
      return null;
    }
  }

  const tab = props.tab ?? findDefaultRoute(routes);

  const filteredRoutes = useMemo(() => {
    if (!routes) return {};
    return Object.fromEntries(
      Object.entries(routes).filter(([_, value]) => !value.hidden)
    );
  }, [routes]);

  return (
    <MbNavbar
      style={{
        background: isDarkModeOn ? "#070C2B" : "#fff",
      }}
      className={isDarkModeOn ? "dark" : "light"}
    >
      <div
        className="navbar"
        style={{
          backgroundColor: isDarkModeOn ? "rgba(0, 0, 0, 0.2)" : "#fff",
          width: "100%",
        }}
      >
        <div className="innerNav">
          <div className="rightNav">
            <div className="rhs">
              <Link
                to={
                  !props.isGateway
                    ? href({
                        widgetSrc:
                          "${config_account}/widget/Mintbase.App.Index",
                        params: {
                          page: "home",
                        },
                      })
                    : "/"
                }
              >
                {mintBosLogo}
              </Link>
              <div className="search">
                <input
                  type="search"
                  placeholder="Search for Users"
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="searchInput"
                  style={{
                    color: isDarkModeOn ? "#71766c" : "",
                    backgroundColor: isDarkModeOn
                      ? "#101223"
                      : "rgba(243, 244, 248)",
                  }}
                />
                <Link
                  to={href({
                    widgetSrc: "${config_account}/widget/Mintbase.App.Index",
                    params: {
                      page: "search",
                      tab: searchValue,
                    },
                  })}
                >
                  {isDarkModeOn ? searchLightIcon : searchIcon}
                </Link>
              </div>
            </div>
            <MobileNavOptions
              style={{
                backgroundColor: isOpen ? "#212529" : "transparent",
                float: "right",
              }}
            >
              <SidebarMobile isOpen={isOpen} onClick={() => setIsOpen(false)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="burger"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  <path
                    d="M22 12H2"
                    stroke="white"
                    stroke-width="1.25"
                    stroke-linejoin="bevel"
                    style={{ stroke: isDarkModeOn ? "#fff" : "#000" }}
                  />
                  <path
                    d="M22 20H2"
                    stroke="white"
                    stroke-width="1.25"
                    stroke-linejoin="bevel"
                    style={{ stroke: isDarkModeOn ? "#fff" : "#000" }}
                  />
                  <path
                    d="M22 4H2"
                    stroke="white"
                    stroke-width="1.25"
                    stroke-linejoin="bevel"
                    style={{ stroke: isDarkModeOn ? "#fff" : "#000" }}
                  />
                </svg>

                <div
                  class="offcanvas offcanvas-start"
                  tabindex="-1"
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                  style={{
                    background: isDarkModeOn ? "#06111c" : "#fff",
                    scrollbarWidth: "none",
                  }}
                >
                  <div class="offcanvas-header">
                    <h5
                      class="offcanvas-title"
                      id="offcanvasExampleLabel"
                      style={{
                        color: "white",
                      }}
                    >
                      Menu
                    </h5>
                    <button
                      type="button"
                      class="btn-close btn-close-black text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="offcanvas-body">
                    <div className="mobile-tabs">
                      {filteredRoutes &&
                        Object.entries(filteredRoutes)?.map(
                          ([key, value]) =>
                            !value.hidden && (
                              <MbDropdownHoverMenu
                                key={`nav-${key}`}
                                dropdownButton={
                                  <MbArrowMenu
                                    mode={isDarkModeOn}
                                    isActive={true}
                                    title={value.init.name}
                                  />
                                }
                                mode={isDarkModeOn}
                                customStyle={dropdownStyle}
                              >
                                <Dropdown
                                  style={{
                                    background: isDarkModeOn ? "#1e2030" : "",
                                  }}
                                >
                                  <div className="left">
                                    {Array.isArray(value?.init?.left) && (
                                      <ul>
                                        {value.init.left.map((item, index) => (
                                          <li
                                            key={`left-${index}`}
                                            style={{
                                              color: isDarkModeOn ? "#fff" : "",
                                            }}
                                          >
                                            {item.tab ? (
                                              <NavLink
                                                to={key}
                                                param={item.tab}
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                              >
                                                {item.name}
                                              </NavLink>
                                            ) : (
                                              <a
                                                target="_blank"
                                                href={item.link}
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                              >
                                                {item.name}
                                              </a>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                  {Array.isArray(value?.init?.right) ? (
                                    <div className="rightButtons">
                                      {value?.init?.right.map(
                                        (element, index) => (
                                          <div
                                            className="rightButtons"
                                            key={index}
                                          >
                                            {element.route ? (
                                              <RouteButton
                                                target="_blank"
                                                href={element.route}
                                              >
                                                <img
                                                  alt=""
                                                  src={`https://ipfs.near.social/ipfs/${element.ipfsHash}`}
                                                />
                                                <h1>{element.label}</h1>
                                              </RouteButton>
                                            ) : (
                                              <NavLink
                                                to={key}
                                                param={element.tab}
                                              >
                                                <RouteButton
                                                  target="_blank"
                                                  href={element.route}
                                                >
                                                  <img
                                                    alt=""
                                                    src={`https://ipfs.near.social/ipfs/${element.ipfsHash}`}
                                                  />
                                                  <h1>{element.label}</h1>
                                                </RouteButton>
                                              </NavLink>
                                            )}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  ) : (
                                    <div className="rightObjects">
                                      {value?.init?.right &&
                                        Object?.values(value?.init?.right).map(
                                          (group, index) => (
                                            <ul key={index}>
                                              {group.map((item) => (
                                                <li key={item.tab}>
                                                  <NavLink
                                                    to={key}
                                                    param={item.tab}
                                                  >
                                                    {item.name}
                                                  </NavLink>
                                                </li>
                                              ))}
                                            </ul>
                                          )
                                        )}
                                    </div>
                                  )}
                                </Dropdown>
                              </MbDropdownHoverMenu>
                            )
                        )}
                      {urlChecks && (
                        <div className="user-section">
                          {!props.signedIn &&
                          !props.gatewayURL.includes(
                            "http://127.0.0.1:8080"
                          ) ? (
                            <div>
                              <Widget
                                src={`${config_account}/widget/Mintbase.MbButton`}
                                props={{
                                  label: "Connect Wallet",
                                  btnType: "primary",
                                  size: "medium",
                                  state: "active",
                                  onClick: () => props.requestSignIn(),
                                  isDarkModeOn,
                                }}
                              />
                            </div>
                          ) : (
                            <div className="user-section">
                              <Widget
                                src={`${config_account}/widget/Mintbase.App.Navbar.UserDropdown`}
                                props={{
                                  isDarkModeOn,
                                  profile,
                                  accountId,
                                  urlChecks,
                                  ...props,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SidebarMobile>
            </MobileNavOptions>
          </div>

          <div className="tabs">
            {filteredRoutes &&
              Object.entries(filteredRoutes)?.map(
                ([key, value]) =>
                  !value.hidden && (
                    <MbDropdownHoverMenu
                      key={`nav-${key}`}
                      dropdownButton={
                        <MbArrowMenu
                          mode={isDarkModeOn}
                          isActive={true}
                          title={value.init.name}
                        />
                      }
                      mode={isDarkModeOn}
                      customStyle={dropdownStyle}
                    >
                      <Dropdown
                        style={{ background: isDarkModeOn ? "#1e2030" : "" }}
                      >
                        <div className="left">
                          {Array.isArray(value?.init?.left) && (
                            <ul>
                              {value.init.left.map((item, index) => (
                                <li
                                  key={`left-${index}`}
                                  style={{
                                    color: isDarkModeOn ? "#fff" : "",
                                  }}
                                >
                                  {item.tab ? (
                                    <NavLink
                                      to={key}
                                      param={item.tab}
                                      style={{
                                        textDecoration: "none",
                                      }}
                                    >
                                      {item.name}
                                    </NavLink>
                                  ) : (
                                    <a
                                      target="_blank"
                                      href={item.link}
                                      style={{
                                        textDecoration: "none",
                                      }}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {Array.isArray(value?.init?.right) ? (
                          <div className="rightButtons">
                            {value?.init?.right.map((element, index) => (
                              <div className="rightButtons" key={index}>
                                {element.route ? (
                                  <RouteButton
                                    target="_blank"
                                    href={element.route}
                                  >
                                    <img
                                      alt=""
                                      src={`https://ipfs.near.social/ipfs/${element.ipfsHash}`}
                                    />
                                    <h1>{element.label}</h1>
                                  </RouteButton>
                                ) : (
                                  <NavLink to={key} param={element.tab}>
                                    <RouteButton
                                      target="_blank"
                                      href={element.route}
                                    >
                                      <img
                                        alt=""
                                        src={`https://ipfs.near.social/ipfs/${element.ipfsHash}`}
                                      />
                                      <h1>{element.label}</h1>
                                    </RouteButton>
                                  </NavLink>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rightObjects">
                            {value?.init?.right &&
                              Object?.values(value?.init?.right).map(
                                (group, index) => (
                                  <ul key={index}>
                                    {group.map((item) => (
                                      <li key={item.tab}>
                                        <NavLink to={key} param={item.tab}>
                                          {item.name}
                                        </NavLink>
                                      </li>
                                    ))}
                                  </ul>
                                )
                              )}
                          </div>
                        )}
                      </Dropdown>
                    </MbDropdownHoverMenu>
                  )
              )}
          </div>
        </div>
        {urlChecks && (
          <div className="user-section">
            {!props.signedIn &&
            !props.gatewayURL.includes("http://127.0.0.1:8080") ? (
              <div>
                <Widget
                  src={`${config_account}/widget/Mintbase.MbButton`}
                  props={{
                    label: "Connect Wallet",
                    btnType: "primary",
                    size: "medium",
                    state: "active",
                    onClick: () => props.requestSignIn(),
                    isDarkModeOn,
                  }}
                />
              </div>
            ) : (
              <Widget
                src={`${config_account}/widget/Mintbase.App.Navbar.UserDropdown`}
                props={{
                  isDarkModeOn,
                  profile,
                  accountId,
                  urlChecks,
                  ...props,
                }}
              />
            )}
          </div>
        )}
      </div>
    </MbNavbar>
  );
};

return <Navbar page={"explore"} routes={props.routes} {...props} />;
