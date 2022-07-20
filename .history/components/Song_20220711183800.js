import React from "react";
import Usespotify from "../hooks/Usespotify";

function Song({ order, track }) {
  const spotifyApi = Usespotify();
  return (
    <div>
      <div>
        <p> {order + 1}</p>
        <img src={track.track.album.images[0].url} alt="" />
      </div>
    </div>
  );
}

export default Song;
