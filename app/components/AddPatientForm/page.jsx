import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { db } from '@/app/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

const AddPatientForm = ({setUpdateList}) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [isPatientAdding, setPatientAddStatus] = useState(false);

  const handleAddPatient = async () => {
    setPatientAddStatus(true);
    setDoc(doc(db, 'patients', id), {
      name,
      mobile,
      address,
      date,
      doctorName,
    }).finally(() => {
      setPatientAddStatus(false);
      setUpdateList(prev => !prev);
      alert("Patient Added!");
    })
    // console.log('Patient added with ID: ', patientRef.id);
    // Implement your logic to add patient information
    // Reset form fields after adding patient
    setName('');
    setId('');
    setAddress('');
    setDate('');
    setDoctorName('');
    setMobile('');
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add Patient Information</h2>
      <form>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />

        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Mobile No:</label>
        <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />

        <label>Address:</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Doctor's Name:</label>
        <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />

        <button type="button" onClick={handleAddPatient} disabled={isPatientAdding}>
          {isPatientAdding ? "Adding Patient" : "Add Patient"}
        </button>
      </form>
    </div>
  );
};

export default AddPatientForm;