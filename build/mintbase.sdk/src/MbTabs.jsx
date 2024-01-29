const activeIndex = props?.activeIndex;
const filterOptions = props?.filterOptions;
const firstElement = props?.firstElement;
const onTabChange = props?.onTabChange;
const onOrderByChange = props?.onOrderByChange;

const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";



const MbTabs = styled.div`
    position: relative;
    ul {
        display: flex;
        justify-content: space-between;
        background-color: ${isDarkModeOn ? '#1F2937' : '#F9FAFB'};
        padding-left: 1.5rem; /* 24px */
        padding-right: 1.5rem; /* 24px */
        @media (max-width: 768px) {
            padding-left: 3rem; /* 48px */
            padding-right: 3rem; /* 48px */
        }
        overflow-x: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`




return (
    <MbTabs>
        
    </MbTabs>
)