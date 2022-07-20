import React from "react";
import Usespotify from "../hooks/Usespotify";
import { millesToMinutesAndSeconds } from "../lib/time";

function Song({ order, track }) {
  const spotifyApi = Usespotify();
  return (
    <div className="grid grid-cols-2  text-gray-500 py-4 px-5">
      <div className="flex items-center space-x-4">
        <p> {order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64  text-white truncate">
            {track.track.name}
          </p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className=" flex  items-center justify-between ml-auto  md:ml-0">
        <p className=" hidden md:inline">{track.track.album.name}</p>
        <p> {millesToMinutesAndSeconds(track.track.duration_ms)}</p>
        {/* <p>{track.track.artists[0].name}</p> */}
      </div>
    </div>
  );
}

export default Song;
