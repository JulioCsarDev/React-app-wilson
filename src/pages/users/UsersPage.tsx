import { DataTable } from "../../components/datatable/DataTable";
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
import { useUsers } from "./hooks/useUsers";
import { useState } from "react";
import { ModalNewUser } from "./components/ModalNewUser";

export const UsersPage = () => {
  const { data: Users } = useUsers();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: Users || [],
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
      <Card tittle="Usuarios" toolbar={<ModalNewUser />}>
        <DataTable
          table={table}
          columns={columns}
          nameTable="Lista de Usuarios"
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
