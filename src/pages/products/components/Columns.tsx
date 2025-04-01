import { ConductorModel } from "../models/conductor.models";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ConductorModel>[] = [
  {
    accessorKey: "number",
    header: "N°",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "numero_identificacion",
    header: "Cedula",
    cell: ({ row }) => row.original.numero_identificacion,
  },
  {
    accessorKey: "nombre_conductor",
    header: "Nombre",
    cell: ({ row }) => row.original.nombre_conductor,
  },
  {
    accessorKey: "apellido_conductor",
    header: "Apellido",
    cell: ({ row }) => row.original.apellido_conductor,
  },
  {
    accessorKey: "cargo",
    header: "Cargo",
    cell: ({ row }) => row.original.cargo,
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
