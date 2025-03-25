import { GetUsers } from "../services/users.services";
import { useQuery } from "react-query";

export const useUsers = () => {
  const queryUsers = useQuery({
    queryKey: "users",
    queryFn: GetUsers,
  });
  return queryUsers;
};
