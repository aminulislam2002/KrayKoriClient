import { useEffect, useState } from "react";
import ProductCard from "../../HomePageCard/ProductCard/ProductCard";

const HundredTakaItems = () => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.kraykori.com/products");
        if (response.ok) {
          const data = await response.json();
          // Filter products only 100 Tk Items category products
          const filterProducts = data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .filter((item) => item.category === "100 Tk Items");
          setProducts(filterProducts);
          setDisplayedProducts(filterProducts.slice(0, 10)); // Initially display 10 products
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

  const handleShowMoreClick = () => {
    setDisplayedProducts(products); // Show all products
    setShowAllProducts(true);
  };

  const handleShowLessClick = () => {
    setDisplayedProducts(products.slice(0, 10)); // Display only 10 products
    setShowAllProducts(false);
  };

  return (
    <div className="lg:w-[1200px] lg:mx-auto px-2.5 md:px-5 lg:px-0 py-10 md:py-14 lg:py-16">
      {/* Title of this section */}
      <div className="relative mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50">
        <div className="px-5 md:px-10 lg:px-0">
          <h2 className="font-primary text-3xl md:text-4xl font-semibold">
            100 TK Items<span>! </span>
          </h2>
        </div>
      </div>

      {/* Products Section */}
      <div className="grid gap-2 md:gap-3 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
        {displayedProducts.map((product) => (
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
          className={`relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-[#0DA487] text-slate-50 hover:bg-slate-200 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-slate-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0
  ${products.length > 10 ? "block" : "hidden"}`}
          onClick={showAllProducts ? handleShowLessClick : handleShowMoreClick}
        >
          {showAllProducts ? <>Show Less</> : <>Show Me More</>}
        </button>
      </div>
    </div>
  );
};

export default HundredTakaItems;
