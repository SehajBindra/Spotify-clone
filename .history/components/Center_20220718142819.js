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
      <header className=" flex   justify-center space-x-3 absolute top-4 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 pr-2">
          <img
            onClick={() => signOut()}
            className=" rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2 onClick={() => signOut()}> {session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>

        <div className="flex   ">
          <HiMenuAlt1 className="relative top-2 justify-betweeen justify-end md:hidden flex h-8 w-8 cursor-pointer  " />
        </div>
        <div className="flex items-center justify-between border-b border-gray-400 py-8">
          <a href="/">
            <img src="https://designbygio.it/images/logo.png" alt="logo" />
          </a>
          <nav>
            <section className="MOBILE-MENU flex lg:hidden">
              <div className="HAMBURGER-ICON space-y-2">
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              </div>

              <div>
                <div className="absolute top-0 right-0 px-8 py-8">
                  <svg
                    className="h-8 w-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <ul className="NAVIGATION-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <a href="/about">About</a>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <a href="/portfolio">Portfolio</a>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>
            </section>

            <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/portfolio">Portfolio</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>
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
