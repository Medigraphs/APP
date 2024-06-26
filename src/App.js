import './App.css';
import Footer from './components/footer/footer';
import Main from './components/main/blog';
import Navbar from './components/navbar/navbar';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetail from "./components/blogDetail/blogDetail";
import { Login } from './components/login/login';
import { Profile } from './components/profile/profile';
import { ContactUs } from './components/contactUs/contactUs';
import { Register } from './components/register/register';
import { ConfirmRegistration } from './components/confirmRegistration/confirmRegistration';
import { ForgetPassword } from './components/forgetPassword/forgetPassword';
import { ResetPassword } from './components/resetPassword/resetPassword';
import { ProfileDetails } from './components/profileDetails/profileDetails';
import { AdminPanel } from './components/admin/adminPanel';
import { useState } from 'react';
import { PatientDetails } from './components/patientDetails/patientDetails';
import AddRecording from './components/addRecording/page';
import { ShowRecordings } from './components/showRecordings/showRecordings';

function App() {

  const [patientSelected, setPatient] = useState(undefined);
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route path='/blogDetail/:title' element={<BlogDetail />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/profile' element={<Profile setPatient={setPatient} />}>
              <Route index element={<ProfileDetails />} />
              <Route path='admin' element={<AdminPanel />} />
              <Route path=':patientId' element={<PatientDetails />} />
              <Route path=":patientId/addrecording" element={<AddRecording />} />
              <Route path=':patientId/showrecordings' element={<ShowRecordings />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/confirmRegistration' element={<ConfirmRegistration />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
            <Route path='/reset/password' element={< ResetPassword />} />
          </Routes>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;