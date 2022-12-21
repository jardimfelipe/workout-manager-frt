import useApi from "@/services/api";
import { useMutation, useQueryClient } from "vue-query";
import { StudentsQueryKey } from "../type";

type DeleteParams = {
  id: string;
};

const useDeleteStudent = () => {
  const api = useApi();
  const cache = useQueryClient();

  return useMutation(
    (params: DeleteParams) => api.delete("/users/students", { params }),
    {
      onSuccess: async () => {
        cache.invalidateQueries(StudentsQueryKey.STUDENTS);
      },
    }
  );
};

export default useDeleteStudent;
