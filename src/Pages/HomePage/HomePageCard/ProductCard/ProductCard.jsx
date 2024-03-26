/* eslint-disable react/prop-types */
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import useTheme from "../../../../Hooks/useTheme";

const ProductCard = ({ id, product, handleFavoriteClick, favorites }) => {
  // Add this function outside the component to calculate discounted price
  const calculateDiscountedPrice = (originalPrice, offerPrice) => {
    // Check if there is an offer price
    if (offerPrice) {
      // Parse the original price as a number
      const price = parseFloat(originalPrice);
      // Parse the offer price as a number
      const offer = parseFloat(offerPrice);
      // Calculate the discounted price
      const discountedPrice = price - offer;
      // Format the discounted price as a string with two decimal places
      return `${discountedPrice.toFixed(2)}`;
    } else {
      // If there is no offer, return the original price as is
      return `${parseFloat(originalPrice).toFixed(2)}`;
    }
  };
  // Add this function outside the component to calculate discounted percentage
  const calculateDiscountedPercentage = (originalPrice, offerPrice) => {
    // Check if there is an offer price
    if (offerPrice) {
      // Parse the original price as a number
      const price = parseFloat(originalPrice);
      // Parse the offer price as a number
      const offer = parseFloat(offerPrice);
      // Calculate the discounted percentage
      const discountedPercentage = 100 - ((price - offer) / price) * 100;
      // Format the discounted percentage as a string with two decimal places
      return `${discountedPercentage.toFixed(2)}%`;
    } else {
      // If there is no offer, return an empty string for the discounted percentage
      return "";
    }
  };

  const getSliceLength = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 400) {
      return 38; // Adjust the length for small screens
    } else if (windowWidth <= 768) {
      return 55; // Adjust the length for medium screens
    } else {
      return 47; // Default length for large screens
    }
  };

  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode && "dark"}`}>
      {/* Product Card */}
      <div
        key={product?._id}
        className="h-[365px] md:h-[430px] lg:h-[430px] flex flex-col justify-start items-center hover:shadow-md bg-slate-50 dark:bg-[#132337]"
      >
        {/* Render filtered product details here */}
        <div className="w-full">
          <div className="flex flex-col bg-transparent">
            <div className="relative flex-shrink-0 overflow-hidden z-[55] group">
              <Link to={`/product-details/${product?._id}`}>
                <div className="flex justify-center items-center aspect-w-11 aspect-h-12 w-full w-w-full h-full">
                  <img
                    alt="product"
                    src={product?.images[0]}
                    className="w-full h-[176px] md:h-[234.67px] lg:h-[224px] object-cover"
                  />
                </div>
              </Link>

              <div className="absolute bottom-0 inset-x-1 space-x-1.5 flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
                {/* Add your size options here */}
                {product?.sizes.map((size) => (
                  <div
                    key={size}
                    className="shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
                  >
                    {size}
                  </div>
                ))}
              </div>

              {/* Favorite icon */}
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-50 shadow-lg absolute top-2 right-2 z-10">
                <div className="absolute top-0 right-0 p-2 rounded-full focus:outline-none">
                  {favorites.includes(product?._id) ? (
                    <>
                      <button onClick={() => handleFavoriteClick(product?._id)}>
                        <MdOutlineFavorite className="w-5 h-5 text-red-500"></MdOutlineFavorite>
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleFavoriteClick(product?._id)}>
                        <MdFavoriteBorder className="w-5 h-5 text-gray-500"></MdFavoriteBorder>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Link to={`/product-details/${product?._id}`}>
              <div className="space-y-2 p-1.5 md:p-2 lg:p-2.5">
                <div className="text-start flex justify-between">
                  <div>
                    <h2 className="text-sm font-semibold dark:text-slate-50 transition-colors">
                      {product?.name.length >= getSliceLength()
                        ? product?.name.slice(0, getSliceLength()) + "..."
                        : product?.name}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-1">
                  {/* Display original price with discounted price */}
                  <div className="col-span-12 flex items-center text-xl font-medium font-primary mb-1">
                    <span className="text-orange-500 font-semibold !leading-none">
                      <span className="text-base me-0.5">৳</span>
                      {calculateDiscountedPrice(product?.originalPrice, product?.offerPrice)}
                    </span>
                  </div>

                  <div className="col-span-12 h-[20px] flex items-center mb-0.5">
                    {product?.offerPrice && (
                      <div>
                        {/* Display discounted percentage if available */}
                        <div className="flex items-center text-sm font-medium">
                          <span className="text-gray-400 line-through !leading-none">৳{product?.originalPrice}</span>
                          <span className="text-green-500 mx-1">
                            -{calculateDiscountedPercentage(product?.originalPrice, product?.offerPrice)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Display rating and number of reviews of the originalPrice */}
                  <div className="col-span-12 flex justify-start items-center">
                    <FaStar className="w-4 h-4 text-amber-400"></FaStar>
                    <span className="text-sm ml-1 text-slate-500 dark:text-slate-50">
                      {product?.ratings} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Buy Now button */}
        <div className="mt-auto w-full p-1.5 md:p-2 lg:p-2.5">
          <Link to={`/product-details/${product?._id}`}>
            <button className="relative h-auto w-full inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-2 px-5 lg:px-10 disabled:bg-opacity-90 bg-green-700 text-slate-50 hover:bg-slate-100 hover:text-slate-800 dark:bg-slate-700 dark:text-slate-50 dark:hover:text-slate-800 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
              <IoBagCheckOutline className="w-5 h-5 me-2"></IoBagCheckOutline>
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
