import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import "./addRecording.css";
import { Graph } from "../LineChart/page";
import {
  arrayUnion,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../store/firebase";
import { useParams } from "react-router-dom";
import { fetchPatients } from "../../store/patientsSlice";
import { useDispatch, useSelector } from "react-redux";

const AddRecording = ({ selectedPatient }) => {
  const [serialData, setSerialData] = useState([]);
  const [isFinished, setFinished] = useState(false);
  const [date, setDate] = useState("");
  // const [isRecording, setIsRecording] = useState(false);
  // const [recordingDialog, setRecordingsDialog] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [fetchedRecordings, setFetchedRecordings] = useState([]);
  const dispatch = useDispatch();
  const [time, setTime] = useState(getCurrentTime()); // Set initial time to the current time
  const state = useSelector((state) => state.fetchPatients);
  const params = useParams();
  const [patient, setPatient] = useState({});

  const [showGraph, setShowGraph] = useState(false);


  useEffect(() => {
    // Dispatch the action to fetch patients
    dispatch(fetchPatients());
  }, [dispatch, params.patientId]); // Make sure to include dispatch in the dependency array

  // Update patients state when the fetchPatients state changes
  useEffect(() => {
    if (state.data) {
      console.log(state.data);
      // Update patients state with the new data
      setPatient(state.data.filter((el) => el.id === params.patientId)[0]);
    }
  }, [state.data, params.patientId]); // Only update patients when state.data changes

  const recordingOptions = [
    { value: "EEG", label: "EEG" },
    { value: "ECG", label: "ECG" },
    { value: "EOG", label: "EOG" },
    { value: "EMG", label: "EMG" },
  ];

  // const fetchDataFromFirestore = async () => {
  //   const recordingsCollectionRef = collection(db, "patients");
  //   const querySnapshot = await getDocs(recordingsCollectionRef);
  //   querySnapshot.docs
  //     .filter((data) => data.id == selectedPatient.id)
  //     .map((data) => data.data().recordings)
  //     .forEach((doc) => {
  //       setFetchedRecordings((prev) => [...prev, doc]);
  //     });
  // };

  // useEffect(() => {
  //   fetchDataFromFirestore();
  // }, [isFinished]); // Fetch data whenever recordingDialog state changes

  const addDataToFirebase = (id, type, date) => {
    if (serialData.length === 0)
      return;
    const patient = doc(db, "patients", id);
    updateDoc(patient, {
      recordings: arrayUnion({
        type: type,
        date: date,
        data: serialData,
      }),
    })
      .then(() => {
        console.log("added");
      })
      .catch((e) => {
        console.error(e);
      });
  };

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

  // useEffect(() => {}, [isFinished, serialData]);

  // const showRecordings = () => {
  //   setFetchedRecordings((prev) => [...prev, selectedPatient.recordings]);
  //   setRecordingsDialog(true);
  // };

  class LineBreakTransformer {
    constructor() {
      this.container = "";
    }

    transform(chunk, controller) {
      this.container += chunk;
      const lines = this.container.split("\r\n");
      this.container = lines.pop();
      lines.forEach((line) => controller.enqueue(line));
    }

    flush(controller) {
      controller.enqueue(this.container);
    }
  }

  const [data, setData] = useState([]);
  const needToStopRef = useRef(false); // Using a ref instead of state
  const stopSerial = () => {
    setShowGraph(false);
    needToStopRef.current = true; // Update ref value
    addDataToFirebase(patient.id, recordings.value, date + "-" + time);
  };

  const handleSerialData = (newData) => {
    setData((prev) => {
      if (prev.length >= 500) {
        prev.shift();
      }
      return [
        ...prev,
        {
          y: parseFloat(newData),
        },
      ];
    });
  };

  const connectToSerialPort = async () => {
    setShowGraph(true);
    const filters = [
      { usbVendorId: 0x2341, usbProductId: 0x0043 },
      { usbVendorId: 0x2341, usbProductId: 0x0001 },
    ];
    try {
      const port = await navigator.serial.requestPort({ filters });
      if (!port) {
        console.error('No port selected by the user.');
        return;
      }
      await port.open({ baudRate: 115200 });

      while (port.readable) {
        const reader = port.readable
          .pipeThrough(new TextDecoderStream())
          .pipeThrough(new TransformStream(new LineBreakTransformer()))
          .getReader();

        try {
          while (!needToStopRef.current) { // Check ref value
            const { value, done } = await reader.read();
            if (done) {
              reader.releaseLock();
              await port.close();
              break;
            }
            handleSerialData(value);
            setSerialData && setSerialData(prev => [...prev, value]);
          }
        } catch (error) {
          console.log(error)
        } finally {
          reader.releaseLock();
          await port.close();
        }
      }
    } catch (error) {
      console.error('Error reading from serial port:', error.message);
      if (error.code === 8)
        stopSerial()
    }
  };

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
        <label>Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          /></label>

        <label>Recording List:
          <Select
            options={recordingOptions}
            value={recordings}
            onChange={(selectedOptions) => setRecordings(selectedOptions)}
          />
        </label>

        <button type="button" onClick={connectToSerialPort}>
          Add
        </button>
        <button onClick={stopSerial}>Stop</button>
      </div>
      {showGraph ? <Graph data={data} /> : <></>}
    </div>
  );
};

export default AddRecording;
