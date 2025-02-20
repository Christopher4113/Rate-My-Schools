import React, { useState, useEffect } from "react";
import axios from "axios";

interface School {
  id: number;
  schoolName: string;
}

const Dashboard: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);

  useEffect(() => {
    axios
      .get<School[]>("http://localhost:8080/auth/schools")
      .then((response) => {
        setSchools(response.data);
        setFilteredSchools(response.data);
      })
      .catch((error) => console.error("Error fetching schools:", error));
  }, []);

  useEffect(() => {
    const results = schools
      .filter((school) =>
        school.schoolName.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .slice(0, 5);
    setFilteredSchools(results);
  }, [searchTerm, schools]);

  const handleSchoolClick = (id: number) => {
    console.log("School ID clicked:", id);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start" 
    >
      <div className=""
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/dashboard.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%"
        }}
      >
        <h1 className="text-4xl font-semibold text-center text-white mt-10 mb-6">
          Discover real student reviews on dorms and more
        </h1>

        <div className="flex flex-col items-center justify-center w-full p-4 max-sm:w-[80%]">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for a school..."
            className="p-4 border border-gray-300 rounded-lg w-80 text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Display filtered schools */}
          <ul className="bg-white p-2 rounded-lg w-80 shadow-lg border border-gray-300">
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => (
                <li
                  key={school.id}
                  className="p-3 border-b last:border-none cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSchoolClick(school.id)}
                >
                  {school.schoolName}
                </li>
              ))
            ) : (
              <li className="p-3 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      </div>
        <div className="flex flex-row justify-between items-center space-x-6">
          <div className="flex flex-col items-center justify-end">
            <img
              src="./public/school.png"
              alt="School"
              className="w-24 h-24 rounded-full mb-2" // Ensures image is circular and has a margin at the bottom
            />
            <h1 className="text-center">Search for schools and write anonymous reviews</h1>
          </div>

          <div className="flex flex-col items-center justify-end">
            <img
              src="./public/profile.png"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-2" // Ensures image is circular and has a margin at the bottom
            />
            <h1 className="text-center">Create your profile and utilize personalized features</h1>
          </div>

          <div className="flex flex-col items-center justify-end">
            <img
              src="./public/leaderboard.png"
              alt="Leaderboard"
              className="w-24 h-24 rounded-full mb-2" // Ensures image is circular and has a margin at the bottom
            />
            <h1 className="text-center">Check out our leaderboard and see where each school ranks</h1>
          </div>

          <div className="flex flex-col items-center justify-end">
            <img
              src="./public/chat.png"
              alt="Chat"
              className="w-24 h-24 rounded-full mb-2" // Ensures image is circular and has a margin at the bottom
            />
            <h1 className="text-center">Chat and discuss with others about a school you're interested in</h1>
          </div>
        </div>

    </div>
  );
};

export default Dashboard;
