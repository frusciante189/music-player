import React from "react";
import { useToggle } from "./Context";

const Layout = ({ children }) => {
  const { isLibraryOpen } = useToggle();
  return (
    <div
      className={`h-screen bg-white dark:bg-neutral-700 relative ${
        isLibraryOpen ? "xl:ml-[10%] lg:ml-[20%] ml-[30%]" : ""
      } transition-all duration-500 ease-in-out`}
    >
      {children}
    </div>
  );
};

export default Layout;
