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
import { DataTable } from "../../components/datatable/DataTable";
import { useProducts } from "./hooks/useProducts";

export const ProductsPages = () => {
  const { data: Products } = useProducts();
  const table = useReactTable({
    data: Products || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Container>
      <Card tittle="Empleados">
        <DataTable table={table} columns={columns} />
      </Card>
    </Container>
  );
};
