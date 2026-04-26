import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import CardList from "../Components/CardList";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/checkauth`, {
          credentials: "include",
        });
        const data = await res.json();
        
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-medium">
        Loading Profile...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-8 rounded-2xl shadow-sm border mb-12">
          <div className="w-32 h-32 rounded-full bg-red-500 text-white flex items-center justify-center text-5xl font-bold shadow-md">
            {user.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex flex-col text-center md:text-left gap-2">
            <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
            <p className="text-gray-500 text-lg">Email: {user.email}</p>
            <p className="text-gray-400 mt-2">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* User Listings */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Listings</h2>
          <p className="text-gray-500 mb-6">Here are the places you are currently hosting.</p>
          {user._id && <CardList ownerId={user._id} />}
        </div>
      </div>
    </>
  );
}
