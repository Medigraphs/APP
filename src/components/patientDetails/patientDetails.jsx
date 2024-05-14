import React, { useEffect, useState } from "react";
import './patientDetails.css';
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../store/patientsSlice";


export const PatientDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state.fetchPatients);
    const params = useParams();
    const [patient, setPatient] = useState({});

    useEffect(() => {
        // Dispatch the action to fetch patients
        dispatch(fetchPatients());
    }, [dispatch, params.patientId]); // Make sure to include dispatch in the dependency array

    // Update patients state when the fetchPatients state changes
    useEffect(() => {
        if (state.data) {
            console.log(state.data);
            // Update patients state with the new data
            setPatient(state.data.filter(el => el.id === params.patientId)[0]);
        }
    }, [state.data, params.patientId]); // Only update patients when state.data changes

    return (
        <div className="patientDetails-container">
            <div className="patient-details-sub-container">
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
                    <p>{patient.doctorName}</p>
                </div>
                <div className="gmail-container">
                    <p className="profile-head2">Email: </p>
                    <p>{patient.email}</p>
                </div>
                <button type="button" onClick={(e)=>{
                    e.preventDefault();
                    navigate(`/profile/${patient.id}/addrecording`)
                }}>Add recording</button>
                <button type="button">Show recordings</button>
            </div>
        </div>

    )
}