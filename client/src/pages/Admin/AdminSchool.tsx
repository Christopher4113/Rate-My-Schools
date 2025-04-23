import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface School {
  id: number;
  schoolName: string;
  description: string;
  location: string;
}

const initialForm = {
  schoolName: '',
  description: '',
  location: '',
};

const AdminSchool = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL
  const [schools, setSchools] = useState<School[]>([]);
  const [formData, setFormData] = useState(initialForm);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);

  // Fetch all schools
  const fetchSchools = () => {
    axios
      .get(`${serverURL}/auth/schools`)
      .then((res) => setSchools(res.data))
      .catch((err) => console.error('Error fetching schools:', err));
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  // Add or Update school
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isUpdating && selectedSchoolId !== null) {
        await axios.put(`${serverURL}/auth/updateSchool`, {
          id: selectedSchoolId,
          ...formData,
        });
        alert('School updated!');
      } else {
        await axios.post(`${serverURL}/auth/postSchool`, formData);
        alert('School added!');
      }

      fetchSchools();
      handleClear();
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  // Delete school
  const handleDelete = (id: number) => {
    axios
      .delete(`${serverURL}/auth/deleteSchool/${id}`)
      .then(() => {
        fetchSchools();
      })
      .catch((error) => console.error('Delete failed:', error));
  };

  // Update button clicked
  const handleEdit = (id: number) => {
    axios
      .get(`${serverURL}/auth/getSchool/${id}`)
      .then((res) => {
        setFormData({
          schoolName: res.data.schoolName,
          description: res.data.description,
          location: res.data.location,
        });
        setIsUpdating(true);
        setSelectedSchoolId(id);
      })
      .catch((err) => console.error('Fetch for edit failed:', err));
  };

  // Clear forms
  const handleClear = () => {
    setFormData(initialForm);
    setIsUpdating(false);
    setSelectedSchoolId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isUpdating ? 'Update School' : 'Add School'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="School Name"
          value={formData.schoolName}
          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="block w-full p-2 border rounded"
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isUpdating ? 'Update School' : 'Add School'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Clear
          </button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-2">Schools List</h2>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id}>
              <td className="border px-4 py-2">{school.id}</td>
              <td className="border px-4 py-2 text-blue-600 underline cursor-pointer">
                <Link to={`/select/${school.id}`}>{school.schoolName}</Link>
              </td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(school.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(school.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {schools.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No schools found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSchool;
