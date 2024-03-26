import { useLocation } from "react-router-dom";
import logo from "../../../../assets/Logo/Logo Without Bg.png";
import ReactToPrint from "react-to-print";
import React from "react";
import { MdLocalPrintshop } from "react-icons/md";

const Invoice = () => {
  const { state } = useLocation();
  const data = state?.data;
  const componentRef = React.useRef();

  return (
    <div className="">
      <div className="mx-auto my-4 p-20 max-w-4xl bg-white text-black rounded-lg" ref={componentRef}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <img id="logo" src={logo} title="KrayKori" alt="KrayKori" className="h-12 w-auto" />
          </div>
          <div>
            <h4 className="font-semibold text-3xl mb-0 text-[#0DA487]">Invoice</h4>
          </div>
        </div>
        <hr className="my-4 border-b-1 border-slate-400" />

        {/* Date and Invoice number */}
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm mb-0">
              <span className="font-semibold text-lg">Date: </span> {data?.date}
            </h4>
          </div>
          <div>
            <h4 className="text-sm mb-0">
              <span className="font-semibold text-lg">Order ID: </span> #{data?._id}
            </h4>
          </div>
        </div>
        <hr className="my-4 border-b-1 border-slate-400" />

        {/* Invoiced To and Pay To */}
        <div className="grid grid-cols-2">
          <div className="flex justify-start items-center">
            <div>
              <h3 className="font-semibold text-lg">Invoiced To:</h3>
              <p className="text-sm">{data?.customerData?.name}</p>
              <p className="text-sm">{data?.customerData?.address}</p>
              <p className="text-sm">{data?.customerData?.district}, Bangladesh</p>
              <p className="text-sm">{data?.customerData?.mobileNumber}</p>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div>
              <h3 className="font-semibold text-lg text-end">Pay To:</h3>
              <p className="text-sm text-end">KrayKori</p>
              <p className="text-sm text-end">Shewrapara, Mirpur</p>
              <p className="text-sm text-end">Dhaka, Bangladesh</p>
              <p className="text-sm text-end">+880 1798-093171</p>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="bg-[#0DA487] border border-[#0DA487] text-slate-50 text-left px-4 py-2 font-semibold text-lg">
                  No
                </th>
                <th className="bg-[#0DA487] border border-[#0DA487] text-slate-50 text-left px-4 py-2 font-semibold text-lg">
                  Name
                </th>
                <th className="bg-[#0DA487] border border-[#0DA487] text-slate-50 text-left px-4 py-2 font-semibold text-lg">
                  Rate
                </th>
                <th className="bg-[#0DA487] border border-[#0DA487] text-slate-50 text-left px-4 py-2 font-semibold text-lg">
                  QTY
                </th>
                <th className="bg-[#0DA487] border border-[#0DA487] text-slate-50 text-left px-4 py-2 font-semibold text-lg">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.products.map((product, index) => (
                <tr key={index}>
                  <td className="border border-slate-400 py-2 px-4">{index + 1}</td>
                  <td className="border border-slate-400 py-2 px-4">{product?.name}</td>
                  <td className="border border-slate-400 py-2 px-4">৳{product?.originalPrice}</td>
                  <td className="border border-slate-400 py-2 px-4">{product?.quantity}</td>
                  <td className="border border-slate-400 py-2 px-4">৳{product?.originalPrice * product?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total, Sub Total, and Delivery Charge */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg">Order Summary:</h3>
          <table className="w-full mt-4">
            <tbody>
              <tr>
                <td className="border border-slate-400 py-2 px-4 text-lg font-semibold">Sub Total:</td>
                <td className="border border-slate-400 py-2 px-4">৳{data?.subTotal}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 py-2 px-4 text-lg font-semibold">Delivery Charge:</td>
                <td className="border border-slate-400 py-2 px-4">৳{data?.customerData?.deliveryCharge}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 py-2 px-4 text-lg font-semibold">Total:</td>
                <td className="border border-slate-400 py-2 px-4">৳{data?.total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <p>Thank you for your purchase!</p>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-center items-center">
        <div>
          <ReactToPrint
            trigger={() => (
              <button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-[#0DA487] text-slate-50 hover:bg-slate-100 hover:text-slate-800 dark:bg-[#132337]  dark:text-slate-50 dark:hover:bg-slate-900 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                <MdLocalPrintshop className="w-6 h-6"></MdLocalPrintshop>
                <span className="ml-3">Print Invoice</span>
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
