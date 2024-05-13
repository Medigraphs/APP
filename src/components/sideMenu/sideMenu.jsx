import React, { useEffect, useState } from "react";
import "./sideMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../store/patientsSlice";


const SideMenu = () => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state.fetchPatients);
    const [patients, setPatients] = useState([]);

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

    return <div className="sideMenu">
        <div className="container2">
            <h3 className="categories">Patients</h3>
            <div className="container2-sub">
                <ul className={`patientList`}>
                    {patients.map((patient) => (
                        <li key={patient.id} className={`patientItem`} onClick={() => {

                        }}>
                            <div className={`patientName`}>{patient.name}</div>
                            <div className={`patientId`}>({patient.id})</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        {/* <div className="sideMenu-buttons-container">
                <button type="submit" className="filter-submit-button" disabled={isFormNull}>Submit</button>
                <button type="reset" className="filter-reset-button" disabled={isFormNull} onClick={handleResetFormData}>Reset</button>
            </div> */}
    </div>
}

export default SideMenu;