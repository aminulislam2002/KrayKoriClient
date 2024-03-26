import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/HomePage/Home/Home";
import Register from "../Pages/AuthenticationPage/RegisterPage/Register";
import CategoryLayout from "../Layouts/CategoryLayout/CategoryLayout";
import ProductDetailsCard from "../Pages/HomePage/HomePageCard/ProductDetailsCard/ProductDetailsCard";
import CheckoutCard from "../Pages/HomePage/HomePageCard/CheckoutCard/CheckoutCard";
import Categories from "../Pages/CategoryPages/Categories/Categories";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import AboutUs from "../Pages/AboutUs/AboutUs";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Shop from "../Pages/Shop/Shop";
import AddProduct from "../Pages/DashboardPages/AdminDashboardPages/AddProduct/AddProduct";
import Login from "../Pages/AuthenticationPage/LoginPage/Login";
import AuthenticationLayout from "../Layouts/AuthenticationLayout/AuthenticationLayout";
import UpdateProduct from "../Pages/DashboardPages/AdminDashboardPages/UpdateProduct/UpdateProduct";
import WelcomeDashboard from "../Pages/DashboardPages/WelcomeDashboard/WelcomeDashboard";
import PendingOrders from "../Pages/DashboardPages/AdminDashboardPages/PendingOrders/PendingOrders";
import AllProducts from "../Pages/DashboardPages/AdminDashboardPages/AllProducts/AllProducts";
import AllUsers from "../Pages/DashboardPages/AdminDashboardPages/AllUsers/AllUsers";
import CartPage from "../Pages/CartPage/CartPage";
import CancelledOrders from "../Pages/DashboardPages/AdminDashboardPages/CancelledOrders/CancelledOrders";
import ConfirmedOrders from "../Pages/DashboardPages/AdminDashboardPages/ConfirmedOrders/ConfirmedOrders";
import DeliveredOrders from "../Pages/DashboardPages/AdminDashboardPages/DeliveredOrders/DeliveredOrders";
import OrderOverview from "../Pages/DashboardPages/AdminDashboardPages/OrderOverview/OrderOverview";
import ActiveOrders from "../Pages/DashboardPages/CustomerDashboardPages/ActiveOrders/ActiveOrders";
import MyShopping from "../Pages/DashboardPages/CustomerDashboardPages/MyShopping/MyShopping";
import MyReturn from "../Pages/DashboardPages/CustomerDashboardPages/MyReturn/MyReturn";
import MyCancellations from "../Pages/DashboardPages/CustomerDashboardPages/MyCancellations/MyCancellations";
import ReturnOrders from "../Pages/DashboardPages/AdminDashboardPages/ReturnOrders/ReturnOrders";
import ForgotPassword from "../Pages/AuthenticationPage/ForgotPassword/ForgotPassword";
import ContactUs from "../Pages/ContactUs/ContactUs.JSX";
import Invoice from "../Pages/DashboardPages/AdminDashboardPages/Invoice/Invoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/cart",
        element: <CartPage></CartPage>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetailsCard></ProductDetailsCard>,
      },
      {
        path: "/product-checkout",
        element: <CheckoutCard></CheckoutCard>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        path: "",
        element: <WelcomeDashboard></WelcomeDashboard>,
      },
      {
        path: "/dashboard/addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/update/:id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "/dashboard/allProducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/dashboard/allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/pendingOrders",
        element: <PendingOrders></PendingOrders>,
      },
      {
        path: "/dashboard/confirmedOrders",
        element: <ConfirmedOrders></ConfirmedOrders>,
      },
      {
        path: "/dashboard/cancelledOrders",
        element: <CancelledOrders></CancelledOrders>,
      },
      {
        path: "/dashboard/deliveredOrders",
        element: <DeliveredOrders></DeliveredOrders>,
      },
      {
        path: "/dashboard/returnOrders",
        element: <ReturnOrders></ReturnOrders>,
      },
      {
        path: "/dashboard/activeOrders",
        element: <ActiveOrders></ActiveOrders>,
      },
      {
        path: "/dashboard/myShopping",
        element: <MyShopping></MyShopping>,
      },
      {
        path: "/dashboard/myCancellations",
        element: <MyCancellations></MyCancellations>,
      },
      {
        path: "/dashboard/myReturn",
        element: <MyReturn></MyReturn>,
      },
      {
        path: "/dashboard/order-overview/:id",
        element: <OrderOverview></OrderOverview>,
      },
      {
        path: "/dashboard/order-overview/:id/invoice/:id",
        element: <Invoice></Invoice>,
      },
    ],
  },

  {
    path: "/category/:category",
    element: <CategoryLayout></CategoryLayout>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        path: "",
        element: <Categories></Categories>,
      },
    ],
  },

  {
    path: "authentication",
    element: <AuthenticationLayout></AuthenticationLayout>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
]);

export default router;
