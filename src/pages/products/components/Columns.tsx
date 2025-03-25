import { ProductsModel } from "../models/products.models";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProductsModel>[] = [
  {
    accessorKey: "number",
    header: "N°",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "amount",
    header: "Cantidad",
    cell: ({ row }) => row.original.amount,
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => row.original.price,
  },
  {
    accessorKey: "action",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-primary">
            <i className="bi bi-pencil-square"></i>
          </button>
          <button className="btn btn-sm btn-danger">
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      );
    },
  },
];
