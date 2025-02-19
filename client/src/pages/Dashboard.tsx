import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard: React.FC = () => {
  const [schools, setSchools] = useState<string[]>([]); // Explicitly set type
  const [searchTerm, setSearchTerm] = useState<string>(""); // Explicitly set type
  const [filteredSchools, setFilteredSchools] = useState<string[]>([]);

  // Fetch school data from backend
  useEffect(() => {
    axios
      .get<string[]>("http://localhost:8080/auth/schools") // Define expected response type
      .then((response) => {
        setSchools(response.data);
        setFilteredSchools(response.data);
      })
      .catch((error) => console.error("Error fetching schools:", error));
  }, []);

  // Update filtered schools based on search input
  useEffect(() => {
    const results = schools
      .filter((school: string) =>
        school.toLowerCase().startsWith(searchTerm.toLowerCase()) // Case insensitive filtering
      )
      .slice(0, 5); // Limit results to max 5 schools
    setFilteredSchools(results);
  }, [searchTerm, schools]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url('/dashboard.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a school..."
        className="p-2 border rounded w-80 text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display filtered schools (Max 5) */}
      <ul className="mt-4 bg-white p-2 rounded w-80">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school, index) => (
            <li key={index} className="p-2 border-b last:border-none">
              {school}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No results found</li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
