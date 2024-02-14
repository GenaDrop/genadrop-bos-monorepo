const customStyles = props.customStyles;
const headerProps = props.headerProps;
const loading = props.loading;
const bodyProps = props.bodyProps ?? [];
const mode = props.mode || Storage.get("mode");
const colsAmount = props.colsAmount || 5;
const cols = Array.from(Array(colsAmount).keys());
const hasLabel = props.hasLabel;

const isDarkModeOn = mode === "dark";

const TableRoot = styled.div`
  background: ${isDarkModeOn ? "var(--gray-850)" : "white"};
  .title {
    padding: 1rem;
    border-bottom-width: 1px;
    border-color: ${isDarkModeOn ? "#1F2937" : "#E5E7EB"};
    color: ${isDarkModeOn ? "#FFF" : "#000"};
  }
  .totalItems {
    align-text: center;
    @media (max-width: 768px) {
      display: block;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
      justify-content: flex-end;
    }
  }
  .footer {
    display: flex;
    flex-direction: row;
    padding-top: 1rem;
    padding-bottom: 1rem;
    align-items: center;
    border-top-width: 1px;
    border-color: ${isDarkModeOn ? "#1F2937" : "#E5E7EB"};
    @media (max-width: 768px) {
      padding-top: 6rem;
      padding-bottom: 6rem;
      padding-left: 6rem;
      padding-right: 6rem;
    }
  }
  ${customStyles}
`;

const TableContent = styled.div`
  overflow: auto;
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3rem;
  }
  tr {
    border-bottom-width: 1px;
    border-color: ${isDarkModeOn ? "#1F2937" : "#E5E7EB"};
  }
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3rem;
    padding-right: 3rem;
    color: ${isDarkModeOn ? "#FFF" : "#000"};
  }
  table {
    width: 100%;
  }
  thead {
    border-bottom-width: 2px;
    border-color: #e5e7eb;
    text-align: left;
    color: #374151;
    width: 100%;
  }
  tbody {
    color: ${isDarkModeOn ? "#FFF" : "#000"};
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    }
    .bodyContent {
      border-radius: 0.25rem;
      width: 9rem;
      height: 1rem;
      background-color: #6b7280;
      @media (max-width: 950px) {
        width: auto;
      }
    }
  }
`;

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
const [items, setItems] = useState([]);

const handle = (newPage) => {
  setCurrentPage(newPage);
};

useEffect(() => {
  setItems(
    bodyProps.slice(
      currentPage > 1
        ? currentPage > 2
          ? currentPage * itemsPerPage
          : itemsPerPage
        : 0,
      currentPage > 1 ? currentPage * itemsPerPage + itemsPerPage : itemsPerPage
    )
  );
}, [currentPage, itemsPerPage]);

return (
  <TableRoot>
    <div className="title">{props.title ?? null}</div>
    <TableContent>
      <table>
        <thead>{headerProps}</thead>
        <tbody>
          {loading
            ? Array.from(Array(5).keys()).map((_, i) => (
                <tr className="animate-pulse" key={`row-${i}`}>
                  {cols.map((_, i) => (
                    <td key={`col-${i}`}>
                      <div className="bodyContent"></div>
                    </td>
                  ))}
                </tr>
              ))
            : items}
        </tbody>
      </table>
    </TableContent>
    <div className="footer">
      <div className="totalItems">
        {itemsPerPage * currentPage < bodyProps.length
          ? `1 - ${itemsPerPage}`
          : bodyProps?.length}{" "}
        of {bodyProps.length}
      </div>
      <div className="pagination">
        <Widget
          src="bos.genadrop.near/widget/Mintbase.TablePagination"
          props={{
            onPageChange: handle,
            currentPage,
            itemsPerPage,
            totalItems: bodyProps?.length,
            hasLabel,
          }}
        />
      </div>
    </div>
  </TableRoot>
);
