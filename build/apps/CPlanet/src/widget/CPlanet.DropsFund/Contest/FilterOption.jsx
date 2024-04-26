const CustomFilter = styled.div`
  position: relative;
  display: inline-block;
  z-index: 999;
  .filter__select {
    position: relative;
    cursor: pointer;
    background-color: #000;
    border: 1px solid #fff;
    border-radius: 12px;
    padding: 9px;
    min-width: 100px;
    color: #fff;
  }
  .filter__selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    p {
      margin-bottom: 0 !important;
    }
    span {
      padding-left: 5px;
    }
  }
  .filter__options {
    position: absolute;
    top: 98%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: none;
    color: #000;
  }
  .filter__options.open {
    display: block;
  }
  .filter__option {
    padding: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      opacity: 0.5;
    }
    &.selected {
      background-color: #333;
    }
  }
`;
State.init({
  selectIsOpen: false,
  selectedChain: "0",
  initialOpen: false,
});
const handleSelectClick = () => {
  State.update({
    selectIsOpen: !state.selectIsOpen,
    initialOpen: true,
  });
};
const options = [
  { value: "A-Z", label: "A-Z" },
  { value: "Z-A", label: "Z-A" },
  { value: "Oldest", label: "Oldest" },
  { value: "Latest", label: "Latest" },
];
return (
  <CustomFilter className={state.selectIsOpen ? "open" : ""}>
    <div className={"filter__select"} onClick={handleSelectClick}>
      <div className="filter__selected">
        {props?.selectedOption && state.initialOpen ? (
          <p>{props?.selectedOption}</p>
        ) : (
          "Filter"
        )}
        <img src="https://ipfs.near.social/ipfs/bafkreieqdxxr3fxbtsew2tnzi3m5kixh5s55oyn6ylkw4ozfiroegyc7ui" />
      </div>
      <div className={`filter__options ${state.selectIsOpen ? "open" : ""}`}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`filter__option ${
              selectedOption === option.value ? "selected" : ""
            }`}
            onClick={() => props?.onChange(option.value)}
          >
            <p>{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  </CustomFilter>
);
