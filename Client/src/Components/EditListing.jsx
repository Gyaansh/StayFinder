import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  IndianRupee,
  FileText,
  Home,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import getListingById from "../Utils/getListingById";
import { showError, showLoading, showSuccess } from "../Utils/ToastBar";
import getUserId from "../Utils/getUserId";

const defaultFormData = {
  title: "",
  location: "",
  country: "India",
  price: "",
  description: "",
};

const createImagePreview = (image) => {
  if (image.kind === "existing") {
    return image.url;
  }

  return URL.createObjectURL(image.file);
};

export default function EditListing({ mode = "new" }) {
  const location = useLocation();
  const pageMode = location.state?.mode || mode;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(defaultFormData);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadListing = async () => {
      if (pageMode === "edit") {
        const initialData = await getListingById(id);

        if (!initialData || ignore) {
          return;
        }

        setFormData({
          title: initialData.title || "",
          location: initialData.location || "",
          country: initialData.country || "India",
          price: initialData.price || "",
          description: initialData.description || "",
        });
        setImages(
          (initialData.images || []).map((image) => ({
            kind: "existing",
            public_id: image.public_id,
            url: image.url,
          })),
        );
        return;
      }

      const userId = await getUserId();

      if (!ignore) {
        setFormData((prev) => ({
          ...defaultFormData,
          owner: userId,
          country: prev.country || "India",
        }));
        setImages([]);
      }
    };

    loadListing();

    return () => {
      ignore = true;
    };
  }, [id, pageMode]);

  const imagePreviews = useMemo(
    () =>
      images.map((image) => ({
        ...image,
        previewUrl: createImagePreview(image),
      })),
    [images],
  );
  const newImageCount = images.filter((image) => image.kind === "new").length;
  const fileInputText =
    newImageCount === 0
      ? "No new files selected"
      : `${newImageCount} file${newImageCount > 1 ? "s" : ""} selected`;

  useEffect(() => {
    return () => {
      imagePreviews.forEach((image) => {
        if (image.kind === "new") {
          URL.revokeObjectURL(image.previewUrl);
        }
      });
    };
  }, [imagePreviews]);

  const loadingText =
    pageMode === "edit" ? "Saving listing changes" : "Adding new listing";
  const successText =
    pageMode === "edit"
      ? "Changes saved successfully"
      : "Listing added successfully";
  const submitButtonText =
    pageMode === "edit" ? "Save Changes" : "Add New Listing";
  const redirect = pageMode === "edit" ? `/listing/${id}` : "/";
  const heading = pageMode === "edit" ? "Edit Listing" : "Add Listing";
  const subheading =
    pageMode === "edit"
      ? "Update your property details and keep your listing fresh."
      : "Add your property details and upload listing photos.";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilesChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0) {
      return;
    }

    setImages((prev) => {
      const remainingSlots = 15 - prev.length;
      const nextFiles = selectedFiles.slice(0, remainingSlots).map((file) => ({
        kind: "new",
        file,
      }));

      if (nextFiles.length < selectedFiles.length) {
        showError("You can upload at most 15 images");
      }

      return [...prev, ...nextFiles];
    });

    event.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, imageIndex) => imageIndex !== index));
  };

  const fetchApi = async () => {
    const api =
      pageMode === "edit" ? `/api/listing/edit/${id}` : `/api/listing/newlisting`;
    const apiMethod = pageMode === "edit" ? "PUT" : "POST";
    const uploadFiles = new FormData();

    uploadFiles.append("title", formData.title.trim());
    uploadFiles.append("location", formData.location.trim());
    uploadFiles.append("country", formData.country.trim());
    uploadFiles.append("price", formData.price);
    uploadFiles.append("description", formData.description.trim());

    if (pageMode === "new" && formData.owner) {
      uploadFiles.append("owner", formData.owner);
    }

    const keptImageIds = [];

    images.forEach((image) => {
      if (image.kind === "new") {
        uploadFiles.append("images", image.file);
      } else {
        keptImageIds.push(image.public_id);
      }
    });

    if (pageMode === "edit") {
      uploadFiles.append("keepImageIds", JSON.stringify(keptImageIds));
    }

    const res = await fetch(api, {
      method: apiMethod,
      credentials: "include",
      body: uploadFiles,
    });

    const data = await res.json();
    if(res.ok){
      setTimeout(() => {
        showSuccess(successText);
      }, 2000);
    }
    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (images.length === 0) {
      showError("Please add at least one image");
      return;
    }

    try {
      setIsSubmitting(true);
      showLoading(loadingText);
      await fetchApi();
      navigate(redirect);
    } catch (error) {
      console.error("Request failed:", error);
      setTimeout(() => {
        showError(error.message || "Unable to save listing");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      showLoading("Deleting listing");
      setTimeout(() => {
        showSuccess("Listing deleted");
        navigate("/");
      }, 2000);
    } catch (error) {
      showError(error.message || "Unable to delete listing");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4ee] px-4 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222222] md:text-4xl">
            {heading}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="min-w-0 rounded-3xl bg-white p-4 shadow-md">
            <div className="grid gap-4 sm:grid-cols-2">
              {imagePreviews.length > 0 ? (
                imagePreviews.map((image, index) => (
                  <div key={`${image.previewUrl}-${index}`} className="overflow-hidden rounded-2xl">
                    <img
                      src={image.previewUrl}
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
              <h2 className="break-words text-3xl font-bold text-orange-600">
                {formData.title || "Listing Title"}
              </h2>

              <div className="mt-3 flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                <p className="break-words text-base">
                  {formData.location || "Location"}
                  {formData.country ? `, ${formData.country}` : ""}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-3xl font-bold text-orange-500">
                  Rs. {formData.price || "0"}
                  <span className="ml-1 text-lg font-medium text-gray-500">
                    / night
                  </span>
                </p>
              </div>

              <p className="mt-5 break-words text-base leading-7 text-gray-700">
                {formData.description || "Description will appear here..."}
              </p>

              {pageMode === "edit" && (
                <button
                  type="button"
                  onClick={() => setShowDelete(true)}
                  className="mt-4 w-full cursor-pointer rounded-2xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  Delete Listing
                </button>
              )}
            </div>
          </div>

          {showDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40">
              <div className="w-[350px] rounded-2xl bg-white p-6">
                <h2 className="text-lg font-semibold">Delete Listing?</h2>
                <p className="mt-2 text-sm text-gray-500">
                  This action cannot be undone.
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleDelete}
                    className="flex-1 cursor-pointer rounded-xl bg-red-500 py-2 text-white transition-all duration-300 hover:bg-red-600 hover:shadow-[0_0_15px_rgba(239,68,68,0.7)] active:scale-95"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => setShowDelete(false)}
                    className="flex-1 cursor-pointer rounded-xl border border-gray-300 py-2 text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-black hover:shadow-[0_0_12px_rgba(0,0,0,0.15)] active:opacity-90"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="w-full min-w-0 max-w-full overflow-hidden rounded-3xl bg-white p-6 shadow-md md:p-8"
          >
            <div className="grid gap-5">
              <div className="min-w-0">
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
                  className="w-full min-w-0 rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="min-w-0">
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
                    className="w-full min-w-0 rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="min-w-0">
                  <label className="mb-2 text-sm font-semibold text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                    className="w-full min-w-0 rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <IndianRupee size={16} />
                  Price per night
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onWheel={(event) => event.currentTarget.blur()}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full min-w-0 rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div className="min-w-0">
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <ImageIcon size={16} />
                  Listing Images
                </label>

                <input
                  id="listing-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                  className="hidden"
                />

                <label
                  htmlFor="listing-images"
                  className="flex w-full min-w-0 cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 px-4 py-4 transition hover:border-orange-300 hover:bg-orange-50/40"
                >
                  <span className="shrink-0 rounded-xl bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-600">
                    Choose files
                  </span>
                  <span className="min-w-0 truncate text-sm text-gray-600">
                    {fileInputText}
                  </span>
                </label>

                <div className="mt-4 space-y-3">
                  {imagePreviews.map((image, index) => (
                    <div
                      key={`${image.previewUrl}-row-${index}`}
                      className="flex min-w-0 items-center gap-3 rounded-2xl border border-gray-200 p-3"
                    >
                      <img
                        src={image.previewUrl}
                        alt={`Listing ${index + 1}`}
                        className="h-16 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="min-w-0 truncate text-sm font-medium text-gray-700">
                          {image.kind === "existing"
                            ? `Current image ${index + 1}`
                            : image.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {image.kind === "existing" ? "Already saved" : "Ready to upload"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="shrink-0 cursor-pointer rounded-2xl border border-red-200 bg-red-50 p-3 text-red-500 transition hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
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
                  className="w-full min-w-0 rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full min-w-0 cursor-pointer rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitButtonText}
              </button>

              <button
                onClick={() => {
                  navigate(redirect);
                }}
                type="button"
                className="w-full min-w-0 cursor-pointer rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
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
