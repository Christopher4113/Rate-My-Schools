import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import axios from 'axios';

interface School {
  id: number;
  schoolName: string;
}

const AllSchools = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const [schools, setSchools] = useState<School[]>([]);
  const navigate = useNavigate(); // ✅ hook for routing

  useEffect(() => {
    axios
      .get<School[]>(`${serverURL}/auth/schools`)
      .then((response) => {
        setSchools(response.data);
      })
      .catch((error) => console.error('Error fetching schools: ', error));
  }, []);

  // ✅ redirect to /school/:id when a school is clicked
  const handleSchoolClick = (id: number) => {
    navigate(`/school/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Background Image */}
      <div
        className="w-full text-center py-10"
        style={{
          backgroundImage: `url('/Tos.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></div>

      <h1
        className="font-bold text-2xl md:text-xl sm:text-lg text-center mt-6"
        style={{ fontFamily: 'Times New Roman, Arial, sans-serif' }}
      >
        All Schools
      </h1>

      {/* List of Schools */}
      <ul className="mt-4 p-4 flex flex-col items-center">
        {schools.map((school) => (
          <li
            key={school.id}
            className="cursor-pointer text-blue-600 hover:underline p-2"
            onClick={() => handleSchoolClick(school.id)}
          >
            {school.schoolName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllSchools;
