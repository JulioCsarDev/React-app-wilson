import { useState } from "react";
import { Modal } from "react-bootstrap";
import { api } from "../../../config/axios.instance";

export const ModalNewUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/users", formData); // Llamada con Axios

      alert("Usuario registrado con éxito");
      console.log(response.data);
    } catch (error) {
      console.error("Error al registrar usuario", error);
      const errorMessage =
        (error as any)?.response?.data?.message ||
        "Hubo un error al registrar el usuario";
      alert(errorMessage);
    }
  };

  return (
    <>
      <button className="btn btn-outline-primary" onClick={openModal}>
        <i className="bi bi-person-fill-add pe-2 fs-5"></i>
        Agregar Usuario
      </button>
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="d-flex justify-content-center p-3"
          >
            <div className="border-none pe-3">
              <label htmlFor="">Usuario</label>
              <input
                placeholder="Usuario"
                name="user"
                onChange={handleChange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="border-none">
              <label htmlFor="">Contraseña</label>
              <input
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
                className="form-control"
                type="password"
              />
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
            type="submit"
            onClick={() => setIsOpen(false)}
          >
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
