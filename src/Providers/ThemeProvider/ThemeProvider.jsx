/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const userPreference = localStorage.getItem("darkMode");
    setIsDarkMode(userPreference === "true");
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("darkMode", !isDarkMode);
  };

  const themeInfo = {
    isDarkMode,
    toggleDarkMode,
  };

  return <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
