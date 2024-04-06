"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Graph } from "../LineChart/page";
import {
  ECGFilter,
  EEGFilter,
  EMGFilter,
  EOGFilter,
  readingDuration,
} from "@/app/lib/WaveFilters";
import { db } from '../../firebase/firebase';
import { arrayUnion, doc, updateDoc, collection, getDocs } from "firebase/firestore"; 

const PatientDetails = ({ selectedPatient }) => {
  const [serialData, setSerialData] = useState([]);
  const [isFinished, setFinished] = useState(false);
  const [date, setDate] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDialog, setRecordingsDialog] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [fetchedRecordings, setFetchedRecordings] = useState([]);
  const [time, setTime] = useState(getCurrentTime()); // Set initial time to the current time

  const recordingOptions = [
    { value: "EEG", label: "EEG" },
    { value: "ECG", label: "ECG" },
    { value: "EOG", label: "EOG" },
    { value: "EMG", label: "EMG" },
  ];

  const fetchDataFromFirestore = async () => {
    const recordingsCollectionRef = collection(db, 'patients');
    const querySnapshot = await getDocs(recordingsCollectionRef);
    const fetchedData = [];
    querySnapshot.docs.filter(data => data.id == selectedPatient.id).map(data => data.data().recordings).forEach((doc) => {
      fetchedData.push(doc);
      console.log(doc)
    });
    setFetchedRecordings(fetchedData);
  };

  // useEffect(() => {
  //   fetchDataFromFirestore();
  // }, [recordingDialog]); // Fetch data whenever recordingDialog state changes

  const addDataToFirebase = (id, type, date) => {
    const patient = doc(db, 'patients', id);
    updateDoc(patient, {
      "recordings": arrayUnion({
        "type": type,
        "date": date,
        "data": serialData
      })
    }).then(() => {
      console.log("added");
    })
    .catch(e => {
      console.error(e);
    })
  }

  // Function to get the current time in HH:mm format
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
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

  useEffect(() => {
    console.log(serialData);
  }, [isFinished]);

  const showRecordings = () => {
    fetchDataFromFirestore();
    setRecordingsDialog(true);
  }

  const connectToSerial = async () => {
    setSerialData([]);
    try {
      const filters = [
        { usbVendorId: 0x2341, usbProductId: 0x0043 },
        { usbVendorId: 0x2341, usbProductId: 0x0001 },
      ];
      const port = await navigator.serial.requestPort({ filters });
      await port.open({ baudRate: 115200 });

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      const endTime = Date.now() + readingDuration;
      while (Date.now() < endTime) {
        const { value, done } = await reader.read();
        if (done) {
          reader.releaseLock();
          await port.close();
          break;
        }
        if (!isNaN(value)) {
          let intValue = value;
          switch (recordings.value) {
            case "EEG":
              intValue = EEGFilter(intValue);
              break;
            case "ECG":
              intValue = ECGFilter(intValue);
              break;
            case "EMG":
              intValue = EMGFilter(intValue);
              break;
            case "EOG":
              intValue = EOGFilter(intValue);
              break;
            default:
              break;
          }
          setSerialData((prev) => [...prev, { pv: intValue }]);
        }
      }
      
    addDataToFirebase(selectedPatient.id, recordings.value, date + "-" + time);
      setFinished(true);
      reader.releaseLock();
      await port.close();
    } catch (error) {
      console.error("Error connecting to serial port:", error);
    }
  };

  return (
    <div>
      <h2>Patient Details</h2>
      {selectedPatient && !isRecording && (
        <>
          <div>
            <p>Name: {selectedPatient.name}</p>
            <p>ID: {selectedPatient.id}</p>
            <p>Recordings: {selectedPatient?.recordings?.join(", ")}</p>
            <p>Address: {selectedPatient.address}</p>
            <p>Date: {selectedPatient.date}</p>
            <p>Time: {selectedPatient.time}</p>
            <p>Doctor's Name: {selectedPatient.doctorName}</p>
          </div>
          <button onClick={() => setIsRecording(true)}>
            Add new Recording
          </button>
          <button type="button" style={{ marginInlineStart: "10px", marginTop: "10px"}} onClick={showRecordings}>
              Show Recordcings
          </button>
          
          {
            recordingDialog && 
            <div>
              <h3>Recordings</h3>
              <ul>
                {fetchedRecordings.map((recording, index) => (
                  <li key={index}>
                    Type: {recording.type}, Date: {recording.date}
                  </li>
                ))}
              </ul>
            </div>
          }
        </>
      )}
      {isRecording && (
        <>
          <div>
            <p>
              <b>Name</b>: {selectedPatient.name}
            </p>
            <p>
              <b>ID</b>: {selectedPatient.id}
            </p>
            <p>
              <b>Address</b>: {selectedPatient.address}
            </p>
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label>Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <label>Recording List:</label>
            <Select
              options={recordingOptions}
              value={recordings}
              onChange={(selectedOptions) => setRecordings(selectedOptions)}
            />
            <button type="button" onClick={connectToSerial}>
              Add
            </button>
          </div>
            <Graph data={serialData} />
        </>
      )}
    </div>
  );
};

export default PatientDetails;