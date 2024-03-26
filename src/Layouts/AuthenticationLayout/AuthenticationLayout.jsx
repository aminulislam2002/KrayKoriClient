import { Outlet } from "react-router-dom";
import NavBar from "../../Pages/SharedPages/NavBar/NavBar";
import Footer from "../../Pages/SharedPages/Footer/Footer";
import useTheme from "../../Hooks/useTheme";

const AuthenticationLayout = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`${isDarkMode && "dark"}`}>
      <div className="bg-white text-slate-800 dark:bg-[#0F1824] dark:text-slate-50">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
