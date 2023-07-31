import { defineStore } from "pinia";
import { ref } from "vue";
import { SimplifiedPlaylistWithItems, Track } from "../models/Playlists";
import { RGBColor } from "colorthief";

export const usePlaylistStore = defineStore("playlists", () => {
  const selectedPlaylists = ref<SimplifiedPlaylistWithItems[]>([]);
  const currentTrack = ref<Track>();
  const currentColor = ref<RGBColor>();

  const isSelected = (list: SimplifiedPlaylistWithItems) => {
    return selectedPlaylists.value.includes(list);
  }

  return {
    selectedPlaylists,
    isSelected,
    currentTrack,
    currentColor
  }
});
