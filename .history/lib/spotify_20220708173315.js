import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist -read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-read-playback-state",
  "user-read-currently-Playing",
  "user-read-recently-Played",
  "user-Modify-playback-state",
  "user-follow-read",
].join(",");

const params = {
  scope: scopes,
};
// https://acounts.spotify.com/authorize?params=user-read-email,..

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyapi = new SpotifyWebApi({
  clientId: process.env.NEXTPUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXTPUBLIC_CLIENT_SECRET,
});

export default spotifyapi;

export { LOGIN_URL };
