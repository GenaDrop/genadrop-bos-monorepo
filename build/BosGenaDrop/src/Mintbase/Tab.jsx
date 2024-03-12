const label = props?.label;
const isActive = props?.isActive;
const isSmall = props?.extraFilter;
const isExtraFilterSelected = props?.isExtraFilterSelected;
const onExtraFilterChange = props?.onExtraFilterChange;
const filteredOptions = props.filteredOptions || [];

const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";

const isConnected = label.startsWith("_");

const Tab = styled.div`
  display: flex;
  .tab {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    gap: 0.2rem;
    border-radius: 0.25rem; /* Assuming default border radius */
    color: ${isDarkModeOn ? "#a5b4fc" : "#93c5fd"}; /* Ternary for text color */
    padding: 1rem; /* Assuming Tailwind CSS default spacing unit */
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Assuming Tailwind CSS default timing function and duration */
    white-space: nowrap;

    &:focus {
      outline: 2px solid transparent; /* Assuming Tailwind CSS default focus outline */
      outline-offset: 2px; /* Assuming Tailwind CSS default focus outline offset */
      box-shadow: 0 0 0 2px
        ${isDarkModeOn ? "rgba(59, 130, 246, 0.5)" : "rgba(66, 153, 225, 0.5)"}; /* Ternary for box-shadow */
      background-color: ${isDarkModeOn
        ? "rgba(59, 130, 246, 0.35)"
        : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
    }

    &:hover {
      background-color: ${isDarkModeOn
        ? "rgba(59, 130, 246, 0.15)"
        : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
    }

    cursor: pointer;

    &.active {
      background-color: ${isDarkModeOn
        ? "rgba(235, 97, 96, 0.15)"
        : "rgba(235, 97, 96, 0.15)"}; /* Assuming Tailwind CSS mb-red color */
      color: ${isDarkModeOn
        ? "#f87171"
        : "#f87171"}; /* Assuming Tailwind CSS mb-red color */
      box-shadow: none; /* Assuming removing box-shadow */
    }
  }
  .tab.small {
    padding: 1rem;
  }
  .connected_button {
    width: 6px;
    height: 6px;
    background-color: rgba(159, 237, 143, 1);
    border-radius: 50%;
  }
`;

const [showOrderOpts, setShowOrderOpts] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(
  filterOptions?.defaultOptionId ?? ""
);
const [selectedFilter, setSelectedFilter] = useState(false);

return (
  <Tab>
    <div
      className={`tab p-med-90 ${isActive ? "active" : ""} ${
        isSmall ? "small" : ""
      }`}
    >
      {isConnected && <span className="connected_button"></span>}
      {/* {label} */}
      {/* remove the underscore at the begining if there's one before displaying the label */}
      {label.replace(/^_/, "")}
    </div>
  </Tab>
);
