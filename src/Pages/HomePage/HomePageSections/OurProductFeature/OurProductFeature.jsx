import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const OurProductFeature = () => {
  const [swiper, setSwiper] = useState(null);
  const [isBackButtonActive, setIsBackButtonActive] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch("/DepartmentData.json")
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  const handleBack = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleForward = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const activateBackButton = () => {
    setIsBackButtonActive(true);
  };

  const activateForwardButton = () => {
    setIsBackButtonActive(false);
  };

  return (
    <div className="lg:w-[1200px] lg:mx-auto px-2.5 md:px-5 lg:px-0 my-10 md:my-14 lg:my-16">
      {/* Title of this section */}

      <div className="relative flex flex-col sm:flex-row sm:items-end md:items-start justify-between mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50">
        <div className="px-5 md:px-10 lg:px-0">
          <h2 className="font-primary text-3xl md:text-4xl font-semibold">Our Product Feature!</h2>
        </div>
        <div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
          <div className="nc-NextPrev relative flex items-center text-slate-500 dark:text-slate-50">
            <button
              onClick={handleBack}
              onMouseEnter={activateBackButton}
              onFocus={activateBackButton}
              className={`w-10 h-10 mr-2 rounded-full flex items-center justify-center ${
                isBackButtonActive ? "border-2 border-slate-200 dark:border-slate-600" : ""
              }`}
            >
              <IoIosArrowRoundBack className="w-5 h-5"></IoIosArrowRoundBack>
            </button>
            <button
              onClick={handleForward}
              onMouseEnter={activateForwardButton}
              onFocus={activateForwardButton}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                !isBackButtonActive ? "border-2 border-slate-200 dark:border-slate-600" : ""
              }`}
            >
              <IoIosArrowRoundForward className="w-5 h-5"></IoIosArrowRoundForward>
            </button>
          </div>
        </div>
      </div>

      {/* Slider of this section */}

      <div>
        <Swiper
          // slidesPerView={3}
          breakpoints={{
            380: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          // spaceBetween={20}
          pagination={
            {
              // clickable: true,
            }
          }
          onSwiper={setSwiper}
          className="mySwiper"
        >
          {departments.map((item) => (
            <SwiperSlide key={item.id}>
              {/* <Link to={item.linkTo}> */}
              <div>
                <div className={`flex-1 relative w-full rounded-2xl overflow-hidden group aspect-w-1 aspect-h-1`}>
                  <div>
                    <div className="w-full h-full flex justify-center">
                      <img
                        src={item?.image}
                        className="w-full h-[150px] md:w-[225px] md:h-[170px] lg:w-[275px] lg:h-[220px] rounded-2xl"
                        alt={item?.department}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex-1 text-center">
                  <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-semibold">
                    {item?.department}
                  </h2>
                  <span className="block mt-0.5 sm:mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    {item.products}+ products
                  </span>
                </div>
              </div>
              {/* </Link> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurProductFeature;
