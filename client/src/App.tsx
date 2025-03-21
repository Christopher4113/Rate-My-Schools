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
import School from './pages/School';
import Athletics from './pages/Category/Athletics';
import Clubs from './pages/Category/Clubs';
import Housing from './pages/Category/Housing';
import Jobs from './pages/Category/Jobs';
import LifeStyles from './pages/Category/LifeStyles';
import Majors from './pages/Category/Majors';
import Others from './pages/Category/Others';
import AthleticsReview from './pages/Review/AthleticsReview';
import ClubsReview from './pages/Review/ClubsReview';
import HousingReview from './pages/Review/HousingReview';
import JobsReview from './pages/Review/JobsReview';
import LifeStylesReview from './pages/Review/LifeStylesReview';
import MajorsReview from './pages/Review/MajorsReview';
import OthersReview from './pages/Review/OthersReview';


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
          path="/allschools"
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
        <Route
          path="/school/:id"
          element={
            <PrivateRoute>
              <Header />
              <School />
            </PrivateRoute>
          }
        />
        <Route
          path="/athletics/:id"
          element={
            <PrivateRoute>
              <Header />
              <Athletics />
            </PrivateRoute>
          }
        />
        <Route
          path="/clubs/:id"
          element={
            <PrivateRoute>
              <Header />
              <Clubs />
            </PrivateRoute>
          }
        />
        <Route
          path="/housing/:id"
          element={
            <PrivateRoute>
              <Header />
              <Housing />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <PrivateRoute>
              <Header />
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/lifestyles/:id"
          element={
            <PrivateRoute>
              <Header />
              <LifeStyles />
            </PrivateRoute>
          }
        />
        <Route
          path="/majors/:id"
          element={
            <PrivateRoute>
              <Header />
              <Majors />
            </PrivateRoute>
          }
        />
        <Route
          path="/others/:id"
          element={
            <PrivateRoute>
              <Header />
              <Others />
            </PrivateRoute>
          }
        />
        <Route
          path="/athleticsreview/:id"
          element={
            <PrivateRoute>
              <Header />
              <AthleticsReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/clubsreview/:id"
          element={
            <PrivateRoute>
              <Header />
              <ClubsReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/housingreview/:id"
          element={
            <PrivateRoute>
              <Header />
              <HousingReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobsreview/:id"
          element={
            <PrivateRoute>
              <Header />
              <JobsReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/lifestylesreview/:id"
          element={
            <PrivateRoute>
              <Header />
              <LifeStylesReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/majorsreview/:id"
          element={
            <PrivateRoute>
              <Header />
              <MajorsReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/othersreview/:id"
          element={
            <PrivateRoute>
              <Header />
              <OthersReview />
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
