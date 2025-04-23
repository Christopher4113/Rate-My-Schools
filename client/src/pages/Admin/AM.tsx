import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface Major {
  id: number;
  majorName: string;
  description: string;
  schoolId: number;
}

const initialForm = {
  majorName: '',
  description: '',
};

const AM = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL
  const { id } = useParams();
  const schoolId = Number(id);
  const [majorsList, setMajorsList] = useState<Major[]>([]);
  const [formData, setFormData] = useState(initialForm);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedMajorId, setSelectedMajorId] = useState<number | null>(null);

  const fetchMajors = () => {
    axios
      .get(`${serverURL}/auth/getMajors/${schoolId}`)
      .then((res) => setMajorsList(res.data))
      .catch((err) => console.error('Error fetching majors:', err));
  };

  useEffect(() => {
    fetchMajors();
  }, [schoolId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        schoolId,
      };

      if (isUpdating && selectedMajorId !== null) {
        await axios.put(`${serverURL}/auth/updateMajors`, {
          id: selectedMajorId,
          ...payload,
        });
        alert('Major updated!');
      } else {
        await axios.post(`${serverURL}/auth/postMajors`, payload);
        alert('Major added!');
      }

      fetchMajors();
      handleClear();
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`${serverURL}/auth/deleteMajors/${id}`)
      .then(() => fetchMajors())
      .catch((error) => console.error('Delete failed:', error));
  };

  const handleEdit = (major: Major) => {
    setFormData({
      majorName: major.majorName,
      description: major.description,
    });
    setIsUpdating(true);
    setSelectedMajorId(major.id);
  };

  const handleClear = () => {
    setFormData(initialForm);
    setIsUpdating(false);
    setSelectedMajorId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isUpdating ? 'Update Major' : 'Add Major'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Category"
          value={formData.majorName}
          onChange={(e) => setFormData({ ...formData, majorName: e.target.value })}
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isUpdating ? 'Update' : 'Add'}
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

      <h2 className="text-xl font-semibold mb-2">Majors List</h2>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">School ID</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {majorsList.map((major) => (
            <tr key={major.id}>
              <td className="border px-4 py-2">{major.id}</td>
              <td className="border px-4 py-2">
                <Link to={`/AMR/${major.id}`}>
                  {major.majorName}
                </Link>
              </td>
              <td className="border px-4 py-2">{major.description}</td>
              <td className="border px-4 py-2">{major.schoolId}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(major)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(major.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {majorsList.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No majors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AM;
