import { useMutation } from "vue-query";
import jwtDecode from "jwt-decode";
import { useRouter } from "vue-router";

import useApi from "@/services/api";
import { saveState } from "@/utils/localStorage";
import type { LoginPayload } from "./types";
import type { IUser } from "../users/type";
import { useAuthStore } from "@/stores/auth";

const useLogin = () => {
  const api = useApi();
  const router = useRouter();
  const store = useAuthStore();
  return useMutation(
    (params: LoginPayload) => api.post("/auth/signin", params),
    {
      onSuccess: async (response) => {
        const { accessToken, refreshToken } = response.data;
        const user: IUser = jwtDecode(accessToken);
        saveState("accessToken", accessToken);
        saveState("refreshToken", refreshToken);
        saveState("user", user);
        store.setUser(user);
        router.push("/");
      },
    }
  );
};

export default useLogin;
