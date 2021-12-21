import React from "react";
import { useToggle } from "../Provider/Context";

const Song = () => {
  const { currentSong } = useToggle();
  return (
    //   Song container
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <img
        src={currentSong.cover}
        className="md:w-1/4 w-3/5 md:text-lg rounded-full transition-all transform duration-[2000ms] ease-in-out dark:opacity-80"
        alt={currentSong.name}
      />
      <h2 className="pt-10 px-4 pb-4 font-medium text-2xl text-slate-700 dark:text-slate-200">
        {currentSong.name}
      </h2>
      <h3 className="text-lg text-slate-700 dark:text-slate-200">
        {currentSong.artist}
      </h3>
    </div>
  );
};

export default Song;
