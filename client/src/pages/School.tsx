import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Form {
  description: string;
  location: string;
}

const School = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Form | null>(null);  // State should be an object or null initially

  useEffect(() => {
    axios.get(`http://localhost:8080/auth/getSchool/${id}`)
      .then(result => {
        const data = result.data;
        setFormData({
          description: data.description,
          location: data.location
        });
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleChoice = async () => {
    // Add logic for handleChoice if necessary
  }

  return (
    <div>
      {formData ? (
        <div>
          <h1>School Information</h1>
          <p><strong>Description:</strong> {formData.description}</p>
          <p><strong>Location:</strong> {formData.location}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default School;
