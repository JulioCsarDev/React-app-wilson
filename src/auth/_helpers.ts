// _helpers.ts - Modificado para manejar consistentemente los tokens
import { User as Auth0UserModel } from "@auth0/auth0-spa-js";
import { AxiosInstance } from "axios";
import { getData, setData } from "../utils";
import { type AuthModel } from "./_models";

const AUTH_LOCAL_STORAGE_KEY = `auth`;

const getAuth = (): AuthModel | undefined => {
  try {
    const auth = getData(AUTH_LOCAL_STORAGE_KEY) as AuthModel | undefined;
    return auth;
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
    return undefined;
  }
};

const setAuth = (auth: AuthModel | Auth0UserModel) => {
  setData(AUTH_LOCAL_STORAGE_KEY, auth);
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

export function setupAxios(axios: AxiosInstance) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config) => {
      const auth = getAuth();
      if (auth?.access_token) {
        config.headers.Authorization = `Bearer ${auth.access_token}`;
      }
      return config;
    },
    async (err: any) => await Promise.reject(err)
  );
}

export { AUTH_LOCAL_STORAGE_KEY, getAuth, removeAuth, setAuth };
