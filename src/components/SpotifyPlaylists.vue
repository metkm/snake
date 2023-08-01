<script setup lang="ts">
import { PlaylistTracksResponse, PlaylistsResponse } from "../models/Playlists";
import axios from "axios";

import { usePlaylistStore } from "../store/playlist";
import { storeToRefs } from "pinia";

const response = await axios<PlaylistsResponse>("/me/playlists");
const playlists = response.data.items;

const playlistStore = usePlaylistStore();
const { selectedPlaylists, playlistTracks } = storeToRefs(playlistStore);

const onChange = async (id: string, name: string) => {
  if (playlistTracks.value[id]) {
    delete playlistTracks.value[id];
    return;
  }

  const response = await axios<PlaylistTracksResponse>(
    `/playlists/${id}/tracks`
  );
  const items = response.data.items.map((item) => item.track);

  playlistTracks.value[id] = {
    name,
    tracks: items,
  };
};
</script>

<template>
  <ul class="grid bg-slate-900 text-white rounded-lg overflow-hidden">
    <li
      v-for="list in playlists"
      :key="list.id"
      class="flex items-center justify-between p-2 hover:bg-slate-800 gap-4"
    >
      <div class="flex gap-2 items-center">
        <img
          :src="list.images[0].url"
          width="40"
          height="40"
          class="rounded object-cover aspect-square"
        />
        <label :for="list.id" class="text-sm">{{ list.name }}</label>
      </div>

      <input
        v-model="selectedPlaylists"
        @change="onChange(list.id, list.name)"
        :value="list.id"
        :id="list.id"
        type="checkbox"
        class="appearance-none w-4 h-4 bg-slate-700 rounded checked:bg-slate-500 checked:bg-[url('/tick.svg')]"
      />
    </li>
  </ul>
</template>
