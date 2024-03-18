import './App.css';
import Footer from './components/footer/footer';
import Main from './components/main/blog';
import Navbar from './components/navbar/navbar';
import SideMenu from './components/menu/sideMenu/sideMenu';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='container'>
      <div className="menu-navbar">menu</div>
      <SideMenu />
      <Main />
      <Footer/>
      </div>
    </div>
  );
}

export default App;
