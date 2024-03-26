/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./TopBanner.css";

import right_image_1 from "../../../../assets/Banner/right-image-1.gif";
import right_image_2 from "../../../../assets/Banner/right-image-2.gif";
import right_image_3 from "../../../../assets/Banner/right-image-3.gif";

import slider_image_1 from "../../../../assets/Banner/slider-image-1.png";
import slider_image_2 from "../../../../assets/Banner/slider-image-2.png";
import slider_image_3 from "../../../../assets/Banner/slider-image-3.png";
import slider_image_4 from "../../../../assets/Banner/slider-image-4.png";
import { FaFilter } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const TopBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  // Define your category options array
  const categoryOptions = [
    { category: "all", label: "All Categories" },
    { category: "bag", label: "Bag Items" },
    { category: "women", label: "Women Items" },
    { category: "mens", label: "Mens Items" },
    { category: "kitchen", label: "Kitchen Items" },
    { category: "gadget", label: "Gadget Items" },
    { category: "hundred taka", label: "100 TK Items" },
    { category: "home improvement", label: "Home Improvement" },
  ];

  return (
    <div className="lg:w-[1200px] lg:mx-auto px-2.5 md:px-5 lg:px-0 mb-10 md:mb-14 lg:mb-16 bg-white dark:bg-[#0F1824]">
      {/* Category, slider and image section */}
      <div className="grid grid-cols-12 md:gap-5">
        {/* Notice section */}
        <div className="col-span-12">
          <div className="text-slate-800 dark:text-slate-50 py-2 px-4 rounded-md">
            <marquee direction="left" behavior="scroll" scrollamount="5">
              {/* Adjust the content and styling as needed */}
              <p className="mb-0 text-lg font-semibold">
                বাংলাদেশের অন্যতম বৃহত্তম শপিং প্লাটফর্ম ShekShops.com এ আপনাকে স্বাগতম!!! কেনাকাটায় থাকছে বিশেষ
                মূল্যছাড়!!! সারাদেশের সকল জেলা,উপজেলা এবং ইউনিয়ন পর্যায়ে থাকছে হোম ডেলিভারি সুবিধা। প্রয়োজনীয় প্রোডাক্ট
                পেতে আমাদের সাথেই থাকুন। হেল্পলাইন ☎ +880 1704-268005
              </p>
            </marquee>
          </div>
        </div>

        {/* Left side category part */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="border-0 md:border dark:border-slate-700 py-1">
            <ul className="list-none pl-0 py-1 hidden md:block">
              {/* Map through the categoryOptions array to generate dynamic options */}
              {categoryOptions.map((option) => (
                <li
                  key={option?.category}
                  className="lg:mb-2 md:mb-1.5 lg:py-2 md:py-1.5 lg:ps-5 md:ps-3 transition-transform transform duration-300 hover:translate-x-2 group"
                >
                  <Link
                    to={`/category/${option?.category.toLowerCase()}`}
                    state={{ category: option?.category.toLowerCase() }}
                    className={`text-slate-900 dark:text-slate-50 group-hover:text-[#0099ff]`}
                  >
                    {option?.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex-shrink-0 relative block md:hidden mb-5">
              <button
                onClick={toggleDropdown}
                className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium pl-4 py-2.5 sm:pl-6 disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-800 dark:text-slate-50 hover:bg-slate-800 text-slate-50 shadow-xl w-full !pr-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
              >
                <FaFilter className="w-6 h-6" />
                <span className="block truncate ml-2.5">Show All Category</span>
                <span className="absolute top-1/2 -translate-y-1/2 right-5">
                  {showDropdown ? <FiChevronUp className="w-6 h-6" /> : <FiChevronDown className="w-6 h-6" />}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute w-1/2 z-10 mt-2 bg-white border rounded-md shadow-lg dark:bg-slate-800">
                  <ul className="py-1">
                    {categoryOptions.map((option) => (
                      <li
                        key={option?.category}
                        className="py-2 ps-5 transition-transform transform duration-300 hover:translate-x-2 group"
                      >
                        <Link
                          to={`/category/${option?.category.toLowerCase()}`}
                          state={{ category: option?.category.toLowerCase() }}
                          className={`text-slate-900 dark:text-slate-50 group-hover:text-[#0099ff]`}
                        >
                          {option?.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle - slider part */}
        <div className="col-span-12 md:col-span-9 lg:col-span-8">
          <div>
            <>
              <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                  <div className="keen-slider__slide number-slide1">
                    <img src={slider_image_1} className="w-full h-[250px] md:h-[350px] lg:h-[400px]" alt="Slider image 1" />
                  </div>

                  <div className="keen-slider__slide number-slide2">
                    <img src={slider_image_2} className="w-full h-[250px] md:h-[350px] lg:h-[400px]" alt="Slider image 2" />
                  </div>

                  <div className="keen-slider__slide number-slide3">
                    <img src={slider_image_3} className="w-full h-[250px] md:h-[350px] lg:h-[400px]" alt="Slider image 3" />
                  </div>

                  <div className="keen-slider__slide number-slide4">
                    <img src={slider_image_4} className="w-full h-[250px] md:h-[350px] lg:h-[400px]" alt="Slider image 4" />
                  </div>
                </div>
                {loaded && instanceRef.current && (
                  <>
                    <Arrow
                      left
                      onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
                      disabled={currentSlide === 0}
                    />

                    <Arrow
                      onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
                      disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                    />
                  </>
                )}
              </div>
              {loaded && instanceRef.current && (
                <div className="dots">
                  {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          instanceRef.current?.moveToIdx(idx);
                        }}
                        className={"dot" + (currentSlide === idx ? " active" : "")}
                      ></button>
                    );
                  })}
                </div>
              )}
            </>
          </div>
        </div>

        {/* Right side image part */}
        <div className="hidden lg:block md:col-span-12 lg:col-span-2">
          <div className="">
            <img src={right_image_1} alt="right_image_1" className="mb-5 lg:h-[119px] w-full" />
            <img src={right_image_2} alt="right_image_2" className="mb-5 lg:h-[119px] w-full" />
            <img src={right_image_3} alt="right_image_3" className="mb-5 lg:h-[119px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
}

export default TopBanner;
