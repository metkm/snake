<script setup lang="ts">
import GameCanvas from "../components/GameCanvas.vue";
import SpotifyLogin from "../components/SpotifyLogin.vue";

import { storeToRefs } from "pinia";
import { useProfileStore } from "../store";
import SpotifyPlaylists from "../components/SpotifyPlaylists.vue";

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);
</script>

<template>
  <GameCanvas />

  <div class="fixed bottom-5 right-5 grid gap-2">
    <SpotifyPlaylists v-if="profile" />
    <SpotifyLogin />
  </div>
</template>
