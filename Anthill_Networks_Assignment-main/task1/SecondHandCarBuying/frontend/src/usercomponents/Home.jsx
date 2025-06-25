import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import heroBg from "../assets/cars.png"; 

const Home = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      navigate("/"); 
    }
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-sans">
    
      <header className="bg-white shadow-md p-4 flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold text-red-500">Carspace</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <section
        className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center text-center text-white bg-cover bg-center px-4"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-xl font-bold leading-tight">
            Find Quality Assured Cars Tailored to Your Budget
          </h1>
          <p className="text-lg mt-4">
            Browse through a wide range of certified used and new cars.
          </p>
          <button className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-red-500 rounded-md text-white text-base sm:text-lg font-semibold">
  Get Started
</button>

        </div>
      </section>

      <div className="max-w-4xl mx-auto p-4">
        <div className="relative flex flex-wrap items-center bg-gray-100 border border-gray-300 shadow-xl rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search cars by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-auto flex-1 p-3 pl-4 bg-gray-100 text-gray-900 placeholder-gray-500 border-none outline-none"
          />
          <button className="px-6 py-3 bg-red-500 text-white font-semibold hover:bg-red-600 w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>

      <section className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Featured Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{car.name} {car.year}</h3>
                <p className="text-red-500 text-xl font-bold">₹ {car.price}</p>
                <div className="flex flex-wrap justify-between text-gray-600 text-sm mt-2">
                  <span>Fuel: {car.fuelType}</span>
                  <span>Mileage: {car.mileage} km</span>
                  <span>Transmission: {car.driverType}</span>
                </div>
                <button
                  onClick={() => navigate(`/view-cars/${car.id}`)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-blue-900 text-white p-6 sm:p-10 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p>123 Street, Bangalore, India</p>
            <p>Email: support@carspace.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4 mt-2">
              <span>📘 Facebook</span>
              <span>📷 Instagram</span>
              <span>🐦 Twitter</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
