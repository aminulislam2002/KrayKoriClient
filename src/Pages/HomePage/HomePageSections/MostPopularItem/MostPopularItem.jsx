/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
// import { FaFilter } from "react-icons/fa";
// import { FiChevronDown } from "react-icons/fi";
import ProductCard from "../../HomePageCard/ProductCard/ProductCard";

const MostPopularItem = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [displayedProductsCount, setDisplayedProductsCount] = useState(10);

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

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId) ? prevFavorites.filter((id) => id !== productId) : [...prevFavorites, productId]
    );
  };

  const filteredProducts =
    selectedCategory === "All Items"
      ? products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, displayedProductsCount)
      : products
          .filter((product) => product?.category.toLowerCase() === selectedCategory.toLowerCase())
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, displayedProductsCount);

  const handleShowMoreClick = () => {
    const currentDisplayedCount = displayedProductsCount;
    const newDisplayedCount = currentDisplayedCount + 10;
    setDisplayedProductsCount(newDisplayedCount);
    setShowAllProducts(newDisplayedCount >= products.length);
  };

  const handleShowLessClick = () => {
    setDisplayedProductsCount(10); // Display only 4 products
    setShowAllProducts(false);
  };

  // const randomProducts = (array) => {
  //   return array.sort(() => Math.random() - 0.5);
  // };

  return (
    <div className="lg:w-[1200px] lg:mx-auto px-2.5 md:px-5 lg:px-0 my-10 md:my-14 lg:my-16">
      {/* Title of this section */}

      <div className="relative mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50">
        <div className="px-5 md:px-10 lg:px-0">
          <h2 className="font-primary text-3xl md:text-4xl font-semibold">
            Most Popular Item<span>! </span>
          </h2>
        </div>
      </div>

      {/* Product Filter Section */}

      <div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
          <nav className="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar" data-nc-id="Nav">
            <ul className="flex sm:space-x-2 gap-1 lg:gap-0">
              <li>
                <button
                  className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full
                ${
                  selectedCategory === "All Items"
                    ? "bg-green-700 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
                    : "text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800"
                }
                 focus:outline-none`}
                  onClick={() => setSelectedCategory("All Items")}
                >
                  All Items
                </button>
              </li>
              <li>
                <button
                  className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full
                 ${
                   selectedCategory === "Backpacks"
                     ? "bg-green-700 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
                     : "text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800"
                 }
                  focus:outline-none`}
                  onClick={() => setSelectedCategory("backpacks")}
                >
                  Backpacks
                </button>
              </li>
              <li>
                <button
                  className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full
                 ${
                   selectedCategory === "Women"
                     ? "bg-green-700 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
                     : "text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800"
                 }
                  focus:outline-none`}
                  onClick={() => setSelectedCategory("Women")}
                >
                  Women
                </button>
              </li>
              <li>
                <button
                  className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full
                ${
                  selectedCategory === "Mens"
                    ? "bg-green-700 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
                    : "text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800"
                }
                 focus:outline-none`}
                  onClick={() => setSelectedCategory("Mens")}
                >
                  Mens
                </button>
              </li>
              <li>
                <button
                  className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full
                ${
                  selectedCategory === "Kitchen Items"
                    ? "bg-green-700 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
                    : "text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800"
                }
                 focus:outline-none`}
                  onClick={() => setSelectedCategory("Kitchen Items")}
                >
                  Kitchen Items
                </button>
              </li>
              <li>
                <button
                  className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full
                ${
                  selectedCategory === "100 Tk Items"
                    ? "bg-green-700 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
                    : "text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800"
                }
                 focus:outline-none`}
                  onClick={() => setSelectedCategory("100 Tk Items")}
                >
                  100 Tk Items
                </button>
              </li>
              <li>
                <button
                  className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full
                ${
                  selectedCategory === "Gadget Items"
                    ? "bg-green-700 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
                    : "text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800"
                }
                 focus:outline-none`}
                  onClick={() => setSelectedCategory("Gadget Items")}
                >
                  Gadget Items
                </button>
              </li>
              <li>
                <button
                  className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full
                ${
                  selectedCategory === "Home Improvement"
                    ? "bg-green-700 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
                    : "text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800"
                }
                 focus:outline-none`}
                  onClick={() => setSelectedCategory("Home Improvement")}
                >
                  Home Improvement
                </button>
              </li>
            </ul>
          </nav>
          {/* <span className="block flex-shrink-0">
            <button
              className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium pl-4 py-2.5 sm:pl-6 disabled:bg-opacity-90 bg-green-700 text-slate-50 hover:bg-slate-200 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-slate-800 shadow-xl w-full !pr-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
              // onClick={handleSubmit(onSubmit)}
            >
              <FaFilter className="w-6 h-6" />
              <span className="block truncate ml-2.5">Filter</span>
              <span className="absolute top-1/2 -translate-y-1/2 right-5">
                <FiChevronDown className="w-6 h-6"></FiChevronDown>
              </span>
            </button>
          </span> */}
        </div>
      </div>

      {/* Products Section */}

      <div className="grid gap-2 md:gap-3 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            product={product}
            handleFavoriteClick={handleFavoriteClick}
            favorites={favorites}
          />
        ))}
      </div>

      {/* Show more/less button Section */}
      <div className="flex mt-16 justify-center items-center">
        <button
          className={`relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-green-700 text-slate-50 hover:bg-slate-200 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-slate-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0
  ${filteredProducts.length >= 10 ? "block" : "hidden"}`}
          onClick={showAllProducts ? handleShowLessClick : handleShowMoreClick}
        >
          {showAllProducts ? <>Show Less</> : <>Show Me More</>}
        </button>
      </div>
    </div>
  );
};

export default MostPopularItem;
