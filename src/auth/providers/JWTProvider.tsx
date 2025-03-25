/* eslint-disable no-unused-vars */
import axios, { AxiosResponse } from "axios";
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { api } from "../../config/axios.instance";
import * as authHelper from "../_helpers";
import {
  type AuthModel,
  type UserModel,
  type UserModelResponse,
} from "../_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const FORGOT_PASSWORD_URL = `${API_URL}/forgot-password`;
export const RESET_PASSWORD_URL = `${API_URL}/reset-password`;
export const GET_USER_URL = `${API_URL}/user`;

interface AuthContextProps {
  isLoading: boolean;
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle?: () => Promise<void>;
  loginWithFacebook?: () => Promise<void>;
  loginWithGithub?: () => Promise<void>;
  register: (
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  updateUser: (userData: UserModel) => Promise<UserModelResponse>;
  requestPasswordResetLink: (email: string) => Promise<void>;
  changePassword: (
    email: string,
    token: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  getUser: () => Promise<AxiosResponse<any>>;
  logout: () => void;
  verify: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();

  const verify = async () => {
    if (auth) {
      try {
        const { data: user } = await getUser();
        setCurrentUser(user);
      } catch {
        saveAuth(undefined);
        setCurrentUser(undefined);
      }
    }
  };

  useEffect(() => {
    verify().finally(() => {
      setLoading(false);
    });
  }, []);

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const data = new URLSearchParams();
      data.append("username", username);
      data.append("password", password);

      const { data: auth } = await api.post<AuthModel>("/auth/login", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      saveAuth(auth);
      const { data: user } = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw new Error(`Error ${error}`);
    }
  };

  const register = async (
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      const { data: auth } = await axios.post(REGISTER_URL, {
        email,
        password,
        password_confirmation,
      });
      saveAuth(auth);
      const { data: user } = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw new Error(`Error ${error}`);
    }
  };

  // Función para actualizar el usuario
  const updateUser = async (
    userData: UserModel | null
  ): Promise<UserModelResponse> => {
    // Hacer una solicitud PUT o PATCH a tu API
    const { data } = await api.post<UserModelResponse>(
      "/update_user",
      userData
    );

    setCurrentUser(data.user);
    return data;
  };

  const requestPasswordResetLink = async (email: string) => {
    await axios.post(FORGOT_PASSWORD_URL, {
      email,
    });
  };

  const changePassword = async (
    email: string,
    token: string,
    password: string,
    password_confirmation: string
  ) => {
    await axios.post(RESET_PASSWORD_URL, {
      email,
      token,
      password,
      password_confirmation,
    });
  };

  const getUser = async () => {
    return await api.get<UserModel>("/auth/user");
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
    localStorage.removeItem("hasVisitedBefore");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: loading,
        auth,
        saveAuth,
        currentUser,
        setCurrentUser,
        login,
        register,
        updateUser,
        requestPasswordResetLink,
        changePassword,
        getUser,
        logout,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
