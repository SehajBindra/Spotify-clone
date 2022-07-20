import React from "react";
import { playlistState } from "../atoms/playlistAtom";
import { useRecoilValue } from "recoil";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="px-8 text-white flex flex-col  space-y-1 pb-28">
      {playlist?.tracks.items.map((track) => (
        <Song key={track.track.id} track={track} order={1} />
      ))}
    </div>
  );
}

export default Songs;
