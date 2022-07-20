import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import Usespotify from "../hooks/Usespotify";

function player() {
  const { data: session } = useSession();
  const [volume, setVolume] = useState(50);
  const spotifyApi = Usespotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  return <div>player</div>;
}

export default player;
