export interface UsersModel {
  id: number;
  name: string;
  email: string;
  password: string;
  created_user: string;
}

export interface RegisterUserModel {
  name: string;
  email: string;
  password: string;
}

export interface UserUpdateModel {
  id: number;
  name: string;
  email: string;
  password: string;
}
