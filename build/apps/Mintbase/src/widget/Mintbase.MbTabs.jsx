const { MbDropdownMenu } = VM.require(
  "bos.genadrop.near/widget/Mintbase.MbDropdownMenu"
);
// const { Tab } = VM.require("bos.genadrop.near/widget/Mintbase.Tab");
const activeTab = props?.activeTab;
const filterOptions = props?.filterOptions;
const firstElement = props?.firstElement;
const onTabChange = props?.onTabChange;
const labels = props?.tabLabels;
const onOrderByChange = props?.onOrderByChange;
const isDarkModeOn = props?.isDarkModeOn;
const hasQueryToggle = props?.hasQueryToggle;
const onQueryToggle = props?.onQueryToggle;
const Tabs = styled.div`
  position: relative;
  width: 100%;
  *,
  *::before,
  *::after {
    margin: 0px;
    padding: 0px;
  }
  ${props.customStyle}
  .right-tabs {
    display: flex;
    margin-left: 30px;
    align-items: center;
    @media (min-width: 640px) {
      margin-left: 3rem;
    }
  }
  ul {
    display: flex;
    gap: 24px;
    background-color: ${isDarkModeOn ? "#282A3A" : "#F3F4F8"};
    padding-left: 36px; /* 24px */
    padding-right: 36px; /* 24px */
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 768px) {
      padding-left: 3rem; /* 48px */
      padding-right: 3rem; /* 48px */
    }
  }
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .order-by-f {
    cursor: pointer;
    position: relative;
    border-radius: 9999px;
    transition: all 0.5s ease;
    &.selected {
      background-color: ${isDarkModeOn ? "#3a1c28" : "#fedfde"};
      &:hover {
        background-color: ${isDarkModeOn ? "#3a1c28" : "#fedfde"};
      }
    }
    &.unselected {
      &:hover {
        background-color: #90cdf4;
      }
    }
  }
  .extraFilter {
    display: flex;
    padding: 12px;
    align-items: center;
    .selectedFilter {
      color: #f87171;
    }
    .unSelectedFilter {
      color: ${isDarkModeOn ? "#DBEAFE" : "#93C5FD"};
    }
    @media (max-width: 640px) {
      padding: 16px;
    }
  }
  .filter_area {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    padding: 12px;
  }
`;
const Dropdown = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  @media (max-width: 640px) {
    margin-right: 3rem;
    margin-left: 3rem;
  }
  .order-by {
    cursor: pointer;
    position: relative;
    border-radius: 9999px;
    transition: all 0.5s ease;
    &.selected {
      background-color: ${isDarkModeOn ? "#3a1c28" : "#fedfde"};
      &:hover {
        background-color: ${isDarkModeOn ? "#3a1c28" : "#fedfde"};
      }
    }
    &.unselected {
      &:hover {
        background-color: #90cdf4;
      }
    }
  }
  .tab {
    display: flex;
    padding: 12px; /* Assuming p-12 */
    align-items: center;
    @media (max-width: 640px) {
      padding: 16px; /* Assuming sm:p-16 */
    }
  }
  .order {
    padding-right: 10px; /* Assuming pr-10 */
    white-space: nowrap; /* Assuming whitespace-nowrap */
    color: #ff3130;
  }
`;
const Tab = styled.div`
  display: flex;
  .tab {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    gap: 0.2rem;
    border-radius: 0.25rem; /* Assuming default border radius */
    color: ${isDarkModeOn ? "#C5D0FF" : "#4F58A3"}; /* Ternary for text color */
    padding: 16px; /* Assuming Tailwind CSS default spacing unit */
    font-size: 14px;
    line-height: 16px;
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
    @media (max-width: 768px) {
      padding: 12px;
      font-size: 12px;
      line-height: 14px;
    }
  }
  .connected_button {
    width: 6px;
    height: 6px;
    background-color: rgba(159, 237, 143, 1);
    border-radius: 50%;
  }
`;
const [tab, setTab] = useState(0);
const [listening, setListening] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [selectedFilter, setSelectedFilter] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(
  filterOptions?.defaultOptionId ?? ""
);
useEffect(() => {
  if (!props?.tabsWithFilters) return;
  setSelectedFilter(!!props?.tabsWithFilters[tab]?.isExtraFilterSelected);
}, [tab]);
const options =
  filterOptions &&
  filterOptions?.options.map((filter) => {
    return {
      content: <span>{filter.label}</span>,
      onClick: () => handleOptionSelect(filter.id),
      selected: selectedOrder === filter.id,
      icon:
        selectedOrder === filter.id ? (
          <Widget
            src="bos.genadrop.near/widget/Mintbase.MbIcon"
            props={{
              color: `${isDarkModeOn ? "blue-300" : "blue-100"}`,
              size: "16px",
              name: "check",
            }}
          />
        ) : undefined,
    };
  });
const getExtraFiltersIndex = (array) => {
  const indexes = [];
  array &&
    array.map((tab, index) => {
      if (labels?.includes(tab?.tab) && tab?.extraFilter) {
        indexes.push(index);
      }
    });
  return indexes;
};
const tabsWithExtraFilter = getExtraFiltersIndex(props?.tabsWithFilters);
const handleOptionSelect = (option) => {
  setIsOpen(!isOpen);
  const auxOption = option === selectedOrder ? "" : option;
  setSelectedOrder(auxOption);
  onOrderByChange(auxOption);
};
if (!labels.length) return <></>;
console.log("labels", labels);
return (
  <Tabs>
    <ul>
      {hasQueryToggle && (
        <li onClick={onQueryToggle} key="query_toggle" className="filter_area">
          <div>
            <Widget
              src="bos.genadrop.near/widget/Mintbase.MbIcon"
              props={{
                color: `${isDarkModeOn ? "mb-blue-100" : "mb-blue-300"}`,
                size: "24px",
                name: "filters",
              }}
            />
          </div>
        </li>
      )}
      {labels &&
        labels.map((data, index) => {
          const lowerCaseText = data?.replace(/^_/, "").toLowerCase();
          lowerCaseText = lowerCaseText.replace(/ /g, "-");
          const isActive = lowerCaseText === activeTab;
          const isConnected = data.startsWith("_");
          if (activeTab !== undefined) {
            return (
              <li
                onClick={() => onTabChange(lowerCaseText)}
                key={lowerCaseText}
              >
                <Tab>
                  <div className={`tab p-med-90 ${isActive ? "active" : ""}`}>
                    {isConnected && <span className="connected_button" />}
                    {data.replace(/^_/, "")}
                  </div>
                </Tab>
              </li>
            );
          } else {
            return (
              <li onClick={() => setTab(index)} key={index}>
                <Tab>
                  <div
                    className={`tab p-med-90 ${index === tab ? "active" : ""}`}
                  >
                    {isConnected && <span className="connected_button" />}
                    {data.replace(/^_/, "")}
                  </div>
                </Tab>
              </li>
            );
          }
        })}
      {props?.tabsWithFilters ? (
        <div className="right-tabs">
          {tabsWithExtraFilter.map((tabIndex) => {
            const currentTab = props.tabsWithFilters[tab];
            const { extraFilter, onExtraFilterChange } = currentTab;
            if (!extraFilter) return;
            if (tabIndex === tab)
              return (
                <li
                  className={`order-by-f ${
                    selectedFilter ? "selected" : "unselected"
                  }`}
                  onClick={() => {
                    if (!onExtraFilterChange) return;
                    setSelectedFilter(!selectedFilter);
                    onExtraFilterChange(!selectedFilter);
                  }}
                  key={tabIndex}
                >
                  <div className="extraFilter">
                    <div
                      className={`${
                        selectedFilter ? "selectedFilter" : "unSelectedFilter"
                      } p-med-90 pr-10 whitespace-nowrap`}
                    >
                      {extraFilter}
                    </div>
                  </div>
                </li>
              );
          })}
          <Dropdown onClick={() => setIsOpen(!isOpen)}>
            <li
              className={`order-by ${
                selectedOrder ? "selected" : "unselected"
              } relative`}
            >
              <div className="tab" onClick={() => setIsOpen(!isOpen)}>
                <div selectedOrder className={`order`}>
                  {selectedOrder
                    ? filterOptions.options.filter(
                        (filter) => filter.id === selectedOrder
                      )[0].label
                    : filterOptions.label}
                </div>
                <Widget
                  src="bos.genadrop.near/widget/Mintbase.MbIcon"
                  props={{
                    color: `${isDarkModeOn ? "mb-blue-300" : "mb-blue-100"}`,
                    size: "16px",
                    name: "arrow_drop_down",
                  }}
                />
              </div>
            </li>
          </Dropdown>
        </div>
      ) : null}
    </ul>
    {filterOptions && options && (
      <Widget
        src="bos.genadrop.near/widget/Mintbase.MbDropdownMenu"
        props={{ isOpen, items: options, customStyle: "right: 0;" }}
      />
      /* <MbDropdownMenu isOpen={true} items={options} customStyle="right : 0;" /> */
    )}
  </Tabs>
);
