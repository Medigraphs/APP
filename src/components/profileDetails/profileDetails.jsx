import React, { useState } from "react";
import './profileDetails.css';
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const ProfileDetails = () => {
    const [cookies] = useCookies(['jwtInCookie']);
    const [token, setToken] = useState({});
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
        setUser(userFromLocalStorage);
        console.log(user)
    }, []);

    useEffect(() => {
        if (cookies.jwtInCookie) {
            setToken(jwtDecode(cookies.jwtInCookie));
            console.log(token)
            if (token?.email?.substring(0, 5) === 'admin') {
                setAdmin(true);
            }
        } else {
            navigate('/login');
        }
    }, [user]);

    return (
        <div className="profile-container">
            <div className="profile-image-container">
                <img className="profile-image" src={token?.user?.avatar} alt="" />
            </div>
            <div className="personal-details-container">
                <div className="name-container">
                    <p className="profile-head2">Name: </p>
                    <p>{user?.displayName}</p>
                </div>
                <div className="gmail-container">
                    <p className="profile-head2">Email: </p>
                    <p>{token?.email}</p>
                </div>
                {isAdmin && <div className="admin-panel-container">
                    <Link to='/profile/admin' className="admin-panel-link">[ Admin Panel ]</Link>
                </div>}
            </div>
        </div>
    )
}