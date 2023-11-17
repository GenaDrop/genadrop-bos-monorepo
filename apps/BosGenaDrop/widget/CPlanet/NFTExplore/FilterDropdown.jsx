const defaultProps = [
  {
    id: "0",
    name: "Creative DAO NFTs",
  },
  {
    id: "1",
    name: "Multichain NFTS",
  },
];

const propsChains = props.selected ?? defaultProps;

State.init({
  selectIsOpen: false,
  selectedChain: "0",
});
const handleSelectClick = () => {
  State.update({
    selectIsOpen: !state.selectIsOpen,
  });
};

const handleOutsideClick = (e) => {
  e.preventDefault();
  if (!!state.selectIsOpen) {
    State.update({
      selectIsOpen: false,
    });
  }
};

const SelectTag = styled.select`
  height: fit-content;
  width: 300px;
`;

const ChainIcon = styled.option`
  display: flex;
  height: 130px;
  padding: 1rem auto;
  & > img {
    height: 100px;
    width: 100px;
    object-fit: contain;
  }
`;

const SelectReplicaContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 20px;
  user-select: none;
  z-index: 1;

  & .select-replica__select {
    position: relative;
    z-index: 1;
  }

  & .select-replica__selected {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    gap: 10px;
    height: 50px;
    z-index: 1;
    border-radius: 10px;
    background-color: transparent;
    width: 100%;
    max-width: 350px;
    padding: 0 10px 0 5px;
    min-height: 20px;
    p {
      margin-bottom: 0;
      font-size: 15px;
      font-weight: 500;
    }

    & > img {
      height: 100%;
      width: 80px;
      object-fit: contain;
    }

    & > span {
      opacity: 0.6;
    }
  }

  & .select-replica__options {
    position: absolute;
    opacity: 0;
    top: 110%;
    left: 0;
    width: 100%;
    margin: auto;
    border-radius: 10px;
    background-color: transparent;
    height: auto;
    box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.05);
    pointer-events: none;
    transform: translateY(-100px);
    transition: all 0.2s;
    max-width: 350px;
  }

  & .select-replica__options.open {
    transition: all 0.2s;
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
    width: 100%;
    max-width: 350px;
  }

  & .select-replica__option {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    padding: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  & .select-replica__option.selected {
    background-color: #f0f0f0;
  }

  & .select-replica__option img {
    height: 80px;
    width: 100px;
    object-fit: contain;
  }
`;
State.update({ chains: propsChains || chains });
const handleChainChange = (chain_id) => {
  props.updateChain(chain_id);
  State.update({
    selectedChain: chain_id,
  });
};

return (
  <>
    <SelectReplicaContainer>
      <div
        className={`select-replica__select ${state.selectIsOpen ? "open" : ""}`}
        onClick={handleSelectClick}
      >
        <div className="select-replica__selected">
          {state.chains &&
          state.chains.filter(
            (chain) => chain?.id === state?.selectedChain?.toString()
          ) ? (
            <p>
              {state.chains
                .filter((chain) => chain.id === state.selectedChain.toString())
                .map((c) => c.name)}
            </p>
          ) : (
            "Select an option"
          )}
          <span>▼</span>
        </div>
        <div
          className={`select-replica__options ${
            state.selectIsOpen ? "open" : ""
          }`}
        >
          {state.chains &&
            state.chains.map((chain) =>
              chain.id !== state.selectedChain.toString() ? (
                <div
                  key={chain.id}
                  className={`select-replica__option ${
                    selectedOption === chain.name ? "selected" : ""
                  }`}
                  onClick={() => handleChainChange(chain.id)}
                >
                  <p>{chain.name}</p>
                </div>
              ) : (
                ""
              )
            )}
        </div>
      </div>
    </SelectReplicaContainer>
  </>
);
