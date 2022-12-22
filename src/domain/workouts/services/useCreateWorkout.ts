import { StudentsQueryKey } from "@/domain/users/type";
import useApi from "@/services/api";
import { useMutation, useQueryClient } from "vue-query";
import type { IWorkout } from "../types";

const useCreateWorkout = () => {
  const api = useApi();
  const cache = useQueryClient();

  return useMutation((workout: any) => api.post(`/workouts`, workout), {
    onSuccess: async () => {
      cache.invalidateQueries(StudentsQueryKey.STUDENTS);
    },
  });
};

export default useCreateWorkout;
