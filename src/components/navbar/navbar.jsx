import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../../store/logoutSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { filterBlogs } from "../../store/filterBlogsSlice";
import { fetchBlogs } from "../../store/blogsSlice";
import { debounce } from "lodash";

function Navbar() {


  //Functioning for Logout(Starting)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['jwtInCookie']);

  const handleLogout = async () => {
    await dispatch(logout(cookies.jwtInCookie));
    removeCookie('jwtInCookie', { path: '/' });
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    if (cookies.jwtInCookie) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [cookies]);

  //Functioning for Logout(Ended)

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  }

  const handleClickLink = () => {
    setMenuOpen(false);
  }

  //styling navbar link animation(starting)

  const [isAtHome, setAtHome] = useState(false);
  const [isAtContactUs, setAtContactUs] = useState(false);
  const [isAtProfile, setAtProfile] = useState(false);
  const [isAtLogin, setAtLogin] = useState(false);

  useEffect(() => {
    console.log(location);
    if (location.pathname === '/') {
      setAtHome(true);
    } else {
      setAtHome(false);
    }

    if (location.pathname === '/contact-us') {
      setAtContactUs(true);
    } else {
      setAtContactUs(false);
    }

    if (location.pathname === '/profile') {
      setAtProfile(true);
    } else {
      setAtProfile(false);
    }

    if (location.pathname === '/login' || location.pathname === '/register') {
      setAtLogin(true);
    } else {
      setAtLogin(false);
    }

  }, [location]);
  //styling navbar link animation(Ended)

  //search bar functionality(Started)

  const handleSearchBlogs = debounce(async (title) => {
    if(title === null){
      await dispatch(fetchBlogs());
      window.scrollTo(0, 0);
      return;
    }
    await dispatch(filterBlogs(title));
    window.scrollTo(0, 0);
  }, 1000);

  //search bar functionality(Ended)

  return (
    <nav className={`navbar`}>
      <div className="container-1">
        <h1 className="container-1-h1">Blog</h1>
      </div>
      <div className="container-2">
        <form className="container-2-span" method="GET">
          <input
            type="search"
            className="container-2-search-box"
            id="container-2-search-box"
            placeholder="Search"
            onChange={(e) => {
              handleSearchBlogs(e.target.value || null);
            }}
          />
        </form>
      </div>
      <div className="container-button">
        <input type="checkbox" className="check-box" name="check" id="check" checked={isMenuOpen} onChange={handleMenuToggle} />
        <button className="menu-button material-symbols-outlined">menu</button>
        <button className="close-button material-symbols-outlined">close</button>
        <div className="container-3" >
          <div className="container-3-navbar">
            <Link className={isAtHome ? "pre-active-link" : "link"} to={`/`} onClick={handleClickLink}>
              Home
            </Link>
            <Link className={isAtContactUs ? "pre-active-link" : "link"} to={`/contact-us`} onClick={handleClickLink}>
              Contact us
            </Link>
            {!isAuthenticated && (
              <Link className={isAtLogin ? "pre-active-link" : "link"} to={`/login`} onClick={handleClickLink}>
                Login
              </Link>
            )}
            {isAuthenticated && (
              <>
                <Link className={isAtProfile ? "pre-active-link" : "link"} to={`/profile`} onClick={handleClickLink}>
                  Profile
                </Link>

                <Link className="link" onClick={handleLogout}>
                  <span onClick={handleClickLink}>Logout</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
