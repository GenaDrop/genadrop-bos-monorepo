const cssFont = fetch("https://fonts.cdnfonts.com/css/pt-root-ui").body;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(225, 215, 213);
  width: 100%;
  font-family: ${cssFont}, sans-serif;
  .logo {
    display: flex;
    margin-right: 1rem;
    width: 80px;
    height: 80px;
  }
  .connect {
    margin-left: 0.3rem;
    transition: all 0.125s ease-in-out;
    transition: all 0.2s ease-in-out;
    border: 1px solid var(--brand-warm-border);
    border-radius: 10px;
    background-color: var(--brand-warm-accent);
    padding: 0.3rem 1.05rem;
    height: 40px;
    color: var(--brand-black) !important;
    color: var(--brand-warm-dark-text);
    font-weight: 700;
    font-size: 0.9rem;
    font-family: ${cssFont}, sans-serif;
    :hover {
      filter: brightness(110%);
      background-color: var(--brand-color-red);
      color: white;
    }
  }
`;

const NavElm = styled.a`
  display: flex;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  cursor: pointer;
  padding: 0.3rem;
  height: fit-content;
  color: #000;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  .wrapper {
    display: flex;
    align-items: center;
    transition: all 0.125s ease-in-out;
    border: 1px solid var(--brand-warm-border);
    border-radius: 10px;
    padding: 0 12px;
    height: 40px;
    color: var(--brand-warm-dark-text);
    font-weight: 700;
    :hover {
      background-color: var(--brand-warm-accent);
      color: black;
    }
    .treasury {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0 0.25rem;
    }
    div {
      white-space: nowrap;
    }
    svg {
      opacity: 0.5;
      margin-right: 0.4rem;
      height: 1rem;
    }
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  a:hover {
    text-decoration: none;
  }
`;

const menuStyle = `
  width: 140%;
  background-color: #fff;
`;

const dropdownStyle = `
  display: flex;
  align-items: center;
  transition: all 0.125s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  cursor: pointer;
  border: 1px solid var(--brand-warm-border);
  border-radius: 10px;
  padding: 0.3rem 1.05rem;
  height: 40px;
  color: var(--brand-warm-dark-text);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  &:hover {
    background-color: var(--brand-warm-accent);
    color: black;
    text-decoration: none;
  }
  .itemIcom {
      opacity: 0.5;
      margin-right: 0.4rem;
      height: 1rem;
    }
  `;

const daoProps = {
  title: (
    <div>
      <svg
        className="itemIcom"
        aria-hidden="true"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
      >
        <path
          fill="currentColor"
          d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
        ></path>
      </svg>
      DAO
    </div>
  ),
  style: dropdownStyle,
  menuStyle: menuStyle,
  options: [
    { label: "Proposals", url: "/" },
    { label: "Candidates", url: "/" },
    { label: "Fork", url: "/" },
  ],
};

const exploreProps = {
  title: (
    <div>
      <svg
        viewBox="0 0 24 24"
        style={{
          height: "2rem",
        }}
      >
        <path d="M19,9h-1h-1h-1h-1h-1v1v1h-1v-1V9h-1h-1h-1H9H8H7v1v1H6H5H4v1v1v1h1v-1v-1h1h1v1v1v1h1h1h1h1h1h1v-1v-1v-1h1v1v1v1h1h1h1h1 h1h1v-1v-1v-1v-1v-1V9H19z M9,14H8v-1v-1v-1v-1h1h1v1v1v1v1H9z M16,14h-1v-1v-1v-1v-1h1h1v1v1v1v1H16z"></path>
      </svg>
      Explore
    </div>
  ),
  style: dropdownStyle,
  menuStyle: menuStyle,
  options: [
    { label: "Nouns & Traits", url: "/" },
    { label: "Playground", url: "/" },
  ],
};

return (
  <Navbar>
    <a href="/">
      <img
        className="logo"
        src="https://nouns.wtf/static/media/noggles.7644bfd0.svg"
        alt="logo"
      />
    </a>
    <NavElm>
      <div className="wrapper">
        <div className="treasury">
          <div style={{ color: "var(--brand-warm-light-text)" }}>Treasury</div>
          <div>Ξ 8,498</div>
        </div>
      </div>
    </NavElm>
    <Menu>
      <Widget src="nouns.wtf.near/widget/dropdown" props={daoProps} />

      <NavElm>
        <div className="wrapper">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z"
            ></path>
          </svg>
          Docs
        </div>
      </NavElm>
      <NavElm>
        <div className="wrapper">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              fill="currentColor"
              d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"
            ></path>
          </svg>
          Discourse
        </div>
      </NavElm>
      <Widget src="nouns.wtf.near/widget/dropdown" props={exploreProps} />
      <Web3Connect className="connect" connectLabel="Connect" />
    </Menu>
  </Navbar>
);
