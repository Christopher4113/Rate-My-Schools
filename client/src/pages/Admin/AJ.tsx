import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface Job {
  id: number;
  category: string;
  description: string;
  schoolId: number;
}

const initialForm = {
  category: '',
  description: '',
};

const AJ = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL
  const { id } = useParams();
  const schoolId = Number(id);
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [formData, setFormData] = useState(initialForm);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const fetchJobs = () => {
    axios
      .get(`${serverURL}/auth/getJobs/${schoolId}`)
      .then((res) => setJobsList(res.data))
      .catch((err) => console.error('Error fetching jobs:', err));
  };

  useEffect(() => {
    fetchJobs();
  }, [schoolId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        schoolId,
      };

      if (isUpdating && selectedJobId !== null) {
        await axios.put(`${serverURL}/auth/updateJobs`, {
          id: selectedJobId,
          ...payload,
        });
        alert('Job updated!');
      } else {
        await axios.post(`${serverURL}/auth/postJobs`, payload);
        alert('Job added!');
      }

      fetchJobs();
      handleClear();
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`${serverURL}/auth/deleteJobs/${id}`)
      .then(() => fetchJobs())
      .catch((error) => console.error('Delete failed:', error));
  };

  const handleEdit = (job: Job) => {
    setFormData({
      category: job.category,
      description: job.description,
    });
    setIsUpdating(true);
    setSelectedJobId(job.id);
  };

  const handleClear = () => {
    setFormData(initialForm);
    setIsUpdating(false);
    setSelectedJobId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isUpdating ? 'Update Job' : 'Add Job'}</h1>
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

      <h2 className="text-xl font-semibold mb-2">Jobs List</h2>
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
          {jobsList.map((job) => (
            <tr key={job.id}>
              <td className="border px-4 py-2">{job.id}</td>
              <td className="border px-4 py-2">
                <Link to={`/AJR/${job.id}`}>
                  {job.category}
                </Link>
              </td>
              <td className="border px-4 py-2">{job.description}</td>
              <td className="border px-4 py-2">{job.schoolId}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {jobsList.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AJ;
