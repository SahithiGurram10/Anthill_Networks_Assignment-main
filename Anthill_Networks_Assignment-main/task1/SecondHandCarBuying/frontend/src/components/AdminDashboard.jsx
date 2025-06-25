import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import ManageListings from "./ManageListings";
import Responses from "./Responses";
import { Menu, X } from "lucide-react"; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("manageListings"); 
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      navigate("/"); 
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 w-64 bg-white shadow-lg p-6 flex flex-col justify-between 
        transition-transform duration-300 z-40`} 
      >
        <div>
          <h1 className="text-2xl font-bold text-red-500">Carspace</h1>
          <nav className="mt-6 space-y-4">
            {["home", "responses", "manageListings", "bookings", "faqs", "blogs"].map(
              (section) => (
                <p
                  key={section}
                  className={`cursor-pointer capitalize ${
                    activeSection === section
                      ? "text-red-500 font-semibold"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                  onClick={() => {
                    setActiveSection(section);
                    setSidebarOpen(false);
                  }}
                >
                  {section.replace(/([A-Z])/g, " $1")}
                </p>
              )
            )}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <button
        className="absolute top-4 left-4 md:hidden text-gray-700 z-50" 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className="flex-1 p-6 overflow-auto relative z-0"> 
        {activeSection === "manageListings" && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold">Manage Listings</h2>
              <button
                className="mt-4 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => navigate("/add-car")}
              >
                Add Car
              </button>
            </div>
            <div className="relative z-0"> 
              <ManageListings />
            </div>
          </>
        )}

        {activeSection === "responses" && <Responses />}
      </div>
    </div>
  );
};

export default AdminDashboard;
