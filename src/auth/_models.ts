export interface AuthModel {
  access_token: string;
  refresh_token?: string;
  token_type: string;
}

export interface UserModel {
  id?: string;
  name: string;
  user: string;
  email: string;
  password: string | undefined;
  company?: any;
  role?: any;
  web: boolean;
  uid: string;
  tel?: number;
}

export interface UserModelResponse {
  success: boolean;
  user: UserModel;
  detail: string;
}
