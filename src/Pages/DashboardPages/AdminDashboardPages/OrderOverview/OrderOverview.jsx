import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TbCurrencyTaka } from "react-icons/tb";
import { FcManager } from "react-icons/fc";
import { MdAccessTimeFilled, MdOutlineFileDownload } from "react-icons/md";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import { BsQrCode } from "react-icons/bs";
import { GrStatusGoodSmall } from "react-icons/gr";
import { FaShippingFast } from "react-icons/fa";
import useAdmin from "../../../../Hooks/useAdmin";

const OrderOverview = () => {
  // Get the product id from the URL
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  //   const [isLoading, setIsLoading] = useState(false);

  const [isAdmin] = useAdmin();
  // const [isCustomer] = useCustomer();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://server.shekshops.com/orders");
        if (response.ok) {
          const data = await response.json();
          // Find orders with _id as id
          const deliveredOrders = data.find((orderData) => orderData._id === id);
          setOrder(deliveredOrders);
        } else {
          console.error("Error fetching orders");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, [id]);

  return (
    <div>
      <div className="flex  md:flex-row md:items-center print:hidden gap-2 pb-3 md:pb-4 lg:pb-5">
        <div className="grow">
          <h5 className="text-base text-slate-800 dark:text-slate-50">Order Overview</h5>
        </div>
        <ul className="flex items-center gap-2 text-sm font-normal shrink-0">
          <li className="relative before:content-['\ea54'] before:font-remix ltr:before:-right-1 rtl:before:-left-1  before:absolute before:text-[18px] before:-top-[3px] ltr:pr-4 rtl:pl-4 before:text-slate-400 dark:text-slate-700">
            Dashboard
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-x-5">
        {/* Shipping Details */}
        <div className="2xl:col-span-3">
          <div className="mb-5 rounded-md">
            <div className="p-5 bg-white text-slate-800 dark:bg-[#132337] dark:text-slate-50">
              <div className="flex justify-between items-start">
                <h6 className="mb-4 text-15">Shipping Details</h6>
                <div>
                  <div className="flex items-center justify-center bg-purple-100 rounded-md size-12 dark:bg-purple-500/20 ltr:float-right rtl:float-left">
                    <FaShippingFast className="w-6 h-6 text-purple-500 fill-purple-500 dark:fill-purple-500"></FaShippingFast>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="mb-1">{order?.customerData?.name}</h6>
                <p className="mb-1 text-slate-500 dark:text-zink-200">
                  {order?.customerData?.address} , {order?.customerData?.district}
                </p>
                <p className="text-slate-500 dark:text-zink-200">Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Details */}
        <div className="2xl:col-span-3">
          <div className="mb-5 rounded-md">
            <div className="p-5 bg-white text-slate-800 dark:bg-[#132337] dark:text-slate-50">
              <div className="flex justify-between items-start">
                <h6 className="mb-4 text-15">Billing Details</h6>
                <div>
                  <div className="flex items-center justify-center rounded-md size-12 ltr:float-right rtl:float-left bg-sky-100 dark:bg-sky-500/20">
                    <TbCurrencyTaka className="w-6 h-6 text-sky-500 fill-sky-200 dark:fill-sky-500/30"></TbCurrencyTaka>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="mb-1">{order?.customerData?.name}</h6>
                <p className="mb-1 text-slate-500 dark:text-zink-200">
                  {order?.customerData?.addressType} , {order?.customerData?.deliveryArea}
                </p>
                <p className="text-slate-500 dark:text-zink-200">{order?.customerData?.paymentSystem}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="2xl:col-span-3">
          <div className="mb-5 rounded-md">
            <div className="p-5 bg-white text-slate-800 dark:bg-[#132337] dark:text-slate-50">
              <div className="flex justify-between items-start">
                <h6 className="mb-4 text-15">Customer Info</h6>
                <div>
                  <div className="flex items-center justify-center bg-yellow-100 rounded-md size-12 ltr:float-right rtl:float-left dark:bg-yellow-500/20">
                    <FcManager className="w-8 h-8 text-sky-500 fill-sky-200 dark:fill-sky-500/30"></FcManager>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="mb-1">{order?.customerData?.name}</h6>
                <p className="mb-1 text-slate-500 dark:text-zink-200">{order?.customerData?.mobileNumber}</p>
                <p className="text-slate-500 dark:text-zink-200">
                  {order?.customerData?.address} , {order?.customerData?.district}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Order ID */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 2xl:col-span-2 bg-white dark:bg-[#132337] rounded-md">
          <div className="text-center p-5">
            <div className="flex items-center justify-center mx-auto rounded-full size-14 bg-[#1A365D] text-[#1A365D] dark:bg-[#1A365D]">
              <BsQrCode className="w-6 h-6 text-blue-600"></BsQrCode>
            </div>
            <h5 className="mt-4 mb-2 dark:text-slate-50 text-lg font-secondary font-semibold">#{order?._id}</h5>
            <p className="uppercase text-slate-500 dark:text-zink-200 text-base">ORDER ID</p>
          </div>
        </div>

        {/* Order Date & Time */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 2xl:col-span-2 bg-white dark:bg-[#132337] rounded-md">
          <div className="text-center p-5">
            <div className="flex items-center justify-center mx-auto rounded-full size-14 bg-[#312D5E] text-[#312D5E] dark:bg-[#312D5E]">
              <MdAccessTimeFilled className="w-8 h-8 text-pink-600 rounded-full"></MdAccessTimeFilled>
            </div>
            <h5 className="mt-4 mb-2 dark:text-slate-50 text-lg font-secondary font-semibold">
              {order?.date} {order?.time}
            </h5>
            <p className="uppercase text-slate-500 dark:text-zink-200 text-base">ORDER DATE</p>
          </div>
        </div>

        {/* Order Amount */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 2xl:col-span-2 bg-white dark:bg-[#132337] rounded-md">
          <div className="text-center p-5">
            <div className="flex items-center justify-center mx-auto rounded-full size-14 bg-[#163A46] text-[#163A46] dark:bg-[#163A46]">
              <HiCurrencyBangladeshi className="w-8 h-8 text-green-600 rounded-full"></HiCurrencyBangladeshi>
            </div>
            <h5 className="mt-4 mb-2 dark:text-slate-50 text-lg font-secondary font-semibold">{order?.total}</h5>
            <p className="uppercase text-slate-500 dark:text-zink-200 text-base">ORDER AMOUNT</p>
          </div>
        </div>

        {/* Order Status */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 2xl:col-span-2 bg-white dark:bg-[#132337] rounded-md">
          <div className="text-center p-5">
            <div className="flex items-center justify-center mx-auto rounded-full size-14 bg-[#3F2939] text-[#3F2939] dark:bg-[#3F2939]">
              <GrStatusGoodSmall className="w-8 h-8 text-red-600 rounded-full"></GrStatusGoodSmall>
            </div>
            <h5 className="mt-4 mb-2 dark:text-slate-50 text-lg font-secondary font-semibold">{order?.orderStatus}</h5>
            <p className="uppercase text-slate-500 dark:text-zink-200 text-base">ORDER STATUS</p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-[#132337] rounded-md mt-5">
        <div className="p-5">
          <div className="flex  md:flex-row md:items-center print:hidden gap-2 pb-3 md:pb-4 lg:pb-5">
            <div className="grow flex justify-start items-center">
              <h5 className="text-base text-slate-800 dark:text-slate-50">Order Summary</h5>
            </div>
            {isAdmin ? (
              <>
                {console.log(order)}
                <div className="flex justify-center items-center gap-3 shrink-0">
                  <div className="shrink-0">
                    <Link
                      to={`/dashboard/order-overview/${order?._id}/invoice/${order?._id}`}
                      state={{ data: order }}
                      className="text-white btn btn-sm bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:text-white focus:bg-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-100 active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100 dark:ring-blue-400/20"
                    >
                      <MdOutlineFileDownload className="w-5 h-5"></MdOutlineFileDownload>
                      <span className="align-middle">Invoice</span>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {/* Iterate over each product in the order */}
                {order?.products.map((product) => (
                  <tr key={product?.id}>
                    <td className="px-3.5 py-4 border-b border-dashed first:pl-0 last:pr-0 border-slate-200 dark:border-zink-500">
                      <div className="flex justify-start items-start gap-3">
                        {/* Render product image */}
                        <div className="flex items-center justify-center rounded-md size-12 bg-slate-100 shrink-0">
                          <img src={product?.imageUrl} alt={product?.name} className="w-full h-14" />
                        </div>
                        <div className="grow">
                          {/* Render product name */}
                          <h6 className="mb-1 text-15 hover:text-blue-500 hover:underline">
                            <Link to={`/product-details/${product?.id}`}>{product?.name}</Link>
                          </h6>
                          <div className="flex text-gray-600 text-sm md:text-base">
                            <span className="mr-2">
                              {product?.color !== "N/A" ? (
                                <>
                                  <span className="font-semibold text-sm md:text-base me-1">Color:</span>
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
                          {/* Render product details */}
                          <p className="text-slate-500 dark:text-zink-200">
                            {product?.originalPrice} x {product?.quantity}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Calculate and render the total price for each product */}
                    <td className="px-3.5 py-4 border-b border-dashed first:pl-0 last:pr-0 border-slate-200 dark:border-zink-500 ltr:text-right rtl:text-left">
                      ৳{parseFloat(product?.originalPrice) * product?.quantity}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td className="px-3.5 pt-4 pb-3 first:pl-0 last:pr-0 text-slate-500 dark:text-zink-200">Sub Total</td>
                  <td className="px-3.5 pt-4 pb-3 first:pl-0 last:pr-0 ltr:text-right rtl:text-left">৳{order?.subTotal}</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-3 first:pl-0 last:pr-0 text-slate-500 dark:text-zink-200">Delivery Charge</td>
                  <td className="px-3.5 py-3 first:pl-0 last:pr-0 ltr:text-right rtl:text-left">
                    ৳{order?.customerData?.deliveryCharge}
                  </td>
                </tr>
                <tr className="font-semibold">
                  <td className="px-3.5 pt-3 first:pl-0 last:pr-0 text-slate-500 dark:text-zink-200">Total Amount (TK)</td>
                  <td className="px-3.5 pt-3 first:pl-0 last:pr-0 ltr:text-right rtl:text-left">৳{order?.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Comments */}
      <div className="bg-white dark:bg-[#132337] rounded-md mt-5">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <h6 className="text-15 grow">Customer Comment</h6>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0">
              <FcManager className="w-10 h-10"></FcManager>
            </div>
            <div className="grow">
              <h6 className="mb-1 text-15">{order?.customerData?.name}</h6>
              <p className="text-slate-500 dark:text-zink-200">{order?.customerData?.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
