<script setup lang="ts">
import { useSettingsStore } from "../store/settings";
import BaseInput from "./ui/BaseInput.vue";

const settingsStore = useSettingsStore();
</script>

<template>
  <div class="bg-neutral-900/40 p-2 rounded-lg">
    <h1 class="mb-2 text-xs">Settings</h1>

    <div class="flex flex-col">
      <label for="changeLimit">Change song every X points</label>
      <BaseInput id="changeLimit" type="number" v-model="settingsStore.songChangeLimit" />
    </div>
  </div>
</template>
