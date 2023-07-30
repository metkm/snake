<script setup lang="ts">
</script>

<template>
  <Suspense :timeout="0">
    <RouterView />

    <template #fallback>
      <p>loading....</p>
    </template>
  </Suspense>
</template>
