import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { showSuccess } from "../Utils/ToastBar";
import FindStay from "../assets/FindStay-logo.svg";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const logOutUser = async ()=>{
    try{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/logout`,{
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
      setUser(null);
      showSuccess("Logged Out Successfully");
      navigate("/");
    }
    } catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/checkauth`, {
          credentials: "include",
        });
        const data = await res.json();
        
        if (data.loggedIn) {
          setLoggedIn(true);
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };
    isLoggedIn();
  }, []);

  return (
    <header className="flex sticky top-0 z-10 flex-col md:flex-row md:items-center md:justify-between px-6 py-4 bg-white shadow-md gap-4 relative">
      {/* Left */}
      <button
        onClick={() => navigate("/")}
        className="text-xl font-semibold cursor-pointer group flex items-center gap-2"
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
        {!loggedIn ? (
          <button
            onClick={() => navigate("/login", { state: { from: location } })}
            className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            LogIn
          </button>
        ) : (
          <div className="relative">
            <div 
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold cursor-pointer hover:bg-red-600 transition"
            >
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </div>
            
            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border z-20">
                <button
                  onClick={() => {
                    setProfileDropdown(false);
                    navigate("/profile");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setProfileDropdown(false);
                    logOutUser();
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        )}

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

          {loggedIn && (
             <button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="px-4 py-2 rounded-lg hover:bg-gray-100 text-left"
            >
              My Profile
            </button>
          )}

          <button
            onClick={() => {
              navigate("/listing/new");
              setMenuOpen(false);
            }}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-left"
          >
            Add New Listing
          </button>
          
          {loggedIn ? (
             <button
              onClick={() => {
                logOutUser();
                setMenuOpen(false);
              }}
              className="px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 text-left font-medium"
            >
              LogOut
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login", { state: { from: location } });
                setMenuOpen(false);
              }}
              className="px-4 py-2 rounded-lg hover:bg-gray-100 text-left"
            >
              LogIn
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
