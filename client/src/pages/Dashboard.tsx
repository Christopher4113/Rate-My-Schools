import React, { useState, useEffect } from "react";
import axios from "axios";

interface School {
  id: number;
  schoolName: string;
}

const FeatureList: React.FC = () => {
  const features = [
    {
      text: "Search for schools and write anonymous reviews",
      img: "/public/school.png",
      alt: "School",
    },
    {
      text: "Create your profile and utilize personalized features",
      img: "/public/profile.png",
      alt: "Profile",
    },
    {
      text: "Check out our leaderboard and see where each school ranks",
      img: "/public/leaderboard.png",
      alt: "Leaderboard",
    },
    {
      text: "Chat and discuss with others about a school you're interested in",
      img: "/public/chat.png",
      alt: "Chat",
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-8 py-10">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-4 max-w-2xl">
          <img
            src={feature.img}
            alt={feature.alt}
            className="w-16 h-16 rounded-full object-cover"
          />
          <h1 className="text-lg font-semibold text-gray-800">{feature.text}</h1>
        </div>
      ))}
    </div>
  );
};

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
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="w-full text-center py-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/dashboard.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-semibold text-white mb-6">
          Discover real student reviews on dorms and more
        </h1>

        {/* Search Input */}
        <div className="flex flex-col items-center w-full p-4">
          <input
            type="text"
            placeholder="Search for a school..."
            className="p-4 border border-gray-300 rounded-lg w-80 text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Display filtered schools */}
          <ul className="bg-white p-2 rounded-lg w-80 shadow-lg border border-gray-300 mt-2">
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

      {/* Features Section */}
      <FeatureList />
    </div>
  );
};

export default Dashboard;
