import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IUser } from "@/domain/users/type";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<IUser | null>(null);

  const setUser = (newUser: IUser) => {
    user.value = newUser;
  };

  return { user, setUser };
});
