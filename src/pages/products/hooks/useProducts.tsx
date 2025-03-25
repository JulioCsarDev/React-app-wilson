import { GetProducts } from "../services/products.services";
import { useQuery } from "react-query";

export const useProducts = () => {
  const queryUsers = useQuery({
    queryKey: "products",
    queryFn: GetProducts,
  });
  return queryUsers;
};
