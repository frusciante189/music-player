import React from "react";
import LibrarySong from "./LibrarySong";
import { useToggle } from "../Provider/Context";

const Library = () => {
  const { songs, isLibraryOpen, setIsLibraryOpen, ref } = useToggle();
  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 md:w-80 w-full h-full library overflow-y-auto transition-all duration-300 ease-in bg-white z-30 dark:bg-neutral-200  ${
        isLibraryOpen
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-pink-500 font-medium select-none text-xl">
          Library
        </h3>
        <span
          className="transition-all transform hover:rotate-180 duration-500 cursor-pointer"
          onClick={() => setIsLibraryOpen(!isLibraryOpen)}
        >
          <svg
            className="w-6 h-6 fill-pink-400 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {/* Songs */}
      <div className="flex flex-col items-center ">
        {songs.map((song, index) => (
          <LibrarySong song={song} key={index} id={song.id} />
        ))}
      </div>
    </div>
  );
};

export default Library;
