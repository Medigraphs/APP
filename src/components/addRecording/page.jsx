import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import "./addRecording.css";
import { Graph } from "../LineChart/page";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../store/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPatients } from "../../store/patientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import Loader from "../loading/loader";

const AddRecording = () => {
  const [serialData, setSerialData] = useState([{ y: 0 }]);
  const [date, setDate] = useState("");
  const [recordings, setRecordings] = useState(null);
  const dispatch = useDispatch();
  const [time, setTime] = useState(getCurrentTime());
  const state = useSelector((state) => state.fetchPatients);
  const params = useParams();
  const [patient, setPatient] = useState({});
  const [readyToUpload, setUploadState] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [cookies] = useCookies(["jwtInCookie"]);
  const [token, setToken] = useState({});
  const [user, setUser] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate();

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
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    if (state.data) {
      const currentPatient = state.data.find((el) => el.id === params.patientId);
      setPatient(currentPatient || {});
    }
  }, [state.data, params.patientId]);

  const recordingOptions = [
    { value: "EEG", label: "EEG" },
    { value: "ECG", label: "ECG" },
    { value: "EOG", label: "EOG" },
    { value: "EMG", label: "EMG" },
  ];

  const addDataToFirebase = async (id, type, date) => {
    if (serialData.length === 0) return;
    const patientRef = doc(db, "patients", id);
    try {
      await updateDoc(patientRef, {
        recordings: arrayUnion({
          type,
          date,
          data: serialData,
        }),
      });
      console.log("Data added to Firebase");
    } catch (e) {
      console.error(e);
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);
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

  const [data, setData] = useState([{ y: 0 }]);
  const needToStopRef = useRef(false);
  const reader = useRef(undefined);

  const stopSerial = async () => {
    needToStopRef.current = true;
    if (reader.current) {
      reader.current.cancel();
      // reader.current.releaseLock();
    }
    setData([{ y: 0 }]);
    setUploadState(true);
  };

  const handleSerialData = (newData) => {
    setData((prev) => {
      if (prev.length >= 500) prev.shift();
      return [...prev, { y: parseFloat(newData) }];
    });
  };

  const connectToSerialPort = async () => {
    needToStopRef.current = false;
    if (!recordings) {
      alert("Please select the appropriate option from the recording section");
      return;
    }
    setUploadState(false);
    const filters = [
      { usbVendorId: 0x2341, usbProductId: 0x0043 },
      { usbVendorId: 0x2341, usbProductId: 0x0001 },
    ];
    try {
      const port = await navigator.serial.requestPort({ filters });
      if (!port) {
        console.error("No port selected by the user.");
        return;
      }
      try {
        await port.open({ baudRate: 115200 });
      } catch (error) { }

      reader.current = port.readable
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TransformStream(new LineBreakTransformer()))
        .getReader();
      delay(3000).then(() => {
        setIsLoading(false);
      })
      setShowGraph(true);
      while (!needToStopRef.current && reader.current) {
        const { value, done } = await reader.current.read();
        if (done) break;
        handleSerialData(value);
        setSerialData((prev) => [...prev, { y: parseFloat(value) }]);
      }
    } catch (error) {
      console.error("Error reading from serial port:", error.message);
      stopSerial();
    } finally {
      if (reader.current) {
        reader.current.releaseLock();
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
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>

        <label>
          Recording List:
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
        {showGraph && (
          <>
            {
              isLoading ?
                <div
                  style={{
                    width: "1000px",
                  }}
                >
                  <Loader height={"300px"} />
                </div>
                :
                <>
                  <Graph data={readyToUpload ? serialData : data} isLive={true} autoGenerateY={recordings?.value === "EEG"} />
                  <button
                    style={{
                      width: "200px",
                      display: readyToUpload ? "block" : "none"
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowGraph(false);
                      setData([{ y: 0 }]);
                      setSerialData([{ y: 0 }]);

                      setIsLoading(true);
                    }}
                  >
                    Reset
                  </button>
                  <button
                    style={{
                      width: "200px",
                      display: readyToUpload ? "block" : "none"
                    }}
                    disabled={!readyToUpload}
                    onClick={(e) => {
                      e.preventDefault();
                      addDataToFirebase(patient.id, recordings?.value, `${date}-${time}`);
                      setShowGraph(false);
                      setSerialData([{ y: 0 }]);

                      setIsLoading(true);
                    }}
                  >
                    Upload
                  </button>
                </>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default AddRecording;