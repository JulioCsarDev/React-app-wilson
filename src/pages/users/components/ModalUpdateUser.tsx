import * as Yup from "yup";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { UsersModel } from "../models/users.models";
import { useUpdateUser } from "../hooks/useUpdateUser";

interface Props {
  user: UsersModel | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ModalUpdateUser = ({ user, isOpen, setIsOpen }: Props) => {
  const { mutate: updateMutate } = useUpdateUser();

  const UsersSchema = Yup.object().shape({
    name_surname: Yup.string().required("El Nombre es requerido"),
    email_user: Yup.string().required("El Correo es requerido"),
    pass_user: Yup.string().required("La contraseña es requerida"),
  });

  const updateFormik = useFormik({
    initialValues: {
      id: user?.id || 0,
      name: user?.name_surname || "",
      email: user?.email_user || "",
      password: user?.pass_user || "",
    },
    validationSchema: UsersSchema,
    onSubmit: async (values) => {
      Swal.fire({
        title: "Actualizar Usuario",
        text: "Se guardaran los datos ingresados.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, Actualizar",
        cancelButtonText: "Cancelar",
        customClass: {
          popup: "max-w-md p-4 bg-white rounded-lg shadow-xl",
          title: "text-xl font-bold text-gray-800",
          confirmButton: "btn btn-primary text-sm",
          cancelButton: "btn btn-secondary text-sm",
        },
        didOpen: () => {
          document.body.classList.remove("swal2-shown", "swal2-height-auto");
        },
      }).then((result) => {
        if (result.isConfirmed) {
          updateMutate(
            {
              id: values.id,
              name_surname: values.name,
              email_user: values.email,
              pass_user: values.password,
            },
            {
              onSuccess: () => {
                updateFormik.resetForm();
                setIsOpen(false);
              },
            }
          );
        }
      });
    },
  });

  useEffect(() => {
    updateFormik.setFieldValue("id", user?.id);
    updateFormik.setFieldValue("name", user?.name_surname);
    updateFormik.setFieldValue("email", user?.email_user);
    updateFormik.setFieldValue("password", user?.pass_user);
  }, [user]);

  return (
    <>
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col">
                <label className="form-label mb-2">
                  Nombre
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="name"
                  className={`form-control ${
                    updateFormik.errors.name && updateFormik.touched.name
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Nombre"
                  type="text"
                  value={updateFormik.values.name}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.name && updateFormik.touched.name && (
                  <div className="text-danger text-[13px]">
                    <i className="ki-filled ki-information me-1"></i>
                    {updateFormik.errors.name}
                  </div>
                )}
              </div>

              <div className="col">
                <label className="form-label mb-2">
                  Contraseña
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="password"
                  className={`form-control ${
                    updateFormik.errors.password &&
                    updateFormik.touched.password
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Contraseña"
                  type="text"
                  value={updateFormik.values.password}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.password &&
                  updateFormik.touched.password && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {updateFormik.errors.password}
                    </div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label mb-2">
                  Correo
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="email"
                  className={`form-control ${
                    updateFormik.errors.email && updateFormik.touched.email
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Correo"
                  type="text"
                  value={updateFormik.values.email}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.email && updateFormik.touched.email && (
                  <div className="text-danger text-[13px]">
                    <i className="ki-filled ki-information me-1"></i>
                    {updateFormik.errors.email}
                  </div>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => updateFormik.handleSubmit()}
            disabled={!updateFormik.isValid || !updateFormik.dirty}
          >
            Actualizar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
