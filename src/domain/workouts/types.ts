import type { IUser } from "../users/type";

export interface IExercise {
  method: string;
  series: string;
  exercise: string;
}

export interface ITraining {
  name: string;
  exercises: IExercise[];
}

export interface IWorkout {
  _id: string;
  name: string;
  training: ITraining[];
  studentId: string;
  isActive: boolean;
  createdBy: string;
}

export enum WorkoutsQueryKeys {
  PATCH = "patch",
}
