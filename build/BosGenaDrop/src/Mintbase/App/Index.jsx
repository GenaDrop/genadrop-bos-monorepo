const currentMode = Storage.get("mode");

const [mode, setMode] = useState(currentMode || "light");

const App = styled.div``;

const Root = styled.div`
  // you can override classnames here
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
      manage: {
        blockHeight: "final",
        init: {
          name: "Manage",
          left: [
            {
              name: "My Contracts",
              tab: "Contracts?account=",
              external: true,
            },
            { name: "My NFTs", tab: "NFTs?account=" },
            { name: "Stripe Connect", tab: "Stripe Connect" },
            { name: "Orders", tab: "Orders" },
            { name: "Trading History", tab: "Trading History" },
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
        path: "bos.genadrop.near/widget/Mintbase.App.Activity.index",
        blockHeight: "final",
        init: {
          name: "Explorer",
          left: [
            { name: "Activity", tab: "Activity" },
            { name: "Analytics", tab: "Analytics" },
            { name: "Top Affiliate", tab: "TopAffiliates" },
          ],
        },
      },
      solutions: {
        path: "bos.genadrop.near/widget/Mintbase.App.Solutions.Index",
        blockHeight: "final",
        init: {
          name: "Solutions",
          left: [
            { name: "Enterprise", tab: "Enterprise" },
            { name: "Use Case", tab: "UseCases" },
            { name: "Affiliate Direct", tab: "TopAffiliates" },
            { name: "Mintbase Grants", tab: "MintbaseGrants" },
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
  </App>
);
