<script setup lang="ts">
import { useSettingsStore } from "../store/settings";
import BaseInput from "./ui/BaseInput.vue";

const settingsStore = useSettingsStore();
</script>

<template>
  <div class="p-2 rounded-lg bg-neutral-900/40">
    <h1 class="mb-2 text-xs">Settings</h1>

    <div class="flex flex-col">
      <label for="changeLimit">Change song every {{ settingsStore.songChangeLimit }} points</label>
      <BaseInput id="changeLimit" type="number" v-model="settingsStore.songChangeLimit" />
    </div>
  </div>
</template>
