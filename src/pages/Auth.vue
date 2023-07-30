<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { fetchProfile, getAcessToken } from "../spotify";
import { useProfileStore } from "../store";

const route = useRoute();
const router = useRouter();
const profileStore = useProfileStore();

const code = route.query.code as string;

try {
  const tokens = await getAcessToken(code);

  if (tokens) {
    const profile = await fetchProfile(tokens.accessToken);

    profileStore.accessToken = tokens.accessToken;
    profileStore.refreshToken = tokens.refreshToken;
    profileStore.profile = profile;
  }
} catch {

} finally {
  router.push("/");
}

</script>

<template>
  <p>hey</p>
</template>
