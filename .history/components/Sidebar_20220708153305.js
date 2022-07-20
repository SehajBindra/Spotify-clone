import React from "react";
import { HomeIcon, LibraryIcon, SearchIcon } from "@heroicons/react/outline";

function Sidebar() {
  return (
    <div>
      {" "}
      <button className="flex items-center space-x-2">
        <HomeIcon className="h-6 w-5" />
        <p>Home</p>
      </button>
      <button className="flex items-center space-x-2">
        <SearchIcon className="h-6 w-5" />
        <p>Search</p>
      </button>
      <button className="flex items-center space-x-2">
        <LibraryIcon className="h-6 w-5" />
        <p>Your Library</p>
      </button>
    </div>
  );
}

export default Sidebar;
