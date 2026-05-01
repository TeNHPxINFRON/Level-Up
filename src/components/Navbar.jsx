import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import { signOut } from "firebase/auth";

import { auth } from "../firebase";

import { ThemeContext } from "../context/ThemeContext";

function Navbar() {

  const navigate = useNavigate();

  const { darkMode, toggleDarkMode } =
  useContext(ThemeContext);

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div 
    className={`min-h-16 bg-white shadow flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4 
      ${
        darkMode? "bg-gray-800 text-white": "bg-white text-black"
        }`}>

      <h2 className="text-xl font-semibold">
        Welcome Back
      </h2>
      
      <div className="flex gap-3">
        
        <button onClick={toggleDarkMode} className="bg-gray-700 text-white px-4 py-2 rounded-lg">
          {darkMode ? "Light" : "Dark"}
        </button>
        
        <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded-lg">
          Logout
        </button>

      </div>
      
    </div>
  );
}

export default Navbar;