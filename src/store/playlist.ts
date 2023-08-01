import { defineStore } from "pinia";
import { ref } from "vue";
import { Track } from "../models/Playlists";

interface PlaylistTracks {
  [key: string]: {
    name: string,
    tracks: Track[]
  }
}

export const usePlaylistStore = defineStore("playlists", () => {
  const selectedPlaylists = ref<string[]>([]);
  const playlistTracks = ref<PlaylistTracks>({});
  const currentTrack = ref<Track>();

  // const isSelected = (list: BasicPlaylist) => {
  //   return selectedPlaylists.value.includes(list);
  // }

  return {
    selectedPlaylists,
    // isSelected,
    currentTrack,
    playlistTracks
  }
});
