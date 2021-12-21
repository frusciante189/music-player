import React from "react";
import DarkMode from "./DarkMode";
import { useToggle } from "../Provider/Context";

const Navbar = () => {
  const { isLibraryOpen, setIsLibraryOpen } = useToggle();

  return (
    <nav className="flex md:justify-around justify-between md:px-0 sm:px-5 px-2  min-h-[10vh] items-center text-slate-700 dark:text-slate-200">
      <h1 className="text-xl select-none hover:underline underline-offset-auto hover:decoration-pink-400 hover:decoration-2 cursor-pointer">
        Fruisfy
      </h1>
      <div className="flex items-center">
        <button
          className="font-medium hover:underline underline-offset-4 hover:decoration-pink-400 hover:decoration-2 text-lg"
          onClick={() => setIsLibraryOpen(!isLibraryOpen)}
        >
          Library
        </button>
       <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
