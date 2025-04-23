import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'

interface Form {
  id: number,
  rating: number,
  review: string,
  createdAt: string,
}

const OthersReview = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL
  const { id } = useParams();
  const [formData, setFormData] = useState<Form[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState(""); 
  
  useEffect(() => {
    axios.get<Form[]>(`${serverURL}/auth/getOthersReview/${id}`)
      .then((response) => {
        // Sort the data by createdAt date (newest first)
        const sortedData = [...response.data].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setFormData(sortedData);
      })
      .catch((error) => console.error("Error fetching reviews", error));
  }, [id]);

  useEffect(() => {
    axios.get(`${serverURL}/auth/getOthersAverageRating/${id}`)
      .then(response => {
        const data = response.data;
        setAverageRating(data.averageRating);
      })
      .catch(error => console.log(error));
  }, [id]);

  useEffect(() => {
    axios.get(`${serverURL}/auth/getOthersTotalReviews/${id}`)
      .then(response => {
        const data = response.data;
        setTotalReviews(data.totalReviews);
      })
      .catch(error => console.error(error));
  }, [id]);
  
  useEffect(() => {
    axios.get(`${serverURL}/auth/getOthersCategory/${id}`)
         .then(response => {
          const data = response.data;
          setCategory(data.category)
         })
         .catch(error => console.log(error))
  },[id])

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault()
    
  
    try {
      await axios.post(`${serverURL}/auth/postOthersReview`, {
        other: { id: Number(id) },
        rating,
        review: reviewText,

      });
  
      alert("Review submitted successfully!");
      setRating(0);
      setReviewText("");
      
      // Refresh all data after submission
      const reviewResponse = await axios.get<Form[]>(`${serverURL}/auth/getOthersReview/${id}`);
      const sortedData = [...reviewResponse.data].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setFormData(sortedData);
      
      // Refresh average rating and total reviews
      const avgResponse = await axios.get(`${serverURL}/auth/getOthersAverageRating/${id}`);
      setAverageRating(avgResponse.data.averageRating);
      
      const totalResponse = await axios.get(`${serverURL}/auth/getOthersTotalReviews/${id}`);
      setTotalReviews(totalResponse.data.totalReviews);
      
    } catch (error: any) {
      console.error("Error submitting review:", error);
    }
  }


  return (
    <div className='min-h-screen flex flex-col'>
      <div
        className="w-full relative text-cyan-50"
        style={{
          backgroundImage: `url('/other.webp')`,
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

        
        <div className='md:w-1/2 bg-white rounded-lg shadow-md p-6 flex flex-col items-center'>
        <div className="container px-4 mx-auto">
              <div className="mx-auto">
                <div className="max-w-md mx-auto px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Write a review</h2>
                  <form onSubmit={handleSubmit}>
                    {/* Star Rating */}
                    <div className="mb-4">
                      <label className="block text-gray-800 mb-1">Select Rating</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <FaStar
                            key={num}
                            className={`cursor-pointer text-3xl transition ${
                              num <= rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                            onClick={() => setRating(num === rating ? 0 : num)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Textarea */}
                    <div className="mb-4">
                      <label className="block text-gray-800 mb-1" htmlFor="message">
                        Enter Your Review
                      </label>
                      <textarea
                        className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                        rows={4}
                        placeholder="Enter your review"
                        name="message"
                        id="message"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      ></textarea>
                    </div>  
                    <button
                      className="w-full bg-blue-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-300"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default OthersReview