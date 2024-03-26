/* eslint-disable react/no-unescaped-entities */
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaTruckArrowRight } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Providers/AuthProvider/AuthProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa";
import useTheme from "../../../../Hooks/useTheme";

const CheckoutCard = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const productData = location?.state?.data;
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [myCartProducts, setMyCartProducts] = useState(productData);

  const [customerData, setCustomerData] = useState({
    name: "",
    email: user?.email,
    mobileNumber: "",
    district: "",
    address: "",
    comment: "",
    addressType: "Home",
    deliveryArea: "Inside of Dhaka",
    paymentSystem: "Cash On Delivery",
    deliveryCharge: 60.0,
  });

  const [disableConfirmButton, setDisableConfirmButton] = useState(true);

  useEffect(() => {
    // Check if any required field is empty or mobile number length is not 11
    const isAnyFieldEmptyOrMobileNumberInvalid = Object.entries(customerData).some(([key, value]) => {
      if (key === "mobileNumber" && value.length !== 11) {
        return true; // Return true if mobile number length is not 11
      }
      return key !== "comment" && (value === "" || value === null);
    });
    setDisableConfirmButton(isAnyFieldEmptyOrMobileNumberInvalid);
  }, [customerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate mobileNumber field
    if (name === "mobileNumber") {
      // Ensure the value is a non-negative integer
      if (!/^\d*$/.test(value) || parseInt(value) < 0) {
        // Display an error message or handle it based on your UI/UX requirements
        console.error("Invalid input for mobile number");
        return;
      }

      // Check if the entered mobile number is within the allowed length
      if (value.length <= 11) {
        // Update the state
        setCustomerData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      } else {
        // Display a message or handle it based on your UI/UX requirements
        alert("Number must be 11 digit");
      }
    } else {
      // For other fields, update the state as usual
      setCustomerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDeliveryAreaChange = (value) => {
    let deliveryCharge = 0;

    // Update deliveryArea based on the selected value
    setCustomerData((prevData) => ({
      ...prevData,
      deliveryArea: value,
    }));

    // Set delivery charge based on the selected delivery area
    if (value === "Inside of Dhaka") {
      deliveryCharge = 60.0;
    } else if (value === "Outside of Dhaka") {
      deliveryCharge = 120.0;
    }

    // Update delivery charge in customerData with 2 decimal places
    setCustomerData((prevData) => ({
      ...prevData,
      deliveryCharge: parseFloat(deliveryCharge.toFixed(2)),
    }));
  };

  const handlePaymentSystemChange = (value) => {
    setCustomerData((prevData) => ({
      ...prevData,
      paymentSystem: value,
    }));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = myCartProducts.map((product) => {
      if (product?._id === productId) {
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    });
    setMyCartProducts(updatedProducts);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedQuantity = myCartProducts.find((product) => product._id === productId).quantity + 1;
    handleQuantityChange(productId, updatedQuantity);
  };

  const handleDecreaseQuantity = (productId) => {
    const currentQuantity = myCartProducts.find((product) => product._id === productId).quantity;
    if (currentQuantity > 1) {
      const updatedQuantity = currentQuantity - 1;
      handleQuantityChange(productId, updatedQuantity);
      setSelectedQuantity(updatedQuantity);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`https://api.kraykori.com/deleteProductFromCart/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Update the products state without the deleted product
          const filterProducts = (prevProducts) => prevProducts.filter((product) => product._id !== productId);
          setMyCartProducts(filterProducts);

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
    }
  };

  // Pricing count part
  const subTotal = myCartProducts.reduce((total, product) => {
    return total + product.originalPrice * product.quantity;
  }, 0);

  const total = subTotal + customerData.deliveryCharge;

  // Time and date set part
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")} ${
    months[currentDate.getMonth()]
  }, ${currentDate.getFullYear()}`;

  let hours = currentDate.getHours();
  const meridiem = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  const formattedTime = `${hours.toString().padStart(2, "0")}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${meridiem}`;

  const handleSaveAndConfirmOrder = () => {
    const orderInfo = {
      date: formattedDate,
      time: formattedTime,
      subTotal: subTotal,
      total: total,
      orderStatus: "Pending",
      products: myCartProducts,
      customerData: customerData,
    };

    // Assuming you have the fetch API available in your environment
    fetch("https://api.kraykori.com/postOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save order.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.insertedId) {
          // Show alert if insertedId exists
          Swal.fire({
            icon: "success",
            title: "Order Confirmed!",
            text: "ধন্যবাদ! আপনার অর্ডারটি কনফার্ম হয়েছে। ডেলিভারির জন্য প্রস্তুত করার আগে আমরা ফোন করে নিশ্চিত করবো।",
          });
        }
        navigate("/");
      })
      .catch((error) => {
        console.error("Error saving order:", error);

        // Error message with SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save order. Please try again.",
        });
      });
  };

  const getSliceLength = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 400) {
      return 20; // Adjust the length for small screens
    } else if (windowWidth <= 768) {
      return 180; // Adjust the length for medium screens
    } else {
      return 30; // Default length for large screens
    }
  };

  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <div className="bg-white text-slate-800 dark:bg-[#0F1824] dark:text-slate-50">
        <div className="lg:w-[1200px] mx-auto py-2 md:py-3 lg:py-5 px-2.5 md:px-7 lg:px-0">
          <div className="mb-10 md:mb-14">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">Checkout</h2>
            <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
              <Link className="hover:underline" to="/">
                Homepage
              </Link>
              <span className="text-xs mx-1 sm:mx-1.5">/</span>
              <span className="underline">Checkout</span>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-7 order-1 border border-slate-200 mb-5 lg:mb-0 lg:me-5 rounded-xl overflow-hidden">
              <div className="scroll-mt-24">
                <div className=" dark:border-slate-700 rounded-xl ">
                  <div className="p-6 flex flex-col sm:flex-row items-start">
                    <span className="hidden sm:block">
                      <FaTruckArrowRight className="w-5 h-5"></FaTruckArrowRight>
                    </span>
                    <div className="sm:ml-8">
                      <h3 className=" text-slate-700 dark:text-slate-300 flex ">
                        <span className="uppercase">SHIPPING ADDRESS</span>
                        <IoCheckmarkDoneSharp className="w-5 h-5 ms-2"></IoCheckmarkDoneSharp>
                      </h3>
                      <div className="font-semibold mt-1 text-sm"></div>
                    </div>
                    <button className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg">
                      Change
                    </button>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 block">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                      <div>
                        <label className="font-medium text-slate-900 dark:text-slate-200 text-sm">Full Name</label>
                        <input
                          name="name"
                          value={customerData.name}
                          onChange={handleChange}
                          className="block w-full border border-slate-200 mb-2 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-slate-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-2"
                          type="text"
                          placeholder="আপনার নাম লিখুন"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-slate-900 dark:text-slate-200 text-sm">Mobile Number</label>
                        <input
                          name="mobileNumber"
                          value={customerData.mobileNumber}
                          onChange={handleChange}
                          className="block w-full border border-slate-200 mb-2 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-slate-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-2"
                          type="number"
                          placeholder="আপনার মোবাইল নাম্বার লিখুন"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                      <div>
                        <label className="font-medium text-slate-900 dark:text-slate-200 text-sm">Your District</label>
                        <input
                          name="district"
                          value={customerData.district}
                          onChange={handleChange}
                          className="block w-full border border-slate-200 mb-2 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-slate-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-2"
                          type="text"
                          placeholder="আপনার জেলা লিখুন"
                        />
                      </div>
                      <div className="">
                        <label className="font-medium text-slate-900 dark:text-slate-200 text-sm">Full Address</label>
                        <input
                          name="address"
                          value={customerData.address}
                          onChange={handleChange}
                          className="block w-full border border-slate-200 mb-2 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-slate-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-2"
                          type="text"
                          placeholder="আপনার পূর্ণাঙ্গ ঠিকানা লিখুন"
                        />
                      </div>
                    </div>

                    <div className="">
                      <label className="font-medium text-slate-900 dark:text-slate-200 text-sm">Comments (Optional)</label>
                      <input
                        name="comment"
                        value={customerData.comment}
                        onChange={handleChange}
                        className="block w-full border border-slate-200 mb-2 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-slate-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-2"
                        type="textarea"
                        placeholder="আপনার কোনো মন্তব্য থাকলে লিখুন
                    "
                      />
                    </div>

                    <div>
                      <label className="font-medium text-slate-900 dark:text-slate-200 text-sm">Delivery area</label>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3">
                        <div className="flex items-center text-sm sm ">
                          <input
                            className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                            type="radio"
                            value="60.00"
                            name="deliveryArea"
                            checked={customerData.deliveryArea === "Inside of Dhaka"}
                            onChange={() => handleDeliveryAreaChange("Inside of Dhaka")}
                          />
                          <label className="pl-2.5 sm:pl-3 block text-slate-900 dark:text-slate-100 select-none">
                            <span className="text-sm font-medium">
                              ঢাকার মধ্যে ডেলিভারি চার্জ
                              <span className="font-light">(৳60)</span>
                            </span>
                          </label>
                        </div>

                        <div className="flex items-center text-sm sm ">
                          <input
                            className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                            type="radio"
                            value="120.00"
                            name="deliveryArea"
                            checked={customerData.deliveryArea === "Outside of Dhaka"}
                            onChange={() => handleDeliveryAreaChange("Outside of Dhaka")}
                          />
                          <label className="pl-2.5 sm:pl-3 block text-slate-900 dark:text-slate-100 select-none">
                            <span className="text-sm font-medium">
                              ঢাকার বাইরে ডেলিভারি চার্জ
                              <span className="font-light">(৳120)</span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="font-medium text-slate-900 dark:text-slate-200 text-sm">Payment system</label>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div className="flex items-center text-sm sm ">
                          <input
                            className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                            type="radio"
                            value="Cash On Delivery"
                            name="paymentSystem"
                            checked={customerData.paymentSystem === "Cash On Delivery"}
                            onChange={() => handlePaymentSystemChange("Cash On Delivery")}
                          />
                          <label className="pl-2.5 sm:pl-3 block text-slate-900 dark:text-slate-100 select-none">
                            <span className="text-sm font-medium">Cash on delivery</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 order-2 border border-slate-200 mt-5 lg:mt-0 lg:ms-5 rounded-xl overflow-hidden">
              <div className="border-b">
                <h3 className="text-lg font-semibold p-6">Order summary</h3>
              </div>

              <div>
                {myCartProducts.map((product) => (
                  <div key={product?.id} className="rounded-lg p-3 flex items-center">
                    <div className="flex-shrink-0 w-20 lg:w-24">
                      <img src={product?.imageUrl} alt={product?.name} className="w-full h-auto rounded-md" />
                    </div>
                    <div className="flex-grow ml-2 lg:ml-3">
                      <Link
                        className="text-sm lg:text-base font-primary font-semibold dark:text-slate-50 transition-colors mb-1 hover:underline hover:text-blue-500"
                        to={`/product-details/${product?.id}`}
                      >
                        {product?.name?.length >= getSliceLength()
                          ? product?.name.slice(0, getSliceLength()) + "..."
                          : product?.name}
                      </Link>

                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex text-gray-600 text-sm md:text-base">
                            <span className="mr-2">
                              {product?.color !== "N/A" ? (
                                <>
                                  <span className="font-semibold text-sm md:text-base">Color:</span>{" "}
                                  <span>{product?.color}</span>
                                </>
                              ) : (
                                <></>
                              )}
                            </span>
                            <span className="mr-2">
                              {product?.size !== "N/A" ? (
                                <>
                                  <span className="font-semibold text-sm md:text-base">Size:</span>{" "}
                                  <span>{product?.size}</span>
                                </>
                              ) : (
                                <></>
                              )}
                            </span>
                          </div>
                          <div className="font-semibold text-sm md:text-base">
                            Price:{" "}
                            <span className="text-sm md:text-base text-amber-600 font-primary">
                              ৳{product?.originalPrice}
                            </span>
                          </div>
                          <div className="font-semibold text-sm md:text-base">
                            Sub-Total:{" "}
                            <span className="text-sm md:text-base text-purple-600 font-primary">
                              ৳{product?.originalPrice * product?.quantity}
                            </span>
                          </div>
                        </div>

                        <div>
                          {/* Quantity update buttons */}
                          <div className="w-full flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 rounded-full">
                            <div className="flex items-center justify-between space-x-5 w-full">
                              <div className="flex items-center justify-between w-[80px]">
                                <button
                                  className="w-5 md:w-7 h-5 md:h-7 rounded-full flex items-center justify-center border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-900 focus:outline-none hover:border-slate-700 dark:hover:border-slate-400 disabled:hover:border-slate-400 dark:disabled:hover:border-slate-500 disabled:opacity-50 disabled:cursor-default"
                                  type="button"
                                  onClick={() => handleDecreaseQuantity(product?._id)}
                                  disabled={selectedQuantity === "1"}
                                >
                                  <FaMinus className="w-2 md:w-3 h-2 md:h-3 font-normal"></FaMinus>
                                </button>
                                <span className="select-none block flex-1 text-center text-sm md:text-base leading-none">
                                  {product?.quantity}
                                </span>
                                <button
                                  className="w-5 md:w-7 h-5 md:h-7 rounded-full flex items-center justify-center border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-900 focus:outline-none hover:border-slate-700 dark:hover:border-slate-400 disabled:hover:border-slate-400 dark:disabled:hover:border-slate-500 disabled:opacity-50 disabled:cursor-default"
                                  type="button"
                                  onClick={() => handleIncreaseQuantity(product?._id)}
                                >
                                  <FaPlus className="w-2 md:w-3 h-2 md:h-3 font-normal"></FaPlus>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Delete button */}
                          <div className="flex justify-center items-center">
                            <button onClick={() => handleDeleteProduct(product?._id)} className="text-red-600 mt-2">
                              <RiDeleteBin6Line className="w-4 md:w-6 h-6 md:h-8"></RiDeleteBin6Line>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing count part */}
              <div className="p-3 border-b border-t">
                <div>
                  {myCartProducts.length > 0 ? (
                    <div className="py-1 font-bold text-lg flex justify-between items-center font-primary">
                      <span className="me-1">Sub-Total:</span>
                      <span className="text-blue-500">৳{subTotal}</span>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="py-1 font-bold text-lg flex justify-between items-center font-primary">
                    <span className="text-blue-600 text-base font-bold">{customerData?.deliveryArea}:</span>
                    <span className="text-lg font-bold text-blue-600">৳{customerData?.deliveryCharge.toFixed(2)}</span>
                  </div>

                  <div className="py-1 font-bold text-lg flex justify-between items-center font-primary">
                    <span className="text-green-600 text-base font-bold">Total:</span>
                    <span className="text-lg font-bold text-green-600">৳{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div className="flex flex-col sm:flex-row pt-6 gap-3">
                  <button
                    onClick={handleSaveAndConfirmOrder}
                    disabled={disableConfirmButton}
                    className={`relative h-auto w-full inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ${
                      disableConfirmButton
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-700 text-slate-50 hover:bg-slate-100 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-50 dark:hover:text-slate-800 shadow-xl"
                    } flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0`}
                  >
                    Confirm Order
                  </button>

                  <Link
                    to={`/product-details/${productData?.productInfo?.id}`}
                    className="relative h-auto w-full inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-red-700 text-slate-50 hover:bg-slate-100 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-50 dark:hover:text-slate-800 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                  >
                    Cancel Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
