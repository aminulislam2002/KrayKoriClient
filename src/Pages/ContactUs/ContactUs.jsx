import useTheme from "../../Hooks/useTheme";
import { FaFacebook, FaTwitterSquare, FaTelegram, FaYoutubeSquare } from "react-icons/fa";

const ContactUs = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`${isDarkMode && "dark"}`}>
      <div className="bg-white text-slate-800 dark:bg-[#0F1824] dark:text-slate-50">
        <div className="lg:w-[1200px] lg:mx-auto px-2.5 md:px-5 lg:px-0 py-10 md:py-14 lg:py-16">
          <h2 className="mb-10 md:mb-14 lg:mb-16 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-slate-900 dark:text-slate-100 justify-center">
            Contact Us
          </h2>
          <div className="container max-w-7xl mx-auto">
            <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-12 ">
              <div className="max-w-sm space-y-8">
                <div>
                  <h3 className="uppercase font-semibold text-sm dark:text-slate-200 tracking-wider">🗺 ADDRESS</h3>
                  <span className="block mt-2 text-slate-500 dark:text-slate-400">
                    Shewrapara, Mirpur. Dhaka, Bangladesh
                  </span>
                </div>
                <div>
                  <h3 className="uppercase font-semibold text-sm dark:text-slate-200 tracking-wider">💌 EMAIL</h3>
                  <span className="block mt-2 text-slate-500 dark:text-slate-400">forhadreza7872@gmail.com</span>
                </div>
                <div>
                  <h3 className="uppercase font-semibold text-sm dark:text-slate-200 tracking-wider">☎ PHONE</h3>
                  <span className="block mt-2 text-slate-500 dark:text-slate-400"> +880 1704-268005</span>
                </div>
                <div>
                  <h3 className="uppercase font-semibold text-sm dark:text-slate-200 tracking-wider">🌏 SOCIALS</h3>
                  <nav className="nc-SocialsList flex space-x-2.5 text-2xl text-slate-6000 dark:text-slate-300 mt-2">
                    <a className="block w-6 h-6" href="#" target="_blank" rel="noopener noreferrer" title="Facebook">
                      <FaFacebook></FaFacebook>
                    </a>
                    <a className="block w-6 h-6" href="#" target="_blank" rel="noopener noreferrer" title="Twitter">
                      <FaTwitterSquare></FaTwitterSquare>
                    </a>
                    <a className="block w-6 h-6" href="#" target="_blank" rel="noopener noreferrer" title="Youtube">
                      <FaTelegram></FaTelegram>
                    </a>
                    <a className="block w-6 h-6" href="#" target="_blank" rel="noopener noreferrer" title="Telegram">
                      <FaYoutubeSquare></FaYoutubeSquare>
                    </a>
                  </nav>
                </div>
              </div>
              <div>
                <form className="grid grid-cols-1 gap-6">
                  <label className="block">
                    <label className="nc-Label text-base font-medium text-slate-900 dark:text-slate-200 " data-nc-id="Label">
                      Full name
                    </label>
                    <input
                      className="block w-full bg-slate-100 border border-slate-200 focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50 dark:border-slate-700 dark:focus:ring-slate-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1"
                      placeholder="Example Doe"
                      type="text"
                    />
                  </label>
                  <label className="block">
                    <label className="nc-Label text-base font-medium text-slate-900 dark:text-slate-200 " data-nc-id="Label">
                      Email address
                    </label>
                    <input
                      className="block w-full bg-slate-100 border border-slate-200 focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50 dark:border-slate-700 dark:focus:ring-slate-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1"
                      placeholder="example@example.com"
                      type="email"
                    />
                  </label>
                  <label className="block">
                    <label className="nc-Label text-base font-medium text-slate-900 dark:text-slate-200 " data-nc-id="Label">
                      Message
                    </label>
                    <textarea
                      className="block w-full text-sm rounded-2xl border border-slate-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-slate-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 mt-1"
                      rows="6"
                    ></textarea>
                  </label>
                  <div>
                    <button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-green-700 text-slate-50 hover:bg-slate-100 hover:text-slate-800 dark:bg-[#132337]  dark:text-slate-50 dark:hover:bg-slate-900 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
