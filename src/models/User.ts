import { Image, ExternalUrls } from "./Shared";

export interface User {
  country: string,
  display_name: string,
  email: string,
  explicit_content: {
    filter_enabled: boolean,
    filter_locked: boolean
  },
  external_urls: ExternalUrls,
  followers: {
    href: string | null,
    total: number
  },
  href: string,
  id: string,
  images: Image[],
  product: string,
  type: string,
  uri: string
}
