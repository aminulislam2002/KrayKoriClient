import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch products from the API endpoint
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://server.shekshops.com/products");
        if (response.ok) {
          const data = await response.json();
          const sortData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setProducts(sortData);
        } else {
          console.error("Error fetching products");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`https://server.shekshops.com/deleteProduct/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update the products state without the deleted product
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));

        // Show success alert
        Swal.fire({
          title: "Success!",
          text: "Product deleted successfully.",
          icon: "success",
        });
      } else {
        console.error("Error deleting product");

        // Show error alert
        Swal.fire({
          title: "Error!",
          text: "Error deleting product. Please try again later.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);

      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
      });
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="">
      <div className="p-5 bg-white text-slate-800 dark:bg-[#132337] dark:text-slate-50">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="xl:col-span-3 lg:col-span-12 order-2 lg:order-1">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-white dark:bg-[#132337] border border-slate-200 px-3 py-2 rounded-md"
                placeholder="Search for ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="lg:col-span-6 xl:col-span-6 order-1 lg:order-2">
            <h1 className="bg-white text-slate-800 dark:bg-[#132337] dark:text-slate-50 text-base font-semibold font-secondary text-center p-5">
              View All Products
            </h1>
          </div>
          <div className="lg:col-span-3 lg:text-right lg:col-start-10 xl:col-span-3 xl:col-start-11 order-3 lg:order-3">
            <Link
              to="/dashboard/addProduct"
              className="text-white btn bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:text-white focus:bg-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-100 active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100 dark:ring-blue-400/20"
            >
              <FaPlus></FaPlus>
              <span className="align-middle">Add Product</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md overflow-x-auto">
        <table className="w-full whitespace-nowrap table-auto">
          {/* head */}
          <thead className="bg-slate-100 dark:bg-[#1C2E45] text-slate-800 dark:text-slate-50 text-base">
            <tr>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Category</th>
              <th className="px-4 py-2 text-center">Type</th>
              <th className="px-4 py-2 text-center">Price</th>
              <th className="px-4 py-2 text-center">Offer</th>
              <th className="px-4 py-2 text-center">Reviews</th>
              <th className="px-4 py-2 text-center">Image</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#132337] text-slate-800 dark:text-slate-50 text-base">
            {filteredProducts.map((product) => (
              <tr key={product?._id} className="border-t border-slate-400">
                <td className="px-4 py-2" title={product?.name}>
                  <Link className="hover:text-blue-600 hover:underline" to={`/product-details/${product?._id}`}>
                    {product?.name.slice(0, 25)}...
                  </Link>
                </td>
                <td className="px-4 py-2 text-center">{product?.category}</td>
                <td className="px-4 py-2 text-center">{product?.productType}</td>
                <td className="px-4 py-2 text-center">৳{product?.originalPrice}</td>
                <td className="px-4 py-2 text-center">৳{product?.offerPrice}</td>
                <td className="px-4 py-2 text-center">{product?.reviews}</td>
                <td className="px-4 py-2 text-center">
                  <img src={product?.images[0]} alt={`Product ${product?.name}`} className="w-10 h-10" />
                </td>
                <td className="px-4 py-2 text-center w-1/12">
                  <div className="flex gap-1">
                    <button>
                      <Link to={`/dashboard/update/${product?._id}`}>
                        <FaEdit className="w-4 md:w-5 h-5 md:h-7 text-gray-500 hover:text-gray-700"></FaEdit>
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        // Show confirmation alert before deletion
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDeleteProduct(product?._id);
                          }
                        });
                      }}
                    >
                      <RiDeleteBin6Line className="w-4 md:w-5 h-5 md:h-7 text-red-500 hover:text-red-700"></RiDeleteBin6Line>
                    </button>

                    <button>
                      <GrView className="w-4 md:w-5 h-5 md:h-7 text-blue-500 hover:text-blue-700"></GrView>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
