import React from "react";
import { playlistState } from "../atoms/playlistAtom";
import { useRecoilValue } from "recoil";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div>
      {playlist?.tracks.items.map((track) => (
        <div> {track.track.name}</div>
      ))}
    </div>
  );
}

export default Songs;
