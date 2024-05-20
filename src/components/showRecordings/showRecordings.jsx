import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import "./showRecordings.css";
import { Graph } from "../LineChart/page";
import { db } from "../../store/firebase";
import { useParams } from "react-router-dom";
import { fetchPatients } from "../../store/patientsSlice";
import { useDispatch, useSelector } from "react-redux";
export const ShowRecordings = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.fetchPatients);
    const params = useParams();
    const [patient, setPatient] = useState({});
    const [showGraph, setShowGraph] = useState(false);
    const [recordingType, setRecordingType] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        // Dispatch the action to fetch patients
        dispatch(fetchPatients());
    }, [dispatch, params.patientId]); // Make sure to include dispatch in the dependency array

    // Update patients state when the fetchPatients state changes
    useEffect(() => {
        if (state.data) {
            // Update patients state with the new data
            setPatient(state.data.filter((el) => el.id === params.patientId)[0]);
        }
    }, [state.data, params.patientId]); // Only update patients when state.data changes


    useEffect(() => {

    }, [patient])

    return (
        <div className="add-recording-root">
            <div className="add-recording-container">
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
                    }}>ECG</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setRecordingType("EEG");
                    }}>EEG</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setRecordingType("EOG");
                    }}>EOG</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setRecordingType("EMG");
                    }}>EMG</button>
                </div>
                {
                    recordingType && (
                        <div>
                            <ul>
                                {
                                    patient?.recordings?.map((el, index) => (
                                        <li key={index}>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                setShowGraph(true);
                                                setData(() => el.data);
                                            }}>{el.date}</button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
                {
                    showGraph && (
                            <Graph data={data} isLive={false} />
                    )
                }
            </div>
        </div>
    )
}