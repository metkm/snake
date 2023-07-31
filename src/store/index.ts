import { ref } from "vue";
import { defineStore } from "pinia";
import { User } from "../models/User";

export const useProfileStore = defineStore("profile", () => {
  const profile = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);

  return {
    profile,
    accessToken,
    refreshToken
  }
});
