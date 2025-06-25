import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import AddCarDetails from "./components/AddCarDetails";
import ManageListings from "./components/ManageListings";
import ViewCarDetails from "./components/ViewCarDetails";
import Home from "./usercomponents/Home";
import ViewCars from "./usercomponents/ViewCars";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthCallback from "./components/AuthCallback";
import Responses from "./components/Responses";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-car" element={<AddCarDetails />} />
        <Route path="/manage-listings" element={<ManageListings />} />
        <Route path="/view-car/:id" element={<ViewCarDetails />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/view-cars/:id" element={<ViewCars />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/responses" element={<Responses />} />
      </Routes>
    </Router>
  );
};

export default App;
