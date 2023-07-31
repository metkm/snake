<script setup lang="ts">
import { ref, watchEffect, onMounted, computed, StyleValue } from "vue";
import { PlaylistTracksResponse, PlaylistsResponse } from "../models/Playlists";
import { usePlaylistStore } from "../store/playlist";
import { storeToRefs } from "pinia";

import axios from "axios";
import ColorThief from "colorthief";

const colorThief = new ColorThief();

const playlistStore = usePlaylistStore();
const { currentTrack, selectedPlaylists, currentColors } = storeToRefs(playlistStore);

const response = await axios("/me/playlists");
const playlists = ref<PlaylistsResponse>(response.data);
const currentTrackImageElement = ref<HTMLImageElement | null>(null);

onMounted(() => {
  currentTrackImageElement.value?.addEventListener("load", async () => {
    let colors = colorThief.getPalette(currentTrackImageElement.value!);
    currentColors.value = colors;
  })
})

watchEffect(async () => {
  for (let playlist of selectedPlaylists.value) {
    if (playlist.items) continue;

    const response = await axios<PlaylistTracksResponse>(
      `/playlists/${playlist.id}/tracks`
    );

    playlist.items = response.data.items.map((item) => item.track);
  }
});

const backgroundColor = computed<StyleValue | undefined>(() => {
  if (!currentColors.value?.[0]) return;
  let rgb = currentColors.value[0];
  return {
    backgroundColor: `rgb(${rgb[0] / 3}, ${rgb[1] / 3}, ${rgb[2] / 3})`
  }
})
</script>

<template>
  <div
    class="grid text-white rounded-lg overflow-hidden shadow transition-colors"
    :style="backgroundColor"
  >
    <div>
      <img
        ref="currentTrackImageElement"
        :src="currentTrack?.album.images[0].url"
        width="40"
        height="40"
        crossorigin="anonymous"
      />
    </div>

    <div
      v-for="list in playlists.items"
      :key="list.id"
      class="flex items-center p-2 gap-2 hover:bg-slate-800 relative transition-colors"
      :class="{
        'bg-emerald-800 hover:bg-emerald-700': playlistStore.isSelected(list),
      }"
    >
      <input
        v-model="playlistStore.selectedPlaylists"
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
