import { useEffect, useState } from "react";
import ProductCard from "../HomePage/HomePageCard/ProductCard/ProductCard";
import useTheme from "../../Hooks/useTheme";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.kraykori.com/products");
        const data = await response.json();
        const sortData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(sortData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId) ? prevFavorites.filter((id) => id !== productId) : [...prevFavorites, productId]
    );
  };

  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <div className="bg-white text-slate-800 dark:bg-[#0F1824] dark:text-slate-50">
        <div className="lg:w-[1200px] lg:mx-auto px-2.5 md:px-5 lg:px-0 py-10 md:py-14 lg:py-16">
          {loading ? (
            <h1>Loading...!</h1>
          ) : (
            <>
              <div className="grid gap-3 md:gap-4 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {products.map((product) => (
                  <ProductCard
                    key={product?.id}
                    id={product?.id}
                    product={product}
                    handleFavoriteClick={handleFavoriteClick}
                    favorites={favorites}
                  ></ProductCard>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
