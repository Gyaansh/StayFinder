import { useState } from "react";

const ListingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    URL: [],        
    price: "",
    location: "",
    country: "India"
  });

  const [errors, setErrors] = useState({});

  // Theme colors from Airbnb design [file:27]
  const theme = {
    bg: 'from-amber-50 via-orange-50 to-rose-50',
    card: 'bg-white/90 backdrop-blur-sm border border-orange-100/50 shadow-2xl',
    primary: 'from-amber-500 via-orange-500 to-rose-500',
    removeBtn: 'top-1 right-1 w-7 h-7 bg-rose-500/95 hover:bg-rose-600 border-3 border-white shadow-2xl'
  };

  const addImageUrl = () => {
    const urlInput = document.getElementById('imageUrl');
    let imageUrl = urlInput.value.trim();
    
    if (!imageUrl) {
      alert("Please enter an image URL");
      return;
    }
    
    imageUrl = autoResizeImage(imageUrl);
    
    if (formData.URL.length >= 15) {
      alert("Too many photos! Max 15 images.");
      return;
    }
    
    setFormData(prev => ({ ...prev, URL: [...prev.URL, imageUrl] }));
    urlInput.value = "";
  };

  const autoResizeImage = (url) => {
    if (url.includes('unsplash.com')) {
      return url.replace(/(\?|$)/, '?w=300&h=200&fit=crop$1');
    }
    if (url.includes('i.imgur.com')) {
      return url.includes('?') ? `${url}&maxwidth=300` : `${url}?maxwidth=300`;
    }
    if (url.includes('res.cloudinary.com')) {
      return url.replace(/\/upload\/([^/]*)/, '/upload/c_fill,w_300,h_200/$1');
    }
    return url.includes('?') ? `${url}&w=300&h=200` : `${url}?w=300&h=200`;
  };

  const removeImage = (imageIndex) => {
    const updatedImages = formData.URL.filter((_, index) => index !== imageIndex);
    setFormData(prev => ({ ...prev, URL: updatedImages }));
  };

  const updateField = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const isFormValid = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.URL.length === 0) newErrors.URL = "Add at least 1 image";
    if (formData.price < 1) newErrors.price = "Price must be at least 1";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fix errors!");
      return;
    }
    try {
    const res = await fetch("/api/listing/newlisting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    console.log("Server Response:", result);

  } catch (err) {
    console.error("Request failed:", err);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full p-3">
        <div className={theme.card + " rounded-3xl p-6 lg:p-8 space-y-6"}>
          <form method="post">
             <div>
            <label className="block text-lg font-bold text-gray-800 mb-4">Property Title *</label>
            <input
              type="text"
              placeholder="Property Title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full p-5 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-400 text-lg font-semibold shadow-md"
            />
            {errors.title && <p className="text-rose-500 text-sm mt-2 font-bold bg-rose-50 p-3 rounded-xl">Title is required</p>}
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-800 mb-4">Description</label>
            <textarea
              rows="4"
              placeholder="Property Description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full p-5 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-400 resize-vertical text-lg shadow-md"
            />
          </div>


          {/* Images - FIXED REMOVE BUTTON [file:27] */}
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-4">Property Photos * (Max 15)</label>
            
            {/* Add URL */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border-2 border-emerald-200 mb-6 shadow-inner">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="imageUrl"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-... (auto-resizes!)"
                  className="flex-1 p-4 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-400 bg-white shadow-sm text-sm"
                />
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-emerald-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all whitespace-nowrap"
                >
                  ➕ Add Photo
                </button>
              </div>
            </div>

            {/* Image Grid */}
            {formData.URL.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.URL.map((imageUrl, index) => (
                  <div 
                    key={index} 
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg hover:shadow-2xl border border-orange-100 hover:border-orange-200 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="relative w-full h-32 md:h-36 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img 
                        src={imageUrl} 
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 hidden flex items-center justify-center bg-rose-500/20 backdrop-blur-sm rounded-xl text-sm text-rose-600 font-bold">
                        ⚠️ Image not found
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 mt-2 px-1 line-clamp-2 text-center bg-white/50 rounded-lg backdrop-blur-sm">
                      {imageUrl.split('?')[0]}
                    </p>
                    
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-7 h-7 bg-rose-500/95 hover:bg-rose-600 text-white rounded-full text-sm font-bold flex items-center justify-center shadow-2xl border-4 border-white hover:shadow-3xl hover:scale-110 transition-all duration-200 z-20 group-hover:bg-rose-700"
                      title="Remove photo"
                    >
                      ×
                    </button>
                    
                    
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl border-2 border-dashed border-orange-200 shadow-inner">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-300 to-orange-400 rounded-2xl flex items-center justify-center mb-4 text-3xl shadow-xl">
                  🖼️
                </div>
                <p className="text-xl font-bold text-gray-700 mb-1">No photos yet</p>
                <p className="text-sm text-gray-600">Paste first image URL above</p>
              </div>
            )}
          </div>

         

          {/* ✅ LOCATION & COUNTRY - SEPARATE FIELDS */}
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-4">Location *</label>
            <input
              type="text"
              placeholder="Mumbai, Bandra"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              className="w-full p-5 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 shadow-xl text-lg"
            />
            {errors.location && <p className="text-rose-500 text-sm mt-2 font-bold bg-rose-50 p-3 rounded-xl">Location is required</p>}
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-800 mb-4">Country *</label>
            <input
              type="text"
              placeholder="India"
              value={formData.country}
              onChange={(e) => updateField("country", e.target.value)}
              className="w-full p-5 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 shadow-xl text-lg"
            />
            {errors.country && <p className="text-rose-500 text-sm mt-2 font-bold bg-rose-50 p-3 rounded-xl">Country is required</p>}
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-800 mb-4">Price per night *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-2xl text-orange-500 font-black">$</span>
              <input
                type="number"
                min="1"
                placeholder="99"
                value={formData.price}
                onChange={(e) => updateField("price", Number(e.target.value))}
                className="w-full pl-16 p-5 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 shadow-xl text-2xl font-bold"
              />
            </div>
            {errors.price && <p className="text-rose-500 text-sm mt-2 font-bold bg-rose-50 p-3 rounded-xl">Price must be at least 1</p>}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#ea580c] text-white py-6 px-8 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] focus:ring-4 focus:ring-amber-400 transform transition-all duration-300"
          >
            Publish Listing!
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
