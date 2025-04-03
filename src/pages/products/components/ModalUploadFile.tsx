import Swal from "sweetalert2";
import { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { queryClient } from "../../../providers";
import { toAbsoluteUrl } from "../../../utils/Assets";
import { UploadFile } from "../services/drivers.services";

export const ModalUploadFile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpdloadFile = () => {
    Swal.fire({
      title: "Subir Archivo",
      text: "Se guardara el archivo seleccionado.",
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Validando archivo...",
            text: "Creando Pedidos, por favor espere un momento.",
            icon: "info",
            allowOutsideClick: false,
            showConfirmButton: false,
            customClass: {
              popup: "max-w-md p-4 bg-white rounded-lg shadow-xl",
              title: "text-base font-bold text-gray-800",
              confirmButton: "btn btn-primary text-sm",
              cancelButton: "btn btn-secondary text-sm",
            },
            didOpen: () => {
              Swal.showLoading();
              document.body.classList.remove(
                "swal2-shown",
                "swal2-height-auto"
              );
            },
          });

          if (selectedFile) {
            await UploadFile(selectedFile);
          }

          setIsOpen(false);
          handleRemoveFile();

          queryClient.invalidateQueries({
            queryKey: ["drivers"],
          });

          Swal.fire({
            title: "Archivo guardado",
            text: "Se registraron los conductores correctamente",
            icon: "success",
            customClass: {
              popup: "max-w-md p-4 bg-white rounded-lg shadow-xl",
              title: "text-xl font-bold text-gray-800",
              confirmButton: "btn btn-primary text-sm",
            },
            didOpen: () => {
              document.body.classList.remove(
                "swal2-shown",
                "swal2-height-auto"
              );
            },
          });
        } catch (error) {
          Swal.fire({
            title: "Error al validar el archivo",
            text: "Verifique el archivo nuevamente",
            icon: "error",
            customClass: {
              popup: "max-w-md p-4 bg-white rounded-lg shadow-xl",
              title: "text-xl font-bold text-gray-800",
              confirmButton: "btn btn-primary text-sm",
            },
            didOpen: () => {
              document.body.classList.remove(
                "swal2-shown",
                "swal2-height-auto"
              );
            },
          });
        }
      }
    });
  };

  return (
    <>
      <button className="btn btn-outline-primary btn-sm" onClick={openModal}>
        <i className="bi bi-folder-plus pe-2 fs-5"></i>
        Subir Archivo
      </button>
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subir Archivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <label
              className={`card ${selectedFile ? "border-success" : ""}`}
              style={{ cursor: "pointer", width: "70%" }}
            >
              <div className="card-body d-flex justify-content-center align-items-center flex-column">
                <img src={toAbsoluteUrl("/media/excelModal.png")} />
                <h4>Lista de Conductores</h4>
                <span>Archivo de Conductores</span>
              </div>
              <input
                className="d-none"
                type="file"
                onChange={(e) => {
                  if (e.target.files) setSelectedFile(e.target.files[0]);
                }}
                accept=".xlsx, .xls"
                ref={fileInputRef}
              />
              {selectedFile && (
                <div className="card-footer bg-success text-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span>{selectedFile.name}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="btn btn-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              )}
            </label>
          </div>
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
            onClick={handleUpdloadFile}
            disabled={!selectedFile}
          >
            Cargar Archivo
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
