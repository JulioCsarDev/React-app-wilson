import Swal from "sweetalert2";
import { useDeleteDriver } from "../hooks/useDeleteDriver";

export const DeleteDriver = ({ id_conductor }: { id_conductor: number }) => {
  const { mutate: deleteMutate } = useDeleteDriver();

  const handleDelete = () => {
    Swal.fire({
      title: "Eliminar Conductor",
      text: "Se eliminara el conductor seleccionado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "max-w-md p-4 bg-white rounded-lg shadow-xl",
        title: "text-xl font-bold text-gray-800",
        confirmButton: "btn btn-danger text-sm",
        cancelButton: "btn btn-secondary text-sm",
      },
      didOpen: () => {
        document.body.classList.remove("swal2-shown", "swal2-height-auto");
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutate(id_conductor);
      }
    });
  };

  return (
    <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
      <i className="bi bi-trash3"></i>
    </button>
  );
};
