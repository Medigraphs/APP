import React, { useEffect, useState } from "react";
import './patientDetails.css';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../store/patientsSlice";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

export const PatientDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state.fetchPatients);
    const params = useParams();
    const [patient, setPatient] = useState({});

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

    useEffect(() => {
        // Dispatch the action to fetch patients
        dispatch(fetchPatients());
    }, [dispatch]); // Make sure to include dispatch in the dependency array

    // Update patients state when the fetchPatients state changes
    useEffect(() => {
        if (state.data) {
            console.log(state.data);
            // Update patients state with the new data
            setPatient(state.data.filter(el => el.id === params.patientId)[0]);
        }
    }, [state.data, params.patientId]);

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
                <button type="button" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/profile/${patient.id}/showRecordings`)
                }}>Show recordings</button>
            </div>
        </div>

    )
}