import { ReactElement } from "react";
import { Route, Routes } from "react-router";
import { Main } from "../components/layout/main/Main";
import { BasePage } from "../pages/base/BasePage";
import { UsersPage } from "../pages/users/components/UsersPage";
import { ProductsPages } from "../pages/products/components/ProductsPage";

export const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<BasePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/products" element={<ProductsPages />} />
      </Route>
    </Routes>
  );
};
