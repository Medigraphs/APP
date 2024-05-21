import React, { useState, useEffect } from "react";
import './profile.css';
import SideMenu from "../sideMenu/sideMenu";
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

export const Profile = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    const [cookies] = useCookies(["jwtInCookie"]);
    const [token, setToken] = useState({});
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);

    useEffect(() => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
        setUser(userFromLocalStorage);
        console.log(user);
    }, []);

    useEffect(() => {
        if (cookies.jwtInCookie) {
            setToken(jwtDecode(cookies.jwtInCookie));
            console.log(token);
            if (token?.email?.substring(0, 5) === "admin") {
                setAdmin(true);
            }
        } else {
            navigate("/login");
        }
    }, [user]);

    return (
        <div className="profile-supreme-container">
            <SideMenu />
            {
                isAdmin &&
                <Outlet />
            }
        </div>
    )
}