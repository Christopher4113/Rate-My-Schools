import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Forgot = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL
  const [user,setUser] = useState({
    email: "",
    newPassword: ""
  })
  const [confirm, setConfirm] = useState("")
  const navigate = useNavigate();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  const onConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
  };
  const {email, newPassword } = user;
  
  const handleForgot = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      alert("Passwords do not match please try again");
      return
    }
    try {
      const response = await axios.post(`${serverURL}/auth/forgotPassword`, { email })
      console.log("Forgot was a success" + response.data)
      alert("Check your email to change your password")
      navigate(`/change?email=${encodeURIComponent(email)}&newPassword=${encodeURIComponent(newPassword)}`);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log("Forgot failed", error.response.data.error);
        alert(error.response.data.error);
      } else {
        console.log("Forgot failed", error.message);
        alert("Forgot failed: " + error.message);
      }
      setUser({ ...user, email: "", newPassword: "" });
      setConfirm("")
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
                  name='email'
                  className="border border-gray-400 py-1 px-2 w-full"
                  value={email}
                  onChange={onInputChange}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  name='newPassword'
                  placeholder="Enter New Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                  value={newPassword}
                  onChange={onInputChange}
                  
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  name='newPassword'
                  placeholder="Confirm New Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                  value={confirm}
                  onChange={onConfirmChange}
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