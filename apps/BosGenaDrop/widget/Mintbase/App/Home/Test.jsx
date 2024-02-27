const { theme } = props;
const [page, setPage] = useState(0);
const loggedIn = context.accountId ? props.loggedIn ?? false : false;
const accountId = loggedIn
  ? context.accountId ?? "baam25.near"
  : props.accountId ?? "baam25.near";
const viewingOwnAccount = accountId === context.accountId;
const showNFTs = props.showNFTs
  ? typeof props.showNFTs === "string"
    ? JSON.parse(props.showNFTs)
    : props.showNFTs
  : true;
const isLink = props.isLink
  ? typeof props.isLink === "string"
    ? JSON.parse(props.isLink)
    : props.isLink
  : true;
const showTags = props.showTags
  ? typeof props.showTags === "string"
    ? JSON.parse(props.showTags)
    : props.showTags
  : true;

const customExternalLinks = props.customExternalLinks || [
  "website",
  "github",
  "twitter",
  "telegram",
]; // ex: ["telegram"] only shows telegram

const AVAILABLE_THEMES = {
  default: "Default",
  dark: "Dark",
  gold: "Gold",
  blossom: "Blossom",
  vibrant: "Vibrant",
  aqua: "Aqua",
  neon: "Neon",
  vintage: "Vintage",
  eclectic: "Eclectic",
};
const themeName =
  theme in AVAILABLE_THEMES
    ? AVAILABLE_THEMES[theme]
    : AVAILABLE_THEMES["default"];

const Theme = VM.require(`mattb.near/widget/Linktree.Themes.${themeName}`);

const LinktreeSDK = VM.require("mattb.near/widget/Linktree.Utils.SDK");
if (!LinktreeSDK) return "Loading...";
// Load profile data
LinktreeSDK.load(accountId);

// Load NFTs
const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
  query v2_omnisite_GetOwnedTokens{
    tokens: mb_views_nft_owned_tokens(
      where: {
        owner: { _eq: "${accountId}" }
      }
    ) {
      tokenId: token_id
      contractId: nft_contract_id
      media
      metadata_id
    }}
`,
  }),
});
const nfts = data.body?.data?.tokens;
console.log(nfts);
const Gallery = styled.div`
  max-width: 1000px;
  display: flex;
  margin: 3rem auto;
  align-items: center;
  .arrow-r {
    rotate: 180deg;
  }
  .arrow-r,
  .arrow-l {
    width: 2rem;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid black;
  }
  .slider-display {
    position: relative;
    width: 49rem;
    height: 15rem;
    overflow: hidden;
    @media only screen and (max-width: 927px) {
      width: 32rem;
    }
    @media only screen and (max-width: 627px) {
      width: 15rem;
    }
  }
  .slider-track {
    transition: all 300ms ease;
    position: absolute;
    display: flex;
    gap: 2rem;
    justify-content: center;
    .nft-card {
      width: 15rem;
      height: 15rem;
      border-radius: 10px;
      overflow: hidden;
      img {
        transition: all 300ms ease-in-out;
      }
      :hover img {
        scale: 1.1;
      }
    }
  }
`;
const size = "100%";

const HandleUpSlide = () => {
  if (page < nfts.length - 1) {
    setPage(page + 1);
  } else {
    setPage(0);
  }
};
const HandleDownSlide = () => {
  if (page > 0) {
    setPage(page - 1);
  } else {
    setPage(nfts.length - 1);
  }
};

const externalLinks = {
  website: {
    icon: <i className="bi bi-globe"></i>,
    label: "Website",
    url: `https://${LinktreeSDK.account.data.linktree.website}`,
  },
  twitter: {
    icon: <i className="bi bi-twitter"></i>,
    label: "Twitter",
    url: `https://twitter.com/${LinktreeSDK.account.data.linktree.twitter}`,
  },
  telegram: {
    icon: <i className="bi bi-telegram"></i>,
    label: "Telegram",
    url: `https://t.me/${LinktreeSDK.account.data.linktree.telegram}`,
  },
  github: {
    icon: <i className="bi bi-github"></i>,
    label: "Github",
    url: `https://github.com/${LinktreeSDK.account.data.linktree.github}`,
  },
};
return (
  <>
    <Theme.Linktree>
      <a href={LinktreeSDK.getShareUrl(accountId)} target="_blank">
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: LinktreeSDK.account.data.image,
            alt: LinktreeSDK.account.data.name,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
            style: {
              height: "100%",
              maxHeight: 150,
              borderRadius: "50%",
              aspectRatio: 1 / 1,
              objectFit: "cover",
            },
          }}
        />
      </a>
      <Theme.Details>
        <h2>{LinktreeSDK.account.data.name || accountId}</h2>

        <h5>@{accountId}</h5>
        {LinktreeSDK.account.tags.length > 0 && showTags && (
          <Theme.TagsSection>
            <Widget
              src="near/widget/Tags"
              props={{
                tags: LinktreeSDK.account.tags,
                data: nfts,
              }}
            />
          </Theme.TagsSection>
        )}
      </Theme.Details>
      {LinktreeSDK.account.data.linktree && (
        <Theme.LinktreeLinks>
          {customExternalLinks.map((link) => {
            const linkObj = externalLinks[link];
            if (LinktreeSDK.account.data.linktree[link]) {
              return (
                <a href={linkObj.url} target="_blank">
                  <button style={{ width: "100%" }}>
                    {" "}
                    {linkObj.icon} {linkObj.label}
                  </button>
                </a>
              );
            }
          })}
        </Theme.LinktreeLinks>
      )}
      {nfts?.length > 0 && showNFTs && (
        <Gallery>
          <img
            src="https://ipfs.near.social/ipfs/bafkreiayzzl6o7cgvrv6dvlwi4kahvjojbldljs24ktw7jmidwlpxjziym"
            className="arrow-l"
            onClick={HandleDownSlide}
            alt="angle left"
          />
          <div className="slider-display">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${17 * page}rem)`,
              }}
            >
              {nfts.map((nft) => (
                <a
                  key={nft.tokenId}
                  onClick={(event) => (!isLink ? event.preventDefault() : "")}
                  href={
                    isLink
                      ? `https://mintbase.xyz/meta/${nft.metadata_id.replace(
                          ":",
                          "%3A"
                        )}`
                      : ""
                  }
                  target="_blank"
                  className="nft-card"
                >
                  <Widget
                    src="mob.near/widget/NftImage"
                    props={{
                      nft: { tokenId: nft.tokenId, contractId: nft.contractId },
                      style: {
                        width: size,
                        height: size,
                        objectFit: "cover",
                        minWidth: size,
                        minHeight: size,
                        maxWidth: size,
                        maxHeight: size,
                        overflowWrap: "break-word",
                        borderRadius: "inherit",
                      },
                      className: "",
                      fallbackUrl:
                        "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
                      alt: `NFT ${nft.contractId} ${nft.tokenId}`,
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
          <img
            className="arrow-r"
            onClick={HandleUpSlide}
            src="https://ipfs.near.social/ipfs/bafkreiayzzl6o7cgvrv6dvlwi4kahvjojbldljs24ktw7jmidwlpxjziym"
            alt="angle left"
          />
        </Gallery>
      )}
    </Theme.Linktree>
  </>
);
