import React from "react";
import { playlistState } from "../atoms/playlistAtom";
import { useRecoilValue } from "recoil";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div>
      {playlist?.tracks.items.map((track) => (
        <div>
          {" "}
          {track.track.name}
          <Song />
        </div>
      ))}
    </div>
  );
}

export default Songs;
