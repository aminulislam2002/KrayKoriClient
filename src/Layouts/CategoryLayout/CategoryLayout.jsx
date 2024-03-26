import { Outlet } from "react-router-dom";
import NavBar from "../../Pages/SharedPages/NavBar/NavBar";
import Footer from "../../Pages/SharedPages/Footer/Footer";
import PromoSectionTwo from "../../Pages/SharedPages/PromoSectionTwo/PromoSectionTwo";
import useTheme from "../../Hooks/useTheme";

const CategoryLayout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <div className="bg-white text-slate-800 dark:bg-[#0F1824] dark:text-slate-50">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <PromoSectionTwo></PromoSectionTwo>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default CategoryLayout;
