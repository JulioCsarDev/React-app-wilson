import { Container } from "../../components/container/Container";
import Card from "../../components/layout/Card";
import { columns } from "./components/Columns";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { DataTable } from "../../components/datatable/DataTable";
import { useEmployees } from "./hooks/useEmployees";
import Pagination from "../../components/paginator/Paginator";
import { useState } from "react";
import { ModalUploadFile } from "./components/ModalUploadFile";

export const ConductoresPage = () => {
  const { data: Employees } = useEmployees();

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: Employees || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  return (
    <Container>
      <Card tittle="Conductores" toolbar={<ModalUploadFile />}>
        <DataTable
          table={table}
          columns={columns}
          footer={<Pagination table={table} />}
          nameTable="Lista de Conductores"
          filterGlobal={
            <div className="input-group w-25">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search"></i>
                </span>
              </div>
              <input
                className="form-control"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Buscar"
              />
            </div>
          }
        />
      </Card>
    </Container>
  );
};
