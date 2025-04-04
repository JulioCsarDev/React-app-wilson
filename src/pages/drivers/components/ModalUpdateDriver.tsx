import * as Yup from "yup";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { useUpdateDriver } from "../hooks/UseUpdateDrivers";
import { DriverModel } from "../models/conductor.models"; // Adjust the path as needed

interface Props {
  driver: DriverModel | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ModalUpdateDriver = ({ driver, isOpen, setIsOpen }: Props) => {
  const { mutate: updateMutate } = useUpdateDriver();

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

  const updateFormik = useFormik({
    initialValues: {
      id_conductor: driver?.id_conductor || 0,
      cedula: driver?.cedula || 0,
      nombre_apellido: driver?.nombre_apellido || "",
      cargo: driver?.cargo || "",
      vencimiento_licencia: driver?.vencimiento_licencia || "",
      dias_restantes_licencia: driver?.dias_restantes_licencia || 0,
      comparendos: driver?.comparendos || "",
      acuerdo_pago: driver?.acuerdo_pago || "",
      vencimiento_curso: driver?.vencimiento_curso || "",
      dias_restantes_curso: driver?.dias_restantes_curso || 0,
    },
    validationSchema: DriverSchema,
    onSubmit: async (values) => {
      Swal.fire({
        title: "Actualizar Conductor",
        text: "Se actualizaran los datos ingresados.",
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
          updateMutate(values, {
            onSuccess: () => {
              updateFormik.resetForm();
              setIsOpen(false);
            },
          });
        }
      });
    },
  });

  useEffect(() => {
    if (driver) {
      updateFormik.setFieldValue("id_conductor", driver.id_conductor);
      updateFormik.setFieldValue("cedula", driver.cedula);
      updateFormik.setFieldValue("nombre_apellido", driver.nombre_apellido);
      updateFormik.setFieldValue("cargo", driver.cargo);
      updateFormik.setFieldValue(
        "vencimiento_licencia",
        driver.vencimiento_licencia
          ? new Date(driver.vencimiento_licencia).toISOString().split("T")[0]
          : ""
      );
      updateFormik.setFieldValue(
        "dias_restantes_licencia",
        driver.dias_restantes_licencia
      );
      updateFormik.setFieldValue("comparendos", driver.comparendos);
      updateFormik.setFieldValue("acuerdo_pago", driver.acuerdo_pago);
      updateFormik.setFieldValue(
        "vencimiento_curso",
        driver.vencimiento_curso
          ? new Date(driver.vencimiento_curso).toISOString().split("T")[0]
          : ""
      );
      updateFormik.setFieldValue(
        "dias_restantes_curso",
        driver.dias_restantes_curso
      );
    }
  }, [driver]);

  return (
    <>
      <Modal size="lg" show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Conductor</Modal.Title>
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
                    updateFormik.errors.cedula && updateFormik.touched.cedula
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Cedula"
                  type="text"
                  value={updateFormik.values.cedula}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.cedula && updateFormik.touched.cedula && (
                  <div className="text-danger text-[13px]">
                    <i className="ki-filled ki-information me-1"></i>
                    {updateFormik.errors.cedula}
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
                    updateFormik.errors.nombre_apellido &&
                    updateFormik.touched.nombre_apellido
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Nombre"
                  type="text"
                  value={updateFormik.values.nombre_apellido}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.nombre_apellido &&
                  updateFormik.touched.nombre_apellido && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {updateFormik.errors.nombre_apellido}
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
                    updateFormik.errors.cargo && updateFormik.touched.cargo
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Cargo"
                  type="text"
                  value={updateFormik.values.cargo}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.cargo && updateFormik.touched.cargo && (
                  <div className="text-danger text-[13px]">
                    <i className="ki-filled ki-information me-1"></i>
                    {updateFormik.errors.cargo}
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
                    updateFormik.errors.vencimiento_licencia &&
                    updateFormik.touched.vencimiento_licencia
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder=""
                  type="date"
                  value={updateFormik.values.vencimiento_licencia}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.vencimiento_licencia &&
                  updateFormik.touched.vencimiento_licencia && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {updateFormik.errors.vencimiento_licencia}
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
                    updateFormik.errors.dias_restantes_licencia &&
                    updateFormik.touched.dias_restantes_licencia
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Dias"
                  type="text"
                  value={updateFormik.values.dias_restantes_licencia}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.dias_restantes_licencia &&
                  updateFormik.touched.dias_restantes_licencia && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {updateFormik.errors.dias_restantes_licencia}
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
                    updateFormik.errors.comparendos &&
                    updateFormik.touched.comparendos
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Comparendos"
                  type="text"
                  value={updateFormik.values.comparendos}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.comparendos &&
                  updateFormik.touched.comparendos && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {updateFormik.errors.comparendos}
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
                    updateFormik.errors.acuerdo_pago &&
                    updateFormik.touched.acuerdo_pago
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Acuerdo"
                  type="text"
                  value={updateFormik.values.acuerdo_pago}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.acuerdo_pago &&
                  updateFormik.touched.acuerdo_pago && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {updateFormik.errors.acuerdo_pago}
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
                    updateFormik.errors.vencimiento_curso &&
                    updateFormik.touched.vencimiento_curso
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder=""
                  type="date"
                  value={updateFormik.values.vencimiento_curso}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.vencimiento_curso &&
                  updateFormik.touched.vencimiento_curso && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {updateFormik.errors.vencimiento_curso}
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
                    updateFormik.errors.dias_restantes_curso &&
                    updateFormik.touched.dias_restantes_curso
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder="Dias"
                  type="text"
                  value={updateFormik.values.dias_restantes_curso}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                />
                {updateFormik.errors.dias_restantes_curso &&
                  updateFormik.touched.dias_restantes_curso && (
                    <div className="text-danger text-[13px]">
                      <i className="ki-filled ki-information me-1"></i>
                      {updateFormik.errors.dias_restantes_curso}
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
