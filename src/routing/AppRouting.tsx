import { ReactElement, useEffect, useState } from "react";
import { AppRoutingSetup } from "./AppRoutingSetup";
import { useLocation } from "react-router";

export const AppRouting = (): ReactElement => {
  const [previousLocation, setPreviousLocation] = useState("");
  const location = useLocation();
  const path = location.pathname.trim();
  const init = () => {
    setPreviousLocation(path);
    if (path === previousLocation) {
      setPreviousLocation("");
    }
  };
  useEffect(() => {
    init();
  }, [location]);

  return <AppRoutingSetup />;
};
