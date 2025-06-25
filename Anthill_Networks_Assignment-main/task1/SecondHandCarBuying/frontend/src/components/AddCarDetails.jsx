import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const AddCarDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingCar = location.state?.car || null;

  const [carData, setCarData] = useState({
    name: "", owner: "", price: "", year: "", engine: "", mileage: "",
    driverType: "", cylinders: "", seats: "", fuelType: "", doors: "", color: "",
    description: "", cityMPG: "", highwayMPG: "", address: "", addressLink: "",
    features: [], image: null,
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingCar) {
      setCarData((prevData) => ({
        ...prevData,
        ...editingCar,
        features: Array.isArray(editingCar.features) ? editingCar.features : [],
      }));
    }
  }, [editingCar]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCarData((prevData) => ({
        ...prevData,
        features: checked ? [...(prevData.features || []), value] : prevData.features.filter((feature) => feature !== value),
      }));
    } else {
      setCarData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `car-images/${fileName}`;

    const { data, error } = await supabase.storage.from("car-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      console.error("Image Upload Error:", error.message);
      alert("Failed to upload image.");
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("car-images").getPublicUrl(filePath);

    setCarData((prevData) => ({ ...prevData, image: publicUrlData.publicUrl }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...carData,
      price: parseFloat(carData.price) || null,
      year: parseInt(carData.year) || null,
      mileage: parseInt(carData.mileage) || null,
      cylinders: parseInt(carData.cylinders) || null,
      seats: parseInt(carData.seats) || null,
      doors: parseInt(carData.doors) || null,
      cityMPG: parseInt(carData.cityMPG) || null,
      highwayMPG: parseInt(carData.highwayMPG) || null,
      features: carData.features.length ? carData.features : [],
    };

    let response;
    if (editingCar) {
      response = await supabase.from("cars").update(formattedData).eq("id", editingCar.id);
    } else {
      response = await supabase.from("cars").insert([formattedData]);
    }

    const { error } = response;
    if (error) {
      console.error("Error saving car:", error.message);
      alert("Failed to save car. Please try again.");
    } else {
      alert(`Car ${editingCar ? "updated" : "added"} successfully!`);
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold">{editingCar ? "Edit Car" : "Add New Car"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "owner", "price", "year", "engine", "mileage", "driverType", "cylinders", "seats", "fuelType", "doors", "color"].map((name) => (
            <div key={name} className="flex flex-col">
              <label className="text-gray-700 font-semibold">
                {name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input 
                type="text" name={name} value={carData[name] || ""} 
                onChange={handleChange} 
                className="p-2 border rounded-md mt-1 text-sm md:text-base" required 
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Description</label>
          <textarea 
            name="description" value={carData.description || ""} 
            onChange={handleChange} 
            className="p-2 border rounded-md mt-1 h-24 text-sm md:text-base" 
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded-md mt-1" />
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {carData.image && <img src={carData.image} alt="Car" className="mt-2 w-full max-w-xs h-40 object-cover rounded-md" />}
        </div>

        <fieldset className="mt-4">
          <legend className="text-lg font-semibold">Features</legend>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["A/C Front", "Sunroof", "Power Steering", "CCTV", "Central Locking", "Leather", "Navigation System"].map((feature) => (
              <label key={feature} className="flex items-center space-x-2 text-sm md:text-base">
                <input type="checkbox" value={feature} checked={carData.features?.includes(feature) || false} onChange={handleChange} />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
          <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg w-full md:w-auto">
            {editingCar ? "Update Car" : "Submit"}
          </button>
          <button 
            type="button" 
            onClick={() => setCarData({ ...carData, image: null })} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg w-full md:w-auto"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarDetails;
