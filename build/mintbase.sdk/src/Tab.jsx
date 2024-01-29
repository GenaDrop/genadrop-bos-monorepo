const label = props?.label;
const isActive = props?.isActive;
const isSmall = props?.extraFilter;
const isExtraFilterSelected = props?.isExtraFilterSelected;
const onExtraFilterChange = props?.onExtraFilterChange
const filteredOptions = props.filteredOptions

const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";


const Tab = styled.div`
    display: flex;
    .tab {
        border-radius: 0.5rem;
        padding: 3rem; /* 12px */
        @media (max-width: 640px) {
        padding: 4rem; /* 16px */
        }
        &:focus {
        outline: none;
        ring: 1px solid ${isDarkModeOn ? '#93C5FD' : '#DBEAFE'};
        background-color: ${isDarkModeOn ? '#93C5FD' : '#DBEAFE'};
        }
        &:hover {
        background-color: ${isDarkModeOn ? '#93C5FD' : '#DBEAFE'};
        }
        cursor: pointer;
        transition: all 0.5s;
        white-space: nowrap;
        color: ${isDarkModeOn ? '#93C5FD' : '#DBEAFE'};
    }
    .tab.small {
        padding: 3rem;
    }
    .tab.active {
        background-color: ${isDarkModeOn ? '#F87171' : '#FECACA'};
          &:focus {
            outline: none;
            ring: 1px solid ${isDarkModeOn ? '#FECACA' : '#F87171'};
          }
          color: #F87171;
    }
`

const [showOrderOpts, setShowOrderOpts] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(
    filterOptions?.defaultOptionId ?? ''
  )
  const [selectedFilter, setSelectedFilter] = useState(false)

  const options = filterOptions?.options.map((filter) => {
    return {
      content: <span>{filter.label}</span>,
      onClick: () => handleOptionSelect(filter.id),
      selected: selectedOrder === filter.id,
      icon:
        selectedOrder === filter.id ? (
          <MbIcon
            name={EIconName.CHECK}
            color={'blue-300'}
            darkColor={'blue-100'}
            size="16px"
          />
        ) : undefined,
    }
  })

return (
    <Tab>
        <div
            className={`tab p-med-90 ${isActive ? 'active' : ''} ${
                isSmall ? 'small' : ''
            }`}
        >

        </div>
    </Tab>
)