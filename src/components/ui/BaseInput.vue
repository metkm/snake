<script setup lang="ts">
const modelValue = defineModel();
</script>

<template>
  <input 
    v-model="modelValue" 
    class="rounded bg-neutral-900/40 p-1"
  >
</template>
