import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { columns } from "./components/Columns";
import Card from "../../components/layout/Card";
import { UsersModel } from "./models/users.models";
import { ModalNewUser } from "./components/ModalNewUser";
import Pagination from "../../components/paginator/Paginator";
import { DataTable } from "../../components/datatable/DataTable";
import { Container } from "../../components/container/Container";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { ModalUpdateUser } from "./components/ModalUpdateUser";

export const UsersPage = () => {
  const { data: Users } = useUsers();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const [selectedUser, setSelectedUser] = useState<UsersModel | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleClickEdit = (userId: UsersModel) => {
    setSelectedUser(userId);
    setIsOpen(true);
  };

  const table = useReactTable({
    data: Users || [],
    columns: columns({ handleClickEdit }),
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
          columns={columns({ handleClickEdit })}
          nameTable="Lista de Usuarios"
          footer={<Pagination table={table} />}
          filterGlobal={
            <div className="input-group w-25">
              <div className="input-group-prepend">
                <span className="input-group-text">
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
      <ModalUpdateUser
        user={selectedUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Container>
  );
};
