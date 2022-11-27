import jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import useApi from "../../service/api";
import { saveState } from "../../utils/localStorage";
import { IUser, LoginPayload } from "./types";

const useLogin = () => {
  const api = useApi();
  const navigate = useNavigate();
  return useMutation(
    (params: LoginPayload) => api.post("/auth/signin", params),
    {
      onSuccess: async (response) => {
        const { accessToken, refreshToken } = response.data;
        const user: IUser = jwtDecode(accessToken);
        saveState("accessToken", accessToken);
        saveState("refreshToken", refreshToken);
        saveState("user", user);
        navigate("/");
      },
    }
  );
};

export default useLogin;
