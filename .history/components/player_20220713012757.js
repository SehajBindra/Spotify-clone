import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import Usespotify from "../hooks/Usespotify";
import { TbSwitch3, TbPlayerSkipBack } from "react-icons/tb";
import { IoPlaySkipForwardSharp, IoPlaySkipBackSharp } from "react-icons/io5";
function player() {
  const { data: session } = useSession();
  const [volume, setVolume] = useState(50);
  const spotifyApi = Usespotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const songInfo = useSongInfo();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now playing", data.body?.item);
        setCurrentTrackId(data.body?.item.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetech the song info
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);
  return (
    <div className="h-24 bg-gradient-to-b from-black to bg-gray-900 text-white grid grid-cols-3  text-xs md:text-base px-2 md:px-8">
      {/* left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />

        <div>
          <h3 className=" font-semibold">{songInfo?.name}</h3>
          <p className=" text-gray-500">{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* center */}
      <div>
        <TbSwitch3 className="button" />
        <TbPlayerSkipBack className="button" />
        <IoPlaySkipForwardSharp className="button" />
        <IoPlaySkipBackSharp className="button" />
      </div>
    </div>
  );
}

export default player;
