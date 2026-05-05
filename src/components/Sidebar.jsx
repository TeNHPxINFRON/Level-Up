import { Link } from "react-router-dom";

import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

function Sidebar() {

  const { darkMode } =
    useContext(ThemeContext);

  return (

    <div
      className={`w-full md:w-64 min-h-screen p-5 ${
        darkMode
          ? "bg-black text-white"
          : "bg-gray-900 text-white"
      }`}
    >

      <h1 className="text-3xl font-bold mb-10">
        LevelUp
      </h1>

      <div className="flex flex-col gap-4">

        <Link to="/">
          Dashboard
        </Link>

        <Link to="/tasks">
          Tasks
        </Link>

        <Link to="/analytics">
          Analytics
        </Link>

        <Link to="/profile">
          Profile
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;