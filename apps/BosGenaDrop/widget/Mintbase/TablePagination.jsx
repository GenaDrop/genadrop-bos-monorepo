const onPageChange = props?.onPageChange;
const currentPage = props?.currentPage;
const itemsPerPage = props?.itemsPerPage;
const totalItems = props.totalItems;
const hasLabel = props.hasLabel;

const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";

const DOTS = "...";

const range = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

const [paginationRange, setPaginationRange] = useState([]);
const totalPageCount = Math.ceil(totalItems / itemsPerPage);

useMemo(() => {
  const totalPageNumbers = 6;

  if (totalPageNumbers >= totalPageCount) {
    setPaginationRange(range(1, totalPageCount));
  }

  if (totalPageCount <= 5) return;

  const leftSiblingIndex = Math.max(currentPage - 1, 1);
  const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);

  const shouldShowLeftDots = leftSiblingIndex > 1;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3;
    const leftRange = range(1, leftItemCount);

    setPaginationRange([...leftRange, DOTS, totalPageCount]);
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3;
    const rightRange = range(
      totalPageCount - rightItemCount + 1,
      totalPageCount
    );
    setPaginationRange([firstPageIndex, DOTS, ...rightRange]);
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    setPaginationRange([
      firstPageIndex,
      DOTS,
      ...middleRange,
      DOTS,
      lastPageIndex,
    ]);
  }
}, [totalItems, itemsPerPage, currentPage]);

if (paginationRange) {
  if (currentPage === 0 || paginationRange.length < 1) {
    return null;
  }
}

const nextPage = () => {
  if (currentPage === totalPageCount) return;
  onPageChange(currentPage + 1);
};

const previousPage = () => {
  if (currentPage === 1) return;
  onPageChange(currentPage - 1);
};

const showingCount =
  props.totalItems > props.itemsPerPage ? props.itemsPerPage : props.totalItems;

const PaginationRoot = styled.div`
  display: flex;
  flex-direction: column;
  .previous {
    display: flex;
    align-items: center;
    cursor: ${currentPage === 1 ? "not-allowed" : "pointer"};
  }
  .forward {
    display: flex;
    align-items: center;
    cursor: ${currentPage === totalPageCount ? "not-allowed" : "pointer"};
  }
  .list {
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    justify-content: center;
    align-items: center;
    color: #93c5fd;
    margin-bottom: 0;
    @media (max-width: 768px) {
      padding-left: 6rem;
      padding-right: 6rem;
      margin-left: 3rem;
    }
  }
  .pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .page-number {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    width: 2rem;
    height: 2rem;
    border: 1px solid transparent;
    color: ${isDarkModeOn ? "#9CA3AF" : "#93C5FD"};
    background-color: ${isDarkModeOn ? "#1F2937" : "#EFF6FF"};
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-duration: 500ms;
    cursor: pointer;

    &:hover {
      background-color: ${isDarkModeOn ? "#374151" : "#DBEAFE"};
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${isDarkModeOn ? "#93C5FD" : "#3B82F6"};
    }
    &.active {
      background-color: ${isDarkModeOn ? "#B91C1C" : "#F87171"};
      color: ${isDarkModeOn ? "#FFF" : "#FFF"};
      border: 1px solid transparent;
      box-shadow: none;
    }
  }
  .showingCount {
    padding-top: 6rem;
    text-align: center;
    color: ${isDarkModeOn ? "#374151" : "#D1D5DB"};
  }
`;
const TablePagination = () => {
  return (
    <PaginationRoot>
      <div className="pagination">
        <div className="previous" onClick={previousPage}>
          <Widget
            src="bos.genadrop.near/widget/Mintbase.MbIcon"
            props={{
              color: `${currentPage === 1 ? "gray-400" : "blue-300"}`,
              size: "24px",
              name: "arrow_back_small",
            }}
          />
        </div>
        {paginationRange && (
          <ul className="list">
            {paginationRange.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return (
                  <li
                    className="page-number p-small-90 md:p-med-90"
                    onClick={() => {
                      if (index > 1) {
                        onPageChange(currentPage + 2);
                      } else {
                        onPageChange(currentPage - 2);
                      }
                    }}
                    key={index}
                  >
                    {DOTS}
                  </li>
                );
              }
              return (
                <li
                  className={`page-number p-med-90 ${
                    pageNumber === currentPage ? "active" : ""
                  }`}
                  onClick={() => onPageChange(pageNumber)}
                  key={index}
                >
                  {pageNumber}
                </li>
              );
            })}
          </ul>
        )}
        <div className="forward" onClick={nextPage}>
          <Widget
            src="bos.genadrop.near/widget/Mintbase.MbIcon"
            props={{
              color: `${
                currentPage === totalPageCount ? "gray-400" : "blue-300"
              }`,
              size: "24px",
              name: "arrow_forward_small",
            }}
          />
        </div>
      </div>
      {hasLabel && (
        <div className="showingCount">
          Showing {showingCount} of {props.totalItems}
        </div>
      )}
    </PaginationRoot>
  );
};

return { TablePagination };
