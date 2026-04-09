import { useState } from "react";
import gitLogo from "../assets/git.png";
import googleLogo from "../assets/google.webp";
import visibilityOff from "../assets/VisibilityOff.svg";
import visibilityOn from "../assets/VisibilityOn.svg";
import { showError, showPromise } from "../Utils/ToastBar";
import { Link } from "react-router-dom";
import loginUser from "../Utils/loginUser";
import Footer from "../Footer";
import { useNavigate, useLocation } from "react-router-dom";


const Login = () => {
 const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);


  async function SubmitHandeler(e) {
    e.preventDefault();

    if (isSubmiting) return;
    setIsSubmiting(true);
    setTimeout(() => {
      setIsSubmiting(false);
    }, 2000);
    const res = await loginUser(user);
    showPromise(
      res,
      "Logging In",
      "Login Successfull",
      "Some Error Occured",
    );
    if(await res.success){
      setTimeout(() => {
        navigate("/");
        }, 1000);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return(
    <div className="min-h-screen flex flex-col bg-[#F6F3EE]">
    <div className=" bg-[#F6F3EE] flex items-center justify-center px-4 p-12 flex-grow">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-200 flex-grow">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login Your Account
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={SubmitHandeler}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={user.username}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
              value={user.email}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
              value={user.password}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-12 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <img src={visibilityOn} />
              ) : (
                <img src={visibilityOff} />
              )}
            </span>
          </div>

          {/* Terms */}
          <div className="flex items-center text-sm">
            <input type="checkbox" className="mr-2 " id="terms" required />
            <span className="text-gray-600">
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </span>
          </div>

          {/* Signup Button */}

          <button
            className="w-full py-2 rounded-md text-white font-medium bg-[#ea580c] 
                    hover:bg-[#d64c11] 
                    transition-all duration-150 
                    active:scale-95 active:shadow-inner"
            disabled={isSubmiting}
          >
            {isSubmiting ? "Creating..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition transition-all duration-150 
                    active:scale-95 active:shadow-inner"
          >
            <img src={googleLogo} alt="google" className="w-5 h-5" />
            Google
          </button>

          <button
            className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition transition-all duration-150 
                    active:scale-95 active:shadow-inner"
          >
            <img src={gitLogo} alt="github" className="w-5 h-5" />
            GitHub
          </button>
        </div>

        {/* Login link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Do not have an account?{" "}
          <span className="text-indigo-600 cursor-pointer hover:underline">
           {/* <a href="/signup">Sign Up</a> */}
           <Link to="/signup" >Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
      <Footer/>
    </div>

  );
};

export default Login;
