import React, { useContext } from "react";
import { ThemeContext } from "../Provider/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

const DarkMode = () => {
  const themeHandler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="text-gray-100 flex items-center justify-center px-3 ">
      <button className="text-sm w-1/2" onClick={themeHandler}>
        {theme === "light" ? (
          <HiSun size={24} className="fill-pink-400" />
        ) : (
          <HiMoon size={24} className="fill-pink-400" />
        )}
      </button>
    </div>
  );
};

export default DarkMode;
