import { ref } from "vue";
import { defineStore } from "pinia";

interface Profile {
  country: string,
  display_name: string,
  email: string,
  explicit_content: {
    filter_enabled: boolean,
    filter_locked: boolean
  },
  external_urls: {
    spotify: string
  },
  followers: {
    href: null | string,
    total: number
  },
  href: string,
  id: string,
  images: {
    url: string,
    height: number | null,
    width: number | null
  }[],
  product: "premium" | "free",
  type: "user",
  uri: string
}

export const useProfileStore = defineStore("profile", () => {
  const profile = ref<Profile | null>(null);
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);

  return {
    profile,
    accessToken,
    refreshToken
  }
});
