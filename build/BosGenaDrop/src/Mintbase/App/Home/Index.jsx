const { mode } = props;

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
`;

return (
  <Home>
    <div className="hero">
      <h1>The Digital Assets Factory</h1>
      <div className="subText">
        An ownership and scarcity hub for creators and developers pioneering
        utility NFTs in AI, payments, rewards, tickets, art, memberships...
      </div>
    </div>
  </Home>
);
