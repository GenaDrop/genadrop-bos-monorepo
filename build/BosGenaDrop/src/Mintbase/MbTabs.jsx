const { MbDropdownMenu } = VM.require(
  "bos.genadrop.near/widget/Mintbase.MbDropdownMenu"
);
const activeIndex = props?.activeIndex;
const filterOptions = props?.filterOptions;
const firstElement = props?.firstElement;
const onTabChange = props?.onTabChange;
const labels = props?.tabLabels;
const onOrderByChange = props?.onOrderByChange;

const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";

const Tabs = styled.div`
  position: relative;
  width: 100%;
  ${props.customStyle}
  .right-tabs {
    display: flex;
    margin-left: 1.5rem;
    align-items: center;

    @media (min-width: 640px) {
      margin-left: 3rem;
    }
  }
  ul {
    display: flex;
    justify-content: space-between;
    background-color: ${isDarkModeOn ? "#1F2937" : "#F9FAFB"};
    padding-left: 1.5rem; /* 24px */
    padding-right: 1.5rem; /* 24px */
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

return (
  <Tabs>
    <ul>
      {labels &&
        labels.map((data, index) => {
          if (activeIndex !== undefined) {
            return (
              <li onClick={() => onTabChange(index)} key={index}>
                <Widget
                  src="bos.genadrop.near/widget/Mintbase.Tab"
                  props={{
                    label: data,
                    isActive: index === activeIndex,
                  }}
                />
              </li>
            );
          } else {
            return (
              <li onClick={() => setTab(index)} key={index}>
                <Widget
                  src="bos.genadrop.near/widget/Mintbase.Tab"
                  props={{
                    label: data,
                    isActive: index === tab,
                  }}
                />
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
                    color: `${isDarkModeOn ? "blue-300" : "blue-100"}`,
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
