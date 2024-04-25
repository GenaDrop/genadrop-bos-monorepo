const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 300px;
  border-radius: 16px;
  padding-top: 30px;
  background: #fff;
  align-items: center;
  img {
    width: 70px;
  }
  h1 {
    font-size: 25px;
    margin-top: 10px;
    font-weight: 600;
  }
`;
const PopupButtons = styled.div`
  margin-top: 30px;
  a:first-child {
    border: 1.5px solid #0d6efd;
    cursor: pointer;
    margin-right: 10px;
    transition: 0.3s ease-in-out;
    padding: 7.5px;
    border-radius: 8px;
  }
  a:hover {
    opacity: 0.5;
  }
  button {
    width: 120px;
  }
`;
return (
  <PopupContainer>
    <img src="https://cdn-icons-png.flaticon.com/128/5709/5709755.png" alt="" />
    <h1>{props.modalText ?? "Successfully Listed"}</h1>
    <PopupButtons>
      <a target="_blank" href={props.externalLink}>
        View on Explorer
      </a>
      <a href="#/bos.genadrop.near/widget/GenaDrop.Explore">
        <button onClick={props.closeModal}>Close</button>
      </a>
    </PopupButtons>
  </PopupContainer>
);
