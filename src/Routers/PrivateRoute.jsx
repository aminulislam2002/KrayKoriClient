/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  //   if (loading) {
  //     return <GridLoader color="#36d7b7" />;
  //   }

  if (user) {
    return children;
  }
  return <Navigate to="/authentication/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
