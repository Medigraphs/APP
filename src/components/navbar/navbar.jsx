import React, { useEffect, useState } from "react";
import './navbar.css';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar() {

    const [isCookieNull, setIsCookieNull] = useState(true);

  const handleLogout = () => {
    Cookies.remove("jwt");
    setIsCookieNull(true); // Update the state to reflect logout status
  };

  useEffect(() => {
    if (Cookies.get("jwt")) {
      setIsCookieNull(false);
    }
  }, [isCookieNull]);

    return <nav className="navbar">
        <div className="container-1">
            <h1 className="container-1-h1">Blog</h1>
        </div>
        <div className="container-2">
            <form className="container-2-span" method="POST">
                <input type="text" className="container-2-search-box" id="container-2-search-box" placeholder="Search" />
                <button type="submit" className="container-2-search-button material-symbols-outlined">search</button>
            </form>
        </div>
        <div className="container-button">
            <input type="checkbox" className="check-box" name="check" id="check" />
            <button className="menu-button material-symbols-outlined">menu</button>
            <button className="close-button material-symbols-outlined">close</button>
        <div className="container-3">
            <Link className="link" to={`/`}>Home</Link>
            <Link className="link" to={`/contact-us`}>Contact us</Link>
            <Link className="link" to={`/login`} style={{'display': isCookieNull ? 'block' : 'none'}}>Login</Link>
            <Link className="link" to={`/profile`} style={{'display': isCookieNull ? 'none' : 'block'}}>Profile</Link>
            <Link className="link" to={`/logout`} onClick={handleLogout} style={{'display': isCookieNull ? 'none' : 'block'}}>Logout</Link>
        </div>
        </div>
    </nav>
}

export default Navbar;