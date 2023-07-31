<script setup lang="ts">
import { useProfileStore } from "../store";
import { storeToRefs } from "pinia";
import { Playlists } from "../models/Playlists";

import { ref } from "vue";

const profileStore = useProfileStore();
const { accessToken } = storeToRefs(profileStore);

const response = await fetch("https://api.spotify.com/v1/me/playlists", {
  headers: { Authorization: `Bearer ${accessToken.value}` },
});

const playlists = ref<Playlists>(await response.json());
</script>

<template>
  <div class="grid bg-slate-900 text-white rounded-lg overflow-hidden shadow border border-slate-600">
    <div
      v-for="list in playlists.items"
      :key="list.id"
      class="flex items-center p-2 gap-2 hover:bg-slate-800"
    >
      <img
        :src="list.images[0].url"
        width="40"
        height="40"
        class="aspect-square object-cover rounded"
      />
      <p class="text-sm">{{ list.name }}</p>
    </div>
  </div>
</template>
