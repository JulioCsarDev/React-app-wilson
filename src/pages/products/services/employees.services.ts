import { api } from "../../../config/axios.instance";

export const GetAllEmployees = async () => {
  try {
    const { data } = await api.get("/employees/get_all_employees");
    return data;
  } catch (error) {
    console.error(error);
  }
};
