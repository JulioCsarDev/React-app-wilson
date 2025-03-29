import { api } from "../../../config/axios.instance";
import { RegisterUserModel, UserUpdateModel } from "../models/users.models";

export const GetUsers = async () => {
  const { data } = await api.get("usersSQL/get_all_users");
  return data;
};

export const RegisterNewUser = async (user: RegisterUserModel) => {
  const { data } = await api.post("usersSQL/create_user", user);
  return data;
}

export const UpdateUser = async (user: UserUpdateModel) => {
  const { data } = await api.put("usersSQL/update_user", user);
  return data;
}

export const DeleteUser = async (userId: number) => {
  const { data } = await api.delete("usersSQL/delete_user", { params: { userId } });
  return data;
}