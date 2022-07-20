import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { _shuffle } from "lodash";
import { HiMenuAlt1 } from "react-icons/hi";
import { playlistIdstate, playlistState } from "../atoms/playlistAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import { data } from "autoprefixer";
import Usespotify from "../hooks/Usespotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);

  const spotifyApi = Usespotify();
  const playlistId = useRecoilValue(playlistIdstate);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  useEffect(() => {
    setColor(_.shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("something went Wrong", err));
  }, [spotifyApi, playlistId]);

  console.log(playlist);
  return (
    <div className=" flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className=" flex flex-col-reverse  justify-center space-x-3 absolute top-4 right-8">
        <div className="flex  ">
          <HiMenuAlt1 className="absolute left-0 bottom-3 md:hidden flex h-10 w-10 cursor-pointer  " />
        </div>
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 pr-2">
          <img
            className=" rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2> {session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        {" "}
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p> Playlist</p>
          <h1 className=" text-2xl md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
