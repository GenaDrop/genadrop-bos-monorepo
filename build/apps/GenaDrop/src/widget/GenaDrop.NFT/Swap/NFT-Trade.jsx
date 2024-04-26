const accountId = "harrydhillon.near";
if (!accountId) {
  return "You need to login with your near wallet in order to use this app";
}
State.init({
  tab: props.tab ?? "swap",
});
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}
const pills = [
  { id: "swap", title: "Swap" },
  { id: "offer", title: "Offers" },
];
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
).body;
const css = fetch(
  "https://raw.githubusercontent.com/cryptosynk/near-social-profile/main/css/mainLight.css"
).body;
const theme = "light";
const Theme = styled.div`
  font-family: "Open Sans", sans-serif;
  ${cssFont}
  ${css}
`;
return (
  <div style={{ padding: 10 }}>
    <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
      {pills.map(({ id, title }, i) => (
        <li className="nav-item" role="presentation" key={i}>
          <a
            className={`nav-link ${state.tab === id ? "active" : ""}`}
            id={`pills-${id}-tab`}
            href={`#/bos.genadrop.near/widget/GenaDrop.NFT.Swap.NFT-Trade?tab=${id}`}
            onClick={() => {
              State.update({
                tab: id,
              });
            }}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
    <div className="tab-content" id="pills-tabContent">
      {state?.tab === "swap" && (
        <Widget src="bos.genadrop.near/widget/GenaDrop.NFT.Swap.NFT-Transfer" />
      )}
      {state?.tab === "offer" && (
        <Widget src="bos.genadrop.near/widget/GenaDrop.NFT.Swap.Order" />
      )}
    </div>
  </div>
);
