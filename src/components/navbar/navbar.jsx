import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../../store/logoutSlice";

function Navbar() {
  //Functioning for Logout(Starting)
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['jwtInCookie']);

  const handleLogout = async () => {
    await dispatch(logout(cookies.jwtInCookie));
    removeCookie('jwtInCookie', { path: '/' });
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (cookies.jwtInCookie) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [cookies]);

  //Functioning for Logout(Ended)

  return (
    <nav className="navbar">
      <div className="container-1">
        <h1 className="container-1-h1">Blog</h1>
      </div>
      <div className="container-2">
        <form className="container-2-span" method="POST">
          <input
            type="text"
            className="container-2-search-box"
            id="container-2-search-box"
            placeholder="Search"
          />
          <button
            type="submit"
            className="container-2-search-button material-symbols-outlined"
          >
            search
          </button>
        </form>
      </div>
      <div className="container-button">
        <input type="checkbox" className="check-box" name="check" id="check" />
        <button className="menu-button material-symbols-outlined">menu</button>
        <button className="close-button material-symbols-outlined">close</button>
        <div className="container-3">
          <Link className="link" to={`/`}>
            Home
          </Link>
          <Link className="link" to={`/contact-us`}>
            Contact us
          </Link>
          {!isAuthenticated && (
            <Link className="link" to={`/login`}>
              Login
            </Link>
          )}
          {isAuthenticated && (
            <>
              <Link className="link" to={`/profile`}>
                Profile
              </Link>
              <Link className="link" onClick={handleLogout}>
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
