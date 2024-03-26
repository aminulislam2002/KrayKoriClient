import axios from "axios";
import { useState, useEffect } from "react";
import { GrView } from "react-icons/gr";
import Swal from "sweetalert2";
import { MdOutlineDoneOutline } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { Link } from "react-router-dom";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://server.shekshops.com/orders");
        if (response.ok) {
          const data = await response.json();
          // Filter orders with orderStatus as "pending"
          const pendingOrders = data.filter((order) => order?.orderStatus === "Pending");
          setOrders(pendingOrders);
        } else {
          console.error("Error fetching orders");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleConfirmed = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderStatus(id, "Confirmed");
      }
    });
  };

  const handleCancelled = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderStatus(id, "Cancelled");
      }
    });
  };

  const updateOrderStatus = (id, status) => {
    setIsLoading(true);
    axios
      .put(`https://server.shekshops.com/orderStatus/${id}`, { status })
      .then((response) => {
        if (response.status === 200) {
          // Filter out the updated order from the orders state
          const updatedOrders = orders.filter((order) => order._id !== id);
          setOrders(updatedOrders);
          // Handle success response
          Swal.fire("Updated!", "Order status has been updated.", "success");
        }
        // Update UI accordingly, you may fetch orders again to update the list
      })
      .catch((error) => {
        console.log(error);
        // Handle error
        Swal.fire("Error!", "Failed to update order status.", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter((product) => product?._id.includes(searchQuery));

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
              View All Pending Orders
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md overflow-x-auto">
        <table className="w-full whitespace-nowrap table-auto">
          {/* head */}
          <thead className="bg-slate-100 dark:bg-[#1C2E45] text-slate-800 dark:text-slate-50 text-base">
            <tr>
              <th className="px-4 py-2 text-center">Order ID</th>
              <th className="px-4 py-2 text-center">Order Date</th>
              <th className="px-4 py-2 text-center">Amount</th>
              <th className="px-4 py-2 text-center">Customer Name</th>
              <th className="px-4 py-2 text-center">Customer Number</th>
              <th className="px-4 py-2 text-center">Order Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#132337] text-slate-800 dark:text-slate-50 text-base">
            {filteredOrders.map((order) => (
              <tr key={order?._id} className="border-t border-slate-400">
                <td className="px-4 py-2 text-center text-blue-500 hover:underline">#{order?._id}</td>
                <td className="px-4 py-2 text-center">
                  {order?.date} <br /> {order?.time}
                </td>
                <td className="px-4 py-2 text-center">৳{order?.total}</td>
                <td className="px-4 py-2 text-center">{order?.customerData?.name}</td>
                <td className="px-4 py-2 text-center">{order?.customerData?.mobileNumber}</td>
                <td className="px-4 py-2 text-center">{order?.orderStatus}</td>
                <td className="px-4 py-2 text-center w-1/12">
                  <div className="flex gap-2">
                    <button onClick={() => handleConfirmed(order?._id)} disabled={isLoading}>
                      <MdOutlineDoneOutline className="w-4 md:w-5 h-5 md:h-7 text-green-500 hover:text-green-700"></MdOutlineDoneOutline>
                    </button>

                    <button onClick={() => handleCancelled(order?._id)} disabled={isLoading}>
                      <FcCancel className="w-4 md:w-5 h-5 md:h-7 text-red-500 hover:text-red-700"></FcCancel>
                    </button>

                    <Link to={`/dashboard/order-overview/${order?._id}`} state={{ order: order }}>
                      <GrView className="w-4 md:w-5 h-5 md:h-7 text-blue-500 hover:text-blue-700"></GrView>
                    </Link>
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

export default PendingOrders;
