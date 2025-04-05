import { api } from "../../../config/axios.instance";
import { DriverModel, RegisterDriverModel } from "../models/conductor.models";

export const GetAllDrivers = async () => {
  const { data } = await api.get("/drivers/get_all_drivers");
  return data;
};

export const RegisterNewDriver = async (driver: RegisterDriverModel) => {
  const { data } = await api.post("/drivers/create_driver", driver);
  return data;
};

export const UploadDriver = async (id_conductor: DriverModel) => {
  const { data } = await api.post("/drivers/update_driver", id_conductor);
  return data;
};

export const UploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/drivers/upload_file", formData);
  return data;
};

export const DeleteDriver = async (id_conductor: number) => {
  console.log(id_conductor);
  const { data } = await api.delete(`/drivers/delete_driver/${id_conductor}`);
  return data;
};
