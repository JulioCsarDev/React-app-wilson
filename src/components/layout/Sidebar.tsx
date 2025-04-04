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
      title: "Conductores",
      path: "/conductores",
      icon: "people",
    },
    {
      id: 4,
      title: "Vehiculos",
      path: "/vehiculos",
      icon: "car-front-fill",
    },
    {
      id: 5,
      title: "Reportes",
      path: "/download_file_employees",
      icon: "file-earmark-arrow-down",
    },
  ];

  return (
    <div
      className="d-flex justify-content-between flex-column darky"
      style={{ width: "300px" }}
    >
      <div style={{ height: "100%", position: "fixed" }}>
        <div className="d-flex px-3 pt-3 text-white" style={{ height: "14%" }}>
          <img
            style={{ height: "100px", width: "200px" }}
            src={toAbsoluteUrl("/media/logo.png")}
          />
        </div>
        <div className="d-flex flex-column pt-4" style={{ height: "80%" }}>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="d-flex text-decoration-none text-white mx-2 my-2 p-2"
              style={{}}
            >
              <i className={`bi bi-${item.icon} mx-2`}></i>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "6%" }}
        >
          <button className="btn btn-outline-secondary text-white btn-hover-danger">
            <i className="bi bi-box-arrow-right pe-2"></i>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
