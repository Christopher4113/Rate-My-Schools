import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface LifeStyle {
  id: number;
  category: string;
  description: string;
  schoolId: number;
}

const initialForm = {
  category: '',
  description: '',
};

const AL = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL
  const { id } = useParams();
  const schoolId = Number(id);
  const [lifeStylesList, setLifeStylesList] = useState<LifeStyle[]>([]);
  const [formData, setFormData] = useState(initialForm);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedLifeStyleId, setSelectedLifeStyleId] = useState<number | null>(null);

  const fetchLifeStyles = () => {
    axios
      .get(`${serverURL}/auth/getLifeStyles/${schoolId}`)
      .then((res) => setLifeStylesList(res.data))
      .catch((err) => console.error('Error fetching lifestyles:', err));
  };

  useEffect(() => {
    fetchLifeStyles();
  }, [schoolId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        schoolId,
      };

      if (isUpdating && selectedLifeStyleId !== null) {
        await axios.put(`${serverURL}/auth/updateLifeStyles`, {
          id: selectedLifeStyleId,
          ...payload,
        });
        alert('Lifestyle updated!');
      } else {
        await axios.post(`${serverURL}/auth/postLifeStyles`, payload);
        alert('Lifestyle added!');
      }

      fetchLifeStyles();
      handleClear();
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`${serverURL}/auth/deleteLifeStyles/${id}`)
      .then(() => fetchLifeStyles())
      .catch((error) => console.error('Delete failed:', error));
  };

  const handleEdit = (lifeStyle: LifeStyle) => {
    setFormData({
      category: lifeStyle.category,
      description: lifeStyle.description,
    });
    setIsUpdating(true);
    setSelectedLifeStyleId(lifeStyle.id);
  };

  const handleClear = () => {
    setFormData(initialForm);
    setIsUpdating(false);
    setSelectedLifeStyleId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isUpdating ? 'Update Lifestyle' : 'Add Lifestyle'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

      <h2 className="text-xl font-semibold mb-2">Lifestyle List</h2>
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
          {lifeStylesList.map((lifeStyle) => (
            <tr key={lifeStyle.id}>
              <td className="border px-4 py-2">{lifeStyle.id}</td>
              <td className="border px-4 py-2">
                <Link to={`/ALR/${lifeStyle.id}`}>
                  {lifeStyle.category}
                </Link>
              </td>
              <td className="border px-4 py-2">{lifeStyle.description}</td>
              <td className="border px-4 py-2">{lifeStyle.schoolId}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(lifeStyle)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(lifeStyle.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {lifeStylesList.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No lifestyles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AL;
