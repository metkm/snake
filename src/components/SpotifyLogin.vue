<script setup lang="ts">
import { ref, onMounted } from "vue";
import { redirectToAuthFlow } from '../spotify';

import { storeToRefs } from "pinia";
import { useProfileStore } from "../store";

const href = ref("");
const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

onMounted(async () => {
  href.value = await redirectToAuthFlow();
})
</script>

<template>
  <div class="p-2 rounded-lg bg-slate-900 text-white text-sm">
    <a v-if="!profile" :href="href" class="font-semibold rounded-lg px-4">Login with Spotify</a>
    <div v-else class="flex gap-2 items-center pr-2">
      <img :src="profile.images[0].url" width="50" height="50" class="rounded" />
      <div>
        <p class="text-xs text-slate-400">Logged in as</p>
        <p>{{ profile.display_name }}</p>
      </div>
    </div>
  </div>
</template>
