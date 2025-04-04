import { Modal } from "react-bootstrap";
import { DriverModel } from "../models/conductor.models";
import { toAbsoluteUrl } from "../../../utils";

interface Props {
  driver: DriverModel | null;
  isOpenModalDetail: boolean;
  setIsOpenModalDetail: (isOpenModalDetail: boolean) => void;
}

export const ModalDetailDriver = ({
  driver,
  isOpenModalDetail,
  setIsOpenModalDetail,
}: Props) => {
  return (
    <Modal
      size="lg"
      show={isOpenModalDetail}
      onHide={() => setIsOpenModalDetail(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Informacion Conductor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card rounded">
          <div className="card-body">
            <div className="row">
              <div className="col d-flex p-2 justify-content-between mx-4">
                <div className="d-flex gap-3">
                  <img
                    src={toAbsoluteUrl("/media/user_blank.png")}
                    style={{ width: "64px", height: "64px" }}
                  />
                  <h5 className="d-flex align-items-end">
                    {driver?.nombre_apellido &&
                      driver.nombre_apellido
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </h5>
                </div>
                <div>
                  <img
                    src={toAbsoluteUrl("/media/logo.png")}
                    style={{ width: "100px", height: "70px" }}
                  />
                </div>
              </div>
            </div>
            <hr className="m-2"></hr>
            <div className="row">
              <div className="col w-100">
                <ul className="list-group list-group-flush border-bottom">
                  <li className="list-group-item p-4 ">
                    <strong className="">Cedula:</strong> {""}
                    {driver?.cedula}
                  </li>
                </ul>
              </div>
              <div className="col w-100">
                <ul className="list-group list-group-flush border-bottom">
                  <li className="list-group-item p-4">
                    <strong className="">Cargo:</strong> {""}
                    {driver?.cargo}
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col w-100">
                <ul className="list-group list-group-flush border-bottom">
                  <li className="list-group-item p-4 ">
                    <strong className="">Fecha Vigencia Licencia:</strong>{" "}
                    {driver?.vencimiento_licencia &&
                      new Date(
                        driver.vencimiento_licencia
                      ).toLocaleDateString()}
                  </li>
                </ul>
              </div>
              <div className="col w-100">
                <ul className="list-group list-group-flush border-bottom">
                  <li className="list-group-item p-4 ">
                    <strong className="">Dias Vigentes Licencia:</strong> {""}
                    {driver?.dias_restantes_licencia}
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col w-100">
                <ul className="list-group list-group-flush border-bottom">
                  <li className="list-group-item p-4 ">
                    <strong className="">Comparendos:</strong>{" "}
                    {driver?.comparendos}
                  </li>
                </ul>
              </div>
              <div className="col w-100">
                <ul className="list-group list-group-flush border-bottom">
                  <li className="list-group-item p-4 ">
                    <strong className="">Acuerdo de Pago:</strong> {""}
                    {driver?.acuerdo_pago}
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col w-100">
                <ul className="list-group list-group-flush border-bottom">
                  <li className="list-group-item p-4">
                    <strong className="">Fecha Vigencia Curso:</strong>{" "}
                    {driver?.vencimiento_curso &&
                      new Date(
                        driver.vencimiento_licencia
                      ).toLocaleDateString()}
                  </li>
                </ul>
              </div>
              <div className="col w-100">
                <ul className="list-group list-group-flush border-bottom">
                  <li className="list-group-item p-4">
                    <strong className="">Dias Vigentes Curso:</strong> {""}
                    {driver?.dias_restantes_curso}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setIsOpenModalDetail(false)}
        >
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};
