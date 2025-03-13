import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgot from './pages/Forgot';
import Dashboard from './pages/Dashboard';
import Verify from './pages/Verify';
import PrivateRoute from './PrivateRoute';
import Change from './pages/Change';
import Header from './components/custom/Header';
import Footer from './components/custom/Footer';
import Tos from './pages/Tos';
import About from './pages/About';
import Allschools from './pages/Allschools';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Header />
              <Dashboard />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/tos"
          element={
            <PrivateRoute>
              <Header />
              <Tos/>
            </PrivateRoute>
          }
        />
        <Route
          path="/schools"
          element={
            <PrivateRoute>
              <Header />
              <Allschools />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <Header />
              <About />
            </PrivateRoute>
          }
        />
        <Route path="/verify" element={<Verify />} />
        <Route path="/change" element={<Change />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
