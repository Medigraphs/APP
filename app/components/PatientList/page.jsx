// components/PatientList.js
'use client';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from "firebase/firestore"; 
import styles from './page.module.css';

const PatientList = ({onPatientClick, updateList}) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsCollection = await getDocs(collection(db, 'patients'));
        const patientList = patientsCollection.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(patientList)
        setPatients(() => patientList)
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [updateList]);

  return (
    <aside className={styles.patientListContainer}>
      <h2>Patients</h2>
      <ul className={styles.patientList}>
        {patients.map((patient) => (
          <li key={patient.id} className={styles.patientItem} onClick={() => {
            onPatientClick(patients.filter(el => el.id === patient.id)[0])
          }}>
            <div className={styles.patientId}>{patient.id}</div>
            <div className={styles.patientName}>{patient.name}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default PatientList;
