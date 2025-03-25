import { api } from "../../../config/axios.instance";

export const GetUsers = async () => {
  try {
    const { data } = await api.get("users/get_all_users");
    return data;
  } catch (error) {
    console.error(error);
  }
};
