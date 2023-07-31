import { PlaylistTracksResponse } from "./models/Playlists";

export const redirectToAuthFlow = async () => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallange(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", import.meta.env.VITE_CLIENT_ID);
  params.append("response_type", "code");
  params.append("redirect_uri", import.meta.env.VITE_REDIRECT_URI);
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateCodeVerifier = (length: number) => {
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const generateCodeChallange = async (codeVerifier: string) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

export const getAcessToken = async (code: string) => {
  const verifier = localStorage.getItem("verifier");
  if (!verifier) return;

  const params = new URLSearchParams();
  params.append("client_id", import.meta.env.VITE_CLIENT_ID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", import.meta.env.VITE_REDIRECT_URI);
  params.append("code_verifier", verifier!);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const { access_token, refresh_token }: { access_token: string, refresh_token: string } = await response.json();
  return {
    accessToken: access_token,
    refreshToken: refresh_token
  }
}

export const fetchProfile = async (token: string) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await response.json();
}

export const fetchPlaylistItems = async (playlistId: string, token: string) => {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  let body: PlaylistTracksResponse = await response.json();
  return body;
}
