import { StudentsQueryKey } from "@/domain/users/type";
import useApi from "@/services/api";
import { useMutation, useQueryClient } from "vue-query";

type PatchParams = {
  id: string;
  isActive: boolean;
};

const usePatchWorkout = () => {
  const api = useApi();
  const cache = useQueryClient();

  return useMutation(
    ({ id, isActive }: PatchParams) =>
      api.patch(`/workouts/${id}`, { isActive }),
    {
      onSuccess: async () => {
        cache.invalidateQueries(StudentsQueryKey.STUDENTS);
      },
    }
  );
};

export default usePatchWorkout;
