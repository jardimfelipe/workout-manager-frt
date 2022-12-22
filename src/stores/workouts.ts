import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IUser } from "@/domain/users/type";
import type { ITraining, IWorkout } from "@/domain/workouts/types";

export const useWorkoutStore = defineStore("workouts", () => {
  const creatingWorkoutStudent = ref<IUser | null>(null);
  const newWorkout = ref<Partial<IWorkout>>({});

  const setCreatingWorkoutStudent = (newUser: IUser) => {
    creatingWorkoutStudent.value = newUser;
  };

  const setNewWorkout = (workout: Partial<IWorkout>) => {
    console.log("sthore workout", workout);
    newWorkout.value = workout;
  };

  const addNewTraining = (training: ITraining) => {
    console.log("training", training);
    console.log("newWorkout.value.training", newWorkout.value.training);
    newWorkout.value.training
      ? newWorkout.value.training.push(training)
      : (newWorkout.value.training = [training]);
  };

  const reset = () => {
    newWorkout.value = {};
    creatingWorkoutStudent.value = null;
  };

  return {
    creatingWorkoutStudent,
    setCreatingWorkoutStudent,
    newWorkout,
    setNewWorkout,
    reset,
    addNewTraining,
  };
});
