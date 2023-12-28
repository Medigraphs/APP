import { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from './page.module.css';

const AddPatientForm = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [recordings, setRecordings] = useState([]);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(getCurrentTime()); // Set initial time to the current time
  const [doctorName, setDoctorName] = useState('');

  // Function to get the current time in HH:mm format
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    // Update the time field to the current time every minute
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const handleAddPatient = () => {
    // Implement your logic to add patient information
    console.log('Adding patient:', {
      name,
      id,
      recordings,
      address,
      date,
      time,
      doctorName,
      mobileNo
    });
    // Reset form fields after adding patient
    setName('');
    setId('');
    setRecordings([]);
    setAddress('');
    setDate('');
    setDoctorName('');
    setMobileNo('');
  };

  const recordingOptions = [
    { value: 'EEG', label: 'EEG' },
    { value: 'ECG', label: 'ECG' },
    { value: 'EOG', label: 'EOG' },
    { value: 'EMG', label: 'EMG' },
  ];

  return (
    <div className={styles.formContainer}>
      <h2>Add Patient Information</h2>
      <form>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />

        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Mobile No:</label>
        <input type="number" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />

        <label>Recording List:</label>
        <Select
          options={recordingOptions}
          value={recordings}
          onChange={(selectedOptions) => setRecordings(selectedOptions)}
        />

        <label>Address:</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        <label>Doctor's Name:</label>
        <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />

        <button type="button" onClick={handleAddPatient}>
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatientForm;