<script setup lang="ts">
import { PlaylistTracksResponse, PlaylistsResponse } from "../models/Playlists";
import axios from "axios";
import BaseInputCheckbox from "./ui/BaseInputCheckbox.vue";

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
        fields:
          "items(track(!available_markets),track(album(!available_markets)))",
      },
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
  <ul class="grid gap-2 bg-neutral-900/40 p-2 rounded-lg">
    <li
      v-for="list in playlists"
      :key="list.id"
      class="flex items-center max-w-xs"
    >
      <img
        :src="list.images[0].url"
        width="40"
        height="40"
        class="object-cover aspect-square rounded"
      />
      
      <div class="grow flex items-center justify-between p-2 gap-2 overflow-hidden">
        <label :for="list.id" class="truncate w-full">{{ list.name }}</label>
        <BaseInputCheckbox
          v-model="selectedPlaylists"
          @change="onChange(list.id, list.name)"
          :value="list.id"
          :id="list.id"
        />
      </div>
    </li>
  </ul>
</template>
