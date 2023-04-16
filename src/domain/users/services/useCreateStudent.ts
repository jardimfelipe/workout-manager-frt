import useApi from "@/services/api";
import { useMutation, useQueryClient } from "vue-query";
import { StudentsQueryKey, type IUser } from "../type";

const useDeleteStudent = () => {
  const api = useApi();
  const cache = useQueryClient();

  return useMutation((user: Partial<IUser>) => api.post("/auth/signup", user), {
    onSuccess: async () => {
      cache.invalidateQueries(StudentsQueryKey.STUDENTS);
    },
  });
};

export default useDeleteStudent;
