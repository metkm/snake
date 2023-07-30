<script setup lang="ts">
import { ref, onMounted } from "vue";
import { redirectToAuthFlow } from '../spotify';

const href = ref("");

onMounted(async () => {
  href.value = await redirectToAuthFlow();
})
</script>

<template>
  <div class="fixed bottom-5 right-5">
    <a :href="href" class="px-6 py-3 bg-slate-500 font-semibold rounded-lg text-white">Login with Spotify</a>
  </div>
</template>
