import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

interface Props<TData> {
  table: Table<TData>;
  columns: ColumnDef<TData>[];
  footer?: React.ReactNode;
  nameTable?: string;
  filterGlobal?: React.ReactNode;
}

export default function DataTable<TData>({
  table,
  columns,
  footer,
  nameTable,
  filterGlobal,
}: Props<TData>) {
  return (
    <div className="card ">
      {(nameTable || filterGlobal) && (
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="">{nameTable}</h4>
          <div className="d-flex gap-3">{filterGlobal}</div>
        </div>
      )}
      <div className="card-table">
        <table className="table text-black">
          <thead>
            {table.getHeaderGroups().map((headergroup) => (
              <tr key={headergroup.id}>
                {headergroup.headers.map((header) => (
                  <th key={header.id} className={` px-2`}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <i className="bi bi-arrow-up"></i>,
                            desc: <i className="bi bi-arrow-down"></i>,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </>
                    )}
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
                    <td key={cell.id} className="py-1 px-2">
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
                  <span>No encontrado</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="card-footer">{footer}</div>
      </div>
    </div>
  );
}
