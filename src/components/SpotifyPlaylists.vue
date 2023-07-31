<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { PlaylistsResponse, SimplifiedPlaylistWithItems } from "../models/Playlists";
import axios from "axios";

const response = await axios("/playlists");

const playlists = ref<PlaylistsResponse>(response.data);
const selectedPlaylists = ref<SimplifiedPlaylistWithItems[]>([]);

const isSelected = (list: SimplifiedPlaylistWithItems) => {
  return selectedPlaylists.value.includes(list);
};

watchEffect(async () => {
  for (let playlist of selectedPlaylists.value) {
    if (playlist.items) continue;


  }
})
</script>

<template>
  <div
    class="grid bg-slate-900 text-white rounded-lg divide-y divide-slate-800 overflow-hidden shadow border border-slate-600"
  >
    <div
      v-for="list in playlists.items"
      :key="list.id"
      class="flex items-center p-2 gap-2 hover:bg-slate-800 relative transition-colors"
      :class="{ 'bg-emerald-800 hover:bg-emerald-700': isSelected(list) }"
    >
      <input
        v-model="selectedPlaylists"
        :value="list"
        type="checkbox"
        class="absolute inset-0 appearance-none"
      />
      <img
        :src="list.images[0].url"
        width="40"
        height="40"
        class="aspect-square object-cover rounded"
      />
      <p class="text-sm select-none">{{ list.name }}</p>
    </div>
  </div>
</template>
