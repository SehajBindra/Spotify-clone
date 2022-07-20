import { useSession } from "next-auth/react";
import React from "react";

function Center() {
  const { data: session } = useSession();
  return (
    <div className=" flex flex-grow text-white">
      <header>
        <img
          className=" rounded-full w-10 h-10"
          src={session?.user.image}
          alt=""
        />
        <h2> {session?.user.name}</h2>
      </header>
    </div>
  );
}

export default Center;
