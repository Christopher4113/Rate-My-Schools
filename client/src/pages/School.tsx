import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

interface Form {
    id:number;
    description: string;
    location: string;
}


const School = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [formData,setFormData] = useState<Form[]>([]);
  return (
    <div>
        
    </div>
  )
}

export default School