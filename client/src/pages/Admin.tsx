import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
    axios
      .get('http://localhost:8080/auth/getUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error('Failed to fetch users:', error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (id: number) => {
    axios
      .delete(`http://localhost:8080/auth/deleteUser/${id}`)
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((error) => console.error('Delete failed:', error));
  };

  const toggleAdmin = (id: number, isAdmin: boolean) => {
    axios
      .put(`http://localhost:8080/auth/updateUser/${id}`, { isAdmin: !isAdmin })
      .then(() => {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, isAdmin: !isAdmin } : user
          )
        );
      })
      .catch((error) => console.error('Update failed:', error));
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className='py-2 px-4 border-b'>Id</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Is Admin</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className='py-2 px-4 border-b'>{user.id}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={() => toggleAdmin(user.id, user.isAdmin)}
                  className="cursor-pointer"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
