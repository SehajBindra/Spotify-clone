import { useSession } from "next-auth/react";
import React from "react";

function Center() {
  const { data: session } = useSession();
  return (
    <div>
      <h1 className=" flex flex-grow text-white"> I am Center</h1>
      <header>
        <img src={session?.user.image} alt="" />
      </header>
    </div>
  );
}

export default Center;
