import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useState } from "react";
import { useFormik } from 'formik';
import { Modal } from "react-bootstrap";
import { useRegisterUser } from '../hooks/useRegisterUser';


export const ModalNewUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  const { mutate: registerMutate } = useRegisterUser();

  const UsersSchema = Yup.object().shape({
    name: Yup.string().required('El Nombre es requerido'),
    email: Yup.string().required('El Correo es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  const registerFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: UsersSchema,
    onSubmit: async (values) => {
      Swal.fire({
        title: 'Registrar Usuario',
        text: 'Se guardaran los datos ingresados.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, Guardar',
        cancelButtonText: 'Cancelar',
        customClass: {
          popup: 'max-w-md p-4 bg-white rounded-lg shadow-xl',
          title: 'text-xl font-bold text-gray-800',
          confirmButton: 'btn btn-primary text-sm',
          cancelButton: 'btn btn-secondary text-sm'
        },
        didOpen: () => {
          document.body.classList.remove('swal2-shown', 'swal2-height-auto');
        }
      }).then((result) => {
        if (result.isConfirmed) {
          registerMutate(values, {
            onSuccess: () => {
              registerFormik.resetForm();
              setIsOpen(false)
            }
          });
        }
      });
    },
  });

  return (
    <>
      <button className="btn btn-outline-primary btn-sm" onClick={openModal}>
        <i className="bi bi-person-fill-add pe-2 fs-5"></i>
        Agregar Usuario
      </button>
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Usuario</Modal.Title>
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
                  className={`form-control ${registerFormik.errors.name && registerFormik.touched.name ? 'border-danger' : ''}`}
                  placeholder="Nombre"
                  type="text"
                  value={registerFormik.values.name}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.name && registerFormik.touched.name && (
                  <div className="text-danger text-[13px]">
                    <i className="ki-filled ki-information me-1"></i>
                    {registerFormik.errors.name}
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
                  className={`form-control ${registerFormik.errors.password && registerFormik.touched.password ? 'border-danger' : ''}`}
                  placeholder="Correo"
                  type="text"
                  value={registerFormik.values.password}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.password && registerFormik.touched.password && (
                  <div className="text-danger text-[13px]">
                    <i className="ki-filled ki-information me-1"></i>
                    {registerFormik.errors.password}
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
                  className={`form-control ${registerFormik.errors.email && registerFormik.touched.email ? 'border-danger' : ''}`}
                  placeholder="Correo"
                  type="text"
                  value={registerFormik.values.email}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.email && registerFormik.touched.email && (
                  <div className="text-danger text-[13px]">
                    <i className="ki-filled ki-information me-1"></i>
                    {registerFormik.errors.email}
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
            onClick={() => registerFormik.handleSubmit()}
            disabled={!registerFormik.isValid || !registerFormik.dirty}
          >
            Registrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
