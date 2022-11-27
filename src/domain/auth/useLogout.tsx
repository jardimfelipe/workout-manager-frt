import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { getSavedState, removeState } from "../../utils/localStorage";

const useLogout = () => {
  const user = getSavedState("user");
  const navigate = useNavigate();
  return useMutation(
    () =>
      axios.post(`${import.meta.env.VITE_SOME_KEY}/auth/logout`, {
        id: user._id,
      }),
    {
      onSuccess: async () => {
        removeState("accessToken");
        removeState("refreshToken");
        removeState("user");
        navigate("/login");
      },
    }
  );
};

export default useLogout;
