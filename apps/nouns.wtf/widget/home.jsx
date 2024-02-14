const Home = styled.div`
  font-family: "PT Root UI", sans-serif;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
`;

const preview1Props = {
  title: "One Noun, Every Day, Forever.",
  text: "Behold, an infinite work of art! Nouns is a community-owned brand that makes a positive impact by funding ideas and fostering collaboration. From collectors and technologists, to non-profits and brands, Nouns is for everyone.",
  mediaTooltip: (
    <>
      {" "}
      This video was commissioned in <a href=""> Prop 113</a> and minted in
      <a href=""> Prop 190</a>
    </>
  ),
};

const preview2Props = {
  title: "Build With Nouns. Get Funded.",
  text: "There's a way for everyone to get involved with Nouns. From whimsical endeavors like naming a frog, to ambitious projects like constructing a giant float for the Rose Parade, or even crypto infrastructure like Prop House. Nouns funds projects of all sizes and domains.",
  mirror: true,
  mediaTooltip: (
    <>
      {" "}
      This video was produced as part of
      <a href="/vote/143">Prop 143</a>
    </>
  ),
};

const preview3Props = {
  title: "Download the Free iOS App",
  text: "Every new Noun pushed right to your pocket! View the current auction, remix your own Noun, and explore the entire history directly from the app.",
  media: (
    <img
      className="w-75"
      src="https://nouns.wtf/static/media/nouns-ios.529e2cef.gif"
      alt="mobile-app"
    />
  ),
};

const home = (
  <div>
    <Home>
      <div style={{ backgroundColor: "var(--brand-warm-background)" }}>
        <Widget src="nouns.near/widget/nav" />
        <Widget src="nouns.near/widget/nft-auction" />
      </div>
      <Widget src="nouns.near/widget/preview" props={preview1Props} />
      <Widget src="nouns.near/widget/preview" props={preview2Props} />
      <Widget src="nouns.near/widget/preview" props={preview3Props} />
    </Home>
  </div>
);
return <Widget src="nouns.near/widget/Theme" props={{ children: home }} />;
