const TablePagination = ({
  onPageChange,
  currentPage,
  itemsPerPage,
  totalItems,
  notInTable,
  isDarkModeOn,
}) => {
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

  const nextPage = () => {
    if (currentPage === totalPageCount) return;
    onPageChange(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  const showingCount = Math.min(props.itemsPerPage, props.totalItems) || 0;

  const PaginationRoot = styled.div`
    display: flex;
    flex-direction: ${notInTable ? "column-reverse" : "space-between"};
    justify-content: ${notInTable ? "center" : "space-between"};
    align-items: center;
    width: 100%;
    padding: 1rem 0;
    @media only screen and (max-width: 768px) {
      flex-direction: column-reverse;
      padding: 1rem 0;
      gap: 1rem;
    }
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
        padding-left: 1.5rem;
        padding-right: 1.5rem;
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
      font-weight: 500;
      width: 2rem;
      height: 2rem;
      margin: 0 0.25rem;
      border: 1px solid transparent;
      color: ${isDarkModeOn ? "#c5d0ff" : "#4758a3"};
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
        color: ${isDarkModeOn ? "#Ff2424" : "#Ff2424"};
        background-color: ${isDarkModeOn ? "#3a1c2a" : "#Ffdede"};
        border: 1px solid transparent;
        box-shadow: none;
      }
    }
    .showingCount {
      padding-top: 1rem;
      font-weight: ${notInTable ? "normal" : "500"};
      text-align: center;
      font-size: ${notInTable ? ".8rem" : "1rem"};
      color: ${isDarkModeOn
        ? notInTable
          ? "#b3b5bd"
          : "#fff"
        : notInTable
        ? "#404252"
        : "#eeeee"};
      flex: 1;
    }
  `;

  return (
    <PaginationRoot>
      {/* {!notInTable && ( */}
      <div className="showingCount">
        {notInTable ? "showing" : ""} {showingCount} of {props.totalItems || 0}
      </div>
      {/* )} */}
      {props.totalItems !== 0 && (
        <div className="pagination">
          <div className="previous" onClick={previousPage}>
            <i
              className="bi bi-chevron-left"
              style={{
                color: `${isDarkModeOn ? "#fff" : "blue-300"}`,
                opacity: `${currentPage === 1 ? 0.5 : 1}`,
                fontSize: "14px",
                fontWeight: "700",
              }}
            ></i>
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
            <i
              className="bi bi-chevron-right"
              style={{
                color: `${isDarkModeOn ? "#fff" : "blue-300"}`,
                opacity: `${currentPage === totalPageCount ? 0.5 : 1}`,
                fontSize: "14px",
                fontWeight: "bold",
              }}
            ></i>
          </div>
        </div>
      )}
    </PaginationRoot>
  );
};

return <TablePagination {...props} />;
