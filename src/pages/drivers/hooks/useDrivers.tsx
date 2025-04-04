import { GetAllDrivers } from "../services/drivers.services";
import { useQuery } from "react-query";

export const useDrivers = () => {
  const queryDrivers = useQuery({
    queryKey: "drivers",
    queryFn: GetAllDrivers,
  });
  return queryDrivers;
};
