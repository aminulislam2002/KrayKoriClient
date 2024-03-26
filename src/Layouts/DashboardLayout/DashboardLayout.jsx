import { Link, Outlet } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import useAdmin from "../../Hooks/useAdmin";
import useCustomer from "../../Hooks/useCustomer";
import ActiveLink from "../../Components/ActiveLink/ActiveLink";
import useTheme from "../../Hooks/useTheme";
import { MdDarkMode, MdDashboard, MdOutlinePendingActions } from "react-icons/md";
import { FaHome, FaProductHunt, FaShoppingBasket } from "react-icons/fa";
import { FcConferenceCall, FcOk, FcCancel } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";
import { IoCloudDone } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { TbTruckReturn } from "react-icons/tb";

const DashboardLayout = () => {
  const adminOptions = (
    <>
      <ActiveLink
        to="/dashboard/allUsers"
        label="All Users"
        icon={FcConferenceCall}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />

      <ActiveLink
        to="/dashboard/allProducts"
        label="All Products"
        icon={FaProductHunt}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />
      <ActiveLink
        to="/dashboard/pendingOrders"
        label="Pending Orders"
        icon={MdOutlinePendingActions}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />
      <ActiveLink
        to="/dashboard/confirmedOrders"
        label="Confirmed Orders"
        icon={GiConfirmed}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />
      <ActiveLink
        to="/dashboard/cancelledOrders"
        label="Cancelled Orders"
        icon={FcCancel}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />
      <ActiveLink
        to="/dashboard/deliveredOrders"
        label="Delivered Orders"
        icon={IoCloudDone}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />
      <ActiveLink
        to="/dashboard/returnOrders"
        label="Return Orders"
        icon={TbTruckReturn}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />
    </>
  );

  const customerOptions = (
    <>
      <ActiveLink
        to="/dashboard/activeOrders"
        label="Active Order"
        icon={FcOk}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />
      <ActiveLink
        to="/dashboard/myShopping"
        label="My Shopping"
        icon={FaShoppingBasket}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />

      <ActiveLink
        to="/dashboard/myCancellations"
        label="My Cancellations"
        icon={FcCancel}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />

      <ActiveLink
        to="/dashboard/myReturn"
        label="My Return"
        icon={TbTruckReturn}
        activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
        className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
      />
    </>
  );

  const [isAdmin] = useAdmin();
  const [isCustomer] = useCustomer();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={` font-secondary min-h-screen ${isDarkMode && "dark"}`}>
      <div className="hidden lg:block"></div>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content lg:flex">
          <div className="w-full lg:w-2/12 bg-white dark:bg-[#132337] overflow-y-auto max-h-[100vh] lg:h-screen">
            <div className="flex justify-start">
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                  <GrMenu className="w-6 h-6 dark:text-white" />
                </label>
              </div>

              <div className="w-full py-2">
                <Link to="/dashboard" className="text-center block">
                  <h1 className="text-lg md:text-xl px-5 py-3 text-slate-800 dark:text-slate-50 font-bold font-secondary tracking-wider uppercase">
                    KrayKori
                  </h1>
                </Link>
              </div>
            </div>
            <div className="flex-none hidden lg:block mt-4">
              <ul className="menu-vertical">
                <ActiveLink
                  to="/dashboard"
                  label="Dashboards"
                  icon={MdDashboard}
                  activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
                  className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
                ></ActiveLink>

                {isAdmin ? <> {adminOptions} </> : <></>}
                {isCustomer ? <> {customerOptions} </> : <></>}

                <ActiveLink
                  to="/"
                  label="Go To Home"
                  icon={FaHome}
                  activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
                  className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
                ></ActiveLink>

                <button
                  onClick={toggleDarkMode}
                  className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
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
              </ul>
            </div>
          </div>
          <div className="lg:w-10/12 bg-slate-100 text-slate-800 dark:bg-[#0F1824] dark:text-slate-50">
            <div className="overflow-y-auto max-h-[100vh] p-3 md:p-4 lg:p-5">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Side Drawer */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay overflow-x-auto max-h-[100vh]"></label>
          <ul className="p-4 w-2/3 md:w-1/3 max-h-screen bg-white dark:bg-[#132337] grid grid-cols-1 overflow-y-auto">
            <ActiveLink
              to="/dashboard"
              label="Dashboards"
              icon={MdDashboard}
              activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
              className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
            ></ActiveLink>

            {isAdmin ? <> {adminOptions} </> : <></>}
            {isCustomer ? <> {customerOptions} </> : <></>}

            <ActiveLink
              to="/"
              label="Go To Home"
              icon={FaHome}
              activeClassName="bg-slate-200 dark:bg-[#1C2E45] dark:text-blue-500"
              className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
            ></ActiveLink>

            <button
              onClick={toggleDarkMode}
              className="my-1 mx-2 lg:mx-2.5 py-1 lg:py-1.5 px-3 ps-3 lg:ps-5 rounded bg-white text-slate-600  hover:bg-slate-200 hover:text-blue-500 dark:hover:text-blue-500 dark:bg-[#132337] dark:text-slate-50 text-start flex justify-start items-center gap-2"
            >
              {isDarkMode ? (
                <>
                  <button className="flex justify-start items-center">
                    <CiLight className="w-5 h-5 mr-2 inline" />
                    <span>Light Mode</span>
                  </button>
                </>
              ) : (
                <>
                  <button className="flex justify-start items-center">
                    <MdDarkMode className="w-5 h-5 mr-2 inline" />
                    <span>Dark Mode</span>
                  </button>
                </>
              )}
            </button>
          </ul>
        </div>
      </div>
      <div>{/* Footer position [if need] */}</div>
    </div>
  );
};

export default DashboardLayout;
