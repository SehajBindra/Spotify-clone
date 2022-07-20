import React from "react";
import { HomeIcon, LibraryIcon, SearchIcon } from "@heroicons/react/outline";

function Sidebar() {
  return (
    <div>
      {" "}
      <button>
        <HomeIcon className="h-6 w-5" />
      </button>
      <button>
        <SearchIcon className="h-6 w-5" />
      </button>
      <button>
        <LibraryIcon className="h-6 w-5" />
      </button>
      <button>
        <HomeIcon className="h-6 w-5" />
      </button>
    </div>
  );
}

export default Sidebar;
