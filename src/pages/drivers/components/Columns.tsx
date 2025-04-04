import { DriverModel } from "../models/conductor.models";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteDriver } from "./DeleteDriver";

interface ColumnsProps {
  handleClickEdit: (driver: DriverModel) => void;
}

export const columns = ({
  handleClickEdit,
}: ColumnsProps): ColumnDef<DriverModel>[] => [
  {
    accessorKey: "number",
    header: "N°",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "numero_identificacion",
    header: "Cedula",
    cell: ({ row }) => row.original.cedula,
  },
  {
    accessorKey: "nombre_apellido",
    header: "Nombre y Apelldio",
    cell: ({ row }) => row.original.nombre_apellido,
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
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => handleClickEdit(row.original)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          {row.original.id_conductor !== undefined && (
            <DeleteDriver id_conductor={row.original.id_conductor} />
          )}
        </div>
      );
    },
  },
];
