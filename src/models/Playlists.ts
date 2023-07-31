import { MagicString } from "vue/compiler-sfc"

export interface Image {
  url: string,
  height: number | null,
  width: number | null
}

export interface ExternalUrls {
  spotify: string
}

export interface PlaylistsResponse {
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

export interface AddedBy {
  external_urls: ExternalUrls,
  followers: {
    href: string | null,
    total: number
  },
  href: string,
  id: string,
  type: "user",
  uri: string
}

export interface SimplifiedArtist {
  external_urls: ExternalUrls,
  href: string,
  id: string,
  name: string,
  type: "artist",
  uri: string
}

export interface Artist extends SimplifiedArtist {
  followers: {
    href: string | null,
    total: number
  },
  genres: string[],
  images: Image[],
  popularity: number
}

export interface Restriction {
  reason: "market" | "product" | "explicit"
}

export interface Album {
  album_type: "album" | "single" | "compilation",
  total_tracks: number,
  available_markets: string[],
  external_urls: ExternalUrls,
  href: string,
  id: string,
  images: Image[],
  name: string,
  release_date: string,
  release_date_precision: string,
  restrictions: Restriction,
  type: "album",
  uri: string,
  copyrights: {
    text: string,
    type: "string"
  }[],
  external_ids: {
    isrc: string,
    ean: string,
    upc: string
  },
  genres: string[],
  label: string,
  popularity: number,
  album_group: "album" | "single" | "compilation" | "appears_on",
  artists: SimplifiedArtist[]
}

export interface Track {
  album: Album,
  Artists: Artist[],
  available_markets: string[],
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: {
    isrc: string,
    ean: string,
    upc: string
  },
  external_urls: ExternalUrls,
  href: string,
  id: string,
  is_playable: boolean,
  linked_from: {},
  restrictions: Restriction,
  name: string,
  popularity: number,
  preview_url: string,
  track_number: number,
  type: "track",
  uri: string,
  is_local: boolean
}

export interface PlaylistTrack {
  added_at: string,
  added_by: AddedBy,
  is_local: boolean,
  track: Track
}

export interface PlaylistTracksResponse {
  href: string,
  limit: number,
  next: string | null,
  offset: number
  previous: string | null,
  total: number,
  items: PlaylistTrack[]
}
