import { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeProvider/ThemeProvider";

const useTheme = () => {
  const themeInfo = useContext(ThemeContext);
  return themeInfo;
};

export default useTheme;
