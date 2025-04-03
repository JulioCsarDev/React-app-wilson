import { api } from "../../../config/axios.instance";
import { RegisterDriverModel } from "../models/conductor.models";

export const GetAllDrivers = async () => {
  const { data } = await api.get("/drivers/get_all_drivers");
  return data;
};

export const RegisterNewDriver = async (driver: RegisterDriverModel) => {
  const { data } = await api.post("/drivers/create_driver", driver);
  return data;
};

export const UploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/drivers/upload_file", formData);
  return data;
};

export const DeleteUser = async (cedula: number) => {
  const { data } = await api.delete("/drivers/delete_driver", {
    params: { cedula },
  });
  return data;
};
