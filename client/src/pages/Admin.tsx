import {useState,useEffect} from 'react'
import { useNavigate,Link,useParams } from 'react-router-dom'
import axios from 'axios'

interface Form {
  username: string,
  isAdmin: boolean,
}
const Admin = () => {
  const [formData, setFormData] = useState<Form | null>(null);
  useEffect(() => {
    axios.get(`http://localhost:8080/auth/getUsers`)
         .then(result => {
          const data = result.data;
          setFormData({
            username: data.username,
            isAdmin: data.isAdmin
          });
         })
         .catch(error => console.log(error));
  },[])
  return (
    <div className="min-h-screen flex flex-col">

    </div>
  )
}

export default Admin