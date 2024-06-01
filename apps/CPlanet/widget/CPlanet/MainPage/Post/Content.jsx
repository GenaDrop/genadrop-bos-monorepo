const content = props.content;
const raw = !!props.raw;

console.log("content in content widget: ", content);

return content ? (
  <>
    {content.text &&
      (raw ? (
        <pre style={{ whiteSpace: "pre-wrap" }}>{content.text}</pre>
      ) : (
        <Widget
          src="jgodwill.near/widget/N.SocialMarkdown"
          props={{
            text: content.text,
            onHashtag: (hashtag) => (
              <span
                key={hashtag}
                className="d-inline-flex"
                style={{ fontWeight: 500 }}
              >
                <a href={`#/?hashtag=${hashtag}`}>#{hashtag}</a>
              </span>
            ),
          }}
        />
      ))}
    {content.image &&
      (raw ? (
        <div>
          <pre>{JSON.stringify(content.image, undefined, 2)}</pre>
        </div>
      ) : (
        <div className="w-100 rounded-3 text-center">
          <Widget
            src="${alias_mob}/widget/Image"
            props={{
              image: content.image,
              className: "img-fluid rounded-3",
              style: { maxHeight: "100vh" },
            }}
          />
        </div>
      ))}
    {(content.embeddedNFT.contractId || content.embeddedNFT.tokenId) && (
      <div key="content-img" className="mt-2">
        <Widget
          src="${config_account}/widget/CPlanet.EmbeddedNFT"
          props={{
            contractId: content.embeddedNFT.contractId,
            tokenId: content.embeddedNFT.tokenId,
            chainState: content.embeddedNFT.chain?.toLowerCase(),
          }}
        />
      </div>
    )}
  </>
) : (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);
