import { getSavedState, removeState } from "@/utils/localStorage";

import { useMutation } from "vue-query";
import { useRouter } from "vue-router";
import axios from "axios";

const useLogout = () => {
  const user = getSavedState("user");
  const router = useRouter();
  return useMutation(
    () =>
      axios.post(`${import.meta.env.VITE_APP_API}/auth/logout`, {
        id: user._id,
      }),
    {
      onSuccess: async () => {
        removeState("accessToken");
        removeState("refreshToken");
        removeState("user");
        router.push("/login");
      },
    }
  );
};

export default useLogout;
