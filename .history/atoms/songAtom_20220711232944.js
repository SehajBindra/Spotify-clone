import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState", // unique id with respect to other selectors/atoms
  default: null, // default value aka intial value
});

export const isPlayingState = atom({
  key: "isPlayingsState",
  default: false,
});
