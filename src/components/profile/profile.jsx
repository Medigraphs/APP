import React from "react";
import './profile.css';
import SideMenu from "../sideMenu/sideMenu";
import {Outlet} from "react-router-dom"

export const Profile = ( {setPatient} ) => {
    return (
        <div className="profile-supreme-container">
            <SideMenu setPatient={setPatient} />
            <Outlet/>
        </div>
    )
}