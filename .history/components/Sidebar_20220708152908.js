import React from "react";
import { HomeIcon, LibraryIcon, SearchIcon } from "@heroicons/react/outline";

function Sidebar() {
  return (
    <div className="flex-row space-x-2 ">
      {" "}
      <button>
        <HomeIcon className="h-6 w-5" />
        <p>Home</p>
      </button>
      <button>
        <SearchIcon className="h-6 w-5" />
        <p>Search</p>
      </button>
      <button>
        <LibraryIcon className="h-6 w-5" />
        <p>Your Library</p>
      </button>
    </div>
  );
}

export default Sidebar;
