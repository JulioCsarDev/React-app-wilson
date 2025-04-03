import * as Yup from "yup";
import Swal from "sweetalert2";
import { useState } from "react";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { useRegisterDriver } from "../hooks/UseRegisterDrivers";

export const ModalNewDriver = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  const { mutate: registerMutate } = useRegisterDriver();

  const DriverSchema = Yup.object().shape({
    cedula: Yup.number().required("La Cédula es requerida"),
    nombre_apellido: Yup.string().required("El Nombre es requerido"),
    cargo: Yup.string().required("El Cargo es requerido"),
    vencimiento_licencia: Yup.string().required("Es requerido"),
    dias_restantes_licencia: Yup.number().required("Es requerido"),
    comparendos: Yup.string().required("Es requerido"),
    acuerdo_pago: Yup.string().required("Es requerido"),
    vencimiento_curso: Yup.string().required("Es requerido"),
    dias_restantes_curso: Yup.number().required("Es requerido"),
  });

  const registerFormik = useFormik({
    initialValues: {
      cedula: undefined,
      nombre_apellido: "",
      cargo: "",
      vencimiento_licencia: "",
      dias_restantes_licencia: undefined,
      comparendos: "",
      acuerdo_pago: "",
      vencimiento_curso: "",
      dias_restantes_curso: undefined,
    },
    validationSchema: DriverSchema,
    onSubmit: async (values) => {
      Swal.fire({
        title: "Registrar Conductor",
        text: "Se guardaran los datos ingresados.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, Guardar",
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
          registerMutate(values, {
            onSuccess: () => {
              registerFormik.resetForm();
              setIsOpen(false);
            },
          });
        }
      });
    },
  });

  return (
    <>
      <button className="btn btn-outline-primary btn-sm" onClick={openModal}>
        <i className="bi bi-person-fill-add pe-2 fs-5"></i>
        Agregar Conductor
      </button>
      <Modal size="lg" show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Conductor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col">
                <label className="form-label mb-2">
                  Cedula
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="cedula"
                  className={`form-control ${
                    registerFormik.errors.cedula &&
                    registerFormik.touched.cedula
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Cedula"
                  type="text"
                  value={registerFormik.values.cedula}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.cedula &&
                  registerFormik.touched.cedula && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {registerFormik.errors.cedula}
                    </div>
                  )}
              </div>
              <div className="col">
                <label className="form-label mb-2">
                  Nombre y Apellido
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="nombre_apellido"
                  className={`form-control ${
                    registerFormik.errors.nombre_apellido &&
                    registerFormik.touched.nombre_apellido
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Nombre"
                  type="text"
                  value={registerFormik.values.nombre_apellido}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.nombre_apellido &&
                  registerFormik.touched.nombre_apellido && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {registerFormik.errors.nombre_apellido}
                    </div>
                  )}
              </div>
              <div className="col">
                <label className="form-label mb-2">
                  Cargo
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="cargo"
                  className={`form-control ${
                    registerFormik.errors.cargo && registerFormik.touched.cargo
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Cargo"
                  type="text"
                  value={registerFormik.values.cargo}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.cargo &&
                  registerFormik.touched.cargo && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {registerFormik.errors.cargo}
                    </div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label mb-2">
                  Fecha Vencimiento Licencia
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="vencimiento_licencia"
                  className={`form-control ${
                    registerFormik.errors.vencimiento_licencia &&
                    registerFormik.touched.vencimiento_licencia
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder=""
                  type="date"
                  value={registerFormik.values.vencimiento_licencia}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.vencimiento_licencia &&
                  registerFormik.touched.vencimiento_licencia && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {registerFormik.errors.vencimiento_licencia}
                    </div>
                  )}
              </div>
              <div className="col">
                <label className="form-label mb-2">
                  Dias restante de Licencia
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="dias_restantes_licencia"
                  className={`form-control ${
                    registerFormik.errors.dias_restantes_licencia &&
                    registerFormik.touched.dias_restantes_licencia
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Dias"
                  type="text"
                  value={registerFormik.values.dias_restantes_licencia}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.dias_restantes_licencia &&
                  registerFormik.touched.dias_restantes_licencia && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {registerFormik.errors.dias_restantes_licencia}
                    </div>
                  )}
              </div>
              <div className="col">
                <label className="form-label mb-2">
                  Comparendos
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="comparendos"
                  className={`form-control ${
                    registerFormik.errors.comparendos &&
                    registerFormik.touched.comparendos
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Comparendos"
                  type="text"
                  value={registerFormik.values.comparendos}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.comparendos &&
                  registerFormik.touched.comparendos && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {registerFormik.errors.comparendos}
                    </div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label mb-2">
                  Acuerdo de Pago
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="acuerdo_pago"
                  className={`form-control ${
                    registerFormik.errors.acuerdo_pago &&
                    registerFormik.touched.acuerdo_pago
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Acuerdo"
                  type="text"
                  value={registerFormik.values.acuerdo_pago}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.acuerdo_pago &&
                  registerFormik.touched.acuerdo_pago && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {registerFormik.errors.acuerdo_pago}
                    </div>
                  )}
              </div>
              <div className="col">
                <label className="form-label mb-2">
                  Fecha Vencimiento del Curso
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="vencimiento_curso"
                  className={`form-control ${
                    registerFormik.errors.vencimiento_curso &&
                    registerFormik.touched.vencimiento_curso
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder=""
                  type="date"
                  value={registerFormik.values.vencimiento_curso}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.vencimiento_curso &&
                  registerFormik.touched.vencimiento_curso && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {registerFormik.errors.vencimiento_curso}
                    </div>
                  )}
              </div>
              <div className="col">
                <label className="form-label mb-2">
                  Dias restantes del curso
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="dias_restantes_curso"
                  className={`form-control ${
                    registerFormik.errors.dias_restantes_curso &&
                    registerFormik.touched.dias_restantes_curso
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Dias"
                  type="text"
                  value={registerFormik.values.dias_restantes_curso}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.errors.dias_restantes_curso &&
                  registerFormik.touched.dias_restantes_curso && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {registerFormik.errors.dias_restantes_curso}
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
