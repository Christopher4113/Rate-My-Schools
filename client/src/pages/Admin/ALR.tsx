import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface LifeStyleReview {
  id: number;
  review: string;
  rating: number;
  createdAt: string;
}

const ALR = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState<LifeStyleReview[]>([]);

  const fetchReviews = () => {
    axios
      .get(`http://localhost:8080/auth/getLifeStylesReview/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Error fetching lifestyle reviews:', err));
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleDelete = (reviewId: number) => {
    axios
      .delete(`http://localhost:8080/auth/deleteLifeStylesReview/${reviewId}`)
      .then(() => {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      })
      .catch((error) => console.error('Error deleting review:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lifestyle Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews available.</p>
      ) : (
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Review</th>
              <th className="border px-4 py-2">Rating</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td className="border px-4 py-2">{review.id}</td>
                <td className="border px-4 py-2">{review.review}</td>
                <td className="border px-4 py-2">{review.rating}</td>
                <td className="border px-4 py-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ALR;
