import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

function Layout({ children }) {

  const { darkMode } =
  useContext(ThemeContext);
  return (
  <div className="flex flex-col md:flex-row">
    <Sidebar />

<div 
className={`flex-1 min-h-screen 
  ${
    darkMode? "bg-gray-900 text-white": 
          "bg-gray-100 text-black"
          }`} >

        <Navbar />

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;