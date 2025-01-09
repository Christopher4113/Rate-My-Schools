import  {useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (e:any) => {
    e.preventDefault();
    try {
      
    } catch (error: any) {
      
    }
  }


  return (
    <div
      className="min-h-screen py-40"
      style={{
        backgroundImage: 'linear-gradient(115deg, #9F7AEA, #FEE2FE)',
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('public/Register-Background.png')",
            }}
          >
            <h1 className="text-white text-3xl mb-3">Welcome Back!</h1>
            <div>
              <p className="text-white">Please log in to continue to your account.</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Login</h2>
            <p className="mb-4">Login using your email and password</p>
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="w-full bg-purple-500 py-3 text-center text-white">
                  Login
                </button>
              </div>
            </form>
            {/* New Buttons Section */}
            <div className="mt-8 flex justify-between">
              <Link
                to = "/signup"
                className="text-purple-500 font-semibold hover:text-purple-700"
              >
                Register
              </Link>
              <Link
                to ="/forgot"
                className="text-purple-500 font-semibold hover:text-purple-700"
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

export default Login;
