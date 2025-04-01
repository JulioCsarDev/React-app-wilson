import { DeleteUser } from "./DeleteUser";
import { ColumnDef } from "@tanstack/react-table";
import { UsersModel } from "../models/users.models";

interface ColumnsProps {
  handleClickEdit: (user: UsersModel) => void;
}

export const columns = ({
  handleClickEdit,
}: ColumnsProps): ColumnDef<UsersModel>[] => [
  {
    accessorKey: "number",
    header: "N°",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "user",
    header: "Usuario",
    cell: ({ row }) => row.original.name_surname,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email_user,
  },
  {
    accessorKey: "password",
    header: "Contraseña",
    cell: ({ row }) => row.original.pass_user,
  },
  {
    accessorKey: "created_user",
    header: "Fecha creación",
    cell: ({ row }) => {
      const date = new Date(row.original.created_user);
      return date.toLocaleDateString("es-ES", {});
    },
  },
  {
    accessorKey: "action",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => handleClickEdit(row.original)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <DeleteUser userId={row.original.id} />
        </div>
      );
    },
  },
];
