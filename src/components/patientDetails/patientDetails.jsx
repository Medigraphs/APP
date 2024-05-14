import React, { useState } from "react";
import './patientDetails.css';
import { Link } from "react-router-dom";

export const PatientDetails = ({ patient }) => {

    return (
        <div className="profile-container">
            <div className="personal-details-container">
            <div className="name-container">
                    <p className="profile-head2">ID: </p>
                    <p>{patient.id}</p>
                </div>
                <div className="name-container">
                    <p className="profile-head2">Name: </p>
                    <p>{patient.name}</p>
                </div>
                <div className="name-container">
                    <p className="profile-head2">Address: </p>
                    <p>{patient.address}</p>
                </div>
                <div className="name-container">
                    <p className="profile-head2">Date: </p>
                    <p>{patient.date}</p>
                </div>
                <div className="name-container">    
                    <p className="profile-head2">Time: </p>
                    <p>{patient.time}</p>
                </div>
                <div className="name-container">
                    <p className="profile-head2">Doctor's Name: </p>
                    <p>{patient.dcotorName}</p>
                </div>
                <div className="gmail-container">
                    <p className="profile-head2">Email: </p>
                    <p>{patient.email}</p>
                </div>
            </div>
        </div>
    )
}