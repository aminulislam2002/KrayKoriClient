import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State to store email value
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { resetPassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      setIsLoading(false);
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please provide your email address to reset the password.",
      });
      return;
    }

    try {
      // Call resetPassword function from AuthContext
      await resetPassword(email);
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Password Reset Email Sent",
        text: "Please check your email for password reset instructions.",
      });
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Password Reset Failed",
        text: "Password reset failed. Please try again later.",
      });
    }
  };

  return (
    <div className="container mb-24 lg:mb-32">
      <div className="my-5 lg:my-10 mx-5">
        <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
          <h2 className="mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Forgot password
          </h2>
          <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
            Welcome to ShekShops
          </span>
        </header>
        <div className="max-w-md mx-auto space-y-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Enter Your Email address</span>
              <input
                className="block w-full bg-slate-100 border border-slate-200 focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50 dark:border-slate-700 dark:focus:ring-slate-6000 dark:focus:ring-opacity-25 dark:bg-slate-900 disabled:bg-slate-200 dark:disabled:bg-slate-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1"
                placeholder="example@example.com"
                type="email"
                value={email} // Bind value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </label>
            <button
              className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Forgot"}
            </button>
          </form>
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Go back for{" "}
            <Link className="text-green-600" to="/authentication/login">
              Sign in
            </Link>{" "}
            /{" "}
            <Link className="text-green-600" to="/authentication/register">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
