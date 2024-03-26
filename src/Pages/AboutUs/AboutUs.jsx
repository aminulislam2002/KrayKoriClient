import useTheme from "../../Hooks/useTheme";
import aboutUsImage from "../../assets/AboutUs/about_us.png";

const AboutUs = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <div className="bg-white text-slate-800 dark:bg-[#0F1824] dark:text-slate-50">
        <div className="lg:w-[1200px] lg:mx-auto px-2.5 md:px-5 lg:px-0 py-10 md:py-14 lg:py-16">
          <div className="nc-SectionHero relative">
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left">
              <div className="w-full max-w-lg space-y-5 lg:space-y-7">
                <h2 className="text-4xl font-semibold text-neutral-900 md:text-5xl lg:text-6xl dark:text-neutral-100">
                  👋 About Us
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                  We’re impartial and independent, creating distinctive, world-class programmes and content that inform,
                  educate, and entertain millions of people around the world every day.
                </p>
              </div>
              <div className="flex-grow">
                <img src={aboutUsImage} className="rounded-lg shadow-lg" alt="About us image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
