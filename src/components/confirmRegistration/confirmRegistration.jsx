import React, { useEffect } from "react";
import { useState } from "react";
import { confirmRegistration } from "../../store/confirmRegistrationSlice";
import './confirmRegistration.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const ConfirmRegistration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOTP] = useState("");
    const [submitButton, setSubmitButton] = useState("Submit");

    const state = useSelector((state) => state.confirmRegistration);
    const [confirmRegistrationState, setconfirmRegistrationState] = useState(state);

    useEffect(() => {
        setconfirmRegistrationState(state);
    }, [confirmRegistrationState]);

    console.log(confirmRegistrationState?.data);

    const handleconfirmRegistration = async (event) => {
        event.preventDefault();
        setSubmitButton("Submitting...");
        await dispatch(confirmRegistration(otp));
        setSubmitButton("Submit");
        setOTP("");
    }

    // Conditional checking(Started)
    const [getSuccess, setSuccess] = useState(false);
    const [successPositive, setSuccessPositive] = useState(false);
    useEffect(() => {
        if (state && state.data && !state.data.success) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        }
    }, [state]);

    useEffect(() => {
        if (state && state.data && state.data.success) {
            setSuccessPositive(true);
            setTimeout(() => {
                setSuccessPositive(false);
                navigate('/');
            }, 2000);
        }
    }, [state]);

    // Resetting the states
    useEffect(() => {
        setSuccess(false);
        setSuccessPositive(false);
    }, []);
    // Conditional checking(Ended)


    return (<div className="confirmRegistration-supreme-container">
        <div className="confirmRegistration-container">
            {successPositive && <p className="register-success-message">{state?.data?.message}</p>}
            {getSuccess && <p className="register-success-message">{state?.data?.message}</p>}
            <form className="confirmRegistration-form-container" onSubmit={handleconfirmRegistration}>
                <label htmlFor="otp" className="confirmRegistration-otp-label">OTP
                    <input
                        type="text"
                        value={otp}
                        name="otp"
                        onChange={(e) => setOTP(e.target.value)}
                        className="confirmRegistration-otp-input"
                    />
                </label>
                <button type="submit" disabled={setSubmitButton === "Submitting..."} className="confirmRegistration-button">
                    {submitButton}
                </button>
            </form>
        </div>
    </div>
    );
}