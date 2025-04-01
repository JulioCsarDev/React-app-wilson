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
      title: " Conductores",
      path: "/conductores",
      icon: "people",
    },
    {
      id: 3,
      title: " Vehiculos",
      path: "/conductores",
      icon: "car-front-fill",
    },
  ];
  return (
    <Container>
      <h4 className="pb-4">Hola, Bienvenido</h4>
      <div className="d-grid">
        <div className="row">
          {modules.map((item) => (
            <Link
              to={item.path}
              className="col card-hover text-decoration-none"
              key={item.id}
            >
              <div
                className="card rounded p-3 shadow"
                style={{
                  minHeight: "150px",
                }}
              >
                <div className="d-flex flex-column h-100 justify-content-between text-black">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};
