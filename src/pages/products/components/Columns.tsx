import { EmployeesModel } from "../models/employees.models";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<EmployeesModel>[] = [
  {
    accessorKey: "number",
    header: "N°",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "CC",
    header: "Cedula",
    cell: ({ row }) => row.original.CC,
  },
  {
    accessorKey: "NOM",
    header: "Nombre",
    cell: ({ row }) => row.original.NOM,
  },
  {
    accessorKey: "CENTRO",
    header: "Centro",
    cell: ({ row }) => row.original.CENTRO,
  },
  {
    accessorKey: "action",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-secondary">
            <i className="bi bi-eye"></i>
          </button>
          <button className="btn btn-sm btn-outline-primary">
            <i className="bi bi-pencil-square"></i>
          </button>
          <button className="btn btn-sm btn-outline-danger">
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      );
    },
  },
];
