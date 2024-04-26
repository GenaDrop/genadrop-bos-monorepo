const MbRoutes = {
  // Manage: {
  //   left: [
  //     { name: "My Contracts", link: "Contracts?account=", external: true },
  //     { name: "My NFTs", link: "NFTs?account=" },
  //     { name: "Stripe Connect", link: "Stripe Connect" },
  //     { name: "Orders", link: "Orders" },
  //     { name: "Trading History", link: "Trading History" },
  //   ],
  //   right: [
  //     {
  //       label: "Deploy Contracts",
  //       ipfsHash: "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
  //       route: "DeployContracts",
  //     },
  //     {
  //       label: "Creator Docs",
  //       ipfsHash: "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
  //       route: "CreatorDocs",
  //     },
  //   ],
  // },
  // Developers: {
  //   left: [
  //     { name: "Indexer", link: "Indexer" },
  //     { name: "Templates", link: "Templates" },
  //     { name: "Affiliate Direct", link: "AffiliateDirect" },
  //     { name: "Mintbase Grants", link: "MintbaseGrants" },
  //     { name: "Developer API", link: "DeveloperAPI" },
  //   ],
  //   right: [
  //     {
  //       label: "Deploy Marketplace",
  //       ipfsHash: "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
  //       route: "DeployMarketplace",
  //     },
  //     {
  //       label: "Developer Docs",
  //       ipfsHash: "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
  //       route: "DeveloperDocs",
  //     },
  //   ],
  // },
  // Explorer: {
  //   left: [
  //     { name: "Activity", link: "Activity" },
  //     { name: "Analytics", link: "Analytics" },
  //     { name: "Top Affiliate", link: "Top Affiliate" },
  //   ],
  //   right: [],
  // },
  // Solutions: {
  //   left: [
  //     { name: "Enterprise", link: "Enterprise" },
  //     { name: "Use Case", link: "Use Case" },
  //     { name: "Affiliate Direct", link: "AffiliateDirect" },
  //     { name: "Mintbase Grants", link: "MintbaseGrants" },
  //   ],
  //   right: [
  //     {
  //       label: "Mintbase AI",
  //       ipfsHash: "bafkreibgozfbcdnxhe3wccv7yutaczu2ejztg6wrya33v3xb5ner3gjqiq",
  //       route: "MintbaseAI",
  //     },
  //     {
  //       label: "Mintbase Wallet",
  //       ipfsHash: "bafkreieqy53dcgrrfkflyk6btb4p7uk3q3mkqyqrn7xgayhx7iylakbazq",
  //       route: "MintbaseWallet",
  //     },
  //   ],
  // },
};
const MbFooterRoutes = {
  Developers: {
    routes: [
      {
        text: "Docs",
        size: "small",
        copyText: "https://docs.mintbase.xyz/",
        link: "https://docs.mintbase.xyz/",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "MintbaseJS",
        size: "small",
        copyText: "https://docs.mintbase.xyz/dev/mintbase-sdk-ref",
        link: "https://docs.mintbase.xyz/dev/mintbase-sdk-ref",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Templates",
        size: "small",
        copyText: "https://templates.mintbase.xyz/",
        link: "https://templates.mintbase.xyz/",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Grants",
        size: "small",
        copyText: "https://github.com/mintbase/Grants-Program",
        link: "https://github.com/mintbase/Grants-Program",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Indexer Status",
        size: "small",
        copyText: "https://www.mintbase.xyz/health",
        link: "https://www.mintbase.xyz/health",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Audits",
        size: "small",
        copyText:
          "https://arweave.net/WvB-T_sg6HbpG08NLutna0bw65hq4tkZZoUJzw4iRK4",
        link: "https://arweave.net/WvB-T_sg6HbpG08NLutna0bw65hq4tkZZoUJzw4iRK4",
        iconTab: false,
        iconCopy: false,
      },
    ],
  },
  Creators: {
    routes: [
      {
        text: "Mintbase AI",
        size: "small",
        copyText: "https://ai.mintbase.xyz/",
        link: "https://ai.mintbase.xyz/",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Mintbase Wallet",
        size: "small",
        copyText: "https://docs.mintbase.xyz/",
        link: "https://docs.mintbase.xyz/",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Deploy a Contract",
        size: "small",
        copyText:
          "https://docs.mintbase.xyz/creator/creating-nfts/deploy-contract",
        link: "https://docs.mintbase.xyz/creator/creating-nfts/deploy-contract",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Minting NFTs",
        size: "small",
        copyText:
          "https://docs.mintbase.xyz/creator/creating-nfts/minting-nfts",
        link: "https://docs.mintbase.xyz/creator/creating-nfts/minting-nfts",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Selling NFTs",
        size: "small",
        copyText: "https://docs.mintbase.xyz/market/how-to-list",
        link: "https://docs.mintbase.xyz/market/how-to-list",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Buying NFTs",
        size: "small",
        copyText: "https://docs.mintbase.xyz/market/buying-as-simple-sale",
        link: "https://docs.mintbase.xyz/market/buying-as-simple-sale",
        iconTab: false,
        iconCopy: false,
      },
    ],
  },
  Support: {
    routes: [
      {
        text: "Guides",
        size: "small",
        copyText: "https://docs.mintbase.xyz/",
        link: "https://docs.mintbase.xyz/",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Telegram",
        size: "small",
        copyText: "https://mintbase.xyz/telegram",
        link: "https://mintbase.xyz/telegram",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Telegram DEV",
        size: "small",
        copyText: "https://t.me/mintdev",
        link: "https://t.me/mintdev",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Discord",
        size: "small",
        copyText: "https://mintbase.xyz/discord",
        link: "https://mintbase.xyz/discord",
        iconTab: false,
        iconCopy: false,
      },
    ],
  },
  Company: {
    routes: [
      {
        text: "Careers",
        size: "small",
        copyText: "https://angel.co/company/mintbase/jobs",
        link: "https://angel.co/company/mintbase/jobs",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Blog",
        size: "small",
        copyText: "https://blog.mintbase.xyz/",
        link: "https://blog.mintbase.xyz/",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Term & Privacy",
        size: "small",
        copyText:
          "https://docs.mintbase.xyz/privacy-policy-and-terms-of-service",
        link: "https://docs.mintbase.xyz/privacy-policy-and-terms-of-service",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Press Kit",
        size: "small",
        copyText: "https://mintbase.xyz/brand/mintbase_press_kit.zip",
        link: "https://mintbase.xyz/brand/mintbase_press_kit.zip",
        iconTab: false,
        iconCopy: false,
      },
      {
        text: "Affiliates",
        size: "small",
        copyText: "https://www.mintbase.xyz/stats/ranks",
        link: "https://www.mintbase.xyz/stats/ranks",
        iconTab: false,
        iconCopy: false,
      },
    ],
  },
};
return {
  MbRoutes,
  MbFooterRoutes,
};
