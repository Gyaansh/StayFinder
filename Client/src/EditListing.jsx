import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import getListingById from "./Utils/getListingById";
import {
  MapPin,
  IndianRupee,
  FileText,
  Home,
  Image as ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { showLoading, showSuccess } from "./Utils/ToastBar";
import getUserId from "./Utils/getUserId";

const defaultFormData = {
  title: "",
  location: "",
  country: "India",
  price: "",
  URL: [""],
  description: "",
  owner : ""
};

export default function EditListing({ mode : propMode = 'new' }) {
  const location = useLocation();
  const mode =  location.state?.mode || propMode;
  

  const { id } = useParams();
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  if(mode === "new"){
    const userInfo = async ()=>{
      const UserId = await getUserId();
      setFormData({...formData, owner:UserId});
    }
    userInfo();
  }

  let loadingText = mode === "edit" ? "Making Changes" : "Adding New Listing";
  let successText =
    mode === "edit"
      ? "Changes Made Successfully"
      : "Added New Listing Successfully";

  let submitButtonText = mode === "edit" ? "Save Changes" : "Added New Listing";

  let redirect = mode === "edit" ? `/listing/${id}` : "/";
  let heading = mode === "edit" ? "Edit Listing" : "Add Listing";
  useEffect(() => {
    const fetchData = async () => {
      if (mode === "edit") {
        let initialData = await getListingById(id);
        setFormData({
          title: initialData.title || "",
          location: initialData.location || "",
          country: initialData.country || "India",
          price: initialData.price || "",
          URL: initialData.URL,
          description: initialData.description || "",
          owner : initialData.owner.username
        });
      } else {
        setFormData(defaultFormData);
      }
    };
    fetchData();
  }, [id]);

  const fetchApi = async () => {
    try {
     
      const api = (mode === "edit"? `/api/listing/edit/${id}`: `/api/listing/newlistener`);
      const apiMethod = (mode==="edit"? "PUT": "POST");
      const res = await fetch(api, {
        method: apiMethod,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = res.json();
      if (res.ok) {
        setTimeout(() => {
          showSuccess(successText);
          navigate(redirect);
        }, 2000);
      }else {
        setTimeout(() => {
        setIsSubmiting(false);
      }, 2000);
      }

      
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedURL = [...formData.URL];
    updatedURL[index] = value;

    setFormData((prev) => ({
      ...prev,
      URL: updatedURL,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      URL: [...prev.URL, ""],
    }));
  };

  const removeImageField = (index) => {
    const updatedURL = formData.URL.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      URL: updatedURL,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      URL: formData.URL.filter((url) => url.trim() !== ""),
    };

    showLoading(loadingText);
    fetchApi();
  };

  return (
    <div className="min-h-screen bg-[#f8f4ee] px-4 py-8 md:px-10">
      <div className="mx-auto max-w-6xl"> 
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222222] md:text-4xl">
            {heading}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Update your property details and keep your listing fresh.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side Preview */}
          <div className="rounded-3xl bg-white p-4 shadow-md">
            <div className="grid gap-4 sm:grid-cols-2">
              {formData.URL?.length > 0 ? (
                formData.URL.map((img, index) => (
                  <div key={index} className="overflow-hidden rounded-2xl">
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="h-[180px] w-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="flex h-[260px] items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                  No image preview
                </div>
              )}
            </div>

            <div className="mt-5 px-1">
              <h2 className="text-3xl font-bold text-orange-600">
                {formData.title || "Listing Title"}
              </h2>

              <div className="mt-3 flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                <p className="text-base">
                  {formData.location || "Location"}
                  {formData.country ? `, ${formData.country}` : ""}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-3xl font-bold text-orange-500">
                  ₹{formData.price || "0"}
                  <span className="ml-1 text-lg font-medium text-gray-500">
                    / night
                  </span>
                </p>
              </div>

              <p className="mt-5 text-base leading-7 text-gray-700">
                {formData.description || "Description will appear here..."}
              </p>
              <button
              hidden={mode !== "edit"}
                type="button"
                onClick={() => 
                  setShowDelete(true)
                }
                className="cursor-pointer mt-4 w-full rounded-2xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition"
              >
                Delete Listing
              </button>
            </div>
          </div>
          {showDelete && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-6 w-[350px]">
                <h2 className="text-lg font-semibold">Delete Listing?</h2>
                <p className="text-sm text-gray-500 mt-2">
                  This action cannot be undone.
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    // onClick={handleDelete}
                    className="flex-1 bg-red-500 text-white py-2 rounded-xl cursor-pointer"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => setShowDelete(false)}
                    className="flex-1 border py-2 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Right Side Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-md md:p-8"
          >
            <div className="grid gap-5">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Home size={16} />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter listing title"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MapPin size={16} />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter city or place"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 text-sm font-semibold text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <IndianRupee size={16} />
                  Price per night
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <ImageIcon size={16} />
                  Image URLs
                </label>

                <div className="space-y-3">
                  {formData.URL.map((url, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) =>
                          handleImageChange(index, e.target.value)
                        }
                        placeholder={`Image URL ${index + 1}`}
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />

                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="rounded-2xl border border-red-200 bg-red-50 p-3 text-red-500 transition hover:bg-red-100 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addImageField}
                    className="cursor-pointer flex items-center gap-2 rounded-2xl border border-dashed border-orange-300 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-600 transition hover:bg-orange-100"
                  >
                    <Plus size={16} />
                    Add another image URL
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FileText size={16} />
                  Description
                </label>
                <textarea
                  name="description"
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write something about your place..."
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                disabled={isSubmiting}
                type="submit"
                className="flex-1 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 cursor-pointer"
              >
                {submitButtonText}
              </button>

              <button
                onClick={() => {
                  navigate(redirect);
                }}
                type="button"
                className="cursor-pointer flex-1 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
