import './App.css';
import Footer from './components/footer/footer';
import Main from './components/main/blog';
import Navbar from './components/navbar/navbar';
import SideMenu from './components/menu/sideMenu/sideMenu';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetail from "./components/blogDetail/blogDetail";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <div className='container'>
            <SideMenu />
            <Routes>
              <Route exact path='/' element={<Main />} />
              <Route path='/blogDetail/:_id' element={<BlogDetail />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </Provider>
    </Router>
  );
}

export default App;