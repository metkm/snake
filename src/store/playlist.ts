import { defineStore } from "pinia";
import { ref } from "vue";
import { SimplifiedPlaylistWithItems } from "../models/Playlists";

export const usePlaylistStore = defineStore("playlists", () => {
  const selectedPlaylists = ref<SimplifiedPlaylistWithItems[]>([]);

  const isSelected = (list: SimplifiedPlaylistWithItems) => {
    return selectedPlaylists.value.includes(list);
  }

  return {
    selectedPlaylists,
    isSelected
  }
});
