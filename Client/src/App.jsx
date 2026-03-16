import SingleListing from "./Pages/SingleListing";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import "./tailwind.css";
import CardList from "./CardList";
import ListingForm from "./ListingForm";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <Routes>
        <Route path="/Nav" element={<NavBar />} />
        <Route path="/listing" element={<CardList />} />
        <Route path="/listing/:id" element={<SingleListing />} />
        <Route path="/new" element={<ListingForm />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
