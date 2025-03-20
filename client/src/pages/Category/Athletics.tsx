import {useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'

interface Form {
  id: number,
  category: string,
  school: number
}

const Athletics = () => {
  const {prevId} = useParams();
  const [formData,setFormData] = useState<Form[]>([])

  useEffect(() => {
    axios.get<Form[]>(`http://localhost:8080/auth/getAthletics/${prevId}`)
         .then((response) => {
          console.log(response.data)
          setFormData(response.data)
         })
         .catch((error:any) => console.error("Error fetching schools: ", error))
  }, [])

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
          Athletics
        </h1>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-100 py-3 px-6 shadow-md">
          Browse Which Category You Want To Review
        </h1>
      </div>
    </div>
  )
}

export default Athletics