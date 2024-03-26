// Import necessary dependencies
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../../HomePageCard/ProductCard/ProductCard";

const NewArrivals = () => {
  // State and functions for handling slides
  const [swiper, setSwiper] = useState(null);
  const [isBackButtonActive, setIsBackButtonActive] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.kraykori.com/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error fetching products");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
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

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId) ? prevFavorites.filter((id) => id !== productId) : [...prevFavorites, productId]
    );
  };

  const filteredProducts = products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((product) => product?.productType === "New Arrivals");

  return (
    <div className="lg:w-[1200px] lg:mx-auto px-2.5 md:px-5 lg:px-0 my-10 md:my-14 lg:my-16">
      {/* Title of this section */}

      <div className="relative flex flex-col sm:flex-row sm:items-end md:items-start justify-between mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50">
        <div className="px-5 md:px-10 lg:px-0">
          <h2 className="font-primary text-3xl md:text-4xl font-semibold">
            New Arrivals<span>! </span>
          </h2>
        </div>
        <div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
          <div className="NextPrev relative flex items-center text-slate-500 dark:text-slate-50">
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
          // slidesPerView={4}
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
              slidesPerView: 5,
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
          {filteredProducts.map((product) => (
            <SwiperSlide key={product?._id}>
              <ProductCard
                id={product?._id}
                product={product}
                handleFavoriteClick={handleFavoriteClick}
                favorites={favorites}
              ></ProductCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewArrivals;
