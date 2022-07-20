import React from "react";
import Usespotify from "../hooks/Usespotify";

function Song({ order, track }) {
  const spotifyApi = Usespotify();
  return (
    <div>
      <div>
        <p> {order + 1}</p>
      </div>
    </div>
  );
}

export default Song;
