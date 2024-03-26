// Import necessary React and Tailwind CSS classes
import { Link } from "react-router-dom";
import image from "../../../assets/PromoSection/promo1.png";
import logo from "../../../assets/Logo/Logo Black Bg.png";

const PromoSectionOne = () => {
  return (
    <div className="my-16 lg:my-24 container mx-auto relative flex flex-col lg:flex-row items-center">
      <div className="relative flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        {/* Logo */}
        <Link
          to="/"
          className="w-28 flex justify-start items-center gap-2 text-xl lg:text-2xl font-bold text-slate-800 dark:text-white font-primary"
          href="/"
        >
          <img src={logo} className="rounded-full w-10 h-10" alt="SwiftMart Logo" />
          <span>SwiftMart</span>
        </Link>
        {/* Heading and Description */}
        <h2 className="font-semibold font-primary text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.2] tracking-tight text-slate-900 dark:text-slate-50">
          Earn free money <br /> with SwiftMart
        </h2>
        <span className="block mt-6 text-slate-500 dark:text-slate-50">
          With Swift Mart you will get freeship & savings combo...
        </span>
        {/* Buttons */}
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          <a
            className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-50 dark:hover:text-slate-50 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
            href="/collection"
          >
            Savings combo
          </a>
          <a
            className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-50 hover:bg-gray-200 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
            href="/search"
          >
            Discover more
          </a>
        </div>
      </div>
      {/* Image */}
      <div className="relative flex-1 max-w-xl lg:max-w-none">
        <div>
          <img
            src={image}
            className="w-[350px] h-[250px] md:w-[576px] md:h-[409px] lg:w-[680px] lg:h-[480px]"
            alt="Promo Image"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoSectionOne;
