import React, { useEffect, useState } from "react";
import "./sideMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPatients } from "../../store/patientsSlice";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { ShowRecordings } from "../showRecordings/showRecordings";

const SideMenu = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.fetchPatients);
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


    useEffect(() => {
        // Dispatch the action to fetch patients
        dispatch(fetchPatients());
    }, [dispatch]); // Make sure to include dispatch in the dependency array

    // Update patients state when the fetchPatients state changes
    useEffect(() => {
        if (state.data) {
            // Update patients state with the new data
            setPatients(state.data);
        }
    }, [state.data]); // Only update patients when state.data changes

    return (
        <>
            {
                isAdmin ?
                    <div className="sideMenu" style={{
                        display: patients.length > 0 ? "block" : "none"
                    }}>
                        <div className="container2">
                            <h3 className="categories">Patients</h3>
                            <div className="container2-sub">
                                <ul className={`patientList`}>
                                    {patients.map((patient) => (
                                        <li key={patient.id} className={`patientItem`} onClick={() => {
                                            console.log(patients.filter(el => el.id === patient.id))
                                            navigate('/profile/' + patient.id);
                                        }}>
                                            <div className={`patientName`}>{patient.name}</div>
                                            <div className={`patientId`}>({patient.id})</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    :
                    <ShowRecordings selectedPatient={
                        patients.filter(pt => {
                            return pt.email == token.email
                        })[0]
                    }/>
            }
        </>
    )
}

export default SideMenu;