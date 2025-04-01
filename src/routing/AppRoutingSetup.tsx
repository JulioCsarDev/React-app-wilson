import { ReactElement } from "react";
import { Route, Routes } from "react-router";
import { Main } from "../components/layout/main/Main";
import { BasePage } from "../pages/base/BasePage";
import { UsersPage } from "../pages/users/UsersPage";
import { ConductoresPage } from "../pages/products/ConductoresPage";
import { VehiculosPage } from "../pages/vehiculos/VehiculosPages";

export const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<BasePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/conductores" element={<ConductoresPage />} />
        <Route path="/vehiculos" element={<VehiculosPage />} />
      </Route>
    </Routes>
  );
};
