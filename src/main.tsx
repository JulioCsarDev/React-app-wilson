import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/style.css";
import "../public/css/my_style.css";
import "../public/css/file.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { ProvidersWrapper } from "./providers/ProvidersWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProvidersWrapper>
      <App />
    </ProvidersWrapper>
  </React.StrictMode>
);
