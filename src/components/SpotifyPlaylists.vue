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
    `/playlists/${id}/tracks`,
    {
      params: {
        limit: 50,
        fields: "items(track(!available_markets),track(album(!available_markets)))"
      }
    }
  );
  const items = response.data.items.map((item) => item.track);

  playlistTracks.value[id] = {
    name,
    tracks: items,
  };
};
</script>

<template>
  <ul class="bg-neutral-900/40 text-white rounded-lg overflow-hidden grid gap-2 py-2">
    <li
      v-for="list in playlists"
      :key="list.id"
      class="flex gap-2 items-center max-w-xs px-2"
    >
      <img
        :src="list.images[0].url"
        width="40"
        height="40"
        class="rounded object-cover aspect-square"
      />
      <label :for="list.id" class="text-sm truncate w-full">{{ list.name }}</label>

      <input
        v-model="selectedPlaylists"
        @change="onChange(list.id, list.name)"
        :value="list.id"
        :id="list.id"
        type="checkbox"
        class="appearance-none w-4 h-4 aspect-square bg-slate-900/20 rounded checked:bg-slate-900 checked:bg-[url('/tick.svg')]"
      />
    </li>
  </ul>
</template>
