import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaStar } from 'react-icons/fa';

interface Form {
  id: number,
  rating: number,
  review: string,
  createdAt: string,
}

const AthleticsReview = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<Form[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [category, setCategory] = useState("")

  useEffect(() => {
    axios.get<Form[]>(`http://localhost:8080/auth/getAthleticsReview/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => console.error("Error fetching reviews", error));
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:8080/auth/getAthleticsAverageRating/${id}`)
      .then(response => {
        const data = response.data;
        setAverageRating(data.averageRating);
      })
      .catch(error => console.log(error));
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:8080/auth/getAthleticsTotalReviews/${id}`)
      .then(response => {
        const data = response.data;
        setTotalReviews(data.totalReviews);
      })
      .catch(error => console.error(error));
  }, [id]);
  
  useEffect(() => {
    axios.get(`http://localhost:8080/auth/getCategory/${id}`)
         .then(response => {
          const data = response.data;
          setCategory(data.category)
         })
         .catch(error => console.log(error))
  },[id])

  return (
    <div className='min-h-screen flex flex-col'>
      <div
        className="w-full relative text-cyan-50"
        style={{
          backgroundImage: `url('/athletics.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
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
        <div className="mt-3 flex items-center space-x-2 absolute bottom-1 left-4 rounded px-3 py-1"
             style={{
              fontFamily: "Times New Roman",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "#FFD700",
            }}
        >
          <span className="text-yellow-400 text-3xl flex">
            {Array.from({ length: Math.floor(averageRating) }, (_, i) => (
              <FaStar key={i} />
            ))}
            {Array.from({ length: 5 - Math.floor(averageRating) }, (_, i) => (
              <FaStar key={i + Math.floor(averageRating)} className="text-gray-300" />
            ))}
          </span>
        </div>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-100 py-3 px-6 shadow-md">
          Have a look at {totalReviews} Student Reviews
        </h1>
      </div>

      <div className='flex flex-col md:flex-row p-6 gap-6'>
        <div className='md:w-1/2 bg-white rounded-lg shadow-md p-6'>
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          {formData.length > 0 ? (
            formData.map((review) => (
              <div key={review.id} className="mb-4 border-b border-black pb-4 break-words">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400 text-lg flex flex-row">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <FaStar key={i} />
                    ))}
                    {Array.from({ length: 5 - review.rating }, (_, i) => (
                      <FaStar key={i + review.rating} className="text-gray-300" />
                    ))}
                  </span>
                </div>
                <p className="text-lg text-gray-700 mb-2 break-words">{review.review}</p>
                <p className="text-sm text-gray-500">
                  Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>

        
        <div className='md:w-1/2 bg-white rounded-lg shadow-md p-6 flex flex-col items-center'>
          
        </div>
      </div>
    </div>
  );
}

export default AthleticsReview;
