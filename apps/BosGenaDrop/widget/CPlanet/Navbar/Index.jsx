const showNavbar = props.showNavbar ?? true;
State.init({
  isOpen: false,
});

const NavContainer = styled.div`
  background: ${() =>
    props.isHome && !state.isOpen ? "transparent" : "white"};
  height: 100px;
  padding: 20px 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin-bottom: 30px;
  * {
    font-family: Helvetica Neue;
  }
  @media screen and (max-width: 769px) {
    margin-bottom: 0px;
    border-bottom: 1px solid ${!state.isOpen ? "transparent" : "#B0B0B0"};
  }
  .desk {
    @media screen and (max-width: 769px) {
      display: none;
    }
  }
`;

const Logo = styled.a`
  display: flex;
  color: ${() => (props.isHome && !state.isOpen ? "white" : "#000")};
  h2 {
    color: ${() => (props.isHome && !state.isOpen ? "white" : "#000")};
    font-family: Helvetica Neue;
    font-size: 32px;
    font-style: italic;
    font-weight: 300;
    line-height: normal;
  }
  h1 {
    color: ${() => (props.isHome && !state.isOpen ? "white" : "#000")};
    font-family: Helvetica Neue;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
const Routes = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 10px;
  a {
    color: ${() => (props.isHome ? "white" : "#000")};
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Join = styled.div`
  display: flex;
  .button:first-child {
    background: transparent;
    border: none;
    color: ${() => (props.isHome ? "white" : "#000")};
  }
  .button:last-child {
    display: flex;
    width: 155px;
    height: 40px;
    padding: 8px 15px 8px 14px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    background: ${() => (props.isHome ? "white" : "#000")};
    border: 1px solid ${() => (props.isHome ? "white" : "#000")};
    color: ${() => (props.isHome ? "black" : "white")};
  }
  .button:last-child:hover {
    background: ${() => (props.isHome ? "#000" : "white")};
    color: ${() => (props.isHome ? "white" : "black")};
  }
  div {
    background: ${() => (props.isHome ? "white" : "#000")};
    border: 1px solid ${() => (props.isHome ? "white" : "#000")};
    margin: 0 10px 0 0;
  }
`;
const MobileJoin = styled.div`
  display: flex;
  margin-bottom: 30px;
  .button:first-child {
    background: transparent;
    border: none;
    color: #000;
  }
  .button:last-child {
    display: flex;
    width: 155px;
    height: 40px;
    padding: 8px 15px 8px 14px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    background: #000;
    border: 1px solid #000;
    color: white;
  }
  .button:last-child:hover {
    background: white;
    color: black;
  }
  div {
    background: #000;
    border: 1px solid #000;
    margin: 0 10px 0 0;
  }
`;

const MobileMyAcc = styled.p`
  margin: 0;
  margin-left: 8px;
  color: black;
  background: white;
  border: 1px solid black;
  padding: 5px;
  border-radius: 10px;
`;
const MyAcc = styled.p`
  margin: 0;
  margin-left: 8px;
  color: ${() => (props.isHome ? "white" : "black")};
  background: ${() => (props.isHome ? "black" : "white")};
  border: 1px solid ${() => (props.isHome ? "white" : "black")};
  padding: 5px;
  border-radius: 10px;
`;

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

const MobileNavOptions = styled.div`
  display: none;
  background-color: ${state.isOpen ? "#fff" : "transparent"};

  * {
    font-family: Helvetica Neue;
  }
  @media screen and (max-width: 769px) {
    display: flex;
  }
`;

const MobileRoutes = styled.div`
  display: none;
  background-color: #fff;
  height: 100vh;
  justify-conent: flex-start;
  width: 100%;
  * {
    font-family: Helvetica Neue;
  }
  @media screen and (max-width: 769px) {
    display: ${() => {
      return state.isOpen ? "flex" : "none";
    }};
  }
  flex-flow: column nowrap;
  align-items: center;
  gap: 1rem;
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #b0b0b0;
    color: #b0b0b0;
    leading-trim: both;
    text-edge: cap;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    svg path {
      stroke: #b0b0b0;
    }
    :hover {
      color: #000;
      font-weight: 600;
      background-color: #b0b0b0;
      svg path {
        stroke: #000;
        stroke-width: 2;
      }
    }
  }
  .mroutes {
    display: inherit;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const MenuToggle = styled.div`
  padding: 5px;
  cursor: pointer;
  .burger path {
    stroke: ${props.isHome ? "#fff" : "#000"};
  }
`;

const menuToggleHandler = () => {
  State.update({
    isOpen: !state.isOpen,
  });
};

const tabToggleHanler = (tabStr) => {
  props.update({ tab: tabStr });
  State.update({ isOpen: !state.isOpen });
};

return (
  <>
    {!props.isGateway && (
      <>
        <NavContainer>
          {showNavbar && (
            <>
              <Logo
                href="#/bos.genadrop.near/widget/CPlanet.Index?tab=home"
                onClick={() => tabToggleHanler("home")}
              >
                <h2>C</h2>
                <h1>PLANET</h1>
              </Logo>
              <Routes className="desk">
                <a
                  href={`#/bos.genadrop.near/widget/CPlanet.Index?tab=explore`}
                  onClick={() => tabToggleHanler("explore")}
                >
                  NFTs
                </a>
                <a
                  href={`#/bos.genadrop.near/widget/CPlanet.Index?tab=community`}
                  onClick={() => tabToggleHanler("community")}
                >
                  Communities
                </a>
                <a
                  target="_blank"
                  href={`https://gov.near.org/t/docs-the-creatives-constellation-charter/32878`}
                >
                  Funding
                </a>
                <a
                  href={`#/bos.genadrop.near/widget/CPlanet.Index?tab=feed`}
                  onClick={() => tabToggleHanler("feed")}
                >
                  Feeds
                </a>
                <a
                  href={`#/bos.genadrop.near/widget/CPlanet.DropsFund.Explore.Index?tab=dropFunds`}
                  onClick={() => tabToggleHanler("dropFunds")}
                >
                  Drop Funds
                </a>
              </Routes>
              <MobileNavOptions>
                <MenuToggle onClick={() => menuToggleHandler()}>
                  {!state.isOpen ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="burger"
                    >
                      <path
                        d="M22 12H2"
                        stroke="white"
                        stroke-width="1.25"
                        stroke-linejoin="bevel"
                      />
                      <path
                        d="M22 20H2"
                        stroke="white"
                        stroke-width="1.25"
                        stroke-linejoin="bevel"
                      />
                      <path
                        d="M22 4H2"
                        stroke="white"
                        stroke-width="1.25"
                        stroke-linejoin="bevel"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L9 9M17 17L9 9M9 9L17 1M9 9L1 17"
                        stroke="black"
                        stroke-width="1.25"
                        stroke-linejoin="bevel"
                      />
                    </svg>
                  )}
                </MenuToggle>
              </MobileNavOptions>
            </>
          )}
          <Join className="desk">
            {state.sender ? (
              <MyAcc>{state.sender ? getSender() : "0x00..."}</MyAcc>
            ) : (
              <Web3Connect connectLabel="Connect Wallet" className="button" />
            )}
          </Join>
        </NavContainer>
        <MobileRoutes>
          <div className="mroutes">
            <a
              href={`#/bos.genadrop.near/widget/CPlanet.Index?tab=explore`}
              onClick={() => props.update({ tab: "explore" })}
            >
              NFTs
            </a>
            <a
              href={`#/bos.genadrop.near/widget/CPlanet.Index?tab=community`}
              onClick={() => props.update({ tab: "community" })}
            >
              Communities
            </a>
            <a
              target="_blank"
              href={`https://gov.near.org/t/docs-the-creatives-constellation-charter/32878`}
            >
              Funding
              <svg
                width="18"
                height="11"
                viewBox="0 0 18 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 10L9 2L1 10"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </a>
            <a
              href={`#/bos.genadrop.near/widget/CPlanet.Index?tab=feed`}
              onClick={() => props.update({ tab: "feed" })}
            >
              Feeds
            </a>
            <a
              href={`#/bos.genadrop.near/widget/CPlanet.DropsFund.Explore.Index?tab=dropFunds`}
              onClick={() => tabToggleHanler("dropFunds")}
            >
              Drop Funds
            </a>
          </div>
          <MobileJoin onClick={() => State.update({ isOpen: false })}>
            {state.sender ? (
              <MobileMyAcc>
                {state.sender ? getSender() : "0x00..."}
              </MobileMyAcc>
            ) : (
              <Web3Connect connectLabel="Connect Wallet" className="button" />
            )}
          </MobileJoin>
        </MobileRoutes>
      </>
    )}
  </>
);
