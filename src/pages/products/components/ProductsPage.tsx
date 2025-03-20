import { Container } from "../../../components/container/Container";
import Card from "../../../components/layout/Card";
import DataTable from "../../../components/datatable/DataTable";
import { columns } from "./Columns";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import Pagination from "../../../components/paginator/Paginator";

export const ProductsPages = () => {
  const Products = [
    {
      name: "Producto 1",
      amount: 10,
      price: 100,
    },
    {
      name: "Producto 2",
      amount: 20,
      price: 200,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 4",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 5",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 6",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 7",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
    {
      name: "Producto 3",
      amount: 30,
      price: 300,
    },
  ];
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
      <Card tittle="Productos">
        <DataTable
          table={table}
          columns={columns}
          footer={<Pagination table={table} />}
        />
      </Card>
    </Container>
  );
};
