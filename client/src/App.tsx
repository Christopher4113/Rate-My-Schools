import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgot from './pages/Forgot';
function App() {


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path ="/login" element={<Login />} />
          <Route path ="/signup" element={<Signup />} />
          <Route path ="/forgot" element={<Forgot />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
