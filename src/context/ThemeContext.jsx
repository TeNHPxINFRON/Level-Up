import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {

  const [darkMode, setDarkMode] = useState(() => {

    const savedTheme =
      localStorage.getItem("darkMode");

    return savedTheme
      ? JSON.parse(savedTheme)
      : false;
  });

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

  }, [darkMode]);

  function toggleDarkMode() {

    setDarkMode(!darkMode);
  }

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;