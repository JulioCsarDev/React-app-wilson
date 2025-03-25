import { Link } from "react-router-dom";
import { Container } from "../../components/container/Container";

export const BasePage = () => {
  const modules = [
    {
      id: 1,
      title: " Usuarios",
      path: "/users",
      icon: "people",
    },
    {
      id: 2,
      title: " Empleados",
      path: "/empleados",
      icon: "people",
    },
  ];
  return (
    <Container>
      <h4 className="pb-4">Hola, Bienvenido</h4>
      <div className="d-grid">
        <div className="row">
          {modules.map((item) => (
            <div className="col" key={item.id}>
              <div
                className="card rounded p-3 shadow"
                style={{
                  minHeight: "150px",
                }}
              >
                <Link
                  to={item.path}
                  className="d-flex flex-column h-100 justify-content-between text-decoration-none text-black"
                >
                  <div>
                    <i className={`bi bi-${item.icon} mx-2 fs-3`}></i>
                    <span className="fs-5">{item.title}</span>
                  </div>
                  <div>
                    <span>
                      Este módulo permite gestionar la información de los
                      {item.title} a través de un sistema CRUD (Crear, Leer,
                      Actualizar, Eliminar).
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
