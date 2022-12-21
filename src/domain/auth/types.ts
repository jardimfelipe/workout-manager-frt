import type { IWorkout } from "../workouts/types";

export type LoginPayload = {
  email: string;
  password: string;
};

export interface IToken {
  _id: string;
  email: string;
}
