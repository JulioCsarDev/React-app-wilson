import { Footer } from "../Footer";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { Outlet } from "react-router";

export const Main = () => {
  return (
    <div className="d-flex flex-row" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="container-fluid d-flex flex-column justify-content-between">
        <div>
          <Header />
          <div>
            <Outlet />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Footer />
        </div>
      </div>
    </div>
  );
};
