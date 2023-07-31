export interface Image {
  url: string,
  height: number | null,
  width: number | null
}

export interface ExternalUrls {
  spotify: string
}

export interface Playlists {
  href: string,
  limit: string,
  next: string | null,
  offset: number,
  previous: string | null,
  total: number,
  items: SimplifiedPlaylist[]
}

export interface SimplifiedPlaylist {
  collaborative: boolean,
  description: string,
  external_urls: ExternalUrls,
  href: string,
  id: string,
  images: Image[],
  name: string,
  owner: {
    external_url: ExternalUrls,
    followers: {
      href: string | null,
      total: number
    },
    href: string,
    id: string,
    type: "user",
    uri: string,
    display_name: string | null
  },
  public: Boolean,
  snapshot_id: string,
  tracks: {
    href: string,
    total: number
  },
  type: "playlist",
  uri: string
}
