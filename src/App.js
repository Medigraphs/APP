import './App.css';
import Footer from './components/footer/footer';
import Main from './components/main/blog';
import Navbar from './components/navbar/navbar';
import SideMenu from './components/menu/sideMenu/sideMenu';
import { useEffect } from 'react';

function App() {

  const fetchApi = async () => {
    await fetch("https://blog-zo8s.vercel.app/").then((res) => {
      res.json().then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchApi()
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className='container'>
        <div className="menu-navbar">menu</div>
        <SideMenu />
        <Main pro />
        <Footer />
      </div>
    </div>
  );
}

export default App;
