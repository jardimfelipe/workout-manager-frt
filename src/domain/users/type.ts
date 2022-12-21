import type { IWorkout } from "../workouts/types";

export enum RolesEnum {
  TEACHER = "teacher",
  ADMIN = "admin",
  STUDENT = "student",
}

export interface IUser {
  name: string;
  age: number;
  email: string;
  refreshToken: string;
  password: string;
  role: RolesEnum;
  teacherId: string;
  workouts?: IWorkout[];
  _id: string;
}

export enum StudentsQueryKey {
  STUDENTS = "students",
}
