import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Responses = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase.from("purchase_requests").select("*");
      if (error) {
        console.error("Error fetching requests:", error.message);
      } else {
        setRequests(data);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">User Purchase Requests</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm md:text-base">
              <th className="p-3 border">#</th>
              <th className="p-3 border">User Email</th>
              <th className="p-3 border">Car ID</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border">{req.user_email}</td>
                <td className="p-3 border text-center">{req.car_id}</td>
                <td className="p-3 border text-center font-semibold text-blue-600">{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Responses;
