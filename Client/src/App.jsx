import SingleListingPage from "./Pages/SingleListingPage";
import { Routes, Route } from "react-router-dom";
import "./tailwind.css";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import Newlisting from "./Pages/NewListing";
import ProtectedRoute from "./Utils/ProtectedRoute";
import EditListingPage from "./Pages/EditListingPage";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/listing/new"
            element={
              <ProtectedRoute>
                <Newlisting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listing/edit/:id"
            element={
              <ProtectedRoute>
                <EditListingPage />
              </ProtectedRoute>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listing/:id" element={<SingleListingPage />} />
        </Routes>
    </>
  );
}

export default App;
