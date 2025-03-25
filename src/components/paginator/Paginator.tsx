import { Fragment } from "react";
import { Table } from "@tanstack/react-table";

interface Props<T> {
  table: Table<T>;
}

export default function Pagination<T>({ table }: Props<T>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getRowCount();
  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);
  // Replace placeholders in paginationsInfo
  const pageCount = table.getPageCount();
  const paginationMoreLimit = 5;
  const currentGroupStart =
    Math.floor(pageIndex / paginationMoreLimit) * paginationMoreLimit;
  const currentGroupEnd = Math.min(
    currentGroupStart + paginationMoreLimit,
    pageCount
  );
  const renderPageButtons = () => {
    const buttons = [];
    for (let i = currentGroupStart; i < currentGroupEnd; i++) {
      buttons.push(
        <button
          key={i}
          type="button"
          className={`btn ${pageIndex === i ? "active" : ""} btn-sm`}
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };
  const renderEllipsisPrevButton = () => {
    if (currentGroupStart > 0) {
      return (
        <button
          type="button"
          className="btn"
          onClick={() => table.setPageIndex(currentGroupStart - 1)}
        >
          ...
        </button>
      );
    }
    return null; // No ellipsis needed if we're in the first group
  };
  const renderEllipsisNextButton = () => {
    if (currentGroupEnd < pageCount) {
      return (
        <button
          type="button"
          className="btn"
          onClick={() => table.setPageIndex(currentGroupEnd)}
        >
          ...
        </button>
      );
    }
    return null; // No ellipsis needed if we're in the last group
  };
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center gap-1">
        Mostrando
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="select"
          name="perpage"
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>{" "}
        registros por página
      </div>

      <div className="d-flex align-items-center gap-4">
        <span>
          {from} - {to} de {totalRows}
        </span>
        <div className="pagination d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          {renderEllipsisPrevButton()}
          <Fragment>{renderPageButtons()}</Fragment>
          {renderEllipsisNextButton()}
          <button
            className="btn btn-sm"
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
