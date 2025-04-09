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
        <Route path="/login" element={
          <div>
            <Header />
            <Login />
          </div>
          }  
        />
        <Route path="/signup" element={
          <div>
            <Header />
            <Signup />
          </div>
          }  
        />
        <Route path="/forgot" element={
          <div>
            <Header />
            <Forgot />
          </div>
          }  
        />
        <Route
          path="/dashboard"
          element={
          <div>
              <Header />
              <Dashboard />
              <Footer />
          </div>
          }
        />
        <Route
          path="/tos"
          element={
            <div>
              <Header />
              <Tos/>
            </div>
          }
        />
        <Route
          path="/allschools"
          element={
            <div>
              <Header />
              <Allschools />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div>
              <Header />
              <About />
            </div>
          }
        />
        <Route
          path="/school/:id"
          element={
            <div>
              <Header />
              <School />
            </div>
          }
        />
        <Route
          path="/athletics/:id"
          element={
            <div>
              <Header />
              <Athletics />
            </div>
          }
        />
        <Route
          path="/clubs/:id"
          element={
            <div>
              <Header />
              <Clubs />
            </div>
          }
        />
        <Route
          path="/housing/:id"
          element={
            <div>
              <Header />
              <Housing />
            </div>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <div>
              <Header />
              <Jobs />
            </div>
          }
        />
        <Route
          path="/lifestyles/:id"
          element={
            <div>
              <Header />
              <LifeStyles />
            </div>
          }
        />
        <Route
          path="/majors/:id"
          element={
            <div>
              <Header />
              <Majors />
            </div>
          }
        />
        <Route
          path="/others/:id"
          element={
            <div>
              <Header />
              <Others />
            </div>
          }
        />
        <Route
          path="/athleticsreview/:id"
          element={
            <div>
              <Header />
              <AthleticsReview />
            </div>
          }
        />
        <Route
          path="/clubsreview/:id"
          element={
            <div>
              <Header />
              <ClubsReview />
            </div>
          }
        />
        <Route
          path="/housingreview/:id"
          element={
            <div>
              <Header />
              <HousingReview />
            </div>
          }
        />
        <Route
          path="/jobsreview/:id"
          element={
            <div>
              <Header />
              <JobsReview />
            </div>
          }
        />
        <Route
          path="/lifestylesreview/:id"
          element={
            <div>
              <Header />
              <LifeStylesReview />
            </div>
          }
        />
        <Route
          path="/majorsreview/:id"
          element={
            <div>
              <Header />
              <MajorsReview />
            </div>
          }
        />
        <Route
          path="/othersreview/:id"
          element={
            <div>
              <Header />
              <OthersReview />
            </div>
          }
        />
        
        <Route path="/verify" element={<Verify />} />
        <Route path="/change" element={<Change />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
