<script setup lang="ts">
const modelValue = defineModel();
</script>

<template>
  <input
    v-model="modelValue"
    type="checkbox"
    class="appearance-none w-4 h-4 aspect-square bg-slate-900/20 rounded checked:bg-slate-900 checked:bg-[url('/tick.svg')]"
  />
</template>