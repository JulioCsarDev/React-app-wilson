import { toast } from 'sonner';
import { useMutation } from "react-query";
import { queryClient } from '../../../providers';
import { RegisterNewUser } from "../services/users.services";

export const useRegisterUser = () => {
    const mutation = useMutation({
        mutationFn: RegisterNewUser,

        onMutate: () => {
            toast.loading('Registrando Usuario', {
                description: 'Por favor espere un momento',
            });
        },
        onSuccess: () => {
            toast.dismiss();
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            toast.success('✅ ¡Usuario Registrado!', {
                description: 'El usuario fue registrado correctamente'
            });
        },
        onError: (error: any) => {
            toast.dismiss();
            // Verifica si el error es un objeto con la propiedad 'response'
            let errorMessage = 'Error al registrar el usuario';

            if (error?.response?.data?.detail) {
                // Si existe 'response' y 'detail', accede al detalle del error
                errorMessage = error.response.data.detail;
            } else if (error?.message) {
                // Si el error tiene un mensaje general, usa ese mensaje
                errorMessage = error.message;
            }

            toast.error('❌ Ha Ocurrido un Error', {
                description: errorMessage
            });
        }
    });

    return mutation;
};