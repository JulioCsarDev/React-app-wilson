export interface UsersModel {
  id: number;
  name_surname: string;
  email_user: string;
  pass_user: string;
  created_user: string;
}

export interface RegisterUserModel {
  name_surname: string;
  email_user: string;
  pass_user: string;
}

export interface UserUpdateModel {
  id: number;
  name_surname: string;
  email_user: string;
  pass_user: string;
}
