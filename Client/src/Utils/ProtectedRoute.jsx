import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { showError } from "./ToastBar";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/user/checkauth`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) setIsAuth(true);
        else setIsAuth(false);
      })
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  // show toast ONLY when auth fails
  useEffect(() => {
    if (!loading && !isAuth) {
      showError("You need to login first");
    }
  }, [loading, isAuth]);

  if (loading) return <div>Checking auth...</div>;

  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />);
  }

  return children;
};

export default ProtectedRoute;