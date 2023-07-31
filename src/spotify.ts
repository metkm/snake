import axios from "axios";

export const redirectToAuthFlow = async () => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallange(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", import.meta.env.VITE_CLIENT_ID);
  params.append("response_type", "code");
  params.append("redirect_uri", import.meta.env.VITE_REDIRECT_URI);
  params.append("scope", "user-read-private user-read-email user-modify-playback-state");
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

  const response = await axios.post<{
    access_token: string,
    refresh_token: string
  }>("https://accounts.spotify.com/api/token", {
    "client_id": import.meta.env.VITE_CLIENT_ID,
    "grant_type": "authorization_code",
    "code": code,
    "redirect_uri": import.meta.env.VITE_REDIRECT_URI,
    "code_verifier": verifier
  }, {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  });

  axios.defaults.baseURL = "https://api.spotify.com/v1"
  axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;

  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token
  }
}
