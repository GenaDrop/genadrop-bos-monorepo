const Root = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1400px;
  margin: 31px 0;
  width: 100%;
  .left {
    .header {
      span {
        color: #808080;
        leading-trim: both;
        text-edge: cap;
        font-family: Helvetica Neue;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
      h1 {
        color: var(--Black, #000);
        leading-trim: both;
        text-edge: cap;
        font-family: Helvetica Neue;
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
  }
`;

const Status = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .submission {
    color: #3bd07f;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 8px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 12px */
    display: flex;
    padding: 2px 10px;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
`;

return (
  <Root>
    <div className="left">
      <div className="header">
        <span>Oct 31, 2023 - Nov 30, 2023</span>
        <h1>Lorem Ipsum Contest</h1>
      </div>
      <Status>
        <p className="submission">SUBMISSION OPEN</p>
      </Status>
    </div>
    <div className="right"></div>
  </Root>
);
