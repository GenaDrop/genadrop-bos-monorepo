const currentMode = Storage.get("mode");

const [mode, setMode] = useState(currentMode || "light");

const App = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const Root = styled.div`
  // you can override classnames here
`;

const switchChangeHandler = () => {
  if (mode === "light") {
    setMode("dark");
    Storage.set("mode", "dark");
  } else {
    setMode("light");
    Storage.set("mode", "light");
  }
};

console.log({ mode: Storage.get("mode") });

const Toggle = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem;
  background-color: black;
  border-radius: 9999px;
  cursor: pointer;
  z-index: 100000;
  &:hover {
    background-color: #1f2937;
  }
  width: 2rem;
  height: 2rem;
  color: black;
`;

const config = {
  layout: {
    src: "bos.genadrop.near/widget/Mintbase.App.Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: (props) => (
      // customize your header
      <Widget
        src="bos.genadrop.near/widget/Mintbase.App.Navbar.Index"
        props={{
          routes: config.router.routes,
          isDarkModeOn: mode === "dark",
          isHome: props.isHome,
        }}
      />
    ),
    Footer: () => (
      <Widget
        src="bos.genadrop.near/widget/Mintbase.App.Footer.Index"
        props={{ mode, setMode }}
      />
    ),
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "bos.genadrop.near/widget/Mintbase.App.Home.Index",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
        display: false,
      },
      markets: {
        path: "bos.genadrop.near/widget/Mintbase.App.Explore.Index",
        blockHeight: "final",
        init: {
          name: "Markets",
          left: [
            { name: "Featured Contracts", tab: "Featured" },
            { name: "New Listings", tab: "newListing" },
          ],
          right: {
            one: [
              { name: "AI", tab: "AI" },
              { name: "Gaming", tab: "Gaming" },
              { name: "Philanthropy", tab: "Philanthropy" },
            ],
            two: [
              { name: "Arts", tab: "Art" },
              { name: "Music", tab: "Music" },
              { name: "Photography", tab: "Photography" },
            ],
            three: [
              { name: "DAOs", tab: "DAOs" },
              { name: "PFPs", tab: "PFPs" },
              { name: "Utilities", tab: "Utility" },
            ],
          },
        },
      },
      human: {
        path: "bos.genadrop.near/widget/Mintbase.App.Profile.Index",
        blockHeight: "final",
        init: {
          name: "Human",
          right: {
            one: [
              { name: "Owned", tab: "owned" },
              { name: "minted", tab: "minted" },
              { name: "About", tab: "about" },
            ],
            two: [
              { name: "Activity", tab: "activity" },
              { name: "Contracts", tab: "contracts" },
              { name: "User Settings", tab: "user-settings" },
            ],
          },
        },
        display: false,
        hidden: true,
      },
      manage: {
        path: "bos.genadrop.near/widget/Mintbase.App.LaunchPad.Index",
        blockHeight: "final",
        init: {
          name: "Manage",
          left: [
            {
              name: "My Contracts",
              tab: "my-contracts",
              external: true,
            },
            { name: "Earned", tab: "earned" },
            { name: "Stripe Connect", tab: "stripe-beta" },
            { name: "Offered To Me", tab: "offered-to-me" },
            { name: "My Offers", tab: "my-offers" },
          ],
          right: [
            {
              label: "Deploy Contracts",
              ipfsHash:
                "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
            },
            {
              label: "Creator Docs",
              ipfsHash:
                "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
              route: "https://docs.mintbase.xyz/creator/creating-nfts",
            },
          ],
        },
      },
      developers: {
        init: {
          name: "Developers",
          left: [
            { name: "Templates", link: "https://templates.mintbase.xyz/" },
            { name: "Github", link: "https://github.com/mintbase" },
            { name: "Indexer", tab: "developers" },

            { name: "Affiliate Direct", tab: "affiliate" },
            {
              name: "Mintbase Grants",
              link: "https://github.com/mintbase/Grants-Program",
            },
            { name: "Developer API", tab: "DeveloperAPI" },
          ],
          right: [
            {
              label: "Deploy Selfie Minter",
              ipfsHash:
                "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
              route:
                "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Fminsta",
            },
            {
              label: "Developer Docs",
              ipfsHash:
                "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
              route: "https://docs.mintbase.xyz/dev/getting-started",
            },
          ],
        },
      },
      explorer: {
        blockHeight: "final",
        init: {
          name: "Explorer",
          left: [
            { name: "Activity", tab: "Activity" },
            { name: "Analytics", tab: "Analytics" },
            { name: "Top Affiliate", tab: "Top Affiliate" },
          ],
        },
      },
      solutions: {
        blockHeight: "final",
        init: {
          name: "Solutions",
          left: [
            { name: "Enterprise", route: "Enterprise" },
            { name: "Use Case", route: "Use Case" },
            { name: "Affiliate Direct", route: "AffiliateDirect" },
            { name: "Mintbase Grants", route: "MintbaseGrants" },
          ],
          right: [
            {
              label: "Mintbase AI",
              ipfsHash:
                "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
              route: "https://ai.mintbase.xyz/",
            },
            {
              label: "Mintbase Wallet",
              ipfsHash:
                "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
              route: "https://wallet.mintbase.xyz/",
            },
          ],
        },
      },
    },
  },
};

return (
  <App>
    <Widget
      src="bos.genadrop.near/widget/Mintbase.App.View"
      props={{ config, ...props, isDarkModeOn: mode === "dark" }}
    />
    <Toggle onClick={switchChangeHandler} title="Toggle Theme" />
  </App>
);
