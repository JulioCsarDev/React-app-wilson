import { ColumnDef, flexRender, Table } from "@tanstack/react-table";
import { ReactNode } from "react";

interface DataTableProps<TData> {
  table: Table<TData>;
  columns: ColumnDef<TData>[];
  footer?: React.ReactNode;
  nameTable: string;
  filterGlobal: ReactNode;
}

export const DataTable = <TData,>({
  table,
  columns,
  footer,
  nameTable,
  filterGlobal,
}: DataTableProps<TData>) => {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center bg-white">
        <h4 className="fw-semibold p-2">{nameTable}</h4>
        {filterGlobal}
      </div>
      <div className="card-table">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4"
                    style={{ backgroundColor: '#F8F8F8', fontSize: "14px" }}
                  >
                    <>{header.column.columnDef.header}</>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <div className="card shadow-none p-4">
                    <span>No se encontraron registros</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="card-footer">{footer}</div>
      </div>
    </div>
  );
};
