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
  },
  {
    accessorKey: "amount",
    header: "Cantidad",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "action",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary">Editar</button>
          <button className="btn btn-sm btn-outline-danger">Eliminar</button>
        </div>
      );
    },
  },
];
