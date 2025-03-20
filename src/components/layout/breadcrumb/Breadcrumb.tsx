import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<
    { title: string; path: string }[]
  >([]);

  const headerItems = [
    {
      title: "Inicio",
      path: "/",
      icon: "house",
    },
    {
      title: "Usuarios",
      path: "/users",
    },
    {
      title: "Productos",
      path: "/products",
    },
  ];

  useEffect(() => {
    // Determinar la ruta actual
    const pathname = location.pathname;

    // Encontrar la página actual en headerItems
    const currentItem = headerItems.find((item) => item.path === pathname);

    if (pathname === "/") {
      // Si estamos en la página de inicio, solo mostramos "Inicio"
      setCurrentPath([{ title: "Inicio", path: "/" }]);
    } else if (currentItem) {
      // Si es una ruta principal de headerItems
      setCurrentPath([
        { title: "Inicio", path: "/" },
        { title: currentItem.title, path: currentItem.path },
      ]);
    } else {
      // Para rutas anidadas o no definidas en headerItems
      // Dividir la ruta en segmentos
      const segments = pathname.split("/").filter((segment) => segment !== "");

      // Construir el breadcrumb
      const breadcrumbItems = [{ title: "Inicio", path: "/" }];

      let currentPath = "";
      segments.forEach((segment) => {
        currentPath += `/${segment}`;

        // Buscar si este segmento coincide con algún elemento de headerItems
        const matchedItem = headerItems.find(
          (item) => item.path === currentPath
        );

        if (matchedItem) {
          breadcrumbItems.push({
            title: matchedItem.title,
            path: matchedItem.path,
          });
        } else {
          // Si no coincide, capitalizar el segmento y usarlo como título
          const title = segment.charAt(0).toUpperCase() + segment.slice(1);
          breadcrumbItems.push({ title, path: currentPath });
        }
      });

      setCurrentPath(breadcrumbItems);
    }
  }, [location.pathname]);

  return (
    <div className="pt-3">
      <div className="d-flex">
        {currentPath.map((item, index) => (
          <div
            key={item.path}
            className={`${
              index === currentPath.length - 1 ? "is-active" : ""
            } `}
          >
            {index === currentPath.length - 1 ? (
              <Link className="text-decoration-none text-black" to={item.path}>
                {item.title === "Inicio" ? (
                  <>
                    <i className={`bi bi-house mx-2`}></i>
                    <span>{item.title}</span>
                  </>
                ) : (
                  <span>{item.title}</span>
                )}
              </Link>
            ) : (
              <Link className="text-decoration-none text-black" to={item.path}>
                <i className={`bi bi-house mx-2`}></i>
                {item.title}
              </Link>
            )}
            {index < currentPath.length - 1 && (
              <span className="separator m-2">/</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
