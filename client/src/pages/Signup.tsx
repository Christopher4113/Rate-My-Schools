import {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'



const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      
    } catch (error: any) {
      
    }
  }
  return (
    <div
      className="min-h-screen py-40"
      style={{
        backgroundImage: 'linear-gradient(115deg, #0000FF, #FEE2FE)',
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('public/sunset.jpg')",
            }}
          >
            <h1 className="text-white text-3xl mb-3">Welcome</h1>
            <div>
              <p className="text-white">
                Create your acount
  
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4">Create your account. It is free and only takes a minute.</p>
            <form onSubmit={handleSignup}>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Username"
                  className="border border-gray-400 py-1 px-2 w-full"
                />
              </div>
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
                  placeholder="Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <button type="submit" className="w-full bg-blue-500 py-3 text-center text-white">
                  Register Now
                </button>
              </div>
            </form>

            <div className="mt-8 flex justify-between">
              <Link
                to = "/login"
                className="text-blue-500 font-semibold hover:text-blue-700"
              >
                Login
              </Link>
              <Link
                to ="/forgot"
                className="text-blue-500 font-semibold hover:text-blue-700"
              >
                Forgot Password?
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup