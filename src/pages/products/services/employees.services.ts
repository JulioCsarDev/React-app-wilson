import { api } from "../../../config/axios.instance";

export const GetAllEmployees = async () => {
  const { data } = await api.get("/employees/get_all_employees");
  return data;
};

export const UploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/employees/upload_file", formData);
  return data;
}
