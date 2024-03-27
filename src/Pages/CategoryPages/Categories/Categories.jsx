import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../HomePage/HomePageCard/ProductCard/ProductCard";

const Categories = () => {
  const { subCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.kraykori.com/products");
        const data = await response.json();
        setProducts(data);
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

  console.log("SubCategory", subCategory);

  const filteredProducts = products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((product) => product?.subCategory?.toLowerCase() === subCategory?.toLowerCase());

  return (
    <div className="lg:w-[1200px] lg:mx-auto px-2.5 md:px-5 lg:px-0 my-10 md:my-14 lg:my-16">
      {loading ? (
        <h1>Loading...!</h1>
      ) : (
        <>
          <div className="grid gap-3 md:gap-4 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
            {filteredProducts.map((product) => (
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
  );
};

export default Categories;
