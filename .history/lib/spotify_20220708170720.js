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
