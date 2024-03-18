import React, { useState } from "react";
import './profile.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profile } from "../../store/profileSlice";
import { useCookies } from "react-cookie";
import Loader from "../loading/loader";
import { Link } from "react-router-dom";

export const Profile = () => {

    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['jwtInCookie']);
    const token = cookies.jwtInCookie;
    const state = useSelector((state) => state.profile);
    const [getUser, setUser] = useState(state);
    const [isAdmin, setAdmin] = useState(false);

    const fetchData = async () => {
        await dispatch(profile(token));
    }

    useEffect(() => {
        if(!getUser.data){
            fetchData();
        }
    }, []);
    
    useEffect(()=>{
        setUser(state);
        if(state.data?.user.role === 'admin'){
            setAdmin(true);
        }
    },[state]);

    if (state.isLoading) {
        return <Loader />
    }

    return (
        <div className="profile-supreme-container">
                <div className="profile-container">
                    <div className="profile-image-container">
                        <img className="profile-image" src={state.data?.user.avatar} alt="" />
                    </div>
                    <div className="personal-details-container">
                        <div className="name-container">
                            <p className="profile-head2">Name: </p>
                            <p>{state.data?.user.username}</p>
                        </div>
                        <div className="gmail-container">
                            <p className="profile-head2">Email: </p>
                            <p>{state.data?.user.email}</p>
                        </div>
                        {isAdmin && <div className="admin-panel-container">
                            <Link className="admin-panel-link">[ Admin Panel ]</Link>
                        </div>}
                    </div>
                </div>
        </div>
    )
}
