import { Link } from "react-router";
import { toAbsoluteUrl } from "../../utils/Assets";

export const Sidebar = () => {
  const menuItems = [
    {
      id: 1,
      title: "Inicio",
      path: "/",
      icon: "house",
    },
    {
      id: 2,
      title: "Usuarios",
      path: "/users",
      icon: "people",
    },
    {
      id: 3,
      title: "Empleados",
      path: "/empleados",
      icon: "people",
    },
  ];

  return (
    <div
      className="d-flex justify-content-between flex-column bg-dark"
      style={{ width: "200px" }}
    >
      <div style={{ height: "100%" }}>
        <div className="d-flex px-3 pt-3 text-white" style={{ height: "15%" }}>
          <img
            style={{ height: "100px", width: "200px" }}
            src={toAbsoluteUrl("/media/logo.png")}
          />
        </div>
        <div className="d-flex flex-column pt-4" style={{ height: "85%" }}>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="d-flex text-decoration-none text-white fs-4 mx-2 my-2 p-2 hover-success"
              style={{}}
            >
              <i className={`bi bi-${item.icon} mx-2`}></i>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center pb-2">
        <button className="btn btn-outline-secondary text-white">
          <i className="bi bi-box-arrow-right pe-2"></i>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
