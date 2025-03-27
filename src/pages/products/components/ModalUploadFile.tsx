import { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../utils/Assets";

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

  return (
    <>
      <button className="btn btn-outline-primary" onClick={openModal}>
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
                <h4>Lista de Empleados</h4>
                <span>Archivo de Empleados</span>
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
          <button className="btn btn-primary" onClick={() => setIsOpen(false)}>
            Subir
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
