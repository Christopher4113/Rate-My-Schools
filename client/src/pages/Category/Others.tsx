import {useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
import { error } from 'console';

interface Form {
  id: number,
  category: string,
  description: string,
}


const Others = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL
  const {id} = useParams();
  console.log(id)
  const [formData, setFormData] = useState<Form[]>([])
  useEffect(() => {
    axios.get<Form[]>(`${serverURL}/auth/getOthers/${id}`)
         .then((response) => {
          console.log(response.data)
          setFormData(response.data)
         })
         .catch((error:any) => console.error("Error fetching other categories: ", error))
  },[])
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
        className="absolute bottom-4 left-4 font-bold text-3xl px-3 py-1 rounded"
        style={{
          fontFamily: "Times New Roman",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "#FFD700",
        }}
      >
        Other
      </h1>
    </div>
    <div>
      <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-100 py-3 px-6 shadow-md">
        Browse Which Category You Want To Review
      </h1>
    </div>
    <div className='flex flex-col md:flex-row p-6 gap-6'>
      <div className='md:w-1/2 bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Categories</h2>
        {formData.map((category) => (
          <div key={category.id} className="flex items-center mb-4">
            <Link
              to={`/othersreview/${category.id}`} // Use the category id in the URL
              className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white w-32"
            >
              {category.category} {/* Display the category name on the button */}
            </Link>
          </div>
        ))}
      </div>

      <div className="md:w-1/2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">About Others Category</h2>
        {formData.map((category) => (
          <div key={category.id} className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{category.category}</h3>
            <p className="text-gray-600 leading-relaxed">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Others