import { ref } from "vue";
import { defineStore } from "pinia";
import type { IUser } from "@/domain/users/type";
import type { ITraining, IWorkout } from "@/domain/workouts/types";

export const useWorkoutStore = defineStore("workouts", () => {
  const creatingWorkoutStudent = ref<IUser | null>(null);
  const newWorkout = ref<Partial<IWorkout>>({});

  function setCreatingWorkoutStudent(newUser: IUser) {
    creatingWorkoutStudent.value = newUser;
  }

  function setNewWorkout(workout: Partial<IWorkout>) {
    Object.keys(workout).forEach((key) => {
      delete newWorkout.value[key as keyof IWorkout];
      newWorkout.value[key as keyof IWorkout] = workout[key as keyof IWorkout];
    });
  }

  function addNewTraining(training: ITraining) {
    const obj = Object.create(training);
    newWorkout.value.training
      ? newWorkout.value.training.push(obj)
      : (newWorkout.value.training = [obj]);
  }

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
