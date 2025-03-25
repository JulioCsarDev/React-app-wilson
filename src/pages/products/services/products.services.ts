import { api } from "../../../config/axios.instance";

export const GetProducts = async () => {
  try {
    const { data } = await api.get("products/get_all_products");
    return data;
  } catch (error) {
    console.error(error);
  }
};
