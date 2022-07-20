import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { _shuffle } from "lodash";
import { HiMenuAlt1 } from "react-icons/hi";
import { playlistIdstate, playlistState } from "../atoms/playlistAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import { data } from "autoprefixer";
import Usespotify from "../hooks/Usespotify";
import Songs from "./Songs";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";

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
  const [burgerStaus, setBurgerStatus] = useState(false);

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
      <header className=" flex   justify-center space-x-3 absolute top-4 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 pr-2">
          <img
            onClick={() => signOut()}
            className=" rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2> {session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>

        <div className="flex   ">
          <HiMenuAlt1
            onClick={() => setBurgerStatus(true)}
            className="relative top-2 justify-betweeen justify-end md:hidden flex h-8 w-8 cursor-pointer  "
          />
          <div
            show={burgerStaus}
            className=" text-gray-500 p-5 text-sm  xl:text-base  border-r  border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex "
          >
            <div className=" space-y-4">
              {" "}
              <button className="flex items-center space-x-2 hover:text-white">
                <HomeIcon className="h-5 w-5" />
                <p>Home</p>
              </button>
              <button className="flex items-center space-x-2 hover:text-white">
                <SearchIcon className="h-5 w-5" />
                <p>Search</p>
              </button>
              <button className="flex items-center space-x-2 hover:text-white">
                <LibraryIcon className="h-5 w-5" />
                <p>Your Library</p>
              </button>
              <hr className=" border-t [0.1px] border-gray-900" />
              <button className="flex items-center space-x-2 hover:text-white">
                <PlusCircleIcon className="h-5 w-5" />
                <p>Create Playlist</p>
              </button>
              <button className="flex items-center space-x-2 hover:text-white">
                <HeartIcon className="h-5 w-5" />
                <p>Liked Songs</p>
              </button>
              <button className="flex items-center space-x-2 hover:text-white">
                <RssIcon className="h-5 w-5" />
                <p>Your Episodes</p>
              </button>
              <hr className=" border-t [0.1px] border-gray-900" />
              {/* playlists */}
              {/* {playlists.map((playlist) => (
                <p
                  key={playlist.id}
                  onClick={() => setPlaylistId(playlist.id)}
                  className=" cursor-pointer  hover:text-white"
                >
                  {playlist.name}
                </p>
              ))} */}
            </div>
          </div>
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
