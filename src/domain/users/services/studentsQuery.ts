import { useQuery } from "vue-query";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

import { StudentsQueryKey, type IUser } from "../type";
import useApi from "@/services/api";
import { useAuthStore } from "@/stores/auth";

type Props = {
  id: string;
};

const useStudentsQuery = () => {
  const store = useAuthStore();
  const api = useApi();
  return useQuery(
    [StudentsQueryKey.STUDENTS],
    async () => {
      const { data }: AxiosResponse<IUser[]> = await api.get(
        "/users/students",
        { params: { teacherId: store.user?._id } }
      );
      return data;
    },
    {
      enabled: !!store.user?._id,
      onError: (error: Error | AxiosError) => {
        //   message.error(
        //     `Ocorreu um erro ao buscar clientes ${
        //       axios.isAxiosError(error) && `, código: ${error.response?.status}`
        //     }`
        //   );
      },
    }
  );
};

export default useStudentsQuery;
