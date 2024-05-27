import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import "./showRecordings.css";
import { Graph } from "../LineChart/page";
import { db } from "../../store/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPatients } from "../../store/patientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import Loading from "../loading/loader";
export const ShowRecordings = ({ selectedPatient }) => {
    // const dispatch = useDispatch();
    const state = useSelector((state) => state.fetchPatients);
    const params = useParams();
    const [patient, setPatient] = useState({});
    const [showGraph, setShowGraph] = useState(false);
    const [recordingType, setRecordingType] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const recordFound = useRef(false);

    const [cookies] = useCookies(["jwtInCookie"]);
    const [token, setToken] = useState({});
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);

    useEffect(() => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
        setUser(userFromLocalStorage);
        console.log(user);
        if (selectedPatient) {
            setPatient(selectedPatient)
        }
    }, [selectedPatient]);

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

    // useEffect(() => {
    //     // Dispatch the action to fetch patients
    //     // if (!selectedPatient)
    //     //     dispatch(fetchPatients());
    // }, [dispatch, params.patientId]); // Make sure to include dispatch in the dependency array

    // Update patients state when the fetchPatients state changes
    useEffect(() => {
        if (state.data && !selectedPatient) {
            // Update patients state with the new data
            setPatient(state.data.filter((el) => el.id === params.patientId)[0]);
        }
    }, [state.data, params.patientId]); // Only update patients when state.data changes



    return (
        <>
            {
                patient ?
                    <div className="show-recording-root">
                        <div className="show-recording-container">
                            <h2>Patient Details</h2>
                            <p>
                                <b>Name</b>: {patient.name}
                            </p>
                            <p>
                                <b>ID</b>: {patient.id}
                            </p>
                            <p>
                                <b>Address</b>: {patient.address || "Peer Gaib, Moradabad"}
                            </p>
                            <div className="category-buttons-container">
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setRecordingType("ECG");
                                    setShowGraph(false);
                                }}>ECG</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setRecordingType("EEG");
                                    setShowGraph(false);
                                }}>EEG</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setRecordingType("EOG");
                                    setShowGraph(false);
                                }}>EOG</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setRecordingType("EMG");
                                    setShowGraph(false);
                                }}>EMG</button>
                            </div>
                            {
                                recordingType && (
                                    <div className="show-recording-container" style={{
                                        width: "100%"
                                    }}>
                                        <ul>
                                            {
                                                (patient.recordings ? patient.recordings?.map((el, index) => {
                                                    if (recordingType === el.type) {
                                                        return <li key={index}>
                                                            <button onClick={(e) => {
                                                                e.preventDefault();
                                                                setShowGraph(true);
                                                                setData(() => el.data);
                                                            }}>{el.date}</button>
                                                        </li>
                                                    }
                                                    return (
                                                        <div>
                                                            <h1>Data Not Found!!!</h1>
                                                        </div>)
                                                }) : <div>
                                                    <h1>Data Not Found!!!</h1>
                                                </div>)
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                            {
                                showGraph && data.length > 0 ? (
                                    <div className="show-recording-container" style={{
                                        width: "100%"
                                    }}>
                                        <Graph data={data} isLive={false} autoGenerateY={false} />
                                    </div>
                                ) :
                                    <>
                                    </>
                            }
                        </div>
                    </div>
                    : null
            }
        </>
    )
}