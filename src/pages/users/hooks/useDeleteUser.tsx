import { toast } from "sonner";
import { useMutation } from "react-query";
import { queryClient } from "../../../providers";
import { DeleteUser } from "../services/users.services";

export const useDeleteUser = () => {
  const mutation = useMutation({
    mutationFn: DeleteUser,

    onMutate: () => {
      toast.loading("Eliminando Usuario", {
        description: "Por favor espere un momento",
      });
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("✅ ¡Usuario Eliminado!", {
        description: "El usuario fue eliminado correctamente",
      });
    },
    onError: (error: any) => {
      toast.dismiss();
      // Verifica si el error es un objeto con la propiedad 'response'
      let errorMessage = "Error al eliminado el usuario";

      if (error?.response?.data?.detail) {
        // Si existe 'response' y 'detail', accede al detalle del error
        errorMessage = error.response.data.detail;
      } else if (error?.message) {
        // Si el error tiene un mensaje general, usa ese mensaje
        errorMessage = error.message;
      }

      toast.error("❌ Ha Ocurrido un Error", {
        description: errorMessage,
      });
    },
  });

  return mutation;
};
