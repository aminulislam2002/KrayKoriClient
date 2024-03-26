import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { createUserWithEmail, createUserWithGoogle, updateUserProfileName } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "customer",
      };

      // Create user with email and password
      const result = await createUserWithEmail(data.email, data.password);

      // Update user profile name
      await updateUserProfileName(userData.name);

      // Post user data to your server
      const saveUserData = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };

      const response = await fetch(`https://api.kraykori.com/postUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveUserData),
      });

      const responseData = await response.json();

      if (responseData.insertedId) {
        navigate("/");
        Swal.fire({
          icon: "success",
          title: `${userData.name} Signup Successful`,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "warning",
        title: `${data.name} Signup Failed`,
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);

    try {
      // Create user with Google
      const result = await createUserWithGoogle();

      // Always treat the user as a new user
      if (result.user) {
        navigate("/");
        // Show success message
        Swal.fire({
          icon: "success",
          title: `${result.user.displayName} Signup Successful`,
          showConfirmButton: false,
          timer: 3000,
        });

        // Post user data to your server
        const saveUserData = {
          name: result.user.displayName,
          email: result.user.email,
          role: "customer",
        };

        const response = await fetch(`https://api.kraykori.com/postUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveUserData),
        });

        const responseData = await response.json();

        if (responseData.insertedId) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "warning",
        title: "Google Signup Failed",
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="my-5 lg:my-10 mx-5">
        <h2 className="mb-5 lg:mb-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-slate-900 dark:text-slate-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            <button
              className="flex w-full rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              onClick={handleGoogleRegister}
            >
              <FcGoogle className="w-6 h-6"></FcGoogle>
              <h3 className="flex-grow text-center text-sm font-medium text-slate-700 dark:text-slate-300 sm:text-sm">
                Continue with Google
              </h3>
            </button>
          </div>
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-slate-400 dark:bg-slate-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-slate-100 dark:border-slate-800"></div>
          </div>
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="text-slate-800 dark:text-slate-200">Name</span>
              <input
                {...register("name", { required: true })}
                className="block w-full bg-slate-100 border border-slate-200 focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50 dark:border-slate-700 dark:focus:ring-slate-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1"
                type="text"
                placeholder="Your Name"
              />
            </label>
            <label className="block">
              <span className="text-slate-800 dark:text-slate-200">Email address</span>
              <input
                {...register("email", { required: true })}
                className="block w-full bg-slate-100 border border-slate-200 focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50 dark:border-slate-700 dark:focus:ring-slate-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1"
                type="email"
                placeholder="example@example.com"
              />
            </label>
            <label className="block">
              <span className="text-slate-800 dark:text-slate-200">Password</span>
              <input
                {...register("password", { required: true })}
                className="block w-full bg-slate-100 border border-slate-200 focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50 dark:border-slate-700 dark:focus:ring-slate-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1"
                type="password"
                placeholder="Enter your password"
              />
            </label>
            <button
              className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-6000 dark:focus:ring-offset-0"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Continue"}
            </button>
          </form>
          <span className="block text-center text-slate-700 dark:text-slate-300">
            Already have an account?
            <Link className="text-green-600" to="/authentication/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
