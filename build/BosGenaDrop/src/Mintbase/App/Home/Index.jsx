const { mode } = props;
const { getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);

const Home = styled.div`
  display: flex; /* flex */
  height: 100%; /* h-full */
  width: 100%; /* w-full */
  margin-top: 6rem; /* mt-24 */
  @media (min-width: 768px) {
    padding-bottom: 7rem; /* md:pb-28 */
    margin-top: 7rem; /* md:mt-28 */
  }
  @media (min-width: 1280px) {
    margin-top: 5.5rem; /* xl:mt-22 */
    margin-bottom: 6rem; /* xl:mb-24 */
  }
  @media (min-width: 1600px) {
    margin-top: 7.5rem; /* xxxl:mt-30 */
  }
  justify-content: center; /* justify-center */

  .hero {
    display: flex; /* flex */
    flex-direction: column; /* flex-col */
    z-index: 30; /* z-30 */
    gap: 24px; /* gap-24 */
    align-items: center; /* items-center */
    text-align: center; /* text-center */
    padding: 16px; /* p-16 */

    h1 {
      color: #e087ff;
      font-size: 48px;
      line-height: 50px;
    }
    .subText {
      font-size: 24px; /* h2-90 */
      color: ${mode === "dark" ? "#f3f4f6" : "#000"};
      text-align: center; /* text-center */
      max-width: 976px; /* max-w-screen-lg */
      z-index: 10; /* z-10 */
    }
  }
  .card {
    height: 100%; /* h-full */
    cursor: pointer; /* cursor-pointer */
    padding: 16px; /* p-24 */
    color: #d1d5db; /* text-purple-100 */
    background-color: rgb(63 56 56 / 7%); /* bg-opacity-50 */
    z-index: 30; /* z-30 */
    transition: 0.5s ease-in-out;
    border-radius: 8px; /* rounded */
    border: 1px solid ${mode === "dark" ? "#8b5cf6" : ""}; /* dark:border-purple-100 */
    color: #8b5cf6;

    &:hover {
      background-color: #1e3a8a; /* hover:bg-mb-blackblue */
      color: white; /* dark:text-purple-100 */

      color: white !important;
    }
    .innerCard {
      text-align: center; /* text-center */
      word-break: break-word; /* break-words */
      vertical-align: middle; /* align-middle */
      backdrop-filter: blur(50px);

      text-align: center; /* align-text-center */
      .cardText {
        ${getInputLabelFontType("big")}
        font-weight: bold;
        padding-right: 24px; /* pr-24 */
        padding-left: 24px; /* pl-24 */
      }
    }
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(2, 200px);
    grid-gap: 10px;
    margin-top: 20px;
    margin-bottom: 70px;
  }
`;

const cardItems = [
  { name: "Creator Suite", link: "" },
  { name: "Developers", link: "" },
  { name: "Mint a Selfie", link: "" },
  { name: "Market", link: "" },
  { name: "Wallet", link: "" },
  { name: "AI", link: "" },
];

return (
  <Home>
    <div className="hero">
      <h1>The Digital Assets Factory</h1>
      <div className="subText">
        An ownership and scarcity hub for creators and developers pioneering
        utility NFTs in AI, payments, rewards, tickets, art, memberships...
      </div>
      <div className="cards">
        {cardItems.map((data) => (
          <a>
            <div className="card">
              <div className="innerCard">
                <div className="cardText">{data.name}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </Home>
);
