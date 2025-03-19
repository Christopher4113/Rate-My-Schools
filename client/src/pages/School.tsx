import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

interface Form {
  schoolName: string,
  description: string;
  location: string;
}

const School = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Form | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/auth/getSchool/${id}`)
      .then(result => {
        const data = result.data;
        setFormData({
          schoolName: data.schoolName,
          description: data.description,
          location: data.location
        });
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleChoice = async () => {
    // Add logic for handleChoice if necessary
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Keep the header/image section the same */}
      <div
        className="w-full relative text-cyan-50"
        style={{
          backgroundImage: `url('/school.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          className="absolute bottom-4 left-4 font-bold text-3xl px-3 py-1 rounded"
          style={{
            fontFamily: "Times New Roman",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#FFD700",
          }}
        >
          {formData?.schoolName}
        </h1>
      </div>

      {/* Keep the Browse title section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-100 py-3 px-6 shadow-md">
          Browse Which Category You Want To Review
        </h1>
      </div>

      {/* Main content area with two columns */}
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Left column: Buttons in a box */}
        <div className="md:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Categories</h2>
          
          <div className="flex items-center mb-4">
            <button className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white w-32">Athletics</button>
            <p className="ml-4 text-gray-700">Rate and review sports programs, facilities, and game experiences</p>
          </div>
          
          <div className="flex items-center mb-4">
            <button className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-red-500 text-white w-32">Clubs</button>
            <p className="ml-4 text-gray-700">Explore and rate student organizations and extracurricular activities</p>
          </div>
          
          <div className="flex items-center mb-4">
            <button className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white w-32">Housing</button>
            <p className="ml-4 text-gray-700">Reviews of on-campus residences and off-campus housing options</p>
          </div>
          
          <div className="flex items-center mb-4">
            <button className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-yellow-500 text-white w-32">Jobs</button>
            <p className="ml-4 text-gray-700">Information about campus employment and career opportunities</p>
          </div>
          
          <div className="flex items-center mb-4">
            <button className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white w-32">LifeStyles</button>
            <p className="ml-4 text-gray-700">Reviews about campus life, culture, and social experiences</p>
          </div>
          
          <div className="flex items-center mb-4">
            <button className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 text-white w-32">Majors</button>
            <p className="ml-4 text-gray-700">Ratings and reviews of academic programs and departments</p>
          </div>
          
          <div className="flex items-center mb-4">
            <button className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white w-32">Other</button>
            <p className="ml-4 text-gray-700">Additional categories and miscellaneous reviews</p>
          </div>
        </div>
        
        {/* Right column: School description and location in a box */}
        <div className="md:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">About {formData?.schoolName}</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {formData?.description || "Western is among the top research-intensive universities in Canada, known for its world-class facilities and expertise across disciplines. From fundamental research to applied discovery, our researchers and scholars are advancing knowledge and making a positive impact in Canada and worldwide."}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Location</h3>
            <p className="text-gray-600 leading-relaxed">
              {formData?.location || "London, Ontario, Canada"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default School;