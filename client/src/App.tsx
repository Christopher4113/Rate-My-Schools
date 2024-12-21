import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing';
import Login from './pages/Login';
function App() {


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path ="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
