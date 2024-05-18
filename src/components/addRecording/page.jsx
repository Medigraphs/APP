import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import "./addRecording.css";
import { Graph } from "../LineChart/page";
import {
  arrayUnion,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../store/firebase";
import { useParams } from "react-router-dom";
import { fetchPatients } from "../../store/patientsSlice";
import { useDispatch, useSelector } from "react-redux";

const AddRecording = () => {
  const [serialData, setSerialData] = useState([{ y: 0 }]);
  const [date, setDate] = useState("");
  const [recordings, setRecordings] = useState([]);
  const dispatch = useDispatch();
  const [time, setTime] = useState(getCurrentTime()); // Set initial time to the current time
  const state = useSelector((state) => state.fetchPatients);
  const params = useParams();
  const [patient, setPatient] = useState({});

  const [showGraph, setShowGraph] = useState(false);
  const writerRef = useRef(null); // Reference to hold the writer object


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

  const inputdata = {
    "ECG": 0,
    "EEG": 1,
    "EMG": 2,
    "EOG": 3
  }

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
    setSerialData([{ y: 0 }]);
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
    const filters = [
      { usbVendorId: 0x2341, usbProductId: 0x0043 },
      { usbVendorId: 0x2341, usbProductId: 0x0001 },
    ];
    console.log(recordings)
    try {
      if (recordings.value != "ECG" &&
        recordings.value != "EEG" &&
        recordings.value != "EOG" &&
        recordings.value != "EMG") {
          alert("Please Select the appropriate option from the recording section");
          return
        }
      const port = await navigator.serial.requestPort({ filters });
      if (!port) {
        console.error('No port selected by the user.');
        return;
      }
      await port.open({ baudRate: 115200 });

      let streaming = true; // Flag to control the streaming loop

      const reader = port.readable
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TransformStream(new LineBreakTransformer()))
        .getReader();


      const writer = port.writable.getWriter();
      try {
        // Get a writer instance
        await writer.write(new TextEncoder().encode(inputdata[recordings.value]));
      } catch (error) {
        console.log("Unable to send serial input to the port", error);
      } finally {
        await writer.close(); // Close the writer
      }


      setShowGraph(true);
      while (streaming) {
        try {
          const { value, done } = await reader.read();
          if (done) {
            break; // Exit loop when done
          }
          handleSerialData(value);
          setSerialData(prev => [...prev, { y: value }]);
        } catch (error) {
          console.log(error);
          break; // Exit loop on error
        }
      }

      // Close the reader and the port
      await reader.cancel();
      await port.close();
    } catch (error) {
      console.error('Error reading from serial port:', error.message);
      if (error.code === 8) {
        stopSerial();
      }
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
