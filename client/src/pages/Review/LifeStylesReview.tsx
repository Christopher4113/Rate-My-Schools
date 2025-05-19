import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface Form {
  id: number;
  rating: number;
  review: string;
  createdAt: string;
}

const LifeStylesReview = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const { id } = useParams();
  const [formData, setFormData] = useState<Form[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviews, avg, total, name] = await Promise.all([
          axios.get<Form[]>(`${serverURL}/auth/getLifeStylesReview/${id}`),
          axios.get(`${serverURL}/auth/getLifeStylesAverageRating/${id}`),
          axios.get(`${serverURL}/auth/getLifeStylesTotalReviews/${id}`),
          axios.get(`${serverURL}/auth/getLifeStylesCategory/${id}`)
        ]);

        const sortedReviews = [...reviews.data].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setFormData(sortedReviews);
        setAverageRating(avg.data.averageRating);
        setTotalReviews(total.data.totalReviews);
        setCategory(name.data.category);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${serverURL}/auth/postLifeStylesReview`, {
        lifeStyle: { id: Number(id) },
        rating,
        review: reviewText,
      });

      alert("Review submitted successfully!");
      setRating(0);
      setReviewText("");

      const reviewResponse = await axios.get<Form[]>(`${serverURL}/auth/getLifeStylesReview/${id}`);
      const sortedData = [...reviewResponse.data].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setFormData(sortedData);

      const avgResponse = await axios.get(`${serverURL}/auth/getLifeStylesAverageRating/${id}`);
      setAverageRating(avgResponse.data.averageRating);

      const totalResponse = await axios.get(`${serverURL}/auth/getLifeStylesTotalReviews/${id}`);
      setTotalReviews(totalResponse.data.totalReviews);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const renderStars = (value: number) => {
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 >= 0.25 && value % 1 < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400 text-2xl">
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt key="half" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div
        className="w-full relative text-cyan-50"
        style={{
          backgroundImage: `url('/party.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          className="absolute bottom-12 left-4 font-bold text-3xl px-3 py-1 rounded"
          style={{
            fontFamily: "Times New Roman",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#FFD700",
          }}
        >
          Student {category} Reviews
        </h1>
        <div className="absolute bottom-1 left-4 px-3 py-1 rounded"
             style={{
               fontFamily: "Times New Roman",
               backgroundColor: "rgba(0, 0, 0, 0.6)",
               color: "#FFD700",
             }}
        >
          {renderStars(averageRating)}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 py-3 px-6 shadow-md">
        Have a look at {totalReviews} Student Reviews
      </h1>

      <div className='flex flex-col md:flex-row p-6 gap-6'>
        <div className='md:w-1/2 bg-white rounded-lg shadow-md p-6'>
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          {formData.length > 0 ? (
            formData.map((review) => (
              <div key={review.id} className="mb-4 border-b border-black pb-4 break-words">
                {renderStars(review.rating)}
                <p className="text-lg text-gray-700 mb-2">{review.review}</p>
                <p className="text-sm text-gray-500">
                  Reviewed on {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>

        <div className='md:w-1/2 bg-white rounded-lg shadow-md p-6'>
          <div className="max-w-md mx-auto px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Write a review</h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-gray-800 mb-1">Select Rating</label>
              <div className="flex space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="relative">
                    <FaStar
                      className={`text-3xl cursor-pointer ${
                        rating >= star ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setRating(rating === star ? 0 : star)}
                    />
                    <FaStar
                      className={`absolute top-0 left-0 text-3xl cursor-pointer ${
                        rating >= star - 0.5 && rating < star ? "text-yellow-400 opacity-50" : "text-transparent"
                      }`}
                      style={{ clipPath: "inset(0 50% 0 0)" }}
                      onClick={() => setRating(rating === star - 0.5 ? 0 : star - 0.5)}
                    />
                  </div>
                ))}
              </div>

              <label htmlFor="message" className="block text-gray-800 mb-1">Enter Your Review</label>
              <textarea
                className="w-full px-4 py-2 bg-gray-200 rounded-lg mb-4"
                rows={4}
                placeholder="Enter your review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeStylesReview;