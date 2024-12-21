import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
import './App.css'
import Landing from './pages/landing'
function App() {


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
