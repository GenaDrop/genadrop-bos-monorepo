const Root = styled.div`
  display: flex;
  width: 624px;
  padding: 24px 32px 16px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  border-radius: 4px;
  margin-bottom: 16px;
  border: 1px solid #eaeaea;
  border-left: 6px solid black;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  .head {
    display: flex;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    border-radius: 100px;
    background: rgba(0, 0, 0, 0.15);
    p {
      display: flex;
      width: 32px;
      height: 32px;
      justify-content: center;
      align-items: center;
      color: white;
      background: black;
      border-radius: 50%;
      padding: 10px;
      font-size: 10px;
      margin-bottom: 0;
    }
    span {
      color: #000;
      font-family: Open Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
    }
  }
`;
const User = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .proposal {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    .progress {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: none;
      width: 300px;
      p {
        display: flex;
        padding: 6px 16px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 12px;
        background: #b0b0b0;
        color: #000;
        font-family: Open Sans;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 120%;
        margin-bottom: 5px;
      }
      span {
        color: #8c8c8c;
        text-align: right;
        font-family: Open Sans;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }
  .name {
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      color: #8c8c8c;
      font-family: Open Sans;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%; /* 16.8px */
      text-decoration-line: underline;
    }
    h1 {
      display: flex;
      color: #000;
      font-family: Open Sans;
      font-size: 20px;
      font-style: normal;
      margin-bottom: 0;
      font-weight: 700;
      line-height: 100%; /* 20px */
      p {
        display: flex;
        padding: 6px 8px;
        margin-left: 8px;
        align-items: center;
        gap: 10px;
        border-radius: 100px;
        margin-bottom: 5px;
        border: 1px solid #000;
        background: rgba(0, 0, 0, 0.1);
        color: #000;
        font-family: Open Sans;
        font-size: 10px;
        font-style: normal;
        width: max-content;
        font-weight: 400;
        line-height: 120%; /* 12px */
      }
    }
  }
`;
const Proposer = styled.div`
  width: 100%;
  .user {
    display: flex;
    width: 70%;
    align-items: flex-start;
    justify-content: space-between;
    .userId {
      display: flex;
      align-items: flex-start;
      img {
        width: 56px;
        height: 56px;
        margin-right: 8px;
        border-radius: 50%;
      }
      h1 {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%; /* 19.2px */
        margin-bottom: 2px;
      }
      span {
        overflow: hidden;
        color: #b0b0b0;
        text-align: justify;
        text-overflow: ellipsis;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%; /* 19.2px */
      }
    }
  }
  .category {
    span {
      color: #b0b0b0;
      font-family: Open Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%; /* 19.2px */
    }
    p {
      display: flex;
      padding: 6px 12px;
      justify-content: center;
      align-items: center;
      gap: 6px;
      border-radius: 100px;
      background: #000;
      color: #fff;
      margin-top: 6px;
      font-family: Open Sans;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%; /* 16.8px */
    }
  }
  .desc {
    span {
      color: #b0b0b0;
      font-family: Helvetica Neue;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%; /* 19.2px */
    }
    p {
      color: #000;
      font-family: Helvetica Neue;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      margin-top: 8px;
      line-height: 120%; /* 19.2px */
    }
  }
`;
const Submission = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .tab {
    p {
      color: #b0b0b0;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      margin-bottom: 2px;
      line-height: 120%; /* 14.4px */
    }
    h3 {
      color: #000;
      font-family: Helvetica Neue;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      margin-top: 0;
      line-height: 120%; /* 24px */
    }
  }
`;
return (
  <Root>
    <div className="head">
      <p>HoM</p>
      <span>This is a proposal from HoM. You are allowed to vote.</span>
    </div>
    <User>
      <div className="proposal">
        <div className="name">
          <h1>
            Proposal name <p>Proposal ID #1</p>
          </h1>
          <span>dao-name-here.near</span>
        </div>
        <div className="progress">
          <p>Proposal in Progress</p>
          <span>00d 00h 00m left</span>
        </div>
      </div>
    </User>
    <Proposer>
      <div className="user">
        <div className="userId">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU" />
          <div>
            <h1>Lorem Ipsum Name</h1>
            <span>Lorem.ipsum.near</span>
          </div>
        </div>
        <div className="category">
          <span>Category</span>
          <p>Default</p>
        </div>
      </div>
      <div className="desc">
        <span>Description</span>
        <p>
          Lorem ipsum dolor sit amet consectetur. Egestas nulla suspendisse
          euismod mattis id. Metus scelerisque sed tellus malesuada et. At ut
          tincidunt neque viverra lorem nibh amet. Nunc tellus phasellus quam
          dui sed mauris vel. Varius tortor ornare tortor viverra egestas.{" "}
        </p>
      </div>
    </Proposer>
    <Submission>
      <div className="tab">
        <p>Submission date</p>
        <h3>AUg 1, 2023</h3>
      </div>
      <div className="tab">
        <p>Approval date</p>
        <h3>-</h3>
      </div>
      <div className="tab">
        <p>Duration</p>
        <h3>-</h3>
      </div>
      <div className="tab">
        <p>Votes Required</p>
        <h3>30 votes</h3>
      </div>
    </Submission>
  </Root>
);
