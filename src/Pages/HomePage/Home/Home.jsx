import HowItWorks from "../HomePageSections/HowItWorks/HowItWorks";
import BestSellingProducts from "../HomePageSections/BestSellingProducts/BestSellingProducts";
import OurProductFeature from "../HomePageSections/OurProductFeature/OurProductFeature";
import TopBanner from "../HomePageSections/TopBanner/TopBanner";
import MostPopularItem from "../HomePageSections/MostPopularItem/MostPopularItem";
import PromoSection from "../HomePageSections/PromoSection/PromoSection";
import NewArrivals from "../HomePageSections/NewArrivals/NewArrivals";
import HundredTakaItems from "../HomePageSections/HundredTakaItems/HundredTakaItems";
import useTheme from "../../../Hooks/useTheme";

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <div className="bg-white text-slate-800 dark:bg-[#0F1824] dark:text-slate-50">
        <TopBanner></TopBanner>
        <NewArrivals></NewArrivals>
        <HowItWorks></HowItWorks>
        <MostPopularItem></MostPopularItem>
        <PromoSection></PromoSection>
        <BestSellingProducts></BestSellingProducts>
        <OurProductFeature></OurProductFeature>
        <HundredTakaItems></HundredTakaItems>
      </div>
    </div>
  );
};

export default Home;
