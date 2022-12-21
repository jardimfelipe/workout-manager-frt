import axios, { type AxiosRequestConfig } from "axios";

import { getSavedState, saveState } from "../utils/localStorage";
import useLogout from "@/domain/auth/useLogout";

const useApi = () => {
  const logout = useLogout();
  const user = getSavedState("user");
  const accessToken = getSavedState("accessToken");
  const refreshToken = getSavedState("refreshToken");
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
  });
  const validateToken = async (refreshToken: string) => {
    try {
      const { data } = await api.post("/auth/refresh", {
        refreshToken,
        id: user?._id,
      });

      saveState("accessToken", data.accessToken);
      saveState("refreshToken", data.refreshToken);

      return data.accessToken;
    } catch (error) {
      logout.mutate();
      return Promise.reject(error);
    }
  };

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!!user) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const {
        config,
        response: { status },
      } = error;
      if (status === 401 && accessToken) {
        try {
          const newAccessToken = await validateToken(refreshToken);
          return await axios({
            ...config,
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
        } catch (error) {
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
  return api;
};

export default useApi;
