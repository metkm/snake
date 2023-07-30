<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { fetchProfile, getAcessToken } from "../spotify";

const route = useRoute();
const router = useRouter();

const code = route.query.code as string;

const accessToken = await getAcessToken(code);
const profile = await fetchProfile();

router.push("/");
</script>

<template>
  <p>hey</p>
</template>
