<script setup lang="ts">
import GameCanvas from './components/GameCanvas.vue';
import { fetchProfile, getAcessToken, redirectToAuthFlow } from './spotify';
import { ref, onMounted } from "vue";

const href = ref('');

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    href.value = await redirectToAuthFlow();
  } else {
    const accessToken = await getAcessToken(code);
    const profile = await fetchProfile(accessToken);

    console.log(profile);
  }
})

</script>

<template>
  <GameCanvas />

  <div class="fixed bottom-5 right-5">
    <a :href="href" class="px-6 py-3 bg-slate-500 font-semibold rounded-lg text-white">Login with Spotify</a>
  </div>
</template>
