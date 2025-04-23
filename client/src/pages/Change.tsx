import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate,useSearchParams } from 'react-router-dom'
import axios from 'axios'
const Change = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL
    const [forgotCode, setForgotCode] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const navigate = useNavigate();
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForgotCode(e.target.value);
    };
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const emailParam = searchParams.get("email");
        const newPasswordParam = searchParams.get("newPassword");
    
        if (emailParam) {
            setEmail(emailParam);
        }
    
        if (newPasswordParam) {
            setNewPassword(newPasswordParam);
        }
    }, [searchParams]);

    const handleVerify = async (e:any) => {
        e.preventDefault();
        console.log(email);
        console.log(newPassword);
        try {
            const response = await axios.post(`${serverURL}/auth/resetPassword`, {
                email,
                forgotCode,
                newPassword
            });
            console.log("Verification Sucessful" + response.data);
            alert("Verification Successful");
            navigate("/login");
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.error) {
                console.log("Verification failed", error.response.data.error);
                alert(error.response.data.error);
              } else {
                console.log("Verification failed", error.message);
                alert("Verification failed: " + error.message);
              }
            setForgotCode("");
        }
    }

    const resendCode = async (e:any) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${serverURL}/auth/resendForgot?email=${encodeURIComponent(email)}`, null);
          console.log("Resend Sucessful" + response.data);
          alert("Resend Successful Check Email");
        } catch (error: any) {
          if (error.response && error.response.data && error.response.data.error) {
            console.log("Resend failed", error.response.data.error);
            alert(error.response.data.error);
          } else {
            console.log("Resend failed", error.message);
            alert("Resend failed: " + error.message);
          }
        }
    }
  return (
    <div
    className="min-h-screen py-40 flex items-center justify-center"
    style={{
      backgroundImage: "linear-gradient(115deg, #0000FF, #FEE2FE)",
    }}
    >
      <div className="h-96 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="relative">
          <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
          <div id="form-container" className="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out">
            <h2 id="form-title" className="text-center text-3xl font-bold mb-10 text-gray-800">Verify Account</h2>
            <form className="space-y-5" onSubmit={(e) => handleVerify(e)}>
              <input className="w-full h-12 border border-gray-800 px-3 rounded-lg" placeholder="Passcode" id="" name="" type="text" value={forgotCode} onChange={onInputChange}/>
              <button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Verify</button>
              <button className="text-blue-500 hover:text-blue-800 text-sm" onClick={(e) => resendCode(e)}>Resend Passcode?</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Change