<script setup lang="ts">
import GameCanvas from "../components/GameCanvas.vue";
import SpotifyLogin from "../components/SpotifyLogin.vue";

import { storeToRefs } from "pinia";
import { useProfileStore } from "../store/profile";
import SpotifyPlaylists from "../components/SpotifyPlaylists.vue";

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);
</script>

<template>
  <Suspense>
    <GameCanvas />

    <template #fallback>
      <p>loading game...</p>
    </template>
  </Suspense>

  <div class="fixed bottom-5 right-5 grid gap-2">
    <Suspense>
      <SpotifyPlaylists v-if="profile" />
      <template #fallback>
        <p>loading...</p>
      </template>
    </Suspense>
    <SpotifyLogin />
  </div>
</template>
