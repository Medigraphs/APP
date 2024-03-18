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

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Navbar />
            <Routes>
              <Route exact path='/' element={<Main />} />
              <Route path='/blogDetail/:_id' element={<BlogDetail />} />
              <Route path='contact-us' element={<ContactUs/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/profile' element={<Profile />} />
            </Routes>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;