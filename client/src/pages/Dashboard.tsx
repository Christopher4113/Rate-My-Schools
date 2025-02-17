import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { SearchBar } from '@/components/custom/SearchBar';
const Dashboard = () => {
  const [school,setSchool] = useState("")
  const navigate = useNavigate()

  
  return (
    <div className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `url('/dashboard.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    >
      <SearchBar />
    </div>
  );
};

export default Dashboard;