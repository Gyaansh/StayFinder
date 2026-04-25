import NavBar from "./NavBar";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { showSuccess } from "../Utils/ToastBar";
import FindStay from "../assets/FindStay-logo.svg";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const logOutUser = async ()=>{
    try{
      const res = await fetch("/api/user/logout",{
      method :"POST",
      credentials: "include",
      headers : {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({})
    });
    const result = await res.json();
    if(result.success){
      setLoggedIn(false);
      showSuccess("Logged Out Successfully");
    }
    } catch(err){
      throw err.message;
    }
  }


  const isLoggedIn = async () => {
    try {
      const res = await fetch("/api/user/checkauth", {
        credentials: "include",
      });
      const data = await res.json();
      
      if (data.loggedIn) {
        setLoggedIn(true);
      }
    } catch (err) {
      throw err.message;
    }
  };
  isLoggedIn();

  return (
    <header className="flex sticky top-0 z-10 flex-col md:flex-row md:items-center md:justify-between px-6 py-4 bg-white shadow-md gap-4 relative">
      {/* Left */}
      <button
        onClick={() => navigate("/")}
        className="text-xl font-semibold cursor-pointer group"
      >
        <img src={FindStay} alt="FindStay Logo" className="h-10 w-auto transition-transform duration-200 group-hover:scale-110" />
      <span className="text-sm font-medium ">Explore</span>
      </button>

      {/* Center */}
      <div className="flex justify-center md:flex-1">
        <NavBar />
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={() =>
            {loggedIn? logOutUser() : (navigate("/login", {
              state: { from: location },
            }))}
          }
          className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          {loggedIn? "LogOut" : "LogIn"}
        </button>

        <button
          onClick={() => navigate("/listing/new")}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Add New Listing
        </button>
      </div>

      {/* Hamburger Icon (Mobile only) */}
      <div className="md:hidden absolute right-6 top-4">
        <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 mt-2 bg-white shadow-lg rounded-lg p-4">
          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="px-4 py-2 rounded-lg hover:bg-gray-100 text-left"
          >
            All Listings
          </button>

          <button
            onClick={() => {
              navigate("/listing/new");
              setMenuOpen(false);
            }}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-left"
          >
            Add New Listing
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
