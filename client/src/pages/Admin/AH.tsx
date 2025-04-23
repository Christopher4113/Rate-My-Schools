import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface Housing {
  id: number;
  type: string;
  description: string;
  schoolId: number;
}

const initialForm = {
  type: '',
  description: '',
};

const AH = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL
  const { id } = useParams();
  const schoolId = Number(id);
  const [housingList, setHousingList] = useState<Housing[]>([]);
  const [formData, setFormData] = useState(initialForm);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedHousingId, setSelectedHousingId] = useState<number | null>(null);

  const fetchHousing = () => {
    axios
      .get(`${serverURL}/auth/getHousing/${schoolId}`)
      .then((res) => setHousingList(res.data))
      .catch((err) => console.error('Error fetching housing:', err));
  };

  useEffect(() => {
    fetchHousing();
  }, [schoolId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        schoolId,
      };

      if (isUpdating && selectedHousingId !== null) {
        await axios.put(`${serverURL}/auth/updateHousing`, {
          id: selectedHousingId,
          ...payload,
        });
        alert('Housing updated!');
      } else {
        await axios.post(`${serverURL}/auth/postHousing`, payload);
        alert('Housing added!');
      }

      fetchHousing();
      handleClear();
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`${serverURL}/auth/deleteHousing/${id}`)
      .then(() => fetchHousing())
      .catch((error) => console.error('Delete failed:', error));
  };

  const handleEdit = (housing: Housing) => {
    setFormData({
      type: housing.type,
      description: housing.description,
    });
    setIsUpdating(true);
    setSelectedHousingId(housing.id);
  };

  const handleClear = () => {
    setFormData(initialForm);
    setIsUpdating(false);
    setSelectedHousingId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isUpdating ? 'Update Housing' : 'Add Housing'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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

      <h2 className="text-xl font-semibold mb-2">Housing List</h2>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">School ID</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {housingList.map((housing) => (
            <tr key={housing.id}>
              <td className="border px-4 py-2">{housing.id}</td>
              <td className="border px-4 py-2">
                <Link to={`/AHR/${housing.id}`}>
                  {housing.type}
                </Link>
              </td>
              <td className="border px-4 py-2">{housing.description}</td>
              <td className="border px-4 py-2">{housing.schoolId}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(housing)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(housing.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {housingList.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No housing found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AH;
