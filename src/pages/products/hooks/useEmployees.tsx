import { GetAllEmployees } from "../services/employees.services";
import { useQuery } from "react-query";

export const useEmployees = () => {
  const queryUsers = useQuery({
    queryKey: "employees",
    queryFn: GetAllEmployees,
  });
  return queryUsers;
};
