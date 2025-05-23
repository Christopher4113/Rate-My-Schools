import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const serverURL = import.meta.env.VITE_SERVER_URL

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");

  const { username, email, password } = user;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match. Please check and try again.");
      return;
    }
    try {
      const response = await axios.post(`${serverURL}/auth/signup`, user);
      console.log("Signup success", response.data);
      alert("Check your email or spam folder to verify your account.");
      navigate(`/verify?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log("Signup failed", error.response.data.error);
        alert(error.response.data.error);
      } else {
        console.log("Signup failed", error.message);
        alert("Signup failed: " + error.message);
      }
      setUser({
        username: "",
        email: "",
        password: ""
      });
      setConfirm("")
    }
  };




  return (
    <div
      className="min-h-screen py-40"
      style={{
        backgroundImage: "linear-gradient(115deg, #0000FF, #FEE2FE)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('/sunset.jpg')",
            }}
          >
            <h1 className="text-white text-3xl mb-3">Join Us Today</h1>
            <div>
              <p className="text-white">
                Create your account to unlock access to the rating systems!
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4">
              Create your account. It is free and only takes a minute.
            </p>
            <form onSubmit={(e) => handleSignup(e)}>
              <div className="mt-5">
                <input
                  type="text"
                  name="username" // Add name attribute
                  placeholder="Username"
                  className="border border-gray-400 py-1 px-2 w-full"
                  value={username}
                  onChange={onInputChange}
                />
              </div>
              <div className="mt-5">
                <input
                  type="email"
                  name="email" // Add name attribute
                  placeholder="Email"
                  className="border border-gray-400 py-1 px-2 w-full"
                  value={email}
                  onChange={onInputChange}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  name="password" // Add name attribute
                  placeholder="Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                  value={confirm}
                  onChange={onConfirmChange}
                />
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full bg-blue-500 py-3 text-center text-white"
                >
                  Register Now
                </button>
              </div>
            </form>

            <div className="mt-8 flex justify-between">
              <Link
                to="/login"
                className="text-blue-500 font-semibold hover:text-blue-700"
              >
                Login
              </Link>
              <Link
                to="/forgot"
                className="text-blue-500 font-semibold hover:text-blue-700"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
