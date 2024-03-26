import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";

const useCustomer = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: isCustomer, isLoading: isCustomerLoading } = useQuery({
    queryKey: ["isCustomer", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/customer/${user?.email}`);
      // console.log("is customer response", res);
      return res.data.customer;
    },
  });
  return [isCustomer, isCustomerLoading];
};
export default useCustomer;
