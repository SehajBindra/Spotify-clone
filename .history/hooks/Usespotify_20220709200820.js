import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyapi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function Usespotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // if refresh access  token  attempt fails , direct user to login
      if (session.error === "RefreshAcessToken") {
        signIn();
      }

      spotifyapi.setAccessToken(session.user.accesstoken);
    }
  }, [session]);

  return null;
}

export default Usespotify;
