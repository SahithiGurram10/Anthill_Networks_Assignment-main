import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const ViewCars = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const { data, error } = await supabase.from("cars").select("*").eq("id", id).single();
      if (error) {
        console.error("Error fetching car details:", error.message);
      } else {
        setCar(data);
      }
      setLoading(false);
    };
    fetchCarDetails();
  }, [id]);

  const handlePurchaseRequest = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("You need to be logged in to make a purchase request.");
      return;
    }

    const { error } = await supabase.from("purchase_requests").insert([
      { car_id: id, user_email: user.email, status: "Pending" },
    ]);

    if (error) {
      console.error("Error sending purchase request:", error.message);
      alert("Failed to send purchase request.");
    } else {
      alert("Purchase request sent successfully!");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
   
      <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-200 flex justify-center items-center">
        <img src={car.image} alt={car.name} className="h-full object-cover rounded-lg" />
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-4">{car.name} {car.year}</h2>
      <p className="text-lg md:text-xl text-red-500 font-bold mt-2">₹{car.price}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm md:text-lg">
        <p><strong>Owner:</strong> {car.owner}</p>
        <p><strong>Engine:</strong> {car.engine}</p>
        <p><strong>Mileage:</strong> {car.mileage} km</p>
        <p><strong>Fuel Type:</strong> {car.fuelType}</p>
        <p><strong>Driver Type:</strong> {car.driverType}</p>
        <p><strong>Cylinders:</strong> {car.cylinders}</p>
        <p><strong>Seats:</strong> {car.seats}</p>
        <p><strong>Doors:</strong> {car.doors}</p>
        <p><strong>Color:</strong> {car.color}</p>
        <p><strong>City MPG:</strong> {car.cityMPG}</p>
        <p><strong>Highway MPG:</strong> {car.highwayMPG}</p>
        <p><strong>Location:</strong> 
          <a href={car.addressLink} target="_blank" rel="noopener noreferrer" className="text-blue-500"> {car.address}</a>
        </p>
        <p><strong>Features:</strong> {car.features?.join(", ") || "No features listed"}</p>
      </div>

      <p className="mt-4 text-gray-700 text-sm md:text-lg"><strong>Description:</strong> {car.description}</p>

      <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
        <button 
          onClick={handlePurchaseRequest} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full md:w-auto"
        >
          Request to Purchase
        </button>
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg w-full md:w-auto"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewCars;
