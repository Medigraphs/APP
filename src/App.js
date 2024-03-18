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
import {ContactUs} from './components/contactUs/contactUs';
import {Register} from './components/register/register';
import { ConfirmRegistration } from './components/confirmRegistration/confirmRegistration';
import {ForgetPassword} from './components/forgetPassword/forgetPassword';
import { ResetPassword } from './components/resetPassword/resetPassword';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Navbar />
            <Routes>
              <Route exact path='/' element={<Main />} />
              <Route path='/blogDetail/:_id' element={<BlogDetail />} />
              <Route path='/contact-us' element={<ContactUs/>}/>
              <Route path='/profile' element={<Profile />} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/confirmRegistration' element={<ConfirmRegistration/>}/>
              <Route path='/forgetPassword' element={<ForgetPassword/>}/>
              <Route path='/reset/password' element={< ResetPassword/>} />
            </Routes>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;