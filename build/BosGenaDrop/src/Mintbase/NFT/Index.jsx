const dotsSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 0 24 24"
    width="20px"
    fill="#000000"
    class="fill-current text-black hover:text-blue-300 dark:text-white hover:text-blue-100"
  >
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
  </svg>
);

const pinSvg = (
  <svg
    width="14px"
    height="14px"
    viewBox="0 0 12 12"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-gray-700 dark:text-gray-300 group-hover:text-blue-300 dark:group-hover:text-blue-100 transition ease-in-out duration-500 dark:text-undefined"
  >
    <path
      d="M7.11053 11.2811C6.94269 11.4486 6.7347 11.5323 6.48658 11.5323C6.23846 11.5323 6.03064 11.4486 5.86312 11.2811L0.729782 6.14773C0.645276 6.06322 0.578907 5.96595 0.530675 5.85591C0.482434 5.74589 0.458313 5.62852 0.458313 5.50383V1.33299C0.458313 1.09443 0.544505 0.88896 0.71689 0.716585C0.889265 0.5442 1.09473 0.458008 1.3333 0.458008H5.50413C5.62453 0.458008 5.73986 0.481506 5.85012 0.528504C5.96039 0.575491 6.05596 0.638744 6.13682 0.718262L11.2702 5.86058C11.4414 6.03184 11.528 6.24104 11.5298 6.4882C11.5317 6.73536 11.4489 6.9427 11.2814 7.11022L7.11053 11.2811ZM2.79098 3.52048C2.99333 3.52048 3.16556 3.44965 3.30765 3.308C3.44974 3.16635 3.52078 2.99434 3.52078 2.79198C3.52078 2.58962 3.44996 2.4174 3.3083 2.27531C3.16665 2.13322 2.99465 2.06217 2.79229 2.06217C2.58993 2.06217 2.41771 2.133 2.27562 2.27465C2.13353 2.41631 2.06248 2.58831 2.06248 2.79067C2.06248 2.99303 2.13331 3.16525 2.27496 3.30734C2.41661 3.44943 2.58862 3.52048 2.79098 3.52048Z"
      fill="currentColor"
    ></path>
  </svg>
);

const arrowSvg = (
  <svg
    width="14px"
    height="14px"
    viewBox="0 0 11 10"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-gray-700 dark:text-gray-300 group-hover:text-blue-300 dark:group-hover:text-blue-100 transition ease-in-out duration-500 dark:text-undefined"
  >
    <path
      d="M0.041687 9.22878V5.97559L4.0801 4.99965L0.041687 4.0237V0.770508L10.0817 4.99965L0.041687 9.22878Z"
      fill="currentColor"
    ></path>
  </svg>
);

const cancelSvg = (
  <svg
    width="14px"
    height="14px"
    viewBox="0 0 10 8"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-gray-700 dark:text-gray-300 group-hover:text-blue-300 dark:group-hover:text-blue-100 transition ease-in-out duration-500 dark:text-undefined"
  >
    <path
      d="M4.54876 6.13106L6.06543 4.61439L7.58209 6.13106L8.19682 5.51633L6.68016 3.99966L8.19682 2.48299L7.58209 1.86826L6.06543 3.38493L4.54876 1.86826L3.93404 2.48299L5.45071 3.99966L3.93404 5.51633L4.54876 6.13106ZM0.0750732 3.99966L2.38821 0.726285C2.50263 0.563253 2.64865 0.436115 2.82626 0.344872C3.00388 0.253629 3.19365 0.208008 3.39558 0.208008H8.86992C9.16082 0.208008 9.4093 0.311029 9.61535 0.517072C9.82138 0.723106 9.92439 0.971581 9.92439 1.2625V6.73682C9.92439 7.02774 9.82138 7.27622 9.61535 7.48225C9.4093 7.68829 9.16082 7.79131 8.86992 7.79131H3.39558C3.18992 7.79131 3.00014 7.74382 2.82626 7.64883C2.65239 7.55386 2.50637 7.42485 2.38821 7.26182L0.0750732 3.99966Z"
      fill="currentColor"
    ></path>
  </svg>
);

const CardContainer = styled.div`
  width: 370px;
  height: 480px;
  background: #fff;
  background: #f8f8f8;
  transition: 0.5s ease-in-out;
`;

const Bottom = styled.div`
  padding: 10px 20px;
  div {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .contract {
    margin-bottom: 10px;
  }
  .title {
    font-size: 14px;
  }
  p {
    margin: 0;
    font-size: 12px;
  }
  img {
    width: 24px;
    height: 24px;
    object-fit: center;
  }
`;

const ModalBg = styled.div`
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw !important;
  height: 100%;
  background-color: #000000;
  opacity: 0.75;
  z-index: 999;
`;

const Modal = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  z-index: 999;
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const NFTCard = ({ data }) => {
  const [modalState, setModalState] = useState("");

  const Top = styled.div`
    height: 370px;
    width: 370px;
    background-image: url("${data?.media}");
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    padding: 20px;
    div {
      gap: 10px;
      button {
        border: none;
        background: white;
        width: max-content;
        font-size: 13px;
        color: black;
        &:hover {
          background: white;
          color: black;
        }
      }
    }
  `;

  const ModalOptions = styled.div`
    width: 600px;
    height: 400px;
    background: #fff;
    padding-top: 15px;
  `;

  const TopModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    height: 60px;
    p {
      font-weight: bold;
    }
    p:last-child {
      cursor: pointer;
    }
  `;

  const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #e7ebee;
    border-top: 1px solid #e7ebee;
    .contents {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 20px;
      gap: 15px;
    }
    .content {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 5px 18px;
      border-radius: 4px;
      p {
        font-size: 15px;
        font-weight: bold;
        text-transform: uppercase;
        margin: 0;
        cursor: pointer;
      }
      &:hover {
        background: #93c5fd;
        svg {
          color: rgba(79, 88, 163, 1);
        }
        p {
          color: rgba(79, 88, 163, 1);
        }
      }
    }
  `;

  const ModalButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    button {
      background: #000;
      border: none;
      transition: 0.3s ease-in-out;
      padding: 5px 45px;
      &:hover {
        background-color: rgba(79, 88, 163, 1);
      }
    }
  `;

  return (
    <CardContainer>
      <Top bg={data?.media}>
        <div>
          <button onClick={() => setModalState("SELL")}>SELL</button>
          <button onClick={() => setModalState("OPTIONS")}>{dotsSvg}</button>
        </div>
      </Top>
      <Bottom>
        <p className="contract">{data?.nft_contract_id}</p>
        <div>
          <p className="title">{data?.title}</p>
          <p>-</p>
        </div>
        <div>
          <img src="https://www.mintbase.xyz/images/user-light.png" />
          <p>{data?.price ? "Listed" : "Not Listed"}</p>
        </div>
      </Bottom>
      {modalState !== "" && (
        <div>
          <ModalBg />
          <Modal>
            {modalState === "SELL" && (
              <Widget
                src="bos.genadrop.near/widget/Mintbase.NFT.MBSellOption"
                props={{ data, onClose: () => setModalState("") }}
              />
            )}
            {modalState === "TRANSFER" && (
              <Widget
                src="bos.genadrop.near/widget/Mintbase.NFT.TransferOption"
                props={{ data, onClose: () => setModalState("") }}
              />
            )}
            {modalState === "REMOVE" && (
              <Widget
                src="bos.genadrop.near/widget/Mintbase.NFT.Delist"
                props={{ data, onClose: () => setModalState("") }}
              />
            )}
            {modalState === "OPTIONS" && (
              <ModalOptions>
                <TopModal>
                  <p>Actions</p>
                  <p onClick={onClose}>X</p>
                </TopModal>
                <ModalContent>
                  <div className="contents">
                    <div
                      onClick={() => setModalState("SELL")}
                      className="content"
                    >
                      {pinSvg} <p>Sell</p>
                    </div>
                    <div
                      onClick={() => setModalState("TRANSFER")}
                      className="content"
                    >
                      {arrowSvg} <p>Transfer</p>
                    </div>
                    <div
                      onClick={() => setModalState("REMOVE")}
                      className="content"
                    >
                      {cancelSvg} <p>Remove Listing</p>
                    </div>
                  </div>
                </ModalContent>
                <ModalButton>
                  <button onClick={() => setModalState("")}>Close</button>
                </ModalButton>
              </ModalOptions>
            )}
          </Modal>
        </div>
      )}
    </CardContainer>
  );
};

return <NFTCard data={props.data} />;
