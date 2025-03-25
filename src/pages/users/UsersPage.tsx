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
} from "@tanstack/react-table";
import { useUsers } from "./hooks/useUsers";

export const UsersPage = () => {
  const { data: Users } = useUsers();
  const table = useReactTable({
    data: Users || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <Container>
      <Card tittle="Usuarios">
        <DataTable table={table} columns={columns} />
      </Card>
    </Container>
  );
};
