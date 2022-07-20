import React from "react";
import Usespotify from "../hooks/Usespotify";

function Song({ order, track }) {
  const spotifyApi = Usespotify();
  return (
    <div>
      <div>
        <p> {order}</p>
      </div>
    </div>
  );
}

export default Song;
