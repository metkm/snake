import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore(
  "settings",
  () => {
    const songChangeLimit = ref(10);

    return {
      songChangeLimit,
    };
  },
  {
    persist: true,
  }
);
