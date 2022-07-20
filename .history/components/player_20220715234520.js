import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import Usespotify from "../hooks/Usespotify";
import { TbSwitch3, TbPlayerSkipBack } from "react-icons/tb";
import { BsPlayCircle } from "react-icons/bs";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { RiRepeat2Fill } from "react-icons/ri";
import { BsList } from "react-icons/bs";
import { TiVolumeUp, TiVolumeDown } from "react-icons/ti";
import { CgMusicSpeaker } from "react-icons/cg";
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

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
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
      <div className="flex items-center justify-center  space-x-6">
        <TbSwitch3 className="button" />
        <IoPlaySkipBackSharp
          onClick={() => spotifyApi.skipToNext()}
          className="button"
        />

        {isPlaying ? (
          <FaPauseCircle
            onClick={handlePlayPause}
            className="h-10 w-10 cursor-pointer hover:scale-125 transition transform duration-100  ease-out"
          />
        ) : (
          <FaPlayCircle
            onClick={handlePlayPause}
            className="h-10 w-10 cursor-pointer hover:scale-125 transition transform duration-100  ease-out"
          />
        )}

        <IoPlaySkipForwardSharp className="button" />
        <RiRepeat2Fill
          onClick={() => spotifyApi.skipToPrevious()}
          className="h-5 w-5  text-green-500 cursor-pointer hover:scale-125 transition transform duration-100  ease-out "
        />
      </div>

      {/* right */}
      <div className="flex items-center justify-end  space-x-2 md:space-x-4  pr-5">
        <BsList className="button" />
        <CgMusicSpeaker className="button" />

        <TiVolumeUp className="button" />
        <input
          className=" slider::-moz-range-thumb  bg-white appearance-none  cursor-pointer  h-0.5  hover:bg-green-500 rounded outline-none  w-14 md:w-28 "
          type="range"
          min={0}
          max={100}
        />
        <TiVolumeDown className="button" />
      </div>
    </div>
  );
}

export default player;
