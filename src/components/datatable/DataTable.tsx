import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

interface DataTableProps<TData> {
  table: Table<TData>;
  columns: ColumnDef<TData>[];
  footer?: React.ReactNode;
}

export const DataTable = <TData,>({
  table,
  columns,
  footer,
}: DataTableProps<TData>) => {
  return (
    <div className="card-table">
      <table className="table table-striped">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};
