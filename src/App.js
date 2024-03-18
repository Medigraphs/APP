import './App.css';
import Footer from './components/footer/footer';
import Main from './components/main/blog';
import Navbar from './components/navbar/navbar';
import SideMenu from './components/menu/sideMenu/sideMenu';
import { Provider } from 'react-redux';
import store from './store/store';
import { Routes, Route } from "react-router-dom";
import blogDetail from "./components/blogDetail/blogDetail";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <div className='container'>
          <div className="menu-navbar">menu</div>
          <SideMenu />
          <Main pro />
          <Footer />
        </div>
      </div>
      <Routes>
        <Route path='/blogDetail/:id' Component={blogDetail} />
      </Routes>
    </Provider>
  );
}

export default App;
