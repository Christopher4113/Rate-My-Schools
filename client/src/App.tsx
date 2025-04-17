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
import Admin from './pages/Admin/Admin';
import AdminRoute from './AdminRoute';
import AdminSchool from './pages/Admin/AdminSchool';
import Select from './pages/Admin/Select';
import AA from './pages/Admin/AA';
import AC from './pages/Admin/AC';
import AH from './pages/Admin/AH';
import AJ from './pages/Admin/AJ';
import AL from './pages/Admin/AL';
import AM from './pages/Admin/AM';
import AO from './pages/Admin/AO';
import AAR from './pages/Admin/AAR';
import ACR from './pages/Admin/ACR';
import AHR from './pages/Admin/AHR';
import AJR from './pages/Admin/AJR';
import ALR from './pages/Admin/ALR';
import AMR from './pages/Admin/AMR';
import AOR from './pages/Admin/AOR';


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
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <Admin/>
              </AdminRoute> 
            </PrivateRoute>
          }
        />
        <Route
          path='/adminschool'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header/>
                <AdminSchool />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/select/:id"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <Select />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AA/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AA />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AC/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AC />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AH/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AH />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AJ/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AJ />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AL/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AL />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AM/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AM />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AO/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AO />
              </AdminRoute>
            </PrivateRoute>
          }
        />

        <Route
          path='/AAR/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AAR />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/ACR/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <ACR />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AHR/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AHR />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AJR/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AJR />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/ALR/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <ALR />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AMR/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AMR />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/AOR/:id'
          element={
            <PrivateRoute>
              <AdminRoute>
                <Header />
                <AOR />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
