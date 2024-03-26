import { Link, useLocation } from "react-router-dom";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { LuUser2, LuSearch } from "react-icons/lu";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

import swift_mart_logo from "../../../assets/Logo/Logo Without Bg.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useTheme from "../../../Hooks/useTheme";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalCartProducts, setTotalCartProducts] = useState(0);
  const { user, logOut } = useContext(AuthContext);

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

  useEffect(() => {
    // Retrieve cart products from local storage
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const countTotalCartProducts = cartProducts.length;

    // Set the total cart products state
    setTotalCartProducts(countTotalCartProducts);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on search query
    const filtered = products.filter((product) => product.name.toLowerCase().includes(query));
    setFilteredProducts(filtered.slice(0, 10)); // Show only the first 10 matching products
  };

  // Function to handle click on a product name
  const handleClickProductName = () => {
    // Clear the search query state when a product name is clicked
    setSearchQuery("");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logout action
        logOut();

        // Show success sweet alert
        Swal.fire({
          title: "Logout Successful",
          text: "You have been successfully logged out.",
          icon: "success",
        }).then(() => {
          // Redirect or perform any additional actions after logout
        });
      }
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Check screen size on mount and update accordingly
  useEffect(() => {
    const handleResize = () => {
      setIsSearchOpen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Check scroll position on mount and update isAtTop accordingly
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update isSearchOpen when the route changes
  useEffect(() => {
    setIsSearchOpen(window.innerWidth <= 768 && location.pathname === "/");
  }, [location.pathname]);

  const navItems = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Shops",
      to: "/shop",
    },
    {
      label: "About us",
      to: "/about-us",
    },
    {
      label: "Contact us",
      to: "/contact-us",
    },
  ];

  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={` sticky top-0 w-full z-[1000] ${isDarkMode && "dark"}`}>
      <div className="bg-green-700 dark:bg-[#132337] text-slate-50">
        <div className="lg:w-[1200px] mx-auto">
          <div className="relative z-10">
            <div className="container mx-auto">
              <div className={`grid grid-cols-12 ${isAtTop && isSearchOpen ? "h-28" : "h-20"} md:h-28  lg:h-20`}>
                {/* Dropdown icon and navbar icon for small and medium devices */}
                <div className="col-span-2 lg:hidden order-1 flex lg:justify-start items-center">
                  <div className="dropdown w-full">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={toggleDropdown}>
                      {isDropdownOpen ? <MdOutlineClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
                    </div>
                    {isDropdownOpen && (
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-green-700 dark:bg-[#132337] mt-3 z-[1] p-2 shadow rounded-md w-52"
                      >
                        <li>
                          {navItems.map((item, index) => (
                            <Link key={index} to={item.to}>
                              {item?.label}
                            </Link>
                          ))}
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                {/* Logo part */}
                <div className="col-span-8 lg:col-span-3 order-2 lg:order-1 flex justify-center lg:justify-start items-center">
                  <Link
                    to="/"
                    className="flex justify-start items-center gap-2 text-xl lg:text-3xl font-bold text-slate-800"
                  >
                    <img src={swift_mart_logo} className="h-8 lg:h-12 w-8 lg:w-12 rounded-full" alt="Logo of ShekShops" />
                    <span className="text-slate-50 font-primary">ShekShops</span>
                  </Link>
                </div>

                {isSearchOpen ? (
                  <>
                    {/* Search input field */}
                    <div
                      className={`${
                        isAtTop || window.innerWidth >= 768 ? "visible" : "hidden"
                      } lg:h-20 col-span-12 order-4 lg:col-span-6 lg:order-2 flex justify-center items-center mx-5 md:mx-5 lg:mx-0`}
                    >
                      <div className="relative flex items-center w-full">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full p-2 mt-3 border border-gray-300 rounded-md text-slate-800"
                          value={searchQuery}
                          onChange={handleSearch}
                        />
                        <button className="absolute right-0 top-5 mr-2" onClick={toggleSearch}>
                          <MdOutlineClose className="text-slate-800 w-5 h-5 hidden lg:block" />
                        </button>
                      </div>
                    </div>

                    {/* Display filtered products */}
                    <div
                      className={`${
                        isAtTop || window.innerWidth >= 768 ? "visible" : "hidden"
                      } col-span-12 order-4 flex justify-center items-center`}
                    >
                      {searchQuery && (
                        <div className="absolute z-10 bg-white top-28 md:-top-5 lg:top-20 rounded-md shadow-lg md:w-full lg:w-1/2 mx-5 md:mx-5 lg:mx-0">
                          {filteredProducts.map((product) => (
                            <div
                              key={product?._id}
                              className="p-2 text-slate-800 hover:underline hover:text-blue-500"
                              onClick={handleClickProductName}
                            >
                              <Link to={`/product-details/${product?._id}`}>{product?.name}</Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Navbar items for largest devices */}
                    <div className="hidden lg:col-span-6 lg:order-2  lg:flex justify-center items-center mx-4">
                      <ul className="flex items-center">
                        {navItems.map((item, index) => (
                          <li key={index} className="menu-item flex-shrink-0">
                            <div className="h-20 flex-shrink-0 flex items-center">
                              <Link
                                to={item.to}
                                className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-50 dark:text-slate-50 dark:hover:text-slate-800 dark:hover:bg-slate-50 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100  uppercase"
                              >
                                {item.label}
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* Search icon, card icon and user authentication icon */}
                <div className="col-span-2 order-3 lg:col-span-3 lg:order-3 flex-1 flex items-center justify-end lg:gap-5 dark:text-slate-50">
                  <div className="">
                    <button
                      className={` ${
                        isSearchOpen
                          ? "hidden"
                          : "hidden lg:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full dark:text-slate-50 hover:bg-slate-800 dark:hover:text-slate-800 dark:hover:bg-slate-50 focus:outline-none"
                      }`}
                      onClick={toggleSearch}
                    >
                      <LuSearch className="w-6 h-5" />
                    </button>
                  </div>

                  <div className="relative">
                    <button
                      className="
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full dark:text-slate-50 hover:bg-slate-800 dark:hover:text-slate-800 dark:hover:bg-slate-50 focus:outline-none flex items-center justify-center"
                      type="button"
                    >
                      <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                        <span className="mt-[1px] bg-blue-500 p-1 rounded-full">{totalCartProducts}</span>
                      </div>
                      <Link to="/cart">
                        <IoCartOutline className="w-6 h-6" />
                      </Link>
                    </button>
                  </div>

                  <div className={`${isDarkMode && "dark"}`}>
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full dark:text-slate-50 hover:bg-slate-800 dark:hover:text-slate-800 dark:hover:bg-slate-50 focus:outline-none flex items-center justify-center"
                        type="button"
                      >
                        <LuUser2 className="w-6 h-6" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content bg-green-700 dark:bg-slate-900 z-[1] grid grid-cols-1 gap-3 p-3 shadow rounded-md w-52"
                      >
                        <li>
                          {user ? (
                            <>
                              <Link to="/dashboard">
                                <button className="w-full py-2 px-3 rounded-md text-start dark:bg-slate-800 text-sm">
                                  Dashboard
                                </button>
                              </Link>
                            </>
                          ) : (
                            <></>
                          )}
                        </li>
                        <li>
                          {user ? (
                            <>
                              <button
                                className="w-full py-2 px-3 rounded-md text-start dark:bg-slate-800 text-sm"
                                onClick={handleLogout}
                              >
                                Logout
                              </button>
                            </>
                          ) : (
                            <>
                              <Link to="authentication/register">
                                <button className="w-full py-2 px-3 rounded-md text-start dark:bg-slate-800 text-sm">
                                  Register / Login
                                </button>
                              </Link>
                            </>
                          )}
                        </li>
                        <li>
                          <button
                            onClick={toggleDarkMode}
                            className="w-full py-2 px-3 rounded-md text-start dark:bg-slate-100 bg-green-700 text-sm text-slate-50 dark:text-slate-800 font-secondary font-semibold"
                          >
                            {isDarkMode ? (
                              <>
                                <div className="flex justify-start items-center">
                                  <CiLight className="w-5 h-5 mr-2 inline" />
                                  <span>Light Mode</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex justify-start items-center">
                                  <MdDarkMode className="w-5 h-5 mr-2 inline" />
                                  <span>Dark Mode</span>
                                </div>
                              </>
                            )}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
