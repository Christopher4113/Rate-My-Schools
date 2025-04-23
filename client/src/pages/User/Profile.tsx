import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


interface JwtPayload {
  sub: string;
  exp: number;
  userId?: number;
}

interface GetProfileDto {
  location: string;
  major: string;
  academicLevel: string;
  campusSetting: string;
  finance: string;
  goals: string;
  living: string;
  personal: string;
}
interface School {
  id: number;
  schoolName: string;
  description: string;
  location: string;
}

const Profile = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL
  const [recommendedSchool, setRecommendedSchool] = useState<string | null>(null);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);

  const [schools, setSchools] = useState<School[]>([]);
  const [profile, setProfile] = useState<GetProfileDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = sessionStorage.getItem('token');

  const [userId, setUserId] = useState<number>(0);

  const fetchSchools = () => {
    axios
      .get(`${serverURL}/auth/schools`)
      .then((res) => setSchools(res.data))
      .catch((err) => console.error('Error detching schools: ', err))
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.userId) {
          setUserId(decoded.userId);
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [token]);

  const [formData, setFormData] = useState({
    location: '',
    major: '',
    academicLevel: '',
    campusSetting: '',
    finance: '',
    goals: '',
    living: '',
    personal: '',
    userId: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${serverURL}/auth/getProfile/${userId}`);
      setProfile(response.data);
    } catch (err) {
      setError("Failed to fetch profile. Please try again.");
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${serverURL}/auth/postProfile`, {
        ...formData,
        userId: userId,
      });
      alert("Profile created successfully!");
      fetchProfile();
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

  useEffect(() => {
    if (userId !== 0) {
      fetchProfile();
    }
  }, [userId]);

  const generateSchoolRecommendation = async () => {
    if (!profile || schools.length === 0) return;
  
    setIsLoadingRecommendation(true);
    setRecommendedSchool(null);
  
    try {
      const response = await axios.post(`${serverURL}/auth/recommendSchool`, {
        profile,
        schools,
      });
  
      const recommendation = response.data?.trim();
      setRecommendedSchool(recommendation ?? "No recommendation received.");
    } catch (err) {
      console.error("Error getting recommendation:", err);
      setRecommendedSchool("❌ Failed to get a recommendation. Please try again.");
    } finally {
      setIsLoadingRecommendation(false);
    }
  };
  

  return (
    <div>
      {/* Profile Form */}
      <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">🎓 Create Your University Profile</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {[
            { label: 'Preferred Location', name: 'location', placeholder: 'e.g., Quebec, Ontario' },
            { label: 'Preferred Major', name: 'major', placeholder: 'e.g., Computer Science' },
            { label: 'Academic Level', name: 'academicLevel', placeholder: 'e.g., Undergraduate, Masters' },
            { label: 'Campus Setting', name: 'campusSetting', placeholder: 'e.g., Urban, Suburban, Rural' },
            { label: 'Financial Considerations', name: 'finance', placeholder: 'e.g., Budget, Scholarships, Work-Study' },
            { label: 'Living Preference', name: 'living', placeholder: 'e.g., On-campus dorm, apartment, commute from home' },
          ].map(field => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
              <input
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Academic or Career Goals</label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="e.g., Become a researcher, work in Silicon Valley"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Personal Preferences / Notes</label>
            <textarea
              name="personal"
              value={formData.personal}
              onChange={handleChange}
              placeholder="e.g., I prefer smaller class sizes, I need disability accommodations, I love partying, I love school clubs..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            🚀 Submit Profile
          </button>
        </form>
      </div>

      {/* Display Profile */}
      {profile && (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center gap-2">
            <span className="text-purple-700 text-4xl">👤</span>
            Your University Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-700 text-[15px]">
            <div className="font-semibold">Preferred Location:</div>
            <div>{profile.location}</div>

            <div className="font-semibold">Preferred Major:</div>
            <div>{profile.major}</div>

            <div className="font-semibold">Academic Level:</div>
            <div>{profile.academicLevel}</div>

            <div className="font-semibold">Campus Setting:</div>
            <div>{profile.campusSetting}</div>

            <div className="font-semibold">Financial Considerations:</div>
            <div>{profile.finance}</div>

            <div className="font-semibold">Goals:</div>
            <div className="whitespace-pre-line">{profile.goals}</div>

            <div className="font-semibold">Living Preferences:</div>
            <div>{profile.living}</div>

            <div className="font-semibold">Personal Notes:</div>
            <div className="whitespace-pre-line">{profile.personal}</div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && <div className="text-red-600 font-medium text-center mt-4">{error}</div>}

      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">🔍 Find Your Best Match</h2>
        <p className="text-gray-600 text-center mb-6">Based on your profile and preferences, we will recommend a school that fits you best.</p>
        
        <div className="flex justify-center">
          <button
            onClick={generateSchoolRecommendation}
            disabled={isLoadingRecommendation}
            className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
          >
            {isLoadingRecommendation ? "Finding best match..." : "🎯 Recommend Me a School"}
          </button>
        </div>

        {recommendedSchool && (
          <div className="mt-6 text-center text-lg font-medium text-blue-700">
            🏆 The school we recommend is: <span className="font-bold">{recommendedSchool}</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;
