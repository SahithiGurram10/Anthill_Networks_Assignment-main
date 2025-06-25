import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const ManageListings = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase.from("cars").select("*");
      if (error) {
        console.error("Error fetching cars:", error.message);
      } else {
        setCars(data);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Manage Listings</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg md:text-xl font-semibold">{car.name} {car.year}</h3>
              <p className="text-red-500 text-lg md:text-xl font-bold">₹ {car.price}</p>
              <div className="flex flex-wrap justify-between text-gray-600 text-sm mt-2">
                <span>Fuel: {car.fuelType}</span>
                <span>Mileage: {car.mileage} km</span>
                <span>Transmission: {car.driverType}</span>
              </div>
              <button
                onClick={() => navigate(`/view-car/${car.id}`)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-md text-sm md:text-base hover:bg-red-600 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageListings;
