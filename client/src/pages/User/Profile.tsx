import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  exp: number;
  userId?: number;
}

const Profile = () => {
  const token = sessionStorage.getItem('token');
  let userId: number = 0;

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      userId = decoded.userId ?? 0;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const [formData, setFormData] = useState({
    location: '',
    major: '',
    academicLevel: '',
    campusSetting: '',
    finance: '',
    goals: '',
    living: '',
    personal: '',
    userId: userId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/postProfile', formData);
      alert("Profile created successfully!");
    } catch (err) {
      console.error("Error creating profile:", err);
      alert("Failed to save profile.");
    }

    setFormData({
      location: '',
      major: '',
      academicLevel: '',
      campusSetting: '',
      finance: '',
      goals: '',
      living: '',
      personal: '',
      userId: userId,
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">🎓 Create Your University Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Location</label>
          <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g., California, Ontario" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Major</label>
          <input name="major" value={formData.major} onChange={handleChange} placeholder="e.g., Computer Science" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Academic Level</label>
          <input name="academicLevel" value={formData.academicLevel} onChange={handleChange} placeholder="e.g., Undergraduate, Masters" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Campus Setting</label>
          <input name="campusSetting" value={formData.campusSetting} onChange={handleChange} placeholder="e.g., Urban, Suburban, Rural" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Financial Considerations</label>
          <input name="finance" value={formData.finance} onChange={handleChange} placeholder="e.g., Budget, Scholarships, Work-Study" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Academic or Career Goals</label>
          <textarea name="goals" value={formData.goals} onChange={handleChange} placeholder="e.g., Become a researcher, work in Silicon Valley" rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Living Preference</label>
          <input name="living" value={formData.living} onChange={handleChange} placeholder="e.g., On-campus dorm, apartment, commute from home" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Personal Preferences / Notes</label>
          <textarea name="personal" value={formData.personal} onChange={handleChange} placeholder="e.g., I prefer smaller class sizes, I need disability accommodations..." rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <button type="submit" className="w-full mt-4 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200">
          🚀 Submit Profile
        </button>
      </form>
      
    </div>
  );
};

export default Profile;
