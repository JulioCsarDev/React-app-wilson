import { UsersModel } from "../models/users.models";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UsersModel>[] = [
  {
    accessorKey: "number",
    header: "N°",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "user",
    header: "Usuario",
    cell: ({ row }) => row.original.user,
  },
  {
    accessorKey: "password",
    header: "Contraseña",
    cell: ({ row }) => row.original.password,
  },
  {
    accessorKey: "action",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary">
            <i className="bi bi-pencil-square"></i> Editar
          </button>
          <button className="btn btn-sm btn-outline-danger">
            <i className="bi bi-trash3"></i> Eliminar
          </button>
        </div>
      );
    },
  },
];
