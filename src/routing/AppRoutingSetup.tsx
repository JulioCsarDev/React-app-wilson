import { ReactElement } from "react";
import { Route, Routes } from "react-router";
import { Main } from "../components/layout/main/Main";
import { BasePage } from "../pages/base/BasePage";
import { UsersPage } from "../pages/users/UsersPage";
import { ProductsPages } from "../pages/products/ProductsPage";

export const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<BasePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/empleados" element={<ProductsPages />} />
      </Route>
    </Routes>
  );
};
