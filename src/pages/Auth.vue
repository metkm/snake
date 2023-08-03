<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useProfileStore } from "../store/profile";
import { getAcessToken } from "../spotify";
import { User } from "../models/User";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const profileStore = useProfileStore();

const code = route.query.code as string;

try {
  const tokens = await getAcessToken(code);

  if (tokens) {
    const response = await axios<User>("/me");

    profileStore.accessToken = tokens.accessToken;
    profileStore.refreshToken = tokens.refreshToken;
    profileStore.profile = response.data;
  }
} catch {

} finally {
  router.push("/");
}
</script>

<template>
  <p>hey</p>
</template>
