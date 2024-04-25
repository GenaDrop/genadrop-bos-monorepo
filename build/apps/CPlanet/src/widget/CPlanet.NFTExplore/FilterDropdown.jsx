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
  z-index: 999;
  .select-replica__select {
    position: relative;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    min-width: 150px;
    p {
      margin-bottom: 0 !important;
    }
    span {
      padding-left: 5px;
    }
  }
  .select-replica__selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .select-replica__options {
    position: absolute;
    top: 47px;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: none;
  }
  .select-replica__options.open {
    display: block;
  }
  .select-replica__option {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #f0f0f0;
    }
    &.selected {
      background-color: #f0f0f0;
    }
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
