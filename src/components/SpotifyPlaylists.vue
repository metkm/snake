<script setup lang="ts">
import { useProfileStore } from "../store";
import { PlaylistsResponse, SimplifiedPlaylist } from "../models/Playlists";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const profileStore = useProfileStore();
const { accessToken } = storeToRefs(profileStore);

const response = await fetch("https://api.spotify.com/v1/me/playlists", {
  headers: { Authorization: `Bearer ${accessToken.value}` },
});

const playlists = ref<PlaylistsResponse>(await response.json());
const selectedPlaylists = ref<SimplifiedPlaylist[]>([]);

const isSelected = (list: SimplifiedPlaylist) => {
  return selectedPlaylists.value.includes(list);
};
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
