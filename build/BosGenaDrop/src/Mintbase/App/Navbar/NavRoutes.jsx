const MbRoutes = {
  Markets: {
    left: [
      { name: "Featured Contracts", link: "FeaturedContracts" },
      { name: "New Listings", link: "NewListings" },
    ],
    right: {
      one: [
        { name: "AI", link: "AI" },
        { name: "Gaming", link: "Gaming" },
        { name: "Philanthropy", link: "Philanthropy" },
      ],
      two: [
        { name: "Arts", link: "Arts" },
        { name: "Music", link: "Music" },
        { name: "Photography", link: "Photography" },
      ],
      three: [
        { name: "DAOs", link: "DAOs" },
        { name: "PFPs", link: "PFPs" },
        { name: "Utilities", link: "Utilities" },
      ],
    },
  },
  Manage: {
    left: [
      { name: "My Contracts", link: "Contracts?account=" },
      { name: "My NFTs", link: "NFTs?account=" },
      { name: "Stripe Connect", link: "Stripe Connect" },
      { name: "Orders", link: "Orders" },
      { name: "Trading History", link: "Trading History" },
    ],
    right: [
      {
        label: "Deploy Contracts",
        ipfsHash: "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
        route: "DeployContracts",
      },
      {
        label: "Creator Docs",
        ipfsHash: "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
        route: "CreatorDocs",
      },
    ],
  },
  Developers: {
    left: [
      { name: "Indexer", link: "Indexer" },
      { name: "Templates", link: "Templates" },
      { name: "Affiliate Direct", link: "AffiliateDirect" },
      { name: "Mintbase Grants", link: "MintbaseGrants" },
      { name: "Developer API", link: "DeveloperAPI" },
    ],
    right: [
      {
        label: "Deploy Marketplace",
        ipfsHash: "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
        route: "DeployMarketplace",
      },
      {
        label: "Developer Docs",
        ipfsHash: "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
        route: "DeveloperDocs",
      },
    ],
  },
  Explorer: {
    left: [
      { name: "Activity", link: "Activity" },
      { name: "Analytics", link: "Analytics" },
      { name: "Top Affiliate", link: "Top Affiliate" },
    ],
    right: [],
  },
  Developers: {
    left: [
      { name: "Indexer", link: "Indexer" },
      { name: "Templates", link: "Templates" },
      { name: "Affiliate Direct", link: "AffiliateDirect" },
      { name: "Mintbase Grants", link: "MintbaseGrants" },
      { name: "Developer API", link: "DeveloperAPI" },
    ],
    right: [
      {
        label: "Deploy Marketplace",
        ipfsHash: "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
        route: "DeployMarketplace",
      },
      {
        label: "Developer Docs",
        ipfsHash: "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
        route: "DeveloperDocs",
      },
    ],
  },
};

return {
  MbRoutes,
};
