import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { FaStar } from 'react-icons/fa';


interface Form {
  id: number,
  rating: number,
  review: string,
  createdAt: string,
}



const AthleticsReview = () => {
  const {id} = useParams();
  console.log(id)
  const [formData,setFormData] = useState<Form[]>([])

  useEffect(() => {
    axios.get<Form[]>(`http://localhost:8080/auth/getAthleticsReview/${id}`)
        .then((response) => {
          console.log(response.data)
          setFormData(response.data)
        })
        .catch((error:any) => console.error("Error fetching reviews ", error))
  },[])
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
          className="absolute bottom-4 left-4 font-bold text-3xl px-3 py-1 rounded"
          style={{
            fontFamily: "Times New Roman",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#FFD700",
          }}
        >
          Reviews
        </h1>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-100 py-3 px-6 shadow-md">
          Write a Review for the Athletic Section
        </h1>
      </div>
      <div className='flex flex-col md:flex-row p-6 gap-6'>
        <div className='md:w-1/2 bg-white rounded-lg shadow-md p-6'>
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {formData.length > 0 ? (
              formData.map((review) => (
                <div key={review.id} className="mb-4 border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-lg flex flex-row">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <FaStar key={i} />
                      ))}
                    </span>
                  </div>
                  <p className="text-lg text-gray-700 mb-2">{review.review}</p>
                  <p className="text-sm text-gray-500">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
        </div>
        <div className='md:w-1/2 bg-white rounded-lg shadow-md p-6'>
          
        </div>
      </div>
    </div>
  )
}

export default AthleticsReview