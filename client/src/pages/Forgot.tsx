import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Forgot = () => {
  const navigate = useNavigate();
  
  
  const handleForgot = async (e: any) => {
    e.preventDefault();
    try {
      
    } catch (error: any) {
      
    }
  }
  return (
    <div
      className="min-h-screen py-40"
      style={{
        backgroundImage: 'linear-gradient(115deg, #008000, #FEE2FE)',
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('public/forest.jpg')",
            }}
          >
            <h1 className="text-white text-3xl mb-3">Reset Your Password</h1>
            <div>
              <p className="text-white">
              Take the first step to regain access to your account. Secure and simple password recovery.
  
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Forgot</h2>
            <p className="mb-4">Forgot password. No worries you can reset it here</p>
            <form onSubmit={handleForgot}>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="border border-gray-400 py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <button type="submit" className="w-full bg-green-500 py-3 text-center text-white">
                  Change Password
                </button>
              </div>
            </form>

            <div className="mt-8 flex justify-between">
              <Link
                to = "/login"
                className="text-green-500 font-semibold hover:text-green-700"
              >
                Login
              </Link>
              <Link
                to ="/signup"
                className="text-green-500 font-semibold hover:text-green-700"
              >
                Register
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgot