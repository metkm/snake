<script setup lang="ts">
import { ref, onMounted } from "vue";
import { redirectToAuthFlow } from '../spotify';

const href = ref("");

onMounted(async () => {
  href.value = await redirectToAuthFlow();

  // const params = new URLSearchParams(window.location.search);
  // const code = params.get("code");

  // console.log(route.query, window.location.search)

  // const code = route.query.codel

  // if (!code) {
  //   href.value = await redirectToAuthFlow();
  // } else {
  //   const accessToken = await getAcessToken(code);
  //   const profile = await fetchProfile(accessToken);

  //   console.log(profile);
  // }
})
</script>

<template>
  <div class="fixed bottom-5 right-5">
    <a :href="href" class="px-6 py-3 bg-slate-500 font-semibold rounded-lg text-white">Login with Spotify</a>
  </div>
</template>
