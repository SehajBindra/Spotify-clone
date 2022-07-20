import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import Usespotify from "./Usespotify";

function useSongInfo() {
  const { data: session } = useSession();
  const [volume, setVolume] = useState(50);
  const spotifyApi = Usespotify();
  const [songInfo, setSongInfo] = useState(null);

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  return <div>useSongInfo</div>;
}

export default useSongInfo;
