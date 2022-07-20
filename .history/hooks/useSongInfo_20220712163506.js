import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import Usespotify from "./Usespotify";

function useSongInfo() {
  const { data: session } = useSession();
  const [volume, setVolume] = useState(50);
  const spotifyApi = Usespotify();
  const [songInfo, setSongInfo] = useState(null);

  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackinfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());

        setSongInfo(trackinfo);
      }
    };

    fetchSongInfo();
  }, [currentIdTrack, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
